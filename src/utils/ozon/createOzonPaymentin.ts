import { type Demand, type Paymentin } from '../../types/ms-types'

export const createOzonPaymentin = (
	demand: Demand,
	payment: number
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
		sum: parseFloat((payment * 100).toFixed(2)),
		name: demand.name,
		moment: demand.moment,
		operations: [
			{
				meta: demand.meta,
				linkedSum: parseFloat((payment * 100).toFixed(2)),
			},
		],
	}
}
