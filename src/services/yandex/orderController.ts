import { getService } from '../../utils/get-service'
import {
	type GetOrdersStatsResponse,
	type OrdersStatsOrderDTO,
	type GetOrdersResponse,
	type OrderDTO,
	type GetOrdersStatsRequest,
} from '../../types/yandex/api'
import { logError } from '../../utils/log-error'

export const getOrdersStats = async (
	store: string,
	id: number,
	data: GetOrdersStatsRequest
): Promise<OrdersStatsOrderDTO[] | undefined> => {
	const service = getService(store)

	const fetchOrders = async (
		token: string
	): Promise<OrdersStatsOrderDTO[]> => {
		const response = await service.post<GetOrdersStatsResponse>(
			`campaigns/${id}/stats/orders?limit=200&page_token=${token}`,
			data
		)

		const orders = response.data.result

		if (orders?.orders && orders.orders.length > 0) {
			const nextPageToken = orders.paging?.nextPageToken
			if (nextPageToken !== token) {
				const nextOrders = nextPageToken
					? await fetchOrders(nextPageToken)
					: []
				return orders.orders.concat(nextOrders)
			}
		}
		return []
	}

	try {
		return await fetchOrders('')
	} catch (error: unknown) {
		logError(error)
	}
}

export const getOrders = async (
	store: string,
	id: number
): Promise<OrderDTO[] | undefined> => {
	const service = getService(store)

	const fetchOrders = async (token: string): Promise<OrderDTO[]> => {
		const response = await service.get<GetOrdersResponse>(
			`campaigns/${id}/orders?limit=200&page_token=${token}`
		)
		const orders = response.data

		if (orders?.orders && orders.orders.length > 0) {
			const nextPageToken = orders.paging?.nextPageToken
			if (nextPageToken !== token) {
				const nextOrders = nextPageToken
					? await fetchOrders(nextPageToken)
					: []
				return orders.orders.concat(nextOrders)
			}
		}
		return []
	}

	try {
		return await fetchOrders('')
	} catch (error: unknown) {
		logError(error)
	}
}
