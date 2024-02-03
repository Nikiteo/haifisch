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

const prepareStore = (store?: Store): Store | undefined => {
	switch (store?.meta.href) {
		case fbyTopStore.meta.href:
			return fbyTopRefund
		case fbyHfStore.meta.href:
			return fbyHfRefund
		case fbsTopStore.meta.href:
			return fbsTopRefund
		case fbsHfStore.meta.href:
			return fbsHfRefund
		case fboOzonStore.meta.href:
			return fboOzonRefund
		case fbsOzonStore.meta.href:
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
