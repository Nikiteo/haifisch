import axios from 'axios'

import { apiService } from './service'
import Logger from '../../lib/logger'
import { type ErrorResponse } from '../../types/msTypes'

export const actCreate = async ({
	...props
}: {
	carriage_id: 0
	containers_count: 0
}): Promise<
	| {
			status: number
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
	| undefined
> => {
	try {
		const response = await apiService.post<{
			status: number
		}>('v1/carriage/approve', { ...props })
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
