import { GigaChat } from 'gigachat'
import { Agent } from 'node:https'
import {
	GoodsFeedbackCreatedNotificationDTO,
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

/**
 * Генерирует ответ на отзыв с учетом всех параметров
 */
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

		const prompt = `
        Ты - представитель компании Haifisch, отвечающий на отзывы клиентов.
        Сформируй персонализированный ответ, учитывая все детали отзыва.

        Информация об отзыве:
        - ${authorInfo}
        - ${ratingInfo}
        - ${mediaInfo}
        - Дата отзыва: ${new Date(feedbackInfo.createdAt).toLocaleDateString()}

        Текст отзыва:
        ${fullText}

        Правила ответа:
        1. Учитывай оценку (1-2 - срочное решение проблем, 3 - предложи улучшения, 4-5 - благодарность)
        2. Если указаны недостатки - извинись и предложи решение
        3. Если указаны достоинства - поблагодари и отметь, что ценим выбор
        4. Для отзывов без текста предложи оставить больше деталей
        5. Подпись: "С уважением, команда Haifisch"
        6. Максимально персонализированный ответ
        `

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
		// Получаем полную информацию об отзыве
		const feedbackInfo = await getFeedbackInfo(
			store,
			notification.businessId,
			notification.feedbackId
		)

		if (
			!feedbackInfo
			// || !feedbackInfo.needReaction
		) {
			Logger.warn('Отзыв не требует ответа или не найден')
			return undefined
		}

		// Генерируем ответ с учетом всех параметров
		const generatedResponse = await generateResponse(feedbackInfo)

		if (!generatedResponse) {
			Logger.warn('Не удалось сгенерировать ответ на отзыв', {
				feedbackId: notification.feedbackId,
			})
			return undefined
		}

		// Отправляем ответ
		const commentData: UpdateGoodsFeedbackCommentRequest = {
			feedbackId: notification.feedbackId,
			comment: {
				text: generatedResponse,
			},
		}

		// const response = await addFeedback(
		// 	store,
		// 	notification.businessId,
		// 	commentData
		// )

		Logger.info('Ответ на отзыв успешно отправлен', {
			feedbackId: notification.feedbackId,
			rating: feedbackInfo.rating,
			responseLength: generatedResponse.length,
		})

		Logger.warn(commentData)
		return commentData
	} catch (error) {
		Logger.error('Ошибка при обработке отзыва:', {
			error,
			feedbackId: notification.feedbackId,
		})
	}
}
