import { type Product, type CreatePosition } from '../../types/msTypes'
import { PostingFbo, PostingFbs } from '../../types/ozon/ozon-types'

type ProductItem<T> = T extends (infer U)[] ? U : never

type PostingFboProductItem = ProductItem<PostingFbo['products']>
type PostingFbsProductItem = ProductItem<PostingFbs['products']>

export const prepareOzonPositions = (
	products: Product[],
	items: PostingFbo['products'] | PostingFbs['products'],
	status?: string
): CreatePosition[] => {
	const itemMap = new Map<
		string,
		PostingFboProductItem | PostingFbsProductItem
	>()

	if (Array.isArray(items)) {
		items.forEach(item => {
			if (item.offer_id) {
				itemMap.set(item.offer_id, item)
			}
		})
	}

	return products.reduce<CreatePosition[]>((acc, cur) => {
		const item = itemMap.get(cur.article)
		if (item && item.price) {
			acc.push({
				quantity: item.quantity,
				price: parseFloat(item.price) * 100,
				discount: 0,
				vat: 0,
				assortment: {
					meta: cur.meta,
				},
				reserve: status === 'awaiting_packaging' ? item.quantity : 0,
			})
		}
		return acc
	}, [])
}
