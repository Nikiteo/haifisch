import axios from 'axios'
import {
	type ErrorResponse,
	type OffersOzonRequest,
	type OfferResponseOzon,
} from '../../types/ozonTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getOzonOffers = async ({
	...props
}: OffersOzonRequest): Promise<OfferResponseOzon | undefined> => {
	try {
		const response = await apiService.post<OfferResponseOzon>(
			'v3/product/info/list',
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
