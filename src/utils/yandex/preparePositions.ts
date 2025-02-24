import { type CreatePosition, type Product } from '../../types/ms-types'
import {
	type OrderStatsStatusType,
	type OrdersStatsItemDTO,
} from '../../types/yandex/api'

export const preparePositions = (
	products: Product[],
	items?: OrdersStatsItemDTO[],
	status?: OrderStatsStatusType
): CreatePosition[] => {
	const validStatuses = new Set([
		'PROCESSING',
		'RESERVED',
		'PENDING',
		'UNPAID',
	])

	return products.flatMap(
		product =>
			items
				?.filter(item => item.shopSku === product.article)
				.map(item => {
					const totalPrice =
						item.prices?.reduce((total, price) => {
							const cost = price.costPerItem ?? 0
							return total + +cost
						}, 0) ?? 0

					return {
						quantity: item.count,
						price: totalPrice * 100,
						discount: 0,
						vat: 0,
						assortment: {
							meta: product.meta,
						},
						reserve:
							status && validStatuses.has(status)
								? item.count
								: 0,
					}
				}) || []
	)
}
