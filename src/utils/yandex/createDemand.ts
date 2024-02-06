import { consignee, ozonAgent, carrier } from '../../database'
import {
	type Attribute,
	type CustomerOrder,
	type Demand,
} from '../../types/msTypes'

export const createOverhadSum = (
	attributes: Attribute[],
	place?: string
): number => {
	if (
		attributes.filter(attribute => attribute.type === 'double').length === 0
	) {
		return 0
	}

	if (place === 'OZON') {
		return parseFloat(
			(
				parseFloat(
					parseFloat(
						// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-argument
						attributes?.find(
							attribute =>
								attribute.id ===
								'279ba9fa-9d67-11ee-0a80-09f500178da3'
						)?.value || 0
					).toFixed(2)
				) * 100
			).toFixed(2)
		)
	}

	const sumOfComissions = attributes
		.filter(attribute => attribute.type === 'double')
		.filter(
			attribute => attribute.id !== '2d77bca0-974b-11ee-0a80-146900276f3a'
		)
		.filter(
			attribute => attribute.id !== '279ba9fa-9d67-11ee-0a80-09f500178da3'
		)
		.map(attribute => attribute.value as number)
		.reduce(
			(acc: number, cur: number): number =>
				parseFloat((acc + cur).toFixed(2)),
			0
		)

	return parseFloat((sumOfComissions * 100).toFixed(2))
}

export const createDemand = (order: CustomerOrder, place?: string): Demand => {
	const {
		meta,
		id,
		accountId,
		applicable,
		attributes,
		owner,
		organizationAccount,
		deliveryPlannedMoment,
		externalCode,
		syncId,
		updated,
		state,
		sum,
		agentAccount,
		created,
		printed,
		published,
		reservedSum,
		payedSum,
		shippedSum,
		invoicedSum,
		...rest
	} = order

	return {
		...rest,
		customerOrder: {
			meta: order.meta,
		},
		overhead: {
			sum:
				order.attributes !== undefined
					? createOverhadSum(order.attributes, place)
					: 0,
			distribution: 'price',
		},
		consignee,
		carrier: place === 'OZON' ? ozonAgent : carrier,
		moment: order.deliveryPlannedMoment,
	}
}
