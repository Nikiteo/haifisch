import dayjs from 'dayjs'
import { type Demand, type Paymentin } from '../../types/ms-types'
import { type Item } from '../../types/sber-types'

export const createPaymentin = (
	demand: Demand,
	payment: Item,
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
		name,
	} = demand

	return {
		group,
		vatSum,
		salesChannel,
		shared,
		organization,
		agent,
		project,
		sum: parseFloat((payment.price * 100).toFixed(2)),
		name,
		moment: dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS'),
		operations: [
			{
				meta: demand.meta,
				linkedSum: parseFloat((payment.price * 100).toFixed(2)),
			},
		],
	}
}
