import dayjs from 'dayjs'
import Logger from '../../lib/logger'
import { type Product, type CustomerOrder } from '../../types/msTypes'
import { createCustomerOrderFbs } from './createCustomerOrderFbs'
import { createCustomerOrderFbo } from './createOzonCustomerOrderFbo'
import { Operation, PostingFbo, PostingFbs } from '../../types/ozon/ozon-types'

const createOrders = (
	orders: (PostingFbo | PostingFbs)[],
	products: Product[],
	transactions: Operation[],
	existingOrders: CustomerOrder[],
	createOrderFn: (
		cur: PostingFbo | PostingFbs,
		boughtItems: Product[],
		transactions: Operation[]
	) => CustomerOrder
): CustomerOrder[] => {
	return orders.flatMap(cur => {
		const { products: boughtProducts } = cur
		const boughtItems = products.filter(product =>
			boughtProducts?.some(item => item.offer_id === product.article)
		)

		if (boughtItems.length === 0) {
			return []
		}

		const isExistingOrder = existingOrders.some(
			order => order.name === cur.posting_number
		)
		const isRecentOrder = existingOrders.some(
			order =>
				dayjs()
					.add(3, 'hour')
					.diff(dayjs(order.deliveryPlannedMoment), 'month') <= 1
		)

		if (isExistingOrder && isRecentOrder) {
			return existingOrders.map(order => ({
				...order,
				...createOrderFn(cur, boughtItems, transactions),
			}))
		}

		return [createOrderFn(cur, boughtItems, transactions)]
	})
}

export const prepareOzonCustomerOrders = (
	products: Product[],
	fboOrders: PostingFbo[],
	fbsOrders: PostingFbs[],
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

		if (orders.length === 0) {
			allOrders.push(
				...createOrders(
					fboOrders,
					products,
					transactions,
					[],
					createCustomerOrderFbo
				),
				...createOrders(
					fbsOrders,
					products,
					transactions,
					[],
					(cur, boughtItems, transactions) => {
						if ('refundDate' in cur) {
							return createCustomerOrderFbs(
								cur as PostingFbs & { refundDate: string },
								boughtItems,
								transactions
							)
						}
						return {} as CustomerOrder
					}
				)
			)
		} else {
			const existingOrders = orders

			allOrders.push(
				...createOrders(
					fboOrders,
					products,
					transactions,
					existingOrders,
					createCustomerOrderFbo
				),
				...createOrders(
					fbsOrders,
					products,
					transactions,
					existingOrders,
					(cur, boughtItems, transactions) => {
						if ('refundDate' in cur) {
							return createCustomerOrderFbs(
								cur as PostingFbs & { refundDate: string },
								boughtItems,
								transactions
							)
						}
						return {} as CustomerOrder
					}
				)
			)
		}

		return allOrders
	} catch (err) {
		Logger.error(err)
		return []
	}
}
