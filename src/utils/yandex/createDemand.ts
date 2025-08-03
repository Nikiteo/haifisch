import { carrier, consignee, ozonAgent, sberAgent } from '../../database'
import { Attribute, CustomerOrder, Demand, Meta } from '../../types/ms-types'

export const createOverhadSum = (
	attributes: Attribute[],
	place?: string
): number => {
	if (!attributes.some(attribute => attribute.type === 'double')) {
		return 0
	}

	if (place === 'OZON') {
		const ozonValue =
			attributes.find(
				attribute =>
					attribute.id === '279ba9fa-9d67-11ee-0a80-09f500178da3'
			)?.value || 0
		return parseFloat((ozonValue * 100).toFixed(2))
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

const createCarrier = (place?: string): { meta: Meta } => {
	switch (place) {
		case 'OZON':
			return ozonAgent
		case 'SBER':
			return sberAgent
		default:
			return carrier
	}
}

export const createDemand = (order: CustomerOrder, place?: string): Demand => {
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

	const overheadSum = attributes ? createOverhadSum(attributes, place) : 0

	const additionalAttribute =
		place === 'OZON' &&
		attributes?.find(
			attribute => attribute.id === 'cd289eaa-eacf-11ef-0a80-016f000e54c2'
		)
	const newAttribute = additionalAttribute
		? {
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/demand/metadata/attributes/807c3874-9100-11ef-0a80-0de10004c634',
					type: 'attributemetadata',
					mediaType: 'application/json',
				},
				id: '807c3874-9100-11ef-0a80-0de10004c634',
				name: 'Дата получения возврата',
				type: 'string',
				value: additionalAttribute.value,
			}
		: undefined

	return {
		...rest,
		customerOrder: {
			meta: order.meta,
		},
		overhead: {
			sum: overheadSum,
			distribution: 'price',
		},
		attributes: newAttribute ? [newAttribute] : [],
		consignee,
		carrier: createCarrier(place),
		moment: deliveryPlannedMoment,
	}
}
