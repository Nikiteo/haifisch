import { states } from '../../database'
import { OrderFbsOzonStatus } from '../../types/ozonTypes'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const refundCheck = (after?: boolean) => {
	if (after !== undefined && after) {
		return states.RETURNED
	}
	return states.CANCELLED
}

export const prepareOzonFbsStatuses = (
	status: OrderFbsOzonStatus,
	refund?: boolean
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
	switch (status) {
		case OrderFbsOzonStatus.cancelled:
		case OrderFbsOzonStatus.cancelled_from_split_pending:
			return refundCheck(refund)
		case OrderFbsOzonStatus.awaiting_deliver:
			return states.READY_TO_SHIP
		case OrderFbsOzonStatus.delivering:
		case OrderFbsOzonStatus.driver_pickup:
			return states.DELIVERY
		case OrderFbsOzonStatus.delivered:
			return states.DELIVERED
		case OrderFbsOzonStatus.awaiting_packaging:
			return states.PROCESSING
		case OrderFbsOzonStatus.awaiting_approve:
		case OrderFbsOzonStatus.awaiting_registration:
			return states.NEW
		case OrderFbsOzonStatus.returned:
			return states.RETURNED
		default:
			return states.UNKNOWN
	}
}
