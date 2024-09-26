import dayjs from 'dayjs'
import Logger from '../../lib/logger'
import { type Product, type CustomerOrder } from '../../types/msTypes'
import {
	type FboOrder,
	type Posting,
	type Operation,
} from '../../types/ozonTypes'
import { createCustomerOrderFbs } from './createCustomerOrderFbs'
import { createCustomerOrderFbo } from './createOzonCustomerOrderFbo'

export const prepareOzonCustomerOrders = (
	products: Product[],
	fboOrders: FboOrder[],
	fbsOrders: Posting[],
	orders: CustomerOrder[],
	transactions: Operation[]
): CustomerOrder[] => {
	try {
		if (fboOrders.length === 0 && fbsOrders.length === 0) {
			return []
		}

		if (products.length === 0) {
			return []
		}

		if (orders.length === 0) {
			const allOrders = [] as CustomerOrder[]

			if (fboOrders.length !== 0) {
				const ordersFbo = fboOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						const { products: boughtProducts } = cur
						const boughtItems = products.filter(product =>
							boughtProducts.some(
								item => item.offer_id === product.article
							)
						)
						if (boughtItems.length > 0) {
							acc.push(
								createCustomerOrderFbo(
									cur,
									boughtItems,
									transactions
								)
							)
						}
						return acc
					},
					[]
				)
				allOrders.push(...ordersFbo)
			}

			if (fbsOrders.length !== 0) {
				const ordersFbs = fbsOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						const { products: boughtProducts } = cur
						const boughtItems = products.filter(product =>
							boughtProducts.some(
								item => item.offer_id === product.article
							)
						)
						if (boughtItems.length > 0) {
							acc.push(
								createCustomerOrderFbs(
									cur,
									boughtItems,
									transactions
								)
							)
						}
						return acc
					},
					[]
				)
				allOrders.push(...ordersFbs)
			}

			return allOrders
		}

		if (orders.length !== 0) {
			const allOrders = [] as CustomerOrder[]

			if (fboOrders.length !== 0) {
				const ordersFbo = fboOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						orders.forEach(order => {
							if (
								order.name === cur.posting_number &&
								dayjs()
									.add(3, 'hour')
									.diff(
										dayjs(order.deliveryPlannedMoment),
										'month'
									) <= 1
							) {
								const { products: boughtProducts } = cur
								const boughtItems = products.filter(product =>
									boughtProducts.some(
										item =>
											item.offer_id === product.article
									)
								)
								if (boughtItems.length > 0) {
									const updatedOrders =
										createCustomerOrderFbo(
											cur,
											boughtItems,
											transactions
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

				const findNewOrders = fboOrders.filter(order =>
					orders.every(item => item.name !== order.posting_number)
				)

				const newCustomerOrders = findNewOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						const { products: boughtProducts } = cur
						const boughtItems = products.filter(product =>
							boughtProducts.some(
								item => item.offer_id === product.article
							)
						)
						if (boughtItems.length > 0) {
							acc.push(
								createCustomerOrderFbo(
									cur,
									boughtItems,
									transactions
								)
							)
						}
						return acc
					},
					[]
				)
				allOrders.push(...ordersFbo, ...newCustomerOrders)
			}

			if (fbsOrders.length !== 0) {
				const ordersFbs = fbsOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						orders.forEach(order => {
							if (
								order.name === cur.posting_number &&
								dayjs()
									.add(3, 'hour')
									.diff(
										dayjs(order.deliveryPlannedMoment),
										'month'
									) <= 1
							) {
								const { products: boughtProducts } = cur
								const boughtItems = products.filter(product =>
									boughtProducts.some(
										item =>
											item.offer_id === product.article
									)
								)
								if (boughtItems.length > 0) {
									const updatedOrders =
										createCustomerOrderFbs(
											cur,
											boughtItems,
											transactions
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

				const findNewOrders = fbsOrders.filter(order =>
					orders.every(item => item.name !== order.posting_number)
				)

				const newCustomerOrders = findNewOrders.reduce<CustomerOrder[]>(
					(acc, cur) => {
						const { products: boughtProducts } = cur
						const boughtItems = products.filter(product =>
							boughtProducts.some(
								item => item.offer_id === product.article
							)
						)
						if (boughtItems.length > 0) {
							acc.push(
								createCustomerOrderFbs(
									cur,
									boughtItems,
									transactions
								)
							)
						}
						return acc
					},
					[]
				)
				allOrders.push(...ordersFbs, ...newCustomerOrders)
			}

			return allOrders
		}
	} catch (err) {
		Logger.error(err)
	}

	return []
}
