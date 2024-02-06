import axios from 'axios'
import {
	type ProductPricesRequest,
	type ErrorResponse,
	type ProductPrices,
} from '../../types/ozonTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getProductPrices = async ({
	...props
}: ProductPricesRequest): Promise<ProductPrices | undefined> => {
	try {
		const response = await apiService.post<ProductPrices>(
			'v4/product/info/prices',
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
