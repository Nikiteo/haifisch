import {
	type AddedOrder,
	type NewOrder,
	type Order,
} from '../../types/marketTypes'

interface Response {
	ordersWithNewData: AddedOrder[]
	filteredOrders: Order[]
}

export const filterYandexOrders = (
	orders: Order[],
	newOrders: NewOrder[]
): Response => {
	const ordersWithNewData = orders.reduce<AddedOrder[]>((acc, cur) => {
		newOrders.forEach(newOrder => {
			if (newOrder.id === cur.id) {
				acc.push({
					...cur,
					delivery: newOrder.delivery,
					substatus: newOrder.substatus,
				})
			}
		})
		return acc
	}, [])

	const filteredOrders = orders.filter(order =>
		ordersWithNewData.every(newOrder => newOrder.id !== order.id)
	)

	return {
		ordersWithNewData,
		filteredOrders,
	}
}
