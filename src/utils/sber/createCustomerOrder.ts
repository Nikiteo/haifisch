import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import {
	group,
	currency,
	sberAgent,
	organization,
	sberProject,
	sberSalesChannel,
	fbsStore,
} from '../../database'
import { type Shipment } from '../../types/sberTypes'
import { type Product, type CustomerOrder } from '../../types/msTypes'
import { prepareStatuses } from './prepareStatuses'
import { prepareCustomerOrdersAttributes } from './prepareCustomerOrdersAttibutes'
import { preparePositions } from './preparePositions'

dayjs.extend(customParseFormat)

export const createCustomerOrder = (
	order: Shipment,
	boughtProducts: Product[]
): CustomerOrder => {
	return {
		shared: true,
		group,
		name: order.shipmentId?.toString(),
		moment: dayjs(order.creationDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
		applicable: true,
		rate: {
			currency,
		},
		store: fbsStore,
		project: sberProject,
		agent: sberAgent,
		attributes: prepareCustomerOrdersAttributes(boughtProducts, order),
		organization,
		state: prepareStatuses(order.status),
		printed: false,
		published: false,
		positions: preparePositions(boughtProducts, order.items, order.status),
		vatEnabled: true,
		vatIncluded: true,
		vatSum: 0.0,
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		deliveryPlannedMoment: dayjs(order.shipmentDateFrom).format(
			'YYYY-MM-DD HH:mm:ss.SSS'
		),
		shipmentAddressFull: {
			addInfo: order.customerAddress,
		},
		salesChannel: sberSalesChannel,
	}
}
