import axios from 'axios'
import {
	type ProductPricesRequest,
	type ErrorResponse,
	type ProductPrices,
} from '../../types/ozonTypes'
import { apiService } from './service'

export const getProductPrices = async ({
	...props
}: ProductPricesRequest): Promise<
	ProductPrices | ErrorResponse | { message: string }
> => {
	return await apiService
		.post<ProductPrices>('v4/product/info/prices', { ...props })
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
