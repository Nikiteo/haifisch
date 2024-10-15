import axios from 'axios'
import {
	type ErrorResponse,
	type OffersAttributesOzonRequest,
	type OfferAttributesResponse,
} from '../../types/ozonTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getOzonAttributes = async ({
	...props
}: OffersAttributesOzonRequest): Promise<
	OfferAttributesResponse | undefined
> => {
	try {
		const response = await apiService.post<OfferAttributesResponse>(
			'v3/products/info/attributes',
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
