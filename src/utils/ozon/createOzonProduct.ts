import {
	group,
	uom,
	productFolder,
	currency,
	priceTypeOzon,
	hfSupplier,
	country,
} from '../../database'
import { type Product } from '../../types/msTypes'
import { type OfferOzonWithAttributes } from '../../types/ozonTypes'
import { getAttributes } from './getOzonAttributes'

export const createOzonProduct = (offer: OfferOzonWithAttributes): Product => {
	return {
		name: offer.name,
		group,
		shared: true,
		pathName: '',
		code: offer.offer_id,
		externalCode: offer.offer_id,
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
				value: parseFloat(offer.price) * 100,
				currency,
				priceType: priceTypeOzon,
			},
		],
		buyPrice: {
			value: 0,
			currency,
		},
		barcodes: [
			{
				ean13: offer.barcode,
			},
		],
		supplier: hfSupplier,
		attributes: getAttributes(offer),
		paymentItemType: 'GOOD',
		discountProhibited: false,
		country,
		article: offer.offer_id,
		weight: offer.weight / 1000,
		variantsCount: 0,
		isSerialTrackable: false,
		trackingType: 'NOT_TRACKED',
	}
}
