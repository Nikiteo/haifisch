/** THIS FILE WAS GENERATED */

/* eslint-disable @typescript-eslint/array-type, @typescript-eslint/ban-types, max-lines, @typescript-eslint/no-namespace, @typescript-eslint/indent, @typescript-eslint/no-invalid-void-type */

/**
 * Содержимое уведомления с информацией о произошедшем событии.
 * @example {"notificationType":"PING"}
 */
export type SendNotificationRequest = BaseSendNotificationRequest &
    (
        | BaseSendNotificationRequestNotificationTypeMapping<'PING', PingNotificationDTO>
        | BaseSendNotificationRequestNotificationTypeMapping<'ORDER_CREATED', OrderCreatedNotificationDTO>
        | BaseSendNotificationRequestNotificationTypeMapping<'ORDER_CANCELLED', OrderCancelledNotificationDTO>
        | BaseSendNotificationRequestNotificationTypeMapping<
              'ORDER_CANCELLATION_REQUEST',
              OrderCancellationRequestNotificationDTO
          >
        | BaseSendNotificationRequestNotificationTypeMapping<'ORDER_STATUS_UPDATED', OrderStatusUpdatedNotificationDTO>
        | BaseSendNotificationRequestNotificationTypeMapping<'ORDER_RETURN_CREATED', OrderReturnCreatedNotificationDTO>
        | BaseSendNotificationRequestNotificationTypeMapping<
              'ORDER_RETURN_STATUS_UPDATED',
              OrderReturnStatusUpdatedNotificationDTO
          >
        | BaseSendNotificationRequestNotificationTypeMapping<
              'GOODS_FEEDBACK_CREATED',
              GoodsFeedbackCreatedNotificationDTO
          >
        | BaseSendNotificationRequestNotificationTypeMapping<
              'GOODS_FEEDBACK_COMMENT_CREATED',
              GoodsFeedbackCommentCreatedNotificationDTO
          >
        | BaseSendNotificationRequestNotificationTypeMapping<'CHAT_CREATED', ChatCreatedNotificationDTO>
        | BaseSendNotificationRequestNotificationTypeMapping<'CHAT_MESSAGE_SENT', ChatMessageSentNotificationDTO>
        | BaseSendNotificationRequestNotificationTypeMapping<
              'CHAT_ARBITRAGE_STARTED',
              ChatArbitrageStartedNotificationDTO
          >
        | BaseSendNotificationRequestNotificationTypeMapping<
              'CHAT_ARBITRAGE_FINISHED',
              ChatArbitrageFinishedNotificationDTO
          >
    )

/**
 * Ответ в случае успешной доставки уведомления.
 * @example {"name":"name","time":"2000-01-23T04:56:07.000Z","version":"version"}
 */
export interface SendNotificationResponse {
    /**
     * Версия интеграции.
     * @minLength 1
     * @maxLength 100
     */
    version: string
    /**
     * Название интеграции.
     * @minLength 1
     * @maxLength 100
     */
    name: string
    /**
     * Дата и время начала обработки уведомления в формате UTC.
     * @format date-time
     */
    time: string
}

/**
 * Обертка для ошибок при обработке уведомления.
 * @example {"error":{"type":"UNKNOWN","message":"message"}}
 */
export interface SendNotificationErrorResponse {
    /** Ошибка при обработке уведомления. */
    error?: NotificationApiErrorDTO
}

/**
 * Проверочное уведомление.
 *
 * `notificationType` = `PING`
 */
export interface PingNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType?: NotificationType
    /**
     * Дата и время обработки уведомления со стороны магазина.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    time?: string
}

/**
 * Уведомление о создании нового заказа.
 *
 * `notificationType` = `ORDER_CREATED`
 *
 * {% note tip "Чтобы получить подробную информацию о заказе" %}
 *
 * Используйте метод [GET campaigns/{campaignId}/orders/{orderId}](../../reference/orders/getOrder.md).
 *
 * {% endnote %}
 */
export interface OrderCreatedNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор заказа.
     * @format int64
     */
    orderId: number
    /**
     * Идентификатор магазина.
     * @format int64
     */
    campaignId: number
    /** Список товаров в заказе. */
    items: NotificationOrderItemDTO[]
    /**
     * Дата и время создания заказа.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    createdAt: string
}

/**
 * Уведомление об изменении статуса заказа.
 *
 * `notificationType` = `ORDER_STATUS_UPDATED`
 *
 * {% note tip "Чтобы изменить статус заказа" %}
 *
 * Используйте метод [PUT campaigns/{campaignId}/orders/{orderId}/status](../../reference/orders/updateOrderStatus.md).
 *
 * {% endnote %}
 */
