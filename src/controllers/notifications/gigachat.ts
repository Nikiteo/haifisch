import GigaChat from 'gigachat'
import { Agent } from 'node:https'
import { Logger } from '../../lib'
import { ExtendedFeedbackInfo, composeFeedbackText } from './utils'

const GIGA_TOKEN = process.env.GIGACHAT_TOKEN

const httpsAgent = new Agent({
	rejectUnauthorized: false,
})

const client = new GigaChat({
	credentials: GIGA_TOKEN,
	scope: 'GIGACHAT_API_PERS',
	httpsAgent,
})

export async function generateResponse(
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
