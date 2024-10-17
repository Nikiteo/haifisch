import Logger from '../lib/logger'

import { getCampaigns } from '../services/yandex/campaignController'
import {
	addFeedback,
	getFeedbacks,
} from '../services/yandex/feedbackController'
import {
	type FeedbacksSendResp,
	type FeedbackSendReq,
} from '../types/marketTypes'

export const feedbackAnswer = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendReply: (text: string) => Promise<void>
): Promise<void> => {
	try {
		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		const campaigns = await getCampaigns(store)

		Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

		if (campaigns !== undefined) {
			const businessId = campaigns.campaigns[0].business.id

			const feedbacks = await getFeedbacks(store, businessId)

			const goodAnswer =
				'Мы благодарим вас за ваш отзыв о покупке.\nМы ценим ваш выбор и надеемся, что наш продукт будет радовать вас долгое время.\nЕсли у вас есть еще какие-либо вопросы или замечания, пожалуйста, не стесняйтесь обращаться к нам.\nМы всегда готовы помочь вам.\nС уважением, команда Haifisch'

			const badAnswer =
				'Здравствуйте!\nСожалеем, что товар не оправдал ваших ожиданий. Мы обязательно примем ваш отзыв к сведению и будем совершенствовать качество наших продуктов и донесения информации об изделиях до наших покупателей.\nС уважением, команда Haifisch'

			const feedbacksWithoutAnswers = feedbacks?.filter(
				feedback => feedback.statistics.commentsCount === 0
			)

			if (
				feedbacksWithoutAnswers !== undefined &&
				feedbacksWithoutAnswers.length > 0
			) {
				const addOneFeedback = async (
					store: string,
					data: FeedbackSendReq
				): Promise<FeedbacksSendResp | undefined> => {
					return await addFeedback(store, businessId, data)
				}

				for (const feedback of feedbacksWithoutAnswers) {
					if (
						feedback.statistics.rating === 5 ||
						feedback.statistics.rating === 4
					) {
						const forSend = {
							feedbackId: feedback.feedbackId,
							comment: {
								text: goodAnswer,
							},
						}
						await addOneFeedback(store, forSend)
					} else {
						const forSend = {
							feedbackId: feedback.feedbackId,
							comment: {
								text: badAnswer,
							},
						}
						await addOneFeedback(store, forSend)
					}
				}
			} else {
				await sendMessage(`[${store}]: Все отзывы уже отвечены`)
				Logger.info(`[${store}]: Все отзывы уже отвечены`)
			}
		}
		await sendMessage(`[${store}]: Магазин синхронизирован`)
		Logger.info(`[${store}]: Магазин синхронизирован`)
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
