import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import {
	group,
	currency,
	agent,
	organization,
	country,
	salesChannels,
	fbsStore,
	fbsTopProject,
	fbsHfProject,
	states,
} from '../../database'
import {
	type Product,
	type CustomerOrder,
	State,
	CreatePosition,
	Attribute,
} from '../../types/ms-types'
import {
	type OrderDeliveryDTO,
	OrderDTO,
	OrderStatusType,
	OrderSubstatusType,
} from '../../types/yandex/api'

dayjs.extend(customParseFormat)

const createMoment = (delivery: OrderDeliveryDTO): string => {
	const shipmentDate = delivery.shipments?.[0]?.shipmentDate
	return shipmentDate
		? dayjs(dayjs(shipmentDate, 'DD-MM-YYYY'))
				.set('hour', 19)
				.set('minute', 0)
				.set('second', 0)
				.format('YYYY-MM-DD HH:mm:ss.SSS')
		: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
}

const prepareSubstatuses = (substatus?: OrderSubstatusType): State => {
	if (substatus === 'READY_TO_SHIP') {
		return states.READY_TO_SHIP
	}
	if (substatus === 'SHIPPED') {
		return states.PICKUP
	}
	return states.PROCESSING
}

export const prepareStatusesForCustomerOrders = (
	status?: OrderStatusType,
	substatus?: OrderSubstatusType
): State => {
	switch (status) {
		case OrderStatusType.Cancelled:
			return states.CANCELLED
		case OrderStatusType.Delivered:
			return states.DELIVERED
		case OrderStatusType.Delivery:
		case OrderStatusType.Pickup:
			return states.DELIVERY
		case OrderStatusType.Reserved:
		case OrderStatusType.Placing:
		case OrderStatusType.Pending:
		case OrderStatusType.Unpaid:
			return states.NEW
		case OrderStatusType.Processing:
			return prepareSubstatuses(substatus)
		case OrderStatusType.PartiallyReturned:
			return states.PARTIALLY_RETURNED
		case OrderStatusType.Returned:
			return states.RETURNED
		default:
			return states.UNKNOWN
	}
}

export const preparePositions = (
	order: OrderDTO,
	products?: Product[]
): CreatePosition[] => {
	const validStatuses = new Set([
		'PROCESSING',
		'RESERVED',
		'PENDING',
		'UNPAID',
	])

	if (!products) return []

	return products.flatMap(
		product =>
			order.items
				?.filter(item => item.offerId === product.article)
				.map(item => {
					const totalPrice = item.price
					const totalSubsidies =
						order.subsidies?.reduce((a, b) => +a + +b, 0) || 0
					return {
						quantity: item.count,
						price: (totalPrice + totalSubsidies) * 100,
						discount: 0,
						vat: 0,
						assortment: {
							meta: product.meta,
						},
						reserve:
							order.status && validStatuses.has(order.status)
								? item.count
								: 0,
					}
				}) || []
	)
}

const createAttribute = (
	id: string,
	name: string,
	type: string,
	value: any
): Attribute => ({
	meta: {
		href: `https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/${id}`,
		type: 'attributemetadata',
		mediaType: 'application/json',
	},
	id,
	name,
	type,
	value,
})

export const prepareCustomerOrdersAttributes = (
	order: OrderDTO,
	products?: Product[]
): Attribute[] => {
	const attributes: Attribute[] = []

	attributes.push(
		createAttribute(
			'54623519-968d-11ee-0a80-04d8001e7e59',
			'Предоплачен',
			'boolean',
			order.paymentType === 'PREPAID'
		),
		createAttribute(
			'85c662bb-9fcb-11ee-0a80-03c00003edfc',
			'SKU заказа',
			'text',
			order.items
				?.map(item => `${item.offerId} - ${item.count}`)
				.join('\n')
		),
		createAttribute(
			'14538b65-b36f-11ee-0a80-02a00031fa90',
			'Цвет',
			'text',
			products
				?.filter(product =>
					order.items?.some(item => product.article === item.shopSku)
				)
				.map(prod => `${prod.name.split(' ').at(-1)}`)
				.join('\n')
		)
	)

	return attributes
}

export const createCustomerOrder = (
	store: string,
	order: OrderDTO,
	boughtProducts?: Product[]
): CustomerOrder => {
	return {
		shared: true,
		group,
		name: order.id?.toString(),
		moment: dayjs(order.creationDate, 'DD-MM-YYYY HH:mm:ss').format(
			'YYYY-MM-DD HH:mm:ss.SSS'
		),
		applicable: true,
		rate: {
			currency,
		},
		store: fbsStore,
		project: store === 'Haifisch' ? fbsHfProject : fbsTopProject,
		agent,
		attributes: prepareCustomerOrdersAttributes(order, boughtProducts),
		organization,
		state: prepareStatusesForCustomerOrders(order.status, order.substatus),
		printed: false,
		published: false,
		positions: preparePositions(order, boughtProducts),
		vatEnabled: true,
		vatIncluded: true,
		vatSum: 0.0,
		deliveryPlannedMoment: createMoment(order.delivery),
		shipmentAddressFull: {
			postalCode: order.delivery?.address?.postcode,
			country,
			city: order.delivery?.address?.city ?? '',
			street: order.delivery?.address?.street,
			house: order.delivery?.address?.house,
			apartment: order.delivery?.address?.apartment,
		},
		salesChannel: salesChannels,
	}
}
