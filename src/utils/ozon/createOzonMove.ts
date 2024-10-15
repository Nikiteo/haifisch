import dayjs from 'dayjs'
import {
	agent,
	currency,
	fbosOzonProject,
	fbsOzonRefund,
	group,
	organization,
	returnPicked,
} from '../../database'

import {
	type Product,
	type Move,
	type CreatePosition,
} from '../../types/msTypes'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { type OzonReturnFbs } from '../../types/ozonTypes'
dayjs.extend(customParseFormat)

export const preparePositions = (
	products: Product[],
	items?: OzonReturnFbs['items']
): CreatePosition[] => {
	return products.reduce<CreatePosition[]>((acc, cur) => {
		items?.forEach(item => {
			if (
				item.name ===
				cur.attributes?.find(
					attr => attr.id === '2b0c079d-9980-11ee-0a80-0ea300053894'
				)?.value
			) {
				acc.push({
					quantity: item.quantity,
					discount: 0,
					vat: 0,
					assortment: {
						meta: cur.meta,
					},
				})
			}
		})
		return acc
	}, [])
}

export const createOzonMove = (
	ret: OzonReturnFbs,
	boughtProducts: Product[]
): Move => {
	return {
		shared: true,
		group,
		name: ret.posting_number?.toString(),
		moment: dayjs(ret.returned_to_seller_date_time).format(
			'YYYY-MM-DD HH:mm:ss.SSS'
		),
		applicable: true,
		rate: {
			currency,
		},
		agent,
		organization,
		printed: false,
		published: false,
		state: returnPicked,
		targetStore: {
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/a8306907-9450-11ee-0a80-109f00177296',
				metadataHref:
					'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
				type: 'store',
				mediaType: 'application/json',
				uuidHref:
					'https://online.moysklad.ru/app/#warehouse/edit?id=a8306907-9450-11ee-0a80-109f00177296',
			},
		},
		sourceStore: fbsOzonRefund,
		positions: preparePositions(boughtProducts, ret.items),
		project: fbosOzonProject,
		description: `${ret.return_reason_name}`,
	}
}
