import axios, { type AxiosResponse, type AxiosError } from 'axios'
import { type OfferResponse, type ErrorResponse } from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'

export const getOffers = async (
	store: string,
	businessId: string
): Promise<
	AxiosResponse<OfferResponse, any> | ErrorResponse | { message: string }
> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	const data = {
		limit: 200,
		archived: false,
		tags: ['Мрамор', 'мрамор'],
	}

	return await service
		.post<AxiosResponse<OfferResponse>>(
			`businesses/${businessId}/offer-mappings`,
			data
		)
		.then(response => {
			return response.data
		})
		.catch((error: ErrorResponse) => {
			if (axios.isAxiosError(error)) {
				if (error?.response == null || error.code === null) {
					return {
						message: 'No response',
					}
				} else {
					return error.response.data
				}
			} else {
				throw new Error('different error than axios')
			}
		})
}
