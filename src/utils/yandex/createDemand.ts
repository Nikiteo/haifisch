import { consignee, ozonAgent, carrier, sberAgent } from '../../database'
import {
	type Meta,
	type Attribute,
	type CustomerOrder,
	type Demand,
} from '../../types/msTypes'

export const createOverhadSum = (
	attributes?: Attribute[],
	place?: string
): number => {
	const doubleAttributes = attributes?.filter(
		attribute => attribute.type === 'double'
	)

	if (doubleAttributes?.length === 0) {
		return 0
	}

	if (place === 'OZON') {
		const ozonValue =
			doubleAttributes?.find(
				attribute =>
					attribute.id === '279ba9fa-9d67-11ee-0a80-09f500178da3'
			)?.value || 0
		return parseFloat((parseFloat(ozonValue as string) * 100).toFixed(2))
	}

	const sumOfCommissions = doubleAttributes
		?.filter(
			attribute =>
				![
					'2d77bca0-974b-11ee-0a80-146900276f3a',
					'279ba9fa-9d67-11ee-0a80-09f500178da3',
				].includes(attribute.id ?? '')
		)
		.reduce(
			(acc, attribute) =>
				acc +
				(typeof attribute.value === 'number' ? attribute.value : 0),
			0
		)

	return parseFloat((sumOfCommissions ?? 0 * 100).toFixed(2))
}

const createCarrier = (place?: string): { meta: Meta } => {
	const carriers = {
		OZON: ozonAgent,
		SBER: sberAgent,
	}

	return carriers[place as keyof typeof carriers] || carrier
}

export const createDemand = (order: CustomerOrder, place?: string): Demand => {
	const { meta, attributes, deliveryPlannedMoment, id, state, ...rest } = order

	return {
		...rest,
		customerOrder: {
			meta: order.meta,
		},
		overhead: {
			sum: createOverhadSum(order.attributes, place),
			distribution: 'price',
		},
		consignee,
		carrier: createCarrier(place),
		moment: deliveryPlannedMoment,
		attributes:
			place === 'OZON'
				? [
						{
							meta: {
								href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/cd289eaa-eacf-11ef-0a80-016f000e54c2',
								type: 'attributemetadata',
								mediaType: 'application/json',
							},
							id: 'cd289eaa-eacf-11ef-0a80-016f000e54c2',
							name: 'Дата получения возврата',
							type: 'string',
							value: order.attributes?.find(
								attribute =>
									attribute.id ===
									'c09d1b3e-90ff-11ef-0a80-0efd00046bc2'
							)?.value,
						},
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  ]
				: [],
	}
}
