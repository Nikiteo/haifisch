import { type NewOrderResponse, type NewOrder } from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'

export const getNewOrders = async (
	store: string,
	id: number
): Promise<NewOrder[]> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop

	const getNewOrder = async (page: number): Promise<NewOrder[]> => {
		const response = await service.get<NewOrderResponse>(
			`campaigns/${id}/orders?${page}`
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
}
