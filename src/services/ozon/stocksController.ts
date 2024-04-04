import axios from 'axios'
import {
	type ErrorResponse,
	type GetStocks,
	type StocksOnWarehouses,
} from '../../types/ozonTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getOzonStocks = async ({
	...props
}: GetStocks): Promise<StocksOnWarehouses | undefined> => {
	try {
		const response = await apiService.post<StocksOnWarehouses>(
			'v2/analytics/stock_on_warehouses',
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
