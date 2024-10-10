import axios from 'axios'
import {
	type ErrorResponse,
	type Return,
	type ReturnsResult,
} from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'
import Logger from '../../lib/logger'

export const getReturns = async (
	store: string,
	id: number
): Promise<Return[] | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const getReturn = async (token: string): Promise<Return[]> => {
			const response = await service.get<ReturnsResult>(
				`campaigns/${id}/returns?limit=200&page_token=${token}`
			)

			const returns = response.data.result

			if (
				returns.returns.length > 0 &&
				Object.keys(returns.paging).length > 0
			) {
				return returns.returns.concat(
					await getReturn(returns.paging.nextPageToken)
				)
			} else {
				return returns.returns
			}
		}

		return await getReturn('')
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
