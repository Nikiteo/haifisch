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
					item.name ===
					product.attributes?.find(
						attr =>
							attr.id === '2b0c079d-9980-11ee-0a80-0ea300053894'
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
