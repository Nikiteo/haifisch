import dayjs from 'dayjs'
import { states } from '../../database'
import {
	getOrderById,
	getOrdersStats,
	NotificationType,
	OrderCancelledNotificationDTO,
	OrderStatusType,
	OrderStatusUpdatedNotificationDTO,
} from '../../services'
import {
	getDemandByName,
	postDemand,
} from '../../services/moysklad/demandController'
import {
	getCustomerOrderByName,
	updateCustomerOrder,
} from '../../services/moysklad/ordersController'
import { getProducts } from '../../services/moysklad/productController'
import { CustomerOrder, Paymentin, Product } from '../../types/ms-types'
import {
	OrderDTO,
	OrderItemDTO,
	OrdersStatsPaymentDTO,
	OrdersStatsPaymentSourceType,
} from '../../types/yandex/api'
import {
	createNewDemand,
	preparePositions,
	prepareStatusesForCustomerOrders,
	sendTelegramMessage,
} from '../../utils'
import { createNewPaymentin } from '../../utils/notifications/create-paymentin'
import { createPaymentin } from '../../services/moysklad/paymentinController'
import { Logger } from '../../lib'

export const updateProduct = async (
	order: OrderStatusUpdatedNotificationDTO | OrderCancelledNotificationDTO
) => {
	const { campaignId, orderId } = order
	const yandexOrder = await getOrderById({ campaignId, orderId })
	const store = campaignId === 23726642 ? 'Haifisch' : 'Top'

	if (yandexOrder) {
		const yandexOrderId = yandexOrder.id.toString()
		const customerOrder = await getCustomerOrderByName(yandexOrderId)

		if (customerOrder && customerOrder.length > 0) {
			if (order.notificationType === NotificationType.ORDER_CANCELLED) {
				return await handleOrderCancellation(customerOrder[0])
			} else if (
				order.notificationType ===
					NotificationType.ORDER_STATUS_UPDATED &&
				order.status !== OrderStatusType.CANCELLED
			) {
				return await handleOrderStatusUpdate(
					order,
					store,
					yandexOrder,
					customerOrder[0]
				)
			}
		}
	}
}

const handleOrderCancellation = async (customerOrder: CustomerOrder) => {
	const updatedCustomerOrder = {
		...customerOrder,
		state: {
			...states.CANCELLED,
		},
	}
	return await updateCustomerOrder(updatedCustomerOrder)
}

const handleOrderStatusUpdate = async (
	order: OrderStatusUpdatedNotificationDTO,
	store: 'Haifisch' | 'Top',
	yandexOrder: OrderDTO,
	customerOrder: CustomerOrder
) => {
	const updatedCustomerOrder = {
		...customerOrder,
		state: prepareStatusesForCustomerOrders(order.status, order.substatus),
	}
	if (order.status === OrderStatusType.DELIVERY) {
		const products = await getProducts()
		const boughtProducts = filterBoughtProducts(
			yandexOrder.items,
			products?.rows
		)
		const positions = preparePositions(yandexOrder, boughtProducts)
		const newCustomerOrder = {
			...customerOrder,
			positions: positions,
		}
		const newDemand = await createNewDemand(
			newCustomerOrder,
			order.updatedAt
		)
		const createdDemand = await postDemand(newDemand)
		await sendTelegramMessage(
			`Отгрузка: ${createdDemand?.meta?.uuidHref}`,
			false
		)
		return await updateCustomerOrder(updatedCustomerOrder)
	} else if (order.status === OrderStatusType.DELIVERED) {
		const demands = (await getDemandByName(order.orderId.toString())) ?? []
		if (demands.length > 0) {
			const demand = demands[0]
			const ordersStats =
				(await getOrdersStats(store, order.campaignId, {
					orders: [order.orderId],
				})) ?? []
			const orderStat = ordersStats[0]
			const preparedPayments: Paymentin[] = []
			const payments = orderStat.payments.filter(
				payment => payment.type === 'PAYMENT'
			)
			preparedPayments.push(
				...payments.map(payment => {
					return createNewPaymentin(demand, payment, order.updatedAt)
				})
			)
			const subsidies = orderStat.subsidies?.filter(
				subsidy => subsidy.operationType === 'ACCRUAL'
			)
			if (subsidies && subsidies.length > 0) {
				preparedPayments.push(
					...subsidies.map(subsidy => {
						const uniqueId = `${order.orderId}_${subsidy.type}_${subsidy.amount}`
						const paymentDTO: OrdersStatsPaymentDTO = {
							id: uniqueId,
							total: subsidy.amount,
							source: subsidy.type as OrdersStatsPaymentSourceType,
							date: dayjs(order.updatedAt).format(
								'YYYY-MM-DD HH:mm:ss.SSS'
							),
						}
						return createNewPaymentin(
							demand,
							paymentDTO,
							order.updatedAt
						)
					})
				)
			}

			Logger.info(JSON.stringify(preparedPayments))

			if (preparedPayments.length > 0) {
				const createdPaymentins =
					await createPaymentin(preparedPayments)
				Logger.info(JSON.stringify(createdPaymentins))
				if (createdPaymentins) {
					for (const item of createdPaymentins) {
						try {
							await sendTelegramMessage(
								`Входящие платежи: ${item?.meta?.uuidHref}`,
								false
							)
						} catch (error) {
							await sendTelegramMessage(
								'Ошибка при отправке сообщения',
								false
							)
						}
					}
				}
			}
			return await updateCustomerOrder(updatedCustomerOrder)
		}
	} else {
		return await updateCustomerOrder(updatedCustomerOrder)
	}
}

const filterBoughtProducts = (items: OrderItemDTO[], products?: Product[]) => {
	return products?.filter(product =>
		items.some(item => item.offerId === product.article)
	)
}
