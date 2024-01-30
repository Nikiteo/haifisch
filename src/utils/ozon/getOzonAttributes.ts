import { type OfferOzonWithAttributes } from '../../types/ozonTypes'

const prepareVolume = (
	depth: number,
	width: number,
	height: number
): string => {
	return `${parseFloat((depth / 10).toFixed(2))}x${parseFloat(
		(width / 10).toFixed(2)
	)}x${parseFloat((height / 10).toFixed(2))}`
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAttributes = (offer: OfferOzonWithAttributes) => {
	return [
		{
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/2b0c079d-9980-11ee-0a80-0ea300053894',
				type: 'attributemetadata',
				mediaType: 'application/json',
			},
			id: '2b0c079d-9980-11ee-0a80-0ea300053894',
			name: 'Название Озон',
			type: 'string',
			value: offer.name,
		},
		{
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/1edc5c8a-9981-11ee-0a80-0f640005706d',
				type: 'attributemetadata',
				mediaType: 'application/json',
			},
			id: '1edc5c8a-9981-11ee-0a80-0f640005706d',
			name: 'Размеры (ГШВ) Озон',
			type: 'string',
			value: prepareVolume(offer.depth, offer.width, offer.height),
		},
	]
}
