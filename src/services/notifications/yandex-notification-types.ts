// Enum для типов уведомлений
export enum NotificationType {
	PING = 'PING', // Проверочное уведомление
	ORDER_CREATED = 'ORDER_CREATED', // Создан новый заказ
	ORDER_CANCELLED = 'ORDER_CANCELLED', // Заказ отменен
	ORDER_STATUS_UPDATED = 'ORDER_STATUS_UPDATED', // Статус заказа изменен
	ORDER_RETURN_CREATED = 'ORDER_RETURN_CREATED', // Создан новый возврат или невыкуп
}

// Интерфейс для проверочного уведомления
export interface PingNotificationDTO {
	notificationType: NotificationType.PING // Тип уведомления
	time: string // Дата и время обработки уведомления (ISO 8601)
}

// Интерфейс для элемента заказа
export interface NotificationOrderItemDTO {
	count: number // Количество товара
	offerId: string // SKU — идентификатор товара в вашей системе
}

// Интерфейс для уведомления о создании нового заказа
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
	// Добавьте другие значения по мере необходимости
}

// Интерфейс для уведомления об изменении статуса заказа
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
	}
}
