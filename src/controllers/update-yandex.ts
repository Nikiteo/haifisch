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
import { type AddedOrder, type CampaignResponse } from '../types/marketTypes'
import {
	type ResponseMS,
	type Product,
	type CustomerOrder,
	type Demand,
	type Paymentin,
	type SalesReturn,
	type Paymentout,
} from '../types/msTypes'
import { filterYandexOrders } from '../utils/yandex/filterYandexOrders'
import { getCampaignIds } from '../utils/yandex/getCampaignIds'
import { prepareCustomerOrders } from '../utils/yandex/prepareCustomerOrders'
import { prepareDemands } from '../utils/yandex/prepareDemands'
import { preparePaymentin } from '../utils/yandex/preparePaymentin'
import { preparePaymentout } from '../utils/yandex/preparePaymentout'
import { prepareSalesReturn } from '../utils/yandex/prepareSalesreturn'

export const updateYandex = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const dates = {
			dateFrom: dayjs().subtract(4, 'month').format('YYYY-MM-DD'),
			dateTo: dayjs().add(1, 'month').format('YYYY-MM-DD'),
		}

		const products = (await getProducts()) as ResponseMS<Product>

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		const customerOrders = (await getCustomerOrders(
			dates
		)) as ResponseMS<CustomerOrder>

		Logger.info(`[${store}]: Получены данные по заказам из МС...`)

		const campaigns = (await getCampaigns(store)) as CampaignResponse
		const campaignIds = getCampaignIds(campaigns.campaigns)

		Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

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
			products.rows,
			fby,
			fbs,
			customerOrders.rows,
			domain
		)

		Logger.info(`[${store}]: Создаю заказы покупателей...`)

		const createdCustomerOrders = (await createCustomerOrder(
			preparedCustomerOrders
		)) as CustomerOrder[]

		const demands = (await getDemands(dates)) as ResponseMS<Demand>

		Logger.info(`[${store}]: Получаю документы отгрузок...`)

		const ordersForDemands = createdCustomerOrders.reduce<CustomerOrder[]>(
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

		const preparedDemands = prepareDemands(ordersForDemands, demands.rows)

		const newDemands = (await createDemand(preparedDemands)) as Demand[]

		Logger.info(`[${store}]: Создаю документы отгрузок...`)

		const paymentins = (await getPaymentin(dates)) as ResponseMS<Paymentin>

		Logger.info(`[${store}]: Получаю документы входящих платежей...`)

		const preparedPaymentins = preparePaymentin(
			newDemands,
			[...fbyOrders, ...fbsOrders],
			paymentins.rows
		)

		await createPaymentin(preparedPaymentins)

		Logger.info(`[${store}]: Создаю документы входящих платежей...`)

		const salesReturn = (await getSalesReturn(
			dates
		)) as ResponseMS<SalesReturn>

		Logger.info(`[${store}]: Получаю документы возвратов...`)

		const preparedSalesReturn = prepareSalesReturn(
			newDemands,
			ordersForDemands,
			salesReturn.rows
		)

		const newSalesReturns = (await createSalesReturn(
			preparedSalesReturn
		)) as SalesReturn[]

		Logger.info(`[${store}]: Создаю документы возвратов...`)

		const paymentouts = (await getPaymentout(
			dates
		)) as ResponseMS<Paymentout>

		Logger.info(`[${store}]: Получаю документы исходящих платежей...`)

		const preparedPaymentouts = preparePaymentout(
			newSalesReturns,
			[...fbyOrders, ...fbsOrders],
			paymentouts.rows
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
