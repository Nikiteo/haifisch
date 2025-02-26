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
} from '../../types/ms-types'
import {
	type OrderDeliveryDTO,
	OrderDTO,
	OrderItemDTO,
	OrderStatusType,
	OrderSubstatusType,
} from '../../types/yandex/api'

dayjs.extend(customParseFormat)

const createMoment = (delivery: OrderDeliveryDTO): string => {
	const shipmentDate = delivery.shipments?.[0]?.shipmentDate
	return shipmentDate
		? dayjs(dayjs(shipmentDate, 'DD-MM-YYYY'))
				.set('hour', 17)
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
	products?: Product[],
	items?: OrderItemDTO[],
	status?: OrderStatusType
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
			items
				?.filter(item => item.shopSku === product.article)
				.map(item => {
					const totalPrice = item.price
					return {
						quantity: item.count,
						price: totalPrice * 100,
						discount: 0,
						vat: 0,
						assortment: {
							meta: product.meta,
						},
						reserve:
							status && validStatuses.has(status)
								? item.count
								: 0,
					}
				}) || []
	)
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
		moment: dayjs(order.creationDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
		applicable: true,
		rate: {
			currency,
		},
		store: fbsStore,
		project: store === 'Haifisch' ? fbsHfProject : fbsTopProject,
		agent,
		attributes: [],
		organization,
		state: prepareStatusesForCustomerOrders(order.status, order.substatus),
		printed: false,
		published: false,
		positions: preparePositions(boughtProducts, order.items, order.status),
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
