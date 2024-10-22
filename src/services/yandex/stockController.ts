import axios, { type AxiosResponse } from 'axios'
import {
	type ErrorResponse,
	type Stores,
	type OfferStores,
	type StocksSendRequest,
} from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'
import Logger from '../../lib/logger'

export const getStocks = async (
	store: string,
	id: number,
	data: {
		offerIds: string[]
	}
): Promise<OfferStores[] | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const getStock = async (token: string): Promise<OfferStores[]> => {
			const response = await service.post<Stores>(
				`campaigns/${id}/offers/stocks?page_token=${token}`,
				data
			)
			const stocks = response.data.result

			if (
				stocks.warehouses[0].offers.length > 0 &&
				Object.keys(stocks.paging).length > 0
			) {
				return stocks.warehouses[0].offers.concat(
					await getStock(stocks.paging.nextPageToken)
				)
			} else {
				return stocks.warehouses[0].offers
			}
		}
		return await getStock('')
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

export const sendStocks = async (
	store: string,
	id: number,
	data: {
		skus: StocksSendRequest[]
	}
): Promise<
	| AxiosResponse<
			{
				status: string
			},
			any
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  >
	| undefined
> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const response = await service.put<{
			status: string
		}>(`campaigns/${id}/offers/stocks`, data)

		return response
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
