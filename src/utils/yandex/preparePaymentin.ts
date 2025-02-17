import Logger from '../../lib/logger'
import { type Demand, type Paymentin } from '../../types/msTypes'
import {
	type OrdersStatsOrderDTO,
	type EnrichedOrdersStatsOrderDTO,
	type OrdersStatsPaymentDTO,
	type OrdersStatsPaymentSourceType,
} from '../../types/yandex/api'
import { createPaymentin } from './createPaymentin'
import dayjs from 'dayjs'

const processDemands = (
	demands: Demand[],
	orders: Array<EnrichedOrdersStatsOrderDTO | OrdersStatsOrderDTO>,
	paymentins: Paymentin[],
	isPaymented: boolean
): Paymentin[] => {
	const relevantDemands = demands.filter(demand =>
		isPaymented
			? demand.payments !== undefined
			: demand.payments === undefined
	)

	return orders
		.filter(order => order.status !== 'CANCELLED_BEFORE_PROCESSING')
		.reduce<Paymentin[]>((acc, cur) => {
			if (cur.payments && cur.payments.length > 0) {
				relevantDemands.forEach(demand => {
					if (demand.name === cur.id?.toString()) {
						cur.payments.forEach(pay => {
							if (pay.type === 'PAYMENT') {
								const existingPayment = paymentins.find(
									payment => payment.name === pay.id
								)
								if (existingPayment) {
									acc.push({
										...existingPayment,
										...createPaymentin(demand, pay),
									})
								} else {
									acc.push(createPaymentin(demand, pay))
								}
							}
						})
					}
				})
			}

			if (cur.subsidies && cur.subsidies.length > 0) {
				relevantDemands.forEach(demand => {
					if (demand.name === cur.id?.toString()) {
						if (cur.subsidies && cur.subsidies.length > 0) {
							cur.subsidies.forEach((subsidy,) => {
								if (subsidy.operationType === 'ACCRUAL') {
									const paymentDTO: OrdersStatsPaymentDTO = {
										id: `${subsidy.type}_${cur.id}_${subsidy.amount}`,
										total: subsidy.amount,
										source: subsidy.type as OrdersStatsPaymentSourceType,
										date: dayjs(
											cur.statusUpdateDate
										).format('YYYY-MM-DD HH:mm:ss.SSS'),
									}
									acc.push(
										createPaymentin(demand, paymentDTO)
									)
								}
							})
						}
					}
				})
			}

			return acc
		}, [])
}

export const preparePaymentin = (
	demands: Demand[],
	orders: EnrichedOrdersStatsOrderDTO[] | OrdersStatsOrderDTO[],
	paymentins: Paymentin[]
): Paymentin[] => {
	try {
		if (demands.length === 0 || orders.length === 0) {
			return []
		}

		const updatedPaymentin = processDemands(
			demands,
			orders,
			paymentins,
			true
		)
		const newPaymentins = processDemands(demands, orders, paymentins, false)

		const allPaymentins = [...updatedPaymentin, ...newPaymentins]

		const uniqPaymentins = Array.from(
			new Set(allPaymentins.map(payment => payment.name))
		)
			.map(name => allPaymentins.find(payment => payment.name === name))
			.filter((payment): payment is Paymentin => payment !== undefined)

		return uniqPaymentins
	} catch (err) {
		Logger.error(err)
	}

	return []
}