export interface OrderStatusUpdatedNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор заказа.
     * @format int64
     */
    orderId: number
    /**
     * Идентификатор магазина.
     * @format int64
     */
    campaignId: number
    /**
     * Статус заказа:
     *
     * * `PLACING` — оформляется, подготовка к резервированию.
     *
     * * `RESERVED` — зарезервирован, но недооформлен.
     *
     * * `UNPAID` — оформлен, но еще не оплачен (если выбрана оплата при оформлении).
     *
     * * `PROCESSING` — находится в обработке.
     *
     * * `DELIVERY` — передан в службу доставки.
     *
     * * `PICKUP` — доставлен в пункт самовывоза.
     *
     * * `DELIVERED` — получен покупателем.
     *
     * * `CANCELLED` — отменен.
     *
     * * `PENDING` — ожидает обработки со стороны продавца.
     *
     * * `PARTIALLY_RETURNED` — возвращен частично.
     *
     * * `RETURNED` — возвращен полностью.
     *
     * * `UNKNOWN` — неизвестный статус.
     *
     * Также могут возвращаться другие значения. Обрабатывать их не требуется.
     */
    status: OrderStatusType
    /**
     * Этап обработки заказа (если он имеет статус `PROCESSING`) или причина отмены заказа (если он имеет статус `CANCELLED`).
     *
     * * Значения для заказа в статусе `PROCESSING`:
     *
     *     * `STARTED` — заказ подтвержден, его можно начать обрабатывать.
     *
     *     * `READY_TO_SHIP` — заказ собран и готов к отправке.
     *
     * * Значения для заказа в статусе `CANCELLED`:
     *
     *     * `RESERVATION_EXPIRED` — покупатель не завершил оформление зарезервированного заказа в течение 10 минут.
     *
     *     * `USER_NOT_PAID` — покупатель не оплатил заказ (для типа оплаты `PREPAID`) в течение 30 минут.
     *
     *     * `USER_UNREACHABLE` — не удалось связаться с покупателем. Для отмены с этой причиной необходимо выполнить условия:
     *
     *       * не менее 3 звонков с 8 до 21 в часовом поясе покупателя;
     *       * перерыв между первым и третьим звонком не менее 90 минут;
     *       * соединение не короче 5 секунд.
     *
     *       Если хотя бы одно из этих условий не выполнено (кроме случая, когда номер недоступен), отменить заказ не получится. Вернется ответ с кодом ошибки 400.
     *
     *     * `USER_CHANGED_MIND` — покупатель отменил заказ по личным причинам.
     *
     *     * `USER_REFUSED_DELIVERY` — покупателя не устроили условия доставки.
     *
     *     * `USER_REFUSED_PRODUCT` — покупателю не подошел товар.
     *
     *     * `SHOP_FAILED` — магазин не может выполнить заказ.
     *
     *     * `USER_REFUSED_QUALITY` — покупателя не устроило качество товара.
     *
     *     * `REPLACING_ORDER` — покупатель решил заменить товар другим по собственной инициативе.
     *
     *     * `PROCESSING_EXPIRED` — значение более не используется.
     *
     *     * `PICKUP_EXPIRED` — закончился срок хранения заказа в ПВЗ.
     *
     *     * `TOO_MANY_DELIVERY_DATE_CHANGES` — заказ переносили слишком много раз.
     *
     *     * `TOO_LONG_DELIVERY` — заказ доставляется слишком долго.
     *
     *
     * * `TECHNICAL_ERROR` — техническая ошибка на стороне Маркета. Обратитесь в поддержку.
     *
     * Также могут возвращаться другие значения. Обрабатывать их не требуется.
     */
    substatus: OrderSubstatusType
    /**
     * Дата и время изменения статуса заказа.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    updatedAt: string
}

/**
 * Уведомление об отмене заказа.
 *
 * `notificationType` = `ORDER_CANCELLED`
 */
export interface OrderCancelledNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор заказа.
     * @format int64
     */
    orderId: number
    /**
     * Идентификатор магазина.
     * @format int64
     */
    campaignId: number
    /** Список товаров в заказе. */
    items: NotificationOrderItemDTO[]
    /**
     * Дата и время отмены заказа.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    cancelledAt: string
}

/**
 * Уведомление о создании заявки на отмену заказа (для DBS-магазинов).
 *
 * `notificationType` = `ORDER_CANCELLATION_REQUEST`
 *
 * {% note tip "Чтобы подтвердить или отклонить заявку" %}
 *
 * Используйте метод [PUT campaigns/{campaignId}/orders/{orderId}/cancellation/accept](../../reference/orders/acceptOrderCancellation.md).
 *
 * {% endnote %}
 */
export interface OrderCancellationRequestNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор заказа.
     * @format int64
     */
    orderId: number
    /**
     * Идентификатор магазина.
     * @format int64
     */
    campaignId: number
    /**
     * Дата и время создания заявки на отмену заказа.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    requestedAt: string
}

/**
 * Уведомление о создании нового невыкупа или возврата.
 *
 * `notificationType` = `ORDER_RETURN_CREATED`
 *
 * {% note tip "Чтобы получить подробную информацию о невыкупе или возврате" %}
 *
 * Используйте метод [GET campaigns/{campaignId}/orders/{orderId}/returns/{returnId}](../../reference/orders/getReturn.md).
 *
 * {% endnote %}
 */
export interface OrderReturnCreatedNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор заказа.
     * @format int64
     */
    orderId: number
    /**
     * Идентификатор невыкупа или возврата.
     * @format int64
     */
    returnId: number
    /**
     * Тип заказа для фильтрации:
     *
     * * `UNREDEEMED` — невыкуп.
     *
     * * `RETURN` — возврат.
     *
     * Если не указывать, в ответе будут и невыкупы, и возвраты.
     */
    returnType: ReturnType
    /**
     * Идентификатор магазина.
     * @format int64
     */
    campaignId: number
    /** Список товаров в невыкупе или возврате. */
    items: NotificationReturnItemDTO[]
    /**
     * Дата и время создания невыкупа или возврата.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    createdAt: string
}

/**
 * Уведомление о смене статуса невыкупа или возврата.
 *
 * `notificationType` = `ORDER_RETURN_STATUS_UPDATED`
 *
 * {% note tip "Чтобы получить подробную информацию о невыкупе или возврате" %}
 *
 * Используйте метод [GET campaigns/{campaignId}/orders/{orderId}/returns/{returnId}](../../reference/orders/getReturn.md).
 *
 * {% endnote %}
 */
export interface OrderReturnStatusUpdatedNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор заказа.
     * @format int64
     */
    orderId: number
    /**
     * Идентификатор невыкупа или возврата.
     * @format int64
     */
    returnId: number
    /**
     * Идентификатор магазина.
     * @format int64
     */
    campaignId: number
    /**
     * Информация об обновлении статуса невыкупа или возврата.
     *
     * Возвращается только тот статус, который был изменен.
     *
     * Для невыкупов приходит только `shipmentStatus`.
     *
     * Параметр `shipmentStatus` не приходит для возвратов с опцией **Быстрый возврат денег за дешевый брак**, когда товар остается у покупателя.
     */
    statuses: NotificationUpdatedReturnStatusesDTO
    /**
     * Дата и время изменения статуса невыкупа или возврата.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    updatedAt: string
}

/**
 * Уведомление о создании нового отзыва о товаре.
 *
 * `notificationType` = `GOODS_FEEDBACK_CREATED`
 *
 * Маркет отправляет уведомления об отзывах, только когда они прошли модерацию и опубликованы.
 *
 * {% note tip "Чтобы получить подробную информацию об отзывах" %}
 *
 * Используйте метод [POST businesses/{businessId}/goods-feedback](../../reference/goods-feedback/getGoodsFeedbacks.md), где укажите их идентификаторы в параметре `feedbackIds`.
 *
 * Получить информацию не получится, если покупатель или Маркет удалил отзыв.
 *
 * {% endnote %}
 */
export interface GoodsFeedbackCreatedNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор отзыва.
     * @format int64
     */
    feedbackId: number
    /**
     * Идентификатор кабинета.
     * @format int64
     */
    businessId: number
    /**
     * Дата и время создания отзыва.
     *
     * Может отличаться от информации в `publishedAt`, так как некоторое время отзыв проходит модерацию.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    createdAt: string
    /**
     * Дата и время публикации отзыва.
     *
     * Может отличаться от информации в `createdAt`, так как некоторое время отзыв проходит модерацию.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    publishedAt: string
}

/**
 * Уведомление о создании нового комментария к отзыву.
 *
 * `notificationType` = `GOODS_FEEDBACK_COMMENT_CREATED`
 *
 * {% note tip "Чтобы получить подробную информацию о комментариях к отзыву" %}
 *
 * Используйте метод [POST businesses/{businessId}/goods-feedback/comments](../../reference/goods-feedback/getGoodsFeedbackComments.md), где укажите их идентификаторы в параметре `commentIds`.
 *
 * Получить информацию не получится, если пользователь или Маркет удалил комментарий или отзыв, к которому он добавлен.
 *
 * {% endnote %}
 */
export interface GoodsFeedbackCommentCreatedNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор комментария к отзыву.
     * @format int64
     */
    commentId: number
    /**
     * Идентификатор кабинета.
     * @format int64
     */
    businessId: number
    /**
     * Дата и время создания комментария.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    createdAt: string
}

/**
 * Уведомление о создании нового чата с покупателем.
 *
 * `notificationType` = `CHAT_CREATED`
 *
 * {% note tip "Чтобы получить чат с покупателем" %}
 *
 * Используйте метод [GET businesses/{businessId}/chat](../../reference/chats/getChat.md), где укажите идентификатор чата в параметре `chatId`.
 *
 * {% endnote %}
 */
export interface ChatCreatedNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор чата.
     * @format int64
     */
    chatId: number
    /**
     * Идентификатор кабинета.
     * @format int64
     */
    businessId: number
    /**
     * Дата и время создания чата.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    createdAt: string
}

/**
 * Уведомление о новом сообщении в чате.
 *
 * `notificationType` = `CHAT_MESSAGE_SENT`
 *
 * {% note tip "Чтобы получить сообщение от покупателя" %}
 *
 * Используйте метод [GET businesses/{businessId}/chats/message](../../reference/chats/getChatMessage.md), где укажите идентификаторы:
 *
 * * чата — `chatId`;
 * * сообщения — `messageId`.
 *
 * {% endnote %}
 */
export interface ChatMessageSentNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор чата.
     * @format int64
     */
    chatId: number
    /** Идентификатор сообщения. */
    messageId: string
    /**
     * Идентификатор кабинета.
     * @format int64
     */
    businessId: number
    /**
     * Дата и время отправки сообщения.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    sentAt: string
}

/**
 * Уведомление о начале спора.
 *
 * `notificationType` = `CHAT_ARBITRAGE_STARTED`
 */
export interface ChatArbitrageStartedNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор чата.
     * @format int64
     */
    chatId: number
    /**
     * Идентификатор кабинета.
     * @format int64
     */
    businessId: number
    /**
     * Дата и время начала спора.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    startedAt: string
}

/**
 * Уведомление о завершении спора.
 *
 * `notificationType` = `CHAT_ARBITRAGE_FINISHED`
 */
