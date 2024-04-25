import { states } from '../../database'
import { type State } from '../../types/msTypes'
import { SberStatuses } from '../../types/sberTypes'

export const prepareStatuses = (status?: SberStatuses): State => {
	switch (status) {
		case SberStatuses.MERCHANT_CANCELED:
		case SberStatuses.CUSTOMER_CANCELED:
			return states.CANCELLED
		case SberStatuses.DELIVERED:
			return states.DELIVERED
		case SberStatuses.SHIPPED:
			return states.DELIVERY
		case SberStatuses.NEW:
			return states.NEW
		case SberStatuses.CONFIRMED:
		case SberStatuses.PACKED:
		case SberStatuses.PACKING_EXPIRED:
			return states.PROCESSING
		default:
			return states.UNKNOWN
	}
}
