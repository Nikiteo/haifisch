/* eslint-disable no-mixed-spaces-and-tabs */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import {
	group,
	currency,
	fbosOzonProject,
	ozonAgent,
	organization,
	country,
	ozonSalesChannel,
	fbsStore,
} from '../../database'
import { type Product, type CustomerOrder } from '../../types/msTypes'
import { type Posting, type Operation } from '../../types/ozonTypes'
import { prepareOzonFbsStatuses } from './prepareOzonFbsStatuses'
import { prepareOzonPositions } from './prepareOzonPositions'

dayjs.extend(utc)

const prepareComissions = (
	orderNumber: Posting['order_number'],
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

export const createCustomerOrderFbs = (
	order: Posting,
	boughtProducts: Product[],
	transactions: Operation[]
): CustomerOrder => {
	return {
		shared: true,
		group,
		name: order.posting_number,
		moment: dayjs(order.in_process_at)
			.add(3, 'hours')
			.format('YYYY-MM-DD HH:mm:ss.SSS'),
		applicable: true,
		rate: {
			currency,
		},
		store: fbsStore,
		project: fbosOzonProject,
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
				value: prepareComissions(order.order_number, transactions),
			},
			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/85c662bb-9fcb-11ee-0a80-03c00003edfc',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				id: '85c662bb-9fcb-11ee-0a80-03c00003edfc',
				name: 'SKU заказа',
				type: 'text',
				value: order.products
					.map(product => `${product.offer_id} - ${product.quantity}`)
					.join('\n'),
			},
			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/14538b65-b36f-11ee-0a80-02a00031fa90',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				id: '14538b65-b36f-11ee-0a80-02a00031fa90',
				name: 'Цвет',
				type: 'text',
				value: boughtProducts
					.filter(product =>
						order.products.some(
							item => product.article === item.offer_id
						)
					)
					.map(prod => `${prod.name.split(' ').at(-1)}`)
					.join('\n'),
			},
			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/c09d1b3e-90ff-11ef-0a80-0efd00046bc2',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				id: 'c09d1b3e-90ff-11ef-0a80-0efd00046bc2',
				name: 'Дата получения возврата',
				type: 'string',
				value: dayjs(order.refundDate).format(
					'YYYY-MM-DD HH:mm:ss.SSS'
				),
			},
		],
		organization,
		state: prepareOzonFbsStatuses(order.status),
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
		deliveryPlannedMoment: dayjs(order.shipment_date)
			.add(3, 'hours')
			.format('YYYY-MM-DD HH:mm:ss.SSS'),
		shipmentAddressFull: {
			country,
			city: order?.analytics_data.city,
		},
		salesChannel: ozonSalesChannel,
		description:
			order.status === 'cancelled' || order.status === 'returned'
				? `Отменен после отгрузки: ${
						order.cancellation.cancelled_after_ship ? 'Да' : 'Нет'
				  }\nИнициатор отмены: ${
						order.cancellation.cancellation_initiator
				  }\nПричина отмены: ${
						order.cancellation.cancel_reason
				  }\nВлияние на рейтинг: ${
						order.cancellation.affect_cancellation_rating
							? 'Да'
							: 'Нет'
				  }`
				: '',
	}
}
