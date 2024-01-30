import { type OrderStatusEnum, type Item } from '../../types/marketTypes'
import { type CreatePosition, type Product } from '../../types/msTypes'

export const preparePositions = (
	products: Product[],
	items?: Item[],
	status?: OrderStatusEnum
): CreatePosition[] => {
	return products.reduce<CreatePosition[]>((acc, cur) => {
		items?.forEach(item => {
			if (item.shopSku === cur.article) {
				acc.push({
					quantity: item.count,
					price:
						item.prices.reduce((a, b) => a + +b.costPerItem, 0) *
						100,
					discount: 0,
					vat: 0,
					assortment: {
						meta: cur.meta,
					},
					reserve:
						status === 'PROCESSING' ||
						status === 'RESERVED' ||
						status === 'PENDING' ||
						status === 'UNPAID'
							? item.count
							: 0,
				})
			}
		})
		return acc
	}, [])
}
