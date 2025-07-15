import dayjs from 'dayjs'
import { Logger } from '../lib'
import { createDemand, getDemands } from '../services/moysklad/demandController'
import {
	getCustomerOrders,
	createCustomerOrder,
} from '../services/moysklad/ordersController'
import {
	createPaymentin,
	getPaymentin,
} from '../services/moysklad/paymentinController'
import {
	createPaymentout,
	getPaymentout,
} from '../services/moysklad/paymentoutController'
import { getProducts } from '../services/moysklad/productController'
import {
	createSalesReturn,
	getSalesReturn,
} from '../services/moysklad/salesreturnController'
import { type CustomerOrder } from '../types/ms-types'
import { getCampaignIds } from '../utils/yandex/getCampaignIds'
import { prepareCustomerOrders } from '../utils/yandex/prepareCustomerOrders'
import { prepareDemands } from '../utils/yandex/prepareDemands'
import { preparePaymentin } from '../utils/yandex/preparePaymentin'
import { preparePaymentout } from '../utils/yandex/preparePaymentout'
import { prepareSalesReturn } from '../utils/yandex/prepareSalesreturn'
import utc from 'dayjs/plugin/utc'
import { createMove, getMoves } from '../services/moysklad/moveController'
import { prepareMoves } from '../utils/yandex/prepareMoves'
import {
	type OrdersStatsOrderDTO,
	type OrderDTO,
	type EnrichedOrdersStatsOrderDTO,
} from '../types/yandex/api'
import { states } from '../database'
import {
	getCampaigns,
	getOrdersStats,
	getOrders,
	getReturns,
} from '../services'

dayjs.extend(utc)

