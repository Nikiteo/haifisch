import axios from 'axios'
import {
	type NewOrderResponse,
	type NewOrder,
	type ErrorResponse,
} from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'
import Logger from '../../lib/logger'

export const getNewOrders = async (
	store: string,
	id: number
): Promise<NewOrder[] | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const getNewOrder = async (page: number): Promise<NewOrder[]> => {
			const response = await service.get<NewOrderResponse>(
				`campaigns/${id}/orders?page=${page}`
			)
			const orders = response.data

			if (page < orders.pager.pagesCount) {
				return orders.orders.concat(
					await getNewOrder(orders.pager.currentPage + 1)
				)
			} else {
				return orders.orders
			}
		}
		return await getNewOrder(1)
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