export interface ChatArbitrageFinishedNotificationDTO {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
    /**
     * Идентификатор чата.
     * @format int64
     */
    chatId: number
    /**
     * Идентификатор кабинета.
     * @format int64
     */
    businessId: number
    /**
     * Дата и время завершения спора.
     *
     * Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:00:00.213Z`.
     * @format date-time
     */
    finishedAt: string
}

/**
 * Тип уведомления:
 *
 * * `PING` — проверочное уведомление.
 * * `ORDER_CREATED` — создан новый заказ.
 * * `ORDER_CANCELLED` — заказ отменен.
 * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
 * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
 * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
 * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
 * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
 * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
 * * `CHAT_CREATED` — создан новый чат с покупателем.
 * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
 * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
 * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
 */
export enum NotificationType {
    PING = 'PING',
    ORDER_CREATED = 'ORDER_CREATED',
    ORDER_CANCELLED = 'ORDER_CANCELLED',
    ORDER_STATUS_UPDATED = 'ORDER_STATUS_UPDATED',
    ORDER_RETURN_CREATED = 'ORDER_RETURN_CREATED',
    ORDER_CANCELLATION_REQUEST = 'ORDER_CANCELLATION_REQUEST',
    ORDER_RETURN_STATUS_UPDATED = 'ORDER_RETURN_STATUS_UPDATED',
    GOODS_FEEDBACK_CREATED = 'GOODS_FEEDBACK_CREATED',
    GOODS_FEEDBACK_COMMENT_CREATED = 'GOODS_FEEDBACK_COMMENT_CREATED',
    CHAT_CREATED = 'CHAT_CREATED',
    CHAT_MESSAGE_SENT = 'CHAT_MESSAGE_SENT',
    CHAT_ARBITRAGE_STARTED = 'CHAT_ARBITRAGE_STARTED',
    CHAT_ARBITRAGE_FINISHED = 'CHAT_ARBITRAGE_FINISHED'
}

/**
 * Ошибка при обработке уведомления.
 * @example {"type":"UNKNOWN","message":"message"}
 */
export interface NotificationApiErrorDTO {
    /**
     * Тип ошибки:
     *
     * * `UNKNOWN` — неизвестная ошибка.
     * * `WRONG_EVENT_FORMAT` — неправильный тип уведомления.
     * * `DUPLICATED_EVENT` — дублирующее уведомление.
     */
    type?: NotificationApiErrorType
    /** Описание ошибки. */
    message?: string
}

/** Информация о товаре в заказе. */
export interface NotificationOrderItemDTO {
    /**
     * Ваш SKU — идентификатор товара в вашей системе.
     *
     * Правила использования SKU:
     *
     * * У каждого товара SKU должен быть свой.
     *
     * * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.
     *
     * SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).
     *
     * [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
     * @minLength 1
     * @maxLength 255
     * @pattern ^(?=.*\S.*)[^\x00-\x08\x0A-\x1f\x7f]{1,255}$
     */
    offerId: string
    /** Количество товара. */
    count: number
}

/**
 * Статус заказа:
 *
 * * `PLACING` — оформляется, подготовка к резервированию.
 *
 * * `RESERVED` — зарезервирован, но недооформлен.
 *
 * * `UNPAID` — оформлен, но еще не оплачен (если выбрана оплата при оформлении).
 *
 * * `PROCESSING` — находится в обработке.
 *
 * * `DELIVERY` — передан в службу доставки.
 *
 * * `PICKUP` — доставлен в пункт самовывоза.
 *
 * * `DELIVERED` — получен покупателем.
 *
 * * `CANCELLED` — отменен.
 *
 * * `PENDING` — ожидает обработки со стороны продавца.
 *
 * * `PARTIALLY_RETURNED` — возвращен частично.
 *
 * * `RETURNED` — возвращен полностью.
 *
 * * `UNKNOWN` — неизвестный статус.
 *
 * Также могут возвращаться другие значения. Обрабатывать их не требуется.
 */
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
    UNKNOWN = 'UNKNOWN'
}

/**
 * Этап обработки заказа (если он имеет статус `PROCESSING`) или причина отмены заказа (если он имеет статус `CANCELLED`).
 *
 * * Значения для заказа в статусе `PROCESSING`:
 *
 *     * `STARTED` — заказ подтвержден, его можно начать обрабатывать.
 *
 *     * `READY_TO_SHIP` — заказ собран и готов к отправке.
 *
 * * Значения для заказа в статусе `CANCELLED`:
 *
 *     * `RESERVATION_EXPIRED` — покупатель не завершил оформление зарезервированного заказа в течение 10 минут.
 *
 *     * `USER_NOT_PAID` — покупатель не оплатил заказ (для типа оплаты `PREPAID`) в течение 30 минут.
 *
 *     * `USER_UNREACHABLE` — не удалось связаться с покупателем. Для отмены с этой причиной необходимо выполнить условия:
 *
 *       * не менее 3 звонков с 8 до 21 в часовом поясе покупателя;
 *       * перерыв между первым и третьим звонком не менее 90 минут;
 *       * соединение не короче 5 секунд.
 *
 *       Если хотя бы одно из этих условий не выполнено (кроме случая, когда номер недоступен), отменить заказ не получится. Вернется ответ с кодом ошибки 400.
 *
 *     * `USER_CHANGED_MIND` — покупатель отменил заказ по личным причинам.
 *
 *     * `USER_REFUSED_DELIVERY` — покупателя не устроили условия доставки.
 *
 *     * `USER_REFUSED_PRODUCT` — покупателю не подошел товар.
 *
 *     * `SHOP_FAILED` — магазин не может выполнить заказ.
 *
 *     * `USER_REFUSED_QUALITY` — покупателя не устроило качество товара.
 *
 *     * `REPLACING_ORDER` — покупатель решил заменить товар другим по собственной инициативе.
 *
 *     * `PROCESSING_EXPIRED` — значение более не используется.
 *
 *     * `PICKUP_EXPIRED` — закончился срок хранения заказа в ПВЗ.
 *
 *     * `TOO_MANY_DELIVERY_DATE_CHANGES` — заказ переносили слишком много раз.
 *
 *     * `TOO_LONG_DELIVERY` — заказ доставляется слишком долго.
 *
 *
 * * `TECHNICAL_ERROR` — техническая ошибка на стороне Маркета. Обратитесь в поддержку.
 *
 * Также могут возвращаться другие значения. Обрабатывать их не требуется.
 */