export const updateYandex = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const dates = {
			dateFrom: dayjs()
				.set('hour', 0)
				.set('minute', 0)
				.set('second', 0)
				.set('milliseconds', 0)
				.subtract(30, 'day')
				.format('YYYY-MM-DD'),
			dateTo: dayjs()
				.set('hour', 23)
				.set('minute', 59)
				.set('second', 59)
				.set('milliseconds', 59)
				.add(30, 'day')
				.format('YYYY-MM-DD'),
		}

		Logger.info(`[${store}]: ${dates.dateFrom} - ${dates.dateTo}`)

		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		const customerOrders = await getCustomerOrders(dates, store)

		Logger.info(`[${store}]: Получены данные по заказам из МС...`)

		const campaigns = await getCampaigns(store)
		const campaignIds = getCampaignIds(campaigns)

		Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

		if (campaignIds?.FBS && campaignIds?.FBY && campaigns) {
			const fbsOrdersStats = await getOrdersStats(
				store,
				campaignIds.FBS,
				dates
			)
			// const fbyOrdersStats = await getOrdersStats(
			// 	store,
			// 	campaignIds.FBY,
			// 	dates
			// )
			const fbsNewOrders = (await getOrders(store, campaignIds.FBS)) || []
			// const fbyNewOrders = (await getOrders(store, campaignIds.FBY)) || []

			const ordersMap = new Map<number, OrderDTO>()

			fbsNewOrders.forEach(order => {
				ordersMap.set(order.id, order)
			})
			// fbyNewOrders.forEach(order => {
			// 	ordersMap.set(order.id, order)
			// })

			const enrichOrdersStats = (
				ordersStats: OrdersStatsOrderDTO[]
			): EnrichedOrdersStatsOrderDTO[] | OrdersStatsOrderDTO[] => {
				return ordersStats.map(orderStat => {
					const orderId = orderStat.id
					if (orderId !== undefined) {
						const correspondingOrder = ordersMap.get(orderId)
						if (correspondingOrder) {
							return {
								...orderStat,
								delivery: correspondingOrder.delivery,
								substatus: correspondingOrder.substatus,
							}
						}
					}
					return orderStat
				})
			}

			const enrichedFbsOrders = enrichOrdersStats(fbsOrdersStats || [])
			// const enrichedFbyOrders = enrichOrdersStats(fbyOrdersStats || [])

			const domain = campaigns[0].domain ?? ''

			const preparedCustomerOrders = prepareCustomerOrders(
				products?.rows ?? [],
				enrichedFbsOrders,
				[],
				customerOrders ?? [],
				domain
			)

			Logger.info(`[${store}]: Создаю заказы покупателей...`)

			const createdCustomerOrders = await createCustomerOrder(
				preparedCustomerOrders
			)

			const demands = await getDemands(dates)

			Logger.info(`[${store}]: Получаю документы отгрузок...`)

			const ordersForDemands = createdCustomerOrders?.reduce<
				CustomerOrder[]
			>((acc, cur) => {
				preparedCustomerOrders.forEach(order => {
					if (order.name === cur.name) {
						acc.push({
							...order,
							meta: cur.meta,
						})
					}
				})
				return acc
			}, [])

			const preparedDemands = prepareDemands(
				ordersForDemands ?? [],
				demands ?? []
			)

			const newDemands = await createDemand(preparedDemands)

			Logger.info(`[${store}]: Создаю документы отгрузок...`)

			const paymentins = await getPaymentin(dates)

			Logger.info(`[${store}]: Получаю документы входящих платежей...`)

			const preparedPaymentins = preparePaymentin(
				newDemands ?? [],
				[...enrichedFbsOrders],
				paymentins ?? []
			)

			await createPaymentin(preparedPaymentins)

			Logger.info(`[${store}]: Создаю документы входящих платежей...`)

			const salesReturn = await getSalesReturn(dates)

			Logger.info(`[${store}]: Получаю документы возвратов...`)

			const preparedSalesReturn = prepareSalesReturn(
				newDemands ?? [],
				ordersForDemands ?? [],
				salesReturn ?? []
			)

			const newSalesReturns = await createSalesReturn(preparedSalesReturn)

			Logger.info(`[${store}]: Создаю документы возвратов...`)

			const paymentouts = await getPaymentout(dates)

			Logger.info(`[${store}]: Получаю документы исходящих платежей...`)

			const preparedPaymentouts = preparePaymentout(
				newSalesReturns ?? [],
				[...enrichedFbsOrders],
				paymentouts ?? []
			)

			if (preparedPaymentouts.length > 0) {
				await createPaymentout(preparedPaymentouts)
			}

			Logger.info(`[${store}]: Создаю документы исходящих платежей...`)

			const moves = await getMoves()

			Logger.info(`[${store}]: Получаю перемещения из МС...`)

			const returns = await getReturns(store, campaignIds.FBS)

			Logger.info(`[${store}]: Получаю возвраты из МС...`)

			const pickedReturns = returns?.filter(
				r => r.shipmentStatus === 'PICKED'
			)

			const filteredReturns = pickedReturns?.filter(ret =>
				moves?.every(move => move.name !== ret.orderId.toString())
			)

			const preparedMoves = prepareMoves(
				domain,
				filteredReturns ?? [],
				products?.rows ?? []
			)

			if (preparedMoves.length > 0) {
				const createdMoves = await createMove(preparedMoves)
				if (createdCustomerOrders && createdMoves) {
					const modifiedCustomerOrders: CustomerOrder[] = []

					createdCustomerOrders.forEach(customerOrder => {
						createdMoves.forEach(move => {
							if (move.name === customerOrder.name) {
								if (!customerOrder.moves) {
									customerOrder.moves = []
								}

								customerOrder.moves.push({
									meta: move.meta,
								})
								customerOrder.state = states.PICKED_REFUND

								modifiedCustomerOrders.push(customerOrder)
							}
						})
					})

					if (modifiedCustomerOrders.length > 0) {
						await createCustomerOrder(modifiedCustomerOrders)
					}
				}
			}

			Logger.info(`[${store}]: Создаю документы перемещений...`)
			await sendMessage(`[${store}]: Магазин синхронизирован`)
			Logger.info(`[${store}]: Магазин синхронизирован`)
		}
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
