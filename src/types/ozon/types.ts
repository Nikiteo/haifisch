import {
	ActionCandidatesProduct,
	ProductAttribute,
	ProductInfo,
} from './ozon-types'

export interface ProductInfoWithAttributes
	extends ProductInfo,
		Pick<
			ProductAttribute,
			| 'height'
			| 'depth'
			| 'width'
			| 'dimension_unit'
			| 'weight'
			| 'weight_unit'
			| 'attributes'
		> {}

export type PromoOffersById = Record<
	number,
	ActionCandidatesProduct[] | undefined
>

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
	picked_return = 'picked_return',
}

export enum OrderStatusEnum {
	awaiting_packaging = 'awaiting_packaging',
	awaiting_deliver = 'awaiting_deliver',
	delivering = 'delivering',
	delivered = 'delivered',
	cancelled = 'cancelled',
	returned = 'returned',
}