export enum OrderSubstatusType {
    RESERVATION_EXPIRED = 'RESERVATION_EXPIRED',
    USER_NOT_PAID = 'USER_NOT_PAID',
    USER_UNREACHABLE = 'USER_UNREACHABLE',
    USER_CHANGED_MIND = 'USER_CHANGED_MIND',
    USER_REFUSED_DELIVERY = 'USER_REFUSED_DELIVERY',
    USER_REFUSED_PRODUCT = 'USER_REFUSED_PRODUCT',
    SHOP_FAILED = 'SHOP_FAILED',
    USER_REFUSED_QUALITY = 'USER_REFUSED_QUALITY',
    REPLACING_ORDER = 'REPLACING_ORDER',
    PROCESSING_EXPIRED = 'PROCESSING_EXPIRED',
    PENDING_EXPIRED = 'PENDING_EXPIRED',
    SHOP_PENDING_CANCELLED = 'SHOP_PENDING_CANCELLED',
    PENDING_CANCELLED = 'PENDING_CANCELLED',
    USER_FRAUD = 'USER_FRAUD',
    RESERVATION_FAILED = 'RESERVATION_FAILED',
    USER_PLACED_OTHER_ORDER = 'USER_PLACED_OTHER_ORDER',
    USER_BOUGHT_CHEAPER = 'USER_BOUGHT_CHEAPER',
    MISSING_ITEM = 'MISSING_ITEM',
    BROKEN_ITEM = 'BROKEN_ITEM',
    WRONG_ITEM = 'WRONG_ITEM',
    PICKUP_EXPIRED = 'PICKUP_EXPIRED',
    DELIVERY_PROBLEMS = 'DELIVERY_PROBLEMS',
    LATE_CONTACT = 'LATE_CONTACT',
    CUSTOM = 'CUSTOM',
    DELIVERY_SERVICE_FAILED = 'DELIVERY_SERVICE_FAILED',
    WAREHOUSE_FAILED_TO_SHIP = 'WAREHOUSE_FAILED_TO_SHIP',
    DELIVERY_SERIVCE_UNDELIVERED = 'DELIVERY_SERIVCE_UNDELIVERED',
    DELIVERY_SERVICE_UNDELIVERED = 'DELIVERY_SERVICE_UNDELIVERED',
    PREORDER = 'PREORDER',
    AWAIT_CONFIRMATION = 'AWAIT_CONFIRMATION',
    STARTED = 'STARTED',
    PACKAGING = 'PACKAGING',
    READY_TO_SHIP = 'READY_TO_SHIP',
    SHIPPED = 'SHIPPED',
    ASYNC_PROCESSING = 'ASYNC_PROCESSING',
    USER_REFUSED_TO_PROVIDE_PERSONAL_DATA = 'USER_REFUSED_TO_PROVIDE_PERSONAL_DATA',
    WAITING_USER_INPUT = 'WAITING_USER_INPUT',
    WAITING_BANK_DECISION = 'WAITING_BANK_DECISION',
    BANK_REJECT_CREDIT_OFFER = 'BANK_REJECT_CREDIT_OFFER',
    CUSTOMER_REJECT_CREDIT_OFFER = 'CUSTOMER_REJECT_CREDIT_OFFER',
    CREDIT_OFFER_FAILED = 'CREDIT_OFFER_FAILED',
    AWAIT_DELIVERY_DATES_CONFIRMATION = 'AWAIT_DELIVERY_DATES_CONFIRMATION',
    SERVICE_FAULT = 'SERVICE_FAULT',
    DELIVERY_SERVICE_RECEIVED = 'DELIVERY_SERVICE_RECEIVED',
    USER_RECEIVED = 'USER_RECEIVED',
    WAITING_FOR_STOCKS = 'WAITING_FOR_STOCKS',
    AS_PART_OF_MULTI_ORDER = 'AS_PART_OF_MULTI_ORDER',
    READY_FOR_LAST_MILE = 'READY_FOR_LAST_MILE',
    LAST_MILE_STARTED = 'LAST_MILE_STARTED',
    ANTIFRAUD = 'ANTIFRAUD',
    DELIVERY_USER_NOT_RECEIVED = 'DELIVERY_USER_NOT_RECEIVED',
    DELIVERY_SERVICE_DELIVERED = 'DELIVERY_SERVICE_DELIVERED',
    DELIVERED_USER_NOT_RECEIVED = 'DELIVERED_USER_NOT_RECEIVED',
    USER_WANTED_ANOTHER_PAYMENT_METHOD = 'USER_WANTED_ANOTHER_PAYMENT_METHOD',
    USER_RECEIVED_TECHNICAL_ERROR = 'USER_RECEIVED_TECHNICAL_ERROR',
    USER_FORGOT_TO_USE_BONUS = 'USER_FORGOT_TO_USE_BONUS',
    RECEIVED_ON_DISTRIBUTION_CENTER = 'RECEIVED_ON_DISTRIBUTION_CENTER',
    DELIVERY_SERVICE_NOT_RECEIVED = 'DELIVERY_SERVICE_NOT_RECEIVED',
    DELIVERY_SERVICE_LOST = 'DELIVERY_SERVICE_LOST',
    SHIPPED_TO_WRONG_DELIVERY_SERVICE = 'SHIPPED_TO_WRONG_DELIVERY_SERVICE',
    DELIVERED_USER_RECEIVED = 'DELIVERED_USER_RECEIVED',
    WAITING_TINKOFF_DECISION = 'WAITING_TINKOFF_DECISION',
    COURIER_SEARCH = 'COURIER_SEARCH',
    COURIER_FOUND = 'COURIER_FOUND',
    COURIER_IN_TRANSIT_TO_SENDER = 'COURIER_IN_TRANSIT_TO_SENDER',
    COURIER_ARRIVED_TO_SENDER = 'COURIER_ARRIVED_TO_SENDER',
    COURIER_RECEIVED = 'COURIER_RECEIVED',
    COURIER_NOT_FOUND = 'COURIER_NOT_FOUND',
    COURIER_NOT_DELIVER_ORDER = 'COURIER_NOT_DELIVER_ORDER',
    COURIER_RETURNS_ORDER = 'COURIER_RETURNS_ORDER',
    COURIER_RETURNED_ORDER = 'COURIER_RETURNED_ORDER',
    WAITING_USER_DELIVERY_INPUT = 'WAITING_USER_DELIVERY_INPUT',
    PICKUP_SERVICE_RECEIVED = 'PICKUP_SERVICE_RECEIVED',
    PICKUP_USER_RECEIVED = 'PICKUP_USER_RECEIVED',
    CANCELLED_COURIER_NOT_FOUND = 'CANCELLED_COURIER_NOT_FOUND',
    COURIER_NOT_COME_FOR_ORDER = 'COURIER_NOT_COME_FOR_ORDER',
    DELIVERY_NOT_MANAGED_REGION = 'DELIVERY_NOT_MANAGED_REGION',
    INCOMPLETE_CONTACT_INFORMATION = 'INCOMPLETE_CONTACT_INFORMATION',
    INCOMPLETE_MULTI_ORDER = 'INCOMPLETE_MULTI_ORDER',
    INAPPROPRIATE_WEIGHT_SIZE = 'INAPPROPRIATE_WEIGHT_SIZE',
    TECHNICAL_ERROR = 'TECHNICAL_ERROR',
    SORTING_CENTER_LOST = 'SORTING_CENTER_LOST',
    COURIER_SEARCH_NOT_STARTED = 'COURIER_SEARCH_NOT_STARTED',
    LOST = 'LOST',
    AWAIT_PAYMENT = 'AWAIT_PAYMENT',
    AWAIT_LAVKA_RESERVATION = 'AWAIT_LAVKA_RESERVATION',
    USER_WANTS_TO_CHANGE_ADDRESS = 'USER_WANTS_TO_CHANGE_ADDRESS',
    FULL_NOT_RANSOM = 'FULL_NOT_RANSOM',
    PRESCRIPTION_MISMATCH = 'PRESCRIPTION_MISMATCH',
    DROPOFF_LOST = 'DROPOFF_LOST',
    DROPOFF_CLOSED = 'DROPOFF_CLOSED',
    DELIVERY_TO_STORE_STARTED = 'DELIVERY_TO_STORE_STARTED',
    USER_WANTS_TO_CHANGE_DELIVERY_DATE = 'USER_WANTS_TO_CHANGE_DELIVERY_DATE',
    WRONG_ITEM_DELIVERED = 'WRONG_ITEM_DELIVERED',
    DAMAGED_BOX = 'DAMAGED_BOX',
    AWAIT_DELIVERY_DATES = 'AWAIT_DELIVERY_DATES',
    LAST_MILE_COURIER_SEARCH = 'LAST_MILE_COURIER_SEARCH',
    PICKUP_POINT_CLOSED = 'PICKUP_POINT_CLOSED',
    LEGAL_INFO_CHANGED = 'LEGAL_INFO_CHANGED',
    USER_HAS_NO_TIME_TO_PICKUP_ORDER = 'USER_HAS_NO_TIME_TO_PICKUP_ORDER',
    DELIVERY_CUSTOMS_ARRIVED = 'DELIVERY_CUSTOMS_ARRIVED',
    DELIVERY_CUSTOMS_CLEARED = 'DELIVERY_CUSTOMS_CLEARED',
    FIRST_MILE_DELIVERY_SERVICE_RECEIVED = 'FIRST_MILE_DELIVERY_SERVICE_RECEIVED',
    AWAIT_AUTO_DELIVERY_DATES = 'AWAIT_AUTO_DELIVERY_DATES',
    AWAIT_USER_PERSONAL_DATA = 'AWAIT_USER_PERSONAL_DATA',
    NO_PERSONAL_DATA_EXPIRED = 'NO_PERSONAL_DATA_EXPIRED',
    CUSTOMS_PROBLEMS = 'CUSTOMS_PROBLEMS',
    AWAIT_CASHIER = 'AWAIT_CASHIER',
    WAITING_POSTPAID_BUDGET_RESERVATION = 'WAITING_POSTPAID_BUDGET_RESERVATION',
    AWAIT_SERVICEABLE_CONFIRMATION = 'AWAIT_SERVICEABLE_CONFIRMATION',
    POSTPAID_BUDGET_RESERVATION_FAILED = 'POSTPAID_BUDGET_RESERVATION_FAILED',
    AWAIT_CUSTOM_PRICE_CONFIRMATION = 'AWAIT_CUSTOM_PRICE_CONFIRMATION',
    READY_FOR_PICKUP = 'READY_FOR_PICKUP',
    TOO_MANY_DELIVERY_DATE_CHANGES = 'TOO_MANY_DELIVERY_DATE_CHANGES',
    TOO_LONG_DELIVERY = 'TOO_LONG_DELIVERY',
    UNKNOWN = 'UNKNOWN'
}

