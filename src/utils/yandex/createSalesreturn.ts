import {
	fboOzonProject,
	fboOzonRefund,
	fbosOzonProject,
	fbsHfProject,
	fbsHfRefund,
	fbsTopProject,
	fbsTopRefund,
	fbyHfProject,
	fbyHfRefund,
	fbyTopProject,
	fbyTopRefund,
	sourceStore,
} from '../../database'
import {
	type Demand,
	type Project,
	type SalesReturn,
} from '../../types/ms-types'

const projectRefundMap: Record<string, any> = {
	[fbyTopProject.meta.href]: fbyTopRefund,
	[fbyHfProject.meta.href]: fbyHfRefund,
	[fbsTopProject.meta.href]: fbsTopRefund,
	[fbsHfProject.meta.href]: fbsHfRefund,
	[fboOzonProject.meta.href]: fboOzonRefund,
	[fbosOzonProject.meta.href]: sourceStore,
}

const prepareStore = (project?: Project): Project | undefined => {
	if (!project?.meta?.href) {
		return undefined
	}
	return projectRefundMap[project.meta.href]
}

export const createSalesReturn = (
	demand: Demand,
	place?: string
): SalesReturn => {
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

	const moment =
		place === 'OZON'
			? (demand.attributes?.find(
					attribute =>
						attribute.id === '807c3874-9100-11ef-0a80-0de10004c634'
				)?.value ?? demand.moment)
			: demand.moment
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return {
		...rest,
		demand: {
			meta: demand.meta,
		},
		attributes: [],
		moment,
		store: prepareStore(demand.project),
	}
}
