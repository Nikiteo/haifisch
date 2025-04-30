// Enum для типов уведомлений
export enum NotificationType {
	PING = 'PING', // Проверочное уведомление
	ORDER_CREATED = 'ORDER_CREATED', // Создан новый заказ
	ORDER_CANCELLED = 'ORDER_CANCELLED', // Заказ отменен
	ORDER_STATUS_UPDATED = 'ORDER_STATUS_UPDATED', // Статус заказа изменен
	ORDER_RETURN_CREATED = 'ORDER_RETURN_CREATED', // Создан новый возврат или невыкуп
	GOODS_FEEDBACK_CREATED = 'GOODS_FEEDBACK_CREATED', // Создан новый отзыв
	ORDER_RETURN_STATUS_UPDATED = 'ORDER_RETURN_STATUS_UPDATED', // Статус возврата или невыкупа изменен
}

// Интерфейсы для уведомлений
export interface PingNotificationDTO {
	notificationType: NotificationType.PING // Тип уведомления
	time: string // Дата и время обработки уведомления (ISO 8601)
}

export interface NotificationOrderItemDTO {
	count: number // Количество товара
	offerId: string // SKU — идентификатор товара в вашей системе
}

export interface OrderCreatedNotificationDTO {
	notificationType: NotificationType.ORDER_CREATED // Тип уведомления
	campaignId: number // Идентификатор кампании
	createdAt: string // Дата и время создания заказа (ISO 8601)
	items: NotificationOrderItemDTO[] // Список товаров в заказе
	orderId: number // Идентификатор заказа
}

// Enum для статусов заказа
export enum OrderStatusType {
	PLACING = 'PLACING',
	RESERVED = 'RESERVED',
	UNPAID = 'UNPAID',
	PROCESSING = 'PROCESSING',
	DELIVERY = 'DELIVERY',
	PICKUP = 'PICKUP',
	DELIVERED = 'DELIVERED',
	CANCELLED = 'CANCELLED',
	PENDING = 'PENDING',
	PARTIALLY_RETURNED = 'PARTIALLY_RETURNED',
	RETURNED = 'RETURNED',
	UNKNOWN = 'UNKNOWN',
}

// Enum для подстатусов заказа
export enum OrderSubstatusType {
	STARTED = 'STARTED', // Заказ подтвержден, его можно начать обрабатывать
	READY_TO_SHIP = 'READY_TO_SHIP', // Заказ собран и готов к отправке
	RESERVATION_EXPIRED = 'RESERVATION_EXPIRED', // Покупатель не завершил оформление зарезервированного заказа в течение 10 минут
	USER_NOT_PAID = 'USER_NOT_PAID', // Покупатель не оплатил заказ (для типа оплаты PREPAID) в течение 30 минут
	USER_UNREACHABLE = 'USER_UNREACHABLE', // Не удалось связаться с покупателем
	USER_CHANGED_MIND = 'USER_CHANGED_MIND', // Покупатель отменил заказ по личным причинам
	USER_REFUSED_DELIVERY = 'USER_REFUSED_DELIVERY', // Покупателя не устроили условия доставки
	USER_REFUSED_PRODUCT = 'USER_REFUSED_PRODUCT', // Покупателю не подошел товар
	SHOP_FAILED = 'SHOP_FAILED', // Магазин не может выполнить заказ
	USER_REFUSED_QUALITY = 'USER_REFUSED_QUALITY', // Покупателя не устроило качество товара
	REPLACING_ORDER = 'REPLACING_ORDER', // Покупатель решил заменить товар другим по собственной инициативе
	PROCESSING_EXPIRED = 'PROCESSING_EXPIRED', // Значение более не используется
	TECHNICAL_ERROR = 'TECHNICAL_ERROR', // Техническая ошибка на стороне Маркета
}

// Интерфейсы для уведомлений об изменении статуса заказа
export interface OrderStatusUpdatedNotificationDTO {
	notificationType: NotificationType.ORDER_STATUS_UPDATED // Тип уведомления
	campaignId: number // Идентификатор кампании
	orderId: number // Идентификатор заказа
	status: OrderStatusType // Статус заказа
	substatus: OrderSubstatusType // Подстатус заказа
	updatedAt: string // Дата и время изменения статуса заказа (ISO 8601)
}

// Интерфейс для уведомления об отмене заказа
export interface OrderCancelledNotificationDTO {
	notificationType: NotificationType.ORDER_CANCELLED // Тип уведомления
	campaignId: number // Идентификатор кампании
	cancelledAt: string // Дата и время отмены заказа (ISO 8601)
	items: NotificationOrderItemDTO[] // Список товаров в заказе
	orderId: number // Идентификатор отмененного заказа
}

// Интерфейс для уведомления о создании нового возврата или невыкупа
export interface OrderReturnCreatedNotificationDTO {
	notificationType: NotificationType.ORDER_RETURN_CREATED // Тип уведомления
	campaignId: number // Идентификатор кампании
	createdAt: string // Дата и время создания возврата или невыкупа (ISO 8601)
	items: NotificationOrderItemDTO[] // Список товаров в возврате или невыкупе
	orderId: number // Идентификатор заказа
	returnId: number // Идентификатор возврата или невыкупа
	returnType: 'RETURN' | 'UNREDEEMED' // Тип возврата или невыкупа
}

