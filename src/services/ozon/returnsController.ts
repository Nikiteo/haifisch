import axios, { type AxiosError } from 'axios'
import {
	type RequestOzonReturns,
	type OzonReturnFbo,
	type OzonReturnFbs,
	type ErrorResponse,
	type Returns,
} from '../../types/ozonTypes'
import { apiService } from './service'

export const getOzonFboReturns = async ({
	...props
}: RequestOzonReturns): Promise<
	Returns<OzonReturnFbo> | ErrorResponse | { message: string }
> => {
	return await apiService
		.post<Returns<OzonReturnFbo>>('v3/returns/company/fbo', { ...props })
		.then(response => {
			return response.data
		})
		.catch((error: AxiosError<ErrorResponse>) => {
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

export const getOzonFbsReturns = async ({
	...props
}: RequestOzonReturns): Promise<
	ErrorResponse | Returns<OzonReturnFbs> | { message: string }
> => {
	return await apiService
		.post<Returns<OzonReturnFbs>>('v3/returns/company/fbs', { ...props })
		.then(response => {
			return response.data
		})
		.catch((error: AxiosError<ErrorResponse>) => {
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
