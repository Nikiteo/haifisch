import {
	currency,
	organization,
	priceTypeHF,
	priceTypeTop,
} from '../../database'
import { type OfferMapping } from '../../types/marketTypes'
import { type Product } from '../../types/msTypes'
import { createProduct } from './createProduct'
import { getAttributes } from './getAttributes'

export const prepareProducts = (
	products: Product[],
	offers: OfferMapping[],
	domain: string
): Product[] => {
	if (products.length === 0 && offers.length === 0) {
		return []
	}

	if (offers.length === 0) {
		return []
	}

	if (products.length === 0) {
		return offers.reduce<Product[]>((acc: Product[], cur: OfferMapping) => {
			acc.push(createProduct(domain, cur))
			return acc
		}, [])
	}

	if (products.length !== 0 && offers.length !== 0) {
		const updatedProducts = offers.reduce<Product[]>(
			(acc: Product[], cur: OfferMapping) => {
				products.forEach((prod: Product) => {
					if (prod.article === cur.offer.offerId.toString()) {
						acc.push({
							...prod,
							supplier: organization,
							salePrices: [
								{
									value: cur.offer.basicPrice.value * 100,
									currency,
									priceType:
										domain === 'Haifisch'
											? priceTypeHF
											: priceTypeTop,
								},
							],
							attributes: getAttributes(domain, cur),
							volume: parseFloat(
								(
									(cur.offer?.weightDimensions?.length ??
										0 / 100) *
									(cur.offer?.weightDimensions?.width ??
										0 / 100) *
									(cur.offer?.weightDimensions?.height ??
										0 / 100)
								).toFixed(5)
							),
						})
					}
				})
				return acc
			},
			[]
		)
		const findNewProducts = offers.filter(offer =>
			updatedProducts.every(item => item.article !== offer.offer.offerId)
		)
		findNewProducts.forEach((cur: OfferMapping) => {
			updatedProducts.push(createProduct(domain, cur))
		})

		return updatedProducts
	}

	return []
}
