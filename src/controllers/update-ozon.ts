import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
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
import { prepareOzonCustomerOrders } from '../utils/ozon/prepareOzonCustomerOrder'
import { prepareOzonPaymentin } from '../utils/ozon/prepareOzonPaymentin'
import { prepareOzonPaymentout } from '../utils/ozon/prepareOzonPaymentout'
import { prepareDemands } from '../utils/yandex/prepareDemands'
import { prepareSalesReturn } from '../utils/yandex/prepareSalesreturn'
import {
	getOzonFboOrders,
	getOzonFbsOrders,
	getOzonReturns,
	getTransactions,
} from '../services'
import {
	ListFinanceTransactionsRequestTransactionTypeEnum,
	ListPostingsFboRequestDirEnum,
	ListPostingsFbsRequestDirEnum,
} from '../types/ozon/ozon-types'
import { OrderFbsOzonStatus, OrderStatusEnum } from '../types/ozon/types'

dayjs.extend(utc)

const getDateRange = (months: number) => {
	const dateFrom = dayjs()
		.subtract(months, 'month')
		.set('hour', 0)
		.set('minute', 0)
		.set('second', 0)
		.set('milliseconds', 0)
		.format('YYYY-MM-DD')
	const dateTo = dayjs()
		.set('hour', 23)
		.set('minute', 59)
		.set('second', 59)
		.set('milliseconds', 59)
		.format('YYYY-MM-DD')
	return { dateFrom, dateTo }
}

const getFilterDates = (months: number) => {
	const from = dayjs()
		.subtract(months, 'month')
		.set('hour', 0)
		.set('minute', 0)
		.set('second', 0)
		.set('milliseconds', 0)
		.toISOString()
	const to = dayjs()
		.add(1, 'day')
		.set('hour', 23)
		.set('minute', 59)
		.set('second', 59)
		.set('milliseconds', 59)
		.toISOString()
	return { since: from, to }
}

