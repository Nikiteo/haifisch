import { states } from '../../database'
import { OrderStatusEnum } from '../../types/ozonTypes'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const prepareOzonStatuses = (status: OrderStatusEnum) => {
	switch (status) {
		case OrderStatusEnum.cancelled:
			return states.CANCELLED
		case OrderStatusEnum.awaiting_deliver:
			return states.READY_TO_SHIP
		case OrderStatusEnum.delivering:
			return states.DELIVERY
		case OrderStatusEnum.delivered:
			return states.DELIVERED
		case OrderStatusEnum.awaiting_packaging:
			return states.PROCESSING
		case OrderStatusEnum.returned:
			return states.RETURNED
		default:
			return states.UNKNOWN
	}
}
