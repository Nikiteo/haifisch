import { states } from '../../database'
import { OrderStatusEnum } from '../../types/marketTypes'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const prepareSubstatuses = (substatus?: string) => {
	if (substatus === 'READY_TO_SHIP') {
		return states.READY_TO_SHIP
	}
	if (substatus === 'SHIPPED') {
		return states.PICKUP
	}
	return states.PROCESSING
}

export const prepareStatusesForCustomerOrders = (
	status?: OrderStatusEnum,
	substatus?: string
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
	switch (status) {
		case OrderStatusEnum.CANCELLED_IN_PROCESSING:
			return states.CANCELLED
		case OrderStatusEnum.CANCELLED_IN_DELIVERY:
		case OrderStatusEnum.REJECTED:
			return states.CANCELLED_IN_DELIVERY
		case OrderStatusEnum.DELIVERED:
			return states.DELIVERED
		case OrderStatusEnum.DELIVERY:
		case OrderStatusEnum.PICKUP:
			return states.DELIVERY
		case OrderStatusEnum.RESERVED:
		case OrderStatusEnum.PENDING:
		case OrderStatusEnum.UNPAID:
			return states.NEW
		case OrderStatusEnum.PROCESSING:
			return prepareSubstatuses(substatus)
		case OrderStatusEnum.PARTIALLY_RETURNED:
			return states.PARTIALLY_RETURNED
		case OrderStatusEnum.RETURNED:
			return states.RETURNED
		case OrderStatusEnum.LOST:
			return states.LOST
		default:
			return states.UNKNOWN
	}
}
