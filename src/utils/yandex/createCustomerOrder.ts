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
import {
	type Order,
	type AddedOrder,
	type Delivery,
} from '../../types/marketTypes'
import { type Product, type CustomerOrder } from '../../types/msTypes'
import { prepareCustomerOrdersAttributes } from './customerOrderAttributes'
import { getProject } from './getProject'
import { getStore } from './getStore'
import { preparePositions } from './preparePositions'
import { prepareStatusesForCustomerOrders } from './prepareStatusesForCustomerOrders'

dayjs.extend(customParseFormat)

const createMoment = (delivery: Delivery): string => {
	return dayjs(
		dayjs(dayjs(delivery.shipments[0].shipmentDate, 'DD-MM-YYYY'))
			.set('hour', 17)
			.set('minute', 0)
			.set('second', 0)
	).format('YYYY-MM-DD HH:mm:ss.SSS')
}

export const createCustomerOrder = (
	domain: string,
	order: Order,
	boughtProducts: Product[],
	type: string
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
		store: getStore(domain, type),
		project: getProject(domain, type),
		agent,
		attributes: prepareCustomerOrdersAttributes(boughtProducts, order),
		organization,
		state: prepareStatusesForCustomerOrders(order.status, order.substatus),
		printed: false,
		published: false,
		positions: preparePositions(boughtProducts, order.items, order.status),
		vatEnabled: true,
		vatIncluded: true,
		vatSum: 0.0,
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		deliveryPlannedMoment: order.delivery
			? createMoment(order.delivery)
			: dayjs(order.creationDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
		shipmentAddressFull: {
			postalCode: order?.delivery?.address?.postcode,
			country,
			city: order?.deliveryRegion?.name ?? '',
			street: order?.delivery?.address?.street,
			house: order?.delivery?.address?.house,
			apartment: order?.delivery?.address?.apartment,
		},
		salesChannel: salesChannels,
	}
}
