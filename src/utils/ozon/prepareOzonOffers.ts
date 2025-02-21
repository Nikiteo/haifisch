import { currency, organization, priceTypeOzon } from '../../database'
import { type Product } from '../../types/msTypes'
import { ProductInfoWithAttributes } from '../../types/ozonTypes'
import { createOzonProduct } from './createOzonProduct'
import { getAttributes } from './getOzonAttributes'

export const prepareOzonOffers = (
	products: Product[],
	offers: ProductInfoWithAttributes[]
): Product[] => {
	if (products.length === 0 && offers.length === 0) {
		return []
	}

	if (offers.length === 0) {
		return []
	}

	if (products.length === 0) {
		return offers.reduce<Product[]>((acc, cur) => {
			acc.push(createOzonProduct(cur))
			return acc
		}, [])
	}

	if (products.length !== 0 && offers.length !== 0) {
		const updatedProducts = offers.reduce<Product[]>((acc, cur) => {
			products.forEach((prod: Product) => {
				if (prod.article === cur.offer_id) {
					acc.push({
						...prod,
						supplier: organization,
						salePrices: [
							{
								value: parseFloat(cur.price || '0') * 100,
								currency,
								priceType: priceTypeOzon,
							},
						],
						attributes: getAttributes(cur),
					})
				}
			})
			return acc
		}, [])
		const findNewProducts = offers.filter(offer =>
			updatedProducts.every(item => item.article !== offer.offer_id)
		)
		findNewProducts.forEach(cur => {
			updatedProducts.push(createOzonProduct(cur))
		})

		return updatedProducts
	}

	return []
}