// Интерфейс для интеграции
export interface Integration {
	name: string // Название интеграции, длина от 1 до 100 символов
	time: string // Дата и время начала обработки уведомления в формате UTC
	version: string // Версия интеграции, длина от 1 до 100 символов
}

// Интерфейс для обработки ошибок
export interface ErrorResponse {
	error: {
		type: string // Тип ошибки
		message: string // Сообщение об ошибке
		details?: string | null // Дополнительные детали об ошибке
	}
}

// Enum для типов сообщений
export enum MessageType {
	TYPE_PING = 'TYPE_PING', // Проверка статуса готовности сервиса при первичном подключении и периодически после подключения
	TYPE_NEW_POSTING = 'TYPE_NEW_POSTING', // Новое отправление
	TYPE_POSTING_CANCELLED = 'TYPE_POSTING_CANCELLED', // Отмена отправления
	TYPE_STATE_CHANGED = 'TYPE_STATE_CHANGED', // Изменение статуса отправления
	TYPE_CUTOFF_DATE_CHANGED = 'TYPE_CUTOFF_DATE_CHANGED', // Изменение даты отгрузки отправления
	TYPE_DELIVERY_DATE_CHANGED = 'TYPE_DELIVERY_DATE_CHANGED', // Изменение даты доставки отправления
	TYPE_CREATE_OR_UPDATE_ITEM = 'TYPE_CREATE_OR_UPDATE_ITEM', // Создание и обновление товара или ошибка в процессе
	TYPE_CREATE_ITEM = 'TYPE_CREATE_ITEM', // Создание товара или ошибка при его создании
	TYPE_UPDATE_ITEM = 'TYPE_UPDATE_ITEM', // Обновление товара или ошибка при обновлении
	TYPE_PRICE_INDEX_CHANGED = 'TYPE_PRICE_INDEX_CHANGED', // Изменение ценового индекса товара
	TYPE_STOCKS_CHANGED = 'TYPE_STOCKS_CHANGED', // Изменение остатков на складах продавца
	TYPE_NEW_MESSAGE = 'TYPE_NEW_MESSAGE', // Новое сообщение в чате
	TYPE_UPDATE_MESSAGE = 'TYPE_UPDATE_MESSAGE', // Изменение сообщения в чате
	TYPE_MESSAGE_READ = 'TYPE_MESSAGE_READ', // Ваше сообщение прочитано покупателем или поддержкой
	TYPE_CHAT_CLOSED = 'TYPE_CHAT_CLOSED', // Чат закрыт
}

// Интерфейсы для событий отправлений
export interface Product {
	sku: number // SKU товара
	quantity: number // Количество товара
}

export interface Ping {
	message_type: string // Тип сообщения
	time: string // Время сообщения
}

export interface NewPostingEvent {
	message_type: MessageType.TYPE_NEW_POSTING // Тип уведомления
	posting_number: string // Номер отправления
	products: Product[] // Информация о товарах
	in_process_at: string // Дата и время начала обработки отправления в формате UTC
	warehouse_id: number // Идентификатор склада
	seller_id: number // Идентификатор продавца
}

export interface Reason {
	id: number // Идентификатор причины отмены
	message: string // Причина отмены
}

export interface PostingCancelledEvent {
	message_type: MessageType.TYPE_POSTING_CANCELLED // Тип уведомления
	posting_number: string // Номер отправления
	products: Product[] // Информация о товарах
	old_state: string // Предыдущий статус отправления
	new_state: 'posting_canceled' // Новый статус отправления
	changed_state_date: string // Дата и время изменения статуса отправления в формате UTC
	reason: Reason // Информация о причине отмены
	warehouse_id: number // Идентификатор склада
	seller_id: number // Идентификатор продавца
}

// Enum для статусов отправлений
export enum PostingStatus {
	POSTING_ACCEPTANCE_IN_PROGRESS = 'posting_acceptance_in_progress', // Идёт приёмка
	POSTING_CREATED = 'posting_created', // Создано
	POSTING_TRANSFERRING_TO_DELIVERY = 'posting_transferring_to_delivery', // Передаётся в доставку
	POSTING_IN_CARRIAGE = 'posting_in_carriage', // В перевозке
	POSTING_NOT_IN_CARRIAGE = 'posting_not_in_carriage', // Не добавлен в перевозку
	POSTING_IN_CLIENT_ARBITRATION = 'posting_in_client_arbitration', // Клиентский арбитраж доставки
	POSTING_ON_WAY_TO_CITY = 'posting_on_way_to_city', // На пути в город
	POSTING_TRANSFERRED_TO_COURIER_SERVICE = 'posting_transferred_to_courier_service', // Передаётся курьеру
	POSTING_IN_COURIER_SERVICE = 'posting_in_courier_service', // Курьер в пути
	POSTING_ON_WAY_TO_PICKUP_POINT = 'posting_on_way_to_pickup_point', // На пути в пункт выдачи
	POSTING_IN_PICKUP_POINT = 'posting_in_pickup_point', // В пункте выдачи
	POSTING_CONDITIONALLY_DELIVERED = 'posting_conditionally_delivered', // Условно доставлено
	POSTING_DRIVER_PICK_UP = 'posting_driver_pick_up', // У водителя
	POSTING_NOT_IN_SORT_CENTER = 'posting_not_in_sort_center', // Не принят на сортировочном центре
}

