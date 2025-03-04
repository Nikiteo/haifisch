import { Attribute, Product } from '../../../types/ms-types'
import { OrderDTO } from '../../../types/yandex/api'

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

export const prepareCustomerOrdersAttributes = (
	order: OrderDTO,
	products?: Product[]
): Attribute[] => {
	const attributes: Attribute[] = []

	attributes.push(
		createAttribute(
			'54623519-968d-11ee-0a80-04d8001e7e59',
			'Предоплачен',
			'boolean',
			order.paymentType === 'PREPAID'
		),
		createAttribute(
			'85c662bb-9fcb-11ee-0a80-03c00003edfc',
			'SKU заказа',
			'text',
			order.items
				?.map(item => `${item.offerId} - ${item.count}`)
				.join('\n')
		),
		createAttribute(
			'14538b65-b36f-11ee-0a80-02a00031fa90',
			'Цвет',
			'text',
			products
				?.filter(product =>
					order.items?.some(item => product.article === item.shopSku)
				)
				.map(prod => `${prod.name.split(' ').at(-1)}`)
				.join('\n')
		)
	)

	return attributes
}
