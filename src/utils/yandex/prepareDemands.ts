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

		if (demands.length === 0) {
			const filteredOrders = orders.filter(
				order =>
					order.state?.meta !== states.NEW.meta &&
					order.state?.meta !== states.PROCESSING.meta &&
					order.state?.meta !== states.CANCELLED.meta
			)
			if (place === 'OZON') {
				const withOutCancel = filteredOrders.filter(
					order => order.state?.meta !== states.CANCELLED.meta
				)
				return withOutCancel.reduce<Demand[]>(
					(acc: Demand[], cur: CustomerOrder) => {
						acc.push(createDemand(cur, place))
						return acc
					},
					[]
				)
			}

			return filteredOrders.reduce<Demand[]>(
				(acc: Demand[], cur: CustomerOrder) => {
					acc.push(createDemand(cur, place))
					return acc
				},
				[]
			)
		}

		if (demands.length !== 0) {
			const filteredOrders = orders.filter(
				order =>
					order.state?.meta !== states.NEW.meta &&
					order.state?.meta !== states.PROCESSING.meta &&
					order.state?.meta !== states.CANCELLED.meta
			)
			if (place === 'OZON') {
				const withOutCancel = filteredOrders.filter(
					order => order.state?.meta !== states.CANCELLED.meta
				)
				const updatedDemands = withOutCancel.reduce(
					(acc: Demand[], cur: CustomerOrder) => {
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
					},
					[]
				)
				const findNewOrders = withOutCancel.filter(order =>
					updatedDemands.every(demand => demand.name !== order.name)
				)
				findNewOrders.forEach((order: CustomerOrder) => {
					updatedDemands.push(createDemand(order, place))
				})
				return updatedDemands
			}

			const updatedDemands = filteredOrders.reduce(
				(acc: Demand[], cur: CustomerOrder) => {
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
				},
				[]
			)
			const findNewOrders = filteredOrders.filter(order =>
				updatedDemands.every(demand => demand.name !== order.name)
			)
			findNewOrders.forEach((order: CustomerOrder) => {
				updatedDemands.push(createDemand(order, place))
			})
			return updatedDemands
		}
	} catch (err) {
		Logger.error(err)
	}
	return []
}
