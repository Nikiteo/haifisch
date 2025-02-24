import { type Product, type Attribute } from '../../types/ms-types'
import {
	type OrdersStatsOrderDTO,
	type EnrichedOrdersStatsOrderDTO,
	type OrdersStatsCommissionDTO,
} from '../../types/yandex/api'

const createBidFee = (bidFees?: number[]): number => {
	return bidFees
		? bidFees.reduce(
				(acc, cur) => parseFloat(((acc + cur) / 100).toFixed(2)),
				0
				// eslint-disable-next-line no-mixed-spaces-and-tabs
			)
		: 0
}

const createAttribute = (
	id: string,
	name: string,
	type: string,
	value: any
): Attribute => ({
	meta: {
		href: `https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/${id}`,
		type: 'attributemetadata',
		mediaType: 'application/json',
	},
	id,
	name,
	type,
	value,
})

const getCommissionValue = (
	commissions: OrdersStatsCommissionDTO[],
	type: string
): number => {
	return commissions.find(comm => comm.type === type)?.actual ?? 0
}

export const prepareCustomerOrdersAttributes = (
	products: Product[],
	order: EnrichedOrdersStatsOrderDTO | OrdersStatsOrderDTO
): Attribute[] => {
	const attributes: Attribute[] = []

	if (order.commissions && order.commissions.length > 0) {
		const commissionTypes = [
			{
				id: 'ee32b906-95a7-11ee-0a80-107d000a1171',
				name: 'Размещение товаров на витрине',
				type: 'FEE',
			},
			{
				id: 'ee32bc6d-95a7-11ee-0a80-107d000a1173',
				name: 'Приём платежа покупателя',
				type: 'AGENCY',
			},
			{
				id: 'f719cd6f-95ad-11ee-0a80-0179000b864b',
				name: 'Перевод платежа покупателя',
				type: 'PAYMENT_TRANSFER',
			},
			{
				id: 'ee32bb61-95a7-11ee-0a80-107d000a1172',
				name: 'Участие в программе лояльности',
				type: 'LOYALTY_PARTICIPATION_FEE',
			},
			{
				id: 'ee32bd45-95a7-11ee-0a80-107d000a1174',
				name: 'Буст продаж',
				type: 'AUCTION_PROMOTION',
			},
			{
				id: 'ee32c117-95a7-11ee-0a80-107d000a1175',
				name: 'Доставка покупателю',
				type: 'DELIVERY_TO_CUSTOMER',
			},
			{
				id: '4136c718-95a8-11ee-0a80-0834000a4aba',
				name: 'Обработка заказа FBS',
				type: 'SORTING',
			},
			{
				id: '3cd85d68-95ab-11ee-0a80-11fb000af56e',
				name: 'Обработка заказа FBY',
				type: 'FULFILLMENT',
			},
			{
				id: '66dd48c7-95a8-11ee-0a80-0e9e0009fc78',
				name: 'Хранение невыкупов и возвратов',
				type: 'RETURNED_ORDERS_STORAGE',
			},
		]

		commissionTypes.forEach(({ id, name, type }) => {
			attributes.push(
				createAttribute(
					id,
					name,
					'double',
					getCommissionValue(order.commissions, type)
				)
			)
		})
	}

	attributes.push(
		createAttribute(
			'54623519-968d-11ee-0a80-04d8001e7e59',
			'Предоплачен',
			'boolean',
			order.paymentType === 'PREPAID'
		),
		createAttribute(
			'2d77bca0-974b-11ee-0a80-146900276f3a',
			'Ставка буста',
			'double',
			createBidFee(
				order.items
					?.map(item => item.bidFee)
					.filter((fee): fee is number => fee !== undefined)
			)
		)
	)

	if (!order.commissions || order.commissions.length === 0) {
		attributes.push(
			createAttribute(
				'85c662bb-9fcb-11ee-0a80-03c00003edfc',
				'SKU заказа',
				'text',
				order.items
					?.map(item => `${item.shopSku} - ${item.count}`)
					.join('\n')
			),
			createAttribute(
				'14538b65-b36f-11ee-0a80-02a00031fa90',
				'Цвет',
				'text',
				products
					.filter(product =>
						order.items?.some(
							item => product.article === item.shopSku
						)
					)
					.map(prod => `${prod.name.split(' ').at(-1)}`)
					.join('\n')
			)
		)
	}

	return attributes
}
