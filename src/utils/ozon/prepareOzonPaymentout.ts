import Logger from '../../lib/logger'
import { type SalesReturn, type Paymentout } from '../../types/msTypes'
import { PostingFbo, PostingFbs } from '../../types/ozon/ozon-types'
import { createOzonPaymentout } from './createOzonPaymentout'

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
	returns: SalesReturn[],
	paymentouts: Paymentout[],
	isFbo: boolean
): Paymentout[] => {
	const unPaymentedReturns = returns.filter(ret => ret.payments === undefined)
	const paymentedReturns = returns.filter(ret => ret.payments !== undefined)

	const updatedPaymentouts = orders.flatMap(order => {
		if (order.status === 'cancelled') return []

		const products = isFbo
			? order.products
			: order.financial_data?.products?.map(product => ({
					price: product.payout?.toString(),
					quantity: product.quantity,
				})) || []

		const sumOfPayments = calculateSumOfPayments(products)

		if (sumOfPayments === 0) return []

		return paymentedReturns
			.filter(ret => ret.name === order.posting_number)
			.map(ret => {
				const payment = paymentouts.find(
					payment => payment.name === order.posting_number
				)
				if (payment) {
					const createdPayment = createOzonPaymentout(
						ret,
						sumOfPayments
					)
					return { ...payment, ...createdPayment }
				}
				return null
			})
			.filter((payment): payment is Paymentout => payment !== null)
	})

	const newPaymentouts = orders.flatMap(order => {
		if (order.status === 'cancelled') return []

		return unPaymentedReturns
			.filter(ret => ret.name === order.posting_number)
			.map(ret => {
				const products = isFbo
					? order.products
					: order.financial_data?.products?.map(product => ({
							price: product.payout?.toString(),
							quantity: product.quantity,
						})) || []

				const sumOfPayments = calculateSumOfPayments(products)

				if (sumOfPayments !== 0) {
					return createOzonPaymentout(ret, sumOfPayments)
				}
				return null
			})
			.filter((payment): payment is Paymentout => payment !== null)
	})

	return [...updatedPaymentouts, ...newPaymentouts]
}

export const prepareOzonPaymentout = (
	returns: SalesReturn[],
	fboOrders: PostingFbo[],
	fbsOrders: PostingFbs[],
	paymentouts: Paymentout[]
): Paymentout[] => {
	try {
		if (
			returns.length === 0 ||
			(fboOrders.length === 0 && fbsOrders.length === 0)
		) {
			return []
		}

		const allPaymentouts = [
			...processOrders(fboOrders, returns, paymentouts, true),
			...processOrders(fbsOrders, returns, paymentouts, false),
		]

		const uniqPaymentout = allPaymentouts.reduce(
			(acc, payment) => {
				if (payment.name !== undefined && !acc.forEach[payment.name]) {
					acc.forEach[payment.name] = true
					acc.uniqPaymentout.push(payment)
				}
				return acc
			},
			{
				forEach: {} as Record<string, boolean>,
				uniqPaymentout: [] as Paymentout[],
			}
		).uniqPaymentout

		return uniqPaymentout
	} catch (err) {
		Logger.error(err)
	}

	return []
}
