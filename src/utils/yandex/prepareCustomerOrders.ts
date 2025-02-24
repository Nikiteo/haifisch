import dayjs from 'dayjs'
import { Logger } from '../../lib'

import { type Product, type CustomerOrder } from '../../types/ms-types'
import { createCustomerOrder } from './createCustomerOrder'
import {
	type EnrichedOrdersStatsOrderDTO,
	type OrdersStatsOrderDTO,
} from '../../types/yandex/api'

const filterAndCreateOrders = (
	orders: Array<EnrichedOrdersStatsOrderDTO | OrdersStatsOrderDTO>,
	products: Product[],
	domain: string,
	type: string,
	existingOrders: CustomerOrder[]
): CustomerOrder[] => {
	return orders
		.filter(order => order.status !== 'CANCELLED_BEFORE_PROCESSING')
		.reduce<CustomerOrder[]>((acc, cur) => {
			const { items } = cur
			const boughtProducts = products.filter(product =>
				items?.some(item => item.shopSku === product.article)
			)

			if (boughtProducts.length > 0) {
				const newOrder = createCustomerOrder(
					domain,
					cur,
					boughtProducts,
					type
				)
				const existingOrder = existingOrders.find(
					order => order.name === cur.id?.toString()
				)

				if (existingOrder) {
					const timeDiff = dayjs()
						.add(3, 'hour')
						.diff(
							dayjs(existingOrder.deliveryPlannedMoment),
							'month'
						)
					if (timeDiff <= 1) {
						acc.push({ ...existingOrder, ...newOrder })
					}
				} else {
					acc.push(newOrder)
				}
			}
			return acc
		}, [])
}

export const prepareCustomerOrders = (
	products: Product[],
	fbs: EnrichedOrdersStatsOrderDTO[] | OrdersStatsOrderDTO[],
	fby: EnrichedOrdersStatsOrderDTO[] | OrdersStatsOrderDTO[],
	orders: CustomerOrder[],
	domain: string
): CustomerOrder[] => {
	try {
		if ((fbs.length === 0 && fby.length === 0) || products.length === 0) {
			return []
		}

		const allOrders: CustomerOrder[] = []

		if (orders.length === 0) {
			allOrders.push(
				...filterAndCreateOrders(fby, products, domain, 'FBY', [])
			)
			allOrders.push(
				...filterAndCreateOrders(fbs, products, domain, 'FBS', [])
			)
		} else {
			allOrders.push(
				...filterAndCreateOrders(fby, products, domain, 'FBY', orders)
			)
			allOrders.push(
				...filterAndCreateOrders(fbs, products, domain, 'FBS', orders)
			)
		}

		return allOrders
	} catch (err) {
		Logger.error(err)
		return []
	}
}
