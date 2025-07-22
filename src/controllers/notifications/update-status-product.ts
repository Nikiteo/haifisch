import { states } from '../../database'
import { getOrderById } from '../../services'

import { Logger } from '../../lib'
import {
	getCustomerOrderByName,
	updateCustomerOrder,
} from '../../services/moysklad/ordersController'
import { CustomerOrder } from '../../types/ms-types'
import { OrderDTO } from '../../types/yandex/api'
import {
	NotificationType,
	OrderCancelledNotificationDTO,
	OrderStatusType,
	OrderStatusUpdatedNotificationDTO,
} from '../../types/yandex/notification-types'
import { prepareStatusesForCustomerOrders } from '../../utils'
import {
	getStoreName,
	handleDeliveredStatus,
	handleDeliveryStatus,
	isStatusUpdatedNotification,
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

		if (order.notificationType === NotificationType.ORDER_CANCELLED) {
			await handleOrderCancellation(customerOrder[0])
		} else if (
			order.notificationType === NotificationType.ORDER_STATUS_UPDATED
		) {
			if (
				isStatusUpdatedNotification(order) &&
				order.status !== OrderStatusType.CANCELLED
			) {
				await handleOrderStatusUpdate(
					order,
					store,
					yandexOrder,
					customerOrder[0]
				)
			}
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
