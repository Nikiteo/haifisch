import { Logger } from '../../lib'
import { states } from '../../database'
import { getOrderById, getReturnById } from '../../services'
import {
	getCustomerOrderByName,
	updateCustomerOrder,
} from '../../services/moysklad/ordersController'
import { getSaleReturnByName } from '../../services/moysklad/salesreturnController'
import { OrderReturnCreatedNotificationDTO } from '../../types/yandex/notification-types'

export const createReturn = async (
	order: OrderReturnCreatedNotificationDTO
) => {
	const { campaignId, orderId, returnId } = order
	const store = campaignId === 23726642 ? 'Haifisch' : 'Top'

	const yandexOrder = await getOrderById({
		campaignId,
		orderId,
	})
	Logger.info(`[${store}]: Получены данные по заказу...`)
	const yandexReturn = await getReturnById({
		campaignId,
		orderId,
		returnId,
	})
	Logger.info(`[${store}]: Получены данные по возврату...`)

	if (yandexOrder && yandexReturn) {
		const customerOrder = await getCustomerOrderByName(
			yandexOrder.id.toString()
		)
		Logger.info(`[${store}]: Получены данные по заказу из МС...`)
		const saleReturn = await getSaleReturnByName(yandexOrder.id.toString())
		Logger.info(`[${store}]: Получены данные по возврату из МС...`)

		if (
			customerOrder &&
			customerOrder?.length !== 0 &&
			saleReturn &&
			saleReturn.length === 0
		) {
			Logger.info(`[${store}]: Данный заказ создан в МС...`)
			Logger.info(`[${store}]: Возврат не создан в МС...`)

			const updatedCustomerOrder = {
				...customerOrder[0],
				state: {
					...states.CANCELLED,
				},
			}

			return await updateCustomerOrder(updatedCustomerOrder)
		}
	}
}
