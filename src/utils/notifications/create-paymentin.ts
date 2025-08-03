import dayjs from 'dayjs'
import { paymentinState } from '../../database'
import { type Demand, type Paymentin, type State } from '../../types/ms-types'
import {
	type OrdersStatsPaymentDTO,
	type OrdersStatsPaymentSourceType,
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

export const createNewPaymentin = (
	demand: Demand,
	payment: OrdersStatsPaymentDTO,
	date: string
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
		moment: dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS'),
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
