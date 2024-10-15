export interface ApiResponseOzon<T> {
	data: T
	limit: string
}

export interface ErrorResponse {
	code: number
	details: Detail[]
	message: string
}

export interface Detail {
	typeUrl: string
	value: string
}

export interface OfferResponseOzon {
	result: Result
}

export interface OffersOzonRequest {
	offer_id: Array<Item['offer_id']>
}

export interface OffersAttributesOzonRequest {
	filter: {
		offer_id: Array<Item['offer_id']>
	}
	limit: number
}

export interface Result {
	items: Item[]
}

export interface Item {
	id: number
	name: string
	offer_id: string
	barcode: string
	barcodes?: string[]
	buybox_price: string
	category_id: number
	created_at: string
	images: unknown[]
	currency_code?: string
	marketing_price: string
	min_price: string
	old_price: string
	premium_price: string
	price: string
	recommended_price: string
	sources: Source[]
	has_discounted_item?: boolean
	is_discounted?: boolean
	discounted_stocks?: DiscountedStocks
	state: string
	stocks: Stocks
	errors: unknown[]
	updated_at: string
	vat: string
	visible: boolean
	visibility_details: VisibilityDetails
	price_indexes?: PriceIndexes
	images360: unknown[]
	is_kgt: boolean
	color_image: string
	primary_image: string
	status: Status
	price_index?: string
	sku: number
}

export interface Source {
	is_enabled: boolean
	sku: number
	source: string
}

export interface DiscountedStocks {
	coming: number
	present: number
	reserved: number
}

export interface Stocks {
	coming: number
	present: number
	reserved: number
}

