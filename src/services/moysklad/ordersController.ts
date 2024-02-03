import { apiService } from './service'

import axios from 'axios'
import {
	type ResponseMS,
	type CustomerOrder,
	type ErrorResponse,
} from '../../types/msTypes'

export const getCustomerOrders = async (dates: {
	dateFrom: string
	dateTo: string
}): Promise<
	ResponseMS<CustomerOrder> | ErrorResponse | { message: string }
> => {
	return await apiService
		.get<ResponseMS<CustomerOrder>>(
			`entity/customerorder?filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
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

export const createCustomerOrder = async (
	orders: CustomerOrder[]
): Promise<CustomerOrder[] | ErrorResponse | { message: string }> => {
	return await apiService
		.post<CustomerOrder[]>('entity/customerorder', orders)
		.then(response => {
			if (response.status !== 200) {
				throw new Error('Кажется, что в entity/customerorder ошибки')
			} else {
				return response.data
			}
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
		.finally(() => {})
}
