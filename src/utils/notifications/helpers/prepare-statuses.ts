import { states } from '../../../database'
import { State } from '../../../types/ms-types'
import { OrderStatusType, OrderSubstatusType } from '../../../types/yandex/api'

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
