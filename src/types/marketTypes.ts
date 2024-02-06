export interface ErrorResponse {
	status: number
	response: Response
}

export interface OrderResponse {
	status: string
	result: OrdersResult
}

export interface OrdersResult {
	paging: Paging
	orders: Order[]
}

export type AddedOrder = Order & Pick<NewOrder, 'delivery' | 'substatus'>

export interface CampaignResponse {
	campaigns: Campaign[]
	pager: Pager
}

export interface Campaign {
	domain: string
	id: number
	clientId: number
	business: Business
	placementType: string
}

export interface Business {
	id: number
	name: string
}

export interface Pager {
	total: number
	from: number
	to: number
	currentPage: number
	pagesCount: number
	pageSize: number
}

export interface OrdersResponse {
	pager: Pager
	orders: Order[]
}

// eslint-disable-next-line no-shadow
export enum OrderStatusEnum {
	CANCELLED_BEFORE_PROCESSING = 'CANCELLED_BEFORE_PROCESSING',
	CANCELLED_IN_DELIVERY = 'CANCELLED_IN_DELIVERY',
	CANCELLED_IN_PROCESSING = 'CANCELLED_IN_PROCESSING',
	DELIVERY = 'DELIVERY',
	DELIVERED = 'DELIVERED',
	PARTIALLY_DELIVERED = 'PARTIALLY_DELIVERED',
	PARTIALLY_RETURNED = 'PARTIALLY_RETURNED',
	PENDING = 'PENDING',
	PICKUP = 'PICKUP',
	PROCESSING = 'PROCESSING',
	RESERVED = 'RESERVED',
	RETURNED = 'RETURNED',
	REJECTED = 'REJECTED',
	UNKNOWN = 'UNKNOWN',
	UNPAID = 'UNPAID',
	LOST = 'LOST',
}

export interface Order {
	id?: number
	creationDate?: string
	statusUpdateDate?: string
	status?: OrderStatusEnum
	partnerOrderId?: string
	paymentType?: string
	fake?: boolean
	deliveryRegion?: DeliveryRegion
	items?: Item[]
	payments?: Payment[]
	commissions?: Commission[]
	buyerType?: string
	delivery?: Delivery
	substatus?: string
}

export interface DeliveryRegion {
	id: number
	name: string
}

export interface Item {
	offerName: string
	marketSku: number
	shopSku: string
	count: number
	prices: Price[]
	warehouse: Warehouse
	details: Detail[]
	cisList: unknown[]
	bidFee?: number
	cofinanceThreshold?: number
}

export interface Price {
	type: string
	costPerItem: number
	total: number
}

export interface Warehouse {
	id: number
	name: string
}

export interface Detail {
	itemStatus: string
	itemCount: number
}

export interface Payment {
	id: string
	date: string
	type: string
	total: number
	source?: string
	paymentOrder?: PaymentOrder
}

export interface PaymentOrder {
	id: string
	date: string
}

export interface Commission {
	type: string
	actual: number
}

export interface OfferResponse {
	status: string
	result: Result
}

export interface Result {
	paging: Paging
	offerMappings: OfferMapping[]
}

export interface Paging {
	nextPageToken: string
	prevPageToken: string
}

export interface OfferMapping {
	offer: Offer
	mapping: Mapping
}

export interface Offer {
	offerId: string
	name: string
	category: string
	pictures: string[]
	videos: string[]
	vendor: string
	barcodes: number[]
	description: string
	manufacturerCountries: string[]
	weightDimensions: WeightDimensions
	vendorCode: string
	tags: string[]
	shelfLife: ShelfLife
	lifeTime: LifeTime
	guaranteePeriod: GuaranteePeriod
	customsCommodityCode: number
	certificates: string[]
	boxCount: number
	condition: Condition
	type: string
	downloadable: boolean
	adult: boolean
	age: Age
	params: Param[]
	basicPrice: BasicPrice
	purchasePrice: PurchasePrice
	additionalExpenses: AdditionalExpenses
	cofinancePrice: CofinancePrice
	cardStatus: string
	campaigns: OfferCampaign[]
	sellingPrograms: SellingProgram[]
	archived: boolean
}

