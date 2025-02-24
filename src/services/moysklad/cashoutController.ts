/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios'
import { type Cashout, type ErrorResponse } from '../../types/ms-types'
import { apiService } from './service'
import { Logger } from '../../lib'

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
				throw new Error('No response from server')
			} else {
				const errorMessage =
					// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
					err.response.data.errors &&
					Array.isArray(err.response.data.errors)
						? err.response.data.errors[0].error
						: 'Unknown error occurred'
				Logger.error(errorMessage)
				throw new Error(errorMessage)
			}
		} else {
			Logger.error('Different error than axios')
			throw new Error('An unexpected error occurred')
		}
	}
}
