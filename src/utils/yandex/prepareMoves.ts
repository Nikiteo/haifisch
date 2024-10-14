import { type Return } from '../../types/marketTypes'
import { type Product, type Move } from '../../types/msTypes'
import { createMove } from './createMove'

export const prepareMoves = (
	domain: string,
	returns: Return[],
	products: Product[]
): Move[] => {
	if (returns.length === 0) {
		return []
	}

	const newMoves = returns.reduce<Move[]>((acc, cur) => {
		const { items } = cur
		const boughtProducts = products.filter(product =>
			items?.some(item => item.shopSku === product.article)
		)

		if (boughtProducts.length > 0) {
			acc.push(createMove(domain, cur, boughtProducts))
		}
		return acc
	}, [])

	return newMoves
}
