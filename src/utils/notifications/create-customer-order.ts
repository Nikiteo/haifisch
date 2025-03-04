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
} from '../../database'
import { type Product, type CustomerOrder } from '../../types/ms-types'
import { OrderDTO } from '../../types/yandex/api'
import {
	prepareCustomerOrdersAttributes,
	prepareStatusesForCustomerOrders,
	preparePositions,
	createMoment,
} from './helpers'

dayjs.extend(customParseFormat)

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
