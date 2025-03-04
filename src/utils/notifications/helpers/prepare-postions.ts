import { CreatePosition, Product } from '../../../types/ms-types'
import { OrderDTO } from '../../../types/yandex/api'

export const preparePositions = (
	order: OrderDTO,
	products?: Product[]
): CreatePosition[] => {
	const validStatuses = new Set([
		'PROCESSING',
		'RESERVED',
		'PENDING',
		'UNPAID',
	])

	if (!products) return []

	return products.flatMap(
		product =>
			order.items
				?.filter(item => item.offerId === product.article)
				.map(item => {
					const totalSubsidies =
						item.subsidies?.reduce((a, b) => +a + +b.amount, 0) || 0
					return {
						quantity: item.count,
						price: (item.price + totalSubsidies) * 100,
						discount: 0,
						vat: 0,
						assortment: {
							meta: product.meta,
						},
						reserve:
							order.status && validStatuses.has(order.status)
								? item.count
								: 0,
					}
				}) || []
	)
}
