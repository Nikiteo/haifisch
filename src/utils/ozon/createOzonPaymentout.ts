import { type SalesReturn, type Paymentout } from '../../types/msTypes'

export const createOzonPaymentout = (
	ret: SalesReturn,
	payment: number
): Paymentout => {
	const {
		salesChannel,
		shared,
		organization,
		agent,
		project,
		vatSum,
		group,
		name,
		moment,
	} = ret

	return {
		group,
		vatSum,
		salesChannel,
		shared,
		organization,
		agent,
		project,
		sum: parseFloat((payment * 100).toFixed(2)),
		name,
		moment,
		operations: [
			{
				meta: ret.meta,
				linkedSum: parseFloat((payment * 100).toFixed(2)),
			},
		],
		expenseItem: {
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/8dbf99a0-0a01-11e4-a743-002590a32f46',
				type: 'expenseitem',
				mediaType: 'application/json',
			},
		},
	}
}
