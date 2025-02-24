import { states, country } from '../../database'
import { Logger } from '../../lib'

import {
	type Demand,
	type CustomerOrder,
	type SalesReturn,
	type Meta,
} from '../../types/ms-types'
import { createSalesReturn } from './createSalesreturn'

const filterOrdersByState = (
	orders: CustomerOrder[],
	stateMeta: Meta[]
): CustomerOrder[] => {
	return orders.filter(order => {
		const meta = order.state?.meta
		return meta?.href && stateMeta.some(state => state.href === meta.href)
	})
}

const mapDemandToSalesReturn = (
	demands: Demand[],
	orders: CustomerOrder[],
	place?: string
): Demand[] => {
	return demands.reduce<Demand[]>((acc, cur) => {
		const matchingOrder = orders.find(order => order.name === cur.name)
		if (matchingOrder) {
			acc.push({
				...cur,
				positions: matchingOrder.positions?.map(pos => ({
					...pos,
					country,
				})),
			})
		}
		return acc
	}, [])
}

const createSalesReturnsFromDemands = (
	demands: Demand[],
	place?: string
): SalesReturn[] => {
	return demands.map(demand => createSalesReturn(demand, place))
}

export const prepareSalesReturn = (
	demands: Demand[],
	orders: CustomerOrder[],
	salesreturn: SalesReturn[],
	place?: string
): SalesReturn[] => {
	try {
		if (demands.length === 0 || orders.length === 0) {
			return []
		}

		const isOzon = place === 'OZON'
		const stateMeta = isOzon
			? [states.PICKED_REFUND.meta]
			: [
					states.CANCELLED.meta,
					states.CANCELLED_IN_DELIVERY.meta,
					states.RETURNED.meta,
					states.PARTIALLY_RETURNED.meta,
				].filter(meta => meta !== undefined)

		const filteredOrders = filterOrdersByState(orders, stateMeta)

		if (salesreturn.length === 0) {
			const mappedDemands = mapDemandToSalesReturn(
				demands,
				filteredOrders,
				place
			)
			return createSalesReturnsFromDemands(mappedDemands, place)
		} else {
			const updatedSalesReturn = demands.reduce<SalesReturn[]>(
				(acc, cur) => {
					salesreturn.forEach((returns: SalesReturn) => {
						if (returns.name === cur.name) {
							const updated = createSalesReturn(cur, place)
							acc.push({
								...returns,
								...updated,
								organization: returns.organization,
							})
						}
					})
					return acc
				},
				[]
			)

			const newDemands = demands.filter(demand =>
				updatedSalesReturn.every(sale => sale.name !== demand.name)
			)

			const newMappedDemands = mapDemandToSalesReturn(
				newDemands,
				filteredOrders,
				place
			)
			return [
				...updatedSalesReturn,
				...createSalesReturnsFromDemands(newMappedDemands, place),
			]
		}
	} catch (err) {
		Logger.error(err)
	}

	return []
}
