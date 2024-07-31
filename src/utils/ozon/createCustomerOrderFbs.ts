/* eslint-disable no-mixed-spaces-and-tabs */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import {
	states,
	group,
	currency,
	fbosOzonProject,
	ozonAgent,
	organization,
	country,
	ozonSalesChannel,
	fbsStore,
} from '../../database'
import {
	type Product,
	type CustomerOrder,
	type State,
} from '../../types/msTypes'
import {
	type FinancialDataFbs,
	type ItemPrice,
	type Posting,
	type Product as OzonProduct,
} from '../../types/ozonTypes'
import { prepareOzonFbsStatuses } from './prepareOzonFbsStatuses'
import { prepareOzonPositions } from './prepareOzonPositions'

dayjs.extend(utc)

const prepareComissions = (
	data: FinancialDataFbs,
	prices: ItemPrice[],
	prodsInOrder: OzonProduct[],
	status: State
): number => {
	if (data.products.length === 0) {
		return 0
	}

	const sumOfLogistics = parseFloat(
		prodsInOrder
			.reduce<number[]>((acc, cur) => {
				prices.forEach(price => {
					if (price.offer_id === cur.offer_id) {
						acc.push(
							price.commissions.fbs_direct_flow_trans_max_amount *
								cur.quantity
						)
					}
				})
				return acc
			}, [])
			.reduce((a, b) => a + +b, 0)
			.toFixed(2)
	)

	const sumOfReturnLogistic = parseFloat(
		prodsInOrder
			.reduce<number[]>((acc, cur) => {
				prices.forEach(price => {
					if (price.offer_id === cur.offer_id) {
						acc.push(
							price.commissions.fbs_return_flow_trans_max_amount
						)
					}
				})
				return acc
			}, [])
			.reduce((a, b) => a + +b, 0)
			.toFixed(2)
	)

	const productsComission = data.products.reduce(
		(a, b) =>
			a +
			b.commission_amount +
			(b?.item_services !== undefined
				? Object.values(b.item_services).reduce((c, d) => c + d, 0)
				: 0),
		0
	)

	const postingComissions = Object.values(data.posting_services).reduce(
		(a, b) => a + b,
		0
	) as number

	if (status.meta.href === states.RETURNED.meta.href) {
		return parseFloat(
			(
				Math.abs(productsComission + postingComissions) +
				sumOfLogistics +
				sumOfReturnLogistic
			).toFixed(2)
		)
	}
	return parseFloat(
		(
			Math.abs(productsComission + postingComissions) + sumOfLogistics
		).toFixed(2)
	)
}

export const createCustomerOrderFbs = (
	order: Posting,
	boughtProducts: Product[],
	prices: ItemPrice[]
): CustomerOrder => {
	return {
		shared: true,
		group,
		name: order.posting_number,
		moment: dayjs(order.in_process_at)
			.subtract(3, 'hour')
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
				value: prepareComissions(
					order.financial_data,
					prices,
					order.products,
					prepareOzonFbsStatuses(
						order.status,
						order.cancellation.cancelled_after_ship
					)
				),
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
		],
		organization,
		state: prepareOzonFbsStatuses(
			order.status,
			order.cancellation.cancelled_after_ship
		),
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
			.subtract(3, 'hour')
			.add(10, 'hour')
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
