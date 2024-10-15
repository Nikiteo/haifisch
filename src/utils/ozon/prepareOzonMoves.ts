import { type Product, type Move } from '../../types/msTypes'
import { type OzonReturnFbs } from '../../types/ozonTypes'
import { createOzonMove } from './createOzonMove'

export const prepareOzonMoves = (
	returns: OzonReturnFbs[],
	products: Product[]
): Move[] => {
	if (returns.length === 0) {
		return []
	}

	const newMoves = returns.reduce<Move[]>((acc, cur) => {
		const { items } = cur
		const boughtProducts = products.filter(product =>
			items?.some(
				item =>
					item.sku?.toString() ===
					product.attributes?.find(
						attr =>
							attr.id === '2ca97089-8ade-11ef-0a80-148c0011190c'
					)?.value
			)
		)

		if (boughtProducts.length > 0) {
			acc.push(createOzonMove(cur, boughtProducts))
		}
		return acc
	}, [])

	return newMoves
}
