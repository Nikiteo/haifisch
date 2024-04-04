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
import { getCampaigns } from '../services/yandex/campaignController'
import { getOrders } from '../services/yandex/orderController'
import { getNewOrders } from '../services/yandex/orderNewController'
import { type AddedOrder } from '../types/marketTypes'
import { type CustomerOrder } from '../types/msTypes'
import { filterYandexOrders } from '../utils/yandex/filterYandexOrders'
import { getCampaignIds } from '../utils/yandex/getCampaignIds'
import { prepareCustomerOrders } from '../utils/yandex/prepareCustomerOrders'
import { prepareDemands } from '../utils/yandex/prepareDemands'
import { preparePaymentin } from '../utils/yandex/preparePaymentin'
import { preparePaymentout } from '../utils/yandex/preparePaymentout'
import { prepareSalesReturn } from '../utils/yandex/prepareSalesreturn'
import utc from 'dayjs/plugin/utc'

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

		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		const customerOrders = await getCustomerOrders(dates)

		Logger.info(`[${store}]: Получены данные по заказам из МС...`)

		const campaigns = await getCampaigns(store)
		const campaignIds = getCampaignIds(campaigns?.campaigns)

		Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

		if (campaignIds !== undefined && campaigns !== undefined) {
			const fbsOrders = await getOrders(store, campaignIds.FBS, dates)
			const fbyOrders = await getOrders(store, campaignIds.FBY, dates)
			const fbsNewOrders = await getNewOrders(store, campaignIds.FBS)
			const fbyNewOrders = await getNewOrders(store, campaignIds.FBY)

			Logger.info(`[${store}]: Получены данные по заказам магазина...`)

			const {
				ordersWithNewData: fbsOrdersWithNewData,
				filteredOrders: fbsFilteredOrders,
			} = filterYandexOrders(fbsOrders, fbsNewOrders)

			const {
				ordersWithNewData: fbyOrdersWithNewData,
				filteredOrders: fbyFilteredOrders,
			} = filterYandexOrders(fbyOrders, fbyNewOrders)

			const fby = [
				...fbyOrdersWithNewData,
				...fbyFilteredOrders,
			] as AddedOrder[]
			const fbs = [
				...fbsOrdersWithNewData,
				...fbsFilteredOrders,
			] as AddedOrder[]
			const domain = campaigns.campaigns[0].domain

			const preparedCustomerOrders = prepareCustomerOrders(
				products?.rows ?? [],
				fby,
				fbs,
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
				[...(fbyOrders ?? []), ...(fbsOrders ?? [])],
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
				[...(fbyOrders ?? []), ...(fbsOrders ?? [])],
				paymentouts ?? []
			)

			if (preparedPaymentouts.length > 0) {
				await createPaymentout(preparedPaymentouts)
			}

			Logger.info(`[${store}]: Создаю документы исходящих платежей...`)
			await sendMessage(`[${store}]: Магазин синхронизирован`)
			Logger.info(`[${store}]: Магазин синхронизирован`)
		}
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
