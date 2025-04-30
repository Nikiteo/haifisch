import { GigaChat } from 'gigachat'
import { Agent } from 'node:https'
import {
	GoodsFeedbackCreatedNotificationDTO,
	addFeedback,
	getFeedbacks,
} from '../../services'
import {
	GoodsFeedbackDescriptionDTO,
	GoodsFeedbackCommentDTO,
	UpdateGoodsFeedbackCommentRequest,
} from '../../types/yandex/api'
import { Logger } from '../../lib'

const GIGA_TOKEN = process.env.GIGACHAT_TOKEN

const httpsAgent = new Agent({
	rejectUnauthorized: false,
})

const client = new GigaChat({
	credentials: GIGA_TOKEN,
	scope: 'GIGACHAT_API_PERS',
	httpsAgent,
})

interface ExtendedFeedbackInfo {
	id: number
	rating?: number
	author?: string
	needReaction: boolean
	advantages?: string
	disadvantages?: string
	comment?: string
	hasMedia: boolean
	createdAt: string
}

/**
 * Получает полную информацию об отзыве по его ID
 */
async function getFeedbackInfo(
	store: string,
	businessId: number,
	feedbackId: number
): Promise<ExtendedFeedbackInfo | undefined> {
	try {
		const feedbacks = await getFeedbacks(store, businessId)
		if (!feedbacks) return undefined

		const targetFeedback = feedbacks.find(f => f.feedbackId === feedbackId)
		if (!targetFeedback) return undefined

		return {
			id: targetFeedback.feedbackId,
			rating: targetFeedback.statistics?.rating,
			author: targetFeedback.author,
			needReaction: targetFeedback.needReaction,
			advantages: targetFeedback.description?.advantages,
			disadvantages: targetFeedback.description?.disadvantages,
			comment: targetFeedback.description?.comment,
			hasMedia:
				!!targetFeedback.media?.photos?.length ||
				!!targetFeedback.media?.videos?.length,
			createdAt: targetFeedback.createdAt,
		}
	} catch (error) {
		Logger.warn('Ошибка при получении отзыва:', error)
		return undefined
	}
}

/**
 * Формирует полный текст отзыва из его компонентов
 */
function composeFeedbackText(description: GoodsFeedbackDescriptionDTO): string {
	const parts: string[] = []

	if (description.advantages) {
		parts.push(`Достоинства: ${description.advantages}`)
	}
	if (description.disadvantages) {
		parts.push(`Недостатки: ${description.disadvantages}`)
	}
	if (description.comment) {
		parts.push(`Комментарий: ${description.comment}`)
	}

	return parts.join('\n\n') || 'Без текстового описания'
}

async function generateResponse(
	feedbackInfo: ExtendedFeedbackInfo
): Promise<string | undefined> {
	try {
		await client.updateToken()

		const fullText = composeFeedbackText({
			advantages: feedbackInfo.advantages,
			disadvantages: feedbackInfo.disadvantages,
			comment: feedbackInfo.comment,
		})

		const ratingInfo = feedbackInfo.rating
			? `Оценка: ${feedbackInfo.rating}/5`
			: 'Оценка не указана'

		const mediaInfo = feedbackInfo.hasMedia
			? 'Клиент приложил фотографии/видео'
			: ''

		const authorInfo = feedbackInfo.author
			? `Уважаемый(ая) ${feedbackInfo.author}`
			: 'Уважаемый клиент'

		const prompt = `Ты - представитель компании Haifisch, производителя премиальных декоративных изделий из искусственного камня.
Формируй профессиональные, дружелюбные и персонализированные ответы на отзывы клиентов.

**О компании**:
- Производим изделия из литьевого мрамора и гранита
- Используем экологичные материалы высшего качества
- Каждое изделие создается с индивидуальным подходом
- Ценим каждого клиента и стремимся к совершенству

**Контекст отзыва**:
- Автор: ${authorInfo}
- ${ratingInfo}
- ${mediaInfo}
- Дата: ${new Date(feedbackInfo.createdAt).toLocaleDateString()}

**Текст отзыва**:
${fullText}

**Инструкции для ответа**:
1. Тон: профессиональный, но теплый и человечный
2. Для негативных отзывов (1-3 звезды):
   - Искренне извинись за неудобства
   - Предложи конкретное решение (контакты службы поддержки, замену, проверку качества)
   - Уверен, что сможем исправить ситуацию
3. Для позитивных отзывов (4-5 звезд):
   - Искренне поблагодари за отзыв
   - Отметь конкретные достоинства, которые клиент выделил
   - Пригласи к дальнейшему сотрудничеству
4. Если есть недостатки - признай их и расскажи, как работаем над улучшением
5. Если отзыв без текста - вежливо попроси уточнить детали
6. Всегда подписывай: "С уважением, команда Haifisch"
7. Длина ответа: 3-5 предложений, не формальный шаблон
8. Добавь немного индивидуальности, но без излишней фамильярности

ВАЖНО:
1. Не добавляй в ответ служебные отметки типа "**Ответ на...**"
2. Начинай ответ сразу с обращения к клиенту

Сгенерируй идеальный ответ, учитывая все вышеперечисленные факторы.`

		const response = await client.chat({
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.7,
			max_tokens: 1000,
		})

		return response.choices[0]?.message.content
	} catch (error) {
		Logger.warn('Ошибка при генерации ответа:', error)
		return undefined
	}
}

/**
 * Обрабатывает уведомление о новом отзыве и формирует персонализированный ответ
 */
export async function processFeedbackAndReply(
	notification: GoodsFeedbackCreatedNotificationDTO,
	store: string
): Promise<
	GoodsFeedbackCommentDTO | UpdateGoodsFeedbackCommentRequest | undefined
> {
	try {
		const feedbackInfo = await getFeedbackInfo(
			store,
			notification.businessId,
			notification.feedbackId
		)

		if (!feedbackInfo || !feedbackInfo.needReaction) {
			Logger.warn('Отзыв не требует ответа или не найден')
			return undefined
		}

		const generatedResponse = await generateResponse(feedbackInfo)

		if (!generatedResponse) {
			Logger.warn('Не удалось сгенерировать ответ на отзыв', {
				feedbackId: notification.feedbackId,
			})
			return undefined
		}

		const commentData: UpdateGoodsFeedbackCommentRequest = {
			feedbackId: notification.feedbackId,
			comment: {
				text: generatedResponse,
			},
		}

		const response = await addFeedback(
			store,
			notification.businessId,
			commentData
		)

		Logger.info('Ответ на отзыв успешно отправлен')
		return response
	} catch (error) {
		Logger.error('Ошибка при обработке отзыва:', {
			error,
			feedbackId: notification.feedbackId,
		})
	}
}
