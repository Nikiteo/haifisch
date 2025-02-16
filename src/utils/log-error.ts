import axios from 'axios'
import Logger from '../lib/logger'
import { type ApiErrorResponse } from '../types/yandex/api'

export const logError = (error: unknown): void => {
	Logger.warn(error)
	const err = error as ApiErrorResponse
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
