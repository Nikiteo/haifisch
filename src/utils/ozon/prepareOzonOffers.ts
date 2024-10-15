import { currency, priceTypeOzon } from '../../database'
import { type Product } from '../../types/msTypes'
import { type OfferOzonWithAttributes } from '../../types/ozonTypes'
import { createOzonProduct } from './createOzonProduct'
import { getAttributes } from './getOzonAttributes'

export const prepareOzonOffers = (
	products: Product[],
	offers: OfferOzonWithAttributes[]
): Product[] => {
	if (products.length === 0 && offers.length === 0) {
		return []
	}

	if (offers.length === 0) {
		return []
	}

	if (products.length === 0) {
		return offers.reduce<Product[]>(
			(acc: Product[], cur: OfferOzonWithAttributes) => {
				acc.push(createOzonProduct(cur))
				return acc
			},
			[]
		)
	}

	if (products.length !== 0 && offers.length !== 0) {
		const updatedProducts = offers.reduce<Product[]>(
			(acc: Product[], cur: OfferOzonWithAttributes) => {
				products.forEach((prod: Product) => {
					if (prod.article === cur.offer_id) {
						acc.push({
							...prod,
							salePrices: [
								{
									value: parseFloat(cur.price) * 100,
									currency,
									priceType: priceTypeOzon,
								},
							],
							attributes: getAttributes(cur),
						})
					}
				})
				return acc
			},
			[]
		)
		const findNewProducts = offers.filter(offer =>
			updatedProducts.every(item => item.article !== offer.offer_id)
		)
		findNewProducts.forEach((cur: OfferOzonWithAttributes) => {
			updatedProducts.push(createOzonProduct(cur))
		})

		return updatedProducts
	}

	return []
}