/**
 * Тип заказа для фильтрации:
 *
 * * `UNREDEEMED` — невыкуп.
 *
 * * `RETURN` — возврат.
 *
 * Если не указывать, в ответе будут и невыкупы, и возвраты.
 */
export enum ReturnType {
    UNREDEEMED = 'UNREDEEMED',
    RETURN = 'RETURN'
}

/** Информация о товаре в невыкупе или возврате. */
export interface NotificationReturnItemDTO {
    /**
     * Ваш SKU — идентификатор товара в вашей системе.
     *
     * Правила использования SKU:
     *
     * * У каждого товара SKU должен быть свой.
     *
     * * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.
     *
     * SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).
     *
     * [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
     * @minLength 1
     * @maxLength 255
     * @pattern ^(?=.*\S.*)[^\x00-\x08\x0A-\x1f\x7f]{1,255}$
     */
    offerId: string
    /** Количество товара. */
    count: number
}

/**
 * Информация об обновлении статуса невыкупа или возврата.
 *
 * Возвращается только тот статус, который был изменен.
 *
 * Для невыкупов приходит только `shipmentStatus`.
 *
 * Параметр `shipmentStatus` не приходит для возвратов с опцией **Быстрый возврат денег за дешевый брак**, когда товар остается у покупателя.
 */
