import { currency, organization, priceTypeOzon } from '../../database'
import { type Product } from '../../types/msTypes'
import { ProductInfoWithAttributes } from '../../types/ozon/types'
import { createOzonProduct } from './createOzonProduct'
import { getAttributes } from './getOzonAttributes'

export const prepareOzonOffers = (
	products: Product[],
	offers: ProductInfoWithAttributes[]
): Product[] => {
	if (offers.length === 0) {
		return []
	}

	const updatedProducts: Product[] = products
		.map(prod => {
			const matchingOffer = offers.find(
				offer => offer.offer_id === prod.article
			)
			if (matchingOffer) {
				return {
					...prod,
					supplier: organization,
					salePrices: [
						{
							value: parseFloat(matchingOffer.price || '0') * 100,
							currency,
							priceType: priceTypeOzon,
						},
					],
					attributes: getAttributes(matchingOffer),
				}
			}
			return null
		})
		.filter(Boolean) as Product[]

	const existingProductArticles = new Set(
		updatedProducts.map(item => item.article)
	)
	const newProducts = offers
		.filter(offer => offer.offer_id)
		.filter(offer => !existingProductArticles.has(offer.offer_id!))
		.map(createOzonProduct)

	return [...updatedProducts, ...newProducts]
}