// Интерфейс для события изменения статуса отправления
export interface StateChangedEvent {
	message_type: MessageType.TYPE_STATE_CHANGED // Тип уведомления
	posting_number: string // Номер отправления
	new_state: PostingStatus // Новый статус отправления
	changed_state_date: string // Дата и время изменения статуса отправления в формате UTC
	warehouse_id: number // Идентификатор склада
	seller_id: number // Идентификатор продавца
}

export interface GoodsFeedbackCreatedNotificationDTO {
	/**
	 * Идентификатор кабинета
	 * Тип: integer<int64>
	 */
	businessId: number

	/**
	 * Дата и время создания отзыва.
	 * Может отличаться от информации в publishedAt, так как некоторое время отзыв проходит модерацию.
	 * Формат даты: ISO 8601 со смещением относительно UTC. Например, 2017-11-21T00:00:00.213Z.
	 * Тип: string<date-time>
	 */
	createdAt: string

	/**
	 * Идентификатор отзыва
	 * Тип: integer<int64>
	 */
	feedbackId: number

	/**
	 * Тип уведомления:
	 * GOODS_FEEDBACK_CREATED — создан новый отзыв о товаре
	 */
	notificationType: 'GOODS_FEEDBACK_CREATED'

	/**
	 * Дата и время публикации отзыва.
	 * Может отличаться от информации в createdAt, так как некоторое время отзыв проходит модерацию.
	 * Формат даты: ISO 8601 со смещением относительно UTC. Например, 2017-11-21T00:00:00.213Z.
	 * Тип: string<date-time>
	 */
	publishedAt: string
}

export interface OrderReturnStatusUpdatedNotificationDTO {
	campaignId: number // Идентификатор кампании
	notificationType: NotificationType.ORDER_RETURN_STATUS_UPDATED // Тип уведомления
	orderId: number // Идентификатор заказа
	returnId: number // Идентификатор возврата или невыкупа
	statuses: NotificationUpdatedReturnStatusesDTO
	updateAt: string // Дата и время обновления статуса возврата или невыкупа (ISO 8601)
}

export enum RefundStatusType {
	STARTED_BY_USER = 'STARTED_BY_USER',
	REFUND_IN_PROGRESS = 'REFUND_IN_PROGRESS',
	REFUNDED = 'REFUNDED',
	FAILED = 'FAILED',
	WAITING_FOR_DECISION = 'WAITING_FOR_DECISION',
	DECISION_MADE = 'DECISION_MADE',
	REFUNDED_WITH_BONUSES = 'REFUNDED_WITH_BONUSES',
	REFUNDED_BY_SHOP = 'REFUNDED_BY_SHOP',
	COMPLETE_WITHOUT_REFUND = 'COMPLETE_WITHOUT_REFUND',
	CANCELLED = 'CANCELLED',
	UNKNOWN = 'UNKNOWN',
}

export enum ReturnShipmentStatusType {
	CREATED = 'CREATED',
	RECEIVED = 'RECEIVED',
	IN_TRANSIT = 'IN_TRANSIT',
	READY_FOR_PICKUP = 'READY_FOR_PICKUP',
	PICKED = 'PICKED',
	LOST = 'LOST',
	EXPIRED = 'EXPIRED',
	CANCELLED = 'CANCELLED',
	FULFILMENT_RECEIVED = 'FULFILMENT_RECEIVED',
	PREPARED_FOR_UTILIZATION = 'PREPARED_FOR_UTILIZATION',
	NOT_IN_DEMAND = 'NOT_IN_DEMAND',
	UTILIZED = 'UTILIZED',
	READY_FOR_EXPROPRIATION = 'READY_FOR_EXPROPRIATION',
	RECEIVED_FOR_EXPROPRIATION = 'RECEIVED_FOR_EXPROPRIATION',
	UNKNOWN = 'UNKNOWN',
}

export interface NotificationUpdatedReturnStatusesDTO {
	/**
	 * Статус возврата денег
	 *
	 * Примечание: Не приходит для невыкупов
	 * Не приходит для возвратов с опцией "Быстрый возврат денег за дешевый брак",
	 * когда товар остается у покупателя
	 */
	refundStatus?: RefundStatusType

	/**
	 * Статус передачи возврата
	 *
	 * Примечание: Приходит только для невыкупов
	 * Не приходит для возвратов с опцией "Быстрый возврат денег за дешевый брак",
	 * когда товар остается у покупателя
	 */
	shipmentStatus?: ReturnShipmentStatusType
}
