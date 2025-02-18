import axios from 'axios'
import {
	type GetRequestOzonReturns,
	type ErrorResponse,
	type OzonReturns,
	type ResponseOzonReturns,
	type GiveoutsResponse,
	type Giveout,
} from '../../types/ozonTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getOzonReturns = async ({
	...props
}: GetRequestOzonReturns): Promise<OzonReturns[] | undefined> => {
	try {
		const response = await apiService.post<ResponseOzonReturns>(
			'v1/returns/list',
			{
				...props,
			}
		)
		return response.data.returns
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

export const getGiveoutsOzon = async (): Promise<Giveout[] | undefined> => {
	try {
		const response = await apiService.post<GiveoutsResponse>(
			'v1/return/giveout/list',
			{
				limit: 500,
			}
		)
		return response.data.giveouts
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
