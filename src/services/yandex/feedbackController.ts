import axios from 'axios'
import {
	type FeedbacksSendResp,
	type Feedback,
	type GetFeedbacksResponse,
	type FeedbackSendReq,
} from '../../types/marketTypes'
import { type ErrorResponse } from '../../types/msTypes'
import { apiServiceHf, apiServiceTop } from './service'
import Logger from '../../lib/logger'

export const getFeedbacks = async (
	store: string,
	id: number
): Promise<Feedback[] | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const getFeedback = async (token: string): Promise<Feedback[]> => {
			const response = await service.post<GetFeedbacksResponse>(
				`businesses/${id}/goods-feedback?limit=50&page_token=${token}`
			)

			const offers = response.data.result
			if (
				offers.feedbacks.length > 0 &&
				Object.keys(offers.paging).length > 0
			) {
				return offers.feedbacks.concat(
					await getFeedback(offers.paging.nextPageToken)
				)
			} else {
				return offers.feedbacks
			}
		}
		return await getFeedback('')
	} catch (error: unknown) {
		Logger.warn(error)
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				Logger.error(err.response.data)
			}
		} else {
			Logger.error('different error than axios')
		}
	}
}
// FeedbacksSendResp
export const addFeedback = async (
	store: string,
	id: number,
	data?: FeedbackSendReq
): Promise<FeedbacksSendResp | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const response = await service.post<FeedbacksSendResp>(
			`businesses/${id}/goods-feedback/comments/update`,
			data
		)
		return response.data
	} catch (error: unknown) {
		Logger.warn(error)
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				Logger.error(err.response.data)
			}
		} else {
			Logger.error('different error than axios')
		}
	}
}
