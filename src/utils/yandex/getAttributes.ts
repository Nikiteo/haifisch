import dayjs from 'dayjs'
import { type OfferMapping } from '../../types/marketTypes'
dayjs().format()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAttributes = (domain: string, offer: OfferMapping) => {
	if (domain === 'Haifisch') {
		return [
			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/47e81023-9269-11ee-0a80-022f00336d0c',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				name: 'Название ХФ',
				value: offer.offer.name,
			},
			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/e94ca09b-9269-11ee-0a80-0fee00353147',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				name: 'Размеры (ДШВ) ХФ',
				value: `${offer.offer?.weightDimensions?.length ?? 0}x${
					offer.offer?.weightDimensions?.width ?? 0
				}x${offer.offer?.weightDimensions?.height ?? 0}`,
			},
			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/d2655ad2-928a-11ee-0a80-1128003e59bc',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				name: 'Категория',
				value: offer.mapping.marketCategoryName,
			},
			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/240e9535-94de-11ee-0a80-146400228e0e',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				id: '240e9535-94de-11ee-0a80-146400228e0e',
				name: 'Дата изготовление',
				type: 'time',
				value: dayjs()
					.subtract(2, 'month')
					.format('YYYY-MM-DD HH:mm:ss.SSS'),
			},
			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/dee3a537-94dd-11ee-0a80-03920020a493',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				id: 'dee3a537-94dd-11ee-0a80-03920020a493',
				name: 'Изготовитель',
				type: 'string',
				value: 'Мастерская “Haifisch”, Москва, ул.Артюхиной д.4, склад №1',
			},
			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/b5ece328-928b-11ee-0a80-016c003fe4de',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				name: 'Цена софинансирования от Маркета',
				value: offer.offer.cofinancePrice?.value.toString() ?? '0',
			},
		]
	}
	return [
		{
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/47e80e11-9269-11ee-0a80-022f00336d0b',
				type: 'attributemetadata',
				mediaType: 'application/json',
			},
			name: 'Название Тор',
			value: offer.offer.name,
		},
		{
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/240e9535-94de-11ee-0a80-146400228e0e',
				type: 'attributemetadata',
				mediaType: 'application/json',
			},
			id: '240e9535-94de-11ee-0a80-146400228e0e',
			name: 'Дата изготовление',
			type: 'time',
			value: dayjs()
				.subtract(2, 'month')
				.format('YYYY-MM-DD HH:mm:ss.SSS'),
		},
		{
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/dee3a537-94dd-11ee-0a80-03920020a493',
				type: 'attributemetadata',
				mediaType: 'application/json',
			},
			id: 'dee3a537-94dd-11ee-0a80-03920020a493',
			name: 'Изготовитель',
			type: 'string',
			value: 'Мастерская “Haifisch”, Москва, ул.Артюхиной д.4, склад №1',
		},
		{
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/946807ab-997b-11ee-0a80-017d000443c5',
				type: 'attributemetadata',
				mediaType: 'application/json',
			},
			id: '946807ab-997b-11ee-0a80-017d000443c5',
			name: 'Размеры (ДШВ) Тор',
			type: 'string',
			value: `${offer.offer?.weightDimensions?.length ?? 0}x${
				offer.offer?.weightDimensions?.width ?? 0
			}x${offer.offer?.weightDimensions?.height ?? 0}`,
		},
	]
}
