export interface ResponseMS<T> {
	context: Context
	meta: Meta2
	rows: T[]
}

export interface Response<T> {
	data: T[]
}

export interface ErrorResponse {
	errors: [
		{
			error: string
			code: number
			moreInfo?: string
		}
	]
}

export interface Context {
	employee: Employee
}

export interface Employee {
	meta: Meta
}

export interface Meta {
	href: string
	type: string
	mediaType: string
	metadataHref?: string
	uuidHref?: string
}

export interface Meta2 {
	href: string
	type: string
	mediaType: string
	size: number
	limit: number
	offset: number
}

export interface Product {
	meta?: Meta
	id?: string
	accountId?: string
	owner?: Owner
	shared: boolean
	group: Group
	updated?: string
	name: string
	description?: string
	code: string
	externalCode: string
	archived: boolean
	pathName: string
	useParentVat: boolean
	productFolder?: Meta
	uom: Uom
	images?: Images
	minPrice: MinPrice
	salePrices: SalePrice[]
	buyPrice: BuyPrice
	barcodes: Barcode[]
	supplier: Supplier
	attributes: Attribute[]
	paymentItemType: string
	discountProhibited: boolean
	country: Country
	article: string
	weight: number
	volume?: number
	variantsCount: number
	isSerialTrackable: boolean
	trackingType: string
	files?: Files
	effectiveVat: number
	effectiveVatEnabled: boolean
	vat: number
	vatEnabled: boolean
}

export interface Owner {
	meta: Meta
}

export interface Group {
	meta: Meta
}

export interface Uom {
	meta: Meta
}

export interface Images {
	meta: Meta2
}

export interface MinPrice {
	value: number
	currency: Currency
}

export interface Currency {
	meta: Meta
}

export interface SalePrice {
	value: number
	currency: Currency
	priceType: PriceType
}

export interface PriceType {
	meta: Meta
	id: string
	name: string
	externalCode: string
}

export interface BuyPrice {
	value: number
	currency: Currency
}

export interface Barcode {
	ean13: string
}

export interface Supplier {
	meta: Meta
}

export interface Attribute {
	meta: Meta
	id?: string
	name: string
	type?: string
	value: any
}

export interface Country {
	meta: Meta
}

export interface Files {
	meta: Meta2
}

export interface CustomerOrder {
	meta?: Meta
	id?: string
	accountId?: string
	syncId?: string
	updated?: string
	name?: string
	externalCode?: string
	owner?: Owner
	shared?: boolean
	group?: Group
	store?: Store
	project?: Project
	moment?: string
	vatSum?: number
	deliveryPlannedMoment?: string
	shipmentAddressFull?: ShipmentAddressFull
	attributes?: Attribute[]
	applicable?: boolean
	vatEnabled?: boolean
	vatIncluded?: boolean
	rate?: Rate
	sum?: number
	organization: Organization
	agent: Agent
	state?: State
	organizationAccount?: OrganizationAccount
	agentAccount?: AgentAccount
	created?: string
	printed?: boolean
	published?: boolean
	positions?: CreatePosition[]
	reservedSum?: number
	payedSum?: number
	shippedSum?: number
	invoicedSum?: number
	salesChannel?: SalesChannel
	description?: string
}

export interface Store {
	meta: Meta
}

export interface ShipmentAddressFull {
	postalCode?: string
	country?: {
		meta: Meta
	}
	region?: string
	city?: string
	street?: string
	apartment?: string
	house?: string
	addInfo?: string
}

export interface Project {
	meta: Meta
}

export interface SalesChannel {
	meta: Meta
}

export interface Rate {
	currency: Currency
}

export interface Organization {
	meta: Meta
}

export interface Agent {
	meta: Meta
}

export interface State {
	meta: Meta
}

export interface OrganizationAccount {
	meta: Meta
}

export interface AgentAccount {
	meta: Meta
}

export interface Positions {
	meta?: Meta
}

export interface CreatePosition {
	quantity?: number
	price?: number
	discount?: number
	vat?: number
	assortment?: {
		meta?: Meta
	}
	reserve?: number
	country?: {
		meta: Meta
	}
}

export interface Demand {
	meta?: Meta
	id?: string
	accountId?: string
	owner?: Owner
	shared?: boolean
	group?: Group
	updated?: string
	name?: string
	externalCode?: string
	moment?: string
	applicable?: boolean
	rate?: Rate
	sum?: number
	store?: Store
	project?: Project
	agent?: Agent
	organization?: Organization
	created?: string
	printed?: boolean
	published?: boolean
	files?: Files
	positions?: CreatePosition[]
	vatEnabled?: boolean
	vatIncluded?: boolean
	vatSum?: number
	payedSum?: number
	overhead?: Overhead
	customerOrder?: {
		meta?: Meta
	}
	consignee?: {
		meta?: Meta
	}
	carrier?: {
		meta?: Meta
	}
	returns?: {
		meta?: Meta
	}
	payments?: Payment[]
	shipmentAddress?: string
	shipmentAddressFull?: ShipmentAddressFull
	salesChannel?: SalesChannel
}

