import { type Order } from '../../types/marketTypes'
import { type Product, type Attribute } from '../../types/msTypes'

const createBidFee = (bidFees?: number[]): number => {
	return bidFees !== undefined
		? bidFees.reduce(
				(acc, cur) =>
					parseFloat(
						(parseFloat((acc + cur).toFixed(2)) / 100).toFixed(2)
					),
				0
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  )
		: 0
}

export const prepareCustomerOrdersAttributes = (
	products: Product[],
	order: Order
): Attribute[] => {
	return order.commissions !== undefined && order.commissions.length > 0
		? [
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/ee32b906-95a7-11ee-0a80-107d000a1171',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: 'ee32b906-95a7-11ee-0a80-107d000a1171',
					name: 'Размещение товаров на витрине',
					type: 'double',
					value:
						order.commissions.find(
							commissions => commissions.type === 'FEE'
						)?.actual ?? 0,
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/ee32bc6d-95a7-11ee-0a80-107d000a1173',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: 'ee32bc6d-95a7-11ee-0a80-107d000a1173',
					name: 'Приём платежа покупателя',
					type: 'double',
					value:
						order.commissions.find(
							commissions => commissions.type === 'AGENCY'
						)?.actual ?? 0,
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/f719cd6f-95ad-11ee-0a80-0179000b864b',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: 'f719cd6f-95ad-11ee-0a80-0179000b864b',
					name: 'Перевод платежа покупателя',
					type: 'double',
					value:
						order.commissions.find(
							commissions =>
								commissions.type === 'PAYMENT_TRANSFER'
						)?.actual ?? 0,
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/ee32bb61-95a7-11ee-0a80-107d000a1172',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: 'ee32bb61-95a7-11ee-0a80-107d000a1172',
					name: 'Участие в программе лояльности',
					type: 'double',
					value:
						order.commissions.find(
							commissions =>
								commissions.type === 'LOYALTY_PARTICIPATION_FEE'
						)?.actual ?? 0,
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/ee32bd45-95a7-11ee-0a80-107d000a1174',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: 'ee32bd45-95a7-11ee-0a80-107d000a1174',
					name: 'Буст продаж',
					type: 'double',
					value:
						order.commissions.find(
							commissions =>
								commissions.type === 'AUCTION_PROMOTION'
						)?.actual ?? 0,
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/ee32c117-95a7-11ee-0a80-107d000a1175',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: 'ee32c117-95a7-11ee-0a80-107d000a1175',
					name: 'Доставка покупателю',
					type: 'double',
					value:
						order.commissions.find(
							commissions =>
								commissions.type === 'DELIVERY_TO_CUSTOMER'
						)?.actual ?? 0,
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/4136c718-95a8-11ee-0a80-0834000a4aba',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '4136c718-95a8-11ee-0a80-0834000a4aba',
					name: 'Обработка заказа FBS',
					type: 'double',
					value:
						order.commissions.find(
							commissions => commissions.type === 'SORTING'
						)?.actual ?? 0,
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/3cd85d68-95ab-11ee-0a80-11fb000af56e',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '3cd85d68-95ab-11ee-0a80-11fb000af56e',
					name: 'Обработка заказа FBY',
					type: 'double',
					value:
						order.commissions.find(
							commissions => commissions.type === 'FULFILLMENT'
						)?.actual ?? 0,
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/66dd48c7-95a8-11ee-0a80-0e9e0009fc78',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '66dd48c7-95a8-11ee-0a80-0e9e0009fc78',
					name: 'Хранение невыкупов и возвратов',
					type: 'double',
					value:
						order.commissions.find(
							commissions =>
								commissions.type === 'RETURNED_ORDERS_STORAGE'
						)?.actual ?? 0,
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/54623519-968d-11ee-0a80-04d8001e7e59',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '54623519-968d-11ee-0a80-04d8001e7e59',
					name: 'Предоплачен',
					type: 'boolean',
					value: order.paymentType === 'PREPAID',
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/546237cb-968d-11ee-0a80-04d8001e7e5a',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '546237cb-968d-11ee-0a80-04d8001e7e5a',
					name: 'Тип покупателя',
					type: 'string',
					value:
						order.buyerType === 'PERSON'
							? 'Физическое лицо'
							: 'Юридическое лицо',
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/2d77bca0-974b-11ee-0a80-146900276f3a',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '2d77bca0-974b-11ee-0a80-146900276f3a',
					name: 'Ставка буста',
					type: 'double',
					value: createBidFee(
						order?.items?.map(item => item.bidFee ?? 0)
					),
				},
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  ]
		: [
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/54623519-968d-11ee-0a80-04d8001e7e59',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '54623519-968d-11ee-0a80-04d8001e7e59',
					name: 'Предоплачен',
					type: 'boolean',
					value: order.paymentType === 'PREPAID',
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/546237cb-968d-11ee-0a80-04d8001e7e5a',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '546237cb-968d-11ee-0a80-04d8001e7e5a',
					name: 'Тип покупателя',
					type: 'string',
					value:
						order.buyerType === 'PERSON'
							? 'Физическое лицо'
							: 'Юридическое лицо',
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/2d77bca0-974b-11ee-0a80-146900276f3a',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '2d77bca0-974b-11ee-0a80-146900276f3a',
					name: 'Ставка буста',
					type: 'double',
					value: createBidFee(
						order?.items?.map(item => item.bidFee ?? 0)
					),
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/85c662bb-9fcb-11ee-0a80-03c00003edfc',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '85c662bb-9fcb-11ee-0a80-03c00003edfc',
					name: 'SKU заказа',
					type: 'text',
					value: order.items
						?.map(item => `${item.shopSku} - ${item.count}`)
						.join('\n'),
				},
				{
					meta: {
						href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/14538b65-b36f-11ee-0a80-02a00031fa90',
						type: 'attributemetadata',
						mediaType: 'application/json',
					},
					id: '14538b65-b36f-11ee-0a80-02a00031fa90',
					name: 'Цвет',
					type: 'text',
					value: products
						.filter(product =>
							order.items?.some(
								item => product.article === item.shopSku
							)
						)
						.map(prod => `${prod.name.split(' ').at(-1)}`)
						.join('\n'),
				},
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  ]
}
