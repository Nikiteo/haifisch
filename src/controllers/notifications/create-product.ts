import { getOrderById } from '../../services'
import {
	createNewCustomerOrder,
	getCustomerOrderByName,
} from '../../services/moysklad/ordersController'
import { getProducts } from '../../services/moysklad/productController'
import { Product } from '../../types/ms-types'
import { OrderItemDTO } from '../../types/yandex/api'
import { OrderCreatedNotificationDTO } from '../../types/yandex/notification-types'
import { createCustomerOrder } from '../../utils/notifications/create-customer-order'

export const createProduct = async (order: OrderCreatedNotificationDTO) => {
	const { campaignId, orderId, createdAt } = order
	const store = campaignId === 23726642 ? 'Haifisch' : 'Top'

	const newOrder = await getOrderById({ campaignId, orderId })

	if (newOrder) {
		const newOrderId = newOrder.id.toString()
		const customerOrder = await getCustomerOrderByName(newOrderId)

		if (!customerOrder || customerOrder.length === 0) {
			const products = await getProducts()
			const boughtProducts = filterBoughtProducts(
				newOrder.items,
				products?.rows
			)
			const newCustomerOrder = await createCustomerOrder(
				store,
				newOrder,
				createdAt,
				boughtProducts
			)
			return await createNewCustomerOrder(newCustomerOrder)
		}
	}
}

const filterBoughtProducts = (items: OrderItemDTO[], products?: Product[]) => {
	return products?.filter(product =>
		items.some(item => item.offerId === product.article)
	)
}
