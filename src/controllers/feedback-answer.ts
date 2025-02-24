import { Logger } from '../lib'
import { addFeedback, getCampaigns, getFeedbacks } from '../services'

import {
	type GoodsFeedbackDTO,
	type UpdateGoodsFeedbackCommentRequest,
} from '../types/yandex/api'

const GOOD_ANSWER =
	'Мы благодарим вас за ваш отзыв о покупке.\n' +
	'Мы ценим ваш выбор и надеемся, что наш продукт будет радовать вас долгое время.\n' +
	'Если у вас есть еще какие-либо вопросы или замечания, пожалуйста, не стесняйтесь обращаться к нам.\n' +
	'Мы всегда готовы помочь вам.\n' +
	'С уважением, команда Haifisch'

const BAD_ANSWER =
	'Здравствуйте!\n' +
	'Сожалеем, что товар не оправдал ваших ожиданий. Мы обязательно примем ваш отзыв к сведению и будем совершенствовать качество наших продуктов и донесения информации об изделиях до наших покупателей.\n' +
	'С уважением, команда Haifisch'

const addFeedbackResponse = async (
	store: string,
	businessId: number,
	feedback: GoodsFeedbackDTO
): Promise<void> => {
	const response: UpdateGoodsFeedbackCommentRequest = {
		feedbackId: Number(feedback.feedbackId),
		comment: {
			text: feedback.statistics.rating >= 4 ? GOOD_ANSWER : BAD_ANSWER,
		},
	}
	await addFeedback(store, businessId, response)
}

export const feedbackAnswer = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendReply: (text: string) => Promise<void>
): Promise<void> => {
	try {
		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		const campaigns = await getCampaigns(store)
		Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

		if (campaigns && campaigns.length > 0) {
			const businessId = campaigns[0]?.business?.id

			if (businessId) {
				const feedbacks = await getFeedbacks(store, businessId)
				const feedbacksWithoutAnswers =
					feedbacks?.filter(
						feedback => feedback.statistics.commentsCount === 0
					) || []

				if (feedbacksWithoutAnswers.length > 0) {
					for (const feedback of feedbacksWithoutAnswers) {
						await addFeedbackResponse(store, businessId, feedback)
					}
				} else {
					await sendMessage(`[${store}]: Все отзывы уже отвечены`)
					Logger.info(`[${store}]: Все отзывы уже отвечены`)
				}
			}
		}
		await sendMessage(`[${store}]: Магазин синхронизирован`)
		Logger.info(`[${store}]: Магазин синхронизирован`)
	} catch (err: unknown) {
		if (err instanceof Error) {
			Logger.error(`[${store}]: ${err.message}`)
		} else {
			Logger.error(
				`[${store}]: Неизвестная ошибка: ${JSON.stringify(err)}`
			)
		}
	}
}