export interface WeightDimensions {
	length: number
	width: number
	height: number
	weight: number
}

export interface ShelfLife {
	timePeriod: number
	timeUnit: string
	comment: string
}

export interface LifeTime {
	timePeriod: number
	timeUnit: string
	comment: string
}

export interface GuaranteePeriod {
	timePeriod: number
	timeUnit: string
	comment: string
}

export interface Condition {
	type: string
	quality: string
	reason: string
}

export interface Age {
	value: number
	ageUnit: string
}

export interface Param {
	name: string
	value: string
}

export interface BasicPrice {
	value: number
	currencyId: string
	discountBase: number
	updatedAt: string
}

export interface PurchasePrice {
	value: number
	currencyId: string
	updatedAt: string
}

export interface AdditionalExpenses {
	value: number
	currencyId: string
	updatedAt: string
}

export interface CofinancePrice {
	value: number
	currencyId: string
	updatedAt: string
}

export interface OfferCampaign {
	campaignId: number
	status: string
}

export interface SellingProgram {
	sellingProgram: string
	status: string
}

export interface Mapping {
	marketSku: number
	marketSkuName: string
	marketModelId: number
	marketModelName: string
	marketCategoryId: number
	marketCategoryName: string
}

export interface StoresResponse {
	paging: Paging
	warehouses: Warehouse1[]
}

export interface Warehouse1 {
	warehouseId: number
	offers: OfferStores[]
}

export interface OfferStores {
	offerId: string
	turnoverSummary: TurnoverSummary
	stocks: Stock[]
	updatedAt: string
}

export interface TurnoverSummary {
	turnover: string
	turnoverDays: number
}

export interface Stock {
	type: string
	count: number
}

export interface NewOrderResponse {
	pager: Pager
	orders: NewOrder[]
}

export interface NewOrder {
	id: number
	status: string
	substatus: string
	creationDate: string
	currency: string
	itemsTotal: number
	total: number
	deliveryTotal: number
	subsidyTotal: number
	totalWithSubsidy: number
	buyerItemsTotal: number
	buyerTotal: number
	buyerItemsTotalBeforeDiscount: number
	buyerTotalBeforeDiscount: number
	paymentType: string
	paymentMethod: string
	fake: boolean
	items: Item[]
	subsidies: Subsidy[]
	delivery: Delivery
	buyer: Buyer
	notes: string
	taxSystem: string
	cancelRequested: boolean
	expiryDate: string
}

export interface Subsidy {
	type: string
	amount: number
}

export interface Delivery {
	id: string
	type: string
	serviceName: string
	price: number
	deliveryPartnerType: string
	courier: Courier
	dates: Dates
	region: Region
	address: Address
	vat: string
	deliveryServiceId: number
	liftType: string
	liftPrice: number
	outletCode: string
	outletStorageLimitDate: string
	dispatchType: string
	tracks: Track[]
	shipments: Shipment[]
	estimated: boolean
	eacType: string
	eacCode: string
}

export interface Buyer {
	id: string
	lastName: string
	firstName: string
	middleName: string
	phone: string
	email: string
	type: string
}

export interface Courier {
	fullName: string
	phone: string
	phoneExtension: string
	vehicleNumber: string
	vehicleDescription: string
}

export interface Dates {
	fromDate: string
	toDate: string
	fromTime: string
	toTime: string
	realDeliveryDate: string
}

export interface Region {
	id: number
	name: string
	type: string
	parent: Parent
	children: unknown[]
}

export interface Parent {
	id: number
	name: string
	type: string
	children: unknown[]
}

export interface Address {
	country: string
	postcode: string
	city: string
	district: string
	subway: string
	street: string
	house: string
	block: string
	entrance: string
	entryphone: string
	floor: string
	apartment: string
	phone: string
	recipient: string
	gps: Gps
}

export interface Gps {
	latitude: number
	longitude: number
}

export interface Track {
	trackCode: string
	deliveryServiceId: number
}

export interface Shipment {
	id: number
	status: string
	shipmentDate: string
	shipmentTime: string
	tracks: Track[]
	boxes: Box[]
}

export interface Box {
	id: number
	fulfilmentId: string
}
