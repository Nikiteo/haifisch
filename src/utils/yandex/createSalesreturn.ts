import {
	fbyTopRefund,
	fbyHfRefund,
	fbsTopRefund,
	fbsHfRefund,
	fboOzonRefund,
	fboOzonProject,
	fbsHfProject,
	fbsTopProject,
	fbyHfProject,
	fbyTopProject,
	fbosOzonProject,
	sourceStore,
} from '../../database'
import {
	type Demand,
	type SalesReturn,
	type Project,
} from '../../types/msTypes'

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
			? demand.attributes?.find(
					attribute =>
						attribute.id === 'cd289eaa-eacf-11ef-0a80-016f000e54c2'
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  )?.value ?? demand.moment
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
