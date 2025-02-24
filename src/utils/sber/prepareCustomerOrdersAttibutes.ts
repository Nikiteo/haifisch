import { type Product, type Attribute } from '../../types/ms-types'
import { type Shipment } from '../../types/sber-types'

export const prepareCustomerOrdersAttributes = (
	products: Product[],
	order: Shipment
): Attribute[] => {
	return [
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
				?.map(item => `${item.offerId} - ${item.quantity}`)
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
					order.items?.some(item => product.article === item.offerId)
				)
				.map(prod => `${prod.name.split(' ').at(-1)}`)
				.join('\n'),
		},
		// eslint-disable-next-line no-mixed-spaces-and-tabs
	]
}
