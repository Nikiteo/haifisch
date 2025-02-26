import { bot } from '../bot'
import { Logger } from '../lib'
import { getOrderById, OrderCreatedNotificationDTO } from '../services'
import { getCustomerOrderByName } from '../services/moysklad/ordersController'
import { getProducts } from '../services/moysklad/productController'
import { createCustomerOrder } from '../utils/yandex/create-customer-order'

export const createProduct = async (order: OrderCreatedNotificationDTO) => {
	const { campaignId } = order
	const store = campaignId === 23726642 ? 'Haifisch' : 'Top'

	const newOrder = await getOrderById(order)
	Logger.info(`[${store}]: Получены данные по новому заказу...`)

	if (newOrder) {
		const customerOrder = await getCustomerOrderByName(
			newOrder.id.toString()
		)
		Logger.info(`[${store}]: Получены данные по заказу из МС...`)

		if (customerOrder?.length === 0) {
			Logger.info(`[${store}]: Данный заказ не создан в МС...`)
			const products = await getProducts()
			Logger.info(`[${store}]: Получены данные по продуктам из МС...`)
			const { items } = newOrder
			const boughtProducts = products?.rows.filter(product =>
				items?.some(item => item.shopSku === product.article)
			)
			Logger.info(`[${store}]: Создаю заказ покупателя...`)

			const newCustomerOrder = await createCustomerOrder(
				store,
				newOrder,
				boughtProducts
			)
			Logger.info(JSON.stringify(newCustomerOrder))
			return newCustomerOrder
		}
	}
}
