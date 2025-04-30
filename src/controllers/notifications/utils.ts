import dayjs from 'dayjs'
import {
	getFeedbacks,
	getOrdersStats,
	OrderStatusUpdatedNotificationDTO,
} from '../../services'
import {
	getDemandByName,
	postDemand,
} from '../../services/moysklad/demandController'
import { updateCustomerOrder } from '../../services/moysklad/ordersController'
import { getProducts } from '../../services/moysklad/productController'
import {
	CustomerOrder,
	Demand,
	Owner,
	Paymentin,
	Product,
} from '../../types/ms-types'
import {
	GoodsFeedbackDescriptionDTO,
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
import { owner, anyaOwner, mishaOwner } from '../../database'

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

export const getOwnerByInn = (inn: string): Owner => {
	switch (inn) {
		case '622909830629':
			return owner
		case '711810955831':
			return anyaOwner
		case '482110871775':
			return mishaOwner
		default:
			return owner
	}
}

export const getEmojii = (inn: string) => {
	switch (inn) {
		case '622909830629':
			return '👨'
		case '711810955831':
			return '👩'
		case '482110871775':
			return '👨'
		default:
			return '👨'
	}
}

export interface ExtendedFeedbackInfo {
	id: number
	rating?: number
	author?: string
	needReaction: boolean
	advantages?: string
	disadvantages?: string
	comment?: string
	hasMedia: boolean
	createdAt: string
}

/**
 * Получает полную информацию об отзыве по его ID
 */
export async function getFeedbackInfo(
	store: string,
	businessId: number,
	feedbackId: number
): Promise<ExtendedFeedbackInfo | undefined> {
	try {
		const feedbacks = await getFeedbacks(store, businessId)
		if (!feedbacks) return undefined

		const targetFeedback = feedbacks.find(f => f.feedbackId === feedbackId)
		if (!targetFeedback) return undefined

		return {
			id: targetFeedback.feedbackId,
			rating: targetFeedback.statistics?.rating,
			author: targetFeedback.author,
			needReaction: targetFeedback.needReaction,
			advantages: targetFeedback.description?.advantages,
			disadvantages: targetFeedback.description?.disadvantages,
			comment: targetFeedback.description?.comment,
			hasMedia:
				!!targetFeedback.media?.photos?.length ||
				!!targetFeedback.media?.videos?.length,
			createdAt: targetFeedback.createdAt,
		}
	} catch (error) {
		Logger.warn('Ошибка при получении отзыва:', error)
		return undefined
	}
}

/**
 * Формирует полный текст отзыва из его компонентов
 */
export function composeFeedbackText(
	description: GoodsFeedbackDescriptionDTO
): string {
	const parts: string[] = []

	if (description.advantages) {
		parts.push(`Достоинства: ${description.advantages}`)
	}
	if (description.disadvantages) {
		parts.push(`Недостатки: ${description.disadvantages}`)
	}
	if (description.comment) {
		parts.push(`Комментарий: ${description.comment}`)
	}

	return parts.join('\n\n') || 'Без текстового описания'
}
