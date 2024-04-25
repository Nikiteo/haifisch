import dayjs from 'dayjs'
import Logger from '../../lib/logger'
import { type Product, type CustomerOrder } from '../../types/msTypes'
import { createCustomerOrder } from './createCustomerOrder'
import { type Shipment } from '../../types/sberTypes'

export const prepareCustomerOrders = (
	products: Product[],
	orders: CustomerOrder[],
	sberOrders: Shipment[]
): CustomerOrder[] => {
	try {
		if (sberOrders.length === 0) {
			return []
		}

		if (products.length === 0) {
			return []
		}

		if (orders.length === 0) {
			const allOrders = [] as CustomerOrder[]

			if (sberOrders.length !== 0) {
				const orders = sberOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						const { items } = cur
						const boughtProducts = products.filter(product =>
							items?.some(
								item => item.offerId === product.article
							)
						)
						if (boughtProducts.length > 0) {
							acc.push(createCustomerOrder(cur, boughtProducts))
						}
						return acc
					},
					[]
				)
				allOrders.push(...orders)
			}

			return allOrders
		}

		if (orders.length !== 0) {
			const allOrders = [] as CustomerOrder[]

			if (sberOrders.length !== 0) {
				const fbyOrders = sberOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						orders.forEach(order => {
							if (
								order.name === cur.shipmentId?.toString() &&
								dayjs()
									.add(3, 'hour')
									.diff(
										dayjs(order.deliveryPlannedMoment),
										'month'
									) <= 1
							) {
								const { items } = cur
								const boughtProducts = products.filter(
									product =>
										items?.some(
											item =>
												item.offerId === product.article
										)
								)
								if (boughtProducts.length > 0) {
									const updatedOrders = createCustomerOrder(
										cur,
										boughtProducts
									)
									acc.push({
										...order,
										...updatedOrders,
									})
								}
							}
						})
						return acc
					},
					[]
				)
				const findNewOrders = sberOrders.filter(order =>
					orders.every(
						item => item.name !== order.shipmentId?.toString()
					)
				)

				const newCustomerOrders = findNewOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						const { items } = cur
						const boughtProducts = products.filter(product =>
							items?.some(
								item => item.offerId === product.article
							)
						)
						if (boughtProducts.length > 0) {
							acc.push(createCustomerOrder(cur, boughtProducts))
						}
						return acc
					},
					[]
				)
				allOrders.push(...fbyOrders, ...newCustomerOrders)
			}

			return allOrders
		}

		return []
	} catch (err) {
		Logger.error(err)
	}

	return []
}
