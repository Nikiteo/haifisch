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
