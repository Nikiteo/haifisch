import axios from 'axios'
import { Logger } from '../lib'
import { type ErrorResponse } from '../types/ozon/ozon-types'

export const logOzonError = (error: unknown): void => {
	Logger.warn(error)
	const err = error as ErrorResponse
	if (axios.isAxiosError(err)) {
		if (err?.response == null || err.code === null) {
			Logger.error('No response')
		} else {
			Logger.error(err.response.data)
		}
	} else {
		Logger.error('Different error than axios')
	}
}
