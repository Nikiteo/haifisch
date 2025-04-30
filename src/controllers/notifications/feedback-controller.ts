import { addFeedback } from '../../services'
import {
	GoodsFeedbackCommentDTO,
	UpdateGoodsFeedbackCommentRequest,
} from '../../types/yandex/api'
import { Logger } from '../../lib'
import { getFeedbackInfo } from './utils'
import { generateResponse } from './gigachat'
import { GoodsFeedbackCreatedNotificationDTO } from '../../types/yandex/notification-types'

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
