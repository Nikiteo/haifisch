import { type SberStatuses, type Item } from '../../types/sber-types'
import { type CreatePosition, type Product } from '../../types/ms-types'

export const preparePositions = (
	products: Product[],
	items?: Item[],
	status?: SberStatuses
): CreatePosition[] => {
	return products.reduce<CreatePosition[]>((acc, cur) => {
		items?.forEach(item => {
			if (item.offerId === cur.article) {
				acc.push({
					quantity: item.quantity,
					price: item.price * 100,
					discount: 0,
					vat: 0,
					assortment: {
						meta: cur.meta,
					},
					reserve:
						status === 'NEW' || status === 'CONFIRMED'
							? item.quantity
							: 0,
				})
			}
		})
		return acc
	}, [])
}
