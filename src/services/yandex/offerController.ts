import axios from 'axios'
import { type OfferResponse, type ErrorResponse } from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'
import Logger from '../../lib/logger'

export const getOffers = async (
	store: string,
	businessId: string
): Promise<OfferResponse | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	const data = {
		limit: 200,
		archived: false,
		tags: ['Мрамор', 'мрамор'],
	}

	try {
		const response = await service.post<OfferResponse>(
			`businesses/${businessId}/offer-mappings`,
			data
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
