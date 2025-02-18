import Logger from '../../lib/logger'
import { type SalesReturn, type Paymentout } from '../../types/msTypes'
import {
	type OrdersStatsOrderDTO,
	type EnrichedOrdersStatsOrderDTO,
	type OrdersStatsPaymentSourceType,
	type OrdersStatsPaymentDTO,
} from '../../types/yandex/api'
import { createPaymentout } from './createPaymentout'
import dayjs from 'dayjs'

const processReturns = (
	returns: SalesReturn[],
	orders: Array<EnrichedOrdersStatsOrderDTO | OrdersStatsOrderDTO>,
	paymentouts: Paymentout[],
	isPaid: boolean
): Paymentout[] => {
	const relevantReturns = returns.filter(ret =>
		isPaid ? ret.payments !== undefined : ret.payments === undefined
	)
	const paymentoutMap = new Map<string, Paymentout>()

	orders.forEach(order => {
		if (
			order.status === 'CANCELLED_BEFORE_PROCESSING' ||
			!order.payments?.length
		) {
			return
		}

		relevantReturns.forEach(ret => {
			if (ret.name === order.id?.toString()) {
				order.payments.forEach(pay => {
					if (pay.type === 'REFUND') {
						const paymentout = createPaymentout(ret, pay)
						if (paymentout.name) {
							const existingPaymentout = paymentouts.find(
								p => p.name === paymentout.name
							)
							paymentoutMap.set(paymentout.name, {
								...paymentout,
								...existingPaymentout,
							})
						}
					}
				})

				if (order.subsidies && order.subsidies.length > 0) {
					order.subsidies.forEach(subsidy => {
						if (subsidy.operationType === 'DEDUCTION') {
							const uniqueId = `${order.id}_${subsidy.type}_${subsidy.amount}`
							const paymentDTO: OrdersStatsPaymentDTO = {
								id: uniqueId,
								total: subsidy.amount,
								source: subsidy.type as OrdersStatsPaymentSourceType,
								date: dayjs(order.statusUpdateDate).format(
									'YYYY-MM-DD HH:mm:ss.SSS'
								),
							}
							const paymentout = createPaymentout(ret, paymentDTO)
							if (paymentout.name) {
								if (!paymentoutMap.has(paymentout.name)) {
									const existingPaymentout = paymentouts.find(
										p => p.name === paymentout.name
									)
									paymentoutMap.set(paymentout.name, {
										...paymentout,
										...existingPaymentout,
									})
								}
							}
						}
					})
				}
			}
		})
	})

	return Array.from(paymentoutMap.values())
}

export const preparePaymentout = (
	returns: SalesReturn[],
	orders: EnrichedOrdersStatsOrderDTO[] | OrdersStatsOrderDTO[],
	paymentouts: Paymentout[]
): Paymentout[] => {
	try {
		if (!returns.length || !orders.length) {
			return []
		}

		const updatedPaymentout = processReturns(
			returns,
			orders,
			paymentouts,
			true
		)
		const newPaymentouts = processReturns(
			returns,
			orders,
			paymentouts,
			false
		)

		return [...updatedPaymentout, ...newPaymentouts]
	} catch (err) {
		Logger.error(err)
		return []
	}
}
