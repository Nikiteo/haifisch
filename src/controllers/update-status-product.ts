import { states } from '../database'
import { Logger } from '../lib'
import {
	getOrderById,
	NotificationType,
	OrderCancelledNotificationDTO,
	OrderStatusUpdatedNotificationDTO,
} from '../services'
import {
	getCustomerOrderByName,
	updateCustomerOrder,
} from '../services/moysklad/ordersController'
import { prepareStatusesForCustomerOrders } from '../utils/yandex/create-customer-order'

export const updateProduct = async (
	order: OrderStatusUpdatedNotificationDTO | OrderCancelledNotificationDTO
) => {
	const { campaignId } = order
	const store = campaignId === 23726642 ? 'Haifisch' : 'Top'

	const yandexOrder = await getOrderById(order)
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
				order.notificationType === NotificationType.ORDER_STATUS_UPDATED
			) {
				Logger.info(`Статус заказа ${order.orderId} был обновлен.`)
				Logger.info(`[${store}]: Обновляю заказ покупателя...`)
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
