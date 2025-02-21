import { type Attribute } from '../../types/msTypes'
import { ProductInfoWithAttributes } from '../../types/ozonTypes'

const prepareVolume = (
	depth?: number,
	width?: number,
	height?: number
): string => {
	if (depth && width && height) {
		return `${parseFloat((depth / 10).toFixed(2))}x${parseFloat(
			(width / 10).toFixed(2)
		)}x${parseFloat((height / 10).toFixed(2))}`
	}
	return ''
}

export const getAttributes = (
	offer: ProductInfoWithAttributes
): Attribute[] => {
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
		// {
		// 	meta: {
		// 		href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/2ca97089-8ade-11ef-0a80-148c0011190c',
		// 		type: 'attributemetadata',
		// 		mediaType: 'application/json',
		// 	},
		// 	id: '2ca97089-8ade-11ef-0a80-148c0011190c',
		// 	name: 'Sku Озон',
		// 	type: 'string',
		// 	value: offer.sku.toString(),
		// },
		{
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/8966aa35-8c49-11ef-0a80-0dcd0004b2ca',
				type: 'attributemetadata',
				mediaType: 'application/json',
			},
			id: '8966aa35-8c49-11ef-0a80-0dcd0004b2ca',
			name: 'ID Озон',
			type: 'string',
			value: offer?.id?.toString(),
		},
	]
}
