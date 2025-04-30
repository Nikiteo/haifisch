import { states } from '../../../database'
import { State } from '../../../types/ms-types'
import {
	OrderSubstatusType,
	OrderStatusType,
} from '../../../types/yandex/notification-types'

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
		case OrderStatusType.CANCELLED:
			return states.CANCELLED
		case OrderStatusType.DELIVERED:
			return states.DELIVERED
		case OrderStatusType.DELIVERY:
		case OrderStatusType.PICKUP:
			return states.DELIVERY
		case OrderStatusType.RESERVED:
		case OrderStatusType.PLACING:
		case OrderStatusType.PENDING:
		case OrderStatusType.UNPAID:
			return states.NEW
		case OrderStatusType.PROCESSING:
			return prepareSubstatuses(substatus)
		case OrderStatusType.PARTIALLY_RETURNED:
			return states.PARTIALLY_RETURNED
		case OrderStatusType.RETURNED:
			return states.RETURNED
		default:
			return states.UNKNOWN
	}
}
