import dayjs from 'dayjs'
import {
	getOrdersStats,
	OrderStatusUpdatedNotificationDTO,
} from '../../services'
import {
	getDemandByName,
	postDemand,
} from '../../services/moysklad/demandController'
import { updateCustomerOrder } from '../../services/moysklad/ordersController'
import { getProducts } from '../../services/moysklad/productController'
import { CustomerOrder, Demand, Paymentin, Product } from '../../types/ms-types'
import {
	OrderDTO,
	OrderItemDTO,
	OrdersStatsOrderDTO,
	OrdersStatsPaymentDTO,
	OrdersStatsPaymentSourceType,
} from '../../types/yandex/api'
import {
	createNewDemand,
	preparePositions,
	sendTelegramMessage,
} from '../../utils'
import { createNewPaymentin } from '../../utils/notifications/create-paymentin'
import { createPaymentin } from '../../services/moysklad/paymentinController'
import { Logger } from '../../lib'

const STORE_NAMES = {
	23726642: 'Haifisch',
	DEFAULT: 'Top',
} as const

type StoreNames = typeof STORE_NAMES
type StoreKey = keyof StoreNames

export const getStoreName = (campaignId: number): 'Haifisch' | 'Top' => {
	return STORE_NAMES[campaignId as StoreKey] || STORE_NAMES.DEFAULT
}

export const handleDeliveryStatus = async (
	yandexOrder: OrderDTO,
	customerOrder: CustomerOrder,
	updatedCustomerOrder: CustomerOrder,
	order: OrderStatusUpdatedNotificationDTO
): Promise<void> => {
	const products = await getProducts()
	const boughtProducts = filterBoughtProducts(
		yandexOrder.items,
		products?.rows
	)
	const positions = preparePositions(yandexOrder, boughtProducts)
	const newCustomerOrder = {
		...customerOrder,
		positions,
	}
	const newDemand = await createNewDemand(newCustomerOrder, order.updatedAt)
	const createdDemand = await postDemand(newDemand)

	if (createdDemand?.meta?.uuidHref) {
		await sendTelegramMessage(`Отгрузка: ${createdDemand.meta.uuidHref}`)
	}

	await updateCustomerOrder(updatedCustomerOrder)
}

export const handleDeliveredStatus = async (
	order: OrderStatusUpdatedNotificationDTO,
	store: 'Haifisch' | 'Top',
	updatedCustomerOrder: CustomerOrder
): Promise<void> => {
	const demands = await getDemandByName(order.orderId.toString())
	if (!demands?.length) return

	const demand = demands[0]
	const ordersStats = await getOrdersStats(store, order.campaignId, {
		orders: [order.orderId],
	})
	const orderStat = ordersStats?.[0]
	if (!orderStat) return

	const preparedPayments = await preparePayments(order, orderStat, demand)
	if (!preparedPayments.length) return

	const createdPaymentins = await createPaymentin(preparedPayments)
	if (!createdPaymentins) return

	for (const item of createdPaymentins) {
		try {
			if (item?.meta?.uuidHref) {
				await sendTelegramMessage(
					`Входящие платежи: ${item.meta.uuidHref}`
				)
			}
		} catch (error) {
			Logger.error('Error sending telegram message:', error)
			await sendTelegramMessage('Ошибка при отправке сообщения')
		}
	}

	await updateCustomerOrder(updatedCustomerOrder)
}

export const preparePayments = async (
	order: OrderStatusUpdatedNotificationDTO,
	orderStat: OrdersStatsOrderDTO,
	demand: Demand
): Promise<Paymentin[]> => {
	const payments =
		orderStat.payments
			?.filter(payment => payment.type === 'PAYMENT')
			.map(payment =>
				createNewPaymentin(demand, payment, order.updatedAt)
			) || []

	const subsidies =
		orderStat.subsidies
			?.filter(subsidy => subsidy.operationType === 'ACCRUAL')
			.map(subsidy => {
				const uniqueId = `${order.orderId}_${subsidy.type}_${subsidy.amount}`
				const paymentDTO: OrdersStatsPaymentDTO = {
					id: uniqueId,
					total: subsidy.amount,
					source: subsidy.type as OrdersStatsPaymentSourceType,
					date: dayjs(order.updatedAt).format(
						'YYYY-MM-DD HH:mm:ss.SSS'
					),
				}
				return createNewPaymentin(demand, paymentDTO, order.updatedAt)
			}) || []

	return [...payments, ...subsidies]
}

export const filterBoughtProducts = (
	items: OrderItemDTO[],
	products?: Product[]
): Product[] | undefined => {
	return products?.filter(product =>
		items.some(item => item.offerId === product.article)
	)
}
