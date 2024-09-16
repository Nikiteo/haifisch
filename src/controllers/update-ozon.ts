import dayjs from 'dayjs'
import Logger from '../lib/logger'
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
import {
	getOzonFboOrders,
	getOzonFbsOrders,
} from '../services/ozon/orderController'
import { getProductPrices } from '../services/ozon/productController'
import {
	getOzonFboReturns,
	getOzonFbsReturns,
} from '../services/ozon/returnsController'

import { type CustomerOrder, type SalesReturn } from '../types/msTypes'
import {
	type FboOrder,
	type Posting,
	OrderStatusEnum,
	OrderFbsOzonStatus,
} from '../types/ozonTypes'
import { prepareOzonCustomerOrders } from '../utils/ozon/prepareOzonCustomerOrder'
import { prepareOzonPaymentin } from '../utils/ozon/prepareOzonPaymentin'
import { prepareOzonPaymentout } from '../utils/ozon/prepareOzonPaymentout'
import { prepareDemands } from '../utils/yandex/prepareDemands'
import { prepareSalesReturn } from '../utils/yandex/prepareSalesreturn'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const updateOzon = async (
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
				.subtract(2, 'month')
				.format('YYYY-MM-DD'),
			dateTo: dayjs()
				.set('hour', 0)
				.set('minute', 0)
				.set('second', 0)
				.set('milliseconds', 0)
				.add(1, 'month')
				.format('YYYY-MM-DD'),
		}

		const filter = {
			since: dayjs()
				.set('hour', 0)
				.set('minute', 0)
				.set('second', 0)
				.set('milliseconds', 0)
				.subtract(1, 'month')
				.toISOString(),
			to: dayjs()
				.set('hour', 23)
				.set('minute', 59)
				.set('second', 59)
				.set('milliseconds', 59)
				.add(1, 'month')
				.toISOString(),
		}
		const ordersProps = {
			dir: 'ASC',
			filter,
			with: {
				analytics_data: true,
				barcodes: false,
				financial_data: true,
				translit: false,
			},
			limit: 1000,
			offset: 0,
		}

		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		const customerOrders = await getCustomerOrders(dates)

		Logger.info(`[${store}]: Получены данные по заказам из МС...`)

		const fboOrders = await getOzonFboOrders(ordersProps)
		const fbsOrders = await getOzonFbsOrders(ordersProps)

		Logger.info(`[${store}]: Получены данные по заказам магазина...`)

		const fboReturns = await getOzonFboReturns({
			filter: {},
			last_id: 0,
			limit: 1000,
		})
		const fbsReturns = await getOzonFbsReturns({
			filter: {},
			last_id: 0,
			limit: 1000,
		})

		Logger.info(`[${store}]: Получены данные по возвратам магазина...`)

		const articlesFromMS = products?.rows.map(row => row.article)

		const prices = await getProductPrices({
			filter: {
				offer_id: articlesFromMS ?? [],
				visibility: 'ALL',
			},
			last_id: '',
			limit: 1000,
		})

		const fboAfterReturns = fboOrders?.result.reduce<FboOrder[]>(
			(acc, cur) => {
				fboReturns?.returns.forEach(item => {
					if (item.posting_number === cur.posting_number) {
						acc.push({
							...cur,
							status: OrderStatusEnum.returned,
						})
					}
				})
				return acc
			},
			[]
		)

		const fbsAfterReturns = fbsOrders?.result.postings.reduce<Posting[]>(
			(acc, cur) => {
				fbsReturns?.returns.forEach(item => {
					if (item.posting_number === cur.posting_number) {
						acc.push({
							...cur,
							status: OrderFbsOzonStatus.returned,
						})
					}
				})
				return acc
			},
			[]
		)

		const filteredFboOrders = fboOrders?.result.filter(order =>
			fboAfterReturns?.every(
				fbo => fbo.posting_number !== order.posting_number
			)
		)

		const filteredFbsOrders = fbsOrders?.result.postings.filter(order =>
			fbsAfterReturns?.every(
				fbs => fbs.posting_number !== order.posting_number
			)
		)

		const preparedCustomerOrders = prepareOzonCustomerOrders(
			products?.rows ?? [],
			[...(filteredFboOrders ?? []), ...(fboAfterReturns ?? [])],
			[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])]
				.filter(item => item.posting_number !== '0145992433-0031-1')
				.filter(item => item.posting_number !== '28059370-0058-6')
				.filter(item => item.posting_number !== '0122683245-0020-1'),
			customerOrders ?? [],
			prices?.result.items ?? []
		)

		Logger.info(`[${store}]: Создаю заказы покупателей...`)

		const createdCustomerOrders = await createCustomerOrder(
			preparedCustomerOrders
		)

		const demands = await getDemands(dates)

		Logger.info(`[${store}]: Получаю документы отгрузок...`)

		const ordersForDemands = createdCustomerOrders?.reduce<CustomerOrder[]>(
			(acc, cur) => {
				preparedCustomerOrders.forEach(order => {
					if (order.name === cur.name) {
						acc.push({
							...order,
							meta: cur.meta,
						})
					}
				})
				return acc
			},
			[]
		)

		const preparedDemands = prepareDemands(
			ordersForDemands ?? [],
			demands ?? [],
			'OZON'
		)

		const newDemands = await createDemand(preparedDemands)

		Logger.info(`[${store}]: Создаю документы отгрузок...`)

		const paymentins = await getPaymentin(dates)

		Logger.info(`[${store}]: Получаю документы входящих платежей...`)

		const preparedPaymentins = prepareOzonPaymentin(
			newDemands ?? [],
			[...(filteredFboOrders ?? []), ...(fboAfterReturns ?? [])],
			[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])]
				.filter(item => item.posting_number !== '0145992433-0031-1')
				.filter(item => item.posting_number !== '28059370-0058-6')
				.filter(item => item.posting_number !== '0122683245-0020-1'),
			paymentins ?? []
		)

		await createPaymentin(preparedPaymentins)

		Logger.info(`[${store}]: Создаю документы входящих платежей...`)

		const salesReturn = await getSalesReturn(dates)

		Logger.info(`[${store}]: Получаю документы возвратов...`)

		const preparedSalesReturn = prepareSalesReturn(
			newDemands ?? [],
			ordersForDemands ?? [],
			salesReturn ?? [],
			'OZON'
		)

		const uniqReturns = preparedSalesReturn.reduce(
			(acc, ret) => {
				if (ret.name !== undefined) {
					if (acc.forEach[ret.name]) return acc

					acc.forEach[ret.name] = true
					acc.uniqReturns.push(ret)
				}

				return acc
			},
			{
				forEach: {} as unknown as Record<string, boolean>,
				uniqReturns: [] as SalesReturn[],
			}
		).uniqReturns

		const newSalesReturns = await createSalesReturn(uniqReturns)

		Logger.info(`[${store}]: Создаю документы возвратов...`)

		const paymentouts = await getPaymentout(dates)

		Logger.info(`[${store}]: Получаю документы исходящих платежей...`)

		const preparedPaymentouts = prepareOzonPaymentout(
			newSalesReturns ?? [],
			[...(filteredFboOrders ?? []), ...(fboAfterReturns ?? [])],
			[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])]
				.filter(item => item.posting_number !== '0145992433-0031-1')
				.filter(item => item.posting_number !== '28059370-0058-6')
				.filter(item => item.posting_number !== '0122683245-0020-1'),
			paymentouts ?? []
		)

		if (preparedPaymentouts.length > 0) {
			await createPaymentout(preparedPaymentouts)
		}

		Logger.info(`[${store}]: Создаю документы исходящих платежей...`)
		await sendMessage(`[${store}]: Магазин синхронизирован`)
		Logger.info(`[${store}]: Магазин синхронизирован`)
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
