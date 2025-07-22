import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Logger } from '../lib'
import {
	getOzonFbsOrders,
	getOzonReturns,
	getTransactions
} from '../services'
import { createDemand, getDemands } from '../services/moysklad/demandController'
import {
	createCustomerOrder,
	getCustomerOrders,
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
import { Demand, Paymentin, Paymentout, SalesReturn, type CustomerOrder } from '../types/ms-types'
import {
	ListFinanceTransactionsRequestTransactionTypeEnum,
	ListPostingsFbsRequestDirEnum
} from '../types/ozon/ozon-types'
import { OrderFbsOzonStatus } from '../types/ozon/types'
import { prepareOzonCustomerOrders } from '../utils/ozon/prepareOzonCustomerOrder'
import { prepareOzonPaymentin } from '../utils/ozon/prepareOzonPaymentin'
import { prepareOzonPaymentout } from '../utils/ozon/prepareOzonPaymentout'
import { prepareDemands } from '../utils/yandex/prepareDemands'
import { prepareSalesReturn } from '../utils/yandex/prepareSalesreturn'

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
		.add(months, 'month')
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

const batchNumber = 50

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

		// const fboReturns = await getOzonReturns({
		// 	filter: {
		// 		logistic_return_date: {
		// 			time_from: filter.since,
		// 			time_to: filter.to,
		// 		},
		// 		return_schema: 'FBO',
		// 	},
		// 	last_id: 0,
		// 	limit: 500,
		// })

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
					refundDate: returnItem.logistic?.final_moment || null,
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

		const createdCustomerOrders: CustomerOrder[] = []

		for (let i = 0; i < preparedCustomerOrders.length; i += batchNumber) {
			const batch = preparedCustomerOrders.slice(i, i + batchNumber)

			try {
				const created = await createCustomerOrder(batch)
				if (created) {
					createdCustomerOrders.push(...created)
					Logger.info(`[${store}] Создано заказов: ${created.length}`)
				}
			} catch (error) {
				Logger.error(`[${store}] Ошибка при создании заказов в батче ${i / batchNumber + 1}: ${error}`)
			}
		}

		const demands = await getDemands({ dateFrom, dateTo })

		Logger.info(`[${store}] Получаю документы отгрузок...`)

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

		Logger.info(`[${store}] Создаю документы отгрузок...`)

		const createdDemands: Demand[] = []

		for (let i = 0; i < preparedDemands.length; i += batchNumber) {
			const batch = preparedDemands.slice(i, i + batchNumber)

			try {
				const created = await createDemand(batch)
				if (created) {
					createdDemands.push(...created)
					Logger.info(`[${store}] Создано отгрузок: ${created.length}`)
				}
			} catch (error) {
				Logger.error(`[${store}] Ошибка при создании отгрузок в батче ${i / batchNumber + 1}: ${error}`)
			}
		}

		const paymentins = await getPaymentin({ dateFrom, dateTo })

		Logger.info(`[${store}] Получаю документы входящих платежей...`)

		const preparedPaymentins = prepareOzonPaymentin(
			createdDemands ?? [],
			[],
			[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])],
			paymentins ?? []
		)

		Logger.info(`[${store}] Создаю документы входящих платежей...`)

		const createdPaymentin: Paymentin[] = []

		for (let i = 0; i < preparedPaymentins.length; i += batchNumber) {
			const batch = preparedPaymentins.slice(i, i + batchNumber)

			try {
				const created = await createPaymentin(batch)
				if (created) {
					createdPaymentin.push(...created)
					Logger.info(`[${store}] Создано входящих платежей: ${created.length}`)
				}
			} catch (error) {
				Logger.error(`[${store}] Ошибка при создании входящих платежей в батче ${i / batchNumber + 1}: ${error}`)
			}
		}

		const salesReturn = await getSalesReturn({ dateFrom, dateTo })
		Logger.info(`[${store}] Получаю документы возвратов...`)

		const preparedSalesReturn = prepareSalesReturn(
			createdDemands ?? [],
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

		Logger.info(`[${store}] Создаю документы возвратов...`)

		const createdSalesReturns: SalesReturn[] = []

		for (let i = 0; i < uniqReturns.length; i += batchNumber) {
			const batch = uniqReturns.slice(i, i + batchNumber)

			try {
				const created = await createSalesReturn(batch)
				if (created) {
					createdSalesReturns.push(...created)
					Logger.info(`[${store}] Создано возвратов: ${created.length}`)
				}
			} catch (error) {
				Logger.error(`[${store}] Ошибка при создании возвратов в батче ${i / batchNumber + 1}: ${error}`)
			}
		}

		const paymentouts = await getPaymentout({ dateFrom, dateTo })
		Logger.info(`[${store}] Получаю документы исходящих платежей...`)

		const preparedPaymentouts = prepareOzonPaymentout(
			createdSalesReturns ?? [],
			[],
			[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])],
			paymentouts ?? []
		)

		if (preparedPaymentouts.length > 0) {
			Logger.info(`[${store}] Создаю документы исходящих платежей...`)

			const createdPaymentouts: Paymentout[] = []

			for (let i = 0; i < preparedPaymentouts.length; i += batchNumber) {
				const batch = preparedPaymentouts.slice(i, i + batchNumber)

				try {
					const created = await createSalesReturn(batch)
					if (created) {
						createdPaymentouts.push(...created)
						Logger.info(`[${store}] Создано исходящих платежей: ${created.length}`)
					}
				} catch (error) {
					Logger.error(`[${store}] Ошибка при создании исходящих платежей в батче ${i / batchNumber + 1}: ${error}`)
				}
			}
			await createPaymentout(preparedPaymentouts)
		}

		await sendMessage(`[${store}]: Магазин синхронизирован`)
		Logger.info(`[${store}] Магазин синхронизирован`)
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
