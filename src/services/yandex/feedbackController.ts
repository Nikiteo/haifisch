import {
	type GoodsFeedbackDTO,
	type GetGoodsFeedbackResponse,
	type UpdateGoodsFeedbackCommentRequest,
	type UpdateGoodsFeedbackCommentResponse,
	type GoodsFeedbackCommentDTO,
} from '../../types/yandex/api'
import { logError } from '../../utils/log-error'
import { getService } from '../../utils/get-service'

export const getFeedbacks = async (
	store: string,
	id: number
): Promise<GoodsFeedbackDTO[] | undefined> => {
	const service = getService(store)

	const fetchFeedbacks = async (
		token: string
	): Promise<GoodsFeedbackDTO[]> => {
		const response = await service.post<GetGoodsFeedbackResponse>(
			`businesses/${id}/goods-feedback?limit=50&page_token=${token}`
		)

		const offers = response.data.result

		if (offers?.feedbacks == null) {
			return []
		}

		const feedbacks = offers.feedbacks

		if (feedbacks.length > 0 && offers.paging?.nextPageToken) {
			const nextFeedbacks = await fetchFeedbacks(
				offers.paging.nextPageToken
			)
			return feedbacks.concat(nextFeedbacks)
		}
		return feedbacks
	}

	try {
		return await fetchFeedbacks('')
	} catch (error) {
		logError(error)
	}
}

export const addFeedback = async (
	store: string,
	id: number,
	data?: UpdateGoodsFeedbackCommentRequest
): Promise<GoodsFeedbackCommentDTO | undefined> => {
	const service = getService(store)

	try {
		const response = await service.post<UpdateGoodsFeedbackCommentResponse>(
			`businesses/${id}/goods-feedback/comments/update`,
			data
		)
		return response.data.result
	} catch (error) {
		logError(error)
	}
}
