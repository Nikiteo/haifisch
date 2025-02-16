import { states } from '../../database'
import Logger from '../../lib/logger'
import { type CustomerOrder, type Demand } from '../../types/msTypes'
import { createDemand } from './createDemand'

export const prepareDemands = (
	orders: CustomerOrder[],
	demands: Demand[],
	place?: string
): Demand[] => {
	try {
		if (orders.length === 0 && demands.length === 0) {
			return []
		}

		const filteredOrders = orders.filter(
			order =>
				order.state?.meta !== states.NEW.meta &&
				order.state?.meta !== states.PROCESSING.meta &&
				order.state?.meta !== states.CANCELLED.meta
		)

		if (demands.length === 0) {
			const validOrders =
				place === 'OZON'
					? filteredOrders.filter(
							order => order.state?.meta !== states.CANCELLED.meta
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  )
					: filteredOrders

			return validOrders.map(order => createDemand(order, place))
		}

		const updatedDemands = filteredOrders.reduce<Demand[]>((acc, cur) => {
			demands.forEach((demand: Demand) => {
				if (demand.name === cur.name) {
					const updateDemand = createDemand(cur, place)
					acc.push({
						...demand,
						...updateDemand,
					})
				}
			})
			return acc
		}, [])

		const findNewOrders = filteredOrders.filter(order =>
			updatedDemands.every(demand => demand.name !== order.name)
		)

		findNewOrders.forEach((order: CustomerOrder) => {
			updatedDemands.push(createDemand(order, place))
		})

		return updatedDemands
	} catch (err) {
		Logger.error(err)
	}
	return []
}
