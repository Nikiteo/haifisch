import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import {
	agent,
	country,
	currency,
	fbsHfProject,
	fbsStore,
	fbsTopProject,
	group,
	organization,
	salesChannels,
} from '../../database'
import { type CustomerOrder, type Product } from '../../types/ms-types'
import { OrderDTO } from '../../types/yandex/api'
import {
	createMoment,
	prepareCustomerOrdersAttributes,
	preparePositions,
	prepareStatusesForCustomerOrders,
} from './helpers'

dayjs.extend(customParseFormat)

export const createCustomerOrder = (
	store: string,
	order: OrderDTO,
	date: string,
	boughtProducts?: Product[]
): CustomerOrder => {
	return {
		shared: true,
		group,
		name: order.id?.toString(),
		moment: dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS'),
		applicable: true,
		rate: {
			currency,
		},
		store: fbsStore,
		project: store === 'Haifisch' ? fbsHfProject : fbsTopProject,
		agent,
		attributes: prepareCustomerOrdersAttributes(order, boughtProducts),
		organization,
		//@ts-ignore
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
