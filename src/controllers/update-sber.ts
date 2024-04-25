import dayjs from 'dayjs'
import Logger from '../lib/logger'
import utc from 'dayjs/plugin/utc'
import {
	getSberOrders,
	getSberShipments,
} from '../services/megamarket/orderController'
import {
	createCustomerOrder,
	getCustomerOrders,
} from '../services/moysklad/ordersController'
import { getProducts } from '../services/moysklad/productController'
import { prepareCustomerOrders } from '../utils/sber/prepareCustomerOrders'
import { createDemand, getDemands } from '../services/moysklad/demandController'
import { type CustomerOrder } from '../types/msTypes'
import { prepareDemands } from '../utils/yandex/prepareDemands'
import { createPaymentin } from '../services/moysklad/paymentinController'
import { preparePaymentin } from '../utils/sber/preparePaymentins'

dayjs.extend(utc)

export const updateSber = async (
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
				.subtract(4, 'month')
				.format('YYYY-MM-DD'),
			dateTo: dayjs()
				.set('hour', 23)
				.set('minute', 59)
				.set('second', 59)
				.set('milliseconds', 59)
				.add(1, 'month')
				.format('YYYY-MM-DD'),
		}

		const data = {
			meta: {},
			data: {
				token: process.env.MEGAMARKET_TOKEN ?? '',
				dateFrom: dates.dateFrom,
				dateTo: dates.dateTo,
				count: 100,
				statuses: [
					'NEW',
					'CONFIRMED',
					'PACKED',
					'PACKING_EXPIRED',
					'SHIPPED',
					'DELIVERED',
					'MERCHANT_CANCELED',
					'CUSTOMER_CANCELED',
				],
			},
		}

		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		const customerOrders = await getCustomerOrders(dates)

		Logger.info(`[${store}]: Получены данные по заказам из МС...`)

		const shipments = await getSberShipments(data)

		Logger.info(`[${store}]: Получены номера отгрузок из Мегамаркета...`)

		const orders = await getSberOrders({
			meta: {},
			data: {
				token: process.env.MEGAMARKET_TOKEN ?? '',
				shipments: shipments ?? [],
			},
		})

		Logger.info(`[${store}]: Получены данные заказов из Мегамаркета...`)

		const preparedCustomerOrders = prepareCustomerOrders(
			products?.rows ?? [],
			customerOrders ?? [],
			orders ?? []
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
			'SBER'
		)

		const newDemands = await createDemand(preparedDemands)

		Logger.info(`[${store}]: Создаю документы отгрузок...`)

		const preparedPaymentins = preparePaymentin(
			newDemands ?? [],
			orders ?? []
		)

		await createPaymentin(preparedPaymentins)

		Logger.info(`[${store}]: Создаю документы входящих платежей...`)

		await sendMessage(`[${store}]: Магазин синхронизирован`)
		Logger.info(`[${store}]: Магазин синхронизирован`)
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
