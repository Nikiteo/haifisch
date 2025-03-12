import { consignee, carrier } from '../../database'
import { Attribute, CustomerOrder, Demand } from '../../types/ms-types'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export const createOverhadSum = (attributes: Attribute[]): number => {
	if (!attributes.some(attribute => attribute.type === 'double')) {
		return 0
	}

	const sumOfCommissions = attributes
		.filter(
			attribute =>
				attribute.type === 'double' &&
				attribute.id !== '2d77bca0-974b-11ee-0a80-146900276f3a' &&
				attribute.id !== '279ba9fa-9d67-11ee-0a80-09f500178da3'
		)
		.reduce((acc, attribute) => acc + (attribute.value as number), 0)

	return parseFloat((sumOfCommissions * 100).toFixed(2))
}

export const createNewDemand = (order: CustomerOrder, date: string): Demand => {
	const {
		meta,
		attributes,
		deliveryPlannedMoment,
		id,
		accountId,
		demands,
		description,
		state,
		...rest
	} = order

	const overheadSum = attributes ? createOverhadSum(attributes) : 0

	return {
		...rest,
		customerOrder: {
			meta: order.meta,
		},
		overhead: {
			sum: overheadSum,
			distribution: 'price',
		},
		consignee,
		carrier: carrier,
		moment: dayjs(date).format(
			'YYYY-MM-DD HH:mm:ss.SSS'
		),
	}
}
