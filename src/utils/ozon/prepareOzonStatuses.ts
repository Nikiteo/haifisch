import { states } from '../../database'
import { type State } from '../../types/msTypes'
import { OrderStatusEnum } from '../../types/ozon/types'

export const prepareOzonStatuses = (status?: string): State => {
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
