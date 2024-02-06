import axios from 'axios'
import {
	type RequestOzonReturns,
	type OzonReturnFbo,
	type OzonReturnFbs,
	type ErrorResponse,
	type Returns,
} from '../../types/ozonTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getOzonFboReturns = async ({
	...props
}: RequestOzonReturns): Promise<Returns<OzonReturnFbo> | undefined> => {
	try {
		const response = await apiService.post<Returns<OzonReturnFbo>>(
			'v3/returns/company/fbo',
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

export const getOzonFbsReturns = async ({
	...props
}: RequestOzonReturns): Promise<Returns<OzonReturnFbs> | undefined> => {
	try {
		const response = await apiService.post<Returns<OzonReturnFbs>>(
			'v3/returns/company/fbs',
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
