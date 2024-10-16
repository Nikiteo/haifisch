import axios from 'axios'
import {
	type ErrorResponse,
	type StocksResponseFbs,
	type StockResponseFbs,
	type SendOzonStock,
	type StockRequest,
	type SendOzonStocks,
} from '../../types/ozonTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getOzonStocks = async ({
	...props
}: {
	sku: string[]
}): Promise<StockResponseFbs[] | undefined> => {
	try {
		const response = await apiService.post<StocksResponseFbs>(
			'/v1/product/info/stocks-by-warehouse/fbs',
			{ ...props }
		)
		return response.data.result
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

export const sendOzonStocks = async ({
	...props
}: {
	stocks: StockRequest[]
}): Promise<SendOzonStock[] | undefined> => {
	try {
		const response = await apiService.post<SendOzonStocks>(
			'v2/products/stocks',
			{ ...props }
		)
		return response.data.result
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
