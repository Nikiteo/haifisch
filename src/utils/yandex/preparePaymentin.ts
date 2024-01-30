import Logger from '../../lib/logger'
import { type Order } from '../../types/marketTypes'
import { type Demand, type Paymentin } from '../../types/msTypes'
import { createPaymentin } from './createPaymentin'

export const preparePaymentin = (
	demands: Demand[],
	orders: Order[],
	paymentins: Paymentin[]
): Paymentin[] => {
	try {
		if (demands.length === 0) {
			return []
		}

		if (orders.length === 0) {
			return []
		}

		const unPaymentedDemands = demands.filter(
			demand => demand.payments !== undefined
		)
		const paymentedDemands = demands.filter(
			demand => !(demand.payments !== undefined)
		)

		const updatedPaymentin = orders
			.filter(order => order.status !== 'CANCELLED_BEFORE_PROCESSING')
			.reduce<Paymentin[]>((acc, cur) => {
				if (cur.payments !== undefined && cur.payments.length > 0) {
					paymentedDemands.forEach(demand => {
						if (demand.name === cur.id?.toString()) {
							if (
								demand.payments?.length === cur.payments?.length
							) {
								cur.payments?.forEach(pay => {
									paymentins.forEach(payment => {
										if (payment.name === pay.id) {
											if (pay.type === 'PAYMENT') {
												const createdPayment =
													createPaymentin(demand, pay)
												acc.push({
													...payment,
													...createdPayment,
												})
											}
										}
									})
								})
							} else {
								const findPaymentins = paymentins.filter(
									payment =>
										cur.payments?.some(
											pay => pay.id === payment.name
										)
								)
								const newPayments = cur.payments?.filter(pay =>
									findPaymentins.every(
										payment => pay.id !== payment.name
									)
								)
								newPayments?.forEach(payment => {
									if (payment.type === 'PAYMENT') {
										acc.push(
											createPaymentin(demand, payment)
										)
									}
								})
							}
						}
					})
				}
				return acc
			}, [])

		const newPaymentins = orders
			.filter(order => order.status !== 'CANCELLED_BEFORE_PROCESSING')
			.reduce<Paymentin[]>((acc, cur) => {
				if (cur.payments !== undefined && cur.payments.length > 0) {
					unPaymentedDemands.forEach(demand => {
						if (demand.name === cur.id?.toString()) {
							cur.payments?.forEach(pay => {
								if (pay.type === 'PAYMENT') {
									acc.push(createPaymentin(demand, pay))
								}
							})
						}
					})
				}

				return acc
			}, [])

		const allPaymentins = [...updatedPaymentin, ...newPaymentins]

		const uniqPaymentins = allPaymentins.reduce(
			(acc, payment) => {
				if (payment.name !== undefined) {
					if (acc.forEach[payment.name]) return acc

					acc.forEach[payment.name] = true
					acc.uniqPaymentins.push(payment)
				}

				return acc
			},
			{
				forEach: {} as unknown as Record<string, boolean>,
				uniqPaymentins: [] as Paymentin[],
			}
		).uniqPaymentins

		return uniqPaymentins
	} catch (err) {
		Logger.error(err)
	}

	return []
}
