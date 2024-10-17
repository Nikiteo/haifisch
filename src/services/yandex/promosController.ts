import axios from 'axios'
import {
	type PromosOffers,
	type ErrorResponse,
	type Promo,
	type PromosResponse,
	type PromoOffer,
	type UpdatePromosRequest,
	type UpdatePromosResponse,
	type UpdatePromosResp,
	type DeletePromosOffersRequest,
} from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'
import Logger from '../../lib/logger'

export const getPromos = async (
	store: string,
	id: number
): Promise<Promo[] | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const response = await service.post<PromosResponse>(
			`businesses/${id}/promos`
		)
		return response.data.result.promos
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

export const getPromosOffers = async (
	store: string,
	id: number,
	data: {
		promoId: string
	}
): Promise<PromoOffer[] | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const response = await service.post<PromosOffers>(
			`businesses/${id}/promos/offers?limit=500`,
			data
		)
		return response.data.result.offers
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

export const addPromosOffers = async (
	store: string,
	id: number,
	data?: UpdatePromosRequest
): Promise<UpdatePromosResp | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const response = await service.post<UpdatePromosResponse>(
			`businesses/${id}/promos/offers/update`,
			data
		)
		return response.data.result
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

export const deletePromosOffers = async (
	store: string,
	id: number,
	data?: DeletePromosOffersRequest
): Promise<UpdatePromosResp | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const response = await service.post<UpdatePromosResponse>(
			`businesses/${id}/promos/offers/delete`,
			data
		)
		return response.data.result
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
