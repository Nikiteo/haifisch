import {
	fbyTopRefund,
	fbyHfRefund,
	fbsTopRefund,
	fbsHfRefund,
	fboOzonRefund,
	fbsOzonRefund,
	fboOzonProject,
	fbsHfProject,
	fbsTopProject,
	fbyHfProject,
	fbyTopProject,
	fbosOzonProject,
} from '../../database'
import {
	type Demand,
	type SalesReturn,
	type Project,
} from '../../types/msTypes'

const prepareStore = (project?: Project): Project | undefined => {
	switch (project?.meta.href) {
		case fbyTopProject.meta.href:
			return fbyTopRefund
		case fbyHfProject.meta.href:
			return fbyHfRefund
		case fbsTopProject.meta.href:
			return fbsTopRefund
		case fbsHfProject.meta.href:
			return fbsHfRefund
		case fboOzonProject.meta.href:
			return fboOzonRefund
		case fbosOzonProject.meta.href:
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
		store: prepareStore(demand.project),
	}
}
