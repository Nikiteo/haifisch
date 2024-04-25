import Logger from '../../lib/logger'
import { type Demand, type Paymentin } from '../../types/msTypes'
import { type Shipment } from '../../types/sberTypes'
import { createPaymentin } from './createPaymentin'

export const preparePaymentin = (
	demands: Demand[],
	orders: Shipment[]
): Paymentin[] => {
	try {
		if (demands.length === 0) {
			return []
		}

		if (orders.length === 0) {
			return []
		}

		const unPaymentedDemands = demands.filter(
			demand => demand.payments === undefined
		)

		const newPaymentins = orders
			.filter(order => order.status === 'DELIVERED')
			.reduce<Paymentin[]>((acc, cur) => {
				unPaymentedDemands.forEach(demand => {
					if (demand.name === cur.shipmentId?.toString()) {
						cur.items?.forEach(pay => {
							acc.push(
								createPaymentin(demand, pay, cur.deliveryDateTo)
							)
						})
					}
				})
				return acc
			}, [])

		return [...newPaymentins]
	} catch (err) {
		Logger.error(err)
	}

	return []
}
