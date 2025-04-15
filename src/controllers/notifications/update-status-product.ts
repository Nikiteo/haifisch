import { states } from '../../database'
import {
	getOrderById,
	NotificationType,
	OrderCancelledNotificationDTO,
	OrderStatusType,
	OrderStatusUpdatedNotificationDTO,
} from '../../services'

import {
	getCustomerOrderByName,
	updateCustomerOrder,
} from '../../services/moysklad/ordersController'
import { CustomerOrder } from '../../types/ms-types'
import { OrderDTO } from '../../types/yandex/api'
import { prepareStatusesForCustomerOrders } from '../../utils'
import { Logger } from '../../lib'
import {
	getStoreName,
	handleDeliveredStatus,
	handleDeliveryStatus,
} from './utils'

export const updateProduct = async (
	order: OrderStatusUpdatedNotificationDTO | OrderCancelledNotificationDTO
): Promise<void> => {
	try {
		const { campaignId, orderId } = order
		const store = getStoreName(campaignId)
		const yandexOrder = await getOrderById({ campaignId, orderId })

		if (!yandexOrder) return

		const yandexOrderId = yandexOrder.id.toString()
		const customerOrder = await getCustomerOrderByName(yandexOrderId)

		if (!customerOrder) return

		switch (order.notificationType) {
			case NotificationType.ORDER_CANCELLED:
				await handleOrderCancellation(customerOrder[0])
				break
			case NotificationType.ORDER_STATUS_UPDATED:
				if (order.status !== OrderStatusType.CANCELLED) {
					await handleOrderStatusUpdate(
						order,
						store,
						yandexOrder,
						customerOrder[0]
					)
				}
				break
		}
	} catch (error) {
		Logger.error('Error in updateProduct:', error)
		throw error
	}
}

const handleOrderCancellation = async (
	customerOrder: CustomerOrder
): Promise<void> => {
	try {
		const updatedCustomerOrder = {
			...customerOrder,
			state: { ...states.CANCELLED },
		}
		await updateCustomerOrder(updatedCustomerOrder)
	} catch (error) {
		Logger.error('Error in handleOrderCancellation:', error)
		throw error
	}
}

const handleOrderStatusUpdate = async (
	order: OrderStatusUpdatedNotificationDTO,
	store: 'Haifisch' | 'Top',
	yandexOrder: OrderDTO,
	customerOrder: CustomerOrder
): Promise<void> => {
	try {
		const updatedCustomerOrder = {
			...customerOrder,
			state: prepareStatusesForCustomerOrders(
				order.status,
				order.substatus
			),
		}

		switch (order.status) {
			case OrderStatusType.DELIVERY:
				await handleDeliveryStatus(
					yandexOrder,
					customerOrder,
					updatedCustomerOrder,
					order
				)
				break
			case OrderStatusType.DELIVERED:
				await handleDeliveredStatus(order, store, updatedCustomerOrder)
				break
			default:
				await updateCustomerOrder(updatedCustomerOrder)
		}
	} catch (error) {
		Logger.error('Error in handleOrderStatusUpdate:', error)
		throw error
	}
}
