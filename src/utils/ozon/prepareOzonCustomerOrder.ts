import dayjs from 'dayjs'
import { Logger } from '../../lib'

import { type Product, type CustomerOrder } from '../../types/ms-types'
import { createCustomerOrderFbs } from './createCustomerOrderFbs'
import { createCustomerOrderFbo } from './createOzonCustomerOrderFbo'
import { Operation, PostingFbo, PostingFbs } from '../../types/ozon/ozon-types'

const createOrders = (
	orders: (PostingFbo | PostingFbs)[],
	products: Product[],
	transactions: Operation[],
	createOrderFn: (
		cur: PostingFbo | PostingFbs,
		boughtItems: Product[],
		transactions: Operation[]
	) => CustomerOrder
): CustomerOrder[] => {
	return orders.reduce<CustomerOrder[]>((acc, cur) => {
		const { products: boughtProducts } = cur
		const boughtItems = products.filter(product =>
			boughtProducts?.some(item => item.offer_id === product.article)
		)

		if (boughtItems.length > 0) {
			acc.push(createOrderFn(cur, boughtItems, transactions))
		}
		return acc
	}, [])
}

const filterRecentOrders = (
	orders: CustomerOrder[],
	postingOrders: (PostingFbo | PostingFbs)[]
): (PostingFbo | PostingFbs)[] => {
	return postingOrders.filter(order =>
		orders.every(item => item.name !== order.posting_number)
	)
}

const mergeOrders = (
	existingOrders: CustomerOrder[],
	newOrders: CustomerOrder[]
): CustomerOrder[] => {
	return [...existingOrders, ...newOrders]
}

export const prepareOzonCustomerOrders = (
	products: Product[],
	fboOrders: PostingFbo[],
	fbsOrders: (PostingFbs & { refundDate?: string })[],
	orders: CustomerOrder[],
	transactions: Operation[]
): CustomerOrder[] => {
	try {
		if (
			products.length === 0 ||
			(fboOrders.length === 0 && fbsOrders.length === 0)
		) {
			return []
		}

		const allOrders: CustomerOrder[] = []

		const processOrders = (
			postingOrders: (PostingFbo | PostingFbs)[],
			createOrderFn: (
				cur: PostingFbo | PostingFbs,
				boughtItems: Product[],
				transactions: Operation[]
			) => CustomerOrder
		) => {
			const existingOrders = orders.reduce<CustomerOrder[]>(
				(acc, order) => {
					const recentOrders = postingOrders.filter(
						cur =>
							order.name === cur.posting_number &&
							dayjs()
								.add(3, 'hour')
								.diff(
									dayjs(order.deliveryPlannedMoment),
									'month'
								) <= 1
					)

					const createdOrders = createOrders(
						recentOrders,
						products,
						transactions,
						createOrderFn
					)
					return mergeOrders(
						acc,
						createdOrders.map(updatedOrder => ({
							...order,
							...updatedOrder,
						}))
					)
				},
				[]
			)

			const newPostingOrders = filterRecentOrders(orders, postingOrders)
			const newCustomerOrders = createOrders(
				newPostingOrders,
				products,
				transactions,
				createOrderFn
			)

			return mergeOrders(existingOrders, newCustomerOrders)
		}

		if (fboOrders.length > 0) {
			allOrders.push(...processOrders(fboOrders, createCustomerOrderFbo))
		}

		if (fbsOrders.length > 0) {
			allOrders.push(...processOrders(fbsOrders, createCustomerOrderFbs))
		}

		return allOrders
	} catch (err) {
		Logger.error(err)
	}

	return []
}
