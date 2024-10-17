import axios from 'axios'

import { apiService } from './service'
import Logger from '../../lib/logger'
import {
	type PromosHotSale,
	type ErrorResponse,
	type Promo,
	type Promos,
	type PromoHotSale,
	type PromosOffersReq,
	type PromoProduct,
	type PromosOffersResponse,
	type PromosOffersHotSaleReq,
	type PromoHotSaleProduct,
	type PromosOffersHotSaleResponse,
	type SendPromosOffers,
	type SendPromoOfferResponse,
	type SendPromosOffersResponse,
	type SendPromoOfferHotSaleResponse,
	type SendPromoOffersHotSaleResponse,
} from '../../types/ozonTypes'

export const getPromos = async (): Promise<Promo[] | undefined> => {
	try {
		const response = await apiService.get<Promos>('v1/actions')
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

export const getPromosHotSale = async (): Promise<
	PromoHotSale[] | undefined
> => {
	try {
		const response = await apiService.post<PromosHotSale>(
			'v1/actions/hotsales/list',
			{}
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

export const getPromosOffers = async (
	data: PromosOffersReq
): Promise<PromoProduct[] | undefined> => {
	try {
		const response = await apiService.post<PromosOffersResponse>(
			'v1/actions/candidates',
			data
		)
		return response.data.result.products
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

export const sendPromosOffers = async (
	data: SendPromosOffers
): Promise<SendPromoOfferResponse | undefined> => {
	try {
		const response = await apiService.post<SendPromosOffersResponse>(
			'/v1/actions/products/activate',
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

export const sendPromosOffersHotSale = async (
	data: SendPromoOffersHotSaleResponse
): Promise<SendPromoOffersHotSaleResponse | undefined> => {
	try {
		const response = await apiService.post<SendPromoOfferHotSaleResponse>(
			'/v1/actions/hotsales/activate',
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

export const getPromosOffersHotSale = async (
	data: PromosOffersHotSaleReq
): Promise<PromoHotSaleProduct[] | undefined> => {
	try {
		const response = await apiService.post<PromosOffersHotSaleResponse>(
			'v1/actions/hotsales/products',
			data
		)
		return response.data.result.products
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
