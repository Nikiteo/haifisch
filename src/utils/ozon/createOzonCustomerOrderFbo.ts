import dayjs from 'dayjs'

import {
	group,
	currency,
	fboOzonStore,
	fboOzonProject,
	ozonAgent,
	ozonSupplier,
	country,
	ozonSalesChannel,
} from '../../database'
import { type Product, type CustomerOrder } from '../../types/msTypes'
import { prepareOzonPositions } from './prepareOzonPositions'
import { prepareOzonStatuses } from './prepareOzonStatuses'
import { Operation, PostingFbo } from '../../types/ozon/ozon-types'

const prepareComissions = (
	orderNumber: PostingFbo['order_number'],
	transactions: Operation[]
): number => {
	if (!transactions.length) return 0

	const regex = new RegExp(`${orderNumber}.*$`)

	const totalCommissions = transactions.reduce((acc, cur) => {
		const postingNumber = cur.posting?.posting_number
		if (postingNumber && regex.test(postingNumber)) {
			const serviceTotal = (cur.services ?? []).reduce(
				(sum, service) => sum + (Number(service.price) || 0),
				0
			)
			acc += serviceTotal

			if (
				cur.type === 'orders' ||
				(cur.type === 'returns' &&
					(!cur.services || cur.services.length === 0))
			) {
				acc += cur.sale_commission ?? 0
			}
		}
		return acc
	}, 0)

	return Math.abs(totalCommissions)
}

export const createCustomerOrderFbo = (
	order: PostingFbo,
	boughtProducts: Product[],
	transactions: Operation[]
): CustomerOrder => {
	const createdAt = dayjs(order.created_at).subtract(3, 'hour')
	const deliveryPlannedMoment = createdAt.add(1, 'day')

	return {
		shared: true,
		group,
		name: order.posting_number,
		moment: createdAt.format('YYYY-MM-DD HH:mm:ss.SSS'),
		deliveryPlannedMoment: deliveryPlannedMoment.format(
			'YYYY-MM-DD HH:mm:ss.SSS'
		),
		applicable: true,
		rate: {
			currency,
		},
		store: fboOzonStore,
		project: fboOzonProject,
		agent: ozonAgent,
		attributes: [
			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/279ba9fa-9d67-11ee-0a80-09f500178da3',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				id: '279ba9fa-9d67-11ee-0a80-09f500178da3',
				name: 'Комиссии Ozon',
				type: 'double',
				value: prepareComissions(order.posting_number, transactions),
			},
		],
		organization: ozonSupplier,
		state: prepareOzonStatuses(order.status),
		printed: false,
		published: false,
		positions: prepareOzonPositions(
			boughtProducts,
			order.products,
			order.status
		),
		vatEnabled: true,
		vatIncluded: true,
		vatSum: 0.0,
		shipmentAddressFull: {
			country,
			city: order?.analytics_data?.city ?? '',
		},
		salesChannel: ozonSalesChannel,
		description: '',
	}
}
