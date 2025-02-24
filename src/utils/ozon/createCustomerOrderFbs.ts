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
import { type Product, type CustomerOrder } from '../../types/ms-types'
import { prepareOzonFbsStatuses } from './prepareOzonFbsStatuses'
import { prepareOzonPositions } from './prepareOzonPositions'
import { Operation, PostingFbs } from '../../types/ozon/ozon-types'

dayjs.extend(utc)

const prepareCommissions = (
	orderNumber: PostingFbs['order_number'],
	transactions: Operation[]
): number => {
	if (!transactions.length) return 0

	const regex = new RegExp(`${orderNumber}.*$`)

	return Math.abs(
		transactions.reduce((acc, cur) => {
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
	)
}

export const createCustomerOrderFbs = (
	order: PostingFbs & { refundDate?: string },
	boughtProducts: Product[],
	transactions: Operation[]
): CustomerOrder => {
	const {
		shipment_date,
		in_process_at,
		products,
		status,
		refundDate,
		posting_number,
		analytics_data,
		cancellation,
	} = order

	const deliveryPlannedMoment = dayjs(shipment_date)
		.add(3, 'hour')
		.format('YYYY-MM-DD HH:mm:ss.SSS')

	const skuOrderValue =
		products
			?.map(product => `${product.offer_id} - ${product.quantity}`)
			.join('\n') || ''

	const colorValue =
		boughtProducts
			.filter(product =>
				products?.some(item => product.article === item.offer_id)
			)
			.map(prod => prod.name.split(' ').at(-1))
			.join('\n') || ''

	const cancellationDescription =
		status === 'cancelled' || status === 'returned'
			? `Отменен после отгрузки: ${cancellation?.cancelled_after_ship ? 'Да' : 'Нет'}\nИнициатор отмены: ${cancellation?.cancellation_initiator || 'Не указано'}\nПричина отмены: ${cancellation?.cancel_reason || 'Не указана'}\nВлияние на рейтинг: ${cancellation?.affect_cancellation_rating ? 'Да' : 'Нет'}`
			: ''

	return {
		shared: true,
		group,
		name: posting_number,
		moment: dayjs(in_process_at)
			.add(3, 'hour')
			.format('YYYY-MM-DD HH:mm:ss.SSS'),
		applicable: true,
		rate: { currency },
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
				value: prepareCommissions(order.order_number, transactions),
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
				value: skuOrderValue,
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
				value: colorValue,
			},

			{
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/cd289eaa-eacf-11ef-0a80-016f000e54c2',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				id: 'cd289eaa-eacf-11ef-0a80-016f000e54c2',
				name: 'Дата получения возврата',
				type: 'string',
				value: refundDate
					? dayjs(refundDate).format('YYYY-MM-DD HH:mm:ss.SSS')
					: '',
			},
		],
		organization,
		state: prepareOzonFbsStatuses(status),
		printed: false,
		published: false,
		positions: prepareOzonPositions(boughtProducts, products, status),
		vatEnabled: true,
		vatIncluded: true,
		vatSum: 0.0,
		deliveryPlannedMoment,
		shipmentAddressFull: {
			country,
			city: analytics_data?.city || '',
		},
		salesChannel: ozonSalesChannel,
		description: cancellationDescription,
	}
}
