import dayjs from 'dayjs'
import { paymentinState } from '../../database'
import { type State, type Demand, type Paymentin } from '../../types/msTypes'
import {
	type OrdersStatsPaymentSourceType,
	type OrdersStatsPaymentDTO,
	type OrdersStatsSubsidyType,
} from '../../types/yandex/api'

type OrdersStatsType =
	| (typeof OrdersStatsPaymentSourceType)[keyof typeof OrdersStatsPaymentSourceType]
	| (typeof OrdersStatsSubsidyType)[keyof typeof OrdersStatsSubsidyType]

const statusMapping: Record<OrdersStatsType, State> = {
	BUYER: paymentinState.BUYER,
	CASHBACK: paymentinState.CASHBACK,
	MARKETPLACE: paymentinState.MARKETPLACE,
	SPLIT: paymentinState.SPLIT,
	YANDEX_CASHBACK: paymentinState.YANDEX,
	SUBSIDY: paymentinState.YANDEX,
	DELIVERY: paymentinState.YANDEX,
}

const createStatusPaymentin = (
	source?: OrdersStatsPaymentSourceType
): State | undefined => {
	if (!source) return undefined
	return statusMapping[source]
}

export const createPaymentin = (
	demand: Demand,
	payment: OrdersStatsPaymentDTO
): Paymentin => {
	const {
		salesChannel,
		shared,
		organization,
		agent,
		project,
		vatSum,
		group,
	} = demand

	const total = payment.total ?? 0

	const paymentOrder = payment.paymentOrder
	const incomingDate = paymentOrder
		? dayjs(paymentOrder.date).format('YYYY-MM-DD HH:mm:ss.SSS')
		: undefined

	return {
		group,
		vatSum,
		salesChannel,
		shared,
		organization,
		agent,
		project,
		sum: parseFloat((total * 100).toFixed(2)),
		name: payment.id,
		state: createStatusPaymentin(payment.source),
		moment: dayjs(payment.date).format('YYYY-MM-DD HH:mm:ss.SSS'),
		operations: [
			{
				meta: demand.meta,
				linkedSum: parseFloat((total * 100).toFixed(2)),
			},
		],
		paymentPurpose: payment.source,
		incomingNumber: paymentOrder?.id,
		incomingDate,
	}
}
