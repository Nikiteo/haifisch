import axios from 'axios'
import { type Cashout, type ErrorResponse } from '../../types/msTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const createCashout = async (
	cashouts: Cashout
): Promise<Cashout | undefined> => {
	try {
		const response = await apiService.post<Cashout>(
			'entity/cashout',
			cashouts
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
