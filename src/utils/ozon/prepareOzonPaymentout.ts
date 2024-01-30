import Logger from '../../lib/logger'
import { type SalesReturn, type Paymentout } from '../../types/msTypes'
import { type FboOrder, type Posting } from '../../types/ozonTypes'
import { createOzonPaymentout } from './createOzonPaymentout'

export const prepareOzonPaymentout = (
	returns: SalesReturn[],
	fboOrders: FboOrder[],
	fbsOrders: Posting[],
	paymentouts: Paymentout[]
): Paymentout[] => {
	try {
		if (returns.length === 0) {
			return []
		}

		if (fboOrders.length === 0 && fbsOrders.length === 0) {
			return []
		}

		const allPaymentouts = [] as Paymentout[]
		const unPaymentedReturns = returns.filter(
			ret => ret.payments !== undefined
		)
		const paymentedReturns = returns.filter(
			ret => !(ret.payments !== undefined)
		)

		if (fboOrders.length !== 0) {
			const updatedPaymentin = fboOrders
				.filter(order => order.status !== 'cancelled')
				.reduce<Paymentout[]>((acc, cur) => {
					paymentedReturns.forEach(ret => {
						if (ret.name === cur.posting_number) {
							const sumOfPayments = cur.products.reduce(
								(a, b) =>
									parseFloat(
										(
											a +
											parseFloat(b.price) * b.quantity
										).toFixed(2)
									),
								0
							)
							if (sumOfPayments !== 0) {
								paymentouts.forEach(payment => {
									if (payment.name === cur.posting_number) {
										const createdPayment =
											createOzonPaymentout(
												ret,
												sumOfPayments
											)
										acc.push({
											...payment,
											...createdPayment,
										})
									}
								})
							}
						}
					})

					return acc
				}, [])

			const newPaymentins = fboOrders
				.filter(order => order.status !== 'cancelled')
				.reduce<Paymentout[]>((acc, cur) => {
					unPaymentedReturns.forEach(ret => {
						if (ret.name === cur.posting_number) {
							const sumOfPayments = cur.products.reduce(
								(a, b) =>
									parseFloat(
										(
											a +
											parseFloat(b.price) * b.quantity
										).toFixed(2)
									),
								0
							)
							if (sumOfPayments !== 0) {
								acc.push(
									createOzonPaymentout(ret, sumOfPayments)
								)
							}
						}
					})

					return acc
				}, [])

			allPaymentouts.push(...updatedPaymentin, ...newPaymentins)
		}

		if (fbsOrders.length !== 0) {
			const updatedPaymentin = fbsOrders
				.filter(order => order.status !== 'cancelled')
				.reduce<Paymentout[]>((acc, cur) => {
					paymentedReturns.forEach(ret => {
						if (ret.name === cur.posting_number) {
							const sumOfPayments =
								cur.financial_data.products.reduce(
									(a, b) =>
										parseFloat(
											(a + b.price * b.quantity).toFixed(
												2
											)
										),
									0
								)
							if (sumOfPayments !== 0) {
								paymentouts.forEach(payment => {
									if (payment.name === cur.posting_number) {
										const createdPayment =
											createOzonPaymentout(
												ret,
												sumOfPayments
											)
										acc.push({
											...payment,
											...createdPayment,
										})
									}
								})
							}
						}
					})

					return acc
				}, [])

			const newPaymentins = fbsOrders.reduce<Paymentout[]>((acc, cur) => {
				unPaymentedReturns.forEach(ret => {
					if (ret.name === cur.posting_number) {
						const sumOfPayments =
							cur.financial_data.products.reduce(
								(a, b) =>
									parseFloat(
										(a + b.price * b.quantity).toFixed(2)
									),
								0
							)
						if (sumOfPayments !== 0) {
							acc.push(createOzonPaymentout(ret, sumOfPayments))
						}
					}
				})

				return acc
			}, [])

			allPaymentouts.push(...updatedPaymentin, ...newPaymentins)
		}

		const uniqPaymentout = allPaymentouts.reduce(
			(acc, payment) => {
				if (payment.name !== undefined) {
					if (acc.forEach[payment.name]) return acc

					acc.forEach[payment.name] = true
					acc.uniqPaymentout.push(payment)
				}

				return acc
			},
			{
				forEach: {} as unknown as Record<string, boolean>,
				uniqPaymentout: [] as Paymentout[],
			}
		).uniqPaymentout

		return uniqPaymentout
	} catch (err) {
		Logger.error(err)
	}

	return []
}
