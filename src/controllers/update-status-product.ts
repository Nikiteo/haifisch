import { consignee, states } from '../database'
import { Logger } from '../lib'
import {
	getOrderById,
	NotificationType,
	OrderCancelledNotificationDTO,
	OrderStatusType,
	OrderStatusUpdatedNotificationDTO,
	OrderSubstatusType,
} from '../services'
import {
	getCustomerOrderByName,
	updateCustomerOrder,
} from '../services/moysklad/ordersController'
import { prepareStatusesForCustomerOrders } from '../utils/yandex/create-customer-order'

export const updateProduct = async (
	order: OrderStatusUpdatedNotificationDTO | OrderCancelledNotificationDTO
) => {
	const { campaignId, orderId } = order
	const store = campaignId === 23726642 ? 'Haifisch' : 'Top'

	const yandexOrder = await getOrderById({
		campaignId,
		orderId,
	})
	Logger.info(`[${store}]: Получены данные по заказу...`)

	if (yandexOrder) {
		const customerOrder = await getCustomerOrderByName(
			yandexOrder.id.toString()
		)
		Logger.info(`[${store}]: Получены данные по заказу из МС...`)
		if (customerOrder && customerOrder?.length !== 0) {
			Logger.info(`[${store}]: Данный заказ создан в МС...`)
			if (order.notificationType === NotificationType.ORDER_CANCELLED) {
				Logger.info(`Заказ ${order.orderId} был отменен.`)
				Logger.info(`[${store}]: Отменяю заказ покупателя...`)
				const updatedCustomerOrder = {
					...customerOrder[0],
					state: {
						...states.CANCELLED,
					},
				}
				return await updateCustomerOrder(updatedCustomerOrder)
			} else if (
				order.notificationType ===
					NotificationType.ORDER_STATUS_UPDATED &&
				order.status !== OrderStatusType.CANCELLED
			) {
				Logger.info(`[${store}]: Обновляю заказ покупателя...`)
				if (
					!customerOrder[0].demands &&
					order.substatus === OrderSubstatusType.READY_TO_SHIP
				) {
				}
				const updatedCustomerOrder = {
					...customerOrder[0],
					state: prepareStatusesForCustomerOrders(
						order.status,
						order.substatus
					),
				}
				return await updateCustomerOrder(updatedCustomerOrder)
			}
		}
	}
}
