import {
	currency,
	organization,
	priceTypeHF,
	priceTypeTop,
} from '../../database'
import { type Product } from '../../types/ms-types'
import { type GetOfferMappingDTO } from '../../types/yandex/api'
import { createProduct } from './createProduct'
import { getAttributes } from './getAttributes'

const createUpdatedProduct = (
	prod: Product,
	cur: GetOfferMappingDTO,
	domain: string
): Product => {
	return {
		...prod,
		supplier: organization,
		salePrices: [
			{
				value: (cur.offer?.basicPrice?.value ?? 0) * 100,
				currency,
				priceType: domain === 'Haifisch' ? priceTypeHF : priceTypeTop,
			},
		],
		attributes: getAttributes(domain, cur),
		volume: parseFloat(
			(
				(cur.offer?.weightDimensions?.length ?? 0 / 100) *
				(cur.offer?.weightDimensions?.width ?? 0 / 100) *
				(cur.offer?.weightDimensions?.height ?? 0 / 100)
			).toFixed(5)
		),
	}
}

export const prepareProducts = (
	products: Product[],
	offers: GetOfferMappingDTO[],
	domain: string
): Product[] => {
	if (offers.length === 0) {
		return []
	}

	const updatedProducts: Product[] = products.map(prod => {
		const offer = offers.find(
			cur => prod.article === cur.offer?.offerId.toString()
		)
		return offer ? createUpdatedProduct(prod, offer, domain) : prod
	})

	const newProducts = offers
		.filter(
			offer =>
				!updatedProducts.some(
					item => item.article === offer.offer?.offerId
				)
		)
		.map(offer => createProduct(domain, offer))

	return [...updatedProducts, ...newProducts]
}
