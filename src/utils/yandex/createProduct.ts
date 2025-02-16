import {
	group,
	uom,
	productFolder,
	currency,
	priceTypeHF,
	priceTypeTop,
	country,
	organization,
} from '../../database'
import { type Product } from '../../types/msTypes'
import { type GetOfferMappingDTO } from '../../types/yandex/api'
import { getAttributes } from './getAttributes'

export const createProduct = (
	domain: string,
	offer: GetOfferMappingDTO
): Product => {
	return {
		name: offer?.offer?.name ?? '',
		description: offer?.offer?.description ?? '',
		group,
		shared: true,
		pathName: '',
		code: offer?.offer?.offerId ?? '',
		externalCode: offer?.offer?.offerId ?? '',
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
				value: (offer?.offer?.basicPrice?.value ?? 0) * 100,
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
				ean13: offer?.offer?.barcodes?.[0]?.toString() ?? '',
			},
		],
		supplier: organization,
		attributes: getAttributes(domain, offer),
		paymentItemType: 'GOOD',
		discountProhibited: false,
		country,
		article: offer?.offer?.offerId ?? '',
		weight: offer?.offer?.weightDimensions?.weight ?? 0,
		volume: parseFloat(
			(
				(offer?.offer?.weightDimensions?.length ?? 0 / 100) *
				(offer?.offer?.weightDimensions?.width ?? 0 / 100) *
				(offer?.offer?.weightDimensions?.height ?? 0 / 100)
			).toFixed(5)
		),
		variantsCount: 0,
		isSerialTrackable: false,
		trackingType: 'NOT_TRACKED',
	}
}
