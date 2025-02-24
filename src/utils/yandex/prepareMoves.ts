import { type Product, type Move } from '../../types/ms-types'
import { type ReturnDTO } from '../../types/yandex/api'
import { createMove } from './createMove'

export const prepareMoves = (
	domain: string,
	returns: ReturnDTO[],
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
