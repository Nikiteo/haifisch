import { apiService } from './service'

import axios from 'axios'
import {
	type ResponseMS,
	type CustomerOrder,
	type ErrorResponse,
} from '../../types/msTypes'
import Logger from '../../lib/logger'

export const getCustomerOrders = async (dates: {
	dateFrom: string
	dateTo: string
}): Promise<CustomerOrder[] | undefined> => {
	try {
		const getCustomerOrder = async (
			offset: number
		): Promise<CustomerOrder[]> => {
			const response = await apiService.get<ResponseMS<CustomerOrder>>(
				`entity/customerorder?offset=${offset}?filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
			)

			const orders = response.data.rows

			if (
				response.data.meta.size >
				response.data.meta.limit + response.data.meta.offset
			) {
				return orders.concat(await getCustomerOrder(1000))
			} else {
				return orders
			}
		}
		return await getCustomerOrder(0)
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

export const createCustomerOrder = async (
	orders: CustomerOrder[]
): Promise<CustomerOrder[] | undefined> => {
	try {
		const response = await apiService.post<CustomerOrder[]>(
			'entity/customerorder',
			orders
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