export interface VisibilityDetails {
	has_price: boolean
	has_stock: boolean
	active_product: boolean
	reasons: Reasons
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Reasons {}

export interface PriceIndexes {
	external_index_data: ExternalIndexData
	ozon_index_data: OzonIndexData
	price_index: string
	self_marketplaces_index_data: SelfMarketplacesIndexData
}

export interface ExternalIndexData {
	minimal_price: string
	minimal_price_currency: string
	price_index_value: number
}

export interface OzonIndexData {
	minimal_price: string
	minimal_price_currency: string
	price_index_value: number
}

export interface SelfMarketplacesIndexData {
	minimal_price: string
	minimal_price_currency: string
	price_index_value: number
}

export interface Status {
	state: string
	state_failed: string
	moderate_status: string
	decline_reasons: unknown[]
	validation_state: string
	state_name: string
	state_description: string
	is_failed: boolean
	is_created: boolean
	state_tooltip: string
	item_errors: unknown[]
	state_updated_at: string
}

export interface OfferAttributesResponse {
	result: OfferAttribute[]
	total: number
	last_id: string
}

export interface OfferAttribute {
	id: number
	barcode: string
	category_id: number
	name: string
	offer_id: string
	height: number
	depth: number
	width: number
	dimension_unit: string
	weight: number
	weight_unit: string
	images: Image[]
	image_group_id: string
	images360: unknown[]
	pdf_list: unknown[]
	attributes: Attribute[]
	complex_attributes: unknown[]
	color_image: string
	last_id: string
}

export interface Image {
	file_name: string
	default: boolean
	index: number
}

export interface Attribute {
	attribute_id: number
	complex_id: number
	values: Value[]
}

export interface Value {
	dictionary_value_id: number
	value: string
}

export interface OfferOzonWithAttributes extends Item {
	height: number
	depth: number
	width: number
	dimension_unit: string
	weight: number
	weight_unit: string
}

export interface FboOrderResponse<T> {
	result: T[]
}

export interface FbsOrderResponse<T> {
	result: {
		postings: T[]
		has_next: boolean
	}
}

export interface FboOrder {
	order_id: number
	order_number: string
	posting_number: string
	status: OrderStatusEnum
	cancel_reason_id: number
	created_at: string
	in_process_at: string
	products: Product[]
	analytics_data: AnalyticsData
	financial_data: FinancialData
	additional_data: unknown[]
}

// eslint-disable-next-line no-shadow
export enum OrderStatusEnum {
	awaiting_packaging = 'awaiting_packaging',
	awaiting_deliver = 'awaiting_deliver',
	delivering = 'delivering',
	delivered = 'delivered',
	cancelled = 'cancelled',
	returned = 'returned',
}

export interface Product {
	sku: number
	name: string
	quantity: number
	offer_id: string
	price: string
	digital_codes: unknown[]
	currency_code: string
}

export interface AnalyticsData {
	region: string
	city: string
	delivery_type: string
	is_premium: boolean
	payment_type_group_name: string
	warehouse_id: number
	warehouse_name: string
	is_legal: boolean
}

export interface FinancialData {
	products: Product2[]
	posting_services: PostingServices
}

export interface Product2 {
	commission_amount: number
	commission_percent: number
	payout: number
	product_id: number
	currency_code: string
	old_price: number
	price: number
	total_discount_value: number
	total_discount_percent: number
	actions: string[]
	picking: unknown
	quantity: number
	client_price: string
	item_services: ItemServices
}

export interface ItemServices {
	marketplace_service_item_fulfillment: number
	marketplace_service_item_pickup: number
	marketplace_service_item_dropoff_pvz: number
	marketplace_service_item_dropoff_sc: number
	marketplace_service_item_dropoff_ff: number
	marketplace_service_item_direct_flow_trans: number
	marketplace_service_item_return_flow_trans: number
	marketplace_service_item_deliv_to_customer: number
	marketplace_service_item_return_not_deliv_to_customer: number
	marketplace_service_item_return_part_goods_customer: number
	marketplace_service_item_return_after_deliv_to_customer: number
}

export interface PostingServices {
	marketplace_service_item_fulfillment: number
	marketplace_service_item_pickup: number
	marketplace_service_item_dropoff_pvz: number
	marketplace_service_item_dropoff_sc: number
	marketplace_service_item_dropoff_ff: number
	marketplace_service_item_direct_flow_trans: number
	marketplace_service_item_return_flow_trans: number
	marketplace_service_item_deliv_to_customer: number
	marketplace_service_item_return_not_deliv_to_customer: number
	marketplace_service_item_return_part_goods_customer: number
	marketplace_service_item_return_after_deliv_to_customer: number
}

export interface FbsOrder {
	postings: Posting[]
	has_next: boolean
}

// eslint-disable-next-line no-shadow
export enum OrderFbsOzonStatus {
	delivered = 'delivered',
	acceptance_in_progress = 'acceptance_in_progress', // идёт приёмка,
	arbitration = 'arbitration', // арбитраж,
	awaiting_approve = 'awaiting_approve', // ожидает подтверждения,
	awaiting_deliver = 'awaiting_deliver', // ожидает отгрузки,
	awaiting_packaging = 'awaiting_packaging', // ожидает упаковки,
	awaiting_registration = 'awaiting_registration', // ожидает регистрации,
	awaiting_verification = 'awaiting_verification', // создано,
	cancelled = 'cancelled', // отменено,
	cancelled_from_split_pending = 'cancelled_from_split_pending', // отменено,
	client_arbitration = 'client_arbitration', // клиентский арбитраж доставки,
	delivering = 'delivering', // доставляется,
	driver_pickup = 'driver_pickup', // у водителя,
	not_accepted = 'not_accepted', // не принят на сортировочном центре,
	sent_by_seller = 'sent_by_seller', // отправлено продавцом.
	returned = 'returned',
}

// eslint-disable-next-line no-shadow
export enum SubstatusOzon {
	posting_acceptance_in_progress = 'posting_acceptance_in_progress', // идёт приёмка,
	posting_in_arbitration = 'posting_in_arbitration', // арбитраж,
	posting_created = 'posting_created', // создано,
	posting_in_carriage = 'posting_in_carriage', // в перевозке,
	posting_not_in_carriage = 'posting_not_in_carriage', // не добавлено в перевозку,
	posting_registered = 'posting_registered', // зарегистрировано,
	posting_transferring_to_delivery = 'posting_transferring_to_delivery', // передаётся в доставку,
	posting_awaiting_passport_data = 'posting_awaiting_passport_data', // ожидает паспортных данных,
	posting_awaiting_registration = 'posting_awaiting_registration', // ожидает регистрации,
	posting_registration_error = 'posting_registration_error', // ошибка регистрации,
	posting_split_pending = 'posting_split_pending', // создано,
	posting_canceled = 'posting_canceled', // отменено,
	posting_in_client_arbitration = 'posting_in_client_arbitration', // клиентский арбитраж доставки,
	posting_delivered = 'posting_delivered', // доставлено,
	posting_received = 'posting_received', // получено,
	posting_conditionally_delivered = 'posting_conditionally_delivered', // условно доставлено,
	posting_in_courier_service = 'posting_in_courier_service', // курьер в пути,
	posting_in_pickup_point = 'posting_in_pickup_point', // в пункте выдачи,
	posting_on_way_to_city = 'posting_on_way_to_city', // в пути в ваш город,
	posting_on_way_to_pickup_point = 'posting_on_way_to_pickup_point', // в пути в пункт выдачи,
	posting_returned_to_warehouse = 'posting_returned_to_warehouse', // возвращено на склад,
	posting_transferred_to_courier_service = 'posting_transferred_to_courier_service', // передаётся в службу доставки,
	posting_driver_pick_up = 'posting_driver_pick_up', // у водителя,
	posting_not_in_sort_center = 'posting_not_in_sort_center', // не принято на сортировочном центре,
	sent_by_seller = 'sent_by_seller', // отправлено продавцом.
}

export interface Posting {
	posting_number: string
	order_id: number
	order_number: string
	status: OrderFbsOzonStatus
	delivery_method: DeliveryMethod
	tracking_number: string
	tpl_integration_type: string
	in_process_at: string
	shipment_date: string
	delivering_date: unknown
	cancellation: Cancellation
	customer: unknown
	products: Product[]
	addressee: unknown
	barcodes: Barcodes
	analytics_data: AnalyticsDataFbs
	financial_data: FinancialDataFbs
	is_express: boolean
	requirements: Requirements
	parent_posting_number: string
	available_actions: string[]
	multi_box_qty: number
	is_multibox: boolean
	substatus: SubstatusOzon
	prr_option: string
}

export interface Barcodes {
	upper_barcode: string
	lower_barcode: string
}

export interface AnalyticsDataFbs {
	region: string
	city: string
	delivery_type: string
	is_premium: boolean
	payment_type_group_name: string
	warehouse_id: number
	warehouse: string
	tpl_provider_id: number
	tpl_provider: string
	delivery_date_begin: string
	delivery_date_end: string
	is_legal: boolean
}

export interface FinancialDataFbs {
	products: Product2[]
	posting_services: PostingServices
	cluster_from: string
	cluster_to: string
}

export interface DeliveryMethod {
	id: number
	name: string
	warehouse_id: number
	warehouse: string
	tpl_provider_id: number
	tpl_provider: string
}

export interface Cancellation {
	cancel_reason_id: number
	cancel_reason: string
	cancellation_type: string
	cancelled_after_ship: boolean
	affect_cancellation_rating: boolean
	cancellation_initiator: string
}

export interface Requirements {
	products_requiring_gtd: unknown[]
	products_requiring_country: unknown[]
	products_requiring_mandatory_mark: unknown[]
	products_requiring_jwn: unknown[]
}

export interface RequestOzonFboOrders {
	dir: string
	filter: FilterFbo
	limit: number
	offset: number
	translit?: boolean
	with: WithFbo
}

export interface FilterFbo {
	since: string
	status?: string
	to: string
}

export interface WithFbo {
	analytics_data: boolean
	financial_data: boolean
}

export interface RequestOzonFbsOrders {
	dir: string
	filter: FilterFbs
	limit: number
	offset: number
	with: WithFbs
}

export interface RequestOzonReturns {
	filter: unknown
	last_id: number
	limit: number
}

export interface FilterFbs {
	delivery_method_id?: string[]
	fbpFilter?: string
	last_changed_status_date?: LastChangedStatusDate
	order_id?: number
	provider_id?: string[]
	since?: string
	status?: string
	to?: string
	warehouse_id?: string[]
}

export interface LastChangedStatusDate {
	from: string
	to: string
}

export interface WithFbs {
	analytics_data: boolean
	barcodes: boolean
	financial_data: boolean
	translit: boolean
}

export interface OzonReturnFbo {
	id: number
	sku: number
	compunknown_id: number
	posting_number: string
	accepted_from_customer_moment: string
	return_reason_name: string
	is_opened: boolean
	status_name: string
	returned_to_ozon_moment: string
	current_place_name: string
	dst_place_name: string
}

export interface OzonReturnFbs {
	id: number
	clearing_id: number
	posting_number: string
	product_id: number
	sku: number
	status: string
	returns_keeping_cost: number
	return_reason_name: string
	return_date: string
	quantity?: number
	product_name?: string
	price?: number
	waiting_for_seller_date_time: unknown
	returned_to_seller_date_time: string
	last_free_waiting_day: unknown
	is_opened: boolean
	place_id: number
	commission_percent: number
	commission: number
	price_without_commission: number
	is_moving: boolean
	moving_to_place_name: string
	waiting_for_seller_days: number
	picking_amount: unknown
	accepted_from_customer_moment: unknown
	return_clearing_id: number
	return_barcode: string
	exemplar_id: number
	items?: [
		{
			name?: string
			quantity?: number
			price?: number
			sku?: number
		}
	]
}

export interface Returns<T> {
	returns: T[]
}

export interface ProductPrices {
	result: ProductPrice
}

export interface ProductPrice {
	items: ItemPrice[]
	total: number
	last_id: string
}

export interface ItemPrice {
	acquiring: number
	product_id: number
	offer_id: string
	price: Price
	price_indexes: PriceIndexes
	commissions: Commissions
	marketing_actions: any
	volume_weight: number
}

export interface Price {
	currency_code: string
	price: string
	old_price: string
	premium_price: string
	recommended_price: string
	retail_price: string
	vat: string
	min_ozon_price: string
	marketing_price: string
	marketing_seller_price: string
	auto_action_enabled: boolean
}

export interface Commissions {
	sales_percent: number
	sales_percent_fbo: number
	sales_percent_fbs: number
	fbo_fulfillment_amount: number
	fbo_direct_flow_trans_min_amount: number
	fbo_direct_flow_trans_max_amount: number
	fbo_deliv_to_customer_amount: number
	fbo_return_flow_amount: number
	fbo_return_flow_trans_min_amount: number
	fbo_return_flow_trans_max_amount: number
	fbs_first_mile_min_amount: number
	fbs_first_mile_max_amount: number
	fbs_direct_flow_trans_min_amount: number
	fbs_direct_flow_trans_max_amount: number
	fbs_deliv_to_customer_amount: number
	fbs_return_flow_amount: number
	fbs_return_flow_trans_min_amount: number
	fbs_return_flow_trans_max_amount: number
}

export interface ProductPricesRequest {
	filter: Filter
	last_id: string
	limit: number
}

export interface TransactionsRequest {
	filter: TransactionsFilter
	page?: number
	page_size: number
}

export interface TransactionsFilter {
	date: Date
	operation_type?: any[]
	posting_number?: string
	transaction_type: string
}

export interface Date {
	from: string
	to: string
}

export interface Filter {
	offer_id: string[]
	product_id?: string[]
	visibility: string
}

export interface GetStocks {
	limit: number
	offset: number
	warehouse_type: string
}

export interface StocksOnWarehouses {
	result: Rows
}

export interface Rows {
	rows: Row[]
}

export interface Row {
	free_to_sell_amount: number
	item_code: string
	item_name: string
	promised_amount: number
	reserved_amount: number
	sku: number
	warehouse_name: string
}

export interface TransactionsResponse {
	result: TransactionsResult
}

export interface TransactionsResult {
	operations: Operation[]
	page_count: number
	row_count: number
}

export interface Operation {
	operation_id: number
	operation_type: string
	operation_date: string
	operation_type_name: string
	delivery_charge: number
	return_delivery_charge: number
	accruals_for_sale: number
	sale_commission: number
	amount: number
	type: string
	posting: TransactionsPosting
	items: any[]
	services: Array<{
		name: string
		price: number
	}>
}

export interface TransactionsPosting {
	delivery_schema: string
	order_date: string
	posting_number: string
	warehouse_id: number
}
