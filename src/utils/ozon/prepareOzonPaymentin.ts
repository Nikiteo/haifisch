import Logger from '../../lib/logger'
import { type Demand, type Paymentin } from '../../types/msTypes'
import { type FboOrder, type Posting } from '../../types/ozonTypes'
import { createOzonPaymentin } from './createOzonPaymentin'

export const prepareOzonPaymentin = (
	demands: Demand[],
	fboOrders: FboOrder[],
	fbsOrders: Posting[],
	paymentins: Paymentin[]
): Paymentin[] => {
	try {
		if (demands.length === 0) {
			return []
		}

		if (fboOrders.length === 0 && fbsOrders.length === 0) {
			return []
		}

		const allPaymentins = [] as Paymentin[]

		if (fboOrders.length !== 0) {
			const unPaymentedDemands = demands.filter(
				demand => demand.payments !== undefined
			)
			const paymentedDemands = demands.filter(
				demand => !(demand.payments !== undefined)
			)

			const updatedPaymentin = fboOrders.reduce<Paymentin[]>(
				(acc, cur) => {
					paymentedDemands.forEach(demand => {
						if (demand.name === cur.posting_number) {
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
								paymentins.forEach(payment => {
									if (payment.name === cur.posting_number) {
										const createdPayment =
											createOzonPaymentin(
												demand,
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
				},
				[]
			)

			const newPaymentins = fboOrders.reduce<Paymentin[]>((acc, cur) => {
				unPaymentedDemands.forEach(demand => {
					if (demand.name === cur.posting_number) {
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
							acc.push(createOzonPaymentin(demand, sumOfPayments))
						}
					}
				})

				return acc
			}, [])

			allPaymentins.push(...updatedPaymentin, ...newPaymentins)
		}

		if (fbsOrders.length !== 0) {
			const unPaymentedDemands = demands.filter(
				demand => demand.payments !== undefined
			)
			const paymentedDemands = demands.filter(
				demand => !(demand.payments !== undefined)
			)

			const updatedPaymentin = fbsOrders.reduce<Paymentin[]>(
				(acc, cur) => {
					paymentedDemands.forEach(demand => {
						if (demand.name === cur.posting_number) {
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
								paymentins.forEach(payment => {
									if (payment.name === cur.posting_number) {
										const createdPayment =
											createOzonPaymentin(
												demand,
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
				},
				[]
			)

			const newPaymentins = fbsOrders.reduce<Paymentin[]>((acc, cur) => {
				unPaymentedDemands.forEach(demand => {
					if (demand.name === cur.posting_number) {
						const sumOfPayments =
							cur.financial_data.products.reduce(
								(a, b) =>
									parseFloat(
										(a + b.price * b.quantity).toFixed(2)
									),
								0
							)
						if (sumOfPayments !== 0) {
							acc.push(createOzonPaymentin(demand, sumOfPayments))
						}
					}
				})

				return acc
			}, [])

			allPaymentins.push(...updatedPaymentin, ...newPaymentins)
		}

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
