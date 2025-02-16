import dayjs from 'dayjs'
import { paymentoutState } from '../../database'
import {
	type SalesReturn,
	type Paymentout,
	type State,
} from '../../types/msTypes'
import {
	type OrdersStatsPaymentDTO,
	type OrdersStatsPaymentSourceType,
} from '../../types/yandex/api'

const statusMapping: Record<OrdersStatsPaymentSourceType, State> = {
	BUYER: paymentoutState.BUYER,
	CASHBACK: paymentoutState.CASHBACK,
	MARKETPLACE: paymentoutState.MARKETPLACE,
	SPLIT: paymentoutState.SPLIT,
}

const createStatusPaymentout = (
	source?: OrdersStatsPaymentSourceType
): State | undefined => {
	return source ? statusMapping[source] : undefined
}

export const createPaymentout = (
	ret: SalesReturn,
	payment: OrdersStatsPaymentDTO
): Paymentout => {
	const {
		salesChannel,
		shared,
		organization,
		agent,
		project,
		vatSum,
		group,
	} = ret

	const total = payment.total ?? 0

	const formattedDate = dayjs(payment.date).format('YYYY-MM-DD HH:mm:ss.SSS')

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
		moment: formattedDate,
		operations: [
			{
				meta: ret.meta,
				linkedSum: parseFloat((total * 100).toFixed(2)),
			},
		],
		paymentPurpose: payment.source,
		state: createStatusPaymentout(payment.source),
		expenseItem: {
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/8dbf99a0-0a01-11e4-a743-002590a32f46',
				type: 'expenseitem',
				mediaType: 'application/json',
			},
		},
	}
}