export interface NotificationUpdatedReturnStatusesDTO {
    /**
     * Статус возврата денег:
     *
     * * `STARTED_BY_USER` — создан клиентом из личного кабинета.
     *
     * * `REFUND_IN_PROGRESS` — ждет решение о возврате денег.
     *
     * * `REFUNDED` — по возврату проведены все возвратные денежные транзакции.
     *
     * * `FAILED` — невозможно провести возврат покупателю.
     *
     * * `WAITING_FOR_DECISION` — ожидает решения.
     *
     * * `DECISION_MADE` — по возврату принято решение.
     *
     * * `REFUNDED_WITH_BONUSES` — возврат осуществлен баллами Плюса или промокодом.
     *
     * * `REFUNDED_BY_SHOP` — магазин сделал самостоятельно возврат денег.
     *
     * * `COMPLETE_WITHOUT_REFUND` — возврат денег не требуется.
     *
     * * `CANCELLED` — возврат отменен.
     *
     * * `UNKNOWN` — неизвестный статус.
     */
    refundStatus?: RefundStatusType
    /**
     * Статус передачи возврата:
     *
     * * `CREATED` — возврат создан.
     *
     * * `RECEIVED` — принят у покупателя.
     *
     * * `IN_TRANSIT` — возврат в пути.
     *
     * * `READY_FOR_PICKUP` — возврат готов к выдаче магазину.
     *
     * * `PICKED` — возврат выдан магазину.
     *
     * * `LOST` — возврат утерян при транспортировке.
     *
     * * `EXPIRED` — покупатель не принес товар на возврат вовремя.
     *
     * * `CANCELLED` — возврат отменен.
     *
     * * `FULFILMENT_RECEIVED` — возврат принят на складе Маркета.
     *
     * * `PREPARED_FOR_UTILIZATION` — возврат передан в утилизацию.
     *
     * * `NOT_IN_DEMAND` — возврат не забрали с почты.
     *
     * * `UTILIZED` — возврат утилизирован.
     *
     * * `READY_FOR_EXPROPRIATION` — товары в возврате направлены на перепродажу.
     *
     * * `RECEIVED_FOR_EXPROPRIATION` — товары в возврате приняты для перепродажи.
     *
     * * `UNKNOWN` — неизвестный статус.
     */
    shipmentStatus?: ReturnShipmentStatusType
}

/**
 * Идентификатор отзыва.
 * @format int64
 */
export type GoodsFeedbackId = number

/**
 * Идентификатор комментария к отзыву.
 * @format int64
 */
export type GoodsFeedbackCommentId = number

