import dayjs from 'dayjs'
import {
	agent,
	currency,
	fbsHfProject,
	fbsHfRefund,
	fbsTopProject,
	fbsTopRefund,
	group,
	organization,
	returnPicked,
} from '../../database'
import { type ReturnItem, type Return } from '../../types/marketTypes'
import {
	type Product,
	type Move,
	type CreatePosition,
} from '../../types/msTypes'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

export const preparePositions = (
	products: Product[],
	items?: ReturnItem[]
): CreatePosition[] => {
	return products.reduce<CreatePosition[]>((acc, cur) => {
		items?.forEach(item => {
			if (item.shopSku === cur.article) {
				acc.push({
					quantity: item.count,
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

export const createMove = (
	domain: string,
	ret: Return,
	boughtProducts: Product[]
): Move => {
	return {
		shared: true,
		group,
		name: ret.orderId?.toString(),
		moment: dayjs(ret.updateDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
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
		sourceStore: domain === 'Haifisch' ? fbsHfRefund : fbsTopRefund,
		positions: preparePositions(boughtProducts, ret.items),
		project: domain === 'Haifisch' ? fbsHfProject : fbsTopProject,
		description: `${
			ret.returnType === 'UNREDEEMED' ? 'Невыкуп\n' : 'Возврат\n'
		}${
			ret.returnType === 'RETURN'
				? ret.items
						.map(item => item.decisions.map(d => d.comment))
						.join('')
				: ''
		}
		`,
	}
}
