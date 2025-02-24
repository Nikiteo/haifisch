import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import {
	group,
	currency,
	agent,
	organization,
	country,
	salesChannels,
} from '../../database'
import { type Product, type CustomerOrder } from '../../types/ms-types'
import { prepareCustomerOrdersAttributes } from './customerOrderAttributes'
import { getProject } from './getProject'
import { getStore } from './getStore'
import { preparePositions } from './preparePositions'
import { prepareStatusesForCustomerOrders } from './prepareStatusesForCustomerOrders'
import {
	type OrdersStatsOrderDTO,
	type EnrichedOrdersStatsOrderDTO,
	type OrderDeliveryDTO,
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

const isEnrichedOrder = (
	order: OrdersStatsOrderDTO | EnrichedOrdersStatsOrderDTO
): order is EnrichedOrdersStatsOrderDTO => {
	return (order as EnrichedOrdersStatsOrderDTO).delivery !== undefined
}

export const createCustomerOrder = (
	domain: string,
	order: EnrichedOrdersStatsOrderDTO | OrdersStatsOrderDTO,
	boughtProducts: Product[],
	type: string
): CustomerOrder => {
	const delivery = isEnrichedOrder(order) ? order.delivery : undefined

	return {
		shared: true,
		group,
		name: order.id?.toString(),
		moment: dayjs(order.creationDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
		applicable: true,
		rate: {
			currency,
		},
		store: getStore(domain, type),
		project: getProject(domain, type),
		agent,
		attributes: prepareCustomerOrdersAttributes(boughtProducts, order),
		organization,
		state: prepareStatusesForCustomerOrders(
			order.status,
			isEnrichedOrder(order) ? order.substatus : undefined
		),
		printed: false,
		published: false,
		positions: preparePositions(boughtProducts, order.items, order.status),
		vatEnabled: true,
		vatIncluded: true,
		vatSum: 0.0,
		deliveryPlannedMoment:
			isEnrichedOrder(order) && delivery
				? createMoment(delivery)
				: dayjs(order.creationDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
		shipmentAddressFull: {
			postalCode: delivery?.address?.postcode,
			country,
			city: order?.deliveryRegion?.name ?? '',
			street: delivery?.address?.street,
			house: delivery?.address?.house,
			apartment: delivery?.address?.apartment,
		},
		salesChannel: salesChannels,
	}
}
