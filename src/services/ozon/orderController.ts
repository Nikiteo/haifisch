import axios from 'axios'
import {
	type FboOrder,
	type ErrorResponse,
	type FboOrderResponse,
	type FbsOrderResponse,
	type RequestOzonFboOrders,
	type RequestOzonFbsOrders,
	type Posting,
} from '../../types/ozonTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getOzonFboOrders = async ({
	...props
}: RequestOzonFboOrders): Promise<FboOrderResponse<FboOrder> | undefined> => {
	try {
		const response = await apiService.post<FboOrderResponse<FboOrder>>(
			'v2/posting/fbo/list',
			{ ...props }
		)
		return response.data
	} catch (error: unknown) {
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

export const getOzonFbsOrders = async ({
	...props
}: RequestOzonFbsOrders): Promise<FbsOrderResponse<Posting> | undefined> => {
	try {
		const response = await apiService.post<FbsOrderResponse<Posting>>(
			'v3/posting/fbs/list',
			{ ...props }
		)
		return response.data
	} catch (error: unknown) {
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
