import axios from 'axios'
import {
	type ErrorResponse,
	type Order,
	type OrderResponse,
} from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'
import Logger from '../../lib/logger'

export const getOrders = async (
	store: string,
	id: number,
	data: {
		dateFrom: string
		dateTo: string
	}
): Promise<Order[] | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	try {
		const getOrder = async (token: string): Promise<Order[]> => {
			const response = await service.post<OrderResponse>(
				`campaigns/${id}/stats/orders?limit=200&page_token=${token}`,
				data
			)

			const orders = response.data.result

			if (
				orders.orders.length > 0 &&
				Object.keys(orders.paging).length > 0
			) {
				return orders.orders.concat(
					await getOrder(orders.paging.nextPageToken)
				)
			} else {
				return orders.orders
			}
		}

		return await getOrder('')
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
