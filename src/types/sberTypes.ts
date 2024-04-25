export interface RequestOrders {
	meta: Meta
	data: RequestOrdersData
}

export interface RequestOrdersData {
	token: string
	shipments: string[]
}

export interface RequestShipments {
	data: RequestShipmentsData
	meta: Meta
}

export interface RequestShipmentsData {
	token: string
	dateFrom: string
	dateTo: string
	count: number
	statuses: string[]
}

export interface Shipments {
	success: number
	meta: Meta
	data: ShipmentsData
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Meta {}

export interface ShipmentsData {
	shipments: string[]
}

export interface Orders {
	success: number
	meta: Meta
	data: OrdersData
}

export interface OrdersData {
	shipments: Shipment[]
}

export interface Shipment {
	shipmentId: string
	orderCode: string
	status: SberStatuses
	confirmedTimeLimit: string
	packingTimeLimit: string
	shippingTimeLimit: string
	shipmentDateFrom: string
	shipmentDateTo: string
	reserveExpirationDate: string
	deliveryId: string
	shipmentDateShift: boolean
	shipmentIsChangeable: boolean
	customerFullName: string
	customerAddress: string
	shippingPoint: string
	creationDate: string
	deliveryDate: string
	deliveryDateFrom: string
	deliveryDateTo: string
	items: Item[]
	deliveryMethodId: string
	serviceScheme: string
	customer: any
	depositedAmount: number
}

export interface Item {
	itemIndex: string
	status: string
	subStatus: string
	price: number
	finalPrice: number
	discounts: Discount[]
	quantity: number
	offerId: string
	goodsId: string
	goodsData: GoodsData
	events: Event[]
	boxIndex: any
}

export interface Discount {
	discountType: string
	discountDescription: string
	discountAmount: number
	discountPriceAdjustments: number
}

export interface GoodsData {
	name: string
	categoryName: string
}

export interface Event {
	eventDate: string
	eventName: string
	eventValue: string
}

export enum SberStatuses {
	NEW = 'NEW',
	CONFIRMED = 'CONFIRMED',
	PACKED = 'PACKED',
	PACKING_EXPIRED = 'PACKING_EXPIRED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED',
	MERCHANT_CANCELED = 'MERCHANT_CANCELED',
	CUSTOMER_CANCELED = 'CUSTOMER_CANCELED',
}
