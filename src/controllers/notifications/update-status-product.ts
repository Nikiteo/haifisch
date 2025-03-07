import { states } from '../../database'
import { Logger } from '../../lib'
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
import { getProducts } from '../../services/moysklad/productController'
import { CustomerOrder, Product } from '../../types/ms-types'
import { OrderDTO, OrderItemDTO } from '../../types/yandex/api'
import {
	createDemand,
	preparePositions,
	prepareStatusesForCustomerOrders,
	sendTelegramMessage,
} from '../../utils'

export const updateProduct = async (
	order: OrderStatusUpdatedNotificationDTO | OrderCancelledNotificationDTO
) => {
	const { campaignId, orderId } = order
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
				return await handleOrderStatusUpdate(
					order,
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
		const createdDemand = await createDemand(newCustomerOrder)
		sendTelegramMessage(
			`Отгрузка: \`\`\`json\n${JSON.stringify(newCustomerOrder, null, 2)}\n\`\`\``
		)
		Logger.info(JSON.stringify(newCustomerOrder))
		Logger.info(JSON.stringify(createdDemand))
		return await updateCustomerOrder(updatedCustomerOrder)
	}
	return await updateCustomerOrder(updatedCustomerOrder)
}

const filterBoughtProducts = (items: OrderItemDTO[], products?: Product[]) => {
	return products?.filter(product =>
		items.some(item => item.offerId === product.article)
	)
}
