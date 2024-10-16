import axios from 'axios'
import {
	type OfferResponse,
	type ErrorResponse,
	type OfferMapping,
	type SendOffersResponse,
	type SendOffer,
} from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'
import Logger from '../../lib/logger'

export const getOffers = async (
	store: string,
	id: number,
	data: {
		archived: boolean
		tags: string[]
	}
): Promise<OfferMapping[] | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const getOffer = async (token: string): Promise<OfferMapping[]> => {
			const response = await service.post<OfferResponse>(
				`businesses/${id}/offer-mappings?limit=200&page_token=${token}`,
				data
			)

			const offers = response.data.result
			if (
				offers.offerMappings.length > 0 &&
				Object.keys(offers.paging).length > 0
			) {
				return offers.offerMappings.concat(
					await getOffer(offers.paging.nextPageToken)
				)
			} else {
				return offers.offerMappings
			}
		}
		return await getOffer('')
	} catch (error: unknown) {
		Logger.warn(error)
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

export const sendOffers = async (
	store: string,
	id: number,
	data: {
		offerMappings: OfferMapping[]
	}
): Promise<SendOffer[] | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const response = await service.post<SendOffersResponse>(
			`businesses/${id}/offer-mappings/update`,
			data
		)

		return response.data.results
	} catch (error: unknown) {
		Logger.warn(error)
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
