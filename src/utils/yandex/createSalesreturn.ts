import {
	fbyTopStore,
	fbyTopRefund,
	fbyHfStore,
	fbyHfRefund,
	fbsTopStore,
	fbsTopRefund,
	fbsHfStore,
	fbsHfRefund,
	fboOzonStore,
	fboOzonRefund,
	fbsOzonStore,
	fbsOzonRefund,
} from '../../database'
import { type Store, type Demand, type SalesReturn } from '../../types/msTypes'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const prepareStore = (store?: Store) => {
	if (store?.meta.href === fbyTopStore.meta.href) {
		return fbyTopRefund
	}
	if (store?.meta.href === fbyHfStore.meta.href) {
		return fbyHfRefund
	}
	if (store?.meta.href === fbsTopStore.meta.href) {
		return fbsTopRefund
	}
	if (store?.meta.href === fbsHfStore.meta.href) {
		return fbsHfRefund
	}
	if (store?.meta.href === fboOzonStore.meta.href) {
		return fboOzonRefund
	}
	if (store?.meta.href === fbsOzonStore.meta.href) {
		return fbsOzonRefund
	}
}

export const createSalesReturn = (demand: Demand): SalesReturn => {
	const {
		meta,
		id,
		accountId,
		applicable,
		owner,
		externalCode,
		updated,
		sum,
		created,
		printed,
		published,
		payedSum,
		carrier,
		consignee,
		customerOrder,
		shipmentAddressFull,
		overhead,
		payments,
		...rest
	} = demand

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return {
		...rest,
		demand: {
			meta: demand.meta,
		},
		store: prepareStore(demand.store),
	}
}