export const updateOzon = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const { dateFrom, dateTo } = getDateRange(1)
		const filter = getFilterDates(1)

		Logger.info(`[${store}]: ${dateFrom} - ${dateTo}`)

		const ordersProps = {
			filter,
			with: {
				analytics_data: true,
				financial_data: true,
			},
			limit: 1000,
			offset: 0,
		}

		const transactionsProps = {
			filter: {
				date: {
					from: dayjs(filter.since).add(2, 'day').toISOString(),
					to: filter.to,
				},
				transaction_type:
					'all' as ListFinanceTransactionsRequestTransactionTypeEnum,
			},
			page_size: 1000,
		}

		const products = await getProducts()
		Logger.info(`[${store}] Получены данные по продуктам из МС...`)

		const customerOrders = await getCustomerOrders(
			{ dateFrom, dateTo },
			store
		)
		Logger.info(`[${store}] Получены данные по заказам из МС...`)

		// const fboOrders = await getOzonFboOrders({
		// 	...ordersProps,
		// 	dir: 'ASC' as ListPostingsFboRequestDirEnum,
		// })
		const fbsOrders = await getOzonFbsOrders({
			...ordersProps,
			dir: 'ASC' as ListPostingsFbsRequestDirEnum,
		})
		Logger.info(`[${store}] Получены данные по заказам магазина...`)

		const fboReturns = await getOzonReturns({
			filter: {
				logistic_return_date: {
					time_from: filter.since,
					time_to: filter.to,
				},
				return_schema: 'FBO',
			},
			last_id: 0,
			limit: 500,
		})

		const fbsReturns = await getOzonReturns({
			filter: {
				logistic_return_date: {
					time_from: filter.since,
					time_to: filter.to,
				},
				return_schema: 'FBS',
			},
			last_id: 0,
			limit: 500,
		})

		Logger.info(`[${store}] Получены данные по возвратам магазина...`)

		// const fboAfterReturns = fboOrders?.map(order => {
		// 	const isReturned = fboReturns?.some(
		// 		item => item.posting_number === order.posting_number
		// 	)
		// 	return isReturned
		// 		? { ...order, status: OrderStatusEnum.returned }
		// 		: order
		// })

		const fbsAfterReturns = fbsOrders?.map(order => {
			const returnItem = fbsReturns?.find(
				item => item.posting_number === order.posting_number
			)
			if (returnItem) {
				return {
					...order,
					refundDate: returnItem.visual?.change_moment || null,
					status:
						returnItem.visual?.status?.display_name === 'Уже у вас'
							? OrderFbsOzonStatus.picked_return
							: OrderFbsOzonStatus.returned,
				}
			}
			return order
		})

		// const filteredFboOrders = fboOrders?.filter(
		// 	order =>
		// 		!fboAfterReturns?.some(
		// 			fbo => fbo.posting_number === order.posting_number
		// 		)
		// )
		const filteredFbsOrders = fbsOrders?.filter(
			order =>
				!fbsAfterReturns?.some(
					fbs => fbs.posting_number === order.posting_number
				)
		)

		const transactions = await getTransactions(transactionsProps)

		Logger.info(`[${store}] Получены данные по транзакциям магазина...`)

		const preparedCustomerOrders = prepareOzonCustomerOrders(
			products?.rows ?? [],
			[],
			[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])],
			customerOrders ?? [],
			transactions ?? []
		)

		Logger.info(`[${store}] Создаю заказы покупателей...`)

		const createdCustomerOrders = await createCustomerOrder(
			preparedCustomerOrders
		)

		const demands = await getDemands({ dateFrom, dateTo })

		Logger.info(`[${store}] Получаю документы отгрузок...`)

		const ordersForDemands = createdCustomerOrders
			?.map(cur => {
				return preparedCustomerOrders.find(
					order => order.name === cur.name
				)
					? { ...cur, meta: cur.meta }
					: null
			})
			.filter(Boolean) as CustomerOrder[]

		const preparedDemands = prepareDemands(
			ordersForDemands ?? [],
			demands ?? [],
			'OZON'
		)
		const newDemands = await createDemand(preparedDemands)

		Logger.info(`[${store}] Создаю документы отгрузок...`)

		const paymentins = await getPaymentin({ dateFrom, dateTo })

		Logger.info(`[${store}] Получаю документы входящих платежей...`)

		const preparedPaymentins = prepareOzonPaymentin(
			newDemands ?? [],
			[],
			[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])],
			paymentins ?? []
		)

		await createPaymentin(preparedPaymentins)
		Logger.info(`[${store}] Создаю документы входящих платежей...`)

		const salesReturn = await getSalesReturn({ dateFrom, dateTo })
		Logger.info(`[${store}] Получаю документы возвратов...`)

		const preparedSalesReturn = prepareSalesReturn(
			newDemands ?? [],
			ordersForDemands ?? [],
			salesReturn ?? [],
			'OZON'
		)

		const uniqReturns = Array.from(
			new Map(preparedSalesReturn.map(ret => [ret.name, ret])).values()
		)

		const newSalesReturns = await createSalesReturn(uniqReturns)
		Logger.info(`[${store}] Создаю документы возвратов...`)

		const paymentouts = await getPaymentout({ dateFrom, dateTo })
		Logger.info(`[${store}] Получаю документы исходящих платежей...`)

		const preparedPaymentouts = prepareOzonPaymentout(
			newSalesReturns ?? [],
			[],
			[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])],
			paymentouts ?? []
		)

		if (preparedPaymentouts.length > 0) {
			await createPaymentout(preparedPaymentouts)
		}

		Logger.info(`[${store}] Создаю документы исходящих платежей...`)

		await sendMessage(`[${store}]: Магазин синхронизирован`)
		Logger.info(`[${store}] Магазин синхронизирован`)
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
