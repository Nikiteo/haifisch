import Logger from '../../lib/logger'
import { type Order } from '../../types/marketTypes'
import { type SalesReturn, type Paymentout } from '../../types/msTypes'
import { createPaymentout } from './createPaymentout'

export const preparePaymentout = (
	returns: SalesReturn[],
	orders: Order[],
	paymentouts: Paymentout[]
): Paymentout[] => {
	try {
		if (returns.length === 0) {
			return []
		}

		if (orders.length === 0) {
			return []
		}

		const unPaymentedReturns = returns.filter(
			ret => ret.payments === undefined
		)
		const paymentedReturns = returns.filter(
			ret => !(ret.payments === undefined)
		)

		const updatedPaymentout = orders
			.filter(order => order.status !== 'CANCELLED_BEFORE_PROCESSING')
			.reduce<Paymentout[]>((acc, cur) => {
				if (cur.payments !== undefined && cur.payments.length > 0) {
					paymentedReturns.forEach(ret => {
						if (ret.name === cur.id?.toString()) {
							if (ret.payments?.length === cur.payments?.length) {
								cur.payments?.forEach(pay => {
									paymentouts.forEach(payment => {
										if (payment.name === pay.id) {
											if (pay.type === 'REFUND') {
												const createdPayment =
													createPaymentout(ret, pay)
												acc.push({
													...payment,
													...createdPayment,
												})
											}
										}
									})
								})
							} else {
								const findPaymentouts = paymentouts.filter(
									payment =>
										cur.payments?.some(
											pay => pay.id === payment.name
										)
								)
								const newPayments = cur.payments?.filter(pay =>
									findPaymentouts.every(
										payment => pay.id !== payment.name
									)
								)
								newPayments?.forEach(payment => {
									if (payment.type === 'REFUND') {
										acc.push(createPaymentout(ret, payment))
									}
								})
							}
						}
					})
				}
				return acc
			}, [])

		const newPaymentouts = orders
			.filter(order => order.status !== 'CANCELLED_BEFORE_PROCESSING')
			.reduce<Paymentout[]>((acc, cur) => {
				if (cur.payments !== undefined && cur.payments.length > 0) {
					unPaymentedReturns.forEach(ret => {
						if (ret.name === cur.id?.toString()) {
							cur.payments?.forEach(pay => {
								if (pay.type === 'REFUND') {
									acc.push(createPaymentout(ret, pay))
								}
							})
						}
					})
				}

				return acc
			}, [])

		const allPaymentouts = [...updatedPaymentout, ...newPaymentouts]

		const uniqPaymentouts = allPaymentouts.reduce(
			(acc, payment) => {
				if (payment.name !== undefined) {
					if (acc.forEach[payment.name]) return acc

					acc.forEach[payment.name] = true
					acc.uniqPaymentouts.push(payment)
				}

				return acc
			},
			{
				forEach: {} as unknown as Record<string, boolean>,
				uniqPaymentouts: [] as Paymentout[],
			}
		).uniqPaymentouts

		return uniqPaymentouts
	} catch (err) {
		Logger.error(err)
	}

	return []
}