/**
 * Тип ошибки:
 *
 * * `UNKNOWN` — неизвестная ошибка.
 * * `WRONG_EVENT_FORMAT` — неправильный тип уведомления.
 * * `DUPLICATED_EVENT` — дублирующее уведомление.
 */
export enum NotificationApiErrorType {
    UNKNOWN = 'UNKNOWN',
    WRONG_EVENT_FORMAT = 'WRONG_EVENT_FORMAT',
    DUPLICATED_EVENT = 'DUPLICATED_EVENT'
}

/**
 * Ваш SKU — идентификатор товара в вашей системе.
 *
 * Правила использования SKU:
 *
 * * У каждого товара SKU должен быть свой.
 *
 * * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.
 *
 * SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).
 *
 * [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
 * @minLength 1
 * @maxLength 255
 * @pattern ^(?=.*\S.*)[^\x00-\x08\x0A-\x1f\x7f]{1,255}$
 */
export type ShopSku = string

/**
 * Статус возврата денег:
 *
 * * `STARTED_BY_USER` — создан клиентом из личного кабинета.
 *
 * * `REFUND_IN_PROGRESS` — ждет решение о возврате денег.
 *
 * * `REFUNDED` — по возврату проведены все возвратные денежные транзакции.
 *
 * * `FAILED` — невозможно провести возврат покупателю.
 *
 * * `WAITING_FOR_DECISION` — ожидает решения.
 *
 * * `DECISION_MADE` — по возврату принято решение.
 *
 * * `REFUNDED_WITH_BONUSES` — возврат осуществлен баллами Плюса или промокодом.
 *
 * * `REFUNDED_BY_SHOP` — магазин сделал самостоятельно возврат денег.
 *
 * * `COMPLETE_WITHOUT_REFUND` — возврат денег не требуется.
 *
 * * `CANCELLED` — возврат отменен.
 *
 * * `UNKNOWN` — неизвестный статус.
 */
export enum RefundStatusType {
    STARTED_BY_USER = 'STARTED_BY_USER',
    REFUND_IN_PROGRESS = 'REFUND_IN_PROGRESS',
    REFUNDED = 'REFUNDED',
    FAILED = 'FAILED',
    WAITING_FOR_DECISION = 'WAITING_FOR_DECISION',
    DECISION_MADE = 'DECISION_MADE',
    REFUNDED_WITH_BONUSES = 'REFUNDED_WITH_BONUSES',
    REFUNDED_BY_SHOP = 'REFUNDED_BY_SHOP',
    CANCELLED = 'CANCELLED',
    COMPLETE_WITHOUT_REFUND = 'COMPLETE_WITHOUT_REFUND',
    UNKNOWN = 'UNKNOWN'
}

/**
 * Статус передачи возврата:
 *
 * * `CREATED` — возврат создан.
 *
 * * `RECEIVED` — принят у покупателя.
 *
 * * `IN_TRANSIT` — возврат в пути.
 *
 * * `READY_FOR_PICKUP` — возврат готов к выдаче магазину.
 *
 * * `PICKED` — возврат выдан магазину.
 *
 * * `LOST` — возврат утерян при транспортировке.
 *
 * * `EXPIRED` — покупатель не принес товар на возврат вовремя.
 *
 * * `CANCELLED` — возврат отменен.
 *
 * * `FULFILMENT_RECEIVED` — возврат принят на складе Маркета.
 *
 * * `PREPARED_FOR_UTILIZATION` — возврат передан в утилизацию.
 *
 * * `NOT_IN_DEMAND` — возврат не забрали с почты.
 *
 * * `UTILIZED` — возврат утилизирован.
 *
 * * `READY_FOR_EXPROPRIATION` — товары в возврате направлены на перепродажу.
 *
 * * `RECEIVED_FOR_EXPROPRIATION` — товары в возврате приняты для перепродажи.
 *
 * * `UNKNOWN` — неизвестный статус.
 */
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
    UNKNOWN = 'UNKNOWN'
}

/**
 * Содержимое уведомления с информацией о произошедшем событии.
 * @example {"notificationType":"PING"}
 */
interface BaseSendNotificationRequest {
    /**
     * Тип уведомления:
     *
     * * `PING` — проверочное уведомление.
     * * `ORDER_CREATED` — создан новый заказ.
     * * `ORDER_CANCELLED` — заказ отменен.
     * * `ORDER_STATUS_UPDATED` — статус заказа изменен.
     * * `ORDER_RETURN_CREATED` — создан новый невыкуп или возврат.
     * * `ORDER_CANCELLATION_REQUEST` — создана заявка на отмену заказа (для DBS-магазинов).
     * * `ORDER_RETURN_STATUS_UPDATED` — статус невыкупа или возврата изменен.
     * * `GOODS_FEEDBACK_CREATED` — создан новый отзыв о товаре.
     * * `GOODS_FEEDBACK_COMMENT_CREATED` — создан новый комментарий к отзыву о товаре.
     * * `CHAT_CREATED` — создан новый чат с покупателем.
     * * `CHAT_MESSAGE_SENT` — добавлено новое сообщение в чате.
     * * `CHAT_ARBITRAGE_STARTED` — по обращению покупателя начался спор.
     * * `CHAT_ARBITRAGE_FINISHED` — спор завершен.
     */
    notificationType: NotificationType
}

type BaseSendNotificationRequestNotificationTypeMapping<Key, Type> = {
    notificationType: Key
} & Type
