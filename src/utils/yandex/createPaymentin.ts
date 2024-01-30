import dayjs from 'dayjs'
import { paymentinState } from '../../database'
import { type Payment } from '../../types/marketTypes'
import { type Demand, type Paymentin } from '../../types/msTypes'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStatusPaymentin = (source?: string) => {
	switch (source) {
		case 'BUYER':
			return paymentinState.BUYER
		case 'CASHBACK':
			return paymentinState.CASHBACK
		case 'MARKETPLACE':
			return paymentinState.MARKETPLACE
		case 'SPASIBO':
			return paymentinState.SPASIBO
	}
}

export const createPaymentin = (
	demand: Demand,
	payment: Payment
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
		state: createStatusPaymentin(payment.source),
		moment: dayjs(payment.date).format('YYYY-MM-DD HH:mm:ss.SSS'),
		operations: [
			{
				meta: demand.meta,
				linkedSum: parseFloat((payment.total * 100).toFixed(2)),
			},
		],
		paymentPurpose: payment.source,
		incomingNumber:
			payment.paymentOrder != null ? payment.paymentOrder.id : undefined,
		incomingDate:
			payment.paymentOrder != null
				? dayjs(payment.paymentOrder.date).format(
						'YYYY-MM-DD HH:mm:ss.SSS'
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  )
				: undefined,
	}
}
