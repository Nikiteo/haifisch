import { Logger } from '../../lib'
import { states, country } from '../../database'
import { Demand, CustomerOrder, SalesReturn } from '../../types/ms-types'
import { createSalesReturn } from './createSalesreturn'

export const prepareSalesReturn = (
	demands: Demand[],
	orders: CustomerOrder[],
	salesreturn: SalesReturn[],
	place?: string
): SalesReturn[] => {
	try {
		if (demands.length === 0) {
			return []
		}

		if (orders.length === 0) {
			return []
		}

		if (salesreturn.length === 0) {
			if (place === 'OZON') {
				const filteredOrders = orders.filter(
					order =>
						order.state?.meta === states.RETURNED.meta ||
						order.state?.meta === states.PARTIALLY_RETURNED.meta ||
						order.state?.meta === states.PICKED_REFUND.meta
				)
				const addPositionsToDemands = demands.reduce<Demand[]>(
					(acc: Demand[], cur: Demand) => {
						filteredOrders.forEach(order => {
							if (order.name === cur.name) {
								acc.push({
									...cur,
									positions: order.positions?.map(pos => {
										return {
											...pos,
											country,
										}
									}),
								})
							}
						})
						return acc
					},
					[]
				)

				return addPositionsToDemands.reduce(
					(acc: SalesReturn[], cur: Demand) => {
						acc.push(createSalesReturn(cur, place))
						return acc
					},
					[]
				)
			} else {
				const filteredOrders = orders.filter(
					order =>
						order.state?.meta === states.CANCELLED.meta ||
						order.state?.meta ===
							states.CANCELLED_IN_DELIVERY.meta ||
						order.state?.meta === states.RETURNED.meta ||
						order.state?.meta === states.PARTIALLY_RETURNED.meta
				)

				const addPositionsToDemands = demands.reduce<Demand[]>(
					(acc: Demand[], cur: Demand) => {
						filteredOrders.forEach(order => {
							if (order.name === cur.name) {
								acc.push({
									...cur,
									positions: order.positions?.map(pos => {
										return {
											...pos,
											country,
										}
									}),
								})
							}
						})
						return acc
					},
					[]
				)

				return addPositionsToDemands.reduce(
					(acc: SalesReturn[], cur: Demand) => {
						acc.push(createSalesReturn(cur, place))
						return acc
					},
					[]
				)
			}
		}

		if (salesreturn.length !== 0) {
			if (place === 'OZON') {
				const filteredOrders = orders.filter(
					order =>
						order.state?.meta === states.RETURNED.meta ||
						order.state?.meta === states.PARTIALLY_RETURNED.meta
				)
				const updatedSalesreturn = demands.reduce(
					(acc: SalesReturn[], cur: Demand) => {
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
				const findNewDemands = demands.filter(demand =>
					updatedSalesreturn.every(sale => sale.name !== demand.name)
				)
				const addPositionsToDemands = findNewDemands.reduce<Demand[]>(
					(acc: Demand[], cur: Demand) => {
						filteredOrders.forEach(order => {
							if (order.name === cur.name) {
								acc.push({
									...cur,
									positions: order.positions?.map(pos => {
										return {
											...pos,
											country,
										}
									}),
								})
							}
						})
						return acc
					},
					[]
				)

				addPositionsToDemands.forEach(demand => {
					updatedSalesreturn.push(createSalesReturn(demand, place))
				})

				return updatedSalesreturn
			} else {
				const filteredOrders = orders.filter(
					order =>
						order.state?.meta === states.CANCELLED.meta ||
						order.state?.meta ===
							states.CANCELLED_IN_DELIVERY.meta ||
						order.state?.meta === states.RETURNED.meta ||
						order.state?.meta === states.PARTIALLY_RETURNED.meta
				)
				const updatedSalesreturn = demands.reduce(
					(acc: SalesReturn[], cur: Demand) => {
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
				const findNewDemands = demands.filter(demand =>
					updatedSalesreturn.every(sale => sale.name !== demand.name)
				)
				const addPositionsToDemands = findNewDemands.reduce<Demand[]>(
					(acc: Demand[], cur: Demand) => {
						filteredOrders.forEach(order => {
							if (order.name === cur.name) {
								acc.push({
									...cur,
									positions: order.positions?.map(pos => {
										return {
											...pos,
											country,
										}
									}),
								})
							}
						})
						return acc
					},
					[]
				)

				addPositionsToDemands.forEach(demand => {
					updatedSalesreturn.push(createSalesReturn(demand, place))
				})

				return updatedSalesreturn
			}
		}
	} catch (err) {
		Logger.error(err)
	}

	return []
}
