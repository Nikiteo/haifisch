import {
	group,
	uom,
	productFolder,
	currency,
	priceTypeOzon,
	country,
	organization,
} from '../../database'
import { type Product } from '../../types/ms-types'
import { type ProductInfoWithAttributes } from '../../types/ozon/types'
import { getAttributes } from './getOzonAttributes'

export const createOzonProduct = (
	offer: ProductInfoWithAttributes
): Product => {
	return {
		name: offer.name || '',
		group,
		shared: true,
		pathName: '',
		code: offer.offer_id || '',
		externalCode: offer.offer_id || '',
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
				value: parseFloat(offer.price || '0') * 100,
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
				//@ts-ignore
				ean13: offer.barcodes[0],
			},
		],
		supplier: organization,
		attributes: getAttributes(offer),
		paymentItemType: 'GOOD',
		discountProhibited: false,
		country,
		article: offer.offer_id || '',
		weight: (offer.weight || 0) / 1000,
		variantsCount: 0,
		isSerialTrackable: false,
		trackingType: 'NOT_TRACKED',
	}
}
