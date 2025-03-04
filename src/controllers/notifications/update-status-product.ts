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
import { prepareStatusesForCustomerOrders } from '../../utils'

export const updateProduct = async (
	order: OrderStatusUpdatedNotificationDTO | OrderCancelledNotificationDTO
) => {
	const { campaignId, orderId } = order
	// const store = campaignId === 23726642 ? 'Haifisch' : 'Top'

	const yandexOrder = await getOrderById({ campaignId, orderId })

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
				return await handleOrderStatusUpdate(order, customerOrder[0])
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
	customerOrder: CustomerOrder
) => {
	const updatedCustomerOrder = {
		...customerOrder,
		state: prepareStatusesForCustomerOrders(order.status, order.substatus),
	}
	return await updateCustomerOrder(updatedCustomerOrder)
}
