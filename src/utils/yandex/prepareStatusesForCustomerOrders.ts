import { states } from '../../database'
import { type State } from '../../types/msTypes'
import {
	OrderStatsStatusType,
	type OrderSubstatusType,
} from '../../types/yandex/api'

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
	status?: OrderStatsStatusType,
	substatus?: OrderSubstatusType
): State => {
	switch (status) {
		case OrderStatsStatusType.CancelledBeforeProcessing:
		case OrderStatsStatusType.CancelledInProcessing:
			return states.CANCELLED
		case OrderStatsStatusType.CancelledInDelivery:
			return states.CANCELLED_IN_DELIVERY
		case OrderStatsStatusType.Delivered:
			return states.DELIVERED
		case OrderStatsStatusType.Delivery:
		case OrderStatsStatusType.Pickup:
			return states.DELIVERY
		case OrderStatsStatusType.Reserved:
		case OrderStatsStatusType.Pending:
		case OrderStatsStatusType.Unpaid:
			return states.NEW
		case OrderStatsStatusType.Processing:
			return prepareSubstatuses(substatus)
		case OrderStatsStatusType.PartiallyReturned:
			return states.PARTIALLY_RETURNED
		case OrderStatsStatusType.Returned:
			return states.RETURNED
		case OrderStatsStatusType.Lost:
			return states.LOST
		default:
			return states.UNKNOWN
	}
}
