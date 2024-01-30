import {
	group,
	uom,
	productFolder,
	currency,
	priceTypeHF,
	priceTypeTop,
	hfSupplier,
	country,
} from '../../database'
import { type OfferMapping } from '../../types/marketTypes'
import { getAttributes } from './getAttributes'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createProduct = (domain: string, offer: OfferMapping) => {
	return {
		name: offer.offer.name,
		description: offer.offer.description,
		group,
		shared: true,
		pathName: '',
		code: offer.offer.offerId,
		externalCode: offer.offer.offerId,
		archived: false,
		effectiveVat: 0,
		effectiveVatEnabled: false,
		vat: 0,
		vatEnabled: false,
		useParentVat: false,
		uom,
		productFolder,
		minPrice: {
			value: 0,
			currency,
		},
		salePrices: [
			{
				value: offer.offer.basicPrice.value * 100,
				currency,
				priceType: domain === 'Haifisch' ? priceTypeHF : priceTypeTop,
			},
		],
		buyPrice: {
			value: 0,
			currency,
		},
		barcodes: [
			{
				ean13: offer.offer.barcodes[0].toString(),
			},
		],
		supplier: hfSupplier,
		attributes: getAttributes(domain, offer),
		paymentItemType: 'GOOD',
		discountProhibited: false,
		country,
		article: offer.offer.offerId,
		weight: offer.offer.weightDimensions.weight,
		volume: parseFloat(
			(
				(offer.offer.weightDimensions.length / 100) *
				(offer.offer.weightDimensions.width / 100) *
				(offer.offer.weightDimensions.height / 100)
			).toFixed(5)
		),
		variantsCount: 0,
		isSerialTrackable: false,
		trackingType: 'NOT_TRACKED',
	}
}
