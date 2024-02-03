import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import {
	states,
	group,
	currency,
	fboOzonStore,
	fboOzonProject,
	ozonAgent,
	ozonSupplier,
	country,
	ozonSalesChannel,
} from '../../database'
import {
	type Product,
	type CustomerOrder,
	type State,
} from '../../types/msTypes'
import {
	type Product2,
	type ItemPrice,
	type FboOrder,
	type Product as OzonProduct,
} from '../../types/ozonTypes'
import { prepareOzonPositions } from './prepareOzonPositions'
import { prepareOzonStatuses } from './prepareOzonStatuses'
dayjs.extend(utc)
dayjs.extend(timezone)
const prepareComissions = (
	products: Product2[],
	prices: ItemPrice[],
	status: State,
	prodsInOrder: OzonProduct[]
): number => {
	if (products.length === 0) {
		return 0
	}

	const sumOfLogistics = parseFloat(
		prodsInOrder
			.reduce<number[]>((acc, cur) => {
				prices.forEach(price => {
					if (price.offer_id === cur.offer_id) {
						acc.push(
							price.commissions.fbo_direct_flow_trans_max_amount
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
							price.commissions.fbo_return_flow_trans_max_amount
						)
					}
				})
				return acc
			}, [])
			.reduce((a, b) => a + +b, 0)
			.toFixed(2)
	)

	const comissions = parseFloat(
		Math.abs(
			products.reduce(
				(a, b) =>
					a +
					b.commission_amount +
					(b?.item_services !== undefined
						? Object.values(b.item_services).reduce(
								(c, d) => c + d,
								0
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  )
						: 0),
				0
			)
		).toFixed(2)
	)

	if (status.meta.href === states.RETURNED.meta.href) {
		return parseFloat(
			(comissions + sumOfLogistics + sumOfReturnLogistic).toFixed(2)
		)
	}

	return parseFloat((comissions + sumOfLogistics).toFixed(2))
}

export const createCustomerOrderFbo = (
	order: FboOrder,
	boughtProducts: Product[],
	prices: ItemPrice[]
): CustomerOrder => {
	return {
		shared: true,
		group,
		name: order.posting_number,
		moment: dayjs(order.created_at)
			.subtract(3, 'hour')
			.tz('Europe/Moscow').format('YYYY-MM-DD HH:mm:ss.SSS'),
		deliveryPlannedMoment: dayjs(order.created_at)
			.subtract(3, 'hour')
			.add(1, 'day')
			.tz('Europe/Moscow').format('YYYY-MM-DD HH:mm:ss.SSS'),
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
				value: prepareComissions(
					order.financial_data.products,
					prices,
					prepareOzonStatuses(order.status),
					order.products
				),
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