export interface DemandReturns {
	meta?: Meta
	id?: string
	accountId?: string
	owner?: Owner
	shared?: boolean
	group?: Group
	updated?: string
	name?: string
	externalCode?: string
	moment?: string
	applicable?: boolean
	rate?: Rate
	sum?: number
	store?: Store
	project?: Project
	agent?: Agent
	organization?: Organization
	created?: string
	printed?: boolean
	published?: boolean
	files?: Files
	positions?: Positions
	vatEnabled?: boolean
	vatIncluded?: boolean
	vatSum?: number
	payedSum?: number
	overhead?: Overhead
	customerOrder?: {
		meta?: Meta
	}
	consignee?: {
		meta?: Meta
	}
	carrier?: {
		meta?: Meta
	}
	returns?: {
		meta?: Meta
	}
	payments?: Payment[]
	shipmentAddress?: string
	shipmentAddressFull?: ShipmentAddressFull
	salesChannel?: SalesChannel
}

export interface Overhead {
	sum: number
	distribution: string
}

export interface Payment {
	meta: Meta
	linkedSum: number
}

export interface Paymentin {
	meta?: Meta
	id?: string
	accountId?: string
	owner?: Owner
	shared?: boolean
	group?: Group
	updated?: string
	name?: string
	externalCode?: string
	moment?: string
	applicable?: boolean
	rate?: Rate
	sum?: number
	state?: State
	project?: Project
	agent?: Agent
	organization?: Organization
	created?: string
	printed?: boolean
	published?: boolean
	files?: Files
	salesChannel?: SalesChannel
	vatSum?: number
	operations?: Operation[]
	paymentPurpose?: string
	incomingNumber?: string
	incomingDate?: string
}

export interface Operation {
	meta?: Meta
	linkedSum: number
}

export interface SalesReturn {
	meta?: Meta
	id?: string
	accountId?: string
	owner?: Owner
	shared?: boolean
	group?: Group
	updated?: string
	name?: string
	externalCode?: string
	moment?: string
	applicable?: boolean
	rate?: Rate
	sum?: number
	store?: Store
	project?: Project
	agent?: Agent
	organization?: Organization
	created?: string
	printed?: boolean
	published?: boolean
	files?: Files
	positions?: Positions
	vatEnabled?: boolean
	vatIncluded?: boolean
	vatSum?: number
	demand?: Demand
	payments?: Payment[]
	payedSum?: number
	salesChannel?: SalesChannel
	description?: string
}

export interface Paymentout {
	meta?: Meta
	id?: string
	accountId?: string
	owner?: Owner
	shared?: boolean
	group?: Group
	updated?: string
	name?: string
	externalCode?: string
	moment?: string
	applicable?: boolean
	rate?: Rate
	sum?: number
	project?: Project
	agent?: Agent
	organization?: Organization
	created?: string
	printed?: boolean
	published?: boolean
	files?: Files
	state?: State
	salesChannel?: SalesChannel
	paymentPurpose?: string
	vatSum?: number
	operations?: Operation[]
	expenseItem?: ExpenseItem
}

export interface ExpenseItem {
	meta?: Meta
}

export interface Move {
	meta: Meta
	id: string
	accountId: string
	owner: Owner
	shared: boolean
	group: Group
	updated: string
	name: string
	externalCode: string
	moment: string
	applicable: boolean
	rate: Rate
	sum: number
	project: Project
	organization: Organization
	state: State
	created: string
	printed: boolean
	published: boolean
	files: Files
	positions: Positions
	sourceStore: SourceStore
	targetStore: TargetStore
}

export interface SourceStore {
	meta: Meta
}

export interface TargetStore {
	meta: Meta
}

export interface Cashout {
	meta?: Meta
	id?: string
	accountId?: string
	owner?: Owner
	shared?: boolean
	group?: Group
	updated?: string
	name?: string
	externalCode?: string
	moment?: string
	applicable?: boolean
	rate?: Rate
	sum?: number
	project?: Project
	agent?: Agent
	organization?: Organization
	state?: State
	created?: string
	printed?: boolean
	published?: boolean
	files?: Files
	salesChannel?: SalesChannel
	paymentPurpose?: string
	vatSum?: number
	expenseItem?: ExpenseItem
}
