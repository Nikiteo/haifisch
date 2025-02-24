import { Logger } from '../../lib'

import { type Demand, type Paymentin } from '../../types/ms-types'
import { PostingFbo, PostingFbs } from '../../types/ozon/ozon-types'
import { createOzonPaymentin } from './createOzonPaymentin'

const calculateSumOfPayments = (
	products: { price?: string; quantity?: number }[] = []
): number => {
	return products.reduce((acc, product) => {
		const price = parseFloat(product.price || '0')
		const quantity = product.quantity || 0
		return parseFloat((acc + price * quantity).toFixed(2))
	}, 0)
}

const processOrders = (
	orders: PostingFbo[] | PostingFbs[],
	demands: Demand[],
	paymentins: Paymentin[],
	isFbo: boolean
): Paymentin[] => {
	const unPaymentedDemands = demands.filter(
		demand => demand.payments === undefined
	)
	const paymentedDemands = demands.filter(
		demand => demand.payments !== undefined
	)

	const updatedPaymentin = orders.flatMap(order => {
		const products = isFbo
			? order.products
			: order.financial_data?.products?.map(product => ({
					price: product.payout?.toString(),
					quantity: product.quantity,
				}))

		const sumOfPayments = calculateSumOfPayments(products)

		if (sumOfPayments === 0) return []

		return paymentedDemands
			.filter(demand => demand.name === order.posting_number)
			.map(demand => {
				const payment = paymentins.find(
					payment => payment.name === order.posting_number
				)
				if (payment) {
					const createdPayment = createOzonPaymentin(
						demand,
						sumOfPayments
					)
					return { ...payment, ...createdPayment }
				}
				return null
			})
			.filter((payment): payment is Paymentin => payment !== null)
	})

	const newPaymentins = orders.flatMap(order => {
		const products = isFbo
			? order.products
			: order.financial_data?.products?.map(product => ({
					price: product.payout?.toString(),
					quantity: product.quantity,
				}))

		const sumOfPayments = calculateSumOfPayments(products)

		if (sumOfPayments === 0) return []

		return unPaymentedDemands
			.filter(demand => demand.name === order.posting_number)
			.map(demand => createOzonPaymentin(demand, sumOfPayments))
	})

	return [...updatedPaymentin, ...newPaymentins]
}

export const prepareOzonPaymentin = (
	demands: Demand[],
	fboOrders: PostingFbo[],
	fbsOrders: PostingFbs[],
	paymentins: Paymentin[]
): Paymentin[] => {
	try {
		if (
			demands.length === 0 ||
			(fboOrders.length === 0 && fbsOrders.length === 0)
		) {
			return []
		}

		const allPaymentins = [
			...processOrders(fboOrders, demands, paymentins, true),
			...processOrders(fbsOrders, demands, paymentins, false),
		]

		const uniqPaymentins = allPaymentins.reduce(
			(acc, payment) => {
				if (payment?.name && !acc.forEach[payment.name]) {
					acc.forEach[payment.name] = true
					acc.uniqPaymentins.push(payment)
				}
				return acc
			},
			{
				forEach: {} as Record<string, boolean>,
				uniqPaymentins: [] as Paymentin[],
			}
		).uniqPaymentins

		return uniqPaymentins
	} catch (err) {
		Logger.error(err)
	}

	return []
}
