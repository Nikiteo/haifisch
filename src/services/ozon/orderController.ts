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

export const getOzonFboOrders = async ({
	...props
}: RequestOzonFboOrders): Promise<
	FboOrderResponse<FboOrder> | ErrorResponse | { message: string }
> => {
	return await apiService
		.post<FboOrderResponse<FboOrder>>('v2/posting/fbo/list', { ...props })
		.then(response => {
			return response.data
		})
		.catch((error: ErrorResponse) => {
			if (axios.isAxiosError(error)) {
				if (error?.response == null || error.code === null) {
					return {
						message: 'No response',
					}
				} else {
					return error.response.data
				}
			} else {
				throw new Error('different error than axios')
			}
		})
}

export const getOzonFbsOrders = async ({
	...props
}: RequestOzonFbsOrders): Promise<
	ErrorResponse | FbsOrderResponse<Posting> | { message: string }
> => {
	return await apiService
		.post<FbsOrderResponse<Posting>>('v3/posting/fbs/list', { ...props })
		.then(response => {
			return response.data
		})
		.catch((error: ErrorResponse) => {
			if (axios.isAxiosError(error)) {
				if (error?.response == null || error.code === null) {
					return {
						message: 'No response',
					}
				} else {
					return error.response.data
				}
			} else {
				throw new Error('different error than axios')
			}
		})
}
