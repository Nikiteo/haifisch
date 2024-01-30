import { type Product, type CreatePosition } from '../../types/msTypes'
import {
	type OrderStatusEnum,
	type OrderFbsOzonStatus,
	type Product as OzonProduct,
} from '../../types/ozonTypes'

export const prepareOzonPositions = (
	products: Product[],
	items: OzonProduct[],
	status: OrderStatusEnum | OrderFbsOzonStatus
): CreatePosition[] => {
	return products.reduce<CreatePosition[]>((acc, cur) => {
		items.forEach(item => {
			if (item.offer_id === cur.article) {
				acc.push({
					quantity: item.quantity,
					price: parseFloat(item.price) * 100,
					discount: 0,
					vat: 0,
					assortment: {
						meta: cur.meta,
					},
					reserve:
						status === 'awaiting_packaging' ? item.quantity : 0,
				})
			}
		})
		return acc
	}, [])
}
