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
import { type FboOrder, type Operation } from '../../types/ozonTypes'
import { prepareOzonPositions } from './prepareOzonPositions'
import { prepareOzonStatuses } from './prepareOzonStatuses'

const prepareComissions = (
	orderNumber: FboOrder['order_number'],
	transactions: Operation[]
): number => {
	if (transactions.length === 0) {
		return 0
	}

	const regex = new RegExp(`${orderNumber}.*$`)

	return Math.abs(
		parseFloat(
			transactions
				.reduce<number[]>((acc, cur) => {
					if (regex.test(cur.posting.posting_number)) {
						acc.push(
							cur.services.reduce(
								(sum, service) => sum + Number(service.price),
								0
							)
						)

						if (cur.type === 'orders') {
							acc.push(cur.sale_commission)
						}
						if (
							cur.type === 'returns' &&
							cur.services.length === 0
						) {
							acc.push(cur.sale_commission)
						}
					}
					return acc
				}, [])
				.reduce((a, b) => a + +b, 0)
				.toFixed(0)
		)
	)
}

export const createCustomerOrderFbo = (
	order: FboOrder,
	boughtProducts: Product[],
	transactions: Operation[]
): CustomerOrder => {
	return {
		shared: true,
		group,
		name: order.posting_number,
		moment: dayjs(order.created_at)
			.subtract(3, 'hour')
			.format('YYYY-MM-DD HH:mm:ss.SSS'),
		deliveryPlannedMoment: dayjs(order.created_at)
			.subtract(3, 'hour')
			.add(1, 'day')
			.format('YYYY-MM-DD HH:mm:ss.SSS'),
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
			city: order?.analytics_data.city,
		},
		salesChannel: ozonSalesChannel,
		description: '',
	}
}
