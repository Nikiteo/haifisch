import dayjs from 'dayjs'
import Logger from '../../lib/logger'
import { type Order, type AddedOrder } from '../../types/marketTypes'
import { type Product, type CustomerOrder } from '../../types/msTypes'
import { createCustomerOrder } from './createCustomerOrder'

export const prepareCustomerOrders = (
	products: Product[],
	fby: AddedOrder[],
	fbs: Order[],
	orders: CustomerOrder[],
	domain: string
): CustomerOrder[] => {
	try {
		if (fby.length === 0 && fbs.length === 0) {
			return []
		}

		if (products.length === 0) {
			return []
		}

		if (orders.length === 0) {
			const allOrders = [] as CustomerOrder[]

			if (fby.length !== 0) {
				const fbyOrders = fby
					.filter(
						order => order.status !== 'CANCELLED_BEFORE_PROCESSING'
					)
					.reduce<CustomerOrder[]>((acc, cur) => {
						const { items } = cur
						const boughtProducts = products.filter(product =>
							items?.some(
								item => item.shopSku === product.article
							)
						)
						if (boughtProducts.length > 0) {
							acc.push(
								createCustomerOrder(
									domain,
									cur,
									boughtProducts,
									'FBY'
								)
							)
						}
						return acc
					}, [])
				allOrders.push(...fbyOrders)
			}

			if (fbs.length !== 0) {
				const fbsOrders = fbs
					.filter(
						order => order.status !== 'CANCELLED_BEFORE_PROCESSING'
					)
					.reduce<CustomerOrder[]>((acc, cur) => {
						const { items } = cur
						const boughtProducts = products.filter(product =>
							items?.some(
								item => item.shopSku === product.article
							)
						)
						if (boughtProducts.length > 0) {
							acc.push(
								createCustomerOrder(
									domain,
									cur,
									boughtProducts,
									'FBS'
								)
							)
						}
						return acc
					}, [])
				allOrders.push(...fbsOrders)
			}

			return allOrders
		}

		if (orders.length !== 0) {
			const allOrders = [] as CustomerOrder[]

			if (fby.length !== 0) {
				const fbyOrders = fby
					.filter(
						order => order.status !== 'CANCELLED_BEFORE_PROCESSING'
					)
					.reduce<CustomerOrder[]>((acc, cur) => {
						orders.forEach(order => {
							if (
								order.name === cur.id?.toString() &&
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
												item.shopSku === product.article
										)
								)
								if (boughtProducts.length > 0) {
									const updatedOrders = createCustomerOrder(
										domain,
										cur,
										boughtProducts,
										'FBY'
									)
									acc.push({
										...order,
										...updatedOrders,
									})
								}
							}
						})
						return acc
					}, [])
				const findNewOrders = fby
					.filter(
						order => order.status !== 'CANCELLED_BEFORE_PROCESSING'
					)
					.filter(order =>
						orders.every(item => item.name !== order.id?.toString())
					)

				const newCustomerOrders = findNewOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						const { items } = cur
						const boughtProducts = products.filter(product =>
							items?.some(
								item => item.shopSku === product.article
							)
						)
						if (boughtProducts.length > 0) {
							acc.push(
								createCustomerOrder(
									domain,
									cur,
									boughtProducts,
									'FBY'
								)
							)
						}
						return acc
					},
					[]
				)
				allOrders.push(...fbyOrders, ...newCustomerOrders)
			}

			if (fbs.length !== 0) {
				const fbsOrders = fbs
					.filter(
						order => order.status !== 'CANCELLED_BEFORE_PROCESSING'
					)
					.reduce<CustomerOrder[]>((acc, cur) => {
						orders.forEach(order => {
							if (
								order.name === cur.id?.toString() &&
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
												item.shopSku === product.article
										)
								)
								if (boughtProducts.length > 0) {
									const updatedOrders = createCustomerOrder(
										domain,
										cur,
										boughtProducts,
										'FBS'
									)
									acc.push({
										...order,
										...updatedOrders,
									})
								}
							}
						})
						return acc
					}, [])
				const findNewOrders = fbs
					.filter(
						order => order.status !== 'CANCELLED_BEFORE_PROCESSING'
					)
					.filter(order =>
						orders.every(item => item.name !== order.id?.toString())
					)

				const newCustomerOrders = findNewOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						const { items } = cur
						const boughtProducts = products.filter(product =>
							items?.some(
								item => item.shopSku === product.article
							)
						)
						if (boughtProducts.length > 0) {
							acc.push(
								createCustomerOrder(
									domain,
									cur,
									boughtProducts,
									'FBS'
								)
							)
						}
						return acc
					},
					[]
				)
				allOrders.push(...fbsOrders, ...newCustomerOrders)
			}

			return allOrders
		}

		return []
	} catch (err) {
		Logger.error(err)
	}

	return []
}
