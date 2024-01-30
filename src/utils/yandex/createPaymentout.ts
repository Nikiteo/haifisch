import dayjs from 'dayjs'
import { paymentoutState } from '../../database'
import { type Payment } from '../../types/marketTypes'
import { type SalesReturn, type Paymentout } from '../../types/msTypes'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStatusPaymentout = (source?: string) => {
	switch (source) {
		case 'BUYER':
			return paymentoutState.BUYER
		case 'CASHBACK':
			return paymentoutState.CASHBACK
		case 'MARKETPLACE':
			return paymentoutState.MARKETPLACE
		case 'SPASIBO':
			return paymentoutState.SPASIBO
	}
}

export const createPaymentout = (
	ret: SalesReturn,
	payment: Payment
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

	return {
		group,
		vatSum,
		salesChannel,
		shared,
		organization,
		agent,
		project,
		sum: parseFloat((payment.total * 100).toFixed(2)),
		name: payment.id,
		moment: dayjs(payment.date).format('YYYY-MM-DD HH:mm:ss.SSS'),
		operations: [
			{
				meta: ret.meta,
				linkedSum: parseFloat((payment.total * 100).toFixed(2)),
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
