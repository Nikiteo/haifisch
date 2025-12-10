/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable no-irregular-whitespace */
/**
 *
 * @export
 * @interface AcceptOrderCancellationRequest
 */
export interface AcceptOrderCancellationRequest {
	/**
	 * Решение об отмене заказа:  * `true` — заказ отменяется, служба доставки узнала об отмене до передачи заказа покупателю. * `false` — заказ не отменяется, так как он уже доставлен покупателю курьером или передан в пункт выдачи заказов.
	 * @type {boolean}
	 * @memberof AcceptOrderCancellationRequest
	 */
	accepted: boolean
	/**
	 *
	 * @type {OrderCancellationReasonType}
	 * @memberof AcceptOrderCancellationRequest
	 */
	reason?: OrderCancellationReasonType
}

/**
 * Запрос на скрытие оферов.
 * @export
 * @interface AddHiddenOffersRequest
 */
export interface AddHiddenOffersRequest {
	/**
	 * Список скрытых товаров.
	 * @type {Array<HiddenOfferDTO>}
	 * @memberof AddHiddenOffersRequest
	 */
	hiddenOffers: HiddenOfferDTO[]
}
/**
 * Товары, которые не удалось поместить в архив.
 * @export
 * @interface AddOffersToArchiveDTO
 */
export interface AddOffersToArchiveDTO {
	/**
	 * Список товаров, которые не удалось поместить в архив.
	 * @type {Array<AddOffersToArchiveErrorDTO>}
	 * @memberof AddOffersToArchiveDTO
	 */
	notArchivedOffers?: AddOffersToArchiveErrorDTO[] | null
}
/**
 * Товар, который не удалось поместить в архив.
 * @export
 * @interface AddOffersToArchiveErrorDTO
 */
export interface AddOffersToArchiveErrorDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof AddOffersToArchiveErrorDTO
	 */
	offerId: string
	/**
	 *
	 * @type {AddOffersToArchiveErrorType}
	 * @memberof AddOffersToArchiveErrorDTO
	 */
	error: AddOffersToArchiveErrorType
}

/**
 * Причина, по которой товар не удалось поместить в архив:  * `OFFER_HAS_STOCKS` — товар хранится на складе Маркета.  * `UNKNOWN` — неизвестная причина ошибки. Скорее всего произошел сбой на стороне Маркета. Если ошибка повторяется долгое время, обратитесь в поддержку.
 * @export
 * @enum {string}
 */

export const AddOffersToArchiveErrorType = {
	OfferHasStocks: 'OFFER_HAS_STOCKS',
	Unknown: 'UNKNOWN',
} as const

export type AddOffersToArchiveErrorType =
	(typeof AddOffersToArchiveErrorType)[keyof typeof AddOffersToArchiveErrorType]

/**
 * Товары, которые нужно поместить в архив.
 * @export
 * @interface AddOffersToArchiveRequest
 */
export interface AddOffersToArchiveRequest {
	/**
	 * Список товаров, которые нужно поместить в архив.
	 * @type {Array<string>}
	 * @memberof AddOffersToArchiveRequest
	 */
	offerIds: string[]
}
/**
 * Результат архивации товаров.
 * @export
 * @interface AddOffersToArchiveResponse
 */
export interface AddOffersToArchiveResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof AddOffersToArchiveResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {AddOffersToArchiveDTO}
	 * @memberof AddOffersToArchiveResponse
	 */
	result?: AddOffersToArchiveDTO
}

/**
 * Составляющие индекса качества.  **Для модели DBS:** * `DBS_CANCELLATION_RATE` — доля отмененных товаров. * `DBS_LATE_DELIVERY_RATE` — доля заказов, доставленных после плановой даты.  **Для моделей FBS и Экспресс:** * `FBS_CANCELLATION_RATE` — доля отмененных товаров. * `FBS_LATE_SHIP_RATE` — доля не вовремя отгруженных заказов.
 * @export
 * @enum {string}
 */

export const AffectedOrderQualityRatingComponentType = {
	DbsCancellationRate: 'DBS_CANCELLATION_RATE',
	DbsLateDeliveryRate: 'DBS_LATE_DELIVERY_RATE',
	FbsCancellationRate: 'FBS_CANCELLATION_RATE',
	FbsLateShipRate: 'FBS_LATE_SHIP_RATE',
} as const

export type AffectedOrderQualityRatingComponentType =
	(typeof AffectedOrderQualityRatingComponentType)[keyof typeof AffectedOrderQualityRatingComponentType]

/**
 * Возраст в заданных единицах измерения.
 * @export
 * @interface AgeDTO
 */
export interface AgeDTO {
	/**
	 * Значение.
	 * @type {number}
	 * @memberof AgeDTO
	 */
	value: number
	/**
	 *
	 * @type {AgeUnitType}
	 * @memberof AgeDTO
	 */
	ageUnit: AgeUnitType
}

/**
 * Единицы измерения возраста:  * `YEAR` — год. * `MONTH` — месяц.
 * @export
 * @enum {string}
 */

export const AgeUnitType = {
	Year: 'YEAR',
	Month: 'MONTH',
} as const

export type AgeUnitType = (typeof AgeUnitType)[keyof typeof AgeUnitType]

/**
 * Ошибка в данных переданных от клиента.
 * @export
 * @interface ApiClientDataErrorResponse
 */
export interface ApiClientDataErrorResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof ApiClientDataErrorResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Список ошибок.
	 * @type {Array<ApiErrorDTO>}
	 * @memberof ApiClientDataErrorResponse
	 */
	errors?: ApiErrorDTO[] | null
}

/**
 * Общий формат ошибки.
 * @export
 * @interface ApiErrorDTO
 */
export interface ApiErrorDTO {
	/**
	 * Код ошибки.
	 * @type {string}
	 * @memberof ApiErrorDTO
	 */
	code: string
	/**
	 * Описание ошибки.
	 * @type {string}
	 * @memberof ApiErrorDTO
	 */
	message?: string
}
/**
 * Стандартная обертка для ошибок сервера.
 * @export
 * @interface ApiErrorResponse
 */
export interface ApiErrorResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof ApiErrorResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Список ошибок.
	 * @type {Array<ApiErrorDTO>}
	 * @memberof ApiErrorResponse
	 */
	errors?: ApiErrorDTO[] | null
}

/**
 * Неверны авторизационные данные, указанные в запросе, или запрещен доступ к запрашиваемому ресурсу.
 * @export
 * @interface ApiForbiddenErrorResponse
 */
export interface ApiForbiddenErrorResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof ApiForbiddenErrorResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Список ошибок.
	 * @type {Array<ApiErrorDTO>}
	 * @memberof ApiForbiddenErrorResponse
	 */
	errors?: ApiErrorDTO[] | null
}

/**
 * Превышено ограничение на доступ к ресурсу.
 * @export
 * @interface ApiLimitErrorResponse
 */
export interface ApiLimitErrorResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof ApiLimitErrorResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Список ошибок.
	 * @type {Array<ApiErrorDTO>}
	 * @memberof ApiLimitErrorResponse
	 */
	errors?: ApiErrorDTO[] | null
}

/**
 * Ресурс из запроса заблокирован от применения к нему указанного метода.
 * @export
 * @interface ApiLockedErrorResponse
 */
export interface ApiLockedErrorResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof ApiLockedErrorResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Список ошибок.
	 * @type {Array<ApiErrorDTO>}
	 * @memberof ApiLockedErrorResponse
	 */
	errors?: ApiErrorDTO[] | null
}

/**
 * Запрашиваемый ресурс не найден.
 * @export
 * @interface ApiNotFoundErrorResponse
 */
export interface ApiNotFoundErrorResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof ApiNotFoundErrorResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Список ошибок.
	 * @type {Array<ApiErrorDTO>}
	 * @memberof ApiNotFoundErrorResponse
	 */
	errors?: ApiErrorDTO[] | null
}

/**
 * Стандартная обертка для ответов сервера.
 * @export
 * @interface ApiResponse
 */
export interface ApiResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof ApiResponse
	 */
	status?: ApiResponseStatusType
}

/**
 * Тип ответа. Возможные значения: * `OK` — ошибок нет. * `ERROR` — при обработке запроса произошла ошибка.
 * @export
 * @enum {string}
 */

export const ApiResponseStatusType = {
	Ok: 'OK',
	Error: 'ERROR',
} as const

export type ApiResponseStatusType =
	(typeof ApiResponseStatusType)[keyof typeof ApiResponseStatusType]

/**
 * Внутренняя ошибка сервера.
 * @export
 * @interface ApiServerErrorResponse
 */
export interface ApiServerErrorResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof ApiServerErrorResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Список ошибок.
	 * @type {Array<ApiErrorDTO>}
	 * @memberof ApiServerErrorResponse
	 */
	errors?: ApiErrorDTO[] | null
}

/**
 * В запросе не указаны авторизационные данные.
 * @export
 * @interface ApiUnauthorizedErrorResponse
 */
export interface ApiUnauthorizedErrorResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof ApiUnauthorizedErrorResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Список ошибок.
	 * @type {Array<ApiErrorDTO>}
	 * @memberof ApiUnauthorizedErrorResponse
	 */
	errors?: ApiErrorDTO[] | null
}

/**
 * Информация о новой цене на товар.
 * @export
 * @interface BaseCampaignOfferDTO
 */
export interface BaseCampaignOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof BaseCampaignOfferDTO
	 */
	offerId: string
	/**
	 *
	 * @type {QuantumDTO}
	 * @memberof BaseCampaignOfferDTO
	 */
	quantum?: QuantumDTO
	/**
	 * Есть ли товар в продаже.
	 * @type {boolean}
	 * @memberof BaseCampaignOfferDTO
	 */
	available?: boolean
}
/**
 * Основные параметры товара.
 * @export
 * @interface BaseOfferDTO
 */
export interface BaseOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof BaseOfferDTO
	 */
	offerId: string
	/**
	 * Составляйте название по схеме: тип + бренд или производитель + модель + особенности, если есть (например, цвет, размер или вес) и количество в упаковке.  Не включайте в название условия продажи (например, «скидка», «бесплатная доставка» и т. д.), эмоциональные характеристики («хит», «супер» и т. д.). Не пишите слова большими буквами — кроме устоявшихся названий брендов и моделей.  Оптимальная длина — 50–60 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/title.html)
	 * @type {string}
	 * @memberof BaseOfferDTO
	 */
	name?: string
	/**
	 * Идентификатор категории на Маркете, к которой вы относите свой товар.  Если не указать `marketCategoryId`, то маркетная категория будет определена автоматически.  При изменении категории убедитесь, что характеристики товара и их значения в параметре `parameterValues` вы передаете для новой категории.  Список категорий Маркета можно получить с помощью запроса  [POST categories/tree](../../reference/categories/getCategoriesTree.md).
	 * @type {number}
	 * @memberof BaseOfferDTO
	 */
	marketCategoryId?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `marketCategoryId`.  {% endnote %}  Категория товара в вашем магазине.
	 * @type {string}
	 * @memberof BaseOfferDTO
	 * @deprecated
	 */
	category?: string
	/**
	 * Ссылки на изображения товара. Изображение по первой ссылке считается основным, остальные дополнительными.  **Требования к ссылкам**  * Ссылок может быть до 30. * Указывайте ссылку целиком, включая протокол http или https. * Максимальная длина — 512 символов. * Русские буквы в URL можно. * Можно использовать прямые ссылки на изображения и на Яндекс Диск. Ссылки на Яндекс Диске нужно копировать с помощью функции **Поделиться**. Относительные ссылки и ссылки на другие облачные хранилища — не работают.  ✅ `https://example-shop.ru/images/sku12345.jpg`  ✅ `https://yadi.sk/i/NaBoRsimVOLov`  ❌ `/images/sku12345.jpg`  ❌ `https://www.dropbox.com/s/818f/tovar.jpg`  Ссылки на изображение должны быть постоянными. Нельзя использовать динамические ссылки, меняющиеся от выгрузки к выгрузке.  Если нужно заменить изображение, выложите новое изображение по новой ссылке, а ссылку на старое удалите. Если просто заменить изображение по старой ссылке, оно не обновится.  [Требования к изображениям](https://yandex.ru/support/marketplace/assortment/fields/images.html)
	 * @type {Array<string>}
	 * @memberof BaseOfferDTO
	 */
	pictures?: string[] | null
	/**
	 * Ссылки (URL) на видео товара.  Максимальное количество ссылок — 6.  **Требования к ссылке**  * Указывайте ссылку целиком, включая протокол http или https. * Максимальная длина — 512 символов. * Русские буквы в URL можно. * Можно использовать прямые ссылки на видео и на Яндекс Диск. Ссылки на Яндекс Диске нужно копировать с помощью функции **Поделиться**. Относительные ссылки и ссылки на другие облачные хранилища — не работают.  ✅ `https://example-shop.ru/video/sku12345.avi`  ✅ `https://yadi.sk/i/NaBoRsimVOLov`  ❌ `/video/sku12345.avi`  ❌ `https://www.dropbox.com/s/818f/super-tovar.avi`  Ссылки на видео должны быть постоянными. Нельзя использовать динамические ссылки, меняющиеся от выгрузки к выгрузке.  Если нужно заменить видео, выложите новое видео по новой ссылке, а ссылку на старое удалите. Если просто заменить видео по старой ссылке, оно не обновится.  [Требования к видео](https://yandex.ru/support/marketplace/assortment/fields/video.html)
	 * @type {Array<string>}
	 * @memberof BaseOfferDTO
	 */
	videos?: string[] | null
	/**
	 * Список инструкций по использованию товара.  Максимальное количество инструкций — 6.  Если вы передадите пустое поле `manuals`, загруженные ранее инструкции удалятся.
	 * @type {Array<OfferManualDTO>}
	 * @memberof BaseOfferDTO
	 */
	manuals?: OfferManualDTO[] | null
	/**
	 * Название бренда или производителя. Должно быть записано так, как его пишет сам бренд.
	 * @type {string}
	 * @memberof BaseOfferDTO
	 */
	vendor?: string
	/**
	 * Указывайте в виде последовательности цифр. Подойдут коды EAN-13, EAN-8, UPC-A, UPC-E или Code 128.  Для книг указывайте ISBN.  Для товаров [определенных категорий и торговых марок](https://yastatic.net/s3/doc-binary/src/support/market/ru/yandex-market-list-for-gtin.xlsx) штрихкод должен быть действительным кодом GTIN. Обратите внимание: внутренние штрихкоды, начинающиеся на 2 или 02, и коды формата Code 128 не являются GTIN.  [Что такое GTIN](*gtin)
	 * @type {Array<string>}
	 * @memberof BaseOfferDTO
	 */
	barcodes?: string[] | null
	/**
	 * Подробное описание товара: например, его преимущества и особенности.  Не давайте в описании инструкций по установке и сборке. Не используйте слова «скидка», «распродажа», «дешевый», «подарок» (кроме подарочных категорий), «бесплатно», «акция», «специальная цена», «новинка», «new», «аналог», «заказ», «хит». Не указывайте никакой контактной информации и не давайте ссылок.  Можно использовать теги:  * \\<h>, \\<h1>, \\<h2> и так далее — для заголовков; * \\<br> и \\<p> — для переноса строки; * \\<ol> — для нумерованного списка; * \\<ul> — для маркированного списка; * \\<li> — для создания элементов списка (должен находиться внутри \\<ol> или \\<ul>); * \\<div> — поддерживается, но не влияет на отображение текста.  Оптимальная длина — 400–600 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/description.html)
	 * @type {string}
	 * @memberof BaseOfferDTO
	 */
	description?: string
	/**
	 * Страна, где был произведен товар.  Записывайте названия стран так, как они записаны в [списке](https://yastatic.net/s3/doc-binary/src/support/market/ru/countries.xlsx).
	 * @type {Array<string>}
	 * @memberof BaseOfferDTO
	 */
	manufacturerCountries?: string[] | null
	/**
	 *
	 * @type {OfferWeightDimensionsDTO}
	 * @memberof BaseOfferDTO
	 */
	weightDimensions?: OfferWeightDimensionsDTO
	/**
	 * Артикул товара от производителя.
	 * @type {string}
	 * @memberof BaseOfferDTO
	 */
	vendorCode?: string
	/**
	 * Метки товара, которые использует магазин. Покупателям теги не видны. По тегам можно группировать и фильтровать разные товары в каталоге — например, товары одной серии, коллекции или линейки.  Максимальная длина тега 20 символов. У одного товара может быть максимум 10 тегов. Всего можно создать не больше 50 разных тегов.
	 * @type {Array<string>}
	 * @memberof BaseOfferDTO
	 */
	tags?: string[] | null
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof BaseOfferDTO
	 */
	shelfLife?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof BaseOfferDTO
	 */
	lifeTime?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof BaseOfferDTO
	 */
	guaranteePeriod?: TimePeriodDTO
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `commodityCodes` с типом `CUSTOMS_COMMODITY_CODE`.  {% endnote %}  Код товара в единой Товарной номенклатуре внешнеэкономической деятельности (ТН ВЭД) — 10 или 14 цифр без пробелов.  Обязательно укажите, если он есть.
	 * @type {string}
	 * @memberof BaseOfferDTO
	 * @deprecated
	 */
	customsCommodityCode?: string
	/**
	 * Товарные коды.
	 * @type {Array<CommodityCodeDTO>}
	 * @memberof BaseOfferDTO
	 */
	commodityCodes?: CommodityCodeDTO[] | null
	/**
	 * Номера документов на товар: сертификата, декларации соответствия и т. п.  Передавать можно только номера документов, сканы которого загружены в кабинете продавца по [инструкции](https://yandex.ru/support/marketplace/assortment/restrictions/certificates.html).
	 * @type {Array<string>}
	 * @memberof BaseOfferDTO
	 */
	certificates?: string[] | null
	/**
	 * Количество грузовых мест.  Параметр используется, если товар представляет собой несколько коробок, упаковок и так далее. Например, кондиционер занимает два места — внешний и внутренний блоки в двух коробках.  Для товаров, занимающих одно место, не передавайте этот параметр.
	 * @type {number}
	 * @memberof BaseOfferDTO
	 */
	boxCount?: number
	/**
	 *
	 * @type {OfferConditionDTO}
	 * @memberof BaseOfferDTO
	 */
	condition?: OfferConditionDTO
	/**
	 *
	 * @type {OfferType}
	 * @memberof BaseOfferDTO
	 */
	type?: OfferType
	/**
	 * Признак цифрового товара. Укажите `true`, если товар доставляется по электронной почте.  [Как работать с цифровыми товарами](../../step-by-step/digital.md)
	 * @type {boolean}
	 * @memberof BaseOfferDTO
	 */
	downloadable?: boolean
	/**
	 * Параметр включает для товара пометку 18+. Устанавливайте ее только для товаров, которые относятся к удовлетворению сексуальных потребностей.
	 * @type {boolean}
	 * @memberof BaseOfferDTO
	 */
	adult?: boolean
	/**
	 *
	 * @type {AgeDTO}
	 * @memberof BaseOfferDTO
	 */
	age?: AgeDTO
	/**
	 * {% note warning \"Этот параметр устарел\" %}  При передаче характеристик используйте `parameterValues`.  {% endnote %}  Характеристики, которые есть только у товаров конкретной категории — например, диаметр колес велосипеда или материал подошвы обуви.
	 * @type {Array<OfferParamDTO>}
	 * @memberof BaseOfferDTO
	 * @deprecated
	 */
	params?: OfferParamDTO[] | null
}

/**
 * Цена на товар.
 * @export
 * @interface BasePriceDTO
 */
export interface BasePriceDTO {
	/**
	 * Значение.
	 * @type {number}
	 * @memberof BasePriceDTO
	 */
	value: number
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof BasePriceDTO
	 */
	currencyId: CurrencyType
}

/**
 * Информация об отгрузке.
 * @export
 * @interface BaseShipmentDTO
 */
export interface BaseShipmentDTO {
	/**
	 * Идентификатор отгрузки.
	 * @type {number}
	 * @memberof BaseShipmentDTO
	 */
	id: number
	/**
	 * Начало планового интервала отгрузки.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof BaseShipmentDTO
	 */
	planIntervalFrom: string
	/**
	 * Конец планового интервала отгрузки.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof BaseShipmentDTO
	 */
	planIntervalTo: string
	/**
	 *
	 * @type {ShipmentType}
	 * @memberof BaseShipmentDTO
	 */
	shipmentType?: ShipmentType
	/**
	 *
	 * @type {PartnerShipmentWarehouseDTO}
	 * @memberof BaseShipmentDTO
	 */
	warehouse?: PartnerShipmentWarehouseDTO
	/**
	 *
	 * @type {PartnerShipmentWarehouseDTO}
	 * @memberof BaseShipmentDTO
	 */
	warehouseTo?: PartnerShipmentWarehouseDTO
	/**
	 * Идентификатор отгрузки в вашей системе. Если вы еще не передавали идентификатор, вернется идентификатор из параметра `id`.
	 * @type {string}
	 * @memberof BaseShipmentDTO
	 */
	externalId?: string
	/**
	 *
	 * @type {DeliveryServiceDTO}
	 * @memberof BaseShipmentDTO
	 */
	deliveryService?: DeliveryServiceDTO
	/**
	 *
	 * @type {PalletsCountDTO}
	 * @memberof BaseShipmentDTO
	 */
	palletsCount?: PalletsCountDTO
	/**
	 * Идентификаторы заказов в отгрузке.
	 * @type {Set<number>}
	 * @memberof BaseShipmentDTO
	 */
	orderIds: Set<number>
	/**
	 * Количество заказов, которое Маркет запланировал к отгрузке.
	 * @type {number}
	 * @memberof BaseShipmentDTO
	 */
	draftCount: number
	/**
	 * Количество заказов, которое Маркет подтвердил к отгрузке.
	 * @type {number}
	 * @memberof BaseShipmentDTO
	 */
	plannedCount: number
	/**
	 * Количество заказов, принятых в сортировочном центре или пункте приема.
	 * @type {number}
	 * @memberof BaseShipmentDTO
	 */
	factCount: number
}

/**
 * Типы дополнительных инструментов продвижения:  * `BESTS` — участие в акции «Бестселлеры Маркета». * `SPLIT_0_0_4` — возможность оплаты со Сплитом сроком на 4 месяца. * `SPLIT_0_0_6` — возможность оплаты со Сплитом сроком на 6 месяцев. * `SPLIT_0_0_12` — возможность оплаты со Сплитом сроком на 12 месяцев. * `MARKET_SUBSIDY_1_4` — скидка от Маркета от 1 до 4%. * `MARKET_SUBSIDY_5_9` — скидка от Маркета от 5 до 9%. * `MARKET_SUBSIDY_10` — скидка от Маркета от 10%.
 * @export
 * @enum {string}
 */

export const BenefitType = {
	Bests: 'BESTS',
	Split004: 'SPLIT_0_0_4',
	Split006: 'SPLIT_0_0_6',
	Split0012: 'SPLIT_0_0_12',
	MarketSubsidy14: 'MARKET_SUBSIDY_1_4',
	MarketSubsidy59: 'MARKET_SUBSIDY_5_9',
	MarketSubsidy10: 'MARKET_SUBSIDY_10',
} as const

export type BenefitType = (typeof BenefitType)[keyof typeof BenefitType]

/**
 * Рекомендованная ставка, возможная доля показов и доступные дополнительные инструменты продвижения.
 * @export
 * @interface BidRecommendationItemDTO
 */
export interface BidRecommendationItemDTO {
	/**
	 * Значение ставки.
	 * @type {number}
	 * @memberof BidRecommendationItemDTO
	 */
	bid: number
	/**
	 * Доля показов.
	 * @type {number}
	 * @memberof BidRecommendationItemDTO
	 */
	showPercent: number
	/**
	 * Список доступных субсидий.  Чтобы получить необходимый инструмент продвижения, установите ставку, которая будет рекомендована для этого инструмента или выше.
	 * @type {Set<BenefitType>}
	 * @memberof BidRecommendationItemDTO
	 */
	benefits?: Set<BenefitType> | null
}
/**
 * Информация о маркированном товаре.
 * @export
 * @interface BriefOrderItemDTO
 */
export interface BriefOrderItemDTO {
	/**
	 * Идентификатор товара в заказе.  Позволяет идентифицировать товар в рамках данного заказа.
	 * @type {number}
	 * @memberof BriefOrderItemDTO
	 */
	id?: number
	/**
	 *
	 * @type {OrderVatType}
	 * @memberof BriefOrderItemDTO
	 */
	vat?: OrderVatType
	/**
	 * Количество единиц товара.
	 * @type {number}
	 * @memberof BriefOrderItemDTO
	 */
	count?: number
	/**
	 * Цена на товар. Указана в той валюте, которая была задана в каталоге. Разделитель целой и дробной части — точка.
	 * @type {number}
	 * @memberof BriefOrderItemDTO
	 */
	price?: number
	/**
	 * Название товара.
	 * @type {string}
	 * @memberof BriefOrderItemDTO
	 */
	offerName?: string
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof BriefOrderItemDTO
	 */
	offerId?: string
	/**
	 * Переданные вами коды маркировки.
	 * @type {Array<OrderItemInstanceDTO>}
	 * @memberof BriefOrderItemDTO
	 */
	instances?: OrderItemInstanceDTO[] | null
}

/**
 * Идентификатор единицы товара.  Заполните только одно поле в зависимости от того, в какой системе маркирован товар.  Подробно о работе с маркируемыми товарами рассказано [в Справке Маркета для продавцов](https://yandex.ru/support/marketplace/orders/cz.html).
 * @export
 * @interface BriefOrderItemInstanceDTO
 */
export interface BriefOrderItemInstanceDTO {
	/**
	 * Код идентификации единицы товара [в системе «Честный ЗНАК»](https://честныйзнак.рф/).  {% note warning \"Не экранируйте косую черту в коде символа-разделителя `\\u001d`\" %}  ✅ `01030410947874432155Qbag!\\u001d93Zjqw`  ❌ `01030410947874432155Qbag!\\\\u001d93Zjqw`  Косые черты и кавычки в других местах экранируйте по правилам JSON: `\\\\` и `\\\"`  {% endnote %}
	 * @type {string}
	 * @memberof BriefOrderItemInstanceDTO
	 */
	cis?: string
	/**
	 * Уникальный идентификационный номер ювелирного изделия.  Представляет собой число из 16 цифр.
	 * @type {string}
	 * @memberof BriefOrderItemInstanceDTO
	 */
	uin?: string
	/**
	 * Регистрационный номер партии товара.  Представляет собой строку из четырех чисел, разделенных косой чертой: ХХХХХХХХ/ХХХХХХ/ХХХХХХХ/ХХХ.  Первая часть — код таможни, которая зарегистрировала декларацию на партию товара. Далее — дата, номер декларации и номер маркированного товара в декларации.
	 * @type {string}
	 * @memberof BriefOrderItemInstanceDTO
	 */
	rnpt?: string
	/**
	 * Грузовая таможенная декларация.  Представляет собой строку из трех чисел, разделенных косой чертой: ХХХХХХХХ/ХХХХХХ/ХХХХХХХ.  Первая часть — код таможни, которая зарегистрировала декларацию на ввезенные товары. Далее — дата и номер декларации.
	 * @type {string}
	 * @memberof BriefOrderItemInstanceDTO
	 */
	gtd?: string
}
/**
 * Информация о кабинете.
 * @export
 * @interface BusinessDTO
 */
export interface BusinessDTO {
	/**
	 * Идентификатор кабинета.
	 * @type {number}
	 * @memberof BusinessDTO
	 */
	id?: number
	/**
	 * Название бизнеса.
	 * @type {string}
	 * @memberof BusinessDTO
	 */
	name?: string
}
/**
 * Настройки кабинета.
 * @export
 * @interface BusinessSettingsDTO
 */
export interface BusinessSettingsDTO {
	/**
	 * Управление ценами на товары:  * `false` — можно установить цену, которая действует:   * во всех магазинах кабинета — [POST businesses/{businessId}/offer-prices/updates](../../reference/business-assortment/updateBusinessPrices.md);   * в конкретном магазине — [POST campaigns/{campaignId}/offer-prices/updates](../../reference/assortment/updatePrices.md). * `true` — можно установить только цену, которая действует во всех магазинах кабинета, — [POST businesses/{businessId}/offer-prices/updates](../../reference/business-assortment/updateBusinessPrices.md).
	 * @type {boolean}
	 * @memberof BusinessSettingsDTO
	 */
	onlyDefaultPrice?: boolean
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof BusinessSettingsDTO
	 */
	currency?: CurrencyType
}

/**
 * Параметры товара, для которого нужно рассчитать стоимость услуг.
 * @export
 * @interface CalculateTariffsOfferDTO
 */
export interface CalculateTariffsOfferDTO {
	/**
	 * Идентификатор категории товара на Маркете.  Для расчета стоимости услуг необходимо указать идентификатор листовой категории товара — той, которая не имеет дочерних категорий.  Чтобы узнать идентификатор категории, к которой относится товар, воспользуйтесь запросом [POST categories/tree](../../reference/categories/getCategoriesTree.md).
	 * @type {number}
	 * @memberof CalculateTariffsOfferDTO
	 */
	categoryId: number
	/**
	 * Цена на товар в рублях.
	 * @type {number}
	 * @memberof CalculateTariffsOfferDTO
	 */
	price: number
	/**
	 * Длина товара в сантиметрах.
	 * @type {number}
	 * @memberof CalculateTariffsOfferDTO
	 */
	length: number
	/**
	 * Ширина товара в сантиметрах.
	 * @type {number}
	 * @memberof CalculateTariffsOfferDTO
	 */
	width: number
	/**
	 * Высота товара в сантиметрах.
	 * @type {number}
	 * @memberof CalculateTariffsOfferDTO
	 */
	height: number
	/**
	 * Вес товара в килограммах.
	 * @type {number}
	 * @memberof CalculateTariffsOfferDTO
	 */
	weight: number
	/**
	 * Квант продажи — количество единиц товара в одном товарном предложении.
	 * @type {number}
	 * @memberof CalculateTariffsOfferDTO
	 */
	quantity?: number
}
/**
 * Стоимость услуг.
 * @export
 * @interface CalculateTariffsOfferInfoDTO
 */
export interface CalculateTariffsOfferInfoDTO {
	/**
	 *
	 * @type {CalculateTariffsOfferDTO}
	 * @memberof CalculateTariffsOfferInfoDTO
	 */
	offer: CalculateTariffsOfferDTO
	/**
	 * Список услуг и их стоимость.  По некоторым услугам могут возвращаться несколько разных стоимостей. Например, в модели FBS стоимость услуги `SORTING` (обработка заказа) зависит от способа отгрузки и количества заказов в отгрузке. Подробнее о тарифах на услуги читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/introduction/rates/models/).
	 * @type {Array<CalculatedTariffDTO>}
	 * @memberof CalculateTariffsOfferInfoDTO
	 */
	tariffs: CalculatedTariffDTO[]
}
/**
 * Параметры для расчета стоимости услуг.
 * @export
 * @interface CalculateTariffsParametersDTO
 */
export interface CalculateTariffsParametersDTO {
	/**
	 * Идентификатор кампании. У пользователя, который выполняет запрос, должен быть доступ к этой кампании.  Используйте параметр `campaignId`, если уже завершили подключение магазина на Маркете. Иначе вернется пустой список.  Обязательный параметр, если не указан параметр `sellingProgram`. Совместное использование параметров приведет к ошибке.
	 * @type {number}
	 * @memberof CalculateTariffsParametersDTO
	 */
	campaignId?: number
	/**
	 *
	 * @type {SellingProgramType}
	 * @memberof CalculateTariffsParametersDTO
	 */
	sellingProgram?: SellingProgramType
	/**
	 *
	 * @type {PaymentFrequencyType}
	 * @memberof CalculateTariffsParametersDTO
	 */
	frequency?: PaymentFrequencyType
}

/**
 *
 * @export
 * @interface CalculateTariffsRequest
 */
export interface CalculateTariffsRequest {
	/**
	 *
	 * @type {CalculateTariffsParametersDTO}
	 * @memberof CalculateTariffsRequest
	 */
	parameters: CalculateTariffsParametersDTO
	/**
	 * Товары, для которых нужно рассчитать стоимость услуг.
	 * @type {Array<CalculateTariffsOfferDTO>}
	 * @memberof CalculateTariffsRequest
	 */
	offers: CalculateTariffsOfferDTO[]
}
/**
 *
 * @export
 * @interface CalculateTariffsResponse
 */
export interface CalculateTariffsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof CalculateTariffsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {CalculateTariffsResponseDTO}
	 * @memberof CalculateTariffsResponse
	 */
	result?: CalculateTariffsResponseDTO
}

/**
 * Расчет стоимости услуг.
 * @export
 * @interface CalculateTariffsResponseDTO
 */
export interface CalculateTariffsResponseDTO {
	/**
	 * Стоимость услуг.
	 * @type {Array<CalculateTariffsOfferInfoDTO>}
	 * @memberof CalculateTariffsResponseDTO
	 */
	offers: CalculateTariffsOfferInfoDTO[]
}
/**
 * Информация об услугах Маркета.
 * @export
 * @interface CalculatedTariffDTO
 */
export interface CalculatedTariffDTO {
	/**
	 *
	 * @type {CalculatedTariffType}
	 * @memberof CalculatedTariffDTO
	 */
	type: CalculatedTariffType
	/**
	 * Стоимость услуги в рублях.
	 * @type {number}
	 * @memberof CalculatedTariffDTO
	 */
	amount?: number
	/**
	 * Параметры расчета тарифа.
	 * @type {Array<TariffParameterDTO>}
	 * @memberof CalculatedTariffDTO
	 */
	parameters: TariffParameterDTO[]
}

/**
 * Услуга Маркета:  * `AGENCY_COMMISSION` — прием платежа покупателя.  * `PAYMENT_TRANSFER` — перевод платежа покупателя.  * `FEE` — размещение товара на Маркете.  * `DELIVERY_TO_CUSTOMER` — доставка покупателю.  * `CROSSREGIONAL_DELIVERY` — доставка в федеральный округ, город или населенный пункт.  * `EXPRESS_DELIVERY` — экспресс-доставка покупателю.  * `SORTING` — обработка заказа.  * `MIDDLE_MILE` — средняя миля.  Подробнее об услугах Маркета читайте [в Справке Маркета для продавцов](https://yandex.ru/support/marketplace/introduction/rates/index.html).
 * @export
 * @enum {string}
 */

export const CalculatedTariffType = {
	AgencyCommission: 'AGENCY_COMMISSION',
	PaymentTransfer: 'PAYMENT_TRANSFER',
	Fee: 'FEE',
	DeliveryToCustomer: 'DELIVERY_TO_CUSTOMER',
	CrossregionalDelivery: 'CROSSREGIONAL_DELIVERY',
	ExpressDelivery: 'EXPRESS_DELIVERY',
	Sorting: 'SORTING',
	MiddleMile: 'MIDDLE_MILE',
} as const

export type CalculatedTariffType =
	(typeof CalculatedTariffType)[keyof typeof CalculatedTariffType]

/**
 * Информация о магазине.
 * @export
 * @interface CampaignDTO
 */
export interface CampaignDTO {
	/**
	 * URL магазина.
	 * @type {string}
	 * @memberof CampaignDTO
	 */
	domain?: string
	/**
	 * Идентификатор кампании.
	 * @type {number}
	 * @memberof CampaignDTO
	 */
	id?: number
	/**
	 * Идентификатор плательщика в Яндекс Балансе.
	 * @type {number}
	 * @memberof CampaignDTO
	 */
	clientId?: number
	/**
	 *
	 * @type {BusinessDTO}
	 * @memberof CampaignDTO
	 */
	business?: BusinessDTO
	/**
	 *
	 * @type {PlacementType}
	 * @memberof CampaignDTO
	 */
	placementType?: PlacementType
}

/**
 * Информация об индексе качества магазина.
 * @export
 * @interface CampaignQualityRatingDTO
 */
export interface CampaignQualityRatingDTO {
	/**
	 * Идентификатор магазина.
	 * @type {number}
	 * @memberof CampaignQualityRatingDTO
	 */
	campaignId: number
	/**
	 * Список значений индекса качества.
	 * @type {Array<QualityRatingDTO>}
	 * @memberof CampaignQualityRatingDTO
	 */
	ratings: QualityRatingDTO[]
}
/**
 * Настройки магазина.
 * @export
 * @interface CampaignSettingsDTO
 */
export interface CampaignSettingsDTO {
	/**
	 * Идентификатор региона, в котором находится магазин.
	 * @type {number}
	 * @memberof CampaignSettingsDTO
	 */
	countryRegion?: number
	/**
	 * Наименование магазина на Яндекс Маркете. Если наименование отсутствует, значение параметра выводится — `null`.
	 * @type {string}
	 * @memberof CampaignSettingsDTO
	 */
	shopName?: string
	/**
	 * Признак размещения магазина на сайтах партнеров Яндекс Дистрибуции. Возможные значения: * `false` — магазин не размещен на сайтах партнеров Яндекс Дистрибуции. * `true` — магазин размещен на сайтах партнеров Яндекс Дистрибуции.
	 * @type {boolean}
	 * @memberof CampaignSettingsDTO
	 */
	showInContext?: boolean
	/**
	 * Признак показа предложений магазина в рекламном блоке над результатами поиска (cпецразмещение). Возможные значения: * `false` — предложения не показываются в блоке cпецразмещения. * `true` — предложения показываются в блоке cпецразмещения.
	 * @type {boolean}
	 * @memberof CampaignSettingsDTO
	 */
	showInPremium?: boolean
	/**
	 * Признак использования внешней интернет-статистики. Возможные значения: * `false` — внешняя интернет-статистика не используется. * `true` — внешняя интернет-статистика используется.
	 * @type {boolean}
	 * @memberof CampaignSettingsDTO
	 */
	useOpenStat?: boolean
	/**
	 *
	 * @type {CampaignSettingsLocalRegionDTO}
	 * @memberof CampaignSettingsDTO
	 */
	localRegion?: CampaignSettingsLocalRegionDTO
}
/**
 * Информация о доставке в своем регионе магазина.
 * @export
 * @interface CampaignSettingsDeliveryDTO
 */
export interface CampaignSettingsDeliveryDTO {
	/**
	 *
	 * @type {CampaignSettingsScheduleDTO}
	 * @memberof CampaignSettingsDeliveryDTO
	 */
	schedule?: CampaignSettingsScheduleDTO
}
/**
 * Информация о своем регионе магазина.
 * @export
 * @interface CampaignSettingsLocalRegionDTO
 */
export interface CampaignSettingsLocalRegionDTO {
	/**
	 * Идентификатор региона.
	 * @type {number}
	 * @memberof CampaignSettingsLocalRegionDTO
	 */
	id?: number
	/**
	 * Название региона.
	 * @type {string}
	 * @memberof CampaignSettingsLocalRegionDTO
	 */
	name?: string
	/**
	 *
	 * @type {RegionType}
	 * @memberof CampaignSettingsLocalRegionDTO
	 */
	type?: RegionType
	/**
	 *
	 * @type {CampaignSettingsScheduleSourceType}
	 * @memberof CampaignSettingsLocalRegionDTO
	 */
	deliveryOptionsSource?: CampaignSettingsScheduleSourceType
	/**
	 *
	 * @type {CampaignSettingsDeliveryDTO}
	 * @memberof CampaignSettingsLocalRegionDTO
	 */
	delivery?: CampaignSettingsDeliveryDTO
}

/**
 * Расписание работы службы доставки в своем регионе.
 * @export
 * @interface CampaignSettingsScheduleDTO
 */
export interface CampaignSettingsScheduleDTO {
	/**
	 * Признак работы службы доставки в государственные праздники. Возможные значения. * `false` — служба доставки не работает в праздничные дни. * `true` — служба доставки работает в праздничные дни.
	 * @type {boolean}
	 * @memberof CampaignSettingsScheduleDTO
	 */
	availableOnHolidays?: boolean
	/**
	 * Список дней, в которые служба доставки не работает. Дни магазин указал в кабинете продавца на Маркете.
	 * @type {Array<string>}
	 * @memberof CampaignSettingsScheduleDTO
	 */
	customHolidays: string[]
	/**
	 * Список выходных и праздничных дней, в которые служба доставки работает. Дни магазин указал в кабинете продавца на Маркете.
	 * @type {Array<string>}
	 * @memberof CampaignSettingsScheduleDTO
	 */
	customWorkingDays: string[]
	/**
	 *
	 * @type {CampaignSettingsTimePeriodDTO}
	 * @memberof CampaignSettingsScheduleDTO
	 */
	period?: CampaignSettingsTimePeriodDTO
	/**
	 * Итоговый список нерабочих дней службы доставки. Список рассчитывается с учетом выходных, нерабочих дней и государственных праздников. Информацию по ним магазин указывает в кабинете продавца на Маркете.
	 * @type {Array<string>}
	 * @memberof CampaignSettingsScheduleDTO
	 */
	totalHolidays: string[]
	/**
	 * Список выходных дней недели и государственных праздников.
	 * @type {Array<number>}
	 * @memberof CampaignSettingsScheduleDTO
	 */
	weeklyHolidays: number[]
}
/**
 * Источник информации о расписании работы службы доставки. Возможные значения: * `WEB` — информация получена из настроек кабинета продавца на Маркете. * `YML` — информация получена из прайс-листа магазина.
 * @export
 * @enum {string}
 */

export const CampaignSettingsScheduleSourceType = {
	Web: 'WEB',
	Yml: 'YML',
} as const

export type CampaignSettingsScheduleSourceType =
	(typeof CampaignSettingsScheduleSourceType)[keyof typeof CampaignSettingsScheduleSourceType]

/**
 * Период, за который рассчитывается итоговый список нерабочих дней службы доставки.
 * @export
 * @interface CampaignSettingsTimePeriodDTO
 */
export interface CampaignSettingsTimePeriodDTO {
	/**
	 * Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof CampaignSettingsTimePeriodDTO
	 */
	fromDate?: string
	/**
	 * Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof CampaignSettingsTimePeriodDTO
	 */
	toDate?: string
}
/**
 * Информация об индексе качества магазинов.
 * @export
 * @interface CampaignsQualityRatingDTO
 */
export interface CampaignsQualityRatingDTO {
	/**
	 * Список магазинов c информацией об их индексе качества.
	 * @type {Array<CampaignQualityRatingDTO>}
	 * @memberof CampaignsQualityRatingDTO
	 */
	campaignRatings: CampaignQualityRatingDTO[]
}
/**
 * Язык:  * `RU` — русский.  * `UZ` — узбекский.
 * @export
 * @enum {string}
 */

export const CatalogLanguageType = {
	Ru: 'RU',
	Uz: 'UZ',
} as const

export type CatalogLanguageType =
	(typeof CatalogLanguageType)[keyof typeof CatalogLanguageType]

/**
 * Информация о параметрах категории.
 * @export
 * @interface CategoryContentParametersDTO
 */
export interface CategoryContentParametersDTO {
	/**
	 * Идентификатор категории на Маркете.  При изменении категории убедитесь, что характеристики товара и их значения в параметре `parameterValues` вы передаете для новой категории.  Список категорий Маркета можно получить с помощью запроса  [POST categories/tree](../../reference/categories/getCategoriesTree.md).
	 * @type {number}
	 * @memberof CategoryContentParametersDTO
	 */
	categoryId: number
	/**
	 * Список характеристик.
	 * @type {Array<CategoryParameterDTO>}
	 * @memberof CategoryContentParametersDTO
	 */
	parameters?: CategoryParameterDTO[] | null
}
/**
 * Информация о категории.  Категория считается листовой, если у нее нет дочерних категорий.
 * @export
 * @interface CategoryDTO
 */
export interface CategoryDTO {
	/**
	 * Идентификатор категории.
	 * @type {number}
	 * @memberof CategoryDTO
	 */
	id: number
	/**
	 * Название категории.
	 * @type {string}
	 * @memberof CategoryDTO
	 */
	name: string
	/**
	 * Дочерние категории.
	 * @type {Array<CategoryDTO>}
	 * @memberof CategoryDTO
	 */
	children?: CategoryDTO[] | null
}
/**
 * Текст ошибки.
 * @export
 * @interface CategoryErrorDTO
 */
export interface CategoryErrorDTO {
	/**
	 * Идентификатор категории.
	 * @type {number}
	 * @memberof CategoryErrorDTO
	 */
	categoryId?: number
	/**
	 *
	 * @type {CategoryErrorType}
	 * @memberof CategoryErrorDTO
	 */
	type?: CategoryErrorType
}

/**
 * Типы ошибок:  * `UNKNOWN_CATEGORY` — указана неизвестная категория. * `CATEGORY_IS_NOT_LEAF` — указана нелистовая категория. Укажите ту, которая не имеет дочерних категорий.
 * @export
 * @enum {string}
 */

export const CategoryErrorType = {
	UnknownCategory: 'UNKNOWN_CATEGORY',
	CategoryIsNotLeaf: 'CATEGORY_IS_NOT_LEAF',
} as const

export type CategoryErrorType =
	(typeof CategoryErrorType)[keyof typeof CategoryErrorType]

/**
 * Характеристика товара.
 * @export
 * @interface CategoryParameterDTO
 */
export interface CategoryParameterDTO {
	/**
	 * Идентификатор характеристики.
	 * @type {number}
	 * @memberof CategoryParameterDTO
	 */
	id: number
	/**
	 * Название характеристики.
	 * @type {string}
	 * @memberof CategoryParameterDTO
	 */
	name?: string
	/**
	 *
	 * @type {ParameterType}
	 * @memberof CategoryParameterDTO
	 */
	type: ParameterType
	/**
	 *
	 * @type {CategoryParameterUnitDTO}
	 * @memberof CategoryParameterDTO
	 */
	unit?: CategoryParameterUnitDTO
	/**
	 * Описание характеристики.
	 * @type {string}
	 * @memberof CategoryParameterDTO
	 */
	description?: string
	/**
	 * Перечень возможных рекомендаций по заполнению карточки, к которым относится данная характеристика.
	 * @type {Array<OfferCardRecommendationType>}
	 * @memberof CategoryParameterDTO
	 */
	recommendationTypes?: OfferCardRecommendationType[] | null
	/**
	 * Обязательность характеристики.
	 * @type {boolean}
	 * @memberof CategoryParameterDTO
	 */
	required: boolean
	/**
	 * Используется ли характеристика в фильтре.
	 * @type {boolean}
	 * @memberof CategoryParameterDTO
	 */
	filtering: boolean
	/**
	 * Является ли характеристика особенностью варианта.
	 * @type {boolean}
	 * @memberof CategoryParameterDTO
	 */
	distinctive: boolean
	/**
	 * Можно ли передать сразу несколько значений.
	 * @type {boolean}
	 * @memberof CategoryParameterDTO
	 */
	multivalue: boolean
	/**
	 * Можно ли передавать собственное значение, которого нет в списке вариантов Маркета. Только для характеристик типа `ENUM`.
	 * @type {boolean}
	 * @memberof CategoryParameterDTO
	 */
	allowCustomValues: boolean
	/**
	 * Список допустимых значений параметра. Только для характеристик типа `ENUM`.
	 * @type {Array<ParameterValueOptionDTO>}
	 * @memberof CategoryParameterDTO
	 */
	values?: ParameterValueOptionDTO[] | null
	/**
	 *
	 * @type {ParameterValueConstraintsDTO}
	 * @memberof CategoryParameterDTO
	 */
	constraints?: ParameterValueConstraintsDTO
	/**
	 * Ограничения на значения, накладываемые другими характеристиками. Только для характеристик типа `ENUM`.
	 * @type {Array<ValueRestrictionDTO>}
	 * @memberof CategoryParameterDTO
	 */
	valueRestrictions?: ValueRestrictionDTO[] | null
}

/**
 * Единицы измерения характеристики товара.
 * @export
 * @interface CategoryParameterUnitDTO
 */
export interface CategoryParameterUnitDTO {
	/**
	 * Единица измерения по умолчанию.
	 * @type {number}
	 * @memberof CategoryParameterUnitDTO
	 */
	defaultUnitId: number
	/**
	 * Допустимые единицы измерения.
	 * @type {Array<UnitDTO>}
	 * @memberof CategoryParameterUnitDTO
	 */
	units: UnitDTO[]
}
/**
 *
 * @export
 * @interface ChangeOutletRequest
 */
export interface ChangeOutletRequest {
	/**
	 * Название точки продаж.
	 * @type {string}
	 * @memberof ChangeOutletRequest
	 */
	name: string
	/**
	 *
	 * @type {OutletType}
	 * @memberof ChangeOutletRequest
	 */
	type: OutletType
	/**
	 * Координаты точки продаж.  Формат: долгота, широта. Разделители: запятая и / или пробел. Например, `20.4522144, 54.7104264`.  Если параметр не передан, координаты будут определены по значениям параметров, вложенных в `address`.
	 * @type {string}
	 * @memberof ChangeOutletRequest
	 */
	coords?: string
	/**
	 * Признак основной точки продаж.  Возможные значения:  * `false` — неосновная точка продаж. * `true` — основная точка продаж.
	 * @type {boolean}
	 * @memberof ChangeOutletRequest
	 */
	isMain?: boolean
	/**
	 * Идентификатор точки продаж, присвоенный магазином.
	 * @type {string}
	 * @memberof ChangeOutletRequest
	 */
	shopOutletCode?: string
	/**
	 *
	 * @type {OutletVisibilityType}
	 * @memberof ChangeOutletRequest
	 */
	visibility?: OutletVisibilityType
	/**
	 *
	 * @type {OutletAddressDTO}
	 * @memberof ChangeOutletRequest
	 */
	address: OutletAddressDTO
	/**
	 * Номера телефонов точки продаж. Передавайте в формате: `+7 (999) 999-99-99`.
	 * @type {Array<string>}
	 * @memberof ChangeOutletRequest
	 */
	phones: string[]
	/**
	 *
	 * @type {OutletWorkingScheduleDTO}
	 * @memberof ChangeOutletRequest
	 */
	workingSchedule: OutletWorkingScheduleDTO
	/**
	 * Информация об условиях доставки для данной точки продаж.  Обязательный параметр, если параметр `type=DEPOT` или `type=MIXED`.
	 * @type {Array<OutletDeliveryRuleDTO>}
	 * @memberof ChangeOutletRequest
	 */
	deliveryRules?: OutletDeliveryRuleDTO[] | null
	/**
	 * Срок хранения заказа в собственном пункте выдачи заказов. Считается в днях.
	 * @type {number}
	 * @memberof ChangeOutletRequest
	 */
	storagePeriod?: number
}

/**
 * Каналы продвижения товаров:  * `PUSH` — пуш-уведомление из приложения Яндекс Маркет.  * `STRETCH_MAIN` — верхний баннер-растяжка на главной странице Яндекс Маркета.  * `MAIN_PAGE_CAROUSEL` — карусель акций на главной странице Яндекс Маркета.  * `PRODUCT_RETAIL_PAGE` — товар на странице ритейл-повода.  * `MAIN_PAGE_CAROUSEL_WEB` — карусель акций на главной странице веб версии Яндекс Маркета.  * `PRODUCT_SEPARATE_LANDING` — товар на лендинге акции.  * `SUPER_SHELF_CATEGORY` — полка в категориях.  * `CAROUSEL_RETAIL_PAGE` — карусель на лендинге ритейл-повода.  * `POPUP_APPLICATION` — всплывающее окно в приложении Яндекс Маркет.  * `POST_TELEGRAM` — пост в Телеграм-канале Яндекс Маркета.  * `CPA` — реклама в партнерской сети Яндекс Маркета.  * `WEB_PERFORMANCE_DIRECT` — реклама в Яндекс Директе.  * `APP_PERFORMANCE` — реклама в AppStore и Google Play.  * `BANNER_PICKUP_POINT` — баннер в ПВЗ Маркета.  * `BLOGGER_PERFORMANCE` — рекламная интеграция у блогеров.  * `DIGITAL_CHANNEL_BANNER` — баннер в digital-каналах и социальных сетях VK, Одноклассники.  * `YANDEX_ECOSYSTEM_CHANNELS` — реклама в других сервисах Яндекса: GO, Delivery, Еда.  * `PARTNERS_MAIN_BANNER` — баннер на главной странице mail.ru, auto.ru, ya.ru.  * `OTHER` — прочее.
 * @export
 * @interface ChannelType
 */
export type ChannelType = Record<string, null>
/**
 * Информация о сообщениях.
 * @export
 * @interface ChatMessageDTO
 */
export interface ChatMessageDTO {
	/**
	 * Идентификатор сообщения.
	 * @type {number}
	 * @memberof ChatMessageDTO
	 */
	messageId: number
	/**
	 * Дата и время создания сообщения.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof ChatMessageDTO
	 */
	createdAt: string
	/**
	 *
	 * @type {ChatMessageSenderType}
	 * @memberof ChatMessageDTO
	 */
	sender: ChatMessageSenderType
	/**
	 * Текст сообщения.  Необязательный параметр, если возвращается параметр `payload`.
	 * @type {string}
	 * @memberof ChatMessageDTO
	 */
	message?: string
	/**
	 * Информация о приложенных к сообщению файлах.  Необязательный параметр, если возвращается параметр `message`.
	 * @type {Array<ChatMessagePayloadDTO>}
	 * @memberof ChatMessageDTO
	 */
	payload?: ChatMessagePayloadDTO[] | null
}

/**
 * Информация о приложенных к сообщению файлах.
 * @export
 * @interface ChatMessagePayloadDTO
 */
export interface ChatMessagePayloadDTO {
	/**
	 * Имя файла.
	 * @type {string}
	 * @memberof ChatMessagePayloadDTO
	 */
	name: string
	/**
	 * Ссылка для скачивания файла.
	 * @type {string}
	 * @memberof ChatMessagePayloadDTO
	 */
	url: string
	/**
	 * Размер файла в байтах.
	 * @type {number}
	 * @memberof ChatMessagePayloadDTO
	 */
	size: number
}
/**
 * Кто отправил сообщение:  * `PARTNER` — магазин. * `CUSTOMER` — покупатель. * `MARKET` — Маркет. * `SUPPORT` — сотрудник службы поддержки Маркета.
 * @export
 * @enum {string}
 */

export const ChatMessageSenderType = {
	Partner: 'PARTNER',
	Customer: 'CUSTOMER',
	Market: 'MARKET',
	Support: 'SUPPORT',
} as const

export type ChatMessageSenderType =
	(typeof ChatMessageSenderType)[keyof typeof ChatMessageSenderType]

/**
 * Информация о сообщениях.
 * @export
 * @interface ChatMessagesResultDTO
 */
export interface ChatMessagesResultDTO {
	/**
	 * Идентификатор заказа.
	 * @type {number}
	 * @memberof ChatMessagesResultDTO
	 */
	orderId: number
	/**
	 * Информация о сообщениях.
	 * @type {Array<ChatMessageDTO>}
	 * @memberof ChatMessagesResultDTO
	 */
	messages: ChatMessageDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof ChatMessagesResultDTO
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * Статус чата:  * `NEW` — новый чат. * `WAITING_FOR_CUSTOMER` — нужен ответ покупателя. * `WAITING_FOR_PARTNER` — нужен ответ магазина. * `WAITING_FOR_ARBITER` — нужен ответ арбитра. * `WAITING_FOR_MARKET` — нужен ответ Маркета. * `FINISHED` — чат завершен.
 * @export
 * @enum {string}
 */

export const ChatStatusType = {
	New: 'NEW',
	WaitingForCustomer: 'WAITING_FOR_CUSTOMER',
	WaitingForPartner: 'WAITING_FOR_PARTNER',
	WaitingForArbiter: 'WAITING_FOR_ARBITER',
	WaitingForMarket: 'WAITING_FOR_MARKET',
	Finished: 'FINISHED',
} as const

export type ChatStatusType =
	(typeof ChatStatusType)[keyof typeof ChatStatusType]

/**
 * Тип чата:  * `CHAT` — чат с покупателем. * `ARBITRAGE` — спор.
 * @export
 * @enum {string}
 */

export const ChatType = {
	Chat: 'CHAT',
	Arbitrage: 'ARBITRAGE',
} as const

export type ChatType = (typeof ChatType)[keyof typeof ChatType]

/**
 * Товарный код.
 * @export
 * @interface CommodityCodeDTO
 */
export interface CommodityCodeDTO {
	/**
	 * Товарный код.
	 * @type {string}
	 * @memberof CommodityCodeDTO
	 */
	code: string
	/**
	 *
	 * @type {CommodityCodeType}
	 * @memberof CommodityCodeDTO
	 */
	type: CommodityCodeType
}

/**
 * Тип товарного кода:  * `CUSTOMS_COMMODITY_CODE` — код товара в единой Товарной номенклатуре внешнеэкономической деятельности (ТН ВЭД) — 10 или 14 цифр без пробелов. * `IKPU_CODE` — идентификационный код продукции и услуг (ИКПУ) в Узбекистане – 17 цифр без пробелов. Передавайте вместе с `PACK_CODE`. * `PACK_CODE` — код упаковки для ИКПУ. Может состоять только из цифр. Передавайте вместе с `IKPU_CODE`.  Не передавайте несколько кодов одного типа.
 * @export
 * @enum {string}
 */

export const CommodityCodeType = {
	CustomsCommodityCode: 'CUSTOMS_COMMODITY_CODE',
	IkpuCode: 'IKPU_CODE',
	PackCode: 'PACK_CODE',
} as const

export type CommodityCodeType =
	(typeof CommodityCodeType)[keyof typeof CommodityCodeType]

/**
 * Запрос на подтверждение цены.
 * @export
 * @interface ConfirmPricesRequest
 */
export interface ConfirmPricesRequest {
	/**
	 * Идентификаторы товаров, у которых подтверждается цена.
	 * @type {Set<string>}
	 * @memberof ConfirmPricesRequest
	 */
	offerIds: Set<string>
}
/**
 * Запрос для подтверждения отгрузки.
 * @export
 * @interface ConfirmShipmentRequest
 */
export interface ConfirmShipmentRequest {
	/**
	 * Идентификатор отгрузки в системе поставщика.
	 * @type {string}
	 * @memberof ConfirmShipmentRequest
	 */
	externalShipmentId?: string
}
/**
 * Заказ, для которого нужно создать чат.
 * @export
 * @interface CreateChatRequest
 */
export interface CreateChatRequest {
	/**
	 * Идентификатор заказа на Маркете.
	 * @type {number}
	 * @memberof CreateChatRequest
	 */
	orderId: number
}
/**
 * Результат создания чата.
 * @export
 * @interface CreateChatResponse
 */
export interface CreateChatResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof CreateChatResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {CreateChatResultDTO}
	 * @memberof CreateChatResponse
	 */
	result?: CreateChatResultDTO
}

/**
 * Информация о созданном чате.
 * @export
 * @interface CreateChatResultDTO
 */
export interface CreateChatResultDTO {
	/**
	 * Идентификатор чата.
	 * @type {number}
	 * @memberof CreateChatResultDTO
	 */
	chatId: number
}
/**
 * Ответ на запрос о создании точки продаж.
 * @export
 * @interface CreateOutletResponse
 */
export interface CreateOutletResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof CreateOutletResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OutletResponseDTO}
	 * @memberof CreateOutletResponse
	 */
	result?: OutletResponseDTO
}

/**
 * Коды валют. Возможные значения: * `RUR` — российский рубль. * `UAH` — украинская гривна. * `BYR` — белорусский рубль. * `KZT` — казахстанский тенге. * `UZS` — узбекский сум.
 * @export
 * @enum {string}
 */

export const CurrencyType = {
	Rur: 'RUR',
	Usd: 'USD',
	Eur: 'EUR',
	Uah: 'UAH',
	Aud: 'AUD',
	Gbp: 'GBP',
	Byr: 'BYR',
	Byn: 'BYN',
	Dkk: 'DKK',
	Isk: 'ISK',
	Kzt: 'KZT',
	Cad: 'CAD',
	Cny: 'CNY',
	Nok: 'NOK',
	Xdr: 'XDR',
	Sgd: 'SGD',
	Try: 'TRY',
	Sek: 'SEK',
	Chf: 'CHF',
	Jpy: 'JPY',
	Azn: 'AZN',
	All: 'ALL',
	Dzd: 'DZD',
	Aoa: 'AOA',
	Ars: 'ARS',
	Amd: 'AMD',
	Afn: 'AFN',
	Bhd: 'BHD',
	Bgn: 'BGN',
	Bob: 'BOB',
	Bwp: 'BWP',
	Bnd: 'BND',
	Brl: 'BRL',
	Bif: 'BIF',
	Huf: 'HUF',
	Vef: 'VEF',
	Kpw: 'KPW',
	Vnd: 'VND',
	Gmd: 'GMD',
	Ghs: 'GHS',
	Gnf: 'GNF',
	Hkd: 'HKD',
	Gel: 'GEL',
	Aed: 'AED',
	Egp: 'EGP',
	Zmk: 'ZMK',
	Ils: 'ILS',
	Inr: 'INR',
	Idr: 'IDR',
	Jod: 'JOD',
	Iqd: 'IQD',
	Irr: 'IRR',
	Yer: 'YER',
	Qar: 'QAR',
	Kes: 'KES',
	Kgs: 'KGS',
	Cop: 'COP',
	Cdf: 'CDF',
	Crc: 'CRC',
	Kwd: 'KWD',
	Cup: 'CUP',
	Lak: 'LAK',
	Lvl: 'LVL',
	Sll: 'SLL',
	Lbp: 'LBP',
	Lyd: 'LYD',
	Szl: 'SZL',
	Ltl: 'LTL',
	Mur: 'MUR',
	Mro: 'MRO',
	Mkd: 'MKD',
	Mwk: 'MWK',
	Mga: 'MGA',
	Myr: 'MYR',
	Mad: 'MAD',
	Mxn: 'MXN',
	Mzn: 'MZN',
	Mdl: 'MDL',
	Mnt: 'MNT',
	Npr: 'NPR',
	Ngn: 'NGN',
	Nio: 'NIO',
	Nzd: 'NZD',
	Omr: 'OMR',
	Pkr: 'PKR',
	Pyg: 'PYG',
	Pen: 'PEN',
	Pln: 'PLN',
	Khr: 'KHR',
	Sar: 'SAR',
	Ron: 'RON',
	Scr: 'SCR',
	Syp: 'SYP',
	Skk: 'SKK',
	Sos: 'SOS',
	Sdg: 'SDG',
	Srd: 'SRD',
	Tjs: 'TJS',
	Thb: 'THB',
	Twd: 'TWD',
	Bdt: 'BDT',
	Tzs: 'TZS',
	Tnd: 'TND',
	Tmm: 'TMM',
	Ugx: 'UGX',
	Uzs: 'UZS',
	Uyu: 'UYU',
	Php: 'PHP',
	Djf: 'DJF',
	Xaf: 'XAF',
	Xof: 'XOF',
	Hrk: 'HRK',
	Czk: 'CZK',
	Clp: 'CLP',
	Lkr: 'LKR',
	Eek: 'EEK',
	Etb: 'ETB',
	Rsd: 'RSD',
	Zar: 'ZAR',
	Krw: 'KRW',
	Nad: 'NAD',
	Tl: 'TL',
	Ue: 'UE',
} as const

export type CurrencyType = (typeof CurrencyType)[keyof typeof CurrencyType]

/**
 * День недели:  * `MONDAY` — понедельник. * `TUESDAY` — вторник. * `WEDNESDAY` — среда. * `THURSDAY` — четверг. * `FRIDAY` — пятница. * `SATURDAY` — суббота. * `SUNDAY` — воскресенье.
 * @export
 * @enum {string}
 */

export const DayOfWeekType = {
	Monday: 'MONDAY',
	Tuesday: 'TUESDAY',
	Wednesday: 'WEDNESDAY',
	Thursday: 'THURSDAY',
	Friday: 'FRIDAY',
	Saturday: 'SATURDAY',
	Sunday: 'SUNDAY',
} as const

export type DayOfWeekType = (typeof DayOfWeekType)[keyof typeof DayOfWeekType]

/**
 * Список товаров, которые не удалось удалить, потому что они не найдены или хранятся на складе Маркета.
 * @export
 * @interface DeleteCampaignOffersDTO
 */
export interface DeleteCampaignOffersDTO {
	/**
	 * Список SKU.
	 * @type {Array<string>}
	 * @memberof DeleteCampaignOffersDTO
	 */
	notDeletedOfferIds?: string[] | null
}
/**
 * Фильтрации удаляемых товаров по offerIds.
 * @export
 * @interface DeleteCampaignOffersRequest
 */
export interface DeleteCampaignOffersRequest {
	/**
	 * Идентификаторы товаров в каталоге.
	 * @type {Set<string>}
	 * @memberof DeleteCampaignOffersRequest
	 */
	offerIds: Set<string>
}
/**
 * Результат удаления товаров.
 * @export
 * @interface DeleteCampaignOffersResponse
 */
export interface DeleteCampaignOffersResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof DeleteCampaignOffersResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {DeleteCampaignOffersDTO}
	 * @memberof DeleteCampaignOffersResponse
	 */
	result?: DeleteCampaignOffersDTO
}

/**
 * Фильтр запроса отзывов по бизнесу.
 * @export
 * @interface DeleteGoodsFeedbackCommentRequest
 */
export interface DeleteGoodsFeedbackCommentRequest {
	/**
	 * Идентификатор комментария к отзыву.
	 * @type {number}
	 * @memberof DeleteGoodsFeedbackCommentRequest
	 */
	id: number
}
/**
 * Запрос на возобновление показа оферов.
 * @export
 * @interface DeleteHiddenOffersRequest
 */
export interface DeleteHiddenOffersRequest {
	/**
	 * Список скрытых товаров.
	 * @type {Array<HiddenOfferDTO>}
	 * @memberof DeleteHiddenOffersRequest
	 */
	hiddenOffers: HiddenOfferDTO[]
}
/**
 * Значения параметров, которые хотите удалить, и соответствующие параметры в `UpdateOfferDTO`, в которых вы передали эти значения ранее:  * `ADDITIONAL_EXPENSES` — дополнительные расходы на товар (параметр `additionalExpenses`). * `ADULT` — пометка 18+ (параметр `adult`) * `AGE` — возрастное ограничение для детей (параметр `age`). * `BARCODES` — штрихкод (параметр `barcodes`). * `BOX_COUNT` — количество грузовых мест (параметр `boxCount`). * `CERTIFICATES` — номера документов на товар (параметр `certificates`). * `COFINANCE_PRICE` — цена для скидок с Маркетом (параметр `cofinancePrice`). * `COMMODITY_CODES` — товарные коды (параметр `commodityCodes`). * `CONDITION` — состояние уцененного товара (параметр `condition`). * `CUSTOMS_COMMODITY_CODE` — код товара в ТН ВЭД (параметр `customsCommodityCode`). * `DESCRIPTION` — описание товара (параметр `description`). * `DOWNLOADABLE` — признак цифрового товара (параметр `downloadable`). * `FIRST_VIDEO_AS_COVER` — использование первого видео в карточке как видеообложки (параметр `firstVideoAsCover`). * `GUARANTEE_PERIOD` — гарантийный срок (параметр `guaranteePeriod`). * `LIFE_TIME` — срок службы (параметр `lifeTime`). * `MANUALS` — список инструкций по использованию товара (параметр `manuals`). * `MANUFACTURER_COUNTRIES` — страна производства (параметр `manufacturerCountries`). * `PARAMETERS` — характеристики товара (параметры `params`, `parameterValues`). * `PICTURES` — ссылки на изображения товара (параметр `pictures`). * `PURCHASE_PRICE` — себестоимость (параметр `purchasePrice`). * `SHELF_LIFE` — срок годности (параметр `shelfLife`). * `TAGS` — метки товара, которые использует магазин (параметр `tags`). * `TYPE` — особый тип товара (параметр `type`). * `VENDOR_CODE` — название бренда или производителя (параметр `vendorCode`). * `VIDEOS` — ссылки на видео товара (параметр `videos`).
 * @export
 * @enum {string}
 */

export const DeleteOfferParameterType = {
	AdditionalExpenses: 'ADDITIONAL_EXPENSES',
	Adult: 'ADULT',
	Age: 'AGE',
	Barcodes: 'BARCODES',
	BoxCount: 'BOX_COUNT',
	Certificates: 'CERTIFICATES',
	CofinancePrice: 'COFINANCE_PRICE',
	CommodityCodes: 'COMMODITY_CODES',
	Condition: 'CONDITION',
	CustomsCommodityCode: 'CUSTOMS_COMMODITY_CODE',
	Description: 'DESCRIPTION',
	Downloadable: 'DOWNLOADABLE',
	FirstVideoAsCover: 'FIRST_VIDEO_AS_COVER',
	GuaranteePeriod: 'GUARANTEE_PERIOD',
	LifeTime: 'LIFE_TIME',
	Manuals: 'MANUALS',
	ManufacturerCountries: 'MANUFACTURER_COUNTRIES',
	Parameters: 'PARAMETERS',
	Pictures: 'PICTURES',
	PurchasePrice: 'PURCHASE_PRICE',
	ShelfLife: 'SHELF_LIFE',
	Tags: 'TAGS',
	Type: 'TYPE',
	VendorCode: 'VENDOR_CODE',
	Videos: 'VIDEOS',
} as const

export type DeleteOfferParameterType =
	(typeof DeleteOfferParameterType)[keyof typeof DeleteOfferParameterType]

/**
 * Список товаров, которые не удалось удалить, потому что они хранятся на складе Маркета.
 * @export
 * @interface DeleteOffersDTO
 */
export interface DeleteOffersDTO {
	/**
	 * Список SKU товаров, которые не удалось удалить.
	 * @type {Array<string>}
	 * @memberof DeleteOffersDTO
	 */
	notDeletedOfferIds?: string[] | null
}
/**
 * Товары, которые не удалось восстановить из архива.
 * @export
 * @interface DeleteOffersFromArchiveDTO
 */
export interface DeleteOffersFromArchiveDTO {
	/**
	 * Список товаров, которые не удалось восстановить из архива.
	 * @type {Array<string>}
	 * @memberof DeleteOffersFromArchiveDTO
	 */
	notUnarchivedOfferIds?: string[] | null
}
/**
 * Товары, которые нужно восстановить из архива.
 * @export
 * @interface DeleteOffersFromArchiveRequest
 */
export interface DeleteOffersFromArchiveRequest {
	/**
	 * Список товаров, которые нужно восстановить из архива.
	 * @type {Array<string>}
	 * @memberof DeleteOffersFromArchiveRequest
	 */
	offerIds: string[]
}
/**
 * Результат разархивации товаров.
 * @export
 * @interface DeleteOffersFromArchiveResponse
 */
export interface DeleteOffersFromArchiveResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof DeleteOffersFromArchiveResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {DeleteOffersFromArchiveDTO}
	 * @memberof DeleteOffersFromArchiveResponse
	 */
	result?: DeleteOffersFromArchiveDTO
}

/**
 * Фильтрации удаляемых товаров по offerIds.
 * @export
 * @interface DeleteOffersRequest
 */
export interface DeleteOffersRequest {
	/**
	 * Список SKU товаров, которые нужно удалить.
	 * @type {Array<string>}
	 * @memberof DeleteOffersRequest
	 */
	offerIds: string[]
}
/**
 * Результат удаления товаров.
 * @export
 * @interface DeleteOffersResponse
 */
export interface DeleteOffersResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof DeleteOffersResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {DeleteOffersDTO}
	 * @memberof DeleteOffersResponse
	 */
	result?: DeleteOffersDTO
}

/**
 * Удаление товаров из акции.  Чтобы убрать:  * все товары из акции и больше не участвовать в ней, передайте значение `true` в параметре `deleteAllOffers`;  * часть товаров, передайте их идентификаторы в параметре `offersIds`.
 * @export
 * @interface DeletePromoOffersRequest
 */
export interface DeletePromoOffersRequest {
	/**
	 * Идентификатор акции.
	 * @type {string}
	 * @memberof DeletePromoOffersRequest
	 */
	promoId: string
	/**
	 * Чтобы убрать все товары из акции и больше не участвовать в ней, передайте значение `true` и не передавайте параметр `offerIds`.
	 * @type {boolean}
	 * @memberof DeletePromoOffersRequest
	 */
	deleteAllOffers?: boolean
	/**
	 * Товары, которые нужно убрать из акции.
	 * @type {Array<string>}
	 * @memberof DeletePromoOffersRequest
	 */
	offerIds?: string[] | null
}
/**
 * Результат удаления товаров из акции.
 * @export
 * @interface DeletePromoOffersResponse
 */
export interface DeletePromoOffersResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof DeletePromoOffersResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {DeletePromoOffersResultDTO}
	 * @memberof DeletePromoOffersResponse
	 */
	result?: DeletePromoOffersResultDTO
}

/**
 * Результат удаления товаров из акции.  Возвращается, только если в запросе был передан параметр `offerIds`.
 * @export
 * @interface DeletePromoOffersResultDTO
 */
export interface DeletePromoOffersResultDTO {
	/**
	 * Товары, при удалении которых появились ошибки.  Возвращается, только если есть такие товары.
	 * @type {Array<RejectedPromoOfferDeleteDTO>}
	 * @memberof DeletePromoOffersResultDTO
	 */
	rejectedOffers?: RejectedPromoOfferDeleteDTO[] | null
}
/**
 * Служба доставки.
 * @export
 * @interface DeliveryServiceDTO
 */
export interface DeliveryServiceDTO {
	/**
	 * Идентификатор службы доставки.
	 * @type {number}
	 * @memberof DeliveryServiceDTO
	 */
	id?: number
	/**
	 * Наименование службы доставки.
	 * @type {string}
	 * @memberof DeliveryServiceDTO
	 */
	name?: string
}
/**
 * Информация о службе доставки.
 * @export
 * @interface DeliveryServiceInfoDTO
 */
export interface DeliveryServiceInfoDTO {
	/**
	 * Идентификатор службы доставки.
	 * @type {number}
	 * @memberof DeliveryServiceInfoDTO
	 */
	id: number
	/**
	 * Наименование службы доставки.
	 * @type {string}
	 * @memberof DeliveryServiceInfoDTO
	 */
	name: string
}
/**
 * Информация о службах доставки.
 * @export
 * @interface DeliveryServicesDTO
 */
export interface DeliveryServicesDTO {
	/**
	 * Информация о службе доставки.
	 * @type {Array<DeliveryServiceInfoDTO>}
	 * @memberof DeliveryServicesDTO
	 */
	deliveryService: DeliveryServiceInfoDTO[]
}
/**
 * Информация о документе.
 * @export
 * @interface DocumentDTO
 */
export interface DocumentDTO {
	/**
	 *
	 * @type {OrderDocumentStatusType}
	 * @memberof DocumentDTO
	 */
	status?: OrderDocumentStatusType
	/**
	 * Номер документа.
	 * @type {string}
	 * @memberof DocumentDTO
	 */
	number?: string
	/**
	 * Дата создания документа.
	 * @type {string}
	 * @memberof DocumentDTO
	 */
	date?: string
}

/**
 * Результат выполнения запроса.
 * @export
 * @interface EacVerificationResultDTO
 */
export interface EacVerificationResultDTO {
	/**
	 *
	 * @type {EacVerificationStatusType}
	 * @memberof EacVerificationResultDTO
	 */
	verificationResult?: EacVerificationStatusType
	/**
	 * Количество оставшихся попыток проверки кода.  Возвращается, если магазин отправил некорректный код.  Когда все попытки будут исчерпаны, код обновится.
	 * @type {number}
	 * @memberof EacVerificationResultDTO
	 */
	attemptsLeft?: number
}

/**
 * Статус проверки кода подтверждения:  * `ACCEPTED` — код верный. * `REJECTED` — код неверный. * `NEED_UPDATE` — Маркет отправит новый код. Значение возвращается, если превышено количество попыток отправки кода.
 * @export
 * @enum {string}
 */

export const EacVerificationStatusType = {
	Accepted: 'ACCEPTED',
	Rejected: 'REJECTED',
	NeedUpdate: 'NEED_UPDATE',
} as const

export type EacVerificationStatusType =
	(typeof EacVerificationStatusType)[keyof typeof EacVerificationStatusType]

/**
 * Пустой ответ сервера.
 * @export
 * @interface EmptyApiResponse
 */
export interface EmptyApiResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof EmptyApiResponse
	 */
	status?: ApiResponseStatusType
}

/**
 * Информация о рекомендованных карточках товаров.
 * @export
 * @interface EnrichedMappingsOfferDTO
 */
export interface EnrichedMappingsOfferDTO {
	/**
	 * Составляйте название по схеме: тип + бренд или производитель + модель + особенности, если есть (например, цвет, размер или вес) и количество в упаковке.  Не включайте в название условия продажи (например, «скидка», «бесплатная доставка» и т. д.), эмоциональные характеристики («хит», «супер» и т. д.). Не пишите слова большими буквами — кроме устоявшихся названий брендов и моделей.  Оптимальная длина — 50–60 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/title.html)
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	name?: string
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	shopSku?: string
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `marketCategoryId`.  {% endnote %}  Категория товара в вашем магазине.
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 * @deprecated
	 */
	category?: string
	/**
	 * Название бренда или производителя. Должно быть записано так, как его пишет сам бренд.
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	vendor?: string
	/**
	 * Артикул товара от производителя.
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	vendorCode?: string
	/**
	 * Подробное описание товара: например, его преимущества и особенности.  Не давайте в описании инструкций по установке и сборке. Не используйте слова «скидка», «распродажа», «дешевый», «подарок» (кроме подарочных категорий), «бесплатно», «акция», «специальная цена», «новинка», «new», «аналог», «заказ», «хит». Не указывайте никакой контактной информации и не давайте ссылок.  Можно использовать теги:  * \\<h>, \\<h1>, \\<h2> и так далее — для заголовков; * \\<br> и \\<p> — для переноса строки; * \\<ol> — для нумерованного списка; * \\<ul> — для маркированного списка; * \\<li> — для создания элементов списка (должен находиться внутри \\<ol> или \\<ul>); * \\<div> — поддерживается, но не влияет на отображение текста.  Оптимальная длина — 400–600 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/description.html)
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	description?: string
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	id?: string
	/**
	 * Идентификатор фида.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	feedId?: number
	/**
	 * Указывайте в виде последовательности цифр. Подойдут коды EAN-13, EAN-8, UPC-A, UPC-E или Code 128.  Для книг указывайте ISBN.  Для товаров [определенных категорий и торговых марок](https://yastatic.net/s3/doc-binary/src/support/market/ru/yandex-market-list-for-gtin.xlsx) штрихкод должен быть действительным кодом GTIN. Обратите внимание: внутренние штрихкоды, начинающиеся на 2 или 02, и коды формата Code 128 не являются GTIN.  [Что такое GTIN](*gtin)
	 * @type {Array<string>}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	barcodes?: string[] | null
	/**
	 * URL фотографии товара или страницы с описанием на вашем сайте.  Переданные данные не будут отображаться на витрине, но они помогут специалистам Маркета найти карточку для вашего товара.  Должен содержать один вложенный параметр url.
	 * @type {Array<string>}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	urls?: string[] | null
	/**
	 * Ссылки (URL) изображений товара в хорошем качестве.  Можно указать до 30 ссылок. При этом изображение по первой ссылке будет основным. Оно используется в качестве изображения товара в поиске Маркета и на карточке товара. Другие изображения товара доступны в режиме просмотра увеличенных изображений.  Обязательный параметр.  Должен содержать хотя бы один вложенный параметр `picture`.
	 * @type {Array<string>}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	pictures?: string[] | null
	/**
	 * Изготовитель товара: компания, которая произвела товар, ее адрес и регистрационный номер (если есть).  Необязательный параметр.
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	manufacturer?: string
	/**
	 * Список стран, в которых произведен товар.  Обязательный параметр.  Должен содержать хотя бы одну, но не больше 5 стран.
	 * @type {Array<string>}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	manufacturerCountries?: string[] | null
	/**
	 * Минимальное количество единиц товара, которое вы поставляете на склад.  Например, если вы поставляете детское питание партиями минимум по 10 коробок, а в каждой коробке по 6 баночек, укажите значение 60.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	minShipment?: number
	/**
	 * Количество единиц товара в одной упаковке, которую вы поставляете на склад.  Например, если вы поставляете детское питание коробками по 6 баночек, укажите значение 6.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	transportUnitSize?: number
	/**
	 * Добавочная партия: по сколько единиц товара можно добавлять к минимальному количеству minShipment.  Например, если вы поставляете детское питание партиями минимум по 10 коробок и хотите добавлять к минимальной партии по 2 коробки, а в каждой коробке по 6 баночек, укажите значение 12.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	quantumOfSupply?: number
	/**
	 * Срок, за который продавец поставляет товары на склад, в днях.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	deliveryDurationDays?: number
	/**
	 * Сколько мест (если больше одного) занимает товар.  Параметр указывается, только если товар занимает больше одного места (например, кондиционер занимает два места: внешний и внутренний блоки в двух коробках). Если товар занимает одно место, не указывайте этот параметр.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	boxCount?: number
	/**
	 * Список кодов товара в единой Товарной номенклатуре внешнеэкономической деятельности (ТН ВЭД).  Обязательный параметр, если товар подлежит особому учету (например, в системе «Меркурий» как продукция животного происхождения или в системе «Честный ЗНАК»).  Может содержать только один вложенный код ТН ВЭД.
	 * @type {Array<string>}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	customsCommodityCodes?: string[] | null
	/**
	 *
	 * @type {OfferWeightDimensionsDTO}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	weightDimensions?: OfferWeightDimensionsDTO
	/**
	 * Дни недели, в которые продавец поставляет товары на склад.
	 * @type {Array<DayOfWeekType>}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	supplyScheduleDays?: DayOfWeekType[] | null
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `shelfLife`. Совместное использование обоих параметров приведет к ошибке.  {% endnote %}  Срок годности: через сколько дней товар станет непригоден для использования.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	shelfLifeDays?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `lifeTime`. Совместное использование обоих параметров приведет к ошибке.  {% endnote %}  Срок службы: сколько дней товар будет исправно выполнять свою функцию, а изготовитель — нести ответственность за его существенные недостатки.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	lifeTimeDays?: number
	/**
	 * Гарантийный срок товара: сколько дней возможно обслуживание и ремонт товара или возврат денег, а изготовитель или продавец будет нести ответственность за недостатки товара.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	guaranteePeriodDays?: number
	/**
	 *
	 * @type {OfferProcessingStateDTO}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	processingState?: OfferProcessingStateDTO
	/**
	 *
	 * @type {OfferAvailabilityStatusType}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	availability?: OfferAvailabilityStatusType
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	shelfLife?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	lifeTime?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	guaranteePeriod?: TimePeriodDTO
	/**
	 * Номер документа на товар.  Перед указанием номера документ нужно загрузить в кабинете продавца на Маркете. [Инструкция](https://yandex.ru/support/marketplace/assortment/restrictions/certificates.html)
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	certificate?: string
	/**
	 * Цена на товар.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	price?: number
	/**
	 * Идентификатор категории для рекомендованной карточки товара на Маркете.  Возвращается только вместе с параметром ##marketSku##.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	marketCategoryId?: number
	/**
	 * Название категории для рекомендованной карточки товара на Маркете.  Может отсутствовать в ответе.
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	marketCategoryName?: string
	/**
	 * Идентификатор модели для рекомендованной карточки товара на Маркете.  Может отсутствовать в ответе.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	marketModelId?: number
	/**
	 * Название модели для рекомендованной карточки товара на Маркете.  Возвращается только вместе с параметром ##marketSku##.
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	marketModelName?: string
	/**
	 * SKU на Маркете.
	 * @type {number}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	marketSku?: number
	/**
	 * Название товара с рекомендованной карточки на Маркете.  Может отсутствовать в ответе.
	 * @type {string}
	 * @memberof EnrichedMappingsOfferDTO
	 */
	marketSkuName?: string
}

/**
 * Модель товара.
 * @export
 * @interface EnrichedModelDTO
 */
export interface EnrichedModelDTO {
	/**
	 * Идентификатор модели товара.
	 * @type {number}
	 * @memberof EnrichedModelDTO
	 */
	id?: number
	/**
	 * Название модели товара.
	 * @type {string}
	 * @memberof EnrichedModelDTO
	 */
	name?: string
	/**
	 *
	 * @type {ModelPriceDTO}
	 * @memberof EnrichedModelDTO
	 */
	prices?: ModelPriceDTO
	/**
	 * Список первых десяти предложений, расположенных на карточке модели.  В ответе на запрос возвращаются предложения различных магазинов. Если есть несколько предложений от одного магазина, в ответе отображается только одно, наиболее релевантное из них.
	 * @type {Array<ModelOfferDTO>}
	 * @memberof EnrichedModelDTO
	 */
	offers?: ModelOfferDTO[] | null
	/**
	 * Суммарное количество предложений в розничных магазинах в регионе. Учитываются все предложения от каждого магазина.
	 * @type {number}
	 * @memberof EnrichedModelDTO
	 */
	offlineOffers?: number
	/**
	 * Суммарное количество предложений в интернет-магазинах в регионе. Учитываются все предложения от каждого магазина.
	 * @type {number}
	 * @memberof EnrichedModelDTO
	 */
	onlineOffers?: number
}
/**
 * Список моделей товаров.
 * @export
 * @interface EnrichedModelsDTO
 */
export interface EnrichedModelsDTO {
	/**
	 * Список моделей товаров.
	 * @type {Array<EnrichedModelDTO>}
	 * @memberof EnrichedModelsDTO
	 */
	models: EnrichedModelDTO[]
}
/**
 * Информация о коробке.
 * @export
 * @interface EnrichedOrderBoxLayoutDTO
 */
export interface EnrichedOrderBoxLayoutDTO {
	/**
	 * Список товаров в коробке.  Если в коробке едет часть большого товара, в списке может быть только один пункт.
	 * @type {Array<OrderBoxLayoutItemDTO>}
	 * @memberof EnrichedOrderBoxLayoutDTO
	 */
	items: OrderBoxLayoutItemDTO[]
	/**
	 * Идентификатор коробки.
	 * @type {number}
	 * @memberof EnrichedOrderBoxLayoutDTO
	 */
	boxId?: number
}
/**
 * Информация об отгрузке.
 * @export
 * @interface ExtensionShipmentDTO
 */
export interface ExtensionShipmentDTO {
	/**
	 *
	 * @type {ShipmentStatusChangeDTO}
	 * @memberof ExtensionShipmentDTO
	 */
	currentStatus?: ShipmentStatusChangeDTO
	/**
	 * Доступные действия над отгрузкой.
	 * @type {Set<ShipmentActionType>}
	 * @memberof ExtensionShipmentDTO
	 */
	availableActions: Set<ShipmentActionType>
}
/**
 * Информация о проверке содержимого прайс-листа, загруженного на Маркет.
 * @export
 * @interface FeedContentDTO
 */
export interface FeedContentDTO {
	/**
	 * Количество предложений, в которых найдены ошибки на этапе загрузки прайс-листа. Выводится, если параметр `content status=OK`.
	 * @type {number}
	 * @memberof FeedContentDTO
	 */
	rejectedOffersCount?: number
	/**
	 *
	 * @type {FeedStatusType}
	 * @memberof FeedContentDTO
	 */
	status?: FeedStatusType
	/**
	 * Количество предложений в прайс-листе. Выводится, если параметр `content status=OK`.
	 * @type {number}
	 * @memberof FeedContentDTO
	 */
	totalOffersCount?: number
	/**
	 *
	 * @type {FeedContentErrorDTO}
	 * @memberof FeedContentDTO
	 */
	error?: FeedContentErrorDTO
}

/**
 * Информация об ошибке в содержимом прайс-листа. Выводится, если параметр `content status=ERROR`.
 * @export
 * @interface FeedContentErrorDTO
 */
export interface FeedContentErrorDTO {
	/**
	 *
	 * @type {FeedContentErrorType}
	 * @memberof FeedContentErrorDTO
	 */
	type?: FeedContentErrorType
}

/**
 * Тип ошибки в содержимом прайс-листа.  Возможные значения:  * `PARSE_ERROR` — ошибка при проверке прайс-листа, не связанная с форматом YML. Например, прайс-лист пустой или его не удалось разархивировать. * `PARSE_XML_ERROR` — несоответствие техническим требованиям формата YML. Например, элементы и их значения описаны некорректно. * `TOO_MANY_REJECTED_OFFERS` — более чем в половине предложений из прайс-листа найдены ошибки. Все предложения из прайс-листа не будут опубликованы на Маркете.
 * @export
 * @enum {string}
 */

export const FeedContentErrorType = {
	ParseError: 'PARSE_ERROR',
	ParseXmlError: 'PARSE_XML_ERROR',
	TooManyRejectedOffers: 'TOO_MANY_REJECTED_OFFERS',
} as const

export type FeedContentErrorType =
	(typeof FeedContentErrorType)[keyof typeof FeedContentErrorType]

/**
 * Информация о прайс-листе.
 * @export
 * @interface FeedDTO
 */
export interface FeedDTO {
	/**
	 * Идентификатор прайс-листа.
	 * @type {number}
	 * @memberof FeedDTO
	 */
	id?: number
	/**
	 * Логин для авторизации при скачивании прайс-листа. Параметр выводится при размещении прайс-листа на сайте магазина и в случае ограничения доступа к нему.
	 * @type {string}
	 * @memberof FeedDTO
	 */
	login?: string
	/**
	 * Имя файла, содержащего прайс-лист. Параметр выводится при размещении прайс-листа на сервере Маркета.
	 * @type {string}
	 * @memberof FeedDTO
	 */
	name?: string
	/**
	 * Пароль для авторизации при скачивании прайс-листа. Параметр выводится при размещении прайс-листа на сайте магазина и в случае ограничения доступа к нему.
	 * @type {string}
	 * @memberof FeedDTO
	 */
	password?: string
	/**
	 * Дата загрузки прайс-листа на Маркет.  Формат даты: `ДД-ММ-ГГГГ`.  Параметр выводится при размещении прайс-листа на сервере Маркета.
	 * @type {string}
	 * @memberof FeedDTO
	 */
	uploadDate?: string
	/**
	 * URL прайс-листа. Параметр выводится при размещении прайс-листа на сайте магазина.
	 * @type {string}
	 * @memberof FeedDTO
	 */
	url?: string
	/**
	 *
	 * @type {FeedContentDTO}
	 * @memberof FeedDTO
	 */
	content?: FeedContentDTO
	/**
	 *
	 * @type {FeedDownloadDTO}
	 * @memberof FeedDTO
	 */
	download?: FeedDownloadDTO
	/**
	 *
	 * @type {FeedPlacementDTO}
	 * @memberof FeedDTO
	 */
	placement?: FeedPlacementDTO
	/**
	 *
	 * @type {FeedPublicationDTO}
	 * @memberof FeedDTO
	 */
	publication?: FeedPublicationDTO
}
/**
 * Информация о последней загрузке прайс-листа.
 * @export
 * @interface FeedDownloadDTO
 */
export interface FeedDownloadDTO {
	/**
	 *
	 * @type {FeedStatusType}
	 * @memberof FeedDownloadDTO
	 */
	status?: FeedStatusType
	/**
	 *
	 * @type {FeedDownloadErrorDTO}
	 * @memberof FeedDownloadDTO
	 */
	error?: FeedDownloadErrorDTO
}

/**
 * Информация об ошибке при загрузке прайс-листа. Выводится, если параметр `download status=ERROR`.
 * @export
 * @interface FeedDownloadErrorDTO
 */
export interface FeedDownloadErrorDTO {
	/**
	 * HTTP-код ошибки индексации прайс-листа. Выводится, если `type=DOWNLOAD_HTTP_ERROR`.
	 * @type {number}
	 * @memberof FeedDownloadErrorDTO
	 */
	httpStatusCode?: number
	/**
	 *
	 * @type {FeedDownloadErrorType}
	 * @memberof FeedDownloadErrorDTO
	 */
	type?: FeedDownloadErrorType
	/**
	 * Описание ошибки. Выводится, если `type=DOWNLOAD_ERROR`.
	 * @type {string}
	 * @memberof FeedDownloadErrorDTO
	 */
	description?: string
}

/**
 * Тип ошибки загрузки прайс-листа.  Возможные значения:  * `DOWNLOAD_ERROR` — ошибка загрузки прайс-листа. Например, проблема с DNS-сервером или обрыв интернет-соединения.   Проблема описана в параметре `description`.  * `DOWNLOAD_HTTP_ERROR` — Яндекс Маркет передал запрос на получение прайс-листа и получил в ответ HTTP-код, отличный от 2xx.  HTTP-код выведен в параметре `httpStatusCode`.
 * @export
 * @enum {string}
 */

export const FeedDownloadErrorType = {
	DownloadError: 'DOWNLOAD_ERROR',
	DownloadHttpError: 'DOWNLOAD_HTTP_ERROR',
} as const

export type FeedDownloadErrorType =
	(typeof FeedDownloadErrorType)[keyof typeof FeedDownloadErrorType]

/**
 * Информация об ошибке, произошедшей во время индексации прайс-листа.  Выводится, если во время индексации произошли ошибки (`index-log-record status=ERROR`).
 * @export
 * @interface FeedIndexLogsErrorDTO
 */
export interface FeedIndexLogsErrorDTO {
	/**
	 * HTTP-код ошибки индексации прайс-листа.  Выводится, если `type=DOWNLOAD_HTTP_ERROR`.
	 * @type {number}
	 * @memberof FeedIndexLogsErrorDTO
	 */
	httpStatusCode?: number
	/**
	 *
	 * @type {FeedIndexLogsErrorType}
	 * @memberof FeedIndexLogsErrorDTO
	 */
	type?: FeedIndexLogsErrorType
	/**
	 * Описание ошибки.  Выводится, если `type=DOWNLOAD_ERROR`.
	 * @type {string}
	 * @memberof FeedIndexLogsErrorDTO
	 */
	description?: string
}

/**
 * Тип ошибки индексации прайс-листа.  Возможные значения:  * `DOWNLOAD_ERROR` — ошибка загрузки прайс-листа. Например, проблема с DNS-сервером или обрыв интернет-соединения.    Проблема описана в параметре `description`.  * `DOWNLOAD_HTTP_ERROR` — Маркет передал запрос на получение прайс-листа и получил в ответ HTTP-код, отличный от 2xx.    HTTP-код выведен в параметре `httpStatusCode`.  * `PARSE_ERROR` — ошибка при проверке прайс-листа, не связанная с форматом YML. Например, прайс-лист пустой или его не удалось разархивировать.  * `PARSE_XML_ERROR` — несоответствие техническим требованиям формата YML. Например, элементы и их значения описаны некорректно.  * `TOO_MANY_REJECTED_OFFERS` — более чем в половине предложений из прайс-листа найдены ошибки. Все предложения из прайс-листа не будут опубликованы на Маркете.
 * @export
 * @enum {string}
 */

export const FeedIndexLogsErrorType = {
	DownloadError: 'DOWNLOAD_ERROR',
	DownloadHttpError: 'DOWNLOAD_HTTP_ERROR',
	ParseError: 'PARSE_ERROR',
	ParseXmlError: 'PARSE_XML_ERROR',
	TooManyRejectedOffers: 'TOO_MANY_REJECTED_OFFERS',
} as const

export type FeedIndexLogsErrorType =
	(typeof FeedIndexLogsErrorType)[keyof typeof FeedIndexLogsErrorType]

/**
 * Информация о прайс-листе.
 * @export
 * @interface FeedIndexLogsFeedDTO
 */
export interface FeedIndexLogsFeedDTO {
	/**
	 * Идентификатор прайс-листа.
	 * @type {number}
	 * @memberof FeedIndexLogsFeedDTO
	 */
	id?: number
}
/**
 * Тип обновления.  Возможные значения:  * `DIFF` — частичное обновление данных на Яндекс Маркете (например, обновление цен ранее опубликованных предложений и публикация новых). * `FAST_PRICE` — только обновление цен ранее опубликованных предложений. * `FULL` — полное обновление данных на Яндекс Маркете.
 * @export
 * @enum {string}
 */

export const FeedIndexLogsIndexType = {
	Diff: 'DIFF',
	FastPrice: 'FAST_PRICE',
	Full: 'FULL',
} as const

export type FeedIndexLogsIndexType =
	(typeof FeedIndexLogsIndexType)[keyof typeof FeedIndexLogsIndexType]

/**
 * Информация о предложениях прайс-листа.
 * @export
 * @interface FeedIndexLogsOffersDTO
 */
export interface FeedIndexLogsOffersDTO {
	/**
	 * Количество предложений, который не опубликованы на Маркете из-за найденных ошибок.
	 * @type {number}
	 * @memberof FeedIndexLogsOffersDTO
	 */
	rejectedCount?: number
	/**
	 * Количество предложений в прайс-листе.
	 * @type {number}
	 * @memberof FeedIndexLogsOffersDTO
	 */
	totalCount?: number
}
/**
 * Список отчетов по индексации прайс-листа.
 * @export
 * @interface FeedIndexLogsRecordDTO
 */
export interface FeedIndexLogsRecordDTO {
	/**
	 * Дата и время загрузки прайс-листа.  Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:42:42+03:00`.
	 * @type {string}
	 * @memberof FeedIndexLogsRecordDTO
	 */
	downloadTime?: string
	/**
	 * Дата и время, которые магазин указал в прайс-листе.  Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:42:42+03:00`.
	 * @type {string}
	 * @memberof FeedIndexLogsRecordDTO
	 */
	fileTime?: string
	/**
	 * Идентификатор индексации.
	 * @type {number}
	 * @memberof FeedIndexLogsRecordDTO
	 */
	generationId?: number
	/**
	 *
	 * @type {FeedIndexLogsIndexType}
	 * @memberof FeedIndexLogsRecordDTO
	 */
	indexType?: FeedIndexLogsIndexType
	/**
	 * Дата и время публикации предложений из прайс-листа на Яндекс Маркете.  Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:42:42+03:00`.
	 * @type {string}
	 * @memberof FeedIndexLogsRecordDTO
	 */
	publishedTime?: string
	/**
	 *
	 * @type {FeedIndexLogsStatusType}
	 * @memberof FeedIndexLogsRecordDTO
	 */
	status?: FeedIndexLogsStatusType
	/**
	 *
	 * @type {FeedIndexLogsErrorDTO}
	 * @memberof FeedIndexLogsRecordDTO
	 */
	error?: FeedIndexLogsErrorDTO
	/**
	 *
	 * @type {FeedIndexLogsOffersDTO}
	 * @memberof FeedIndexLogsRecordDTO
	 */
	offers?: FeedIndexLogsOffersDTO
}

/**
 * Результат выполнения запроса отчета по индексации прайс-листа.
 * @export
 * @interface FeedIndexLogsResultDTO
 */
export interface FeedIndexLogsResultDTO {
	/**
	 *
	 * @type {FeedIndexLogsFeedDTO}
	 * @memberof FeedIndexLogsResultDTO
	 */
	feed?: FeedIndexLogsFeedDTO
	/**
	 * Список отчетов по индексации прайс-листа.
	 * @type {Array<FeedIndexLogsRecordDTO>}
	 * @memberof FeedIndexLogsResultDTO
	 */
	indexLogRecords: FeedIndexLogsRecordDTO[]
	/**
	 * Количество отчетов на всех страницах выходных данных.
	 * @type {number}
	 * @memberof FeedIndexLogsResultDTO
	 */
	total?: number
}
/**
 * Статус индексации прайс-листа и проверки на соответствие техническим требованиям.  Возможные значения:  * `ERROR` — произошли ошибки. * `OK` — обработан без ошибок. * `WARNING` — наблюдались некритичные проблемы.
 * @export
 * @enum {string}
 */

export const FeedIndexLogsStatusType = {
	Error: 'ERROR',
	Ok: 'OK',
	Warning: 'WARNING',
} as const

export type FeedIndexLogsStatusType =
	(typeof FeedIndexLogsStatusType)[keyof typeof FeedIndexLogsStatusType]

/**
 * Параметр прайс-листа.
 * @export
 * @interface FeedParameterDTO
 */
export interface FeedParameterDTO {
	/**
	 * Удалить ли значение параметра.  Возможное значение: * `true` — удалить значение параметра.  Используется вместе с параметром `name`.
	 * @type {boolean}
	 * @memberof FeedParameterDTO
	 */
	deleted?: boolean
	/**
	 * Название параметра.  Возможное значение: - `reparseIntervalMinutes` — период скачивания прайс-листа. Маркет будет скачивать прайс-лист через количество минут, указанное в параметре `value`. Например, при `value=1440`, Маркет будет скачивать прайс-лист один раз в сутки.  Несмотря на установленное значение, Маркет скачает прайс-лист один раз в сутки.  Обязательный параметр.
	 * @type {string}
	 * @memberof FeedParameterDTO
	 */
	name: string
	/**
	 * Значения параметра.  Используется вместе с параметром `name`.
	 * @type {Array<number>}
	 * @memberof FeedParameterDTO
	 */
	values?: number[] | null
}
/**
 * Информация о размещении предложений из прайс-листа на Маркете на момент выполнения запроса.
 * @export
 * @interface FeedPlacementDTO
 */
export interface FeedPlacementDTO {
	/**
	 *
	 * @type {FeedStatusType}
	 * @memberof FeedPlacementDTO
	 */
	status?: FeedStatusType
	/**
	 * Количество предложений из прайс-листа, которые размещаются на Яндекс Маркете в момент выполнения запроса.
	 * @type {number}
	 * @memberof FeedPlacementDTO
	 */
	totalOffersCount?: number
}

/**
 * Информация о последней публикации предложений из прайс-листа на Маркете.
 * @export
 * @interface FeedPublicationDTO
 */
export interface FeedPublicationDTO {
	/**
	 *
	 * @type {FeedStatusType}
	 * @memberof FeedPublicationDTO
	 */
	status?: FeedStatusType
	/**
	 *
	 * @type {FeedPublicationFullDTO}
	 * @memberof FeedPublicationDTO
	 */
	full?: FeedPublicationFullDTO
	/**
	 *
	 * @type {FeedPublicationPriceAndStockUpdateDTO}
	 * @memberof FeedPublicationDTO
	 */
	priceAndStockUpdate?: FeedPublicationPriceAndStockUpdateDTO
}

/**
 * Информация о последней публикации предложений из прайс-листа на Маркете.
 * @export
 * @interface FeedPublicationFullDTO
 */
export interface FeedPublicationFullDTO {
	/**
	 * Дата и время, которые магазин указал в прайс-листе.  Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:42:42+03:00`.
	 * @type {string}
	 * @memberof FeedPublicationFullDTO
	 */
	fileTime?: string
	/**
	 * Дата и время публикации предложений из прайс-листа на Маркете.  Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:42:42+03:00`.
	 * @type {string}
	 * @memberof FeedPublicationFullDTO
	 */
	publishedTime?: string
}
/**
 * Последнее обновление цен и наличия товаров на Маркете. Если последнее по времени обновление было полным, в параметре выводятся те же данные, что и в параметре `full`. Выводится, если параметр `publication status=OK`.
 * @export
 * @interface FeedPublicationPriceAndStockUpdateDTO
 */
export interface FeedPublicationPriceAndStockUpdateDTO {
	/**
	 * Дата и время, которые магазин указал в прайс-листе.  Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:42:42+03:00`.
	 * @type {string}
	 * @memberof FeedPublicationPriceAndStockUpdateDTO
	 */
	fileTime?: string
	/**
	 * Дата и время публикации предложений из прайс-листа на Маркете.  Формат даты: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:42:42+03:00`.
	 * @type {string}
	 * @memberof FeedPublicationPriceAndStockUpdateDTO
	 */
	publishedTime?: string
}
/**
 * Статус прайс-листа.  Возможные значения:    * `ERROR` — найдены ошибки.   * `NA` — прайс-лист не загружался более семи дней или на этапе загрузки произошла ошибка.   * `OK` — ошибок не найдено.
 * @export
 * @enum {string}
 */

export const FeedStatusType = {
	Error: 'ERROR',
	Na: 'NA',
	Ok: 'OK',
} as const

export type FeedStatusType =
	(typeof FeedStatusType)[keyof typeof FeedStatusType]

/**
 * Статус реакции на отзыв:  * `ALL` — все отзывы.  * `NEED_REACTION` — отзывы, на которые нужно ответить.
 * @export
 * @enum {string}
 */

export const FeedbackReactionStatusType = {
	All: 'ALL',
	NeedReaction: 'NEED_REACTION',
} as const

export type FeedbackReactionStatusType =
	(typeof FeedbackReactionStatusType)[keyof typeof FeedbackReactionStatusType]

/**
 * Фильтр по заполненности или незаполненности поля:  * `SPECIFIED` — вывести товары, у которых поле заполнено. * `EMPTY` — вывести товары, у которых поле не заполнено.
 * @export
 * @enum {string}
 */

export const FieldStateType = {
	Specified: 'SPECIFIED',
	Empty: 'EMPTY',
} as const

export type FieldStateType =
	(typeof FieldStateType)[keyof typeof FieldStateType]

/**
 * Модель для пагинации.
 * @export
 * @interface FlippingPagerDTO
 */
export interface FlippingPagerDTO {
	/**
	 * Сколько всего найдено элементов.
	 * @type {number}
	 * @memberof FlippingPagerDTO
	 */
	total?: number
	/**
	 * Начальный номер найденного элемента на странице.
	 * @type {number}
	 * @memberof FlippingPagerDTO
	 */
	from?: number
	/**
	 * Конечный номер найденного элемента на странице.
	 * @type {number}
	 * @memberof FlippingPagerDTO
	 */
	to?: number
	/**
	 * Текущая страница.
	 * @type {number}
	 * @memberof FlippingPagerDTO
	 */
	currentPage?: number
	/**
	 * Общее количество страниц.
	 * @type {number}
	 * @memberof FlippingPagerDTO
	 */
	pagesCount?: number
	/**
	 * Размер страницы.
	 * @type {number}
	 * @memberof FlippingPagerDTO
	 */
	pageSize?: number
}
/**
 * Ссылка на следующую страницу.
 * @export
 * @interface ForwardScrollingPagerDTO
 */
export interface ForwardScrollingPagerDTO {
	/**
	 * Идентификатор следующей страницы результатов.
	 * @type {string}
	 * @memberof ForwardScrollingPagerDTO
	 */
	nextPageToken?: string
}
/**
 * Склад Маркета (FBY).
 * @export
 * @interface FulfillmentWarehouseDTO
 */
export interface FulfillmentWarehouseDTO {
	/**
	 * Идентификатор склада.
	 * @type {number}
	 * @memberof FulfillmentWarehouseDTO
	 */
	id: number
	/**
	 * Название склада.
	 * @type {string}
	 * @memberof FulfillmentWarehouseDTO
	 */
	name: string
	/**
	 *
	 * @type {WarehouseAddressDTO}
	 * @memberof FulfillmentWarehouseDTO
	 */
	address?: WarehouseAddressDTO
}
/**
 * Список складов Маркета (FBY).
 * @export
 * @interface FulfillmentWarehousesDTO
 */
export interface FulfillmentWarehousesDTO {
	/**
	 * Список складов Маркета (FBY).
	 * @type {Array<FulfillmentWarehouseDTO>}
	 * @memberof FulfillmentWarehousesDTO
	 */
	warehouses: FulfillmentWarehouseDTO[]
}
/**
 * Информация о точке продаж.
 * @export
 * @interface FullOutletDTO
 */
export interface FullOutletDTO {
	/**
	 * Название точки продаж.
	 * @type {string}
	 * @memberof FullOutletDTO
	 */
	name: string
	/**
	 *
	 * @type {OutletType}
	 * @memberof FullOutletDTO
	 */
	type: OutletType
	/**
	 * Координаты точки продаж.  Формат: долгота, широта. Разделители: запятая и / или пробел. Например, `20.4522144, 54.7104264`.  Если параметр не передан, координаты будут определены по значениям параметров, вложенных в `address`.
	 * @type {string}
	 * @memberof FullOutletDTO
	 */
	coords?: string
	/**
	 * Признак основной точки продаж.  Возможные значения:  * `false` — неосновная точка продаж. * `true` — основная точка продаж.
	 * @type {boolean}
	 * @memberof FullOutletDTO
	 */
	isMain?: boolean
	/**
	 * Идентификатор точки продаж, присвоенный магазином.
	 * @type {string}
	 * @memberof FullOutletDTO
	 */
	shopOutletCode?: string
	/**
	 *
	 * @type {OutletVisibilityType}
	 * @memberof FullOutletDTO
	 */
	visibility?: OutletVisibilityType
	/**
	 *
	 * @type {OutletAddressDTO}
	 * @memberof FullOutletDTO
	 */
	address: OutletAddressDTO
	/**
	 * Номера телефонов точки продаж. Передавайте в формате: `+7 (999) 999-99-99`.
	 * @type {Array<string>}
	 * @memberof FullOutletDTO
	 */
	phones: string[]
	/**
	 *
	 * @type {OutletWorkingScheduleDTO}
	 * @memberof FullOutletDTO
	 */
	workingSchedule: OutletWorkingScheduleDTO
	/**
	 * Информация об условиях доставки для данной точки продаж.  Обязательный параметр, если параметр `type=DEPOT` или `type=MIXED`.
	 * @type {Array<OutletDeliveryRuleDTO>}
	 * @memberof FullOutletDTO
	 */
	deliveryRules?: OutletDeliveryRuleDTO[] | null
	/**
	 * Срок хранения заказа в собственном пункте выдачи заказов. Считается в днях.
	 * @type {number}
	 * @memberof FullOutletDTO
	 */
	storagePeriod?: number
	/**
	 * Идентификатор точки продаж, присвоенный Маркетом.
	 * @type {number}
	 * @memberof FullOutletDTO
	 */
	id: number
	/**
	 *
	 * @type {OutletStatusType}
	 * @memberof FullOutletDTO
	 */
	status?: OutletStatusType
	/**
	 *
	 * @type {RegionDTO}
	 * @memberof FullOutletDTO
	 */
	region?: RegionDTO
	/**
	 * Идентификатор точки продаж, заданный магазином.
	 * @type {string}
	 * @memberof FullOutletDTO
	 */
	shopOutletId?: string
	/**
	 * Рабочее время.
	 * @type {string}
	 * @memberof FullOutletDTO
	 */
	workingTime?: string
	/**
	 * Статус модерации.
	 * @type {string}
	 * @memberof FullOutletDTO
	 */
	moderationReason?: string
}

/**
 * Информация о лицензии.
 * @export
 * @interface FullOutletLicenseDTO
 */
export interface FullOutletLicenseDTO {
	/**
	 * Идентификатор лицензии.  Параметр указывается, только если нужно изменить информацию о существующей лицензии. Ее идентификатор можно узнать с помощью запроса [GET campaigns/{campaignId}/outlets/licenses](../../reference/outlets/getOutletLicenses.md). При передаче информации о новой лицензии указывать идентификатор не нужно.  Идентификатор лицензии присваивается Маркетом. Не путайте его с номером, указанным на лицензии: он передается в параметре `number`.
	 * @type {number}
	 * @memberof FullOutletLicenseDTO
	 */
	id?: number
	/**
	 * Идентификатор точки продаж, для которой действительна лицензия.
	 * @type {number}
	 * @memberof FullOutletLicenseDTO
	 */
	outletId: number
	/**
	 *
	 * @type {LicenseType}
	 * @memberof FullOutletLicenseDTO
	 */
	licenseType: LicenseType
	/**
	 * Номер лицензии.
	 * @type {string}
	 * @memberof FullOutletLicenseDTO
	 */
	number: string
	/**
	 * Дата выдачи лицензии.  Формат даты: ISO 8601 со смещением относительно UTC. Нужно передать дату, указанную на лицензии, время `00:00:00` и часовой пояс, соответствующий региону точки продаж. Например, если лицензия для точки продаж в Москве выдана 13 ноября 2017 года, то параметр должен иметь значение `2017-11-13T00:00:00+03:00`.  Не может быть позже даты окончания срока действия, указанной в параметре `dateOfExpiry`.
	 * @type {string}
	 * @memberof FullOutletLicenseDTO
	 */
	dateOfIssue: string
	/**
	 * Дата окончания действия лицензии.  Формат даты: ISO 8601 со смещением относительно UTC. Нужно передать дату, указанную на лицензии, время `00:00:00` и часовой пояс, соответствующий региону точки продаж. Например, если действие лицензии для точки продаж в Москве заканчивается 20 ноября 2022 года, то параметр должен иметь значение `2022-11-20T00:00:00+03:00`.  Не может быть раньше даты выдачи, указанной в параметре `dateOfIssue`.
	 * @type {string}
	 * @memberof FullOutletLicenseDTO
	 */
	dateOfExpiry: string
	/**
	 *
	 * @type {LicenseCheckStatusType}
	 * @memberof FullOutletLicenseDTO
	 */
	checkStatus?: LicenseCheckStatusType
	/**
	 * Причина, по которой лицензия не прошла проверку.  Параметр возвращается, только если параметр `checkStatus` имеет значение `FAIL`.
	 * @type {string}
	 * @memberof FullOutletLicenseDTO
	 */
	checkComment?: string
}

/**
 * Данные, необходимые для генерации отчета.
 * @export
 * @interface GenerateBoostConsolidatedRequest
 */
export interface GenerateBoostConsolidatedRequest {
	/**
	 * Идентификатор бизнеса.
	 * @type {number}
	 * @memberof GenerateBoostConsolidatedRequest
	 */
	businessId: number
	/**
	 * Начало периода, включительно.
	 * @type {string}
	 * @memberof GenerateBoostConsolidatedRequest
	 */
	dateFrom: string
	/**
	 * Конец периода, включительно.
	 * @type {string}
	 * @memberof GenerateBoostConsolidatedRequest
	 */
	dateTo: string
}
/**
 * Данные, необходимые для генерации отчета.
 * @export
 * @interface GenerateCompetitorsPositionReportRequest
 */
export interface GenerateCompetitorsPositionReportRequest {
	/**
	 * Идентификатор бизнеса.
	 * @type {number}
	 * @memberof GenerateCompetitorsPositionReportRequest
	 */
	businessId: number
	/**
	 * Идентификатор категории.
	 * @type {number}
	 * @memberof GenerateCompetitorsPositionReportRequest
	 */
	categoryId: number
	/**
	 * Начало периода, включительно.
	 * @type {string}
	 * @memberof GenerateCompetitorsPositionReportRequest
	 */
	dateFrom: string
	/**
	 * Конец периода, включительно.
	 * @type {string}
	 * @memberof GenerateCompetitorsPositionReportRequest
	 */
	dateTo: string
}
/**
 * Данные, необходимые для генерации отчета.
 * @export
 * @interface GenerateGoodsFeedbackRequest
 */
export interface GenerateGoodsFeedbackRequest {
	/**
	 * Идентификатор бизнеса.
	 * @type {number}
	 * @memberof GenerateGoodsFeedbackRequest
	 */
	businessId: number
}
/**
 * Данные, необходимые для генерации отчета.
 * @export
 * @interface GenerateGoodsMovementReportRequest
 */
export interface GenerateGoodsMovementReportRequest {
	/**
	 * Идентификатор кампании.
	 * @type {number}
	 * @memberof GenerateGoodsMovementReportRequest
	 */
	campaignId: number
	/**
	 * Начало периода, включительно. Формат даты: `ГГГГ-ММ-ДД`.
	 * @type {string}
	 * @memberof GenerateGoodsMovementReportRequest
	 */
	dateFrom: string
	/**
	 * Конец периода, включительно. Формат даты: `ГГГГ-ММ-ДД`.
	 * @type {string}
	 * @memberof GenerateGoodsMovementReportRequest
	 */
	dateTo: string
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof GenerateGoodsMovementReportRequest
	 */
	shopSku?: string
}
/**
 * Данные, необходимые для генерации отчета: идентификатор магазина и период, за который нужен отчет.
 * @export
 * @interface GenerateGoodsRealizationReportRequest
 */
export interface GenerateGoodsRealizationReportRequest {
	/**
	 * Идентификатор кампании.
	 * @type {number}
	 * @memberof GenerateGoodsRealizationReportRequest
	 */
	campaignId: number
	/**
	 * Год.
	 * @type {number}
	 * @memberof GenerateGoodsRealizationReportRequest
	 */
	year: number
	/**
	 * Номер месяца.
	 * @type {number}
	 * @memberof GenerateGoodsRealizationReportRequest
	 */
	month: number
}
/**
 * Данные, необходимые для генерации отчета.
 * @export
 * @interface GenerateGoodsTurnoverRequest
 */
export interface GenerateGoodsTurnoverRequest {
	/**
	 * Идентификатор кампании.
	 * @type {number}
	 * @memberof GenerateGoodsTurnoverRequest
	 */
	campaignId: number
	/**
	 * Дата, за которую нужно рассчитать оборачиваемость. Если параметр не указан, используется текущая дата.
	 * @type {string}
	 * @memberof GenerateGoodsTurnoverRequest
	 */
	date?: string
}
/**
 * Данные, необходимые для генерации файла.
 * @export
 * @interface GenerateMassOrderLabelsRequest
 */
export interface GenerateMassOrderLabelsRequest {
	/**
	 * Идентификатор кабинета.
	 * @type {number}
	 * @memberof GenerateMassOrderLabelsRequest
	 */
	businessId: number
	/**
	 * Список идентификаторов заказов.
	 * @type {Set<number>}
	 * @memberof GenerateMassOrderLabelsRequest
	 */
	orderIds: Set<number>
	/**
	 *
	 * @type {LabelsSortingType}
	 * @memberof GenerateMassOrderLabelsRequest
	 */
	sortingType?: LabelsSortingType
}

/**
 * Данные, необходимые для генерации отчета.
 * @export
 * @interface GeneratePricesReportRequest
 */
export interface GeneratePricesReportRequest {
	/**
	 * Идентификатор бизнеса.  В большинстве случаев обязателен. Не указывается, если задан `campaignId`.
	 * @type {number}
	 * @memberof GeneratePricesReportRequest
	 */
	businessId?: number
	/**
	 * Идентификатор кампании.  Как правило, не используется. Передавайте только если в кабинете есть магазины с уникальными ценами и вы хотите получить отчет для них. В этом случае передавать `businessId` не нужно.
	 * @type {number}
	 * @memberof GeneratePricesReportRequest
	 */
	campaignId?: number
	/**
	 * Фильтр по категориям на Маркете.
	 * @type {Array<number>}
	 * @memberof GeneratePricesReportRequest
	 */
	categoryIds?: number[] | null
	/**
	 * Фильтр по времени появления предложения — начало периода.  Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof GeneratePricesReportRequest
	 */
	creationDateFrom?: string
	/**
	 * Фильтр по времени появления предложения — окончание периода.  Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof GeneratePricesReportRequest
	 */
	creationDateTo?: string
}
/**
 * Идентификатор, который понадобится для отслеживания статуса генерации и получения готового отчета.
 * @export
 * @interface GenerateReportDTO
 */
export interface GenerateReportDTO {
	/**
	 * Идентификатор, который понадобится для отслеживания статуса генерации и получения готового отчета.
	 * @type {string}
	 * @memberof GenerateReportDTO
	 */
	reportId: string
	/**
	 * Ожидаемая продолжительность генерации в миллисекундах.
	 * @type {number}
	 * @memberof GenerateReportDTO
	 */
	estimatedGenerationTime: number
}
/**
 * Ответ на запрос генерации отчета.
 * @export
 * @interface GenerateReportResponse
 */
export interface GenerateReportResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GenerateReportResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GenerateReportDTO}
	 * @memberof GenerateReportResponse
	 */
	result?: GenerateReportDTO
}

/**
 * Данные, необходимые для генерации отчета.
 * @export
 * @interface GenerateShelfsStatisticsRequest
 */
export interface GenerateShelfsStatisticsRequest {
	/**
	 * Идентификатор бизнеса.
	 * @type {number}
	 * @memberof GenerateShelfsStatisticsRequest
	 */
	businessId: number
	/**
	 * Начало периода, включительно.
	 * @type {string}
	 * @memberof GenerateShelfsStatisticsRequest
	 */
	dateFrom: string
	/**
	 * Конец периода, включительно.
	 * @type {string}
	 * @memberof GenerateShelfsStatisticsRequest
	 */
	dateTo: string
	/**
	 *
	 * @type {ShelfsStatisticsAttributionType}
	 * @memberof GenerateShelfsStatisticsRequest
	 */
	attributionType: ShelfsStatisticsAttributionType
}

/**
 * Данные, необходимые для генерации документа.
 * @export
 * @interface GenerateShipmentListDocumentReportRequest
 */
export interface GenerateShipmentListDocumentReportRequest {
	/**
	 * Идентификатор кампании.
	 * @type {number}
	 * @memberof GenerateShipmentListDocumentReportRequest
	 */
	campaignId: number
	/**
	 * Идентификатор отгрузки.
	 * @type {number}
	 * @memberof GenerateShipmentListDocumentReportRequest
	 */
	shipmentId?: number
	/**
	 * Фильтр по идентификаторам заказа в отгрузке.
	 * @type {Array<number>}
	 * @memberof GenerateShipmentListDocumentReportRequest
	 */
	orderIds?: number[] | null
}
/**
 * Данные, необходимые для генерации отчета.
 * @export
 * @interface GenerateShowsSalesReportRequest
 */
export interface GenerateShowsSalesReportRequest {
	/**
	 * Идентификатор бизнеса.  Указывается, если нужно составить отчет по всем магазинам бизнеса. В запросе обязательно должен быть либо `businessID`, либо `campaignId`, но не оба сразу.
	 * @type {number}
	 * @memberof GenerateShowsSalesReportRequest
	 */
	businessId?: number
	/**
	 * Идентификатор кампании.  Указывается, если нужно составить отчет по конкретному магазину. В запросе обязательно должен быть либо `businessID`, либо `campaignId`, но не оба сразу.
	 * @type {number}
	 * @memberof GenerateShowsSalesReportRequest
	 */
	campaignId?: number
	/**
	 * Начало периода, включительно.
	 * @type {string}
	 * @memberof GenerateShowsSalesReportRequest
	 */
	dateFrom: string
	/**
	 * Конец периода, включительно.
	 * @type {string}
	 * @memberof GenerateShowsSalesReportRequest
	 */
	dateTo: string
	/**
	 *
	 * @type {ShowsSalesGroupingType}
	 * @memberof GenerateShowsSalesReportRequest
	 */
	grouping: ShowsSalesGroupingType
}

/**
 * Данные, необходимые для генерации отчета.
 * @export
 * @interface GenerateStocksOnWarehousesReportRequest
 */
export interface GenerateStocksOnWarehousesReportRequest {
	/**
	 * Идентификатор магазина.
	 * @type {number}
	 * @memberof GenerateStocksOnWarehousesReportRequest
	 */
	campaignId: number
	/**
	 * Фильтр по идентификаторам складов (только модель FBY). Чтобы узнать идентификатор, воспользуйтесь запросом [GET warehouses](../../reference/warehouses/getFulfillmentWarehouses.md).
	 * @type {Array<number>}
	 * @memberof GenerateStocksOnWarehousesReportRequest
	 */
	warehouseIds?: number[] | null
	/**
	 * Фильтр по дате (для модели FBY). В отчет попадут данные за **предшествующий** дате день.
	 * @type {string}
	 * @memberof GenerateStocksOnWarehousesReportRequest
	 */
	reportDate?: string
	/**
	 * Фильтр по категориям на Маркете (кроме модели FBY).
	 * @type {Array<number>}
	 * @memberof GenerateStocksOnWarehousesReportRequest
	 */
	categoryIds?: number[] | null
	/**
	 * Фильтр по наличию остатков (кроме модели FBY).
	 * @type {boolean}
	 * @memberof GenerateStocksOnWarehousesReportRequest
	 */
	hasStocks?: boolean
}
/**
 * Данные, необходимые для генерации отчета: идентификатор магазина, период, за который нужен отчет, а также фильтры.
 * @export
 * @interface GenerateUnitedMarketplaceServicesReportRequest
 */
export interface GenerateUnitedMarketplaceServicesReportRequest {
	/**
	 * Идентификатор бизнеса.
	 * @type {number}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	businessId: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Начало периода, включительно.
	 * @type {string}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	dateTimeFrom?: string
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Конец периода, включительно. Максимальный период — 3 месяца.
	 * @type {string}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	dateTimeTo?: string
	/**
	 * Начало периода, включительно.
	 * @type {string}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	dateFrom?: string
	/**
	 * Конец периода, включительно. Максимальный период — 3 месяца.
	 * @type {string}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	dateTo?: string
	/**
	 * Начальный год формирования акта.
	 * @type {number}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	yearFrom?: number
	/**
	 * Начальный номер месяца формирования акта.
	 * @type {number}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	monthFrom?: number
	/**
	 * Конечный год формирования акта.
	 * @type {number}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	yearTo?: number
	/**
	 * Конечный номер месяца формирования акта.
	 * @type {number}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	monthTo?: number
	/**
	 * Список моделей, которые нужны в отчете.
	 * @type {Array<PlacementType>}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	placementPrograms?: PlacementType[] | null
	/**
	 * Список ИНН, которые нужны в отчете.
	 * @type {Array<string>}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	inns?: string[] | null
	/**
	 * Список магазинов, которые нужны в отчете.
	 * @type {Array<number>}
	 * @memberof GenerateUnitedMarketplaceServicesReportRequest
	 */
	campaignIds?: number[] | null
}
/**
 * Данные, необходимые для генерации отчета: идентификатор магазина, период, за который нужен отчет, а также фильтры.
 * @export
 * @interface GenerateUnitedNettingReportRequest
 */
export interface GenerateUnitedNettingReportRequest {
	/**
	 * Идентификатор бизнеса.
	 * @type {number}
	 * @memberof GenerateUnitedNettingReportRequest
	 */
	businessId: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Начало периода, включительно.
	 * @type {string}
	 * @memberof GenerateUnitedNettingReportRequest
	 */
	dateTimeFrom?: string
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Конец периода, включительно. Максимальный период — 3 месяца.
	 * @type {string}
	 * @memberof GenerateUnitedNettingReportRequest
	 */
	dateTimeTo?: string
	/**
	 * Начало периода, включительно.
	 * @type {string}
	 * @memberof GenerateUnitedNettingReportRequest
	 */
	dateFrom?: string
	/**
	 * Конец периода, включительно. Максимальный период — 3 месяца.
	 * @type {string}
	 * @memberof GenerateUnitedNettingReportRequest
	 */
	dateTo?: string
	/**
	 * Номер платежного поручения.
	 * @type {number}
	 * @memberof GenerateUnitedNettingReportRequest
	 */
	bankOrderId?: number
	/**
	 * Дата платежного поручения.
	 * @type {string}
	 * @memberof GenerateUnitedNettingReportRequest
	 */
	bankOrderDateTime?: string
	/**
	 * Список моделей, которые нужны в отчете.
	 * @type {Array<PlacementType>}
	 * @memberof GenerateUnitedNettingReportRequest
	 */
	placementPrograms?: PlacementType[] | null
	/**
	 * Список ИНН, которые нужны в отчете.
	 * @type {Array<string>}
	 * @memberof GenerateUnitedNettingReportRequest
	 */
	inns?: string[] | null
	/**
	 * Список магазинов, которые нужны в отчете.
	 * @type {Array<number>}
	 * @memberof GenerateUnitedNettingReportRequest
	 */
	campaignIds?: number[] | null
}
/**
 * Данные, необходимые для генерации отчета.
 * @export
 * @interface GenerateUnitedOrdersRequest
 */
export interface GenerateUnitedOrdersRequest {
	/**
	 * Идентификатор бизнеса.
	 * @type {number}
	 * @memberof GenerateUnitedOrdersRequest
	 */
	businessId: number
	/**
	 * Начало периода, включительно.
	 * @type {string}
	 * @memberof GenerateUnitedOrdersRequest
	 */
	dateFrom: string
	/**
	 * Конец периода, включительно. Максимальный период — 1 год.
	 * @type {string}
	 * @memberof GenerateUnitedOrdersRequest
	 */
	dateTo: string
	/**
	 * Список магазинов, которые нужны в отчете.
	 * @type {Array<number>}
	 * @memberof GenerateUnitedOrdersRequest
	 */
	campaignIds?: number[] | null
	/**
	 * Идентификатор акции, товары из которой нужны в отчете.
	 * @type {string}
	 * @memberof GenerateUnitedOrdersRequest
	 */
	promoId?: string
}
/**
 * Список предложений.
 * @export
 * @interface GetAllOffersResponse
 */
export interface GetAllOffersResponse {
	/**
	 * Список предложений магазина.
	 * @type {Array<OfferDTO>}
	 * @memberof GetAllOffersResponse
	 */
	offers: OfferDTO[]
}
/**
 * description.
 * @export
 * @interface GetBidsInfoRequest
 */
export interface GetBidsInfoRequest {
	/**
	 * Список товаров, для которых нужно получить значения ставок.  Если список не задан, постранично возвращаются все товары со ставками.  Если список задан, результаты возвращаются одной страницей, а параметры `page_token` и `limit` игнорируются.
	 * @type {Set<string>}
	 * @memberof GetBidsInfoRequest
	 */
	skus?: Set<string> | null
}
/**
 * description.
 * @export
 * @interface GetBidsInfoResponse
 */
export interface GetBidsInfoResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetBidsInfoResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetBidsInfoResponseDTO}
	 * @memberof GetBidsInfoResponse
	 */
	result?: GetBidsInfoResponseDTO
}

/**
 * Список товаров с указанными ставками.
 * @export
 * @interface GetBidsInfoResponseDTO
 */
export interface GetBidsInfoResponseDTO {
	/**
	 * Страница списка товаров.
	 * @type {Array<SkuBidItemDTO>}
	 * @memberof GetBidsInfoResponseDTO
	 */
	bids: SkuBidItemDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof GetBidsInfoResponseDTO
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * description.
 * @export
 * @interface GetBidsRecommendationsRequest
 */
export interface GetBidsRecommendationsRequest {
	/**
	 * Список товаров, для которых нужно получить рекомендации по ставкам.
	 * @type {Set<string>}
	 * @memberof GetBidsRecommendationsRequest
	 */
	skus: Set<string>
}
/**
 * description.
 * @export
 * @interface GetBidsRecommendationsResponse
 */
export interface GetBidsRecommendationsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetBidsRecommendationsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetBidsRecommendationsResponseDTO}
	 * @memberof GetBidsRecommendationsResponse
	 */
	result?: GetBidsRecommendationsResponseDTO
}

/**
 * Список товаров с рекомендованными ставками.
 * @export
 * @interface GetBidsRecommendationsResponseDTO
 */
export interface GetBidsRecommendationsResponseDTO {
	/**
	 * Список товаров с рекомендованными ставками.
	 * @type {Array<SkuBidRecommendationItemDTO>}
	 * @memberof GetBidsRecommendationsResponseDTO
	 */
	recommendations: SkuBidRecommendationItemDTO[]
}
/**
 *
 * @export
 * @interface GetBusinessBuyerInfoResponse
 */
export interface GetBusinessBuyerInfoResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetBusinessBuyerInfoResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OrderBusinessBuyerDTO}
	 * @memberof GetBusinessBuyerInfoResponse
	 */
	result?: OrderBusinessBuyerDTO
}

/**
 *
 * @export
 * @interface GetBusinessDocumentsInfoResponse
 */
export interface GetBusinessDocumentsInfoResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetBusinessDocumentsInfoResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OrderBusinessDocumentsDTO}
	 * @memberof GetBusinessDocumentsInfoResponse
	 */
	result?: OrderBusinessDocumentsDTO
}

/**
 * Информация о кабинете и его настройках.
 * @export
 * @interface GetBusinessSettingsInfoDTO
 */
export interface GetBusinessSettingsInfoDTO {
	/**
	 *
	 * @type {BusinessDTO}
	 * @memberof GetBusinessSettingsInfoDTO
	 */
	info?: BusinessDTO
	/**
	 *
	 * @type {BusinessSettingsDTO}
	 * @memberof GetBusinessSettingsInfoDTO
	 */
	settings?: BusinessSettingsDTO
}
/**
 * Ответ на запрос настроек кабинета.
 * @export
 * @interface GetBusinessSettingsResponse
 */
export interface GetBusinessSettingsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetBusinessSettingsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetBusinessSettingsInfoDTO}
	 * @memberof GetBusinessSettingsResponse
	 */
	result?: GetBusinessSettingsInfoDTO
}

/**
 * Ответ на запрос списка логинов, связанных с магазином.
 * @export
 * @interface GetCampaignLoginsResponse
 */
export interface GetCampaignLoginsResponse {
	/**
	 * Список логинов.
	 * @type {Array<string>}
	 * @memberof GetCampaignLoginsResponse
	 */
	logins: string[]
}
/**
 * Параметры размещения товара в магазине.
 * @export
 * @interface GetCampaignOfferDTO
 */
export interface GetCampaignOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof GetCampaignOfferDTO
	 */
	offerId: string
	/**
	 *
	 * @type {QuantumDTO}
	 * @memberof GetCampaignOfferDTO
	 */
	quantum?: QuantumDTO
	/**
	 * Есть ли товар в продаже.
	 * @type {boolean}
	 * @memberof GetCampaignOfferDTO
	 */
	available?: boolean
	/**
	 *
	 * @type {GetPriceWithDiscountDTO}
	 * @memberof GetCampaignOfferDTO
	 */
	basicPrice?: GetPriceWithDiscountDTO
	/**
	 *
	 * @type {GetPriceWithVatDTO}
	 * @memberof GetCampaignOfferDTO
	 */
	campaignPrice?: GetPriceWithVatDTO
	/**
	 *
	 * @type {OfferCampaignStatusType}
	 * @memberof GetCampaignOfferDTO
	 */
	status?: OfferCampaignStatusType
	/**
	 * Ошибки, препятствующие размещению товара на витрине.
	 * @type {Array<OfferErrorDTO>}
	 * @memberof GetCampaignOfferDTO
	 */
	errors?: OfferErrorDTO[] | null
	/**
	 * Предупреждения, не препятствующие размещению товара на витрине.
	 * @type {Array<OfferErrorDTO>}
	 * @memberof GetCampaignOfferDTO
	 */
	warnings?: OfferErrorDTO[] | null
}

/**
 * Фильтрации товаров  В запросе можно указать либо фильтр offerIds, либо любые другие фильтры товаров. Совместное использование фильтра offerIds с другими фильтрациями приведет к ошибке.
 * @export
 * @interface GetCampaignOffersRequest
 */
export interface GetCampaignOffersRequest {
	/**
	 * Идентификаторы товаров, информация о которых нужна.  {% note warning \"Такой список возвращается только целиком\" %}  Не используйте это поле одновременно с фильтрами по статусам карточек, категориям, брендам или тегам. Если вы хотите воспользоваться фильтрами, оставьте поле пустым.  Если вы запрашиваете информацию по конкретным SKU, не заполняйте:  * `page_token` * `limit`  {% endnote %}
	 * @type {Set<string>}
	 * @memberof GetCampaignOffersRequest
	 */
	offerIds?: Set<string> | null
	/**
	 * Фильтр по статусам товаров.
	 * @type {Set<OfferCampaignStatusType>}
	 * @memberof GetCampaignOffersRequest
	 */
	statuses?: Set<OfferCampaignStatusType> | null
	/**
	 * Фильтр по категориям на Маркете.
	 * @type {Set<number>}
	 * @memberof GetCampaignOffersRequest
	 */
	categoryIds?: Set<number> | null
	/**
	 * Фильтр по брендам.
	 * @type {Set<string>}
	 * @memberof GetCampaignOffersRequest
	 */
	vendorNames?: Set<string> | null
	/**
	 * Фильтр по тегам.
	 * @type {Set<string>}
	 * @memberof GetCampaignOffersRequest
	 */
	tags?: Set<string> | null
}
/**
 * Ответ на запрос списка товаров в магазине.
 * @export
 * @interface GetCampaignOffersResponse
 */
export interface GetCampaignOffersResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetCampaignOffersResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetCampaignOffersResultDTO}
	 * @memberof GetCampaignOffersResponse
	 */
	result?: GetCampaignOffersResultDTO
}

/**
 * Список товаров в заданном магазине.
 * @export
 * @interface GetCampaignOffersResultDTO
 */
export interface GetCampaignOffersResultDTO {
	/**
	 *
	 * @type {ScrollingPagerDTO}
	 * @memberof GetCampaignOffersResultDTO
	 */
	paging?: ScrollingPagerDTO
	/**
	 * Страница списка товаров.
	 * @type {Array<GetCampaignOfferDTO>}
	 * @memberof GetCampaignOffersResultDTO
	 */
	offers: GetCampaignOfferDTO[]
}
/**
 * Ответ на запрос региона магазина.
 * @export
 * @interface GetCampaignRegionResponse
 */
export interface GetCampaignRegionResponse {
	/**
	 *
	 * @type {RegionDTO}
	 * @memberof GetCampaignRegionResponse
	 */
	region?: RegionDTO
}
/**
 * Информация о магазине к данным идентификатора кампании.
 * @export
 * @interface GetCampaignResponse
 */
export interface GetCampaignResponse {
	/**
	 *
	 * @type {CampaignDTO}
	 * @memberof GetCampaignResponse
	 */
	campaign?: CampaignDTO
}
/**
 * Ответ на запрос настроек магазина.
 * @export
 * @interface GetCampaignSettingsResponse
 */
export interface GetCampaignSettingsResponse {
	/**
	 *
	 * @type {CampaignSettingsDTO}
	 * @memberof GetCampaignSettingsResponse
	 */
	settings?: CampaignSettingsDTO
}
/**
 * Результаты поиска магазинов.
 * @export
 * @interface GetCampaignsResponse
 */
export interface GetCampaignsResponse {
	/**
	 * Список с информацией по каждому магазину.
	 * @type {Array<CampaignDTO>}
	 * @memberof GetCampaignsResponse
	 */
	campaigns: CampaignDTO[]
	/**
	 *
	 * @type {FlippingPagerDTO}
	 * @memberof GetCampaignsResponse
	 */
	pager?: FlippingPagerDTO
}
/**
 * Категории и лимит на установку кванта и минимального количества товаров.
 * @export
 * @interface GetCategoriesMaxSaleQuantumDTO
 */
export interface GetCategoriesMaxSaleQuantumDTO {
	/**
	 * Категории и лимит на установку кванта и минимального количества товаров.
	 * @type {Array<MaxSaleQuantumDTO>}
	 * @memberof GetCategoriesMaxSaleQuantumDTO
	 */
	results: MaxSaleQuantumDTO[]
	/**
	 * Ошибки, которые появились из-за переданных категорий.
	 * @type {Array<CategoryErrorDTO>}
	 * @memberof GetCategoriesMaxSaleQuantumDTO
	 */
	errors?: CategoryErrorDTO[] | null
}
/**
 * Список категорий, для которых нужно вернуть лимит на установку кванта и минимального количества товаров.
 * @export
 * @interface GetCategoriesMaxSaleQuantumRequest
 */
export interface GetCategoriesMaxSaleQuantumRequest {
	/**
	 * Идентификаторы листовых категории на Маркете — тех, у которых нет дочерних категорий.
	 * @type {Set<number>}
	 * @memberof GetCategoriesMaxSaleQuantumRequest
	 */
	marketCategoryIds: Set<number>
}
/**
 *
 * @export
 * @interface GetCategoriesMaxSaleQuantumResponse
 */
export interface GetCategoriesMaxSaleQuantumResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetCategoriesMaxSaleQuantumResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Категории и лимит на установку кванта и минимального количества товаров.
	 * @type {Array<MaxSaleQuantumDTO>}
	 * @memberof GetCategoriesMaxSaleQuantumResponse
	 */
	results: MaxSaleQuantumDTO[]
	/**
	 * Ошибки, которые появились из-за переданных категорий.
	 * @type {Array<CategoryErrorDTO>}
	 * @memberof GetCategoriesMaxSaleQuantumResponse
	 */
	errors?: CategoryErrorDTO[] | null
}

/**
 * Параметры запроса категорий.
 * @export
 * @interface GetCategoriesRequest
 */
export interface GetCategoriesRequest {
	/**
	 *
	 * @type {LanguageType}
	 * @memberof GetCategoriesRequest
	 */
	language?: LanguageType
}

/**
 *
 * @export
 * @interface GetCategoriesResponse
 */
export interface GetCategoriesResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetCategoriesResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {CategoryDTO}
	 * @memberof GetCategoriesResponse
	 */
	result?: CategoryDTO
}

/**
 * Ответ со списком характеристик для категории и их допустимыми значениями.
 * @export
 * @interface GetCategoryContentParametersResponse
 */
export interface GetCategoryContentParametersResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetCategoryContentParametersResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {CategoryContentParametersDTO}
	 * @memberof GetCategoryContentParametersResponse
	 */
	result?: CategoryContentParametersDTO
}

/**
 * Историю какого чата нужно получить — и начиная с какого сообщения.
 * @export
 * @interface GetChatHistoryRequest
 */
export interface GetChatHistoryRequest {
	/**
	 * Идентификатор сообщения, начиная с которого нужно получить все последующие сообщения.
	 * @type {number}
	 * @memberof GetChatHistoryRequest
	 */
	messageIdFrom?: number
}
/**
 *
 * @export
 * @interface GetChatHistoryResponse
 */
export interface GetChatHistoryResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetChatHistoryResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {ChatMessagesResultDTO}
	 * @memberof GetChatHistoryResponse
	 */
	result?: ChatMessagesResultDTO
}

/**
 * Информация о чатах.
 * @export
 * @interface GetChatInfoDTO
 */
export interface GetChatInfoDTO {
	/**
	 * Идентификатор чата.
	 * @type {number}
	 * @memberof GetChatInfoDTO
	 */
	chatId: number
	/**
	 * Идентификатор заказа.
	 * @type {number}
	 * @memberof GetChatInfoDTO
	 */
	orderId: number
	/**
	 *
	 * @type {ChatType}
	 * @memberof GetChatInfoDTO
	 */
	type: ChatType
	/**
	 *
	 * @type {ChatStatusType}
	 * @memberof GetChatInfoDTO
	 */
	status: ChatStatusType
	/**
	 * Дата и время создания чата.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof GetChatInfoDTO
	 */
	createdAt: string
	/**
	 * Дата и время последнего сообщения в чате.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof GetChatInfoDTO
	 */
	updatedAt: string
}

/**
 * Список чатов.
 * @export
 * @interface GetChatsInfoDTO
 */
export interface GetChatsInfoDTO {
	/**
	 * Информация о чатах.
	 * @type {Array<GetChatInfoDTO>}
	 * @memberof GetChatsInfoDTO
	 */
	chats: GetChatInfoDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof GetChatsInfoDTO
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * Фильтры по чатам, которые нужно вернуть.
 * @export
 * @interface GetChatsRequest
 */
export interface GetChatsRequest {
	/**
	 * Фильтр по идентификаторам заказов на Маркете.
	 * @type {Set<number>}
	 * @memberof GetChatsRequest
	 */
	orderIds?: Set<number> | null
	/**
	 * Фильтр по типам чатов.
	 * @type {Array<ChatType>}
	 * @memberof GetChatsRequest
	 */
	types?: ChatType[] | null
	/**
	 * Фильтр по статусам чатов.
	 * @type {Array<ChatStatusType>}
	 * @memberof GetChatsRequest
	 */
	statuses?: ChatStatusType[] | null
}
/**
 *
 * @export
 * @interface GetChatsResponse
 */
export interface GetChatsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetChatsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetChatsInfoDTO}
	 * @memberof GetChatsResponse
	 */
	result?: GetChatsInfoDTO
}

/**
 * Ответ на запрос списка служб доставки.
 * @export
 * @interface GetDeliveryServicesResponse
 */
export interface GetDeliveryServicesResponse {
	/**
	 *
	 * @type {DeliveryServicesDTO}
	 * @memberof GetDeliveryServicesResponse
	 */
	result?: DeliveryServicesDTO
}
/**
 *
 * @export
 * @interface GetFeedIndexLogsResponse
 */
export interface GetFeedIndexLogsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetFeedIndexLogsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {FeedIndexLogsResultDTO}
	 * @memberof GetFeedIndexLogsResponse
	 */
	result?: FeedIndexLogsResultDTO
}

/**
 * Ответ на запрос информации о прайс-листе.
 * @export
 * @interface GetFeedResponse
 */
export interface GetFeedResponse {
	/**
	 *
	 * @type {FeedDTO}
	 * @memberof GetFeedResponse
	 */
	feed?: FeedDTO
}
/**
 * Ответ на запрос списка прайс-листов.
 * @export
 * @interface GetFeedsResponse
 */
export interface GetFeedsResponse {
	/**
	 * Список прайс-листов.
	 * @type {Array<FeedDTO>}
	 * @memberof GetFeedsResponse
	 */
	feeds: FeedDTO[]
}
/**
 *
 * @export
 * @interface GetFulfillmentWarehousesResponse
 */
export interface GetFulfillmentWarehousesResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetFulfillmentWarehousesResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {FulfillmentWarehousesDTO}
	 * @memberof GetFulfillmentWarehousesResponse
	 */
	result?: FulfillmentWarehousesDTO
}

/**
 * Фильтр запроса комментариев отзыва.
 * @export
 * @interface GetGoodsFeedbackCommentsRequest
 */
export interface GetGoodsFeedbackCommentsRequest {
	/**
	 * Идентификатор отзыва.
	 * @type {number}
	 * @memberof GetGoodsFeedbackCommentsRequest
	 */
	feedbackId: number
}
/**
 *
 * @export
 * @interface GetGoodsFeedbackCommentsResponse
 */
export interface GetGoodsFeedbackCommentsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetGoodsFeedbackCommentsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GoodsFeedbackCommentListDTO}
	 * @memberof GetGoodsFeedbackCommentsResponse
	 */
	result?: GoodsFeedbackCommentListDTO
}

/**
 * Фильтр запроса отзывов в кабинете.
 * @export
 * @interface GetGoodsFeedbackRequest
 */
export interface GetGoodsFeedbackRequest {
	/**
	 * Начало периода. Не включительно.  Если параметр не указан, возвращается информация за 6 месяцев до указанной в `dateTimeTo` даты.
	 * @type {string}
	 * @memberof GetGoodsFeedbackRequest
	 */
	dateTimeFrom?: string
	/**
	 * Конец периода. Не включительно.  Если параметр не указан, используется текущая дата.
	 * @type {string}
	 * @memberof GetGoodsFeedbackRequest
	 */
	dateTimeTo?: string
	/**
	 *
	 * @type {FeedbackReactionStatusType}
	 * @memberof GetGoodsFeedbackRequest
	 */
	reactionStatus?: FeedbackReactionStatusType
	/**
	 * Оценка товара.
	 * @type {Set<number>}
	 * @memberof GetGoodsFeedbackRequest
	 */
	ratingValues?: Set<number> | null
	/**
	 * Фильтр по идентификатору модели товара.  Получить идентификатор модели можно с помощью одного из запросов:  * [POST businesses/{businessId}/offer-mappings](../../reference/business-assortment/getOfferMappings.md);  * [POST businesses/{businessId}/offer-cards](../../reference/content/getOfferCardsContentStatus.md);  * [POST models](../../reference/models/getModels.md).
	 * @type {Set<number>}
	 * @memberof GetGoodsFeedbackRequest
	 */
	modelIds?: Set<number> | null
	/**
	 * Фильтр отзывов за баллы Плюса.
	 * @type {boolean}
	 * @memberof GetGoodsFeedbackRequest
	 */
	paid?: boolean
}

/**
 *
 * @export
 * @interface GetGoodsFeedbackResponse
 */
export interface GetGoodsFeedbackResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetGoodsFeedbackResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GoodsFeedbackListDTO}
	 * @memberof GetGoodsFeedbackResponse
	 */
	result?: GoodsFeedbackListDTO
}

/**
 * Запрос отчета по товарам.
 * @export
 * @interface GetGoodsStatsRequest
 */
export interface GetGoodsStatsRequest {
	/**
	 * Список ваших идентификаторов SKU.
	 * @type {Set<string>}
	 * @memberof GetGoodsStatsRequest
	 */
	shopSkus: Set<string>
}
/**
 * Ответ на запрос отчета по товарам.
 * @export
 * @interface GetGoodsStatsResponse
 */
export interface GetGoodsStatsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetGoodsStatsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GoodsStatsDTO}
	 * @memberof GetGoodsStatsResponse
	 */
	result?: GoodsStatsDTO
}

/**
 * Ответ на запрос списка скрытий.
 * @export
 * @interface GetHiddenOffersResponse
 */
export interface GetHiddenOffersResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetHiddenOffersResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetHiddenOffersResultDTO}
	 * @memberof GetHiddenOffersResponse
	 */
	result?: GetHiddenOffersResultDTO
}

/**
 * Список скрытых вами товаров.
 * @export
 * @interface GetHiddenOffersResultDTO
 */
export interface GetHiddenOffersResultDTO {
	/**
	 *
	 * @type {ScrollingPagerDTO}
	 * @memberof GetHiddenOffersResultDTO
	 */
	paging?: ScrollingPagerDTO
	/**
	 * Список скрытых товаров.
	 * @type {Array<HiddenOfferDTO>}
	 * @memberof GetHiddenOffersResultDTO
	 */
	hiddenOffers: HiddenOfferDTO[]
}
/**
 * Информация о товарах в каталоге.
 * @export
 * @interface GetMappingDTO
 */
export interface GetMappingDTO {
	/**
	 * SKU на Маркете.
	 * @type {number}
	 * @memberof GetMappingDTO
	 */
	marketSku?: number
	/**
	 * Название карточки товара.  Может отсутствовать в ответе, если товар еще не привязан к карточке.
	 * @type {string}
	 * @memberof GetMappingDTO
	 */
	marketSkuName?: string
	/**
	 * Идентификатор модели на Маркете.  Может отсутствовать в ответе, если товар еще не привязан к карточке.
	 * @type {number}
	 * @memberof GetMappingDTO
	 */
	marketModelId?: number
	/**
	 * Название модели на Маркете.  Может отсутствовать в ответе, если товар еще не привязан к карточке.
	 * @type {string}
	 * @memberof GetMappingDTO
	 */
	marketModelName?: string
	/**
	 * Идентификатор категории на Маркете, в которую попал товар.  Может отсутствовать в ответе, если Маркет еще не определил категорию товара.
	 * @type {number}
	 * @memberof GetMappingDTO
	 */
	marketCategoryId?: number
	/**
	 * Название категории карточки на Маркете.  Может отсутствовать в ответе, если Маркет еще не определил категорию товара.
	 * @type {string}
	 * @memberof GetMappingDTO
	 */
	marketCategoryName?: string
}
/**
 * Ответ на запрос списка предложений для моделей.
 * @export
 * @interface GetModelsOffersResponse
 */
export interface GetModelsOffersResponse {
	/**
	 * Список моделей товаров.
	 * @type {Array<EnrichedModelDTO>}
	 * @memberof GetModelsOffersResponse
	 */
	models: EnrichedModelDTO[]
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof GetModelsOffersResponse
	 */
	currency?: CurrencyType
	/**
	 * Идентификатор региона, для которого выводится информация о предложениях модели (доставляемых в этот регион).  Информацию о регионе по идентификатору можно получить с помощью запроса [GET regions/{regionId}](../../reference/regions/searchRegionsById.md).
	 * @type {number}
	 * @memberof GetModelsOffersResponse
	 */
	regionId?: number
}

/**
 * Запрос информации о моделях.
 * @export
 * @interface GetModelsRequest
 */
export interface GetModelsRequest {
	/**
	 * Список моделей.
	 * @type {Array<number>}
	 * @memberof GetModelsRequest
	 */
	models: number[]
}
/**
 * Ответ на запрос информации о моделях.
 * @export
 * @interface GetModelsResponse
 */
export interface GetModelsResponse {
	/**
	 * Список моделей товаров.
	 * @type {Array<ModelDTO>}
	 * @memberof GetModelsResponse
	 */
	models: ModelDTO[]
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof GetModelsResponse
	 */
	currency?: CurrencyType
	/**
	 * Идентификатор региона, для которого выводится информация о предложениях модели (доставляемых в этот регион).  Информацию о регионе по идентификатору можно получить с помощью запроса [GET regions/{regionId}](../../reference/regions/searchRegionsById.md).
	 * @type {number}
	 * @memberof GetModelsResponse
	 */
	regionId?: number
}

/**
 *
 * @export
 * @interface GetOfferCardsContentStatusRequest
 */
export interface GetOfferCardsContentStatusRequest {
	/**
	 * Идентификаторы товаров, информация о которых нужна. <br><br> ⚠️ Не используйте это поле одновременно с фильтрами по статусам карточек, категориям, брендам или тегам. Если вы хотите воспользоваться фильтрами, оставьте поле пустым.
	 * @type {Set<string>}
	 * @memberof GetOfferCardsContentStatusRequest
	 */
	offerIds?: Set<string> | null
	/**
	 * Фильтр по статусам карточек.  [Что такое карточка товара](https://yandex.ru/support/marketplace/assortment/content/index.html)
	 * @type {Set<OfferCardStatusType>}
	 * @memberof GetOfferCardsContentStatusRequest
	 */
	cardStatuses?: Set<OfferCardStatusType> | null
	/**
	 * Фильтр по категориям на Маркете.
	 * @type {Set<number>}
	 * @memberof GetOfferCardsContentStatusRequest
	 */
	categoryIds?: Set<number> | null
}
/**
 * Ответ со списком состояний товаров и пагинацией.
 * @export
 * @interface GetOfferCardsContentStatusResponse
 */
export interface GetOfferCardsContentStatusResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetOfferCardsContentStatusResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OfferCardsContentStatusDTO}
	 * @memberof GetOfferCardsContentStatusResponse
	 */
	result?: OfferCardsContentStatusDTO
}

/**
 * Параметры товара.
 * @export
 * @interface GetOfferDTO
 */
export interface GetOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof GetOfferDTO
	 */
	offerId: string
	/**
	 * Составляйте название по схеме: тип + бренд или производитель + модель + особенности, если есть (например, цвет, размер или вес) и количество в упаковке.  Не включайте в название условия продажи (например, «скидка», «бесплатная доставка» и т. д.), эмоциональные характеристики («хит», «супер» и т. д.). Не пишите слова большими буквами — кроме устоявшихся названий брендов и моделей.  Оптимальная длина — 50–60 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/title.html)
	 * @type {string}
	 * @memberof GetOfferDTO
	 */
	name?: string
	/**
	 * Идентификатор категории на Маркете, к которой вы относите свой товар.  Если не указать `marketCategoryId`, то маркетная категория будет определена автоматически.  При изменении категории убедитесь, что характеристики товара и их значения в параметре `parameterValues` вы передаете для новой категории.  Список категорий Маркета можно получить с помощью запроса  [POST categories/tree](../../reference/categories/getCategoriesTree.md).
	 * @type {number}
	 * @memberof GetOfferDTO
	 */
	marketCategoryId?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `marketCategoryId`.  {% endnote %}  Категория товара в вашем магазине.
	 * @type {string}
	 * @memberof GetOfferDTO
	 * @deprecated
	 */
	category?: string
	/**
	 * Ссылки на изображения товара. Изображение по первой ссылке считается основным, остальные дополнительными.  **Требования к ссылкам**  * Ссылок может быть до 30. * Указывайте ссылку целиком, включая протокол http или https. * Максимальная длина — 512 символов. * Русские буквы в URL можно. * Можно использовать прямые ссылки на изображения и на Яндекс Диск. Ссылки на Яндекс Диске нужно копировать с помощью функции **Поделиться**. Относительные ссылки и ссылки на другие облачные хранилища — не работают.  ✅ `https://example-shop.ru/images/sku12345.jpg`  ✅ `https://yadi.sk/i/NaBoRsimVOLov`  ❌ `/images/sku12345.jpg`  ❌ `https://www.dropbox.com/s/818f/tovar.jpg`  Ссылки на изображение должны быть постоянными. Нельзя использовать динамические ссылки, меняющиеся от выгрузки к выгрузке.  Если нужно заменить изображение, выложите новое изображение по новой ссылке, а ссылку на старое удалите. Если просто заменить изображение по старой ссылке, оно не обновится.  [Требования к изображениям](https://yandex.ru/support/marketplace/assortment/fields/images.html)
	 * @type {Array<string>}
	 * @memberof GetOfferDTO
	 */
	pictures?: string[] | null
	/**
	 * Ссылки (URL) на видео товара.  Максимальное количество ссылок — 6.  **Требования к ссылке**  * Указывайте ссылку целиком, включая протокол http или https. * Максимальная длина — 512 символов. * Русские буквы в URL можно. * Можно использовать прямые ссылки на видео и на Яндекс Диск. Ссылки на Яндекс Диске нужно копировать с помощью функции **Поделиться**. Относительные ссылки и ссылки на другие облачные хранилища — не работают.  ✅ `https://example-shop.ru/video/sku12345.avi`  ✅ `https://yadi.sk/i/NaBoRsimVOLov`  ❌ `/video/sku12345.avi`  ❌ `https://www.dropbox.com/s/818f/super-tovar.avi`  Ссылки на видео должны быть постоянными. Нельзя использовать динамические ссылки, меняющиеся от выгрузки к выгрузке.  Если нужно заменить видео, выложите новое видео по новой ссылке, а ссылку на старое удалите. Если просто заменить видео по старой ссылке, оно не обновится.  [Требования к видео](https://yandex.ru/support/marketplace/assortment/fields/video.html)
	 * @type {Array<string>}
	 * @memberof GetOfferDTO
	 */
	videos?: string[] | null
	/**
	 * Список инструкций по использованию товара.  Максимальное количество инструкций — 6.  Если вы передадите пустое поле `manuals`, загруженные ранее инструкции удалятся.
	 * @type {Array<OfferManualDTO>}
	 * @memberof GetOfferDTO
	 */
	manuals?: OfferManualDTO[] | null
	/**
	 * Название бренда или производителя. Должно быть записано так, как его пишет сам бренд.
	 * @type {string}
	 * @memberof GetOfferDTO
	 */
	vendor?: string
	/**
	 * Указывайте в виде последовательности цифр. Подойдут коды EAN-13, EAN-8, UPC-A, UPC-E или Code 128.  Для книг указывайте ISBN.  Для товаров [определенных категорий и торговых марок](https://yastatic.net/s3/doc-binary/src/support/market/ru/yandex-market-list-for-gtin.xlsx) штрихкод должен быть действительным кодом GTIN. Обратите внимание: внутренние штрихкоды, начинающиеся на 2 или 02, и коды формата Code 128 не являются GTIN.  [Что такое GTIN](*gtin)
	 * @type {Array<string>}
	 * @memberof GetOfferDTO
	 */
	barcodes?: string[] | null
	/**
	 * Подробное описание товара: например, его преимущества и особенности.  Не давайте в описании инструкций по установке и сборке. Не используйте слова «скидка», «распродажа», «дешевый», «подарок» (кроме подарочных категорий), «бесплатно», «акция», «специальная цена», «новинка», «new», «аналог», «заказ», «хит». Не указывайте никакой контактной информации и не давайте ссылок.  Можно использовать теги:  * \\<h>, \\<h1>, \\<h2> и так далее — для заголовков; * \\<br> и \\<p> — для переноса строки; * \\<ol> — для нумерованного списка; * \\<ul> — для маркированного списка; * \\<li> — для создания элементов списка (должен находиться внутри \\<ol> или \\<ul>); * \\<div> — поддерживается, но не влияет на отображение текста.  Оптимальная длина — 400–600 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/description.html)
	 * @type {string}
	 * @memberof GetOfferDTO
	 */
	description?: string
	/**
	 * Страна, где был произведен товар.  Записывайте названия стран так, как они записаны в [списке](https://yastatic.net/s3/doc-binary/src/support/market/ru/countries.xlsx).
	 * @type {Array<string>}
	 * @memberof GetOfferDTO
	 */
	manufacturerCountries?: string[] | null
	/**
	 *
	 * @type {OfferWeightDimensionsDTO}
	 * @memberof GetOfferDTO
	 */
	weightDimensions?: OfferWeightDimensionsDTO
	/**
	 * Артикул товара от производителя.
	 * @type {string}
	 * @memberof GetOfferDTO
	 */
	vendorCode?: string
	/**
	 * Метки товара, которые использует магазин. Покупателям теги не видны. По тегам можно группировать и фильтровать разные товары в каталоге — например, товары одной серии, коллекции или линейки.  Максимальная длина тега 20 символов. У одного товара может быть максимум 10 тегов. Всего можно создать не больше 50 разных тегов.
	 * @type {Array<string>}
	 * @memberof GetOfferDTO
	 */
	tags?: string[] | null
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof GetOfferDTO
	 */
	shelfLife?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof GetOfferDTO
	 */
	lifeTime?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof GetOfferDTO
	 */
	guaranteePeriod?: TimePeriodDTO
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `commodityCodes` с типом `CUSTOMS_COMMODITY_CODE`.  {% endnote %}  Код товара в единой Товарной номенклатуре внешнеэкономической деятельности (ТН ВЭД) — 10 или 14 цифр без пробелов.  Обязательно укажите, если он есть.
	 * @type {string}
	 * @memberof GetOfferDTO
	 * @deprecated
	 */
	customsCommodityCode?: string
	/**
	 * Товарные коды.
	 * @type {Array<CommodityCodeDTO>}
	 * @memberof GetOfferDTO
	 */
	commodityCodes?: CommodityCodeDTO[] | null
	/**
	 * Номера документов на товар: сертификата, декларации соответствия и т. п.  Передавать можно только номера документов, сканы которого загружены в кабинете продавца по [инструкции](https://yandex.ru/support/marketplace/assortment/restrictions/certificates.html).
	 * @type {Array<string>}
	 * @memberof GetOfferDTO
	 */
	certificates?: string[] | null
	/**
	 * Количество грузовых мест.  Параметр используется, если товар представляет собой несколько коробок, упаковок и так далее. Например, кондиционер занимает два места — внешний и внутренний блоки в двух коробках.  Для товаров, занимающих одно место, не передавайте этот параметр.
	 * @type {number}
	 * @memberof GetOfferDTO
	 */
	boxCount?: number
	/**
	 *
	 * @type {OfferConditionDTO}
	 * @memberof GetOfferDTO
	 */
	condition?: OfferConditionDTO
	/**
	 *
	 * @type {OfferType}
	 * @memberof GetOfferDTO
	 */
	type?: OfferType
	/**
	 * Признак цифрового товара. Укажите `true`, если товар доставляется по электронной почте.  [Как работать с цифровыми товарами](../../step-by-step/digital.md)
	 * @type {boolean}
	 * @memberof GetOfferDTO
	 */
	downloadable?: boolean
	/**
	 * Параметр включает для товара пометку 18+. Устанавливайте ее только для товаров, которые относятся к удовлетворению сексуальных потребностей.
	 * @type {boolean}
	 * @memberof GetOfferDTO
	 */
	adult?: boolean
	/**
	 *
	 * @type {AgeDTO}
	 * @memberof GetOfferDTO
	 */
	age?: AgeDTO
	/**
	 * {% note warning \"Этот параметр устарел\" %}  При передаче характеристик используйте `parameterValues`.  {% endnote %}  Характеристики, которые есть только у товаров конкретной категории — например, диаметр колес велосипеда или материал подошвы обуви.
	 * @type {Array<OfferParamDTO>}
	 * @memberof GetOfferDTO
	 * @deprecated
	 */
	params?: OfferParamDTO[] | null
	/**
	 *
	 * @type {GetPriceWithDiscountDTO}
	 * @memberof GetOfferDTO
	 */
	basicPrice?: GetPriceWithDiscountDTO
	/**
	 *
	 * @type {GetPriceDTO}
	 * @memberof GetOfferDTO
	 */
	purchasePrice?: GetPriceDTO
	/**
	 *
	 * @type {GetPriceDTO}
	 * @memberof GetOfferDTO
	 */
	additionalExpenses?: GetPriceDTO
	/**
	 *
	 * @type {GetPriceDTO}
	 * @memberof GetOfferDTO
	 */
	cofinancePrice?: GetPriceDTO
	/**
	 *
	 * @type {OfferCardStatusType}
	 * @memberof GetOfferDTO
	 */
	cardStatus?: OfferCardStatusType
	/**
	 * Список магазинов, в которых размещен товар.
	 * @type {Array<OfferCampaignStatusDTO>}
	 * @memberof GetOfferDTO
	 */
	campaigns?: OfferCampaignStatusDTO[] | null
	/**
	 * Информация о том, какие для товара доступны модели размещения.
	 * @type {Array<OfferSellingProgramDTO>}
	 * @memberof GetOfferDTO
	 */
	sellingPrograms?: OfferSellingProgramDTO[] | null
	/**
	 *
	 * @type {OfferMediaFilesDTO}
	 * @memberof GetOfferDTO
	 */
	mediaFiles?: OfferMediaFilesDTO
	/**
	 * Товар помещен в архив.
	 * @type {boolean}
	 * @memberof GetOfferDTO
	 */
	archived?: boolean
}

/**
 * Информация о товаре.
 * @export
 * @interface GetOfferMappingDTO
 */
export interface GetOfferMappingDTO {
	/**
	 *
	 * @type {GetOfferDTO}
	 * @memberof GetOfferMappingDTO
	 */
	offer?: GetOfferDTO
	/**
	 *
	 * @type {GetMappingDTO}
	 * @memberof GetOfferMappingDTO
	 */
	mapping?: GetMappingDTO
}
/**
 * Ответ на запрос списка товаров в каталоге.
 * @export
 * @interface GetOfferMappingEntriesResponse
 */
export interface GetOfferMappingEntriesResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetOfferMappingEntriesResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OfferMappingEntriesDTO}
	 * @memberof GetOfferMappingEntriesResponse
	 */
	result?: OfferMappingEntriesDTO
}

/**
 *
 * @export
 * @interface GetOfferMappingsRequest
 */
export interface GetOfferMappingsRequest {
	/**
	 * Идентификаторы товаров, информация о которых нужна.  {% note warning \"Такой список возвращается только целиком\" %}  Если вы запрашиваете информацию по конкретным SKU, не заполняйте: * `page_token`; * `limit`; * `cardStatuses`; * `categoryIds`; * `vendorNames`; * `tags`; * `archived`.  {% endnote %}
	 * @type {Array<string>}
	 * @memberof GetOfferMappingsRequest
	 */
	offerIds?: string[] | null
	/**
	 * Фильтр по статусам карточек.  [Что такое карточка товара](https://yandex.ru/support/marketplace/assortment/content/index.html)
	 * @type {Array<OfferCardStatusType>}
	 * @memberof GetOfferMappingsRequest
	 */
	cardStatuses?: OfferCardStatusType[] | null
	/**
	 * Фильтр по категориям на Маркете.
	 * @type {Array<number>}
	 * @memberof GetOfferMappingsRequest
	 */
	categoryIds?: number[] | null
	/**
	 * Фильтр по брендам.
	 * @type {Array<string>}
	 * @memberof GetOfferMappingsRequest
	 */
	vendorNames?: string[] | null
	/**
	 * Фильтр по тегам.
	 * @type {Array<string>}
	 * @memberof GetOfferMappingsRequest
	 */
	tags?: string[] | null
	/**
	 * Фильтр по нахождению в архиве.  Передайте `true`, чтобы получить товары, находящиеся в архиве. Если фильтр не заполнен или передано `false`, в ответе возвращаются товары, не находящиеся в архиве.
	 * @type {boolean}
	 * @memberof GetOfferMappingsRequest
	 */
	archived?: boolean
}
/**
 *
 * @export
 * @interface GetOfferMappingsResponse
 */
export interface GetOfferMappingsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetOfferMappingsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetOfferMappingsResultDTO}
	 * @memberof GetOfferMappingsResponse
	 */
	result?: GetOfferMappingsResultDTO
}

/**
 * Информация о товарах.
 * @export
 * @interface GetOfferMappingsResultDTO
 */
export interface GetOfferMappingsResultDTO {
	/**
	 *
	 * @type {ScrollingPagerDTO}
	 * @memberof GetOfferMappingsResultDTO
	 */
	paging?: ScrollingPagerDTO
	/**
	 * Информация о товарах.
	 * @type {Array<GetOfferMappingDTO>}
	 * @memberof GetOfferMappingsResultDTO
	 */
	offerMappings: GetOfferMappingDTO[]
}
/**
 *
 * @export
 * @interface GetOfferRecommendationsRequest
 */
export interface GetOfferRecommendationsRequest {
	/**
	 * Идентификаторы товаров, информация о которых нужна. ⚠️ Не используйте это поле одновременно с остальными фильтрами. Если вы хотите воспользоваться фильтрами, оставьте поле пустым.
	 * @type {Array<string>}
	 * @memberof GetOfferRecommendationsRequest
	 */
	offerIds?: string[] | null
	/**
	 *
	 * @type {FieldStateType}
	 * @memberof GetOfferRecommendationsRequest
	 */
	cofinancePriceFilter?: FieldStateType
	/**
	 *
	 * @type {FieldStateType}
	 * @memberof GetOfferRecommendationsRequest
	 */
	recommendedCofinancePriceFilter?: FieldStateType
	/**
	 *
	 * @type {PriceCompetitivenessType}
	 * @memberof GetOfferRecommendationsRequest
	 */
	competitivenessFilter?: PriceCompetitivenessType
}

/**
 *
 * @export
 * @interface GetOfferRecommendationsResponse
 */
export interface GetOfferRecommendationsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetOfferRecommendationsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OfferRecommendationsResultDTO}
	 * @memberof GetOfferRecommendationsResponse
	 */
	result?: OfferRecommendationsResultDTO
}

/**
 * Список предложений с пагинатором.
 * @export
 * @interface GetOffersResponse
 */
export interface GetOffersResponse {
	/**
	 * Список предложений магазина.
	 * @type {Array<OfferDTO>}
	 * @memberof GetOffersResponse
	 */
	offers: OfferDTO[]
	/**
	 *
	 * @type {FlippingPagerDTO}
	 * @memberof GetOffersResponse
	 */
	pager?: FlippingPagerDTO
}
/**
 *
 * @export
 * @interface GetOrderBuyerInfoResponse
 */
export interface GetOrderBuyerInfoResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetOrderBuyerInfoResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OrderBuyerInfoDTO}
	 * @memberof GetOrderBuyerInfoResponse
	 */
	result?: OrderBuyerInfoDTO
}

/**
 * Ответ с информацией для печати ярлыков.
 * @export
 * @interface GetOrderLabelsDataResponse
 */
export interface GetOrderLabelsDataResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetOrderLabelsDataResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OrderLabelDTO}
	 * @memberof GetOrderLabelsDataResponse
	 */
	result?: OrderLabelDTO
}

/**
 *
 * @export
 * @interface GetOrderResponse
 */
export interface GetOrderResponse {
	/**
	 *
	 * @type {OrderDTO}
	 * @memberof GetOrderResponse
	 */
	order?: OrderDTO
}
/**
 * Модель для ответа API списка информации по заказам.
 * @export
 * @interface GetOrdersResponse
 */
export interface GetOrdersResponse {
	/**
	 *
	 * @type {FlippingPagerDTO}
	 * @memberof GetOrdersResponse
	 */
	pager?: FlippingPagerDTO
	/**
	 * Модель заказа.
	 * @type {Array<OrderDTO>}
	 * @memberof GetOrdersResponse
	 */
	orders: OrderDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof GetOrdersResponse
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * Запрос информации по заказам.
 * @export
 * @interface GetOrdersStatsRequest
 */
export interface GetOrdersStatsRequest {
	/**
	 * Начальная дата, когда заказ был сформирован.  Формат даты: `ГГГГ‑ММ‑ДД`.  Нельзя использовать вместе с параметрами `updateFrom` и `updateTo`.
	 * @type {string}
	 * @memberof GetOrdersStatsRequest
	 */
	dateFrom?: string
	/**
	 * Конечная дата, когда заказ был сформирован.  Формат даты: `ГГГГ‑ММ‑ДД`.  Нельзя использовать вместе с параметрами `updateFrom` и `updateTo`.
	 * @type {string}
	 * @memberof GetOrdersStatsRequest
	 */
	dateTo?: string
	/**
	 * Начальная дата периода, за который были изменения в заказе (например, статуса или информации о платежах).  Формат даты: `ГГГГ‑ММ‑ДД`.  Нельзя использовать вместе с параметрами `dateFrom` и `dateTo`.
	 * @type {string}
	 * @memberof GetOrdersStatsRequest
	 */
	updateFrom?: string
	/**
	 * Конечная дата периода, за который были изменения в заказе (например, статуса или информации о платежах).  Формат даты: `ГГГГ‑ММ‑ДД`.  Нельзя использовать вместе с параметрами `dateFrom` и `dateTo`.
	 * @type {string}
	 * @memberof GetOrdersStatsRequest
	 */
	updateTo?: string
	/**
	 * Список идентификаторов заказов.
	 * @type {Array<number>}
	 * @memberof GetOrdersStatsRequest
	 */
	orders?: number[] | null
	/**
	 * Список статусов заказов.
	 * @type {Array<OrderStatsStatusType>}
	 * @memberof GetOrdersStatsRequest
	 */
	statuses?: OrderStatsStatusType[] | null
	/**
	 * Нужно ли вернуть только те заказы, в составе которых есть хотя бы один товар с кодом идентификации [в системе «Честный ЗНАК»](https://честныйзнак.рф/):  * `true` — да. * `false` — нет. Такие коды присваиваются товарам, которые подлежат маркировке и относятся к определенным категориям.
	 * @type {boolean}
	 * @memberof GetOrdersStatsRequest
	 */
	hasCis?: boolean
}
/**
 * Ответ на запрос информации по заказам.
 * @export
 * @interface GetOrdersStatsResponse
 */
export interface GetOrdersStatsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetOrdersStatsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OrdersStatsDTO}
	 * @memberof GetOrdersStatsResponse
	 */
	result?: OrdersStatsDTO
}

/**
 *
 * @export
 * @interface GetOutletLicensesResponse
 */
export interface GetOutletLicensesResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetOutletLicensesResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OutletLicensesResponseDTO}
	 * @memberof GetOutletLicensesResponse
	 */
	result?: OutletLicensesResponseDTO
}

/**
 * Ответ на запрос информации о точке продаж.
 * @export
 * @interface GetOutletResponse
 */
export interface GetOutletResponse {
	/**
	 *
	 * @type {FullOutletDTO}
	 * @memberof GetOutletResponse
	 */
	outlet?: FullOutletDTO
}
/**
 * Ответ на запрос информации о точках продаж.
 * @export
 * @interface GetOutletsResponse
 */
export interface GetOutletsResponse {
	/**
	 * Информация о точках продаж.
	 * @type {Array<FullOutletDTO>}
	 * @memberof GetOutletsResponse
	 */
	outlets: FullOutletDTO[]
	/**
	 *
	 * @type {ScrollingPagerDTO}
	 * @memberof GetOutletsResponse
	 */
	paging?: ScrollingPagerDTO
	/**
	 *
	 * @type {FlippingPagerDTO}
	 * @memberof GetOutletsResponse
	 */
	pager?: FlippingPagerDTO
}
/**
 * Цена с указанием времени последнего обновления.
 * @export
 * @interface GetPriceDTO
 */
export interface GetPriceDTO {
	/**
	 * Значение.
	 * @type {number}
	 * @memberof GetPriceDTO
	 */
	value: number
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof GetPriceDTO
	 */
	currencyId: CurrencyType
	/**
	 * Время последнего обновления.
	 * @type {string}
	 * @memberof GetPriceDTO
	 */
	updatedAt: string
}

/**
 * Цена с указанием скидки и времени последнего обновления.
 * @export
 * @interface GetPriceWithDiscountDTO
 */
export interface GetPriceWithDiscountDTO {
	/**
	 * Значение.
	 * @type {number}
	 * @memberof GetPriceWithDiscountDTO
	 */
	value: number
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof GetPriceWithDiscountDTO
	 */
	currencyId: CurrencyType
	/**
	 * Зачеркнутая цена.  Число должно быть целым. Вы можете указать цену со скидкой от 5 до 99%.  Передавайте этот параметр при каждом обновлении цены, если предоставляете скидку на товар.
	 * @type {number}
	 * @memberof GetPriceWithDiscountDTO
	 */
	discountBase?: number
	/**
	 * Время последнего обновления.
	 * @type {string}
	 * @memberof GetPriceWithDiscountDTO
	 */
	updatedAt: string
}

/**
 * Цена с указанием НДС и времени последнего обновления.
 * @export
 * @interface GetPriceWithVatDTO
 */
export interface GetPriceWithVatDTO {
	/**
	 * Цена на товар.
	 * @type {number}
	 * @memberof GetPriceWithVatDTO
	 */
	value?: number
	/**
	 * Цена на товар без скидки.  Число должно быть целым. Вы можете указать цену со скидкой от 5 до 99%.  Передавайте этот параметр при каждом обновлении цены, если предоставляете скидку на товар.
	 * @type {number}
	 * @memberof GetPriceWithVatDTO
	 */
	discountBase?: number
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof GetPriceWithVatDTO
	 */
	currencyId?: CurrencyType
	/**
	 * Идентификатор НДС, применяемый для товара:  * `2` — НДС 10%. Например, используется при реализации отдельных продовольственных и медицинских товаров. * `5` — НДС 0%. Например, используется при продаже товаров, вывезенных в таможенной процедуре экспорта, или при оказании услуг по международной перевозке товаров. * `6` — НДС не облагается, используется только для отдельных видов услуг. * `7` — НДС 20%. Основной НДС с 2019 года. * `9` — НДС 12%. Используется только в Узбекистане. * `10` — НДС 5%. НДС для упрощенной системы налогообложения (УСН). * `11` — НДС 7%. НДС для упрощенной системы налогообложения (УСН).  Если параметр не указан, используется НДС, установленный в кабинете.
	 * @type {number}
	 * @memberof GetPriceWithVatDTO
	 */
	vat?: number
	/**
	 * Время последнего обновления.
	 * @type {string}
	 * @memberof GetPriceWithVatDTO
	 */
	updatedAt: string
}

/**
 * Запрос списка цен.
 * @export
 * @interface GetPricesByOfferIdsRequest
 */
export interface GetPricesByOfferIdsRequest {
	/**
	 * Список SKU.  {% note warning \"Такой список возвращается только целиком\" %}  Если вы запрашиваете информацию по конкретным SKU, не заполняйте:  * `page_token` * `limit`  {% endnote %}
	 * @type {Array<string>}
	 * @memberof GetPricesByOfferIdsRequest
	 */
	offerIds?: string[] | null
}
/**
 * Ответ на запрос списка цен.
 * @export
 * @interface GetPricesByOfferIdsResponse
 */
export interface GetPricesByOfferIdsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetPricesByOfferIdsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OfferPriceByOfferIdsListResponseDTO}
	 * @memberof GetPricesByOfferIdsResponse
	 */
	result?: OfferPriceByOfferIdsListResponseDTO
}

/**
 * Ответ на запрос списка цен.
 * @export
 * @interface GetPricesResponse
 */
export interface GetPricesResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetPricesResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OfferPriceListResponseDTO}
	 * @memberof GetPricesResponse
	 */
	result?: OfferPriceListResponseDTO
}

/**
 * Информация о товарах в акции.
 * @export
 * @interface GetPromoAssortmentInfoDTO
 */
export interface GetPromoAssortmentInfoDTO {
	/**
	 * Количество товаров, которые участвуют или участвовали в акции.  Учитываются только товары, которые были добавлены вручную.  Об автоматическом и ручном добавлении товаров в акцию читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/marketing/promos/market/index).
	 * @type {number}
	 * @memberof GetPromoAssortmentInfoDTO
	 */
	activeOffers: number
	/**
	 * Количество доступных товаров в акции.  Параметр возвращается только для текущих и будущих акций.
	 * @type {number}
	 * @memberof GetPromoAssortmentInfoDTO
	 */
	potentialOffers?: number
	/**
	 * Есть ли изменения в ассортименте, которые еще не применились. Сохранение изменений занимает некоторое время.  Параметр возвращается только для текущих и будущих акций.
	 * @type {boolean}
	 * @memberof GetPromoAssortmentInfoDTO
	 */
	processing?: boolean
}
/**
 * Информация об акции «Бестселлеры Маркета».
 * @export
 * @interface GetPromoBestsellerInfoDTO
 */
export interface GetPromoBestsellerInfoDTO {
	/**
	 * Является ли акция «Бестселлером Маркета». Подробнее об этой акции читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/marketing/promos/market/bestsellers).
	 * @type {boolean}
	 * @memberof GetPromoBestsellerInfoDTO
	 */
	bestseller: boolean
	/**
	 * До какой даты можно добавить товар в акцию «Бестселлеры Маркета».  Параметр возвращается только для текущих и будущих акций «Бестселлеры Маркета».
	 * @type {string}
	 * @memberof GetPromoBestsellerInfoDTO
	 */
	entryDeadline?: string
	/**
	 * Включен ли автоматический перенос ассортимента между акциями «Бестселлеры Маркета».  Параметр возвращается только для текущих и будущих акций «Бестселлеры Маркета».
	 * @type {boolean}
	 * @memberof GetPromoBestsellerInfoDTO
	 */
	renewalEnabled?: boolean
}
/**
 * Ограничения в акции.
 * @export
 * @interface GetPromoConstraintsDTO
 */
export interface GetPromoConstraintsDTO {
	/**
	 * Идентификаторы складов, для которых действует акция. Товары, которые лежат на других складах, не будут продаваться по акции.  Параметр возвращается, только если в условиях акции есть ограничение по складу.
	 * @type {Array<number>}
	 * @memberof GetPromoConstraintsDTO
	 */
	warehouseIds?: number[] | null
}
/**
 * Информация об акции.
 * @export
 * @interface GetPromoDTO
 */
export interface GetPromoDTO {
	/**
	 * Идентификатор акции.
	 * @type {string}
	 * @memberof GetPromoDTO
	 */
	id: string
	/**
	 * Название акции.
	 * @type {string}
	 * @memberof GetPromoDTO
	 */
	name: string
	/**
	 *
	 * @type {PromoPeriodDTO}
	 * @memberof GetPromoDTO
	 */
	period: PromoPeriodDTO
	/**
	 * Участвует или участвовал ли продавец в этой акции.  Для текущих и будущих акций возвращается со значением `true`, если в акции есть товары, которые были добавлены вручную. Если товары не участвуют в акции или добавлены в нее автоматически, параметр возвращается со значением `false`.  Для прошедших акций всегда возвращается со значением `true`.  Об автоматическом и ручном добавлении товаров в акцию читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/marketing/promos/market/index).
	 * @type {boolean}
	 * @memberof GetPromoDTO
	 */
	participating: boolean
	/**
	 *
	 * @type {GetPromoAssortmentInfoDTO}
	 * @memberof GetPromoDTO
	 */
	assortmentInfo: GetPromoAssortmentInfoDTO
	/**
	 *
	 * @type {GetPromoMechanicsInfoDTO}
	 * @memberof GetPromoDTO
	 */
	mechanicsInfo: GetPromoMechanicsInfoDTO
	/**
	 *
	 * @type {GetPromoBestsellerInfoDTO}
	 * @memberof GetPromoDTO
	 */
	bestsellerInfo: GetPromoBestsellerInfoDTO
	/**
	 * Список каналов продвижения товаров.
	 * @type {Array<ChannelType>}
	 * @memberof GetPromoDTO
	 */
	channels?: ChannelType[] | null
	/**
	 *
	 * @type {GetPromoConstraintsDTO}
	 * @memberof GetPromoDTO
	 */
	constraints?: GetPromoConstraintsDTO
}
/**
 * Информация о типе акции.
 * @export
 * @interface GetPromoMechanicsInfoDTO
 */
export interface GetPromoMechanicsInfoDTO {
	/**
	 *
	 * @type {MechanicsType}
	 * @memberof GetPromoMechanicsInfoDTO
	 */
	type: MechanicsType
	/**
	 *
	 * @type {GetPromoPromocodeInfoDTO}
	 * @memberof GetPromoMechanicsInfoDTO
	 */
	promocodeInfo?: GetPromoPromocodeInfoDTO
}

/**
 * Товар, который участвует или может участвовать в акции.
 * @export
 * @interface GetPromoOfferDTO
 */
export interface GetPromoOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof GetPromoOfferDTO
	 */
	offerId: string
	/**
	 *
	 * @type {PromoOfferParticipationStatusType}
	 * @memberof GetPromoOfferDTO
	 */
	status: PromoOfferParticipationStatusType
	/**
	 *
	 * @type {PromoOfferParamsDTO}
	 * @memberof GetPromoOfferDTO
	 */
	params: PromoOfferParamsDTO
	/**
	 *
	 * @type {PromoOfferAutoParticipatingDetailsDTO}
	 * @memberof GetPromoOfferDTO
	 */
	autoParticipatingDetails?: PromoOfferAutoParticipatingDetailsDTO
}

/**
 * Получение списка товаров, которые участвуют или могут участвовать в акции.
 * @export
 * @interface GetPromoOffersRequest
 */
export interface GetPromoOffersRequest {
	/**
	 * Идентификатор акции.
	 * @type {string}
	 * @memberof GetPromoOffersRequest
	 */
	promoId: string
	/**
	 *
	 * @type {PromoOfferParticipationStatusFilterType}
	 * @memberof GetPromoOffersRequest
	 */
	statusType?: PromoOfferParticipationStatusFilterType
	/**
	 * Фильтр для товаров, которые могут участвовать в акции. Можно задать несколько значений.
	 * @type {Set<PromoOfferParticipationStatusMultiFilterType>}
	 * @memberof GetPromoOffersRequest
	 */
	statuses?: Set<PromoOfferParticipationStatusMultiFilterType> | null
}

/**
 *
 * @export
 * @interface GetPromoOffersResponse
 */
export interface GetPromoOffersResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetPromoOffersResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetPromoOffersResultDTO}
	 * @memberof GetPromoOffersResponse
	 */
	result?: GetPromoOffersResultDTO
}

/**
 * Список товаров, которые участвуют или могут участвовать в акции.
 * @export
 * @interface GetPromoOffersResultDTO
 */
export interface GetPromoOffersResultDTO {
	/**
	 * Товары, которые участвуют или могут участвовать в акции.
	 * @type {Array<GetPromoOfferDTO>}
	 * @memberof GetPromoOffersResultDTO
	 */
	offers: GetPromoOfferDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof GetPromoOffersResultDTO
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * Информация для типа `MARKET_PROMOCODE`.  Параметр заполняется только для этого типа акции.
 * @export
 * @interface GetPromoPromocodeInfoDTO
 */
export interface GetPromoPromocodeInfoDTO {
	/**
	 * Промокод.
	 * @type {string}
	 * @memberof GetPromoPromocodeInfoDTO
	 */
	promocode: string
	/**
	 * Процент скидки по промокоду.
	 * @type {number}
	 * @memberof GetPromoPromocodeInfoDTO
	 */
	discount: number
}
/**
 * Фильтры для получения списка акций.
 * @export
 * @interface GetPromosRequest
 */
export interface GetPromosRequest {
	/**
	 *
	 * @type {PromoParticipationType}
	 * @memberof GetPromosRequest
	 */
	participation?: PromoParticipationType
	/**
	 *
	 * @type {MechanicsType}
	 * @memberof GetPromosRequest
	 */
	mechanics?: MechanicsType
}

/**
 *
 * @export
 * @interface GetPromosResponse
 */
export interface GetPromosResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetPromosResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetPromosResultDTO}
	 * @memberof GetPromosResponse
	 */
	result?: GetPromosResultDTO
}

/**
 * Информация об акциях Маркета.
 * @export
 * @interface GetPromosResultDTO
 */
export interface GetPromosResultDTO {
	/**
	 * Акции Маркета.
	 * @type {Array<GetPromoDTO>}
	 * @memberof GetPromosResultDTO
	 */
	promos: GetPromoDTO[]
}
/**
 *
 * @export
 * @interface GetQualityRatingDetailsResponse
 */
export interface GetQualityRatingDetailsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetQualityRatingDetailsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {QualityRatingDetailsDTO}
	 * @memberof GetQualityRatingDetailsResponse
	 */
	result?: QualityRatingDetailsDTO
}

/**
 * Запрос информации по индексу качества.
 * @export
 * @interface GetQualityRatingRequest
 */
export interface GetQualityRatingRequest {
	/**
	 * Начало периода.  Формат даты: `ГГГГ‑ММ‑ДД`.  Не может быть раньше 30 дней от текущей даты.
	 * @type {string}
	 * @memberof GetQualityRatingRequest
	 */
	dateFrom?: string
	/**
	 * Конец периода.  Формат даты: `ГГГГ‑ММ‑ДД`.  Не может быть позже текущей даты.
	 * @type {string}
	 * @memberof GetQualityRatingRequest
	 */
	dateTo?: string
	/**
	 * Список идентификаторов магазинов.
	 * @type {Set<number>}
	 * @memberof GetQualityRatingRequest
	 */
	campaignIds: Set<number>
}
/**
 * Информация об индексе качества магазинов.
 * @export
 * @interface GetQualityRatingResponse
 */
export interface GetQualityRatingResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetQualityRatingResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {CampaignsQualityRatingDTO}
	 * @memberof GetQualityRatingResponse
	 */
	result?: CampaignsQualityRatingDTO
}

/**
 * Фильтрации товаров  В запросе можно указать либо фильтр offerIds, либо любые другие фильтры товаров. Совместное использование фильтра offerIds с другими фильтрациями приведет к ошибке.
 * @export
 * @interface GetQuarantineOffersRequest
 */
export interface GetQuarantineOffersRequest {
	/**
	 * Идентификаторы товаров, информация о которых нужна. <br><br> ⚠️ Не используйте это поле одновременно с фильтрами по статусам карточек, категориям, брендам или тегам. Если вы хотите воспользоваться фильтрами, оставьте поле пустым.
	 * @type {Set<string>}
	 * @memberof GetQuarantineOffersRequest
	 */
	offerIds?: Set<string> | null
	/**
	 * Фильтр по статусам карточек.  [Что такое карточка товара](https://yandex.ru/support/marketplace/assortment/content/index.html)
	 * @type {Set<OfferCardStatusType>}
	 * @memberof GetQuarantineOffersRequest
	 */
	cardStatuses?: Set<OfferCardStatusType> | null
	/**
	 * Фильтр по категориям на Маркете.
	 * @type {Set<number>}
	 * @memberof GetQuarantineOffersRequest
	 */
	categoryIds?: Set<number> | null
	/**
	 * Фильтр по брендам.
	 * @type {Set<string>}
	 * @memberof GetQuarantineOffersRequest
	 */
	vendorNames?: Set<string> | null
	/**
	 * Фильтр по тегам.
	 * @type {Set<string>}
	 * @memberof GetQuarantineOffersRequest
	 */
	tags?: Set<string> | null
}
/**
 * Ответ на запрос списка товаров в карантине.
 * @export
 * @interface GetQuarantineOffersResponse
 */
export interface GetQuarantineOffersResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetQuarantineOffersResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetQuarantineOffersResultDTO}
	 * @memberof GetQuarantineOffersResponse
	 */
	result?: GetQuarantineOffersResultDTO
}

/**
 * Список товаров в карантине.
 * @export
 * @interface GetQuarantineOffersResultDTO
 */
export interface GetQuarantineOffersResultDTO {
	/**
	 *
	 * @type {ScrollingPagerDTO}
	 * @memberof GetQuarantineOffersResultDTO
	 */
	paging?: ScrollingPagerDTO
	/**
	 * Страница списка товаров в карантине.
	 * @type {Array<QuarantineOfferDTO>}
	 * @memberof GetQuarantineOffersResultDTO
	 */
	offers: QuarantineOfferDTO[]
}
/**
 *
 * @export
 * @interface GetRegionWithChildrenResponse
 */
export interface GetRegionWithChildrenResponse {
	/**
	 *
	 * @type {FlippingPagerDTO}
	 * @memberof GetRegionWithChildrenResponse
	 */
	pager?: FlippingPagerDTO
	/**
	 *
	 * @type {RegionDTO}
	 * @memberof GetRegionWithChildrenResponse
	 */
	regions?: RegionDTO
}
/**
 *
 * @export
 * @interface GetRegionsResponse
 */
export interface GetRegionsResponse {
	/**
	 * Регион доставки.
	 * @type {Array<RegionDTO>}
	 * @memberof GetRegionsResponse
	 */
	regions: RegionDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof GetRegionsResponse
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * Ответ на запрос информации об отчете.
 * @export
 * @interface GetReportInfoResponse
 */
export interface GetReportInfoResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetReportInfoResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {ReportInfoDTO}
	 * @memberof GetReportInfoResponse
	 */
	result?: ReportInfoDTO
}

/**
 *
 * @export
 * @interface GetReturnResponse
 */
export interface GetReturnResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetReturnResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {ReturnDTO}
	 * @memberof GetReturnResponse
	 */
	result?: ReturnDTO
}

/**
 *
 * @export
 * @interface GetReturnsResponse
 */
export interface GetReturnsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetReturnsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {PagedReturnsDTO}
	 * @memberof GetReturnsResponse
	 */
	result?: PagedReturnsDTO
}

/**
 *
 * @export
 * @interface GetShipmentOrdersInfoResponse
 */
export interface GetShipmentOrdersInfoResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetShipmentOrdersInfoResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OrdersShipmentInfoDTO}
	 * @memberof GetShipmentOrdersInfoResponse
	 */
	result?: OrdersShipmentInfoDTO
}

/**
 *
 * @export
 * @interface GetShipmentResponse
 */
export interface GetShipmentResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetShipmentResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {ShipmentDTO}
	 * @memberof GetShipmentResponse
	 */
	result?: ShipmentDTO
}

/**
 * Запрос рекомендованных карточек товара.
 * @export
 * @interface GetSuggestedOfferMappingEntriesRequest
 */
export interface GetSuggestedOfferMappingEntriesRequest {
	/**
	 * Список товаров.
	 * @type {Array<MappingsOfferDTO>}
	 * @memberof GetSuggestedOfferMappingEntriesRequest
	 */
	offers: MappingsOfferDTO[]
}
/**
 * Ответ со списком рекомендованных карточек товара.
 * @export
 * @interface GetSuggestedOfferMappingEntriesResponse
 */
export interface GetSuggestedOfferMappingEntriesResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetSuggestedOfferMappingEntriesResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OfferMappingSuggestionsListDTO}
	 * @memberof GetSuggestedOfferMappingEntriesResponse
	 */
	result?: OfferMappingSuggestionsListDTO
}

/**
 *
 * @export
 * @interface GetSuggestedOfferMappingsRequest
 */
export interface GetSuggestedOfferMappingsRequest {
	/**
	 * Список товаров.
	 * @type {Array<SuggestedOfferDTO>}
	 * @memberof GetSuggestedOfferMappingsRequest
	 */
	offers?: SuggestedOfferDTO[] | null
}
/**
 *
 * @export
 * @interface GetSuggestedOfferMappingsResponse
 */
export interface GetSuggestedOfferMappingsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetSuggestedOfferMappingsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetSuggestedOfferMappingsResultDTO}
	 * @memberof GetSuggestedOfferMappingsResponse
	 */
	result?: GetSuggestedOfferMappingsResultDTO
}

/**
 * Подобранные карточки на Маркете.
 * @export
 * @interface GetSuggestedOfferMappingsResultDTO
 */
export interface GetSuggestedOfferMappingsResultDTO {
	/**
	 * Список товаров.
	 * @type {Array<SuggestedOfferMappingDTO>}
	 * @memberof GetSuggestedOfferMappingsResultDTO
	 */
	offers: SuggestedOfferMappingDTO[]
}
/**
 * Список складов с информацией об остатках на каждом из них.
 * @export
 * @interface GetWarehouseStocksDTO
 */
export interface GetWarehouseStocksDTO {
	/**
	 *
	 * @type {ScrollingPagerDTO}
	 * @memberof GetWarehouseStocksDTO
	 */
	paging?: ScrollingPagerDTO
	/**
	 * Страница списка складов.
	 * @type {Array<WarehouseOffersDTO>}
	 * @memberof GetWarehouseStocksDTO
	 */
	warehouses: WarehouseOffersDTO[]
}
/**
 * Фильтры для запроса остатков.
 * @export
 * @interface GetWarehouseStocksRequest
 */
export interface GetWarehouseStocksRequest {
	/**
	 * **Только для модели FBY**  Возвращать ли информацию по оборачиваемости.  Значение по умолчанию: `false`. Если информация нужна, передайте значение `true`.
	 * @type {boolean}
	 * @memberof GetWarehouseStocksRequest
	 */
	withTurnover?: boolean
	/**
	 * Фильтр по нахождению в архиве.  Передайте `true`, чтобы получить информацию об остатках товаров, которые находятся в архиве. Если фильтр не заполнен или передано `false`, в ответе возвращается информация о товарах, которые не находятся в архиве.
	 * @type {boolean}
	 * @memberof GetWarehouseStocksRequest
	 */
	archived?: boolean
	/**
	 * Фильтр по вашим SKU товаров.  Возвращается информация об остатках всех переданных SKU, включая товары в архиве.  {% note warning \"Такой список возвращается только целиком\" %}  Если вы запрашиваете информацию по конкретным SKU, не заполняйте:  * `page_token` * `limit` * `archived`  {% endnote %}
	 * @type {Set<string>}
	 * @memberof GetWarehouseStocksRequest
	 */
	offerIds?: Array<string> | null
}
/**
 *
 * @export
 * @interface GetWarehouseStocksResponse
 */
export interface GetWarehouseStocksResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetWarehouseStocksResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GetWarehouseStocksDTO}
	 * @memberof GetWarehouseStocksResponse
	 */
	result?: GetWarehouseStocksDTO
}

/**
 *
 * @export
 * @interface GetWarehousesResponse
 */
export interface GetWarehousesResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof GetWarehousesResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {WarehousesDTO}
	 * @memberof GetWarehousesResponse
	 */
	result?: WarehousesDTO
}

/**
 * Информация об авторе комментария.
 * @export
 * @interface GoodsFeedbackCommentAuthorDTO
 */
export interface GoodsFeedbackCommentAuthorDTO {
	/**
	 *
	 * @type {GoodsFeedbackCommentAuthorType}
	 * @memberof GoodsFeedbackCommentAuthorDTO
	 */
	type?: GoodsFeedbackCommentAuthorType
	/**
	 * Имя автора или название кабинета.
	 * @type {string}
	 * @memberof GoodsFeedbackCommentAuthorDTO
	 */
	name?: string
}

/**
 * Тип автора:  * `USER` — пользователь. * `BUSINESS` — кабинет.
 * @export
 * @enum {string}
 */

export const GoodsFeedbackCommentAuthorType = {
	User: 'USER',
	Business: 'BUSINESS',
} as const

export type GoodsFeedbackCommentAuthorType =
	(typeof GoodsFeedbackCommentAuthorType)[keyof typeof GoodsFeedbackCommentAuthorType]

/**
 * Комментарий к отзыву.
 * @export
 * @interface GoodsFeedbackCommentDTO
 */
export interface GoodsFeedbackCommentDTO {
	/**
	 * Идентификатор комментария к отзыву.
	 * @type {number}
	 * @memberof GoodsFeedbackCommentDTO
	 */
	id: number
	/**
	 * Текст комментария.
	 * @type {string}
	 * @memberof GoodsFeedbackCommentDTO
	 */
	text: string
	/**
	 * Может ли продавец изменять комментарий или удалять его.
	 * @type {boolean}
	 * @memberof GoodsFeedbackCommentDTO
	 */
	canModify?: boolean
	/**
	 * Идентификатор комментария к отзыву.
	 * @type {number}
	 * @memberof GoodsFeedbackCommentDTO
	 */
	parentId?: number
	/**
	 *
	 * @type {GoodsFeedbackCommentAuthorDTO}
	 * @memberof GoodsFeedbackCommentDTO
	 */
	author: GoodsFeedbackCommentAuthorDTO
	/**
	 *
	 * @type {GoodsFeedbackCommentStatusType}
	 * @memberof GoodsFeedbackCommentDTO
	 */
	status: GoodsFeedbackCommentStatusType
}

/**
 * Комментарии к отзыву.
 * @export
 * @interface GoodsFeedbackCommentListDTO
 */
export interface GoodsFeedbackCommentListDTO {
	/**
	 * Список комментариев.
	 * @type {Array<GoodsFeedbackCommentDTO>}
	 * @memberof GoodsFeedbackCommentListDTO
	 */
	comments: GoodsFeedbackCommentDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof GoodsFeedbackCommentListDTO
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * Статус комментария:  * `PUBLISHED` — опубликован. * `UNMODERATED` — не проверен. * `BANNED` — заблокирован. * `DELETED` — удален.
 * @export
 * @enum {string}
 */

export const GoodsFeedbackCommentStatusType = {
	Published: 'PUBLISHED',
	Unmoderated: 'UNMODERATED',
	Banned: 'BANNED',
	Deleted: 'DELETED',
} as const

export type GoodsFeedbackCommentStatusType =
	(typeof GoodsFeedbackCommentStatusType)[keyof typeof GoodsFeedbackCommentStatusType]

/**
 * Отзыв о товаре.
 * @export
 * @interface GoodsFeedbackDTO
 */
export interface GoodsFeedbackDTO {
	/**
	 * Идентификатор отзыва.
	 * @type {number}
	 * @memberof GoodsFeedbackDTO
	 */
	feedbackId: number
	/**
	 * Дата и время создания отзыва.
	 * @type {string}
	 * @memberof GoodsFeedbackDTO
	 */
	createdAt: string
	/**
	 * Нужен ли ответ на отзыв.
	 * @type {boolean}
	 * @memberof GoodsFeedbackDTO
	 */
	needReaction: boolean
	/**
	 *
	 * @type {GoodsFeedbackIdentifiersDTO}
	 * @memberof GoodsFeedbackDTO
	 */
	identifiers: GoodsFeedbackIdentifiersDTO
	/**
	 * Имя автора отзыва.
	 * @type {string}
	 * @memberof GoodsFeedbackDTO
	 */
	author?: string
	/**
	 *
	 * @type {GoodsFeedbackDescriptionDTO}
	 * @memberof GoodsFeedbackDTO
	 */
	description?: GoodsFeedbackDescriptionDTO
	/**
	 *
	 * @type {GoodsFeedbackMediaDTO}
	 * @memberof GoodsFeedbackDTO
	 */
	media?: GoodsFeedbackMediaDTO
	/**
	 *
	 * @type {GoodsFeedbackStatisticsDTO}
	 * @memberof GoodsFeedbackDTO
	 */
	statistics: GoodsFeedbackStatisticsDTO
}
/**
 * Текстовая часть отзыва.
 * @export
 * @interface GoodsFeedbackDescriptionDTO
 */
export interface GoodsFeedbackDescriptionDTO {
	/**
	 * Описание плюсов товара в отзыве.
	 * @type {string}
	 * @memberof GoodsFeedbackDescriptionDTO
	 */
	advantages?: string
	/**
	 * Описание минусов товара в отзыве.
	 * @type {string}
	 * @memberof GoodsFeedbackDescriptionDTO
	 */
	disadvantages?: string
	/**
	 * Комментарий в отзыве.
	 * @type {string}
	 * @memberof GoodsFeedbackDescriptionDTO
	 */
	comment?: string
}
/**
 * Идентификаторы, которые связаны с отзывом.
 * @export
 * @interface GoodsFeedbackIdentifiersDTO
 */
export interface GoodsFeedbackIdentifiersDTO {
	/**
	 * Идентификатор заказа на Маркете.
	 * @type {number}
	 * @memberof GoodsFeedbackIdentifiersDTO
	 */
	orderId?: number
	/**
	 * Идентификатор модели товара.
	 * @type {number}
	 * @memberof GoodsFeedbackIdentifiersDTO
	 */
	modelId: number
}
/**
 * Список отзывов о товарах.
 * @export
 * @interface GoodsFeedbackListDTO
 */
export interface GoodsFeedbackListDTO {
	/**
	 * Список отзывов.
	 * @type {Array<GoodsFeedbackDTO>}
	 * @memberof GoodsFeedbackListDTO
	 */
	feedbacks: GoodsFeedbackDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof GoodsFeedbackListDTO
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * Фото и видео.
 * @export
 * @interface GoodsFeedbackMediaDTO
 */
export interface GoodsFeedbackMediaDTO {
	/**
	 * Ссылки на фото.
	 * @type {Array<string>}
	 * @memberof GoodsFeedbackMediaDTO
	 */
	photos?: string[] | null
	/**
	 * Ссылки на видео.
	 * @type {Array<string>}
	 * @memberof GoodsFeedbackMediaDTO
	 */
	videos?: string[] | null
}
/**
 * Статистическая информация по отзыву.
 * @export
 * @interface GoodsFeedbackStatisticsDTO
 */
export interface GoodsFeedbackStatisticsDTO {
	/**
	 * Оценка товара.
	 * @type {number}
	 * @memberof GoodsFeedbackStatisticsDTO
	 */
	rating: number
	/**
	 * Количество комментариев к отзыву.  Учитываются только ответы на отзывы, а не дочерние комментарии.
	 * @type {number}
	 * @memberof GoodsFeedbackStatisticsDTO
	 */
	commentsCount: number
	/**
	 * Рекомендуют ли этот товар.
	 * @type {boolean}
	 * @memberof GoodsFeedbackStatisticsDTO
	 */
	recommended?: boolean
	/**
	 * Количество баллов Плюса, которое автор получил за отзыв.
	 * @type {number}
	 * @memberof GoodsFeedbackStatisticsDTO
	 */
	paidAmount?: number
}
/**
 * Отчет по товарам.
 * @export
 * @interface GoodsStatsDTO
 */
export interface GoodsStatsDTO {
	/**
	 * Список товаров.
	 * @type {Array<GoodsStatsGoodsDTO>}
	 * @memberof GoodsStatsDTO
	 */
	shopSkus: GoodsStatsGoodsDTO[]
}
/**
 * Информация о товаре.
 * @export
 * @interface GoodsStatsGoodsDTO
 */
export interface GoodsStatsGoodsDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof GoodsStatsGoodsDTO
	 */
	shopSku?: string
	/**
	 * SKU на Маркете.
	 * @type {number}
	 * @memberof GoodsStatsGoodsDTO
	 */
	marketSku?: number
	/**
	 * Название товара.
	 * @type {string}
	 * @memberof GoodsStatsGoodsDTO
	 */
	name?: string
	/**
	 * Цена на товар в валюте, которая установлена [в кабинете продавца на Маркете](https://partner.market.yandex.ru/).
	 * @type {number}
	 * @memberof GoodsStatsGoodsDTO
	 */
	price?: number
	/**
	 * Идентификатор категории товара на Маркете.
	 * @type {number}
	 * @memberof GoodsStatsGoodsDTO
	 */
	categoryId?: number
	/**
	 * Название категории товара на Маркете.
	 * @type {string}
	 * @memberof GoodsStatsGoodsDTO
	 */
	categoryName?: string
	/**
	 *
	 * @type {GoodsStatsWeightDimensionsDTO}
	 * @memberof GoodsStatsGoodsDTO
	 */
	weightDimensions?: GoodsStatsWeightDimensionsDTO
	/**
	 * Информация о складах, на которых хранится товар.  Параметр не приходит, если товара нет ни на одном складе.
	 * @type {Array<GoodsStatsWarehouseDTO>}
	 * @memberof GoodsStatsGoodsDTO
	 */
	warehouses?: GoodsStatsWarehouseDTO[] | null
	/**
	 * Информация о тарифах, по которым нужно заплатить за услуги Маркета.  По некоторым услугам могут возвращаться несколько разных стоимостей. Например, в модели FBS стоимость услуги `SORTING` (обработка заказа) зависит от способа отгрузки и количества заказов в отгрузке. Подробнее о тарифах на услуги читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/introduction/rates/models/).
	 * @type {Array<TariffDTO>}
	 * @memberof GoodsStatsGoodsDTO
	 */
	tariffs?: TariffDTO[] | null
	/**
	 * Ссылки (URL) изображений товара в хорошем качестве.
	 * @type {Array<string>}
	 * @memberof GoodsStatsGoodsDTO
	 */
	pictures?: string[] | null
}
/**
 * Информация о складе.
 * @export
 * @interface GoodsStatsWarehouseDTO
 */
export interface GoodsStatsWarehouseDTO {
	/**
	 * Идентификатор склада.
	 * @type {number}
	 * @memberof GoodsStatsWarehouseDTO
	 */
	id?: number
	/**
	 * Название склада.
	 * @type {string}
	 * @memberof GoodsStatsWarehouseDTO
	 */
	name?: string
	/**
	 * Информация об остатках товаров на складе.
	 * @type {Array<WarehouseStockDTO>}
	 * @memberof GoodsStatsWarehouseDTO
	 */
	stocks: WarehouseStockDTO[]
}
/**
 * Информация о весе и габаритах товара.  Если товар уже привязан к карточке (`marketSku`), в ответе вернутся габариты из карточки Маркета, а не размеры, которые вы передаете.
 * @export
 * @interface GoodsStatsWeightDimensionsDTO
 */
export interface GoodsStatsWeightDimensionsDTO {
	/**
	 * Длина товара в сантиметрах.
	 * @type {number}
	 * @memberof GoodsStatsWeightDimensionsDTO
	 */
	length?: number
	/**
	 * Ширина товара в сантиметрах.
	 * @type {number}
	 * @memberof GoodsStatsWeightDimensionsDTO
	 */
	width?: number
	/**
	 * Высота товара в сантиметрах.
	 * @type {number}
	 * @memberof GoodsStatsWeightDimensionsDTO
	 */
	height?: number
	/**
	 * Вес товара в килограммах.
	 * @type {number}
	 * @memberof GoodsStatsWeightDimensionsDTO
	 */
	weight?: number
}
/**
 * GPS-координаты широты и долготы.
 * @export
 * @interface GpsDTO
 */
export interface GpsDTO {
	/**
	 * Широта.
	 * @type {number}
	 * @memberof GpsDTO
	 */
	latitude: number
	/**
	 * Долгота.
	 * @type {number}
	 * @memberof GpsDTO
	 */
	longitude: number
}
/**
 * Информация о скрытии.
 * @export
 * @interface HiddenOfferDTO
 */
export interface HiddenOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof HiddenOfferDTO
	 */
	offerId: string
}
/**
 * Тип сортировки ярлыков:  * `SORT_BY_GIVEN_ORDER` — ярлыки заказов будут расположены в том же порядке, в каком были переданы идентификаторы заказов в запросе. * `SORT_BY_ORDER_CREATED_AT` — ярлыки будут расположены в соответствии с датой создания заказа с группировкой по магазинам.  Если параметр не указан, ярлыки сортируются по дате создания.
 * @export
 * @enum {string}
 */

export const LabelsSortingType = {
	SortByGivenOrder: 'SORT_BY_GIVEN_ORDER',
	SortByOrderCreatedAt: 'SORT_BY_ORDER_CREATED_AT',
} as const

export type LabelsSortingType =
	(typeof LabelsSortingType)[keyof typeof LabelsSortingType]

/**
 * Язык:  * `RU` — русский.  * `EN` — английский.
 * @export
 * @enum {string}
 */

export const LanguageType = {
	Ru: 'RU',
	En: 'EN',
} as const

export type LanguageType = (typeof LanguageType)[keyof typeof LanguageType]

/**
 * Статус проверки лицензии:  * `NEW` — лицензия проверяется. * `SUCCESS` — лицензия прошла проверку. * `FAIL` — лицензия не прошла проверку. * `REVOKE` — лицензия отозвана службой качества. * `DONT_WANT` — не проверяется. * `FAIL_MANUAL` — лицензия не прошла проверку службы качества.
 * @export
 * @enum {string}
 */

export const LicenseCheckStatusType = {
	New: 'NEW',
	Success: 'SUCCESS',
	Fail: 'FAIL',
	Revoke: 'REVOKE',
	DontWant: 'DONT_WANT',
	FailManual: 'FAIL_MANUAL',
} as const

export type LicenseCheckStatusType =
	(typeof LicenseCheckStatusType)[keyof typeof LicenseCheckStatusType]

/**
 * Тип лицензии:  * `ALCOHOL` — лицензия на розничную продажу алкогольной продукции. * `UNKNOWN` — неизвестный тип лицензии.
 * @export
 * @enum {string}
 */

export const LicenseType = {
	Alcohol: 'ALCOHOL',
	Unknown: 'UNKNOWN',
} as const

export type LicenseType = (typeof LicenseType)[keyof typeof LicenseType]

/**
 * Описание пункта вывоза для возврата.
 * @export
 * @interface LogisticPickupPointDTO
 */
export interface LogisticPickupPointDTO {
	/**
	 * Идентификатор пункта вывоза.
	 * @type {number}
	 * @memberof LogisticPickupPointDTO
	 */
	id?: number
	/**
	 * Название пункта вывоза.
	 * @type {string}
	 * @memberof LogisticPickupPointDTO
	 */
	name?: string
	/**
	 *
	 * @type {PickupAddressDTO}
	 * @memberof LogisticPickupPointDTO
	 */
	address?: PickupAddressDTO
	/**
	 * Дополнительные инструкции к вывозу.
	 * @type {string}
	 * @memberof LogisticPickupPointDTO
	 */
	instruction?: string
	/**
	 *
	 * @type {LogisticPointType}
	 * @memberof LogisticPickupPointDTO
	 */
	type?: LogisticPointType
	/**
	 * Идентификатор логистического партнера, к которому относится логистическая точка.
	 * @type {number}
	 * @memberof LogisticPickupPointDTO
	 */
	logisticPartnerId?: number
}

/**
 * Тип логистической точки:    * `WAREHOUSE` — склад.   * `PICKUP_POINT` — обычная точка выдачи заказов (ПВЗ).   * `PICKUP_TERMINAL` — постамат.   * `PICKUP_POST_OFFICE` — отделение почтовой связи (ОПС).   * `PICKUP_MIXED` — торговый зал и пункт выдачи заказов.   * `PICKUP_RETAIL` — торговый зал.
 * @export
 * @enum {string}
 */

export const LogisticPointType = {
	Warehouse: 'WAREHOUSE',
	PickupPoint: 'PICKUP_POINT',
	PickupTerminal: 'PICKUP_TERMINAL',
	PickupPostOffice: 'PICKUP_POST_OFFICE',
	PickupMixed: 'PICKUP_MIXED',
	PickupRetail: 'PICKUP_RETAIL',
} as const

export type LogisticPointType =
	(typeof LogisticPointType)[keyof typeof LogisticPointType]

/**
 * Информация о товарах в каталоге.
 * @export
 * @interface MappingsOfferDTO
 */
export interface MappingsOfferDTO {
	/**
	 * Составляйте название по схеме: тип + бренд или производитель + модель + особенности, если есть (например, цвет, размер или вес) и количество в упаковке.  Не включайте в название условия продажи (например, «скидка», «бесплатная доставка» и т. д.), эмоциональные характеристики («хит», «супер» и т. д.). Не пишите слова большими буквами — кроме устоявшихся названий брендов и моделей.  Оптимальная длина — 50–60 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/title.html)
	 * @type {string}
	 * @memberof MappingsOfferDTO
	 */
	name?: string
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof MappingsOfferDTO
	 */
	shopSku?: string
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `marketCategoryId`.  {% endnote %}  Категория товара в вашем магазине.
	 * @type {string}
	 * @memberof MappingsOfferDTO
	 * @deprecated
	 */
	category?: string
	/**
	 * Название бренда или производителя. Должно быть записано так, как его пишет сам бренд.
	 * @type {string}
	 * @memberof MappingsOfferDTO
	 */
	vendor?: string
	/**
	 * Артикул товара от производителя.
	 * @type {string}
	 * @memberof MappingsOfferDTO
	 */
	vendorCode?: string
	/**
	 * Подробное описание товара: например, его преимущества и особенности.  Не давайте в описании инструкций по установке и сборке. Не используйте слова «скидка», «распродажа», «дешевый», «подарок» (кроме подарочных категорий), «бесплатно», «акция», «специальная цена», «новинка», «new», «аналог», «заказ», «хит». Не указывайте никакой контактной информации и не давайте ссылок.  Можно использовать теги:  * \\<h>, \\<h1>, \\<h2> и так далее — для заголовков; * \\<br> и \\<p> — для переноса строки; * \\<ol> — для нумерованного списка; * \\<ul> — для маркированного списка; * \\<li> — для создания элементов списка (должен находиться внутри \\<ol> или \\<ul>); * \\<div> — поддерживается, но не влияет на отображение текста.  Оптимальная длина — 400–600 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/description.html)
	 * @type {string}
	 * @memberof MappingsOfferDTO
	 */
	description?: string
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof MappingsOfferDTO
	 */
	id?: string
	/**
	 * Идентификатор фида.
	 * @type {number}
	 * @memberof MappingsOfferDTO
	 */
	feedId?: number
	/**
	 * Указывайте в виде последовательности цифр. Подойдут коды EAN-13, EAN-8, UPC-A, UPC-E или Code 128.  Для книг указывайте ISBN.  Для товаров [определенных категорий и торговых марок](https://yastatic.net/s3/doc-binary/src/support/market/ru/yandex-market-list-for-gtin.xlsx) штрихкод должен быть действительным кодом GTIN. Обратите внимание: внутренние штрихкоды, начинающиеся на 2 или 02, и коды формата Code 128 не являются GTIN.  [Что такое GTIN](*gtin)
	 * @type {Array<string>}
	 * @memberof MappingsOfferDTO
	 */
	barcodes?: string[] | null
	/**
	 * URL фотографии товара или страницы с описанием на вашем сайте.  Переданные данные не будут отображаться на витрине, но они помогут специалистам Маркета найти карточку для вашего товара.  Должен содержать один вложенный параметр url.
	 * @type {Array<string>}
	 * @memberof MappingsOfferDTO
	 */
	urls?: string[] | null
	/**
	 * Ссылки (URL) изображений товара в хорошем качестве.  Можно указать до 30 ссылок. При этом изображение по первой ссылке будет основным. Оно используется в качестве изображения товара в поиске Маркета и на карточке товара. Другие изображения товара доступны в режиме просмотра увеличенных изображений.  Обязательный параметр.  Должен содержать хотя бы один вложенный параметр `picture`.
	 * @type {Array<string>}
	 * @memberof MappingsOfferDTO
	 */
	pictures?: string[] | null
	/**
	 * Изготовитель товара: компания, которая произвела товар, ее адрес и регистрационный номер (если есть).  Необязательный параметр.
	 * @type {string}
	 * @memberof MappingsOfferDTO
	 */
	manufacturer?: string
	/**
	 * Список стран, в которых произведен товар.  Обязательный параметр.  Должен содержать хотя бы одну, но не больше 5 стран.
	 * @type {Array<string>}
	 * @memberof MappingsOfferDTO
	 */
	manufacturerCountries?: string[] | null
	/**
	 * Минимальное количество единиц товара, которое вы поставляете на склад.  Например, если вы поставляете детское питание партиями минимум по 10 коробок, а в каждой коробке по 6 баночек, укажите значение 60.
	 * @type {number}
	 * @memberof MappingsOfferDTO
	 */
	minShipment?: number
	/**
	 * Количество единиц товара в одной упаковке, которую вы поставляете на склад.  Например, если вы поставляете детское питание коробками по 6 баночек, укажите значение 6.
	 * @type {number}
	 * @memberof MappingsOfferDTO
	 */
	transportUnitSize?: number
	/**
	 * Добавочная партия: по сколько единиц товара можно добавлять к минимальному количеству minShipment.  Например, если вы поставляете детское питание партиями минимум по 10 коробок и хотите добавлять к минимальной партии по 2 коробки, а в каждой коробке по 6 баночек, укажите значение 12.
	 * @type {number}
	 * @memberof MappingsOfferDTO
	 */
	quantumOfSupply?: number
	/**
	 * Срок, за который продавец поставляет товары на склад, в днях.
	 * @type {number}
	 * @memberof MappingsOfferDTO
	 */
	deliveryDurationDays?: number
	/**
	 * Сколько мест (если больше одного) занимает товар.  Параметр указывается, только если товар занимает больше одного места (например, кондиционер занимает два места: внешний и внутренний блоки в двух коробках). Если товар занимает одно место, не указывайте этот параметр.
	 * @type {number}
	 * @memberof MappingsOfferDTO
	 */
	boxCount?: number
	/**
	 * Список кодов товара в единой Товарной номенклатуре внешнеэкономической деятельности (ТН ВЭД).  Обязательный параметр, если товар подлежит особому учету (например, в системе «Меркурий» как продукция животного происхождения или в системе «Честный ЗНАК»).  Может содержать только один вложенный код ТН ВЭД.
	 * @type {Array<string>}
	 * @memberof MappingsOfferDTO
	 */
	customsCommodityCodes?: string[] | null
	/**
	 *
	 * @type {OfferWeightDimensionsDTO}
	 * @memberof MappingsOfferDTO
	 */
	weightDimensions?: OfferWeightDimensionsDTO
	/**
	 * Дни недели, в которые продавец поставляет товары на склад.
	 * @type {Array<DayOfWeekType>}
	 * @memberof MappingsOfferDTO
	 */
	supplyScheduleDays?: DayOfWeekType[] | null
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `shelfLife`. Совместное использование обоих параметров приведет к ошибке.  {% endnote %}  Срок годности: через сколько дней товар станет непригоден для использования.
	 * @type {number}
	 * @memberof MappingsOfferDTO
	 */
	shelfLifeDays?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `lifeTime`. Совместное использование обоих параметров приведет к ошибке.  {% endnote %}  Срок службы: сколько дней товар будет исправно выполнять свою функцию, а изготовитель — нести ответственность за его существенные недостатки.
	 * @type {number}
	 * @memberof MappingsOfferDTO
	 */
	lifeTimeDays?: number
	/**
	 * Гарантийный срок товара: сколько дней возможно обслуживание и ремонт товара или возврат денег, а изготовитель или продавец будет нести ответственность за недостатки товара.
	 * @type {number}
	 * @memberof MappingsOfferDTO
	 */
	guaranteePeriodDays?: number
	/**
	 *
	 * @type {OfferProcessingStateDTO}
	 * @memberof MappingsOfferDTO
	 */
	processingState?: OfferProcessingStateDTO
	/**
	 *
	 * @type {OfferAvailabilityStatusType}
	 * @memberof MappingsOfferDTO
	 */
	availability?: OfferAvailabilityStatusType
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof MappingsOfferDTO
	 */
	shelfLife?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof MappingsOfferDTO
	 */
	lifeTime?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof MappingsOfferDTO
	 */
	guaranteePeriod?: TimePeriodDTO
	/**
	 * Номер документа на товар.  Перед указанием номера документ нужно загрузить в кабинете продавца на Маркете. [Инструкция](https://yandex.ru/support/marketplace/assortment/restrictions/certificates.html)
	 * @type {string}
	 * @memberof MappingsOfferDTO
	 */
	certificate?: string
	/**
	 * Цена на товар.
	 * @type {number}
	 * @memberof MappingsOfferDTO
	 */
	price?: number
}

/**
 * Базовая информация о товарах в каталоге.
 * @export
 * @interface MappingsOfferInfoDTO
 */
export interface MappingsOfferInfoDTO {
	/**
	 * Составляйте название по схеме: тип + бренд или производитель + модель + особенности, если есть (например, цвет, размер или вес) и количество в упаковке.  Не включайте в название условия продажи (например, «скидка», «бесплатная доставка» и т. д.), эмоциональные характеристики («хит», «супер» и т. д.). Не пишите слова большими буквами — кроме устоявшихся названий брендов и моделей.  Оптимальная длина — 50–60 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/title.html)
	 * @type {string}
	 * @memberof MappingsOfferInfoDTO
	 */
	name?: string
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof MappingsOfferInfoDTO
	 */
	shopSku?: string
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `marketCategoryId`.  {% endnote %}  Категория товара в вашем магазине.
	 * @type {string}
	 * @memberof MappingsOfferInfoDTO
	 * @deprecated
	 */
	category?: string
	/**
	 * Название бренда или производителя. Должно быть записано так, как его пишет сам бренд.
	 * @type {string}
	 * @memberof MappingsOfferInfoDTO
	 */
	vendor?: string
	/**
	 * Артикул товара от производителя.
	 * @type {string}
	 * @memberof MappingsOfferInfoDTO
	 */
	vendorCode?: string
	/**
	 * Подробное описание товара: например, его преимущества и особенности.  Не давайте в описании инструкций по установке и сборке. Не используйте слова «скидка», «распродажа», «дешевый», «подарок» (кроме подарочных категорий), «бесплатно», «акция», «специальная цена», «новинка», «new», «аналог», «заказ», «хит». Не указывайте никакой контактной информации и не давайте ссылок.  Можно использовать теги:  * \\<h>, \\<h1>, \\<h2> и так далее — для заголовков; * \\<br> и \\<p> — для переноса строки; * \\<ol> — для нумерованного списка; * \\<ul> — для маркированного списка; * \\<li> — для создания элементов списка (должен находиться внутри \\<ol> или \\<ul>); * \\<div> — поддерживается, но не влияет на отображение текста.  Оптимальная длина — 400–600 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/description.html)
	 * @type {string}
	 * @memberof MappingsOfferInfoDTO
	 */
	description?: string
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof MappingsOfferInfoDTO
	 */
	id?: string
	/**
	 * Идентификатор фида.
	 * @type {number}
	 * @memberof MappingsOfferInfoDTO
	 */
	feedId?: number
	/**
	 * Указывайте в виде последовательности цифр. Подойдут коды EAN-13, EAN-8, UPC-A, UPC-E или Code 128.  Для книг указывайте ISBN.  Для товаров [определенных категорий и торговых марок](https://yastatic.net/s3/doc-binary/src/support/market/ru/yandex-market-list-for-gtin.xlsx) штрихкод должен быть действительным кодом GTIN. Обратите внимание: внутренние штрихкоды, начинающиеся на 2 или 02, и коды формата Code 128 не являются GTIN.  [Что такое GTIN](*gtin)
	 * @type {Array<string>}
	 * @memberof MappingsOfferInfoDTO
	 */
	barcodes?: string[] | null
	/**
	 * URL фотографии товара или страницы с описанием на вашем сайте.  Переданные данные не будут отображаться на витрине, но они помогут специалистам Маркета найти карточку для вашего товара.  Должен содержать один вложенный параметр url.
	 * @type {Array<string>}
	 * @memberof MappingsOfferInfoDTO
	 */
	urls?: string[] | null
	/**
	 * Ссылки (URL) изображений товара в хорошем качестве.  Можно указать до 30 ссылок. При этом изображение по первой ссылке будет основным. Оно используется в качестве изображения товара в поиске Маркета и на карточке товара. Другие изображения товара доступны в режиме просмотра увеличенных изображений.  Обязательный параметр.  Должен содержать хотя бы один вложенный параметр `picture`.
	 * @type {Array<string>}
	 * @memberof MappingsOfferInfoDTO
	 */
	pictures?: string[] | null
	/**
	 * Изготовитель товара: компания, которая произвела товар, ее адрес и регистрационный номер (если есть).  Необязательный параметр.
	 * @type {string}
	 * @memberof MappingsOfferInfoDTO
	 */
	manufacturer?: string
	/**
	 * Список стран, в которых произведен товар.  Обязательный параметр.  Должен содержать хотя бы одну, но не больше 5 стран.
	 * @type {Array<string>}
	 * @memberof MappingsOfferInfoDTO
	 */
	manufacturerCountries?: string[] | null
	/**
	 * Минимальное количество единиц товара, которое вы поставляете на склад.  Например, если вы поставляете детское питание партиями минимум по 10 коробок, а в каждой коробке по 6 баночек, укажите значение 60.
	 * @type {number}
	 * @memberof MappingsOfferInfoDTO
	 */
	minShipment?: number
	/**
	 * Количество единиц товара в одной упаковке, которую вы поставляете на склад.  Например, если вы поставляете детское питание коробками по 6 баночек, укажите значение 6.
	 * @type {number}
	 * @memberof MappingsOfferInfoDTO
	 */
	transportUnitSize?: number
	/**
	 * Добавочная партия: по сколько единиц товара можно добавлять к минимальному количеству minShipment.  Например, если вы поставляете детское питание партиями минимум по 10 коробок и хотите добавлять к минимальной партии по 2 коробки, а в каждой коробке по 6 баночек, укажите значение 12.
	 * @type {number}
	 * @memberof MappingsOfferInfoDTO
	 */
	quantumOfSupply?: number
	/**
	 * Срок, за который продавец поставляет товары на склад, в днях.
	 * @type {number}
	 * @memberof MappingsOfferInfoDTO
	 */
	deliveryDurationDays?: number
	/**
	 * Сколько мест (если больше одного) занимает товар.  Параметр указывается, только если товар занимает больше одного места (например, кондиционер занимает два места: внешний и внутренний блоки в двух коробках). Если товар занимает одно место, не указывайте этот параметр.
	 * @type {number}
	 * @memberof MappingsOfferInfoDTO
	 */
	boxCount?: number
	/**
	 * Список кодов товара в единой Товарной номенклатуре внешнеэкономической деятельности (ТН ВЭД).  Обязательный параметр, если товар подлежит особому учету (например, в системе «Меркурий» как продукция животного происхождения или в системе «Честный ЗНАК»).  Может содержать только один вложенный код ТН ВЭД.
	 * @type {Array<string>}
	 * @memberof MappingsOfferInfoDTO
	 */
	customsCommodityCodes?: string[] | null
	/**
	 *
	 * @type {OfferWeightDimensionsDTO}
	 * @memberof MappingsOfferInfoDTO
	 */
	weightDimensions?: OfferWeightDimensionsDTO
	/**
	 * Дни недели, в которые продавец поставляет товары на склад.
	 * @type {Array<DayOfWeekType>}
	 * @memberof MappingsOfferInfoDTO
	 */
	supplyScheduleDays?: DayOfWeekType[] | null
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `shelfLife`. Совместное использование обоих параметров приведет к ошибке.  {% endnote %}  Срок годности: через сколько дней товар станет непригоден для использования.
	 * @type {number}
	 * @memberof MappingsOfferInfoDTO
	 */
	shelfLifeDays?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `lifeTime`. Совместное использование обоих параметров приведет к ошибке.  {% endnote %}  Срок службы: сколько дней товар будет исправно выполнять свою функцию, а изготовитель — нести ответственность за его существенные недостатки.
	 * @type {number}
	 * @memberof MappingsOfferInfoDTO
	 */
	lifeTimeDays?: number
	/**
	 * Гарантийный срок товара: сколько дней возможно обслуживание и ремонт товара или возврат денег, а изготовитель или продавец будет нести ответственность за недостатки товара.
	 * @type {number}
	 * @memberof MappingsOfferInfoDTO
	 */
	guaranteePeriodDays?: number
	/**
	 *
	 * @type {OfferProcessingStateDTO}
	 * @memberof MappingsOfferInfoDTO
	 */
	processingState?: OfferProcessingStateDTO
	/**
	 *
	 * @type {OfferAvailabilityStatusType}
	 * @memberof MappingsOfferInfoDTO
	 */
	availability?: OfferAvailabilityStatusType
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof MappingsOfferInfoDTO
	 */
	shelfLife?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof MappingsOfferInfoDTO
	 */
	lifeTime?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof MappingsOfferInfoDTO
	 */
	guaranteePeriod?: TimePeriodDTO
	/**
	 * Номер документа на товар.  Перед указанием номера документ нужно загрузить в кабинете продавца на Маркете. [Инструкция](https://yandex.ru/support/marketplace/assortment/restrictions/certificates.html)
	 * @type {string}
	 * @memberof MappingsOfferInfoDTO
	 */
	certificate?: string
}

/**
 * Лимит на установку кванта и минимального количества товаров по категориям.
 * @export
 * @interface MaxSaleQuantumDTO
 */
export interface MaxSaleQuantumDTO {
	/**
	 * Идентификатор категории.
	 * @type {number}
	 * @memberof MaxSaleQuantumDTO
	 */
	id: number
	/**
	 * Название категории.
	 * @type {string}
	 * @memberof MaxSaleQuantumDTO
	 */
	name?: string
	/**
	 * Лимит на установку кванта и минимального количества товаров.
	 * @type {number}
	 * @memberof MaxSaleQuantumDTO
	 */
	maxSaleQuantum?: number
}
/**
 * Тип акции:  * `DIRECT_DISCOUNT` — прямая скидка.  * `BLUE_FLASH` — флеш-акция.  * `MARKET_PROMOCODE` — скидка по промокоду.
 * @export
 * @enum {string}
 */

export const MechanicsType = {
	DirectDiscount: 'DIRECT_DISCOUNT',
	BlueFlash: 'BLUE_FLASH',
	MarketPromocode: 'MARKET_PROMOCODE',
} as const

export type MechanicsType = (typeof MechanicsType)[keyof typeof MechanicsType]

/**
 * Состояние загрузки медиафайла:  * `UPLOADING` — загружается. * `UPLOADED` — успешно загружен. * `FAILED` — при загрузке произошла ошибка. Повторите попытку позже.
 * @export
 * @enum {string}
 */

export const MediaFileUploadStateType = {
	Uploading: 'UPLOADING',
	Uploaded: 'UPLOADED',
	Failed: 'FAILED',
} as const

export type MediaFileUploadStateType =
	(typeof MediaFileUploadStateType)[keyof typeof MediaFileUploadStateType]

/**
 * Модель товара.
 * @export
 * @interface ModelDTO
 */
export interface ModelDTO {
	/**
	 * Идентификатор модели товара.
	 * @type {number}
	 * @memberof ModelDTO
	 */
	id?: number
	/**
	 * Название модели товара.
	 * @type {string}
	 * @memberof ModelDTO
	 */
	name?: string
	/**
	 *
	 * @type {ModelPriceDTO}
	 * @memberof ModelDTO
	 */
	prices?: ModelPriceDTO
}
/**
 * Информация о предложении.
 * @export
 * @interface ModelOfferDTO
 */
export interface ModelOfferDTO {
	/**
	 * Скидка на предложение в процентах.
	 * @type {number}
	 * @memberof ModelOfferDTO
	 */
	discount?: number
	/**
	 * Наименование предложения.
	 * @type {string}
	 * @memberof ModelOfferDTO
	 */
	name?: string
	/**
	 * Позиция предложения в выдаче Маркета на карточке модели.
	 * @type {number}
	 * @memberof ModelOfferDTO
	 */
	pos?: number
	/**
	 * Цена предложения без скидки магазина.
	 * @type {number}
	 * @memberof ModelOfferDTO
	 */
	preDiscountPrice?: number
	/**
	 * Цена предложения без скидки, которую получает покупатель при оплате через Yandex Pay.
	 * @type {number}
	 * @memberof ModelOfferDTO
	 */
	price?: number
	/**
	 * Идентификатор региона предложения (регион, откуда доставляется товар).  Сначала показываются предложения, доставляемые из региона, указанного в запросе в параметре `regionId`. Предложения, доставляемые из других регионов, показываются после них.
	 * @type {number}
	 * @memberof ModelOfferDTO
	 */
	regionId?: number
	/**
	 * Стоимость доставки товара в регион:  * `0` — доставка осуществляется бесплатно. * `-1` — магазин не осуществляет доставку этого товара (самовывоз).  Если стоимость доставки неизвестна, параметр не выводится.
	 * @type {number}
	 * @memberof ModelOfferDTO
	 */
	shippingCost?: number
	/**
	 * Название магазина (в том виде, в котором отображается на Маркете).
	 * @type {string}
	 * @memberof ModelOfferDTO
	 */
	shopName?: string
	/**
	 * Рейтинг магазина.  Возможные значения: * `-1` — у магазинов, недавно появившихся на Маркете, рейтинг появляется не сразу. До момента появления рейтинга для таких магазинов возвращается значение `-1`. * `1`. * `2`. * `3`. * `4`. * `5`.
	 * @type {number}
	 * @memberof ModelOfferDTO
	 */
	shopRating?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}
	 * @type {number}
	 * @memberof ModelOfferDTO
	 * @deprecated
	 */
	inStock?: number
}
/**
 * Информация о ценах на модель товара.
 * @export
 * @interface ModelPriceDTO
 */
export interface ModelPriceDTO {
	/**
	 * Средняя цена предложения для модели в регионе.
	 * @type {number}
	 * @memberof ModelPriceDTO
	 */
	avg?: number
	/**
	 * Максимальная цена предложения для модели в регионе.
	 * @type {number}
	 * @memberof ModelPriceDTO
	 */
	max?: number
	/**
	 * Минимальная цена предложения для модели в регионе.
	 * @type {number}
	 * @memberof ModelPriceDTO
	 */
	min?: number
}
/**
 * Список моделей товаров.
 * @export
 * @interface ModelsDTO
 */
export interface ModelsDTO {
	/**
	 * Список моделей товаров.
	 * @type {Array<ModelDTO>}
	 * @memberof ModelsDTO
	 */
	models: ModelDTO[]
}
/**
 * Планы по поставкам:  * `ACTIVE` — поставки будут. * `INACTIVE` — поставок не будет: товар есть на складе, но вы больше не планируете его поставлять. Через 60 дней после того, как товар закончится на складе, этот статус изменится на `DELISTED`. * `DELISTED` — архив: товар закончился на складе, и его поставок больше не будет. Если товар вернется на склад (например, покупатель вернет заказ), этот статус изменится на `INACTIVE`.
 * @export
 * @enum {string}
 */

export const OfferAvailabilityStatusType = {
	Active: 'ACTIVE',
	Inactive: 'INACTIVE',
	Delisted: 'DELISTED',
} as const

export type OfferAvailabilityStatusType =
	(typeof OfferAvailabilityStatusType)[keyof typeof OfferAvailabilityStatusType]

/**
 * Статус товара в магазине.
 * @export
 * @interface OfferCampaignStatusDTO
 */
export interface OfferCampaignStatusDTO {
	/**
	 * Идентификатор кампании.
	 * @type {number}
	 * @memberof OfferCampaignStatusDTO
	 */
	campaignId: number
	/**
	 *
	 * @type {OfferCampaignStatusType}
	 * @memberof OfferCampaignStatusDTO
	 */
	status: OfferCampaignStatusType
}

/**
 * Статус товара:  * `PUBLISHED` — Готов к продаже. * `CHECKING` — На проверке. * `DISABLED_BY_PARTNER` — Скрыт вами. * `REJECTED_BY_MARKET` — Отклонен. * `DISABLED_AUTOMATICALLY` — Исправьте ошибки. * `CREATING_CARD` — Создается карточка. * `NO_CARD` — Нужна карточка. * `NO_STOCKS` — Нет на складе. * `ARCHIVED` — В архиве.  [Что обозначает каждый из статусов](https://yandex.ru/support/marketplace/assortment/add/statuses.html)
 * @export
 * @enum {string}
 */

export const OfferCampaignStatusType = {
	Published: 'PUBLISHED',
	Checking: 'CHECKING',
	DisabledByPartner: 'DISABLED_BY_PARTNER',
	DisabledAutomatically: 'DISABLED_AUTOMATICALLY',
	RejectedByMarket: 'REJECTED_BY_MARKET',
	CreatingCard: 'CREATING_CARD',
	NoCard: 'NO_CARD',
	NoStocks: 'NO_STOCKS',
	Archived: 'ARCHIVED',
} as const

export type OfferCampaignStatusType =
	(typeof OfferCampaignStatusType)[keyof typeof OfferCampaignStatusType]

/**
 * Статус вычисления рейтинга карточки товара и рекомендаций:  * `UPDATING` — рейтинг обновляется. * `ACTUAL` — рейтинг актуальный.
 * @export
 * @enum {string}
 */

export const OfferCardContentStatusType = {
	Updating: 'UPDATING',
	Actual: 'ACTUAL',
} as const

export type OfferCardContentStatusType =
	(typeof OfferCardContentStatusType)[keyof typeof OfferCardContentStatusType]

/**
 * Информация о состоянии карточки товара.  Если поле `mapping` отсутствует в ответе, Маркет еще не успел обработать информацию о товаре. Чтобы определить категорию такого товара, повторите запрос через несколько минут.
 * @export
 * @interface OfferCardDTO
 */
export interface OfferCardDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof OfferCardDTO
	 */
	offerId: string
	/**
	 *
	 * @type {GetMappingDTO}
	 * @memberof OfferCardDTO
	 */
	mapping?: GetMappingDTO
	/**
	 * Список характеристик с их значениями.
	 * @type {Array<ParameterValueDTO>}
	 * @memberof OfferCardDTO
	 */
	parameterValues?: ParameterValueDTO[] | null
	/**
	 *
	 * @type {OfferCardStatusType}
	 * @memberof OfferCardDTO
	 */
	cardStatus?: OfferCardStatusType
	/**
	 * Рейтинг карточки.
	 * @type {number}
	 * @memberof OfferCardDTO
	 */
	contentRating?: number
	/**
	 * Средний рейтинг карточки у товаров той категории, которая указана в `marketCategoryId`.
	 * @type {number}
	 * @memberof OfferCardDTO
	 */
	averageContentRating?: number
	/**
	 *
	 * @type {OfferCardContentStatusType}
	 * @memberof OfferCardDTO
	 */
	contentRatingStatus?: OfferCardContentStatusType
	/**
	 * Список рекомендаций к заполнению карточки.  Рекомендации Маркета помогают заполнять карточку так, чтобы покупателям было проще найти ваш товар и решиться на покупку.
	 * @type {Array<OfferCardRecommendationDTO>}
	 * @memberof OfferCardDTO
	 */
	recommendations?: OfferCardRecommendationDTO[] | null
	/**
	 * Ошибки в контенте, препятствующие размещению товара на витрине.
	 * @type {Array<OfferErrorDTO>}
	 * @memberof OfferCardDTO
	 */
	errors?: OfferErrorDTO[] | null
	/**
	 * Связанные с контентом предупреждения, не препятствующие размещению товара на витрине.
	 * @type {Array<OfferErrorDTO>}
	 * @memberof OfferCardDTO
	 */
	warnings?: OfferErrorDTO[] | null
}

/**
 * Рекомендация по заполнению карточки товара.
 * @export
 * @interface OfferCardRecommendationDTO
 */
export interface OfferCardRecommendationDTO {
	/**
	 *
	 * @type {OfferCardRecommendationType}
	 * @memberof OfferCardRecommendationDTO
	 */
	type: OfferCardRecommendationType
	/**
	 * Процент выполнения рекомендации.  Указывается для рекомендаций некоторых типов:  * `PICTURE_COUNT`. * `VIDEO_COUNT`. * `MAIN`. * `ADDITIONAL`. * `DISTINCTIVE`.
	 * @type {number}
	 * @memberof OfferCardRecommendationDTO
	 */
	percent?: number
	/**
	 * Максимальное количество баллов рейтинга карточки, которые можно получить за выполнение рекомендаций.
	 * @type {number}
	 * @memberof OfferCardRecommendationDTO
	 */
	remainingRatingPoints?: number
}

/**
 * Рекомендация по дополнению или замене контента. Не возвращается для карточек, которые заполнены Маркетом или содержат бывшие в употреблении товары.  Часть рекомендаций относятся к **основным параметрам**, которые есть у товаров любых категорий. Другие — к тем **характеристикам**, которые есть у товара потому, что он относится к определенной категории.  **1. Рекомендации, относящиеся к основным параметрам**  Каждая такая рекомендация относится к **единственному параметру**. Чтобы заполнить этот параметр, пользуйтесь запросом [POST businesses/{businessId}/offer-mappings/update](../../reference/business-assortment/updateOfferMappings.md).  Рекомендации по заполнению параметров в `updateOfferMappings`:  * `RECOGNIZED_VENDOR` — напишите название производителя так, как его пишет сам производитель (параметр `vendor`). * `PICTURE_COUNT` — добавьте изображения (параметр `pictures`). [Требования](https://yandex.ru/support2/marketplace/ru/assortment/fields/images)    Для рекомендации приходит процент ее выполнения. * `FIRST_PICTURE_SIZE`— замените первое изображение более крупным (параметр `pictures`). [Требования](https://yandex.ru/support2/marketplace/ru/assortment/fields/images) * `TITLE_LENGTH` — измените название (параметр `name`). Составьте название по схеме: тип + бренд или производитель + модель + особенности, если есть (размер, вес, цвет). [Требования](https://yandex.ru/support2/marketplace/ru/assortment/fields/title) * `DESCRIPTION_LENGTH` — добавьте описание рекомендуемого размера (параметр `description`). [Требования](https://yandex.ru/support2/marketplace/ru/assortment/fields/description) * `AVERAGE_PICTURE_SIZE` — замените все изображения на изображения высокого качества (параметр `pictures`). [Требования](https://yandex.ru/support2/marketplace/ru/assortment/fields/images) * `FIRST_VIDEO_LENGTH` — добавьте первое видео рекомендуемой длины (параметр `videos`). [Требования](https://yandex.ru/support2/marketplace/ru/assortment/fields/video) * `FIRST_VIDEO_SIZE` — замените первое видео на видео высокого качества (параметр `videos`). [Требования](https://yandex.ru/support2/marketplace/ru/assortment/fields/video) * `AVERAGE_VIDEO_SIZE` — замените все видео на видео высокого качества (параметр `videos`). [Требования](https://yandex.ru/support2/marketplace/ru/assortment/fields/video) * `VIDEO_COUNT` — добавьте хотя бы одно видео (параметр `videos`). [Требования](https://yandex.ru/support2/marketplace/ru/assortment/fields/video)    Для рекомендации приходит процент ее выполнения.  **2. Рекомендации, относящиеся к характеристикам по категориям**  Каждая такая рекомендация предполагает заполнение **одной или нескольких характеристик**. Чтобы узнать, какие именно характеристики нужно заполнить, воспользуйтесь запросом [POST category/{categoryId}/parameters](../../reference/content/getCategoryContentParameters.md). Например, если вы получили рекомендацию `MAIN`, нужно заполнить характеристики, имеющие `MAIN` в массиве `recommendationTypes`.  Рекомендации:  * `MAIN` — заполните ключевые характеристики товара, которые используются в поиске и фильтрах.    Для рекомендации приходит процент ее выполнения. * `ADDITIONAL` — заполните дополнительные характеристики товара.    Для рекомендации приходит процент ее выполнения. * `DISTINCTIVE` — заполните характеристики, которыми отличаются друг от друга варианты товара.    Для рекомендации приходит процент ее выполнения.  **3. Устаревшие рекомендации**  * `HAS_VIDEO`. * `FILTERABLE`. * `HAS_DESCRIPTION`. * `HAS_BARCODE`.
 * @export
 * @enum {string}
 */

export const OfferCardRecommendationType = {
	HasVideo: 'HAS_VIDEO',
	RecognizedVendor: 'RECOGNIZED_VENDOR',
	Main: 'MAIN',
	Additional: 'ADDITIONAL',
	Distinctive: 'DISTINCTIVE',
	Filterable: 'FILTERABLE',
	PictureCount: 'PICTURE_COUNT',
	HasDescription: 'HAS_DESCRIPTION',
	HasBarcode: 'HAS_BARCODE',
	FirstPictureSize: 'FIRST_PICTURE_SIZE',
	TitleLength: 'TITLE_LENGTH',
	DescriptionLength: 'DESCRIPTION_LENGTH',
	AveragePictureSize: 'AVERAGE_PICTURE_SIZE',
	FirstVideoSize: 'FIRST_VIDEO_SIZE',
	FirstVideoLength: 'FIRST_VIDEO_LENGTH',
	AverageVideoSize: 'AVERAGE_VIDEO_SIZE',
	VideoCount: 'VIDEO_COUNT',
} as const

export type OfferCardRecommendationType =
	(typeof OfferCardRecommendationType)[keyof typeof OfferCardRecommendationType]

/**
 * Статус карточки товара:  * `HAS_CARD_CAN_NOT_UPDATE` — Карточка Маркета. * `HAS_CARD_CAN_UPDATE` — Можно дополнить. * `HAS_CARD_CAN_UPDATE_ERRORS` — Изменения не приняты. * `HAS_CARD_CAN_UPDATE_PROCESSING` — Изменения на проверке. * `NO_CARD_NEED_CONTENT` — Создайте карточку. * `NO_CARD_MARKET_WILL_CREATE` — Создаст Маркет. * `NO_CARD_ERRORS` — Не создана из-за ошибки. * `NO_CARD_PROCESSING` — Проверяем данные. * `NO_CARD_ADD_TO_CAMPAIGN` — Разместите товар в магазине.  [Что обозначает каждый из статусов](https://yandex.ru/support/marketplace/assortment/content/statuses.html)
 * @export
 * @enum {string}
 */

export const OfferCardStatusType = {
	HasCardCanNotUpdate: 'HAS_CARD_CAN_NOT_UPDATE',
	HasCardCanUpdate: 'HAS_CARD_CAN_UPDATE',
	HasCardCanUpdateErrors: 'HAS_CARD_CAN_UPDATE_ERRORS',
	HasCardCanUpdateProcessing: 'HAS_CARD_CAN_UPDATE_PROCESSING',
	NoCardNeedContent: 'NO_CARD_NEED_CONTENT',
	NoCardMarketWillCreate: 'NO_CARD_MARKET_WILL_CREATE',
	NoCardErrors: 'NO_CARD_ERRORS',
	NoCardProcessing: 'NO_CARD_PROCESSING',
	NoCardAddToCampaign: 'NO_CARD_ADD_TO_CAMPAIGN',
} as const

export type OfferCardStatusType =
	(typeof OfferCardStatusType)[keyof typeof OfferCardStatusType]

/**
 * Список товаров с информацией о состоянии карточек.
 * @export
 * @interface OfferCardsContentStatusDTO
 */
export interface OfferCardsContentStatusDTO {
	/**
	 * Страница списка товаров с информацией о состоянии карточек.
	 * @type {Array<OfferCardDTO>}
	 * @memberof OfferCardsContentStatusDTO
	 */
	offerCards: OfferCardDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof OfferCardsContentStatusDTO
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * Состояние уцененного товара.
 * @export
 * @interface OfferConditionDTO
 */
export interface OfferConditionDTO {
	/**
	 *
	 * @type {OfferConditionType}
	 * @memberof OfferConditionDTO
	 */
	type?: OfferConditionType
	/**
	 *
	 * @type {OfferConditionQualityType}
	 * @memberof OfferConditionDTO
	 */
	quality?: OfferConditionQualityType
	/**
	 * Описание товара. Подробно опишите дефекты, насколько они заметны и где их искать.
	 * @type {string}
	 * @memberof OfferConditionDTO
	 */
	reason?: string
}

/**
 * Внешний вид товара:  * `PERFECT` — идеальный. * `EXCELLENT` — отличный. * `GOOD` — хороший. * `NOT_SPECIFIED` — не выбран.
 * @export
 * @enum {string}
 */

export const OfferConditionQualityType = {
	Perfect: 'PERFECT',
	Excellent: 'EXCELLENT',
	Good: 'GOOD',
	NotSpecified: 'NOT_SPECIFIED',
} as const

export type OfferConditionQualityType =
	(typeof OfferConditionQualityType)[keyof typeof OfferConditionQualityType]

/**
 * Тип уценки:  * `PREOWNED` —  бывший в употреблении товар, раньше принадлежал другому человеку. * `SHOWCASESAMPLE` — витринный образец. * `REFURBISHED` — повторная продажа товара. * `REDUCTION` — товар с дефектами. * `RENOVATED` — восстановленный товар. * `NOT_SPECIFIED` — не выбран.  `REFURBISHED` — специальное значение для одежды, обуви и аксессуаров. Используется только для уцененных товаров из этой категории. Другие значения для одежды, обуви и аксессуаров не используются.
 * @export
 * @enum {string}
 */

export const OfferConditionType = {
	Preowned: 'PREOWNED',
	Showcasesample: 'SHOWCASESAMPLE',
	Refurbished: 'REFURBISHED',
	Reduction: 'REDUCTION',
	Renovated: 'RENOVATED',
	NotSpecified: 'NOT_SPECIFIED',
} as const

export type OfferConditionType =
	(typeof OfferConditionType)[keyof typeof OfferConditionType]

/**
 * Товар с указанными характеристиками.
 * @export
 * @interface OfferContentDTO
 */
export interface OfferContentDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof OfferContentDTO
	 */
	offerId: string
	/**
	 * Идентификатор категории на Маркете.  При изменении категории убедитесь, что характеристики товара и их значения в параметре `parameterValues` вы передаете для новой категории.  Список категорий Маркета можно получить с помощью запроса  [POST categories/tree](../../reference/categories/getCategoriesTree.md).
	 * @type {number}
	 * @memberof OfferContentDTO
	 */
	categoryId: number
	/**
	 * Список характеристик с их значениями.  С `parameterValues` обязательно передавайте `categoryId` — идентификатор категории на Маркете, к которой относятся указанные характеристики товара.  При **изменении** характеристик передавайте только те, значение которых нужно обновить. Если в `categoryId` вы меняете категорию, значения общих характеристик для старой и новой категории сохранятся, передавать их не нужно.  Чтобы **удалить** значение заданной характеристики, передайте ее `parameterId` с пустым `value`.
	 * @type {Array<ParameterValueDTO>}
	 * @memberof OfferContentDTO
	 */
	parameterValues: ParameterValueDTO[]
}
/**
 * Текст ошибки или предупреждения.
 * @export
 * @interface OfferContentErrorDTO
 */
export interface OfferContentErrorDTO {
	/**
	 *
	 * @type {OfferContentErrorType}
	 * @memberof OfferContentErrorDTO
	 */
	type: OfferContentErrorType
	/**
	 * Идентификатор характеристики, с которой связана ошибка или предупреждение.
	 * @type {number}
	 * @memberof OfferContentErrorDTO
	 */
	parameterId?: number
	/**
	 * Текст ошибки или предупреждения.
	 * @type {string}
	 * @memberof OfferContentErrorDTO
	 */
	message: string
}

/**
 * Типы ошибок и предупреждений:  * `OFFER_NOT_FOUND` — такого товара нет в каталоге. * `UNKNOWN_CATEGORY` — указана неизвестная категория. * `INVALID_CATEGORY` — указана нелистовая категория. Укажите ту, которая не имеет дочерних категорий. * `UNKNOWN_PARAMETER` — передана характеристика, которой нет среди характеристик категории. * `UNEXPECTED_BOOLEAN_VALUE` — вместо boolean-значения передано что-то другое. * `NUMBER_FORMAT` — передана строка, не обозначающая число, вместо числа. * `INVALID_UNIT_ID` — передана единица измерения, недопустимая для характеристики. * `INVALID_GROUP_ID_LENGTH` — в названии превышено допустимое значение символов — 255. * `INVALID_GROUP_ID_CHARACTERS` — переданы [недопустимые символы](*ascii-code).
 * @export
 * @enum {string}
 */

export const OfferContentErrorType = {
	OfferNotFound: 'OFFER_NOT_FOUND',
	UnknownCategory: 'UNKNOWN_CATEGORY',
	InvalidCategory: 'INVALID_CATEGORY',
	UnknownParameter: 'UNKNOWN_PARAMETER',
	UnexpectedBooleanValue: 'UNEXPECTED_BOOLEAN_VALUE',
	NumberFormat: 'NUMBER_FORMAT',
	InvalidUnitId: 'INVALID_UNIT_ID',
	InvalidGroupIdLength: 'INVALID_GROUP_ID_LENGTH',
	InvalidGroupIdCharacters: 'INVALID_GROUP_ID_CHARACTERS',
} as const

export type OfferContentErrorType =
	(typeof OfferContentErrorType)[keyof typeof OfferContentErrorType]

/**
 * Предложение.
 * @export
 * @interface OfferDTO
 */
export interface OfferDTO {
	/**
	 * Цена предложения.  До версии 2.0 партнерского API у параметра был тип String.
	 * @type {number}
	 * @memberof OfferDTO
	 */
	price?: number
	/**
	 * Идентификатор прайс-листа, содержащего предложение.  Параметр доступен начиная с версии 2.0 партнерского API.
	 * @type {number}
	 * @memberof OfferDTO
	 */
	feedId?: number
	/**
	 * Идентификатор предложения из прайс-листа.  Параметр выводится, если в прайс-листе задан уникальный идентификатор. Если в прайс-листе содержится несколько предложений с одинаковыми идентификаторами, параметр `id` указывается только для первого из них, для остальных параметры `id` и `feedId` не выводятся.  Параметр доступен начиная с версии 2.0 партнерского API.
	 * @type {string}
	 * @memberof OfferDTO
	 */
	id?: string
	/**
	 * Идентификатор категории предложения, указанный магазином в прайс-листе.  Параметр выводится только для предложений, у которых указана категория в прайс-листе.  Параметр доступен начиная с версии 2.0 партнерского API.
	 * @type {string}
	 * @memberof OfferDTO
	 */
	shopCategoryId?: string
	/**
	 * Идентификатор категории предложения в дереве категорий Маркета. Параметр доступен начиная с версии 2.0 партнерского API.
	 * @type {number}
	 * @memberof OfferDTO
	 */
	marketCategoryId?: number
	/**
	 * Цена предложения без скидки.
	 * @type {number}
	 * @memberof OfferDTO
	 */
	preDiscountPrice?: number
	/**
	 * Скидка на предложение в процентах.
	 * @type {number}
	 * @memberof OfferDTO
	 */
	discount?: number
	/**
	 * Является ли предложение уцененным:  * `true` — да. * `false` — нет.  Параметр доступен начиная с версии 2.58 партнерского API.
	 * @type {boolean}
	 * @memberof OfferDTO
	 */
	cutPrice?: boolean
	/**
	 * URL-адрес предложения на сайте магазина.
	 * @type {string}
	 * @memberof OfferDTO
	 */
	url?: string
	/**
	 * Идентификатор модели Маркета, с которой соотнесено предложение.  Если предложение не соотнесено ни с какой карточкой модели, то параметр `modelid` содержит значение `0`.  {% note info \"Где отображается идентификатор модели\" %}  В URL карточки модели в виде значения параметра `product`. Например: `https://market.yandex.ru/product/13584121`.  {% endnote %}
	 * @type {number}
	 * @memberof OfferDTO
	 */
	modelId: number
	/**
	 * Наименование предложения.
	 * @type {string}
	 * @memberof OfferDTO
	 */
	name?: string
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof OfferDTO
	 */
	currency?: CurrencyType
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Ставка на клик.
	 * @type {number}
	 * @memberof OfferDTO
	 */
	bid?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Ставка на клик.
	 * @type {number}
	 * @memberof OfferDTO
	 */
	cbid?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Процент комиссии на товар при продаже по CPA.
	 * @type {number}
	 * @memberof OfferDTO
	 */
	fee?: number
	/**
	 * Признак блокировки предложения. Возможные значения: * `false` — предложение активно, параметр не выводится. * `true` — предложение заблокировано. Параметр выводится, если предложение заблокировано и не попадает в выдачу Маркета. Это может произойти из-за отключения магазина.
	 * @type {boolean}
	 * @memberof OfferDTO
	 */
	blocked?: boolean
}

/**
 * Сообщение об ошибке, связанной с размещением товара.
 * @export
 * @interface OfferErrorDTO
 */
export interface OfferErrorDTO {
	/**
	 * Тип ошибки.
	 * @type {string}
	 * @memberof OfferErrorDTO
	 */
	message?: string
	/**
	 * Пояснение.
	 * @type {string}
	 * @memberof OfferErrorDTO
	 */
	comment?: string
}
/**
 * Информация о состоянии цены на товар.
 * @export
 * @interface OfferForRecommendationDTO
 */
export interface OfferForRecommendationDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof OfferForRecommendationDTO
	 */
	offerId?: string
	/**
	 *
	 * @type {BasePriceDTO}
	 * @memberof OfferForRecommendationDTO
	 */
	price?: BasePriceDTO
	/**
	 *
	 * @type {GetPriceDTO}
	 * @memberof OfferForRecommendationDTO
	 */
	cofinancePrice?: GetPriceDTO
	/**
	 *
	 * @type {PriceCompetitivenessType}
	 * @memberof OfferForRecommendationDTO
	 */
	competitiveness?: PriceCompetitivenessType
	/**
	 * Количество показов карточки товара за последние 7 дней.
	 * @type {number}
	 * @memberof OfferForRecommendationDTO
	 */
	shows?: number
}

/**
 * Инструкция по использованию товара.
 * @export
 * @interface OfferManualDTO
 */
export interface OfferManualDTO {
	/**
	 * Ссылка на инструкцию.
	 * @type {string}
	 * @memberof OfferManualDTO
	 */
	url: string
	/**
	 * Название инструкции, которое будет отображаться на карточке товара.
	 * @type {string}
	 * @memberof OfferManualDTO
	 */
	title?: string
}
/**
 * Информация о текущей карточке товара на Маркете.
 * @export
 * @interface OfferMappingDTO
 */
export interface OfferMappingDTO {
	/**
	 * SKU на Маркете.
	 * @type {number}
	 * @memberof OfferMappingDTO
	 */
	marketSku?: number
	/**
	 * Идентификатор модели для текущей карточки товара на Маркете.  Например, две лопатки разных цветов имеют разные SKU на Маркете (параметр `marketSku`), но одинаковый идентификатор модели товара.
	 * @type {number}
	 * @memberof OfferMappingDTO
	 */
	modelId?: number
	/**
	 * Идентификатор категории для текущей карточки товара на Маркете.
	 * @type {number}
	 * @memberof OfferMappingDTO
	 */
	categoryId?: number
}
/**
 * Информация о товарах в каталоге.
 * @export
 * @interface OfferMappingEntriesDTO
 */
export interface OfferMappingEntriesDTO {
	/**
	 *
	 * @type {ScrollingPagerDTO}
	 * @memberof OfferMappingEntriesDTO
	 */
	paging?: ScrollingPagerDTO
	/**
	 * Информация о товарах в каталоге.
	 * @type {Array<OfferMappingEntryDTO>}
	 * @memberof OfferMappingEntriesDTO
	 */
	offerMappingEntries: OfferMappingEntryDTO[]
}
/**
 * Список товаров.
 * @export
 * @interface OfferMappingEntryDTO
 */
export interface OfferMappingEntryDTO {
	/**
	 *
	 * @type {OfferMappingDTO}
	 * @memberof OfferMappingEntryDTO
	 */
	mapping?: OfferMappingDTO
	/**
	 *
	 * @type {OfferMappingDTO}
	 * @memberof OfferMappingEntryDTO
	 */
	awaitingModerationMapping?: OfferMappingDTO
	/**
	 *
	 * @type {OfferMappingDTO}
	 * @memberof OfferMappingEntryDTO
	 */
	rejectedMapping?: OfferMappingDTO
	/**
	 *
	 * @type {MappingsOfferDTO}
	 * @memberof OfferMappingEntryDTO
	 */
	offer?: MappingsOfferDTO
}
/**
 * Текст ошибки или предупреждения.
 * @export
 * @interface OfferMappingErrorDTO
 */
export interface OfferMappingErrorDTO {
	/**
	 *
	 * @type {OfferMappingErrorType}
	 * @memberof OfferMappingErrorDTO
	 */
	type: OfferMappingErrorType
	/**
	 * Идентификатор характеристики, с которой связана ошибка или предупреждение.
	 * @type {number}
	 * @memberof OfferMappingErrorDTO
	 */
	parameterId?: number
	/**
	 * Текст ошибки или предупреждения.
	 * @type {string}
	 * @memberof OfferMappingErrorDTO
	 */
	message: string
}

/**
 * Типы ошибок и предупреждений:  * `UNKNOWN_CATEGORY` — указана неизвестная категория. * `INVALID_CATEGORY` — указана нелистовая категория. Укажите ту, которая не имеет дочерних категорий. * `EMPTY_MARKET_CATEGORY` — не указана категория Маркета при передаче характеристик категории. * `UNKNOWN_PARAMETER` — передана характеристика, которой нет среди характеристик категории. * `UNEXPECTED_BOOLEAN_VALUE` — вместо boolean-значения передано что-то другое. * `NUMBER_FORMAT` — передана строка, не обозначающая число, вместо числа. * `INVALID_UNIT_ID` — передана единица измерения, недопустимая для характеристики. * `INVALID_GROUP_ID_LENGTH` — в названии превышено допустимое значение символов — 255. * `INVALID_GROUP_ID_CHARACTERS` — переданы [недопустимые символы](*ascii-code). * `INVALID_PICKER_URL` — передана ссылка на изображение для миниатюры, которой нет в переданных ссылках на изображение товара. * `LOCKED_DIMENSIONS` — переданы габариты упаковки, которые нельзя изменить. * `INVALID_COMMODITY_CODE` — передан некорректный товарный код.
 * @export
 * @enum {string}
 */

export const OfferMappingErrorType = {
	UnknownCategory: 'UNKNOWN_CATEGORY',
	InvalidCategory: 'INVALID_CATEGORY',
	EmptyMarketCategory: 'EMPTY_MARKET_CATEGORY',
	UnknownParameter: 'UNKNOWN_PARAMETER',
	UnexpectedBooleanValue: 'UNEXPECTED_BOOLEAN_VALUE',
	NumberFormat: 'NUMBER_FORMAT',
	InvalidUnitId: 'INVALID_UNIT_ID',
	InvalidGroupIdLength: 'INVALID_GROUP_ID_LENGTH',
	InvalidGroupIdCharacters: 'INVALID_GROUP_ID_CHARACTERS',
	InvalidPickerUrl: 'INVALID_PICKER_URL',
	LockedDimensions: 'LOCKED_DIMENSIONS',
	InvalidCommodityCode: 'INVALID_COMMODITY_CODE',
} as const

export type OfferMappingErrorType =
	(typeof OfferMappingErrorType)[keyof typeof OfferMappingErrorType]

/**
 * Информация о карточке товара.
 * @export
 * @interface OfferMappingInfoDTO
 */
export interface OfferMappingInfoDTO {
	/**
	 *
	 * @type {OfferMappingDTO}
	 * @memberof OfferMappingInfoDTO
	 */
	mapping?: OfferMappingDTO
	/**
	 *
	 * @type {OfferMappingDTO}
	 * @memberof OfferMappingInfoDTO
	 */
	awaitingModerationMapping?: OfferMappingDTO
	/**
	 *
	 * @type {OfferMappingDTO}
	 * @memberof OfferMappingInfoDTO
	 */
	rejectedMapping?: OfferMappingDTO
}
/**
 * Вид маппинга: * `ALL` — все товары. * `ACTIVE` — готовые к продаже товары.
 * @export
 * @enum {string}
 */

export const OfferMappingKindType = {
	Active: 'ACTIVE',
	All: 'ALL',
} as const

export type OfferMappingKindType =
	(typeof OfferMappingKindType)[keyof typeof OfferMappingKindType]

/**
 * Список рекомендованных карточек товара.
 * @export
 * @interface OfferMappingSuggestionsListDTO
 */
export interface OfferMappingSuggestionsListDTO {
	/**
	 * Список товаров.
	 * @type {Array<EnrichedMappingsOfferDTO>}
	 * @memberof OfferMappingSuggestionsListDTO
	 */
	offers: EnrichedMappingsOfferDTO[]
}
/**
 * Информация о медиафайле товара.
 * @export
 * @interface OfferMediaFileDTO
 */
export interface OfferMediaFileDTO {
	/**
	 * Ссылка на медиафайл.
	 * @type {string}
	 * @memberof OfferMediaFileDTO
	 */
	url?: string
	/**
	 * Название медиафайла.
	 * @type {string}
	 * @memberof OfferMediaFileDTO
	 */
	title?: string
	/**
	 *
	 * @type {MediaFileUploadStateType}
	 * @memberof OfferMediaFileDTO
	 */
	uploadState?: MediaFileUploadStateType
}

/**
 * Информация о медиафайлах товара.
 * @export
 * @interface OfferMediaFilesDTO
 */
export interface OfferMediaFilesDTO {
	/**
	 * Использовать первое видео в карточке как видеообложку.  Передайте `true`, чтобы первое видео использовалось как видеообложка, или `false`, чтобы видеообложка не отображалась в карточке товара.
	 * @type {boolean}
	 * @memberof OfferMediaFilesDTO
	 */
	firstVideoAsCover?: boolean
	/**
	 * Видеофайлы товара.
	 * @type {Array<OfferMediaFileDTO>}
	 * @memberof OfferMediaFilesDTO
	 */
	videos?: OfferMediaFileDTO[] | null
	/**
	 * Изображения товара.
	 * @type {Array<OfferMediaFileDTO>}
	 * @memberof OfferMediaFilesDTO
	 */
	pictures?: OfferMediaFileDTO[] | null
	/**
	 * Руководства по использованию товара.
	 * @type {Array<OfferMediaFileDTO>}
	 * @memberof OfferMediaFilesDTO
	 */
	manuals?: OfferMediaFileDTO[] | null
}
/**
 * Параметры товара.  Если у товара несколько значений одного параметра, передайте их с одним и тем же `name`, но разными `value`.  {% cut \"Пример\" %}  ```json \"params\": [   {     \"name\": \"Цвет для фильтра\",     \"value\": \"Зеленый\"   },   {     \"name\": \"Цвет для фильтра\",     \"value\": \"Желтый\"   } ] ```  {% endcut %}
 * @export
 * @interface OfferParamDTO
 */
export interface OfferParamDTO {
	/**
	 * Название.  Должно совпадать с названием характеристики на Маркете. Узнать его можно из Excel-шаблона категории или через запрос [POST category/{categoryId}/parameters](../../reference/content/getCategoryContentParameters.md).
	 * @type {string}
	 * @memberof OfferParamDTO
	 */
	name: string
	/**
	 * Значение.
	 * @type {string}
	 * @memberof OfferParamDTO
	 */
	value: string
}
/**
 * Список цен.
 * @export
 * @interface OfferPriceByOfferIdsListResponseDTO
 */
export interface OfferPriceByOfferIdsListResponseDTO {
	/**
	 * Страница списка цен.
	 * @type {Array<OfferPriceByOfferIdsResponseDTO>}
	 * @memberof OfferPriceByOfferIdsListResponseDTO
	 */
	offers: OfferPriceByOfferIdsResponseDTO[]
	/**
	 *
	 * @type {ScrollingPagerDTO}
	 * @memberof OfferPriceByOfferIdsListResponseDTO
	 */
	paging?: ScrollingPagerDTO
}
/**
 * Информация об установленной цене.
 * @export
 * @interface OfferPriceByOfferIdsResponseDTO
 */
export interface OfferPriceByOfferIdsResponseDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof OfferPriceByOfferIdsResponseDTO
	 */
	offerId?: string
	/**
	 *
	 * @type {PriceDTO}
	 * @memberof OfferPriceByOfferIdsResponseDTO
	 */
	price?: PriceDTO
	/**
	 * Дата и время последнего обновления цены.
	 * @type {string}
	 * @memberof OfferPriceByOfferIdsResponseDTO
	 */
	updatedAt?: string
}
/**
 * Товар с информацией о новой цене на него.
 * @export
 * @interface OfferPriceDTO
 */
export interface OfferPriceDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof OfferPriceDTO
	 */
	offerId?: string
	/**
	 *
	 * @type {PriceDTO}
	 * @memberof OfferPriceDTO
	 */
	price?: PriceDTO
}
/**
 * Список цен на товары.
 * @export
 * @interface OfferPriceListResponseDTO
 */
export interface OfferPriceListResponseDTO {
	/**
	 * Страница списка.
	 * @type {Array<OfferPriceResponseDTO>}
	 * @memberof OfferPriceListResponseDTO
	 */
	offers: OfferPriceResponseDTO[]
	/**
	 *
	 * @type {ScrollingPagerDTO}
	 * @memberof OfferPriceListResponseDTO
	 */
	paging?: ScrollingPagerDTO
	/**
	 * Количество всех цен магазина, измененных через API.
	 * @type {number}
	 * @memberof OfferPriceListResponseDTO
	 */
	total?: number
}
/**
 * Информация об установленной цене на товар.
 * @export
 * @interface OfferPriceResponseDTO
 */
export interface OfferPriceResponseDTO {
	/**
	 * Идентификатор предложения из прайс-листа.
	 * @type {string}
	 * @memberof OfferPriceResponseDTO
	 */
	id?: string
	/**
	 *
	 * @type {PriceDTO}
	 * @memberof OfferPriceResponseDTO
	 */
	price?: PriceDTO
	/**
	 * SKU на Маркете.
	 * @type {number}
	 * @memberof OfferPriceResponseDTO
	 */
	marketSku?: number
	/**
	 * Дата и время последнего обновления цены на товар.
	 * @type {string}
	 * @memberof OfferPriceResponseDTO
	 */
	updatedAt?: string
}
/**
 * Причины, по которым товар не прошел модерацию.
 * @export
 * @interface OfferProcessingNoteDTO
 */
export interface OfferProcessingNoteDTO {
	/**
	 *
	 * @type {OfferProcessingNoteType}
	 * @memberof OfferProcessingNoteDTO
	 */
	type?: OfferProcessingNoteType
	/**
	 * Дополнительная информация о причине отклонения товара.
	 * @type {string}
	 * @memberof OfferProcessingNoteDTO
	 */
	payload?: string
}

/**
 * Тип причины, по которой товар не прошел модерацию:  * `ASSORTMENT` — товар производится в разных вариантах. Каждый из них нужно описать как отдельный товар (параметр `offerMappings` в запросе [POST businesses/{businessId}/offer-mappings/update](../../reference/business-assortment/updateOfferMappings.md) или строка в каталоге, если вы загружаете товары через кабинет продавца на Маркете). * `CANCELLED` — товар отозван с модерации по вашей инициативе. * `CONFLICTING_INFORMATION` _(ранее ошибочно `CONFLICTING`)_ — вы предоставили противоречивую информацию о товаре. Параметры, которые нужно исправить, указаны в параметре `payload`. * `OTHER` — товар не прошел модерацию по другой причине. Обратитесь в службу поддержки или к вашему менеджеру. * `DEPARTMENT_FROZEN` — правила размещения товаров в данной категории перерабатываются, поэтому товар пока не может пройти модерацию. * `INCORRECT_INFORMATION` — информация о товаре, которую вы предоставили, противоречит описанию от производителя. Параметры, которые нужно исправить, указаны в параметре `payload`. * `LEGAL_CONFLICT` — товар не прошел модерацию по юридическим причинам. Например, он официально не продается в России или у вас нет разрешения на его продажу. * `NEED_CLASSIFICATION_INFORMATION` — информации о товаре, которую вы предоставили, не хватает, чтобы отнести его к категории. Проверьте, что правильно указали название, категорию, производителя и страны производства товара, а также URL изображений или страниц с описанием, по которым можно идентифицировать товар. * `NEED_INFORMATION` — товар раньше не продавался в России и пока не размещается на Маркете. Для него можно создать карточку. Подробнее см. в разделе [Работа с карточкой товара](https://yandex.ru/support/marketplace/assortment/content/index.html) Справки Маркета для продавцов. * `NEED_PICTURES` — для идентификации товара нужны его изображения. Отправьте URL изображений товара в запросе [POST businesses/{businessId}/offer-mappings/update](../../reference/business-assortment/updateOfferMappings.md) или загрузите обновленный каталог через кабинет продавца на Маркете. * `NEED_VENDOR` — неверно указан производитель товара. * `NO_CATEGORY`, `NO_KNOWLEDGE` — товары из указанной категории пока не размещаются на Маркете. Если категория появится, товар будет снова отправлен на модерацию. * `NO_PARAMETERS_IN_SHOP_TITLE` — товар производится в разных вариантах, и из указанного названия непонятно, о каком идет речь. Параметры, которые нужно добавить в название товара, указаны в параметре `payload`. * `NO_SIZE_MEASURE` — для этого товара нужна размерная сетка. Отправьте ее в службу поддержки или вашему менеджеру. Требования к размерной сетке указаны в параметре `payload`. * `SAMPLE_LINE` — товар не прошел модерацию из-за лишней строки.
 * @export
 * @enum {string}
 */

export const OfferProcessingNoteType = {
	Assortment: 'ASSORTMENT',
	Cancelled: 'CANCELLED',
	ConflictingInformation: 'CONFLICTING_INFORMATION',
	Other: 'OTHER',
	DepartmentFrozen: 'DEPARTMENT_FROZEN',
	IncorrectInformation: 'INCORRECT_INFORMATION',
	LegalConflict: 'LEGAL_CONFLICT',
	NeedClassificationInformation: 'NEED_CLASSIFICATION_INFORMATION',
	NeedInformation: 'NEED_INFORMATION',
	NeedPictures: 'NEED_PICTURES',
	NeedVendor: 'NEED_VENDOR',
	NoCategory: 'NO_CATEGORY',
	NoKnowledge: 'NO_KNOWLEDGE',
	NoParametersInShopTitle: 'NO_PARAMETERS_IN_SHOP_TITLE',
	NoSizeMeasure: 'NO_SIZE_MEASURE',
	SampleLine: 'SAMPLE_LINE',
} as const

export type OfferProcessingNoteType =
	(typeof OfferProcessingNoteType)[keyof typeof OfferProcessingNoteType]

/**
 * Информация о статусе публикации товара на Маркете.
 * @export
 * @interface OfferProcessingStateDTO
 */
export interface OfferProcessingStateDTO {
	/**
	 *
	 * @type {OfferProcessingStatusType}
	 * @memberof OfferProcessingStateDTO
	 */
	status?: OfferProcessingStatusType
	/**
	 * Причины, по которым товар не прошел модерацию.
	 * @type {Array<OfferProcessingNoteDTO>}
	 * @memberof OfferProcessingStateDTO
	 */
	notes?: OfferProcessingNoteDTO[] | null
}

/**
 * Статус публикации товара:  * `UNKNOWN` — неизвестный статус. * `READY` — товар прошел модерацию. Чтобы разместить его на Маркете, установите для него цену. * `IN_WORK` — товар проходит модерацию. Это занимает несколько дней. * `NEED_INFO` — товар не прошел модерацию из-за ошибок или недостающих сведений в описании товара. Информация о причинах отклонения возвращается в параметре `notes`. * `NEED_MAPPING` — у товара нельзя создать карточку. * `NEED_CONTENT` — для товара без SKU на Маркете (`marketSku`) нужно найти карточку самостоятельно (через API или кабинет продавца на Маркете) или создать ее, если товар еще не продается на Маркете. * `CONTENT_PROCESSING` — товар находится на модерации. * `SUSPENDED` — товар не прошел модерацию, так как Маркет пока не размещает подобные товары. * `REJECTED` — товар не прошел модерацию, так как Маркет не планирует размещать подобные товары. * `REVIEW` — принимается решение о размещении товара. * `CREATE_ERROR` — не удалось создать карточку товара. * `UPDATE_ERROR` — у карточки товара есть непримененные изменения.
 * @export
 * @enum {string}
 */

export const OfferProcessingStatusType = {
	Unknown: 'UNKNOWN',
	Ready: 'READY',
	InWork: 'IN_WORK',
	NeedInfo: 'NEED_INFO',
	NeedMapping: 'NEED_MAPPING',
	NeedContent: 'NEED_CONTENT',
	ContentProcessing: 'CONTENT_PROCESSING',
	Suspended: 'SUSPENDED',
	Rejected: 'REJECTED',
	Review: 'REVIEW',
	CreateError: 'CREATE_ERROR',
	UpdateError: 'UPDATE_ERROR',
} as const

export type OfferProcessingStatusType =
	(typeof OfferProcessingStatusType)[keyof typeof OfferProcessingStatusType]

/**
 * Информация о состоянии цен и рекомендации.
 * @export
 * @interface OfferRecommendationDTO
 */
export interface OfferRecommendationDTO {
	/**
	 *
	 * @type {OfferForRecommendationDTO}
	 * @memberof OfferRecommendationDTO
	 */
	offer?: OfferForRecommendationDTO
	/**
	 *
	 * @type {OfferRecommendationInfoDTO}
	 * @memberof OfferRecommendationDTO
	 */
	recommendation?: OfferRecommendationInfoDTO
}
/**
 * Рекомендации, касающиеся цены на товар.
 * @export
 * @interface OfferRecommendationInfoDTO
 */
export interface OfferRecommendationInfoDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof OfferRecommendationInfoDTO
	 */
	offerId?: string
	/**
	 *
	 * @type {BasePriceDTO}
	 * @memberof OfferRecommendationInfoDTO
	 */
	recommendedCofinancePrice?: BasePriceDTO
	/**
	 *
	 * @type {PriceCompetitivenessThresholdsDTO}
	 * @memberof OfferRecommendationInfoDTO
	 */
	competitivenessThresholds?: PriceCompetitivenessThresholdsDTO
}
/**
 * Список товаров с рекомендациями.
 * @export
 * @interface OfferRecommendationsResultDTO
 */
export interface OfferRecommendationsResultDTO {
	/**
	 *
	 * @type {ScrollingPagerDTO}
	 * @memberof OfferRecommendationsResultDTO
	 */
	paging?: ScrollingPagerDTO
	/**
	 * Страница списка товаров.
	 * @type {Array<OfferRecommendationDTO>}
	 * @memberof OfferRecommendationsResultDTO
	 */
	offerRecommendations: OfferRecommendationDTO[]
}
/**
 * Информация о том, по каким моделям можно продавать товар, а по каким нельзя.
 * @export
 * @interface OfferSellingProgramDTO
 */
export interface OfferSellingProgramDTO {
	/**
	 *
	 * @type {SellingProgramType}
	 * @memberof OfferSellingProgramDTO
	 */
	sellingProgram: SellingProgramType
	/**
	 *
	 * @type {OfferSellingProgramStatusType}
	 * @memberof OfferSellingProgramDTO
	 */
	status: OfferSellingProgramStatusType
}

/**
 * Информация о доступности или недоступности.  * `FINE` — доступно. * `REJECT` — недоступно.
 * @export
 * @enum {string}
 */

export const OfferSellingProgramStatusType = {
	Fine: 'FINE',
	Reject: 'REJECT',
} as const

export type OfferSellingProgramStatusType =
	(typeof OfferSellingProgramStatusType)[keyof typeof OfferSellingProgramStatusType]

/**
 * Особый тип товара:  * `DEFAULT` — товары, для которых вы передавали особый тип ранее и хотите убрать его. * `MEDICINE` — лекарства. * `BOOK` — бумажные и электронные книги. * `AUDIOBOOK` — аудиокниги. * `ARTIST_TITLE` — музыкальная и видеопродукция. * `ON_DEMAND` — товары на заказ. * `ALCOHOL` — алкоголь.  {% note info \"Если ваш товар — книга\" %}  Укажите год издания в характеристиках товара. [Подробнее о параметре](../../reference/business-assortment/updateOfferMappings.md#offerparamdto)  {% endnote %}
 * @export
 * @enum {string}
 */

export const OfferType = {
	Default: 'DEFAULT',
	Medicine: 'MEDICINE',
	Book: 'BOOK',
	Audiobook: 'AUDIOBOOK',
	ArtistTitle: 'ARTIST_TITLE',
	OnDemand: 'ON_DEMAND',
	Alcohol: 'ALCOHOL',
} as const

export type OfferType = (typeof OfferType)[keyof typeof OfferType]

/**
 * Габариты упаковки и вес товара.  Если товар занимает несколько коробок, перед измерением размеров сложите их компактно.  ![Схема измерения многоместных грузов](../../_images/reference/boxes-measure.png)
 * @export
 * @interface OfferWeightDimensionsDTO
 */
export interface OfferWeightDimensionsDTO {
	/**
	 * Длина упаковки в см.
	 * @type {number}
	 * @memberof OfferWeightDimensionsDTO
	 */
	length: number
	/**
	 * Ширина упаковки в см.
	 * @type {number}
	 * @memberof OfferWeightDimensionsDTO
	 */
	width: number
	/**
	 * Высота упаковки в см.
	 * @type {number}
	 * @memberof OfferWeightDimensionsDTO
	 */
	height: number
	/**
	 * Вес товара в кг с учетом упаковки (брутто).
	 * @type {number}
	 * @memberof OfferWeightDimensionsDTO
	 */
	weight: number
}
/**
 * Найденные предложения магазина.
 * @export
 * @interface OffersDTO
 */
export interface OffersDTO {
	/**
	 * Список предложений магазина.
	 * @type {Array<OfferDTO>}
	 * @memberof OffersDTO
	 */
	offers: OfferDTO[]
}
/**
 * Значение ограничивающей характеристики и список допустимых значений ограничиваемой характеристики.
 * @export
 * @interface OptionValuesLimitedDTO
 */
export interface OptionValuesLimitedDTO {
	/**
	 * Идентификатор значения ограничивающей характеристики.
	 * @type {number}
	 * @memberof OptionValuesLimitedDTO
	 */
	limitingOptionValueId: number
	/**
	 * Идентификаторы допустимых значений ограничиваемой характеристики.
	 * @type {Array<number>}
	 * @memberof OptionValuesLimitedDTO
	 */
	optionValueIds: number[]
}
/**
 * Информация о коробке.
 * @export
 * @interface OrderBoxLayoutDTO
 */
export interface OrderBoxLayoutDTO {
	/**
	 * Список товаров в коробке.  Если в коробке едет часть большого товара, в списке может быть только один пункт.
	 * @type {Array<OrderBoxLayoutItemDTO>}
	 * @memberof OrderBoxLayoutDTO
	 */
	items: OrderBoxLayoutItemDTO[]
}
/**
 * Информация о товаре в коробке.
 * @export
 * @interface OrderBoxLayoutItemDTO
 */
export interface OrderBoxLayoutItemDTO {
	/**
	 * Идентификатор товара в заказе.  Он приходит в ответе на запрос [GET campaigns/{campaignId}/orders/{orderId}](../../reference/orders/getOrder.md) — параметр `id` в `items`.
	 * @type {number}
	 * @memberof OrderBoxLayoutItemDTO
	 */
	id: number
	/**
	 * Количество единиц товара в коробке.  Используйте это поле, если в коробке поедут целые товары, не разделенные на части. Не используйте это поле одновременно с `partialCount`.
	 * @type {number}
	 * @memberof OrderBoxLayoutItemDTO
	 */
	fullCount?: number
	/**
	 *
	 * @type {OrderBoxLayoutPartialCountDTO}
	 * @memberof OrderBoxLayoutItemDTO
	 */
	partialCount?: OrderBoxLayoutPartialCountDTO
	/**
	 * Переданные вами коды маркировки.
	 * @type {Array<BriefOrderItemInstanceDTO>}
	 * @memberof OrderBoxLayoutItemDTO
	 */
	instances?: BriefOrderItemInstanceDTO[] | null
}
/**
 * Информация о части товара в коробке.
 * @export
 * @interface OrderBoxLayoutPartialCountDTO
 */
export interface OrderBoxLayoutPartialCountDTO {
	/**
	 * Номер части, начиная с 1.
	 * @type {number}
	 * @memberof OrderBoxLayoutPartialCountDTO
	 */
	current: number
	/**
	 * На сколько всего частей разделен товар.
	 * @type {number}
	 * @memberof OrderBoxLayoutPartialCountDTO
	 */
	total: number
}
/**
 * Распределение товаров по коробкам.
 * @export
 * @interface OrderBoxesLayoutDTO
 */
export interface OrderBoxesLayoutDTO {
	/**
	 * Список коробок.
	 * @type {Array<EnrichedOrderBoxLayoutDTO>}
	 * @memberof OrderBoxesLayoutDTO
	 */
	boxes: EnrichedOrderBoxLayoutDTO[]
}
/**
 * Информация о покупателе.
 * @export
 * @interface OrderBusinessBuyerDTO
 */
export interface OrderBusinessBuyerDTO {
	/**
	 * ИНН.
	 * @type {string}
	 * @memberof OrderBusinessBuyerDTO
	 */
	inn?: string
	/**
	 * КПП.
	 * @type {string}
	 * @memberof OrderBusinessBuyerDTO
	 */
	kpp?: string
	/**
	 * Наименование юридического лица.
	 * @type {string}
	 * @memberof OrderBusinessBuyerDTO
	 */
	organizationName?: string
	/**
	 * Юридический адрес.
	 * @type {string}
	 * @memberof OrderBusinessBuyerDTO
	 */
	organizationJurAddress?: string
}
/**
 * Информация о документах.
 * @export
 * @interface OrderBusinessDocumentsDTO
 */
export interface OrderBusinessDocumentsDTO {
	/**
	 *
	 * @type {DocumentDTO}
	 * @memberof OrderBusinessDocumentsDTO
	 */
	upd?: DocumentDTO
	/**
	 *
	 * @type {DocumentDTO}
	 * @memberof OrderBusinessDocumentsDTO
	 */
	ukd?: DocumentDTO
	/**
	 *
	 * @type {DocumentDTO}
	 * @memberof OrderBusinessDocumentsDTO
	 */
	torgTwelve?: DocumentDTO
	/**
	 *
	 * @type {DocumentDTO}
	 * @memberof OrderBusinessDocumentsDTO
	 */
	sf?: DocumentDTO
	/**
	 *
	 * @type {DocumentDTO}
	 * @memberof OrderBusinessDocumentsDTO
	 */
	ksf?: DocumentDTO
}
/**
 * Информация о покупателе с базовыми полями.
 * @export
 * @interface OrderBuyerBasicInfoDTO
 */
export interface OrderBuyerBasicInfoDTO {
	/**
	 * Идентификатор покупателя.
	 * @type {string}
	 * @memberof OrderBuyerBasicInfoDTO
	 */
	id?: string
	/**
	 * Фамилия покупателя.
	 * @type {string}
	 * @memberof OrderBuyerBasicInfoDTO
	 */
	lastName?: string
	/**
	 * Имя покупателя.
	 * @type {string}
	 * @memberof OrderBuyerBasicInfoDTO
	 */
	firstName?: string
	/**
	 * Отчество покупателя.
	 * @type {string}
	 * @memberof OrderBuyerBasicInfoDTO
	 */
	middleName?: string
	/**
	 *
	 * @type {OrderBuyerType}
	 * @memberof OrderBuyerBasicInfoDTO
	 */
	type: OrderBuyerType
}

/**
 * Информация о покупателе.  Параметры `id`, `lastName`, `firstName` и `middleName` возвращаются, только если вы работаете по модели DBS.
 * @export
 * @interface OrderBuyerDTO
 */
export interface OrderBuyerDTO {
	/**
	 * Идентификатор покупателя.
	 * @type {string}
	 * @memberof OrderBuyerDTO
	 */
	id?: string
	/**
	 * Фамилия покупателя.
	 * @type {string}
	 * @memberof OrderBuyerDTO
	 */
	lastName?: string
	/**
	 * Имя покупателя.
	 * @type {string}
	 * @memberof OrderBuyerDTO
	 */
	firstName?: string
	/**
	 * Отчество покупателя.
	 * @type {string}
	 * @memberof OrderBuyerDTO
	 */
	middleName?: string
	/**
	 *
	 * @type {OrderBuyerType}
	 * @memberof OrderBuyerDTO
	 */
	type: OrderBuyerType
}

/**
 * Информация о покупателе и его номере телефона.
 * @export
 * @interface OrderBuyerInfoDTO
 */
export interface OrderBuyerInfoDTO {
	/**
	 * Идентификатор покупателя.
	 * @type {string}
	 * @memberof OrderBuyerInfoDTO
	 */
	id?: string
	/**
	 * Фамилия покупателя.
	 * @type {string}
	 * @memberof OrderBuyerInfoDTO
	 */
	lastName?: string
	/**
	 * Имя покупателя.
	 * @type {string}
	 * @memberof OrderBuyerInfoDTO
	 */
	firstName?: string
	/**
	 * Отчество покупателя.
	 * @type {string}
	 * @memberof OrderBuyerInfoDTO
	 */
	middleName?: string
	/**
	 *
	 * @type {OrderBuyerType}
	 * @memberof OrderBuyerInfoDTO
	 */
	type: OrderBuyerType
	/**
	 * Подменный номер телефона покупателя. Подробнее о таких номерах читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/orders/dbs/call#fake-number).  Формат номера: `+<код_страны><код_региона><номер_телефона>`.
	 * @type {string}
	 * @memberof OrderBuyerInfoDTO
	 */
	phone?: string
	/**
	 * Проверенный покупатель.  Если параметр `trusted` вернулся со значением `true`, Маркет уже проверил покупателя — не звоните ему. Обработайте заказ как обычно и передайте его курьеру или отвезите в ПВЗ.  При необходимости свяжитесь с покупателем в чате. [Как это сделать](../../step-by-step/chats.md)  Подробнее о звонках покупателю читайте [в Справке Маркета для продавцов](https://yandex.ru/support/marketplace/ru/orders/dbs/call).
	 * @type {boolean}
	 * @memberof OrderBuyerInfoDTO
	 */
	trusted?: boolean
}

/**
 * Тип покупателя:  * `PERSON` — физическое лицо.  * `BUSINESS` — организация.
 * @export
 * @enum {string}
 */

export const OrderBuyerType = {
	Person: 'PERSON',
	Business: 'BUSINESS',
} as const

export type OrderBuyerType =
	(typeof OrderBuyerType)[keyof typeof OrderBuyerType]

/**
 * Варианты причин, по которым заказ не может быть отменен.  * `ORDER_DELIVERED` — заказ уже доставлен. * `ORDER_IN_DELIVERY` — заказ уже у курьера.
 * @export
 * @enum {string}
 */

export const OrderCancellationReasonType = {
	OrderDelivered: 'ORDER_DELIVERED',
	OrderInDelivery: 'ORDER_IN_DELIVERY',
} as const

export type OrderCancellationReasonType =
	(typeof OrderCancellationReasonType)[keyof typeof OrderCancellationReasonType]

/**
 * Информация о курьере.
 * @export
 * @interface OrderCourierDTO
 */
export interface OrderCourierDTO {
	/**
	 * Полное имя курьера.
	 * @type {string}
	 * @memberof OrderCourierDTO
	 */
	fullName?: string
	/**
	 * Номер телефона курьера.
	 * @type {string}
	 * @memberof OrderCourierDTO
	 */
	phone?: string
	/**
	 * Добавочный номер телефона.
	 * @type {string}
	 * @memberof OrderCourierDTO
	 */
	phoneExtension?: string
	/**
	 * Номер транспортного средства.
	 * @type {string}
	 * @memberof OrderCourierDTO
	 */
	vehicleNumber?: string
	/**
	 * Описание машины. Например, модель и цвет.
	 * @type {string}
	 * @memberof OrderCourierDTO
	 */
	vehicleDescription?: string
}
/**
 * Заказ.
 * @export
 * @interface OrderDTO
 */
export interface OrderDTO {
	/**
	 * Идентификатор заказа.
	 * @type {number}
	 * @memberof OrderDTO
	 */
	id: number
	/**
	 *
	 * @type {OrderStatusType}
	 * @memberof OrderDTO
	 */
	status: OrderStatusType
	/**
	 *
	 * @type {OrderSubstatusType}
	 * @memberof OrderDTO
	 */
	substatus: OrderSubstatusType
	/**
	 *
	 * @type {string}
	 * @memberof OrderDTO
	 */
	creationDate: string
	/**
	 *
	 * @type {string}
	 * @memberof OrderDTO
	 */
	updatedAt?: string
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof OrderDTO
	 */
	currency: CurrencyType
	/**
	 * Платеж покупателя.
	 * @type {number}
	 * @memberof OrderDTO
	 */
	itemsTotal: number
	/**
	 * Стоимость доставки.
	 * @type {number}
	 * @memberof OrderDTO
	 */
	deliveryTotal: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Стоимость всех товаров в заказе в валюте покупателя после применения скидок и без учета стоимости доставки.
	 * @type {number}
	 * @memberof OrderDTO
	 * @deprecated
	 */
	buyerItemsTotal?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Стоимость всех товаров в заказе в валюте покупателя после применения скидок и с учетом стоимости доставки.
	 * @type {number}
	 * @memberof OrderDTO
	 * @deprecated
	 */
	buyerTotal?: number
	/**
	 * Стоимость всех товаров в заказе в валюте покупателя без учета стоимости доставки и до применения скидок по:  * акциям; * купонам; * промокодам.
	 * @type {number}
	 * @memberof OrderDTO
	 */
	buyerItemsTotalBeforeDiscount: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Стоимость всех товаров в заказе в валюте покупателя до применения скидок и с учетом стоимости доставки (`buyerItemsTotalBeforeDiscount` + стоимость доставки).
	 * @type {number}
	 * @memberof OrderDTO
	 * @deprecated
	 */
	buyerTotalBeforeDiscount?: number
	/**
	 *
	 * @type {OrderPaymentType}
	 * @memberof OrderDTO
	 */
	paymentType: OrderPaymentType
	/**
	 *
	 * @type {OrderPaymentMethodType}
	 * @memberof OrderDTO
	 */
	paymentMethod: OrderPaymentMethodType
	/**
	 * Тип заказа:  * `false` — настоящий заказ покупателя.  * `true` — [тестовый](../../concepts/sandbox.md) заказ Маркета.
	 * @type {boolean}
	 * @memberof OrderDTO
	 */
	fake: boolean
	/**
	 * Список товаров в заказе.
	 * @type {Array<OrderItemDTO>}
	 * @memberof OrderDTO
	 */
	items: OrderItemDTO[]
	/**
	 * Список субсидий по типам.
	 * @type {Array<OrderSubsidyDTO>}
	 * @memberof OrderDTO
	 */
	subsidies?: OrderSubsidyDTO[] | null
	/**
	 *
	 * @type {OrderDeliveryDTO}
	 * @memberof OrderDTO
	 */
	delivery: OrderDeliveryDTO
	/**
	 *
	 * @type {OrderBuyerDTO}
	 * @memberof OrderDTO
	 */
	buyer: OrderBuyerDTO
	/**
	 * Комментарий к заказу.
	 * @type {string}
	 * @memberof OrderDTO
	 */
	notes?: string
	/**
	 *
	 * @type {OrderTaxSystemType}
	 * @memberof OrderDTO
	 */
	taxSystem: OrderTaxSystemType
	/**
	 * **Только для модели DBS**  Запрошена ли отмена.
	 * @type {boolean}
	 * @memberof OrderDTO
	 */
	cancelRequested?: boolean
	/**
	 *
	 * @type {string}
	 * @memberof OrderDTO
	 */
	expiryDate?: string
}

/**
 * Адрес доставки.  Указывается, если `type=DELIVERY`, `type=POST` или `type=PICKUP` (адрес пункта выдачи).
 * @export
 * @interface OrderDeliveryAddressDTO
 */
export interface OrderDeliveryAddressDTO {
	/**
	 * Страна.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	country?: string
	/**
	 * Почтовый индекс.  Указывается, если выбрана доставка почтой (`delivery type=POST`).
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	postcode?: string
	/**
	 * Город или населенный пункт.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	city?: string
	/**
	 * Район.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	district?: string
	/**
	 * Станция метро.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	subway?: string
	/**
	 * Улица.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	street?: string
	/**
	 * Дом или владение.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	house?: string
	/**
	 * Корпус или строение.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	block?: string
	/**
	 * Подъезд.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	entrance?: string
	/**
	 * Код домофона.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	entryphone?: string
	/**
	 * Этаж.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	floor?: string
	/**
	 * Квартира или офис.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	apartment?: string
	/**
	 * Телефон получателя заказа.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	phone?: string
	/**
	 * Фамилия, имя и отчество получателя заказа.
	 * @type {string}
	 * @memberof OrderDeliveryAddressDTO
	 */
	recipient?: string
	/**
	 *
	 * @type {GpsDTO}
	 * @memberof OrderDeliveryAddressDTO
	 */
	gps?: GpsDTO
}
/**
 * Информация о доставке.
 * @export
 * @interface OrderDeliveryDTO
 */
export interface OrderDeliveryDTO {
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Идентификатор доставки, присвоенный магазином.  Указывается, только если магазин передал данный идентификатор в ответе на запрос методом `POST cart`.
	 * @type {string}
	 * @memberof OrderDeliveryDTO
	 * @deprecated
	 */
	id?: string
	/**
	 *
	 * @type {OrderDeliveryType}
	 * @memberof OrderDeliveryDTO
	 */
	type: OrderDeliveryType
	/**
	 * Наименование службы доставки.
	 * @type {string}
	 * @memberof OrderDeliveryDTO
	 */
	serviceName: string
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Стоимость доставки смотрите в параметре `deliveryTotal`.  {% endnote %}  Стоимость доставки в валюте заказа.
	 * @type {number}
	 * @memberof OrderDeliveryDTO
	 * @deprecated
	 */
	price?: number
	/**
	 *
	 * @type {OrderDeliveryPartnerType}
	 * @memberof OrderDeliveryDTO
	 */
	deliveryPartnerType: OrderDeliveryPartnerType
	/**
	 *
	 * @type {OrderCourierDTO}
	 * @memberof OrderDeliveryDTO
	 */
	courier?: OrderCourierDTO
	/**
	 *
	 * @type {OrderDeliveryDatesDTO}
	 * @memberof OrderDeliveryDTO
	 */
	dates: OrderDeliveryDatesDTO
	/**
	 *
	 * @type {RegionDTO}
	 * @memberof OrderDeliveryDTO
	 */
	region?: RegionDTO
	/**
	 *
	 * @type {OrderDeliveryAddressDTO}
	 * @memberof OrderDeliveryDTO
	 */
	address?: OrderDeliveryAddressDTO
	/**
	 *
	 * @type {OrderVatType}
	 * @memberof OrderDeliveryDTO
	 */
	vat?: OrderVatType
	/**
	 * Идентификатор службы доставки.
	 * @type {number}
	 * @memberof OrderDeliveryDTO
	 */
	deliveryServiceId: number
	/**
	 *
	 * @type {OrderLiftType}
	 * @memberof OrderDeliveryDTO
	 */
	liftType?: OrderLiftType
	/**
	 * Стоимость подъема на этаж.
	 * @type {number}
	 * @memberof OrderDeliveryDTO
	 */
	liftPrice?: number
	/**
	 * Идентификатор пункта самовывоза, присвоенный магазином.
	 * @type {string}
	 * @memberof OrderDeliveryDTO
	 */
	outletCode?: string
	/**
	 * Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof OrderDeliveryDTO
	 */
	outletStorageLimitDate?: string
	/**
	 *
	 * @type {OrderDeliveryDispatchType}
	 * @memberof OrderDeliveryDTO
	 */
	dispatchType?: OrderDeliveryDispatchType
	/**
	 * Информация для отслеживания перемещений посылки.
	 * @type {Array<OrderTrackDTO>}
	 * @memberof OrderDeliveryDTO
	 */
	tracks?: OrderTrackDTO[] | null
	/**
	 * Информация о посылках.
	 * @type {Array<OrderShipmentDTO>}
	 * @memberof OrderDeliveryDTO
	 */
	shipments?: OrderShipmentDTO[] | null
	/**
	 * Приблизительная ли дата доставки.
	 * @type {boolean}
	 * @memberof OrderDeliveryDTO
	 */
	estimated?: boolean
	/**
	 *
	 * @type {OrderDeliveryEacType}
	 * @memberof OrderDeliveryDTO
	 */
	eacType?: OrderDeliveryEacType
	/**
	 * Код подтверждения ЭАПП (для типа `MERCHANT_TO_COURIER`).
	 * @type {string}
	 * @memberof OrderDeliveryDTO
	 */
	eacCode?: string
}

/**
 * Информация о новой дате доставки заказа.
 * @export
 * @interface OrderDeliveryDateDTO
 */
export interface OrderDeliveryDateDTO {
	/**
	 * Новая дата доставки заказа.  Формат даты: `ГГГГ-ММ-ДД`.
	 * @type {string}
	 * @memberof OrderDeliveryDateDTO
	 */
	toDate: string
}
/**
 * Причина переноса доставки заказа. Возможные причины изменения даты:   - ```USER_MOVED_DELIVERY_DATES``` — покупатель попросил изменить дату или вы договорились привезти ему заказ раньше изначальной даты. Кроме этого указывается для подтверждения даты доставки товаров на заказ с долгой (31-60 дней) доставкой.   - ```PARTNER_MOVED_DELIVERY_DATES``` — магазин не может доставить заказ в срок.
 * @export
 * @enum {string}
 */

export const OrderDeliveryDateReasonType = {
	UserMovedDeliveryDates: 'USER_MOVED_DELIVERY_DATES',
	PartnerMovedDeliveryDates: 'PARTNER_MOVED_DELIVERY_DATES',
} as const

export type OrderDeliveryDateReasonType =
	(typeof OrderDeliveryDateReasonType)[keyof typeof OrderDeliveryDateReasonType]

/**
 * Диапазон дат доставки.
 * @export
 * @interface OrderDeliveryDatesDTO
 */
export interface OrderDeliveryDatesDTO {
	/**
	 * Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof OrderDeliveryDatesDTO
	 */
	fromDate: string
	/**
	 * Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof OrderDeliveryDatesDTO
	 */
	toDate?: string
	/**
	 * Начало интервала времени доставки.  Передается только совместно с параметром `type=DELIVERY`.  Формат времени: 24-часовой, `ЧЧ:ММ`. В качестве минут всегда должно быть указано `00` (исключение — `23:59`).  Минимальное значение: `00:00`.
	 * @type {string}
	 * @memberof OrderDeliveryDatesDTO
	 */
	fromTime?: string
	/**
	 * Конец интервала времени доставки.  Передается только совместно с параметром `type=DELIVERY`.  Формат времени: 24-часовой, `ЧЧ:ММ`. В качестве минут всегда должно быть указано `00` (исключение — `23:59`).  Максимальное значение: `23:59`.
	 * @type {string}
	 * @memberof OrderDeliveryDatesDTO
	 */
	toTime?: string
	/**
	 * Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof OrderDeliveryDatesDTO
	 */
	realDeliveryDate?: string
}
/**
 * Способ отгрузки:  * `BUYER` — доставка покупателю.  * `MARKET_BRANDED_OUTLET` — доставка в пункт выдачи заказов Маркета.  * `SHOP_OUTLET` — доставка в пункт выдачи заказов магазина.  * `UNKNOWN` — неизвестный тип.
 * @export
 * @enum {string}
 */

export const OrderDeliveryDispatchType = {
	Unknown: 'UNKNOWN',
	Buyer: 'BUYER',
	MarketBrandedOutlet: 'MARKET_BRANDED_OUTLET',
	ShopOutlet: 'SHOP_OUTLET',
} as const

export type OrderDeliveryDispatchType =
	(typeof OrderDeliveryDispatchType)[keyof typeof OrderDeliveryDispatchType]

/**
 * Тип кода подтверждения ЭАПП:  * `MERCHANT_TO_COURIER` — продавец передает код курьеру.  * `COURIER_TO_MERCHANT` — курьер передает код продавцу.  * `CHECKING_BY_MERCHANT` — продавец проверяет код на своей стороне.
 * @export
 * @enum {string}
 */

export const OrderDeliveryEacType = {
	MerchantToCourier: 'MERCHANT_TO_COURIER',
	CourierToMerchant: 'COURIER_TO_MERCHANT',
	CheckingByMerchant: 'CHECKING_BY_MERCHANT',
} as const

export type OrderDeliveryEacType =
	(typeof OrderDeliveryEacType)[keyof typeof OrderDeliveryEacType]

/**
 * Тип сотрудничества со службой доставки в рамках конкретного заказа:  * `SHOP` — магазин работает со службой доставки напрямую или доставляет заказы самостоятельно.  * `YANDEX_MARKET` — магазин работает со службой доставки через Маркет.  * `UNKNOWN` — неизвестный тип.
 * @export
 * @enum {string}
 */

export const OrderDeliveryPartnerType = {
	Shop: 'SHOP',
	YandexMarket: 'YANDEX_MARKET',
	Unknown: 'UNKNOWN',
} as const

export type OrderDeliveryPartnerType =
	(typeof OrderDeliveryPartnerType)[keyof typeof OrderDeliveryPartnerType]

/**
 * Способ доставки заказа:  * `DELIVERY` — курьерская доставка.  * `PICKUP` — самовывоз.  * `POST` — почта.  * `DIGITAL` — для цифровых товаров.  * `UNKNOWN` — неизвестный тип.
 * @export
 * @enum {string}
 */

export const OrderDeliveryType = {
	Delivery: 'DELIVERY',
	Pickup: 'PICKUP',
	Post: 'POST',
	Digital: 'DIGITAL',
	Unknown: 'UNKNOWN',
} as const

export type OrderDeliveryType =
	(typeof OrderDeliveryType)[keyof typeof OrderDeliveryType]

/**
 * Цифровой товар.
 * @export
 * @interface OrderDigitalItemDTO
 */
export interface OrderDigitalItemDTO {
	/**
	 * Идентификатор товара в заказе.  Он приходит в ответе на запрос [GET campaigns/{campaignId}/orders/{orderId}](../../reference/orders/getOrder.md) — параметр `id` в `items`.
	 * @type {number}
	 * @memberof OrderDigitalItemDTO
	 */
	id: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `codes`. Совместное использование обоих параметров приведет к ошибке.  {% endnote %}  Сам ключ.
	 * @type {string}
	 * @memberof OrderDigitalItemDTO
	 * @deprecated
	 */
	code?: string
	/**
	 * Ключи, относящиеся к товару.
	 * @type {Set<string>}
	 * @memberof OrderDigitalItemDTO
	 */
	codes?: Set<string> | null
	/**
	 * Инструкция по активации.
	 * @type {string}
	 * @memberof OrderDigitalItemDTO
	 */
	slip: string
	/**
	 * Дата, до которой нужно активировать ключи. Если ключи действуют бессрочно, укажите любую дату в отдаленном будущем.  Формат даты: `ГГГГ-ММ-ДД`.
	 * @type {string}
	 * @memberof OrderDigitalItemDTO
	 */
	activate_till: string
}
/**
 * Статус документа:  * `READY` — готов. * `NOT_READY` — не готов.
 * @export
 * @enum {string}
 */

export const OrderDocumentStatusType = {
	Ready: 'READY',
	NotReady: 'NOT_READY',
} as const

export type OrderDocumentStatusType =
	(typeof OrderDocumentStatusType)[keyof typeof OrderDocumentStatusType]

/**
 * Список товаров в заказе.
 * @export
 * @interface OrderItemDTO
 */
export interface OrderItemDTO {
	/**
	 * Идентификатор товара в заказе.  Позволяет идентифицировать товар в рамках данного заказа.
	 * @type {number}
	 * @memberof OrderItemDTO
	 */
	id: number
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof OrderItemDTO
	 */
	offerId: string
	/**
	 * Название товара.
	 * @type {string}
	 * @memberof OrderItemDTO
	 */
	offerName: string
	/**
	 * Цена на товар в валюте заказа без учета вознаграждения партнеру за скидки по промокодам, купонам и акциям (параметр `subsidies`).
	 * @type {number}
	 * @memberof OrderItemDTO
	 */
	price: number
	/**
	 * Цена на товар в валюте покупателя. В цене уже учтены скидки по:  * акциям; * купонам; * промокодам.
	 * @type {number}
	 * @memberof OrderItemDTO
	 */
	buyerPrice: number
	/**
	 * Стоимость товара в валюте покупателя до применения скидок по:  * акциям; * купонам; * промокодам.
	 * @type {number}
	 * @memberof OrderItemDTO
	 */
	buyerPriceBeforeDiscount: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Стоимость товара в валюте магазина до применения скидок.
	 * @type {number}
	 * @memberof OrderItemDTO
	 * @deprecated
	 */
	priceBeforeDiscount?: number
	/**
	 * Количество единиц товара.
	 * @type {number}
	 * @memberof OrderItemDTO
	 */
	count: number
	/**
	 *
	 * @type {OrderVatType}
	 * @memberof OrderItemDTO
	 */
	vat: OrderVatType
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof OrderItemDTO
	 */
	shopSku?: string
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `subsidies`.  {% endnote %}  Общее вознаграждение партнеру за DBS-доставку и все скидки на товар:  * по промокодам; * по купонам; * по баллам Плюса; * по акциям.
	 * @type {number}
	 * @memberof OrderItemDTO
	 * @deprecated
	 */
	subsidy?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Идентификатор склада в системе партнера, на который сформирован заказ.
	 * @type {string}
	 * @memberof OrderItemDTO
	 * @deprecated
	 */
	partnerWarehouseId?: string
	/**
	 * Информация о вознаграждениях партнеру за скидки на товар по промокодам, купонам и акциям.
	 * @type {Array<OrderItemPromoDTO>}
	 * @memberof OrderItemDTO
	 */
	promos?: OrderItemPromoDTO[] | null
	/**
	 * Информация о маркировке единиц товара.  Возвращаются данные для маркировки, переданные в запросе [PUT campaigns/{campaignId}/orders/{orderId}/identifiers](../../reference/orders/provideOrderItemIdentifiers.md).  Если магазин еще не передавал коды для этого заказа, `instances` отсутствует.
	 * @type {Array<OrderItemInstanceDTO>}
	 * @memberof OrderItemDTO
	 */
	instances?: OrderItemInstanceDTO[] | null
	/**
	 * Информация о невыкупленных или возвращенных товарах в заказе.
	 * @type {Array<OrderItemDetailDTO>}
	 * @memberof OrderItemDTO
	 */
	details?: OrderItemDetailDTO[] | null
	/**
	 * Список субсидий по типам.
	 * @type {Array<OrderItemSubsidyDTO>}
	 * @memberof OrderItemDTO
	 */
	subsidies?: OrderItemSubsidyDTO[] | null
	/**
	 * Список необходимых маркировок товара.
	 * @type {Array<OrderItemInstanceType>}
	 * @memberof OrderItemDTO
	 */
	requiredInstanceTypes?: OrderItemInstanceType[] | null
	/**
	 * Признаки товара.
	 * @type {Array<OrderItemTagType>}
	 * @memberof OrderItemDTO
	 */
	tags?: OrderItemTagType[] | null
}

/**
 * Детали по товару в заказе.
 * @export
 * @interface OrderItemDetailDTO
 */
export interface OrderItemDetailDTO {
	/**
	 * Количество единиц товара.
	 * @type {number}
	 * @memberof OrderItemDetailDTO
	 */
	itemCount: number
	/**
	 *
	 * @type {OrderItemStatusType}
	 * @memberof OrderItemDetailDTO
	 */
	itemStatus: OrderItemStatusType
	/**
	 * Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof OrderItemDetailDTO
	 */
	updateDate: string
}

/**
 * Переданные вами для данной позиции коды маркировки или УИНы. Коды «Честного знака» возвращаются в двух вариантах — с криптохвостом и без.
 * @export
 * @interface OrderItemInstanceDTO
 */
export interface OrderItemInstanceDTO {
	/**
	 * Код идентификации единицы товара [в системе «Честный ЗНАК»](https://честныйзнак.рф/) без криптохвоста.
	 * @type {string}
	 * @memberof OrderItemInstanceDTO
	 */
	cis?: string
	/**
	 * Код идентификации единицы товара [в системе «Честный ЗНАК»](https://честныйзнак.рф/) с криптохвостом.
	 * @type {string}
	 * @memberof OrderItemInstanceDTO
	 */
	cisFull?: string
	/**
	 * УИН ювелирного изделия (16-значный код) Производитель получает УИН, когда регистрирует изделие в системе контроля за оборотом драгоценных металлов и камней — ГИИС ДМДК.
	 * @type {string}
	 * @memberof OrderItemInstanceDTO
	 */
	uin?: string
	/**
	 * Регистрационный номер партии товара.  Представляет собой строку из четырех чисел, разделенных косой чертой: ХХХХХХХХ/ХХХХХХ/ХХХХХХХ/ХХХ.  Первая часть — код таможни, которая зарегистрировала декларацию на партию товара. Далее — дата, номер декларации и номер маркированного товара в декларации.
	 * @type {string}
	 * @memberof OrderItemInstanceDTO
	 */
	rnpt?: string
	/**
	 * Грузовая таможенная декларация.  Представляет собой строку из трех чисел, разделенных косой чертой: ХХХХХХХХ/ХХХХХХ/ХХХХХХХ.  Первая часть — код таможни, которая зарегистрировала декларацию на ввезенные товары. Далее — дата и номер декларации.
	 * @type {string}
	 * @memberof OrderItemInstanceDTO
	 */
	gtd?: string
}
/**
 * Позиция в корзине, требующая маркировки.
 * @export
 * @interface OrderItemInstanceModificationDTO
 */
export interface OrderItemInstanceModificationDTO {
	/**
	 * Идентификатор товара в заказе.  Он приходит в ответе на запрос [GET campaigns/{campaignId}/orders/{orderId}](../../reference/orders/getOrder.md) — параметр `id` в `items`.
	 * @type {number}
	 * @memberof OrderItemInstanceModificationDTO
	 */
	id: number
	/**
	 * Список кодов маркировки единиц товара.
	 * @type {Array<BriefOrderItemInstanceDTO>}
	 * @memberof OrderItemInstanceModificationDTO
	 */
	instances: BriefOrderItemInstanceDTO[]
}
/**
 * Вид маркировки товара:  * `CIS` — КИЗ, идентификатор единицы товара [в системе «Честный ЗНАК»](https://честныйзнак.рф/). Обязателен для заполнения.  * `CIS_OPTIONAL` — КИЗ, идентификатор единицы товара [в системе «Честный ЗНАК»](https://честныйзнак.рф/). Необязателен для заполнения, но в ближайшее время потребуется его передача.  * `UIN` — УИН, уникальный идентификационный номер.  * `RNPT` — РНПТ, регистрационный номер партии товара.  * `GTD` — номер ГТД, грузовой таможенной декларации.
 * @export
 * @enum {string}
 */

export const OrderItemInstanceType = {
	Cis: 'CIS',
	CisOptional: 'CIS_OPTIONAL',
	Uin: 'UIN',
	Rnpt: 'RNPT',
	Gtd: 'GTD',
} as const

export type OrderItemInstanceType =
	(typeof OrderItemInstanceType)[keyof typeof OrderItemInstanceType]

/**
 * Список товаров в заказе.  Если магазин не передал информацию о товаре во входных данных, он будет удален из заказа.  Обязательный параметр.
 * @export
 * @interface OrderItemModificationDTO
 */
export interface OrderItemModificationDTO {
	/**
	 * Идентификатор товара в рамках заказа.  Получить идентификатор можно с помощью ресурсов [GET campaigns/{campaignId}/orders](../../reference/orders/getOrders.md) или [GET campaigns/{campaignId}/orders/{orderId}](../../reference/orders/getOrder.md).  Обязательный параметр.
	 * @type {number}
	 * @memberof OrderItemModificationDTO
	 */
	id: number
	/**
	 * Новое количество товара.
	 * @type {number}
	 * @memberof OrderItemModificationDTO
	 */
	count: number
	/**
	 * Информация о маркировке единиц товара.  Передавайте в запросе все единицы товара, который подлежит маркировке.  Обязательный параметр, если в заказе есть товары, подлежащие маркировке [в системе «Честный ЗНАК»](https://честныйзнак.рф/).
	 * @type {Array<BriefOrderItemInstanceDTO>}
	 * @memberof OrderItemModificationDTO
	 */
	instances?: BriefOrderItemInstanceDTO[] | null
}
/**
 * Информация о вознаграждениях партнеру за скидки на товар по промокодам, купонам и акциям.
 * @export
 * @interface OrderItemPromoDTO
 */
export interface OrderItemPromoDTO {
	/**
	 *
	 * @type {OrderPromoType}
	 * @memberof OrderItemPromoDTO
	 */
	type: OrderPromoType
	/**
	 * Размер пользовательской скидки в валюте покупателя.
	 * @type {number}
	 * @memberof OrderItemPromoDTO
	 */
	discount?: number
	/**
	 * Вознаграждение партнеру от Маркета за товар, проданный в рамках акции.
	 * @type {number}
	 * @memberof OrderItemPromoDTO
	 */
	subsidy: number
	/**
	 * Идентификатор акции поставщика.
	 * @type {string}
	 * @memberof OrderItemPromoDTO
	 */
	shopPromoId?: string
	/**
	 * Идентификатор акции в рамках соглашения на оказание услуг по продвижению сервиса между Маркетом и партнером.  Параметр передается, только если параметр `type=MARKET_DEAL`.
	 * @type {string}
	 * @memberof OrderItemPromoDTO
	 */
	marketPromoId?: string
}

/**
 * Возвращенный или невыкупленный товар:  * `REJECTED` — невыкупленный.  * `RETURNED` — возвращенный.
 * @export
 * @enum {string}
 */

export const OrderItemStatusType = {
	Rejected: 'REJECTED',
	Returned: 'RETURNED',
} as const

export type OrderItemStatusType =
	(typeof OrderItemStatusType)[keyof typeof OrderItemStatusType]

/**
 * Общее вознаграждение партнеру за все скидки на товар:  * по промокодам, купонам и акциям; * по баллам Плюса.
 * @export
 * @interface OrderItemSubsidyDTO
 */
export interface OrderItemSubsidyDTO {
	/**
	 *
	 * @type {OrderItemSubsidyType}
	 * @memberof OrderItemSubsidyDTO
	 */
	type: OrderItemSubsidyType
	/**
	 * Сумма субсидии.
	 * @type {number}
	 * @memberof OrderItemSubsidyDTO
	 */
	amount: number
}

/**
 * Тип субсидии:  * `YANDEX_CASHBACK` — скидка по подписке Яндекс Плюс.  * `SUBSIDY` — скидка Маркета (по акциям, промокодам, купонам и т. д.).
 * @export
 * @enum {string}
 */

export const OrderItemSubsidyType = {
	YandexCashback: 'YANDEX_CASHBACK',
	Subsidy: 'SUBSIDY',
} as const

export type OrderItemSubsidyType =
	(typeof OrderItemSubsidyType)[keyof typeof OrderItemSubsidyType]

/**
 * Признак товара:  * `ULTIMA` — премиум-товар. * `SAFE_TAG` — товар с [защитной меткой](*safe-tag). * `TURBO` — товар, который быстро раскупают.
 * @export
 * @enum {string}
 */

export const OrderItemTagType = {
	Ultima: 'ULTIMA',
	SafeTag: 'SAFE_TAG',
	Turbo: 'TURBO',
} as const

export type OrderItemTagType =
	(typeof OrderItemTagType)[keyof typeof OrderItemTagType]

/**
 * Причина, почему обновился состав заказа:  * `PARTNER_REQUESTED_REMOVE` — магазин удалил товар. * `USER_REQUESTED_REMOVE` — покупатель попросил удалить товар.
 * @export
 * @enum {string}
 */

export const OrderItemsModificationRequestReasonType = {
	PartnerRequestedRemove: 'PARTNER_REQUESTED_REMOVE',
	UserRequestedRemove: 'USER_REQUESTED_REMOVE',
} as const

export type OrderItemsModificationRequestReasonType =
	(typeof OrderItemsModificationRequestReasonType)[keyof typeof OrderItemsModificationRequestReasonType]

/**
 * Краткие сведения о промаркированных товарах. Параметр возвращается, если ответ `OK`.
 * @export
 * @interface OrderItemsModificationResultDTO
 */
export interface OrderItemsModificationResultDTO {
	/**
	 * Список позиций в заказе, подлежащих маркировке.
	 * @type {Array<BriefOrderItemDTO>}
	 * @memberof OrderItemsModificationResultDTO
	 */
	items: BriefOrderItemDTO[]
}
/**
 * Данные для печати ярлыка.
 * @export
 * @interface OrderLabelDTO
 */
export interface OrderLabelDTO {
	/**
	 * Идентификатор заказа.
	 * @type {number}
	 * @memberof OrderLabelDTO
	 */
	orderId: number
	/**
	 * Количество коробок в заказе.
	 * @type {number}
	 * @memberof OrderLabelDTO
	 */
	placesNumber: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  URL файла с ярлыками‑наклейками на все коробки в заказе.  Соответствует URL, по которому выполняется запрос [GET campaigns/{campaignId}/orders/{orderId}/delivery/labels](../../reference/orders/generateOrderLabels.md).
	 * @type {string}
	 * @memberof OrderLabelDTO
	 * @deprecated
	 */
	url: string
	/**
	 * Информация на ярлыке.
	 * @type {Array<ParcelBoxLabelDTO>}
	 * @memberof OrderLabelDTO
	 */
	parcelBoxLabels: ParcelBoxLabelDTO[]
}
/**
 * Тип подъема заказа на этаж:  * `NOT_NEEDED` — не требуется.  * `MANUAL` — ручной.  * `ELEVATOR` — лифт.  * `CARGO_ELEVATOR` — грузовой лифт.  * `FREE` — любой из перечисленных выше, если включена опция бесплатного подъема.  * `UNKNOWN` — неизвестный тип.
 * @export
 * @enum {string}
 */

export const OrderLiftType = {
	NotNeeded: 'NOT_NEEDED',
	Manual: 'MANUAL',
	Elevator: 'ELEVATOR',
	CargoElevator: 'CARGO_ELEVATOR',
	Free: 'FREE',
	Unknown: 'UNKNOWN',
} as const

export type OrderLiftType = (typeof OrderLiftType)[keyof typeof OrderLiftType]

/**
 * Информация о грузоместе.
 * @export
 * @interface OrderParcelBoxDTO
 */
export interface OrderParcelBoxDTO {
	/**
	 * Идентификатор грузоместа.
	 * @type {number}
	 * @memberof OrderParcelBoxDTO
	 */
	id: number
	/**
	 * Идентификатор грузового места в информационной системе магазина.
	 * @type {string}
	 * @memberof OrderParcelBoxDTO
	 */
	fulfilmentId: string
}
/**
 * Способ оплаты заказа:  * Значения, если выбрана оплата при оформлении заказа (`\"paymentType\": \"PREPAID\"`):    * `YANDEX` — банковской картой.    * `APPLE_PAY` — Apple Pay.    * `GOOGLE_PAY` — Google Pay.    * `CREDIT` — в кредит.    * `TINKOFF_CREDIT` — в кредит в Тинькофф Банке.    * `TINKOFF_INSTALLMENTS` — рассрочка в Тинькофф Банке.    * `EXTERNAL_CERTIFICATE` — подарочным сертификатом (например, из приложения «Сбербанк Онлайн»).    * `SBP` — через систему быстрых платежей.    * `B2B_ACCOUNT_PREPAYMENT` — заказ оплачивает организация.   * Значения, если выбрана оплата при получении заказа (`\"paymentType\": \"POSTPAID\"`):    * `CARD_ON_DELIVERY` — банковской картой.    * `BOUND_CARD_ON_DELIVERY` — привязанной картой при получении.    * `CASH_ON_DELIVERY` — наличными.    * `B2B_ACCOUNT_POSTPAYMENT` — заказ оплачивает организация после доставки.  * `UNKNOWN` — неизвестный тип.  Значение по умолчанию: `CASH_ON_DELIVERY`.
 * @export
 * @enum {string}
 */

export const OrderPaymentMethodType = {
	CashOnDelivery: 'CASH_ON_DELIVERY',
	CardOnDelivery: 'CARD_ON_DELIVERY',
	BoundCardOnDelivery: 'BOUND_CARD_ON_DELIVERY',
	Yandex: 'YANDEX',
	ApplePay: 'APPLE_PAY',
	ExternalCertificate: 'EXTERNAL_CERTIFICATE',
	Credit: 'CREDIT',
	GooglePay: 'GOOGLE_PAY',
	TinkoffCredit: 'TINKOFF_CREDIT',
	Sbp: 'SBP',
	TinkoffInstallments: 'TINKOFF_INSTALLMENTS',
	B2BAccountPrepayment: 'B2B_ACCOUNT_PREPAYMENT',
	B2BAccountPostpayment: 'B2B_ACCOUNT_POSTPAYMENT',
	Unknown: 'UNKNOWN',
} as const

export type OrderPaymentMethodType =
	(typeof OrderPaymentMethodType)[keyof typeof OrderPaymentMethodType]

/**
 * Тип оплаты заказа:  * `PREPAID` — оплата при оформлении заказа.  * `POSTPAID` — оплата при получении заказа.  * `UNKNOWN` — неизвестный тип.  Если параметр отсутствует, заказ будет оплачен при получении.
 * @export
 * @enum {string}
 */

export const OrderPaymentType = {
	Prepaid: 'PREPAID',
	Postpaid: 'POSTPAID',
	Unknown: 'UNKNOWN',
} as const

export type OrderPaymentType =
	(typeof OrderPaymentType)[keyof typeof OrderPaymentType]

/**
 * Тип скидки:  * `DIRECT_DISCOUNT` — прямая скидка, которую устанавливает продавец или Маркет.  * `BLUE_SET` — комплекты.  * `BLUE_FLASH` — флеш-акция.  * `MARKET_COUPON` — скидка по промокоду Маркета.  * `MARKET_PROMOCODE` — скидка по промокоду магазина.  * `MARKET_BLUE` — скидка на Маркете.  * `YANDEX_PLUS` — бесплатная доставка с подпиской Яндекс Плюс.  * `YANDEX_EMPLOYEE` — бесплатная доставка по определенным адресам.  * `LIMITED_FREE_DELIVERY_PROMO` — бесплатная доставка по ограниченному предложению.  * `FREE_DELIVERY_THRESHOLD` — бесплатная доставка при достижении определенной суммы заказа.  * `MULTICART_DISCOUNT` — скидка за то, что оформлена мультикорзина.  * `FREE_DELIVERY_FOR_LDI` — бесплатная доставка за то, что один из товаров крупногабаритный.  * `FREE_DELIVERY_FOR_LSC` — бесплатная доставка за то, что одна из корзин в мультикорзине крупногабаритная.  * `FREE_PICKUP` — бесплатная доставка в пункт выдачи заказов.  * `CHEAPEST_AS_GIFT` — самый дешевый товар в подарок.  * `CASHBACK` — кешбэк.  * `SUPPLIER_MULTICART_DISCOUNT` — скидка за доставку.  * `SPREAD_DISCOUNT_COUNT` — скидка за количество одинаковых товаров.  * `SPREAD_DISCOUNT_RECEIPT` — скидка от суммы чека.  * `ANNOUNCEMENT_PROMO` — информационная акция, скидка не применяется к товарам.  * `DISCOUNT_BY_PAYMENT_TYPE` — прямая скидка при оплате картой Плюса.  * `PERCENT_DISCOUNT` — прямая скидка в процентах.  * `DCO_EXTRA_DISCOUNT` — дополнительная скидка, необходимая для расчета субсидии от Маркета.  * `EMPTY_PROMO` — скрытые промокоды.  * `BLOCKING_PROMO` — блокирующее промо.  * `UNKNOWN` — неизвестный тип.  Устаревшие типы:  * `GENERIC_BUNDLE`.  * `MARKET_DEAL`.  * `MARKET_PRIME`.  * `MARKET_COIN`.  * `BERU_PLUS`.  * `PRICE_DROP_AS_YOU_SHOP`.  * `SECRET_SALE`.
 * @export
 * @enum {string}
 */

export const OrderPromoType = {
	DirectDiscount: 'DIRECT_DISCOUNT',
	BlueSet: 'BLUE_SET',
	BlueFlash: 'BLUE_FLASH',
	GenericBundle: 'GENERIC_BUNDLE',
	MarketCoupon: 'MARKET_COUPON',
	MarketPromocode: 'MARKET_PROMOCODE',
	MarketDeal: 'MARKET_DEAL',
	MarketBlue: 'MARKET_BLUE',
	MarketPrime: 'MARKET_PRIME',
	YandexPlus: 'YANDEX_PLUS',
	BeruPlus: 'BERU_PLUS',
	MarketCoin: 'MARKET_COIN',
	YandexEmployee: 'YANDEX_EMPLOYEE',
	LimitedFreeDeliveryPromo: 'LIMITED_FREE_DELIVERY_PROMO',
	FreeDeliveryThreshold: 'FREE_DELIVERY_THRESHOLD',
	MulticartDiscount: 'MULTICART_DISCOUNT',
	PriceDropAsYouShop: 'PRICE_DROP_AS_YOU_SHOP',
	FreeDeliveryForLdi: 'FREE_DELIVERY_FOR_LDI',
	FreeDeliveryForLsc: 'FREE_DELIVERY_FOR_LSC',
	SecretSale: 'SECRET_SALE',
	FreePickup: 'FREE_PICKUP',
	CheapestAsGift: 'CHEAPEST_AS_GIFT',
	Cashback: 'CASHBACK',
	SupplierMulticartDiscount: 'SUPPLIER_MULTICART_DISCOUNT',
	SpreadDiscountCount: 'SPREAD_DISCOUNT_COUNT',
	SpreadDiscountReceipt: 'SPREAD_DISCOUNT_RECEIPT',
	AnnouncementPromo: 'ANNOUNCEMENT_PROMO',
	DiscountByPaymentType: 'DISCOUNT_BY_PAYMENT_TYPE',
	PercentDiscount: 'PERCENT_DISCOUNT',
	DcoExtraDiscount: 'DCO_EXTRA_DISCOUNT',
	EmptyPromo: 'EMPTY_PROMO',
	BlockingPromo: 'BLOCKING_PROMO',
	Unknown: 'UNKNOWN',
} as const

export type OrderPromoType =
	(typeof OrderPromoType)[keyof typeof OrderPromoType]

/**
 * Список посылок.  В параметре может указываться несколько посылок.
 * @export
 * @interface OrderShipmentDTO
 */
export interface OrderShipmentDTO {
	/**
	 * Идентификатор посылки, присвоенный Маркетом.
	 * @type {number}
	 * @memberof OrderShipmentDTO
	 */
	id?: number
	/**
	 * Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof OrderShipmentDTO
	 */
	shipmentDate?: string
	/**
	 * **Только для модели Экспресс**  Время, к которому магазин должен упаковать заказ и перевести его в статус `READY_TO_SHIP`. После смены статуса за заказом приедет курьер.  Поле может появиться не сразу. Запрашивайте информацию о заказе в течении 5–10 минут, пока оно не вернется.  Формат времени: 24-часовой, `ЧЧ:ММ`.  Если заказ сделан организацией, параметр не возвращается до согласования даты доставки.
	 * @type {string}
	 * @memberof OrderShipmentDTO
	 */
	shipmentTime?: string
	/**
	 * **Только для модели DBS**  Информация для отслеживания перемещений посылки.
	 * @type {Array<OrderTrackDTO>}
	 * @memberof OrderShipmentDTO
	 */
	tracks?: OrderTrackDTO[] | null
	/**
	 * Список грузовых мест.
	 * @type {Array<OrderParcelBoxDTO>}
	 * @memberof OrderShipmentDTO
	 */
	boxes?: OrderParcelBoxDTO[] | null
}
/**
 * Информация по заказу.
 * @export
 * @interface OrderStateDTO
 */
export interface OrderStateDTO {
	/**
	 * Идентификатор заказа.
	 * @type {number}
	 * @memberof OrderStateDTO
	 */
	id: number
	/**
	 *
	 * @type {OrderStatusType}
	 * @memberof OrderStateDTO
	 */
	status: OrderStatusType
	/**
	 *
	 * @type {OrderSubstatusType}
	 * @memberof OrderStateDTO
	 */
	substatus?: OrderSubstatusType
}

/**
 * Текущий статус заказа:  * `CANCELLED_BEFORE_PROCESSING` — заказ отменен до начала его обработки.  * `CANCELLED_IN_DELIVERY` — заказ отменен во время его доставки.  * `CANCELLED_IN_PROCESSING` — заказ отменен во время его обработки.  * `DELIVERY` — заказ передан службе доставки.  * `DELIVERED` — заказ доставлен.  * `PARTIALLY_DELIVERED` — заказ частично доставлен.  * `PARTIALLY_RETURNED` — заказ частично возвращен покупателем.  * `PENDING` — заказ ожидает подтверждения.  * `PICKUP` — заказ доставлен в пункт выдачи.  * `PROCESSING` — заказ в обработке.  * `RESERVED` — товар зарезервирован на складе.  * `RETURNED` — заказ полностью возвращен покупателем.  * `UNKNOWN` — неизвестный статус заказа.  * `UNPAID` — заказ от юридического лица ожидает оплаты.  * `LOST` — заказ утерян.
 * @export
 * @enum {string}
 */

export const OrderStatsStatusType = {
	CancelledBeforeProcessing: 'CANCELLED_BEFORE_PROCESSING',
	CancelledInDelivery: 'CANCELLED_IN_DELIVERY',
	CancelledInProcessing: 'CANCELLED_IN_PROCESSING',
	Delivery: 'DELIVERY',
	Delivered: 'DELIVERED',
	PartiallyDelivered: 'PARTIALLY_DELIVERED',
	PartiallyReturned: 'PARTIALLY_RETURNED',
	Pending: 'PENDING',
	Pickup: 'PICKUP',
	Processing: 'PROCESSING',
	Reserved: 'RESERVED',
	Returned: 'RETURNED',
	Unknown: 'UNKNOWN',
	Unpaid: 'UNPAID',
	Lost: 'LOST',
} as const

export type OrderStatsStatusType =
	(typeof OrderStatsStatusType)[keyof typeof OrderStatsStatusType]

/**
 * Заказ.
 * @export
 * @interface OrderStatusChangeDTO
 */
export interface OrderStatusChangeDTO {
	/**
	 *
	 * @type {OrderStatusType}
	 * @memberof OrderStatusChangeDTO
	 */
	status: OrderStatusType
	/**
	 *
	 * @type {OrderSubstatusType}
	 * @memberof OrderStatusChangeDTO
	 */
	substatus?: OrderSubstatusType
	/**
	 *
	 * @type {OrderStatusChangeDeliveryDTO}
	 * @memberof OrderStatusChangeDTO
	 */
	delivery?: OrderStatusChangeDeliveryDTO
}

/**
 * Информация о доставке.
 * @export
 * @interface OrderStatusChangeDeliveryDTO
 */
export interface OrderStatusChangeDeliveryDTO {
	/**
	 *
	 * @type {OrderStatusChangeDeliveryDatesDTO}
	 * @memberof OrderStatusChangeDeliveryDTO
	 */
	dates?: OrderStatusChangeDeliveryDatesDTO
}
/**
 * Диапазон дат доставки.
 * @export
 * @interface OrderStatusChangeDeliveryDatesDTO
 */
export interface OrderStatusChangeDeliveryDatesDTO {
	/**
	 * **Только для модели DBS**  Фактическая дата доставки. <br><br> Когда передавать параметр `realDeliveryDate`:  * Не передавайте параметр, если:   * переводите заказ в любой статус, кроме `PICKUP` или `DELIVERED`;   * меняете статус заказа на `PICKUP` или `DELIVERED` в день доставки — будет указана дата выполнения запроса. * Передавайте дату доставки, если переводите заказ в статус `PICKUP` или `DELIVERED` не в день доставки. Нельзя указывать дату доставки в будущем.    {% note warning \"Передача статуса после установленного срока снижает индекс качества\" %}    О сроках читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/quality/tech#dbs).    {% endnote %}
	 * @type {string}
	 * @memberof OrderStatusChangeDeliveryDatesDTO
	 */
	realDeliveryDate?: string
}
/**
 * Статус заказа:  * `PLACING` — оформляется, подготовка к резервированию.  * `RESERVED` — зарезервирован, но недооформлен.  * `UNPAID` — оформлен, но еще не оплачен (если выбрана оплата при оформлении).  * `PROCESSING` — находится в обработке.  * `DELIVERY` — передан в службу доставки.  * `PICKUP` — доставлен в пункт самовывоза.  * `DELIVERED` — получен покупателем.  * `CANCELLED` — отменен.  * `PENDING` — ожидает обработки со стороны продавца.  * `PARTIALLY_RETURNED` — возвращен частично.  * `RETURNED` — возвращен полностью.  * `UNKNOWN` — неизвестный статус.  Также могут возвращаться другие значения. Обрабатывать их не требуется.
 * @export
 * @enum {string}
 */

export const OrderStatusType = {
	Placing: 'PLACING',
	Reserved: 'RESERVED',
	Unpaid: 'UNPAID',
	Processing: 'PROCESSING',
	Delivery: 'DELIVERY',
	Pickup: 'PICKUP',
	Delivered: 'DELIVERED',
	Cancelled: 'CANCELLED',
	Pending: 'PENDING',
	PartiallyReturned: 'PARTIALLY_RETURNED',
	Returned: 'RETURNED',
	Unknown: 'UNKNOWN',
} as const

export type OrderStatusType =
	(typeof OrderStatusType)[keyof typeof OrderStatusType]

/**
 * Общее вознаграждение партнеру за DBS-доставку и все скидки на товар:  * по промокодам, купонам и акциям; * по баллам Плюса; * по доставке (DBS).
 * @export
 * @interface OrderSubsidyDTO
 */
export interface OrderSubsidyDTO {
	/**
	 *
	 * @type {OrderSubsidyType}
	 * @memberof OrderSubsidyDTO
	 */
	type: OrderSubsidyType
	/**
	 * Сумма субсидии.
	 * @type {number}
	 * @memberof OrderSubsidyDTO
	 */
	amount: number
}

/**
 * Тип субсидии:  * `YANDEX_CASHBACK` — скидка по подписке Яндекс Плюс.  * `SUBSIDY` — скидка Маркета (по акциям, промокодам, купонам и т. д.)  * `DELIVERY` — скидка за доставку (DBS).
 * @export
 * @enum {string}
 */

export const OrderSubsidyType = {
	YandexCashback: 'YANDEX_CASHBACK',
	Subsidy: 'SUBSIDY',
	Delivery: 'DELIVERY',
} as const

export type OrderSubsidyType =
	(typeof OrderSubsidyType)[keyof typeof OrderSubsidyType]

/**
 * Этап обработки заказа (если он имеет статус `PROCESSING`) или причина отмены заказа (если он имеет статус `CANCELLED`).  * Значения для заказа в статусе `PROCESSING`:      * `STARTED` — заказ подтвержден, его можно начать обрабатывать.      * `READY_TO_SHIP` — заказ собран и готов к отправке.  * Значения для заказа в статусе `CANCELLED`:      * `RESERVATION_EXPIRED` — покупатель не завершил оформление зарезервированного заказа в течение 10 минут.      * `USER_NOT_PAID` — покупатель не оплатил заказ (для типа оплаты `PREPAID`) в течение 30 минут.      * `USER_UNREACHABLE` — не удалось связаться с покупателем. Для отмены с этой причиной необходимо выполнить условия:        * не менее 3 звонков с 8 до 21 в часовом поясе покупателя;       * перерыв между первым и третьим звонком не менее 90 минут;       * соединение не короче 5 секунд.        Если хотя бы одно из этих условий не выполнено (кроме случая, когда номер недоступен), отменить заказ не получится. Вернется ответ с кодом ошибки 400.      * `USER_CHANGED_MIND` — покупатель отменил заказ по личным причинам.      * `USER_REFUSED_DELIVERY` — покупателя не устроили условия доставки.      * `USER_REFUSED_PRODUCT` — покупателю не подошел товар.      * `SHOP_FAILED` — магазин не может выполнить заказ.      * `USER_REFUSED_QUALITY` — покупателя не устроило качество товара.      * `REPLACING_ORDER` — покупатель решил заменить товар другим по собственной инициативе.      * `PROCESSING_EXPIRED` — значение более не используется.  * `TECHNICAL_ERROR` — техническая ошибка на стороне Маркета. Обратитесь в поддержку.  Также могут возвращаться другие значения. Обрабатывать их не требуется.
 * @export
 * @enum {string}
 */

export const OrderSubstatusType = {
	ReservationExpired: 'RESERVATION_EXPIRED',
	UserNotPaid: 'USER_NOT_PAID',
	UserUnreachable: 'USER_UNREACHABLE',
	UserChangedMind: 'USER_CHANGED_MIND',
	UserRefusedDelivery: 'USER_REFUSED_DELIVERY',
	UserRefusedProduct: 'USER_REFUSED_PRODUCT',
	ShopFailed: 'SHOP_FAILED',
	UserRefusedQuality: 'USER_REFUSED_QUALITY',
	ReplacingOrder: 'REPLACING_ORDER',
	ProcessingExpired: 'PROCESSING_EXPIRED',
	PendingExpired: 'PENDING_EXPIRED',
	ShopPendingCancelled: 'SHOP_PENDING_CANCELLED',
	PendingCancelled: 'PENDING_CANCELLED',
	UserFraud: 'USER_FRAUD',
	ReservationFailed: 'RESERVATION_FAILED',
	UserPlacedOtherOrder: 'USER_PLACED_OTHER_ORDER',
	UserBoughtCheaper: 'USER_BOUGHT_CHEAPER',
	MissingItem: 'MISSING_ITEM',
	BrokenItem: 'BROKEN_ITEM',
	WrongItem: 'WRONG_ITEM',
	PickupExpired: 'PICKUP_EXPIRED',
	DeliveryProblems: 'DELIVERY_PROBLEMS',
	LateContact: 'LATE_CONTACT',
	Custom: 'CUSTOM',
	DeliveryServiceFailed: 'DELIVERY_SERVICE_FAILED',
	WarehouseFailedToShip: 'WAREHOUSE_FAILED_TO_SHIP',
	DeliverySerivceUndelivered: 'DELIVERY_SERIVCE_UNDELIVERED',
	DeliveryServiceUndelivered: 'DELIVERY_SERVICE_UNDELIVERED',
	Preorder: 'PREORDER',
	AwaitConfirmation: 'AWAIT_CONFIRMATION',
	Started: 'STARTED',
	Packaging: 'PACKAGING',
	ReadyToShip: 'READY_TO_SHIP',
	Shipped: 'SHIPPED',
	AsyncProcessing: 'ASYNC_PROCESSING',
	UserRefusedToProvidePersonalData: 'USER_REFUSED_TO_PROVIDE_PERSONAL_DATA',
	WaitingUserInput: 'WAITING_USER_INPUT',
	WaitingBankDecision: 'WAITING_BANK_DECISION',
	BankRejectCreditOffer: 'BANK_REJECT_CREDIT_OFFER',
	CustomerRejectCreditOffer: 'CUSTOMER_REJECT_CREDIT_OFFER',
	CreditOfferFailed: 'CREDIT_OFFER_FAILED',
	AwaitDeliveryDatesConfirmation: 'AWAIT_DELIVERY_DATES_CONFIRMATION',
	ServiceFault: 'SERVICE_FAULT',
	DeliveryServiceReceived: 'DELIVERY_SERVICE_RECEIVED',
	UserReceived: 'USER_RECEIVED',
	WaitingForStocks: 'WAITING_FOR_STOCKS',
	AsPartOfMultiOrder: 'AS_PART_OF_MULTI_ORDER',
	ReadyForLastMile: 'READY_FOR_LAST_MILE',
	LastMileStarted: 'LAST_MILE_STARTED',
	Antifraud: 'ANTIFRAUD',
	DeliveryUserNotReceived: 'DELIVERY_USER_NOT_RECEIVED',
	DeliveryServiceDelivered: 'DELIVERY_SERVICE_DELIVERED',
	DeliveredUserNotReceived: 'DELIVERED_USER_NOT_RECEIVED',
	UserWantedAnotherPaymentMethod: 'USER_WANTED_ANOTHER_PAYMENT_METHOD',
	UserReceivedTechnicalError: 'USER_RECEIVED_TECHNICAL_ERROR',
	UserForgotToUseBonus: 'USER_FORGOT_TO_USE_BONUS',
	ReceivedOnDistributionCenter: 'RECEIVED_ON_DISTRIBUTION_CENTER',
	DeliveryServiceNotReceived: 'DELIVERY_SERVICE_NOT_RECEIVED',
	DeliveryServiceLost: 'DELIVERY_SERVICE_LOST',
	ShippedToWrongDeliveryService: 'SHIPPED_TO_WRONG_DELIVERY_SERVICE',
	DeliveredUserReceived: 'DELIVERED_USER_RECEIVED',
	WaitingTinkoffDecision: 'WAITING_TINKOFF_DECISION',
	CourierSearch: 'COURIER_SEARCH',
	CourierFound: 'COURIER_FOUND',
	CourierInTransitToSender: 'COURIER_IN_TRANSIT_TO_SENDER',
	CourierArrivedToSender: 'COURIER_ARRIVED_TO_SENDER',
	CourierReceived: 'COURIER_RECEIVED',
	CourierNotFound: 'COURIER_NOT_FOUND',
	CourierNotDeliverOrder: 'COURIER_NOT_DELIVER_ORDER',
	CourierReturnsOrder: 'COURIER_RETURNS_ORDER',
	CourierReturnedOrder: 'COURIER_RETURNED_ORDER',
	WaitingUserDeliveryInput: 'WAITING_USER_DELIVERY_INPUT',
	PickupServiceReceived: 'PICKUP_SERVICE_RECEIVED',
	PickupUserReceived: 'PICKUP_USER_RECEIVED',
	CancelledCourierNotFound: 'CANCELLED_COURIER_NOT_FOUND',
	CourierNotComeForOrder: 'COURIER_NOT_COME_FOR_ORDER',
	DeliveryNotManagedRegion: 'DELIVERY_NOT_MANAGED_REGION',
	IncompleteContactInformation: 'INCOMPLETE_CONTACT_INFORMATION',
	IncompleteMultiOrder: 'INCOMPLETE_MULTI_ORDER',
	InappropriateWeightSize: 'INAPPROPRIATE_WEIGHT_SIZE',
	TechnicalError: 'TECHNICAL_ERROR',
	SortingCenterLost: 'SORTING_CENTER_LOST',
	CourierSearchNotStarted: 'COURIER_SEARCH_NOT_STARTED',
	Lost: 'LOST',
	AwaitPayment: 'AWAIT_PAYMENT',
	AwaitLavkaReservation: 'AWAIT_LAVKA_RESERVATION',
	UserWantsToChangeAddress: 'USER_WANTS_TO_CHANGE_ADDRESS',
	FullNotRansom: 'FULL_NOT_RANSOM',
	PrescriptionMismatch: 'PRESCRIPTION_MISMATCH',
	DropoffLost: 'DROPOFF_LOST',
	DropoffClosed: 'DROPOFF_CLOSED',
	DeliveryToStoreStarted: 'DELIVERY_TO_STORE_STARTED',
	UserWantsToChangeDeliveryDate: 'USER_WANTS_TO_CHANGE_DELIVERY_DATE',
	WrongItemDelivered: 'WRONG_ITEM_DELIVERED',
	DamagedBox: 'DAMAGED_BOX',
	AwaitDeliveryDates: 'AWAIT_DELIVERY_DATES',
	LastMileCourierSearch: 'LAST_MILE_COURIER_SEARCH',
	PickupPointClosed: 'PICKUP_POINT_CLOSED',
	LegalInfoChanged: 'LEGAL_INFO_CHANGED',
	UserHasNoTimeToPickupOrder: 'USER_HAS_NO_TIME_TO_PICKUP_ORDER',
	DeliveryCustomsArrived: 'DELIVERY_CUSTOMS_ARRIVED',
	DeliveryCustomsCleared: 'DELIVERY_CUSTOMS_CLEARED',
	FirstMileDeliveryServiceReceived: 'FIRST_MILE_DELIVERY_SERVICE_RECEIVED',
	AwaitAutoDeliveryDates: 'AWAIT_AUTO_DELIVERY_DATES',
	AwaitUserPersonalData: 'AWAIT_USER_PERSONAL_DATA',
	NoPersonalDataExpired: 'NO_PERSONAL_DATA_EXPIRED',
	CustomsProblems: 'CUSTOMS_PROBLEMS',
	AwaitCashier: 'AWAIT_CASHIER',
	WaitingPostpaidBudgetReservation: 'WAITING_POSTPAID_BUDGET_RESERVATION',
	AwaitServiceableConfirmation: 'AWAIT_SERVICEABLE_CONFIRMATION',
	PostpaidBudgetReservationFailed: 'POSTPAID_BUDGET_RESERVATION_FAILED',
	AwaitCustomPriceConfirmation: 'AWAIT_CUSTOM_PRICE_CONFIRMATION',
	ReadyForPickup: 'READY_FOR_PICKUP',
	Unknown: 'UNKNOWN',
} as const

export type OrderSubstatusType =
	(typeof OrderSubstatusType)[keyof typeof OrderSubstatusType]

/**
 * Система налогообложения (СНО) магазина на момент оформления заказа:  * `ECHN` — единый сельскохозяйственный налог (ЕСХН).  * `ENVD` — единый налог на вмененный доход (ЕНВД).  * `OSN` — общая система налогообложения (ОСН).  * `PSN` — патентная система налогообложения (ПСН).  * `USN` — упрощенная система налогообложения (УСН).  * `USN_MINUS_COST` — упрощенная система налогообложения, доходы, уменьшенные на величину расходов (УСН «Доходы минус расходы»).  * `NPD` — налог на профессиональный доход (НПД).  * `UNKNOWN_VALUE` — неизвестное значение. Используется только совместно с параметром `payment-method=YANDEX`.
 * @export
 * @enum {string}
 */

export const OrderTaxSystemType = {
	Osn: 'OSN',
	Usn: 'USN',
	UsnMinusCost: 'USN_MINUS_COST',
	Envd: 'ENVD',
	Echn: 'ECHN',
	Psn: 'PSN',
	Npd: 'NPD',
	UnknownValue: 'UNKNOWN_VALUE',
} as const

export type OrderTaxSystemType =
	(typeof OrderTaxSystemType)[keyof typeof OrderTaxSystemType]

/**
 * Информация о трек-номере посылки (DBS).
 * @export
 * @interface OrderTrackDTO
 */
export interface OrderTrackDTO {
	/**
	 * Трек‑номер посылки.
	 * @type {string}
	 * @memberof OrderTrackDTO
	 */
	trackCode?: string
	/**
	 * Идентификатор службы доставки. Информацию о службе доставки можно получить с помощью запроса [GET delivery/services](../../reference/orders/getDeliveryServices.md).
	 * @type {number}
	 * @memberof OrderTrackDTO
	 */
	deliveryServiceId: number
}
/**
 * Изменился ли статус заказа:  * `OK` — статус изменен.  * `ERROR` — статус не изменен. В этом случае появится сообщение об ошибке в параметре `errorDetails`.
 * @export
 * @enum {string}
 */

export const OrderUpdateStatusType = {
	Ok: 'OK',
	Error: 'ERROR',
} as const

export type OrderUpdateStatusType =
	(typeof OrderUpdateStatusType)[keyof typeof OrderUpdateStatusType]

/**
 * Налог на добавленную стоимость (НДС) на товар:  * `NO_VAT` — НДС не облагается, используется только для отдельных видов услуг.  * `VAT_0` — НДС 0%. Например, используется при продаже товаров, вывезенных в таможенной процедуре экспорта, или при оказании услуг по международной перевозке товаров.  * `VAT_10` — НДС 10%. Например, используется при реализации отдельных продовольственных и медицинских товаров.  * `VAT_10_110` — НДС 10/110. НДС 10%, применяется только при предоплате.  * `VAT_20` — НДС 20%. Основной НДС с 2019 года.  * `VAT_20_120` — НДС 20/120. НДС 20%, применяется только при предоплате.  * `VAT_18` — НДС 18%. Основной НДС до 2019 года.  * `VAT_18_118` — НДС 18/118. НДС использовался до 1 января 2019 года при предоплате.  * `VAT_12` — НДС 12%. Используется только в Узбекистане.  * `VAT_05` — НДС 5%. НДС для упрощенной системы налогообложения (УСН).  * `VAT_07` — НДС 7%. НДС для упрощенной системы налогообложения (УСН).  * `UNKNOWN_VALUE` — неизвестный тип.  Используется только совместно с параметром `payment-method=YANDEX`.
 * @export
 * @enum {string}
 */

export const OrderVatType = {
	NoVat: 'NO_VAT',
	Vat0: 'VAT_0',
	Vat10: 'VAT_10',
	Vat10110: 'VAT_10_110',
	Vat20: 'VAT_20',
	Vat20120: 'VAT_20_120',
	Vat18: 'VAT_18',
	Vat18118: 'VAT_18_118',
	Vat12: 'VAT_12',
	Vat05: 'VAT_05',
	Vat07: 'VAT_07',
	UnknownValue: 'UNKNOWN_VALUE',
} as const

export type OrderVatType = (typeof OrderVatType)[keyof typeof OrderVatType]

/**
 * Годные/негодные ярлыки по заказам в отгрузке.
 * @export
 * @interface OrdersShipmentInfoDTO
 */
export interface OrdersShipmentInfoDTO {
	/**
	 * Идентификаторы заказов в отгрузке, для которых можно распечатать ярлыки.
	 * @type {Set<number>}
	 * @memberof OrdersShipmentInfoDTO
	 */
	orderIdsWithLabels: Set<number>
	/**
	 * Идентификаторы заказов в отгрузке, для которых нельзя распечатать ярлыки.
	 * @type {Set<number>}
	 * @memberof OrdersShipmentInfoDTO
	 */
	orderIdsWithoutLabels: Set<number>
}
/**
 * Информация о стоимости услуг.
 * @export
 * @interface OrdersStatsCommissionDTO
 */
export interface OrdersStatsCommissionDTO {
	/**
	 *
	 * @type {OrdersStatsCommissionType}
	 * @memberof OrdersStatsCommissionDTO
	 */
	type?: OrdersStatsCommissionType
	/**
	 * Сумма в рублях, которая была выставлена в момент создания заказа и которую нужно оплатить. Точность — два знака после запятой.
	 * @type {number}
	 * @memberof OrdersStatsCommissionDTO
	 */
	actual?: number
}

/**
 * Услуга:  * `FEE` — размещение товара на Маркете. * `FULFILLMENT` — складская обработка. Не возвращается с 1 января 2024 года. * `LOYALTY_PARTICIPATION_FEE` — участие в программе лояльности и отзывы за баллы. * `AUCTION_PROMOTION` — буст продаж с оплатой за продажи. * `INSTALLMENT` — рассрочка. Не возвращается с 24 февраля 2022 года. * `DELIVERY_TO_CUSTOMER` — доставка покупателю (FBY, FBS). Для DBS и Экспресс — если заказ возвращается через логистику Маркета. * `EXPRESS_DELIVERY_TO_CUSTOMER` — экспресс-доставка покупателю (Экспресс). * `AGENCY` — прием платежа покупателя. * `PAYMENT_TRANSFER` — перевод платежа покупателя. * `RETURNED_ORDERS_STORAGE` — хранение невыкупов и возвратов (FBS). Для DBS и Экспресс — если заказ возвращается через логистику Маркета. * `SORTING` — обработка заказа (FBS). * `INTAKE_SORTING` — организация забора заказов со склада продавца (FBS). * `RETURN_PROCESSING` — обработка заказов на складе (FBS). Для DBS и Экспресс — если заказ возвращается через логистику Маркета. * `ILLIQUID_GOODS_SALE` — вознаграждение за продажу невывезенных товаров.
 * @export
 * @enum {string}
 */

export const OrdersStatsCommissionType = {
	Fee: 'FEE',
	Fulfillment: 'FULFILLMENT',
	LoyaltyParticipationFee: 'LOYALTY_PARTICIPATION_FEE',
	AuctionPromotion: 'AUCTION_PROMOTION',
	Installment: 'INSTALLMENT',
	DeliveryToCustomer: 'DELIVERY_TO_CUSTOMER',
	ExpressDeliveryToCustomer: 'EXPRESS_DELIVERY_TO_CUSTOMER',
	Agency: 'AGENCY',
	PaymentTransfer: 'PAYMENT_TRANSFER',
	ReturnedOrdersStorage: 'RETURNED_ORDERS_STORAGE',
	Sorting: 'SORTING',
	IntakeSorting: 'INTAKE_SORTING',
	ReturnProcessing: 'RETURN_PROCESSING',
	IlliquidGoodsSale: 'ILLIQUID_GOODS_SALE',
} as const

export type OrdersStatsCommissionType =
	(typeof OrdersStatsCommissionType)[keyof typeof OrdersStatsCommissionType]

/**
 * Информация по заказам.
 * @export
 * @interface OrdersStatsDTO
 */
export interface OrdersStatsDTO {
	/**
	 * Список заказов.
	 * @type {Array<OrdersStatsOrderDTO>}
	 * @memberof OrdersStatsDTO
	 */
	orders: OrdersStatsOrderDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof OrdersStatsDTO
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * Информация о регионе доставки.
 * @export
 * @interface OrdersStatsDeliveryRegionDTO
 */
export interface OrdersStatsDeliveryRegionDTO {
	/**
	 * Идентификатор региона доставки.
	 * @type {number}
	 * @memberof OrdersStatsDeliveryRegionDTO
	 */
	id?: number
	/**
	 * Название региона доставки.
	 * @type {string}
	 * @memberof OrdersStatsDeliveryRegionDTO
	 */
	name?: string
}
/**
 * Информация об удалении товара из заказа.
 * @export
 * @interface OrdersStatsDetailsDTO
 */
export interface OrdersStatsDetailsDTO {
	/**
	 *
	 * @type {OrdersStatsItemStatusType}
	 * @memberof OrdersStatsDetailsDTO
	 */
	itemStatus?: OrdersStatsItemStatusType
	/**
	 * Количество товара со статусом, указанном в параметре `itemStatus`.
	 * @type {number}
	 * @memberof OrdersStatsDetailsDTO
	 */
	itemCount?: number
	/**
	 * Дата, когда товар получил статус, указанный в параметре `itemStatus`.  Формат даты: `ГГГГ-ММ-ДД`.
	 * @type {string}
	 * @memberof OrdersStatsDetailsDTO
	 */
	updateDate?: string
	/**
	 *
	 * @type {OrdersStatsStockType}
	 * @memberof OrdersStatsDetailsDTO
	 */
	stockType?: OrdersStatsStockType
}

/**
 * Список товаров в заказе после возможных изменений.  В ходе обработки заказа Маркет может удалить из него единицы товаров — при проблемах на складе или по инициативе пользователя.  * Если из заказа удалены все единицы товара, его не будет в списке `items` — только в списке `initialItems`.  * Если в заказе осталась хотя бы одна единица товара, он будет и в списке `items` (с уменьшенным количеством единиц `count`), и в списке `initialItems` (с первоначальным количеством единиц `initialCount`).
 * @export
 * @interface OrdersStatsItemDTO
 */
export interface OrdersStatsItemDTO {
	/**
	 * Название товара.
	 * @type {string}
	 * @memberof OrdersStatsItemDTO
	 */
	offerName?: string
	/**
	 * SKU на Маркете.
	 * @type {number}
	 * @memberof OrdersStatsItemDTO
	 */
	marketSku?: number
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof OrdersStatsItemDTO
	 */
	shopSku?: string
	/**
	 * Количество единиц товара с учетом удаленных единиц.  Если из заказа удалены все единицы товара, он попадет только в список `initialItems`.
	 * @type {number}
	 * @memberof OrdersStatsItemDTO
	 */
	count?: number
	/**
	 * Цена или скидки на товар.
	 * @type {Array<OrdersStatsPriceDTO>}
	 * @memberof OrdersStatsItemDTO
	 */
	prices?: OrdersStatsPriceDTO[] | null
	/**
	 *
	 * @type {OrdersStatsWarehouseDTO}
	 * @memberof OrdersStatsItemDTO
	 */
	warehouse?: OrdersStatsWarehouseDTO
	/**
	 * Информация об удалении товара из заказа.
	 * @type {Array<OrdersStatsDetailsDTO>}
	 * @memberof OrdersStatsItemDTO
	 */
	details?: OrdersStatsDetailsDTO[] | null
	/**
	 * Список кодов идентификации товара [в системе «Честный ЗНАК»](https://честныйзнак.рф/).
	 * @type {Array<string>}
	 * @memberof OrdersStatsItemDTO
	 */
	cisList?: string[] | null
	/**
	 * Первоначальное количество единиц товара.
	 * @type {number}
	 * @memberof OrdersStatsItemDTO
	 */
	initialCount?: number
	/**
	 * Списанная ставка ближайшего конкурента.  Указывается в процентах от стоимости товара и умножается на 100. Например, ставка 5% обозначается как 500.
	 * @type {number}
	 * @memberof OrdersStatsItemDTO
	 */
	bidFee?: number
	/**
	 * Порог для скидок с Маркетом на момент оформления заказа. [Что это такое?](https://yandex.ru/support/marketplace/marketing/smart-pricing.html#sponsored-discounts)  Указан в рублях. Точность — два знака после запятой.
	 * @type {number}
	 * @memberof OrdersStatsItemDTO
	 */
	cofinanceThreshold?: number
	/**
	 * Скидка с Маркетом. [Что это такое?](https://yandex.ru/support/marketplace/marketing/smart-pricing.html#sponsored-discounts)  Указана в рублях. Точность — два знака после запятой.
	 * @type {number}
	 * @memberof OrdersStatsItemDTO
	 */
	cofinanceValue?: number
}
/**
 * Статус товара:  * `REJECTED` — товар был добавлен в созданный заказ, но не был оплачен. * `RETURNED` — товар вернули.
 * @export
 * @enum {string}
 */

export const OrdersStatsItemStatusType = {
	Rejected: 'REJECTED',
	Returned: 'RETURNED',
} as const

export type OrdersStatsItemStatusType =
	(typeof OrdersStatsItemStatusType)[keyof typeof OrdersStatsItemStatusType]

/**
 * Информация о заказе.
 * @export
 * @interface OrdersStatsOrderDTO
 */
export interface OrdersStatsOrderDTO {
	/**
	 * Идентификатор заказа.
	 * @type {number}
	 * @memberof OrdersStatsOrderDTO
	 */
	id?: number
	/**
	 * Дата создания заказа.  Формат даты: `ГГГГ-ММ-ДД`.
	 * @type {string}
	 * @memberof OrdersStatsOrderDTO
	 */
	creationDate?: string
	/**
	 * Дата и время, когда статус заказа был изменен в последний раз.  Формат даты и времени: ISO 8601. Например, `2017-11-21T00:00:00`. Часовой пояс — UTC+03:00 (Москва).
	 * @type {string}
	 * @memberof OrdersStatsOrderDTO
	 */
	statusUpdateDate?: string
	/**
	 *
	 * @type {OrderStatsStatusType}
	 * @memberof OrdersStatsOrderDTO
	 */
	status?: OrderStatsStatusType
	/**
	 * Идентификатор заказа в информационной системе магазина.
	 * @type {string}
	 * @memberof OrdersStatsOrderDTO
	 */
	partnerOrderId?: string
	/**
	 *
	 * @type {OrdersStatsOrderPaymentType}
	 * @memberof OrdersStatsOrderDTO
	 */
	paymentType?: OrdersStatsOrderPaymentType
	/**
	 * Тип заказа:  * `false` — настоящий заказ покупателя.  * `true` — [тестовый](../../concepts/sandbox.md) заказ Маркета.
	 * @type {boolean}
	 * @memberof OrdersStatsOrderDTO
	 */
	fake?: boolean
	/**
	 *
	 * @type {OrdersStatsDeliveryRegionDTO}
	 * @memberof OrdersStatsOrderDTO
	 */
	deliveryRegion?: OrdersStatsDeliveryRegionDTO
	/**
	 * Список товаров в заказе после возможных изменений.  Информация о доставке заказа добавляется отдельным элементом в массиве `items`— параметр `offerName` со значением `Доставка`.
	 * @type {Array<OrdersStatsItemDTO>}
	 * @memberof OrdersStatsOrderDTO
	 */
	items: OrdersStatsItemDTO[]
	/**
	 * Список товаров в заказе до изменений.
	 * @type {Array<OrdersStatsItemDTO>}
	 * @memberof OrdersStatsOrderDTO
	 */
	initialItems?: OrdersStatsItemDTO[] | null
	/**
	 * Информация о денежных переводах по заказу.  Может вернуться пустым, если нет данных о переводах.
	 * @type {Array<OrdersStatsPaymentDTO>}
	 * @memberof OrdersStatsOrderDTO
	 */
	payments: OrdersStatsPaymentDTO[]
	/**
	 * Информация о комиссиях за заказ.
	 * @type {Array<OrdersStatsCommissionDTO>}
	 * @memberof OrdersStatsOrderDTO
	 */
	commissions: OrdersStatsCommissionDTO[]
	/**
	 * Начисление баллов, которые используются для уменьшения стоимости размещения, и их списание в случае возврата или невыкупа.
	 * @type {Array<OrdersStatsSubsidyDTO>}
	 * @memberof OrdersStatsOrderDTO
	 */
	subsidies?: OrdersStatsSubsidyDTO[] | null
}

/**
 * Тип оплаты заказа: - `POSTPAID` — заказ оплачен после того, как был получен. - `PREPAID` — заказ оплачен до того, как был получен. - `UNKNOWN` — неизвестный тип оплаты. Скорее всего покупатель отменил или вернул заказ или не было его оплаты.
 * @export
 * @enum {string}
 */

export const OrdersStatsOrderPaymentType = {
	Postpaid: 'POSTPAID',
	Prepaid: 'PREPAID',
	Unknown: 'UNKNOWN',
} as const

export type OrdersStatsOrderPaymentType =
	(typeof OrdersStatsOrderPaymentType)[keyof typeof OrdersStatsOrderPaymentType]

/**
 * Информация о денежных переводах по заказу.
 * @export
 * @interface OrdersStatsPaymentDTO
 */
export interface OrdersStatsPaymentDTO {
	/**
	 * Идентификатор денежного перевода.
	 * @type {string}
	 * @memberof OrdersStatsPaymentDTO
	 */
	id?: string
	/**
	 * Дата денежного перевода.  Формат даты: `ГГГГ-ММ-ДД`.
	 * @type {string}
	 * @memberof OrdersStatsPaymentDTO
	 */
	date?: string
	/**
	 *
	 * @type {OrdersStatsPaymentType}
	 * @memberof OrdersStatsPaymentDTO
	 */
	type?: OrdersStatsPaymentType
	/**
	 *
	 * @type {OrdersStatsPaymentSourceType}
	 * @memberof OrdersStatsPaymentDTO
	 */
	source?: OrdersStatsPaymentSourceType
	/**
	 * Сумма денежного перевода. Значение указывается в рублях независимо от способа денежного перевода. Точность — два знака после запятой.
	 * @type {number}
	 * @memberof OrdersStatsPaymentDTO
	 */
	total?: number
	/**
	 *
	 * @type {OrdersStatsPaymentOrderDTO}
	 * @memberof OrdersStatsPaymentDTO
	 */
	paymentOrder?: OrdersStatsPaymentOrderDTO
}

/**
 * Информация о платежном поручении.
 * @export
 * @interface OrdersStatsPaymentOrderDTO
 */
export interface OrdersStatsPaymentOrderDTO {
	/**
	 * Номер платежного поручения.
	 * @type {string}
	 * @memberof OrdersStatsPaymentOrderDTO
	 */
	id?: string
	/**
	 * Дата платежного поручения.  Формат даты: `ГГГГ‑ММ‑ДД`.
	 * @type {string}
	 * @memberof OrdersStatsPaymentOrderDTO
	 */
	date?: string
}
/**
 * Способ денежного перевода: - `BUYER` — оплата или возврат деньгами.  Устаревшие способы: - `CASHBACK`. - `MARKETPLACE`. - `SPLIT`.
 * @export
 * @enum {string}
 */

export const OrdersStatsPaymentSourceType = {
	Buyer: 'BUYER',
	Cashback: 'CASHBACK',
	Marketplace: 'MARKETPLACE',
	Split: 'SPLIT',
} as const

export type OrdersStatsPaymentSourceType =
	(typeof OrdersStatsPaymentSourceType)[keyof typeof OrdersStatsPaymentSourceType]

/**
 * Тип денежного перевода: - `PAYMENT` — оплата. - `REFUND` — возврат.
 * @export
 * @enum {string}
 */

export const OrdersStatsPaymentType = {
	Payment: 'PAYMENT',
	Refund: 'REFUND',
} as const

export type OrdersStatsPaymentType =
	(typeof OrdersStatsPaymentType)[keyof typeof OrdersStatsPaymentType]

/**
 * Цена или скидки на товар.
 * @export
 * @interface OrdersStatsPriceDTO
 */
export interface OrdersStatsPriceDTO {
	/**
	 *
	 * @type {OrdersStatsPriceType}
	 * @memberof OrdersStatsPriceDTO
	 */
	type?: OrdersStatsPriceType
	/**
	 * Цена или скидка на единицу товара в заказе. Указана в рублях. Точность — два знака после запятой.
	 * @type {number}
	 * @memberof OrdersStatsPriceDTO
	 */
	costPerItem?: number
	/**
	 * Суммарная цена или скидка на все единицы товара в заказе. Указана в рублях. Точность — два знака после запятой.
	 * @type {number}
	 * @memberof OrdersStatsPriceDTO
	 */
	total?: number
}

/**
 * Тип скидки или цена на товар: - `BUYER` — цена на товар с учетом скидок, в том числе купонов. - `CASHBACK` — баллы Плюса. - `MARKETPLACE` — купоны.
 * @export
 * @enum {string}
 */

export const OrdersStatsPriceType = {
	Buyer: 'BUYER',
	Cashback: 'CASHBACK',
	Marketplace: 'MARKETPLACE',
} as const

export type OrdersStatsPriceType =
	(typeof OrdersStatsPriceType)[keyof typeof OrdersStatsPriceType]

/**
 * Тип товара:  * `FIT` — товар надлежащего качества.  * `DEFECT` — товар бракованный.  * `EXPIRED` — товар с истекшим сроком годности.
 * @export
 * @enum {string}
 */

export const OrdersStatsStockType = {
	Fit: 'FIT',
	Defect: 'DEFECT',
	Expired: 'EXPIRED',
} as const

export type OrdersStatsStockType =
	(typeof OrdersStatsStockType)[keyof typeof OrdersStatsStockType]

/**
 * Информация о начислении баллов, которые используются для уменьшения стоимости размещения, и их списании в случае возврата или невыкупа.
 * @export
 * @interface OrdersStatsSubsidyDTO
 */
export interface OrdersStatsSubsidyDTO {
	/**
	 *
	 * @type {OrdersStatsSubsidyOperationType}
	 * @memberof OrdersStatsSubsidyDTO
	 */
	operationType: OrdersStatsSubsidyOperationType
	/**
	 *
	 * @type {OrdersStatsSubsidyType}
	 * @memberof OrdersStatsSubsidyDTO
	 */
	type: OrdersStatsSubsidyType
	/**
	 * Количество баллов, которые используются для уменьшения стоимости размещения, с точностью до двух знаков после запятой.
	 * @type {number}
	 * @memberof OrdersStatsSubsidyDTO
	 */
	amount: number
}

/**
 * Тип операции с баллами, которые используются для уменьшения стоимости размещения:  * `ACCRUAL` — начисление баллов. * `DEDUCTION` — списание баллов.
 * @export
 * @enum {string}
 */

export const OrdersStatsSubsidyOperationType = {
	Accrual: 'ACCRUAL',
	Deduction: 'DEDUCTION',
} as const

export type OrdersStatsSubsidyOperationType =
	(typeof OrdersStatsSubsidyOperationType)[keyof typeof OrdersStatsSubsidyOperationType]

/**
 * Источник баллов, которые используются для уменьшения стоимости размещения:  * `YANDEX_CASHBACK` — скидка по подписке Яндекс Плюс.  * `SUBSIDY` — скидка Маркета (по акциям, промокодам, купонам и т. д.)  * `DELIVERY` — скидка за доставку (DBS).
 * @export
 * @enum {string}
 */

export const OrdersStatsSubsidyType = {
	YandexCashback: 'YANDEX_CASHBACK',
	Subsidy: 'SUBSIDY',
	Delivery: 'DELIVERY',
} as const

export type OrdersStatsSubsidyType =
	(typeof OrdersStatsSubsidyType)[keyof typeof OrdersStatsSubsidyType]

/**
 * Информация о складе, на котором хранится товар.
 * @export
 * @interface OrdersStatsWarehouseDTO
 */
export interface OrdersStatsWarehouseDTO {
	/**
	 * Идентификатор склада.
	 * @type {number}
	 * @memberof OrdersStatsWarehouseDTO
	 */
	id?: number
	/**
	 * Название склада.
	 * @type {string}
	 * @memberof OrdersStatsWarehouseDTO
	 */
	name?: string
}
/**
 * Адрес точки продаж.
 * @export
 * @interface OutletAddressDTO
 */
export interface OutletAddressDTO {
	/**
	 * Идентификатор региона.  Идентификатор можно получить c помощью запроса [GET regions](../../reference/regions/searchRegionsByName.md).  {% note alert \"Типы регионов при создании и редактировании точек продаж\" %}  Указывайте только регионы типов `TOWN` (город), `CITY` (крупный город) и `REPUBLIC_AREA` (район субъекта федерации). Тип региона указан в выходных параметрах `type` запросов [GET regions](../../reference/regions/searchRegionsByName.md) и [GET regions/{regionId}](../../reference/regions/searchRegionsById.md).  {% endnote %}
	 * @type {number}
	 * @memberof OutletAddressDTO
	 */
	regionId: number
	/**
	 * Улица.
	 * @type {string}
	 * @memberof OutletAddressDTO
	 */
	street?: string
	/**
	 * Номер дома.
	 * @type {string}
	 * @memberof OutletAddressDTO
	 */
	number?: string
	/**
	 * Номер строения.
	 * @type {string}
	 * @memberof OutletAddressDTO
	 */
	building?: string
	/**
	 * Номер владения.
	 * @type {string}
	 * @memberof OutletAddressDTO
	 */
	estate?: string
	/**
	 * Номер корпуса.
	 * @type {string}
	 * @memberof OutletAddressDTO
	 */
	block?: string
	/**
	 * Дополнительная информация.
	 * @type {string}
	 * @memberof OutletAddressDTO
	 */
	additional?: string
	/**
	 * Порядковый номер километра дороги, на котором располагается точка продаж, если отсутствует улица.
	 * @type {number}
	 * @memberof OutletAddressDTO
	 */
	km?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  В ответах города и населенные пункты возвращаются в параметре `regionId`.  {% endnote %}
	 * @type {string}
	 * @memberof OutletAddressDTO
	 */
	city?: string
}
/**
 * Информация о точке продаж.
 * @export
 * @interface OutletDTO
 */
export interface OutletDTO {
	/**
	 * Название точки продаж.
	 * @type {string}
	 * @memberof OutletDTO
	 */
	name: string
	/**
	 *
	 * @type {OutletType}
	 * @memberof OutletDTO
	 */
	type: OutletType
	/**
	 * Координаты точки продаж.  Формат: долгота, широта. Разделители: запятая и / или пробел. Например, `20.4522144, 54.7104264`.  Если параметр не передан, координаты будут определены по значениям параметров, вложенных в `address`.
	 * @type {string}
	 * @memberof OutletDTO
	 */
	coords?: string
	/**
	 * Признак основной точки продаж.  Возможные значения:  * `false` — неосновная точка продаж. * `true` — основная точка продаж.
	 * @type {boolean}
	 * @memberof OutletDTO
	 */
	isMain?: boolean
	/**
	 * Идентификатор точки продаж, присвоенный магазином.
	 * @type {string}
	 * @memberof OutletDTO
	 */
	shopOutletCode?: string
	/**
	 *
	 * @type {OutletVisibilityType}
	 * @memberof OutletDTO
	 */
	visibility?: OutletVisibilityType
	/**
	 *
	 * @type {OutletAddressDTO}
	 * @memberof OutletDTO
	 */
	address: OutletAddressDTO
	/**
	 * Номера телефонов точки продаж. Передавайте в формате: `+7 (999) 999-99-99`.
	 * @type {Array<string>}
	 * @memberof OutletDTO
	 */
	phones: string[]
	/**
	 *
	 * @type {OutletWorkingScheduleDTO}
	 * @memberof OutletDTO
	 */
	workingSchedule: OutletWorkingScheduleDTO
	/**
	 * Информация об условиях доставки для данной точки продаж.  Обязательный параметр, если параметр `type=DEPOT` или `type=MIXED`.
	 * @type {Array<OutletDeliveryRuleDTO>}
	 * @memberof OutletDTO
	 */
	deliveryRules?: OutletDeliveryRuleDTO[] | null
	/**
	 * Срок хранения заказа в собственном пункте выдачи заказов. Считается в днях.
	 * @type {number}
	 * @memberof OutletDTO
	 */
	storagePeriod?: number
}

/**
 * Информация об условиях доставки для данной точки продаж.
 * @export
 * @interface OutletDeliveryRuleDTO
 */
export interface OutletDeliveryRuleDTO {
	/**
	 * Минимальный срок доставки товаров в точку продаж. Указан в рабочих днях.  Минимальное значение: `0` — доставка в день заказа.  Максимальное значение: `60`.  Допустимые сроки доставки (разница между `minDeliveryDays` и `maxDeliveryDays`) зависят от региона.  Для доставки по своему региону разница не должна превышать двух дней. Например, если `minDeliveryDays` равно 1, то для `maxDeliveryDays` допускаются значения от 1 до 3.  Для доставки в другие регионы:  * Если `minDeliveryDays` до 18 дней, разница не должна превышать четырех дней. Например, если `minDeliveryDays` равно 10, то для `maxDeliveryDays` допускаются значения от 10 до 14. * Если `minDeliveryDays` больше 18 дней, разница должна быть не больше чем в два раза. Например, если `minDeliveryDays` равно 21, то для `maxDeliveryDays` допускаются значения от 21 до 42.  Обязательный параметр, если `type=\"DEPOT\"` или `type=\"MIXED\"`.  Взаимоисключающий с параметром `unspecifiedDeliveryInterval`.
	 * @type {number}
	 * @memberof OutletDeliveryRuleDTO
	 */
	minDeliveryDays?: number
	/**
	 * Максимальный срок доставки товаров в точку продаж. Указан в рабочих днях.  Минимальное значение: `0` — доставка в день заказа.  Максимальное значение: `60`.  Допустимые сроки доставки (разница между `minDeliveryDays` и `maxDeliveryDays`) зависят от региона.  Для доставки по своему региону разница не должна превышать двух дней. Например, если `minDeliveryDays` равно 1, то для `maxDeliveryDays` допускаются значения от 1 до 3.  Для доставки в другие регионы:  * Если `minDeliveryDays` до 18 дней, разница не должна превышать четырех дней. Например, если `minDeliveryDays` равно 10, то для `maxDeliveryDays` допускаются значения от 10 до 14. * Если `minDeliveryDays` больше 18 дней, разница должна быть не больше чем в два раза. Например, если `minDeliveryDays` равно 21, то для `maxDeliveryDays` допускаются значения от 21 до 42.  Обязательный параметр, если `type=\"DEPOT\"` или `type=\"MIXED\"`.  Взаимоисключающий с параметром `unspecifiedDeliveryInterval`.
	 * @type {number}
	 * @memberof OutletDeliveryRuleDTO
	 */
	maxDeliveryDays?: number
	/**
	 * Идентификатор службы доставки товаров в точку продаж.  Информацию о службе доставки можно получить с помощью запроса [GET delivery/services](../../reference/orders/getDeliveryServices.md).
	 * @type {number}
	 * @memberof OutletDeliveryRuleDTO
	 */
	deliveryServiceId?: number
	/**
	 * Час, до которого покупателю нужно сделать заказ, чтобы он был доставлен в точку продаж в сроки от `minDeliveryDays` до `maxDeliveryDays`.  Если покупатель оформит заказ после указанного часа, он будет доставлен в сроки от `minDeliveryDays` + 1 рабочий день до `maxDeliveryDays` + 1 рабочий день.  Значение по умолчанию: `24`.
	 * @type {number}
	 * @memberof OutletDeliveryRuleDTO
	 */
	orderBefore?: number
	/**
	 * Цена на товар, начиная с которой действует бесплатный самовывоз товара из точки продаж.
	 * @type {number}
	 * @memberof OutletDeliveryRuleDTO
	 */
	priceFreePickup?: number
	/**
	 * Признак доставки товаров в точку продаж на заказ.  Признак выставлен, если:  * точный срок доставки в точку продаж заранее неизвестен (например, если магазин собирает несколько заказов для отправки в точку или населенный пункт); * все товары изготавливаются или поставляются на заказ.  Возможные значения: * `true` — товары доставляются в точку продаж на заказ.  Параметр указывается только со значением `true`.  Взаимоисключающий с параметрами `minDeliveryDays` и `maxDeliveryDays`.
	 * @type {boolean}
	 * @memberof OutletDeliveryRuleDTO
	 */
	unspecifiedDeliveryInterval?: boolean
}
/**
 * Информация о лицензии.
 * @export
 * @interface OutletLicenseDTO
 */
export interface OutletLicenseDTO {
	/**
	 * Идентификатор лицензии.  Параметр указывается, только если нужно изменить информацию о существующей лицензии. Ее идентификатор можно узнать с помощью запроса [GET campaigns/{campaignId}/outlets/licenses](../../reference/outlets/getOutletLicenses.md). При передаче информации о новой лицензии указывать идентификатор не нужно.  Идентификатор лицензии присваивается Маркетом. Не путайте его с номером, указанным на лицензии: он передается в параметре `number`.
	 * @type {number}
	 * @memberof OutletLicenseDTO
	 */
	id?: number
	/**
	 * Идентификатор точки продаж, для которой действительна лицензия.
	 * @type {number}
	 * @memberof OutletLicenseDTO
	 */
	outletId: number
	/**
	 *
	 * @type {LicenseType}
	 * @memberof OutletLicenseDTO
	 */
	licenseType: LicenseType
	/**
	 * Номер лицензии.
	 * @type {string}
	 * @memberof OutletLicenseDTO
	 */
	number: string
	/**
	 * Дата выдачи лицензии.  Формат даты: ISO 8601 со смещением относительно UTC. Нужно передать дату, указанную на лицензии, время `00:00:00` и часовой пояс, соответствующий региону точки продаж. Например, если лицензия для точки продаж в Москве выдана 13 ноября 2017 года, то параметр должен иметь значение `2017-11-13T00:00:00+03:00`.  Не может быть позже даты окончания срока действия, указанной в параметре `dateOfExpiry`.
	 * @type {string}
	 * @memberof OutletLicenseDTO
	 */
	dateOfIssue: string
	/**
	 * Дата окончания действия лицензии.  Формат даты: ISO 8601 со смещением относительно UTC. Нужно передать дату, указанную на лицензии, время `00:00:00` и часовой пояс, соответствующий региону точки продаж. Например, если действие лицензии для точки продаж в Москве заканчивается 20 ноября 2022 года, то параметр должен иметь значение `2022-11-20T00:00:00+03:00`.  Не может быть раньше даты выдачи, указанной в параметре `dateOfIssue`.
	 * @type {string}
	 * @memberof OutletLicenseDTO
	 */
	dateOfExpiry: string
}

/**
 * Ответ на запрос информации о лицензиях для точек продаж.
 * @export
 * @interface OutletLicensesResponseDTO
 */
export interface OutletLicensesResponseDTO {
	/**
	 * Список лицензий.
	 * @type {Array<FullOutletLicenseDTO>}
	 * @memberof OutletLicensesResponseDTO
	 */
	licenses: FullOutletLicenseDTO[]
}
/**
 * Результат выполнения запроса. Выводится, если `status=\"OK\"`.
 * @export
 * @interface OutletResponseDTO
 */
export interface OutletResponseDTO {
	/**
	 * Идентификатор точки продаж, присвоенный Маркетом.
	 * @type {number}
	 * @memberof OutletResponseDTO
	 */
	id?: number
}
/**
 * Статус точки продаж.  Возможные значения:  * `AT_MODERATION` — проверяется. * `FAILED` — не прошла проверку и отклонена модератором. * `MODERATED` — проверена и одобрена. * `NONMODERATED` — новая точка, нуждается в проверке. * `UNKNOWN` — статус не указан. При определении статуса произошла ошибка.
 * @export
 * @enum {string}
 */

export const OutletStatusType = {
	AtModeration: 'AT_MODERATION',
	Failed: 'FAILED',
	Moderated: 'MODERATED',
	Nonmoderated: 'NONMODERATED',
	Unknown: 'UNKNOWN',
} as const

export type OutletStatusType =
	(typeof OutletStatusType)[keyof typeof OutletStatusType]

/**
 * Тип точки продаж.  Возможные значения:  * `DEPOT` — пункт выдачи заказов. * `MIXED` — смешанный тип точки продаж (торговый зал и пункт выдачи заказов). * `RETAIL` — розничная точка продаж (торговый зал). * `NOT_DEFINED` — неизвестный тип точки продажи. При определении типа произошла ошибка.
 * @export
 * @enum {string}
 */

export const OutletType = {
	Depot: 'DEPOT',
	Mixed: 'MIXED',
	Retail: 'RETAIL',
	NotDefined: 'NOT_DEFINED',
} as const

export type OutletType = (typeof OutletType)[keyof typeof OutletType]

/**
 * Состояние точки продаж.  Возможные значения:  * `HIDDEN` — точка продаж выключена. * `VISIBLE` — точка продаж включена. * `UNKNOWN` — неизвестное состояние точки продажи. При определении состояния произошла ошибка.
 * @export
 * @enum {string}
 */

export const OutletVisibilityType = {
	Hidden: 'HIDDEN',
	Visible: 'VISIBLE',
	Unknown: 'UNKNOWN',
} as const

export type OutletVisibilityType =
	(typeof OutletVisibilityType)[keyof typeof OutletVisibilityType]

/**
 * Список режимов работы точки продаж.
 * @export
 * @interface OutletWorkingScheduleDTO
 */
export interface OutletWorkingScheduleDTO {
	/**
	 * Признак, работает ли точка продаж в дни государственных праздников.  Возможные значения:  * `false` — точка продаж не работает в дни государственных праздников. * `true` — точка продаж работает в дни государственных праздников.
	 * @type {boolean}
	 * @memberof OutletWorkingScheduleDTO
	 */
	workInHoliday?: boolean
	/**
	 * Список расписаний работы точки продаж.
	 * @type {Array<OutletWorkingScheduleItemDTO>}
	 * @memberof OutletWorkingScheduleDTO
	 */
	scheduleItems: OutletWorkingScheduleItemDTO[]
}
/**
 * Расписание работы точки продаж.
 * @export
 * @interface OutletWorkingScheduleItemDTO
 */
export interface OutletWorkingScheduleItemDTO {
	/**
	 *
	 * @type {DayOfWeekType}
	 * @memberof OutletWorkingScheduleItemDTO
	 */
	startDay: DayOfWeekType
	/**
	 *
	 * @type {DayOfWeekType}
	 * @memberof OutletWorkingScheduleItemDTO
	 */
	endDay: DayOfWeekType
	/**
	 * Точка продаж работает c указанного часа.  Формат: `ЧЧ:ММ`.
	 * @type {string}
	 * @memberof OutletWorkingScheduleItemDTO
	 */
	startTime: string
	/**
	 * Точка продаж работает до указанного часа.  Формат: `ЧЧ:ММ`.
	 * @type {string}
	 * @memberof OutletWorkingScheduleItemDTO
	 */
	endTime: string
}

/**
 * Размещение ярлыков на странице PDF-файла:  * `A9_HORIZONTALLY` — ярлык размером 58 × 40 мм без полей, близок к формату A9. Доступен только для продавцов из России.    {% cut \"Пример ярлыка\" %}    ![Изображение горизонтального ярлыка формата A9](../../_images/label-A9-horizontally.png)    {% endcut %}  * `A9` — ярлык размером 40 × 58 мм без полей, близок к формату A9. Доступен только для продавцов из России.    {% cut \"Пример ярлыка\" %}    ![Изображение вертикального ярлыка формата A9](../../_images/label-A9.png)    {% endcut %}  * `A7` — ярлык размером 75 × 120 мм (80,4 × 125,6 мм с учетом полей), близок к формату A7.    {% cut \"Пример ярлыка\" %}    ![Изображение ярлыка формата A7](../../_images/label-A7.jpg)    {% endcut %}  * `A4` — на листе A4 располагается ярлык того формата, который выбран в кабинете продавца на Маркете — перейдите на страницу **Заказы** → **Заказы и отгрузки** → на вкладке нужной модели работы нажмите кнопку **Формат ярлыков**.
 * @export
 * @enum {string}
 */

export const PageFormatType = {
	A9Horizontally: 'A9_HORIZONTALLY',
	A9: 'A9',
	A7: 'A7',
	A4: 'A4',
} as const

export type PageFormatType =
	(typeof PageFormatType)[keyof typeof PageFormatType]

/**
 * Возвраты.
 * @export
 * @interface PagedReturnsDTO
 */
export interface PagedReturnsDTO {
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof PagedReturnsDTO
	 */
	paging?: ForwardScrollingPagerDTO
	/**
	 * Список возвратов.
	 * @type {Array<ReturnDTO>}
	 * @memberof PagedReturnsDTO
	 */
	returns: ReturnDTO[]
}
/**
 * Количество палет в отгрузке.
 * @export
 * @interface PalletsCountDTO
 */
export interface PalletsCountDTO {
	/**
	 * Количество палет, которое заявил продавец.
	 * @type {number}
	 * @memberof PalletsCountDTO
	 */
	planned?: number
	/**
	 * Количество палет, которое приняли в сортировочном центре.
	 * @type {number}
	 * @memberof PalletsCountDTO
	 */
	fact?: number
}
/**
 * Тип данных:  * `TEXT` — текст. * `ENUM` — список возможных значений. * `BOOLEAN` — `true` или `false`. * `NUMERIC` — число.
 * @export
 * @enum {string}
 */

export const ParameterType = {
	Text: 'TEXT',
	Enum: 'ENUM',
	Boolean: 'BOOLEAN',
	Numeric: 'NUMERIC',
} as const

export type ParameterType = (typeof ParameterType)[keyof typeof ParameterType]

/**
 * Ограничения на значения характеристик.
 * @export
 * @interface ParameterValueConstraintsDTO
 */
export interface ParameterValueConstraintsDTO {
	/**
	 * Минимальное число.
	 * @type {number}
	 * @memberof ParameterValueConstraintsDTO
	 */
	minValue?: number
	/**
	 * Максимальное число.
	 * @type {number}
	 * @memberof ParameterValueConstraintsDTO
	 */
	maxValue?: number
	/**
	 * Максимальная длина текста.
	 * @type {number}
	 * @memberof ParameterValueConstraintsDTO
	 */
	maxLength?: number
}
/**
 * Значение характеристики.  Вы можете указывать несколько значений одной характеристики при условии, что:  * Тип характеристики — `ENUM`. * В ответе на запрос [POST category/{categoryId}/parameters](../../reference/content/getCategoryContentParameters.md) у данной характеристики поле `multivalue` имеет значение `true`.  Для этого в `parameterValues` передавайте каждое значение отдельно — несколько объектов с параметрами `parameterId`, `valueId` и `value`. Параметр `parameterId` должен быть одинаковым.
 * @export
 * @interface ParameterValueDTO
 */
export interface ParameterValueDTO {
	/**
	 * Идентификатор характеристики.
	 * @type {number}
	 * @memberof ParameterValueDTO
	 */
	parameterId: number
	/**
	 * Идентификатор единицы измерения. Если вы не передали параметр `unitId`, используется единица измерения по умолчанию.
	 * @type {number}
	 * @memberof ParameterValueDTO
	 */
	unitId?: number
	/**
	 * Идентификатор значения.  Обязательно указывайте идентификатор, если передаете значение из перечня допустимых значений, полученного от Маркета.  Только для характеристик типа `ENUM`.
	 * @type {number}
	 * @memberof ParameterValueDTO
	 */
	valueId?: number
	/**
	 * Значение.
	 * @type {string}
	 * @memberof ParameterValueDTO
	 */
	value?: string
}
/**
 * Значение характеристики.
 * @export
 * @interface ParameterValueOptionDTO
 */
export interface ParameterValueOptionDTO {
	/**
	 * Идентификатор значения.
	 * @type {number}
	 * @memberof ParameterValueOptionDTO
	 */
	id: number
	/**
	 * Значение.
	 * @type {string}
	 * @memberof ParameterValueOptionDTO
	 */
	value: string
	/**
	 * Описание значения.
	 * @type {string}
	 * @memberof ParameterValueOptionDTO
	 */
	description?: string
}
/**
 * Параметр отображает одно грузовое место.
 * @export
 * @interface ParcelBoxDTO
 */
export interface ParcelBoxDTO {
	/**
	 * Идентификатор коробки в составе заказа.
	 * @type {number}
	 * @memberof ParcelBoxDTO
	 */
	id?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}
	 * @type {string}
	 * @memberof ParcelBoxDTO
	 */
	fulfilmentId?: string
}
/**
 * Информация о ярлыке для коробки.
 * @export
 * @interface ParcelBoxLabelDTO
 */
export interface ParcelBoxLabelDTO {
	/**
	 * Соответствует URL, по которому выполняется запрос [GET campaigns/{campaignId}/orders/{orderId}/delivery/shipments/{shipmentId}/boxes/{boxId}/label](../../reference/orders/generateOrderLabel.md).
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	url: string
	/**
	 * Юридическое название магазина.
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	supplierName: string
	/**
	 * Юридическое название службы доставки.
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	deliveryServiceName: string
	/**
	 * Идентификатор заказа в системе Маркета.
	 * @type {number}
	 * @memberof ParcelBoxLabelDTO
	 */
	orderId: number
	/**
	 * Идентификатор заказа в информационной системе магазина.  Совпадает с `orderId`, если Маркету неизвестен номер заказа в системе магазина.
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	orderNum: string
	/**
	 * Фамилия и инициалы получателя заказа.
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	recipientName: string
	/**
	 * Идентификатор коробки.
	 * @type {number}
	 * @memberof ParcelBoxLabelDTO
	 */
	boxId: number
	/**
	 * Идентификатор коробки в информационной системе магазина.  Возвращается в формате: `номер заказа на Маркете-номер коробки`. Например, `7206821‑1`, `7206821‑2` и т. д.
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	fulfilmentId: string
	/**
	 * Номер коробки в заказе. Возвращается в формате: `номер места/общее количество мест`.
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	place: string
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Общая масса всех товаров в заказе. Возвращается в формате: `weight кг`.
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	weight: string
	/**
	 * Идентификатор службы доставки. Информацию о службе доставки можно получить с помощью запроса [GET delivery/services](../../reference/orders/getDeliveryServices.md).
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	deliveryServiceId: string
	/**
	 * Адрес получателя.
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	deliveryAddress?: string
	/**
	 * Дата отгрузки в формате `dd.MM.yyyy`.
	 * @type {string}
	 * @memberof ParcelBoxLabelDTO
	 */
	shipmentDate?: string
}
/**
 * Параметр отображает одно грузовое место. Вложенные поля больше не используются, передавайте параметр пустым.
 * @export
 * @interface ParcelBoxRequestDTO
 */
export interface ParcelBoxRequestDTO {
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}
	 * @type {string}
	 * @memberof ParcelBoxRequestDTO
	 */
	fulfilmentId?: string
}
/**
 * Информация о грузовых местах в заказе.
 * @export
 * @interface ParcelRequestDTO
 */
export interface ParcelRequestDTO {
	/**
	 * Список грузовых мест. По его длине Маркет определяет количество мест.
	 * @type {Array<ParcelBoxRequestDTO>}
	 * @memberof ParcelRequestDTO
	 */
	boxes: ParcelBoxRequestDTO[]
}
/**
 * Данные о складе отправления.
 * @export
 * @interface PartnerShipmentWarehouseDTO
 */
export interface PartnerShipmentWarehouseDTO {
	/**
	 * Идентификатор склада отправления.
	 * @type {number}
	 * @memberof PartnerShipmentWarehouseDTO
	 */
	id: number
	/**
	 * Наименование склада отправления.
	 * @type {string}
	 * @memberof PartnerShipmentWarehouseDTO
	 */
	name?: string
	/**
	 * Адрес склада отправления.
	 * @type {string}
	 * @memberof PartnerShipmentWarehouseDTO
	 */
	address?: string
}
/**
 * Частота выплат:  * `DAILY` — ежедневно. * `WEEKLY` — раз в неделю. * `BIWEEKLY` — раз в две недели. * `MONTHLY` — раз в месяц.  Подробнее о графике выплат читайте [в Справке Маркета для продавцов](https://yandex.ru/support/marketplace/introduction/rates/acquiring.html).
 * @export
 * @enum {string}
 */

export const PaymentFrequencyType = {
	Daily: 'DAILY',
	Weekly: 'WEEKLY',
	Biweekly: 'BIWEEKLY',
	Monthly: 'MONTHLY',
} as const

export type PaymentFrequencyType =
	(typeof PaymentFrequencyType)[keyof typeof PaymentFrequencyType]

/**
 * Адрес доставки.
 * @export
 * @interface PickupAddressDTO
 */
export interface PickupAddressDTO {
	/**
	 * Страна.
	 * @type {string}
	 * @memberof PickupAddressDTO
	 */
	country?: string
	/**
	 * Город.
	 * @type {string}
	 * @memberof PickupAddressDTO
	 */
	city?: string
	/**
	 * Улица.
	 * @type {string}
	 * @memberof PickupAddressDTO
	 */
	street?: string
	/**
	 * Номер дома.
	 * @type {string}
	 * @memberof PickupAddressDTO
	 */
	house?: string
	/**
	 * Почтовый индекс.
	 * @type {string}
	 * @memberof PickupAddressDTO
	 */
	postcode?: string
}
/**
 * Модель, по которой работает магазин:  * `FBS` — FBS или Экспресс. * `FBY` — FBY. * `DBS` — DBS.
 * @export
 * @enum {string}
 */

export const PlacementType = {
	Fbs: 'FBS',
	Fby: 'FBY',
	Dbs: 'DBS',
} as const

export type PlacementType = (typeof PlacementType)[keyof typeof PlacementType]

/**
 * Максимальные значения цены, при которых она является привлекательной или умеренной.
 * @export
 * @interface PriceCompetitivenessThresholdsDTO
 */
export interface PriceCompetitivenessThresholdsDTO {
	/**
	 *
	 * @type {BasePriceDTO}
	 * @memberof PriceCompetitivenessThresholdsDTO
	 */
	optimalPrice?: BasePriceDTO
	/**
	 *
	 * @type {BasePriceDTO}
	 * @memberof PriceCompetitivenessThresholdsDTO
	 */
	averagePrice?: BasePriceDTO
}
/**
 * Привлекательность цены:  * `OPTIMAL` — привлекательная. * `AVERAGE` — умеренная. * `LOW` — непривлекательная.
 * @export
 * @enum {string}
 */

export const PriceCompetitivenessType = {
	Optimal: 'OPTIMAL',
	Average: 'AVERAGE',
	Low: 'LOW',
} as const

export type PriceCompetitivenessType =
	(typeof PriceCompetitivenessType)[keyof typeof PriceCompetitivenessType]

/**
 * Цена с указанием скидки, валюты и времени последнего обновления.
 * @export
 * @interface PriceDTO
 */
export interface PriceDTO {
	/**
	 * Цена на товар.
	 * @type {number}
	 * @memberof PriceDTO
	 */
	value?: number
	/**
	 * Цена на товар без скидки.  Число должно быть целым. Вы можете указать цену со скидкой от 5 до 99%.  Передавайте этот параметр при каждом обновлении цены, если предоставляете скидку на товар.
	 * @type {number}
	 * @memberof PriceDTO
	 */
	discountBase?: number
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof PriceDTO
	 */
	currencyId?: CurrencyType
	/**
	 * Идентификатор НДС, применяемый для товара:  * `2` — НДС 10%. Например, используется при реализации отдельных продовольственных и медицинских товаров. * `5` — НДС 0%. Например, используется при продаже товаров, вывезенных в таможенной процедуре экспорта, или при оказании услуг по международной перевозке товаров. * `6` — НДС не облагается, используется только для отдельных видов услуг. * `7` — НДС 20%. Основной НДС с 2019 года. * `9` — НДС 12%. Используется только в Узбекистане. * `10` — НДС 5%. НДС для упрощенной системы налогообложения (УСН). * `11` — НДС 7%. НДС для упрощенной системы налогообложения (УСН).  Если параметр не указан, используется НДС, установленный в кабинете.
	 * @type {number}
	 * @memberof PriceDTO
	 */
	vat?: number
}

/**
 * Причина попадания товара в карантин.
 * @export
 * @interface PriceQuarantineVerdictDTO
 */
export interface PriceQuarantineVerdictDTO {
	/**
	 *
	 * @type {PriceQuarantineVerdictType}
	 * @memberof PriceQuarantineVerdictDTO
	 */
	type?: PriceQuarantineVerdictType
	/**
	 * Цена, из-за которой товар попал в карантин, и значения для сравнения. Конкретный набор параметров зависит от типа карантина.
	 * @type {Array<PriceQuarantineVerdictParameterDTO>}
	 * @memberof PriceQuarantineVerdictDTO
	 */
	params: PriceQuarantineVerdictParameterDTO[]
}

/**
 * Имя параметра причины скрытия товара по цене.  * `CURRENT_PRICE` — цена, из-за которой товар попал в карантин. * `LAST_VALID_PRICE` — последняя цена до попадания в карантин (только для карантина типа `PRICE_CHANGE`). * `MIN_PRICE` — порог попадания в карантин (только для карантина типов `LOW_PRICE` и `LOW_PRICE_PROMO`). * `CURRENCY` — валюта.
 * @export
 * @enum {string}
 */

export const PriceQuarantineVerdictParamNameType = {
	CurrentPrice: 'CURRENT_PRICE',
	LastValidPrice: 'LAST_VALID_PRICE',
	MinPrice: 'MIN_PRICE',
	Currency: 'CURRENCY',
} as const

export type PriceQuarantineVerdictParamNameType =
	(typeof PriceQuarantineVerdictParamNameType)[keyof typeof PriceQuarantineVerdictParamNameType]

/**
 * Параметр карантина.
 * @export
 * @interface PriceQuarantineVerdictParameterDTO
 */
export interface PriceQuarantineVerdictParameterDTO {
	/**
	 *
	 * @type {PriceQuarantineVerdictParamNameType}
	 * @memberof PriceQuarantineVerdictParameterDTO
	 */
	name: PriceQuarantineVerdictParamNameType
	/**
	 * Значение параметра.
	 * @type {string}
	 * @memberof PriceQuarantineVerdictParameterDTO
	 */
	value: string
}

/**
 * Типы карантина:  * `PRICE_CHANGE` — новая цена слишком сильно отличается от прежней. В поле `params` будет  новая цена `CURRENT_PRICE` и последняя цена до попадания в карантин `LAST_VALID_PRICE`. * `LOW_PRICE` — установленная цена слишком сильно отличается от рыночной. В поле `params` будет установленная вами цена `CURRENT_PRICE` и порог попадания в карантин `MIN_PRICE`. * `LOW_PRICE_PROMO` — цена после применения акций слишком сильно отличается от рыночной. В поле `params` будет цена после применения акций `CURRENT_PRICE` и порог попадания в карантин `MIN_PRICE`.
 * @export
 * @enum {string}
 */

export const PriceQuarantineVerdictType = {
	PriceChange: 'PRICE_CHANGE',
	LowPrice: 'LOW_PRICE',
	LowPricePromo: 'LOW_PRICE_PROMO',
} as const

export type PriceQuarantineVerdictType =
	(typeof PriceQuarantineVerdictType)[keyof typeof PriceQuarantineVerdictType]

/**
 * Рекомендованная цена.
 * @export
 * @interface PriceRecommendationItemDTO
 */
export interface PriceRecommendationItemDTO {
	/**
	 * Идентификатор кампании.
	 * @type {number}
	 * @memberof PriceRecommendationItemDTO
	 */
	campaignId: number
	/**
	 * Рекомендованная цена на товар. Чтобы продвижение хорошо работало, цена на товар должна быть не выше этого значения. [Подробно о рекомендованных ценах](https://yandex.ru/support/marketplace/marketing/campaigns.html#prices)
	 * @type {number}
	 * @memberof PriceRecommendationItemDTO
	 */
	price: number
}
/**
 * Тип цены.
 * @export
 * @interface PriceSuggestDTO
 */
export interface PriceSuggestDTO {
	/**
	 *
	 * @type {PriceSuggestType}
	 * @memberof PriceSuggestDTO
	 */
	type?: PriceSuggestType
	/**
	 * Цена в рублях.
	 * @type {number}
	 * @memberof PriceSuggestDTO
	 */
	price?: number
}

/**
 * Товар с ценами для продвижения.
 * @export
 * @interface PriceSuggestOfferDTO
 */
export interface PriceSuggestOfferDTO {
	/**
	 * SKU на Маркете.
	 * @type {number}
	 * @memberof PriceSuggestOfferDTO
	 */
	marketSku?: number
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof PriceSuggestOfferDTO
	 */
	offerId?: string
	/**
	 * Цены для продвижения.
	 * @type {Array<PriceSuggestDTO>}
	 * @memberof PriceSuggestOfferDTO
	 */
	priceSuggestion?: PriceSuggestDTO[] | null
}
/**
 * Тип цены:  * `BUYBOX` — самая низкая цена на товар, по которой он продается сейчас. Эта цена обновляется в режиме реального времени. Если вы установите цену ниже, начнет показываться ваше предложение. Если для этого значения в параметре `price` указана цена, которая совпадает с вашей, значит, ваш товар уже показывается на витрине. Если кроме вас этот товар продают другие продавцы по такой же цене, их предложения также будут отображаться вместе с вашими по очереди. * `DEFAULT_OFFER` — рекомендованная Маркетом цена, которая привлекает покупателей. Рассчитывается только для популярных на сервисе товаров и обновляется раз в четыре часа. * `MIN_PRICE_MARKET` — минимальная цена на Маркете. Самая низкая цена среди всех предложений товара на Маркете во всех регионах, включая те, которые не видны на витрине. Эта цена обновляется в режиме реального времени и обеспечивает большее количество показов на Маркете, чем самая низкая или рекомендованная цена.
 * @export
 * @enum {string}
 */

export const PriceSuggestType = {
	Buybox: 'BUYBOX',
	DefaultOffer: 'DEFAULT_OFFER',
	MinPriceMarket: 'MIN_PRICE_MARKET',
} as const

export type PriceSuggestType =
	(typeof PriceSuggestType)[keyof typeof PriceSuggestType]

/**
 * Информация об автоматическом добавлении товара в акцию.  Причины, по которым товар не был добавлен автоматически в других магазинах, можно узнать в кабинете продавца на Маркете на странице акции.  Об автоматическом и ручном добавлении товаров в акцию читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/marketing/promos/market/index).
 * @export
 * @interface PromoOfferAutoParticipatingDetailsDTO
 */
export interface PromoOfferAutoParticipatingDetailsDTO {
	/**
	 * Магазины, в которых товар добавлен в акцию автоматически.  Возвращается, если статус товара в акции — `PARTIALLY_AUTO`.
	 * @type {Array<number>}
	 * @memberof PromoOfferAutoParticipatingDetailsDTO
	 */
	campaignIds?: number[] | null
}
/**
 * Параметры товара в акции с типом `DIRECT_DISCOUNT` или `BLUE_FLASH`.
 * @export
 * @interface PromoOfferDiscountParamsDTO
 */
export interface PromoOfferDiscountParamsDTO {
	/**
	 * Зачеркнутая цена — та, по которой товар продавался до акции.  Указывается в рублях.  Возвращается, только если товар участвует в акции.
	 * @type {number}
	 * @memberof PromoOfferDiscountParamsDTO
	 */
	price?: number
	/**
	 * Цена по акции — та, по которой вы хотите продавать товар.  Указывается в рублях.  Возвращается, только если товар участвует в акции.
	 * @type {number}
	 * @memberof PromoOfferDiscountParamsDTO
	 */
	promoPrice?: number
	/**
	 * Максимально возможная цена для участия в акции.  Указывается в рублях.  Возвращается для всех товаров.
	 * @type {number}
	 * @memberof PromoOfferDiscountParamsDTO
	 */
	maxPromoPrice: number
}
/**
 * Параметры товара в акции.  Возвращается параметр, который соответствует типу акции.
 * @export
 * @interface PromoOfferParamsDTO
 */
export interface PromoOfferParamsDTO {
	/**
	 *
	 * @type {PromoOfferDiscountParamsDTO}
	 * @memberof PromoOfferParamsDTO
	 */
	discountParams?: PromoOfferDiscountParamsDTO
	/**
	 *
	 * @type {PromoOfferPromocodeParamsDTO}
	 * @memberof PromoOfferParamsDTO
	 */
	promocodeParams?: PromoOfferPromocodeParamsDTO
}
/**
 * Фильтр для товаров, которые добавлены в акцию вручную:  * `MANUALLY_ADDED` — товары, которые добавлены вручную.  * `NOT_MANUALLY_ADDED`— товары, которые не участвуют в акции и те, которые добавлены автоматически.  Об автоматическом и ручном добавлении товаров в акцию читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/marketing/promos/market/index).
 * @export
 * @enum {string}
 */

export const PromoOfferParticipationStatusFilterType = {
	ManuallyAdded: 'MANUALLY_ADDED',
	NotManuallyAdded: 'NOT_MANUALLY_ADDED',
} as const

export type PromoOfferParticipationStatusFilterType =
	(typeof PromoOfferParticipationStatusFilterType)[keyof typeof PromoOfferParticipationStatusFilterType]

/**
 * Фильтр для товаров, которые могут участвовать в акции:  * `MANUALLY_ADDED` — товары, которые добавлены вручную.  * `RENEWED` — товары, которые добавлены автоматически из предыдущей акции «Бестселлеры Маркета». Только для акций «Бестселлеры Маркета».  * `RENEW_FAILED` — товары, которые не получилось перенести из предыдущей акции «Бестселлеры Маркета». Только для акций «Бестселлеры Маркета».  * `NOT_MANUALLY_ADDED`— товары, которые не участвуют в акции и те, которые добавлены автоматически.  Если не передать параметр `statuses`, вернутся все товары.  Об автоматическом и ручном добавлении товаров в акцию читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/marketing/promos/market/index).
 * @export
 * @enum {string}
 */

export const PromoOfferParticipationStatusMultiFilterType = {
	ManuallyAdded: 'MANUALLY_ADDED',
	Renewed: 'RENEWED',
	RenewFailed: 'RENEW_FAILED',
	NotManuallyAdded: 'NOT_MANUALLY_ADDED',
} as const

export type PromoOfferParticipationStatusMultiFilterType =
	(typeof PromoOfferParticipationStatusMultiFilterType)[keyof typeof PromoOfferParticipationStatusMultiFilterType]

/**
 * Статус товара в акции:  * `AUTO` — добавлен автоматически во всех магазинах кабинета, в которых товар доступен для покупки.  * `PARTIALLY_AUTO` — добавлен автоматически у части магазинов.  * `MANUAL` — добавлен вручную.  * `NOT_PARTICIPATING` — не участвует в акции.  Об автоматическом и ручном добавлении товаров в акцию читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/marketing/promos/market/index).
 * @export
 * @enum {string}
 */

export const PromoOfferParticipationStatusType = {
	Auto: 'AUTO',
	PartiallyAuto: 'PARTIALLY_AUTO',
	Manual: 'MANUAL',
	NotParticipating: 'NOT_PARTICIPATING',
	Renewed: 'RENEWED',
	RenewFailed: 'RENEW_FAILED',
} as const

export type PromoOfferParticipationStatusType =
	(typeof PromoOfferParticipationStatusType)[keyof typeof PromoOfferParticipationStatusType]

/**
 * Параметры товара в акции с типом `MARKET_PROMOCODE`.
 * @export
 * @interface PromoOfferPromocodeParamsDTO
 */
export interface PromoOfferPromocodeParamsDTO {
	/**
	 * Максимально возможная цена для участия в акции до применения промокода.  Указывается в рублях.  Возвращается для всех товаров.
	 * @type {number}
	 * @memberof PromoOfferPromocodeParamsDTO
	 */
	maxPrice: number
}
/**
 * Предупреждение, которое появилось при добавлении товара:  * `DEEP_DISCOUNT_OFFER` — большая разница с ценой в каталоге. Проверьте, нет ли ошибки.  * `CATALOG_PRICE_IS_LOWER_THAN_PROMO` — цена, которая действует во всех магазинах, ниже цены по акции. У товара не будет отображаться цена по акции.  * `SHOP_PRICES_ARE_LOWER_THAN_PROMO` — цена в отдельном магазине ниже цены по акции. У товара в акции будет отображаться цена в магазине. Для остальных магазинов будет действовать цена по акции.  * `PROMOCODE_PRICE_MORE_THAN_MAX_FAIR_PRICE` — в отдельном магазине цена с учетом промокода выше максимально возможной цены. Товар не будет участвовать в акции.  * `SHOP_OFFER_NOT_ELIGIBLE_FOR_PROMO` — товар в отдельном магазине не подходит под условия акции.
 * @export
 * @enum {string}
 */

export const PromoOfferUpdateWarningCodeType = {
	DeepDiscountOffer: 'DEEP_DISCOUNT_OFFER',
	CatalogPriceIsLowerThanPromo: 'CATALOG_PRICE_IS_LOWER_THAN_PROMO',
	ShopPricesAreLowerThanPromo: 'SHOP_PRICES_ARE_LOWER_THAN_PROMO',
	PromocodePriceMoreThanMaxFairPrice:
		'PROMOCODE_PRICE_MORE_THAN_MAX_FAIR_PRICE',
	ShopOfferNotEligibleForPromo: 'SHOP_OFFER_NOT_ELIGIBLE_FOR_PROMO',
} as const

export type PromoOfferUpdateWarningCodeType =
	(typeof PromoOfferUpdateWarningCodeType)[keyof typeof PromoOfferUpdateWarningCodeType]

/**
 * Предупреждение, которое появилось при добавлении товара в акцию или изменении его цен.
 * @export
 * @interface PromoOfferUpdateWarningDTO
 */
export interface PromoOfferUpdateWarningDTO {
	/**
	 *
	 * @type {PromoOfferUpdateWarningCodeType}
	 * @memberof PromoOfferUpdateWarningDTO
	 */
	code: PromoOfferUpdateWarningCodeType
	/**
	 * Идентификаторы магазинов в кабинете, для которых получены предупреждения.  Не возвращается, если предупреждения действуют для всех магазинов в кабинете.
	 * @type {Array<number>}
	 * @memberof PromoOfferUpdateWarningDTO
	 */
	campaignIds?: number[] | null
}

/**
 * Какие акции вернутся:  * `PARTICIPATING_NOW` — текущие и будущие акции продавца.  * `PARTICIPATED` — завершенные акции продавца за последний год. Если за год их было меньше 15, в ответе придут 15 последних акций за все время.
 * @export
 * @enum {string}
 */

export const PromoParticipationType = {
	ParticipatingNow: 'PARTICIPATING_NOW',
	Participated: 'PARTICIPATED',
} as const

export type PromoParticipationType =
	(typeof PromoParticipationType)[keyof typeof PromoParticipationType]

/**
 * Время проведения акции.
 * @export
 * @interface PromoPeriodDTO
 */
export interface PromoPeriodDTO {
	/**
	 * Дата и время начала акции.
	 * @type {string}
	 * @memberof PromoPeriodDTO
	 */
	dateTimeFrom: string
	/**
	 * Дата и время окончания акции.
	 * @type {string}
	 * @memberof PromoPeriodDTO
	 */
	dateTimeTo: string
}
/**
 * Запрос на передачу ключей цифровых товаров.
 * @export
 * @interface ProvideOrderDigitalCodesRequest
 */
export interface ProvideOrderDigitalCodesRequest {
	/**
	 * Список проданных товаров.  Если в заказе есть несколько **одинаковых** товаров (например, несколько ключей к одной и той же подписке), передайте ключи в виде массива к этому товару. Параметр `id` у этих элементов должен быть один и тот же.
	 * @type {Array<OrderDigitalItemDTO>}
	 * @memberof ProvideOrderDigitalCodesRequest
	 */
	items: OrderDigitalItemDTO[]
}
/**
 *
 * @export
 * @interface ProvideOrderItemIdentifiersRequest
 */
export interface ProvideOrderItemIdentifiersRequest {
	/**
	 * Список позиций, требующих маркировки.
	 * @type {Array<OrderItemInstanceModificationDTO>}
	 * @memberof ProvideOrderItemIdentifiersRequest
	 */
	items: OrderItemInstanceModificationDTO[]
}
/**
 *
 * @export
 * @interface ProvideOrderItemIdentifiersResponse
 */
export interface ProvideOrderItemIdentifiersResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof ProvideOrderItemIdentifiersResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OrderItemsModificationResultDTO}
	 * @memberof ProvideOrderItemIdentifiersResponse
	 */
	result?: OrderItemsModificationResultDTO
}

/**
 * description.
 * @export
 * @interface PutSkuBidsRequest
 */
export interface PutSkuBidsRequest {
	/**
	 * Список товаров и ставки для продвижения, которые на них нужно установить.
	 * @type {Array<SkuBidItemDTO>}
	 * @memberof PutSkuBidsRequest
	 */
	bids: SkuBidItemDTO[]
}
/**
 * Информация о заказе, который повлиял на индекс качества.
 * @export
 * @interface QualityRatingAffectedOrderDTO
 */
export interface QualityRatingAffectedOrderDTO {
	/**
	 * Идентификатор заказа.
	 * @type {number}
	 * @memberof QualityRatingAffectedOrderDTO
	 */
	orderId: number
	/**
	 * Описание проблемы.
	 * @type {string}
	 * @memberof QualityRatingAffectedOrderDTO
	 */
	description: string
	/**
	 *
	 * @type {AffectedOrderQualityRatingComponentType}
	 * @memberof QualityRatingAffectedOrderDTO
	 */
	componentType: AffectedOrderQualityRatingComponentType
}

/**
 * Составляющая индекса качества.
 * @export
 * @interface QualityRatingComponentDTO
 */
export interface QualityRatingComponentDTO {
	/**
	 * Значение составляющей в процентах.
	 * @type {number}
	 * @memberof QualityRatingComponentDTO
	 */
	value: number
	/**
	 *
	 * @type {QualityRatingComponentType}
	 * @memberof QualityRatingComponentDTO
	 */
	componentType: QualityRatingComponentType
}

/**
 * Составляющие индекса качества.  **Для модели DBS:** * `DBS_CANCELLATION_RATE` — доля отмененных товаров. * `DBS_LATE_DELIVERY_RATE` — доля заказов, доставленных после плановой даты.  **Для моделей FBS и Экспресс:** * `FBS_CANCELLATION_RATE` — доля отмененных товаров. * `FBS_LATE_SHIP_RATE` — доля не вовремя отгруженных заказов.  **Для модели FBY:** * `FBY_LATE_DELIVERY_RATE` — доля товаров, которые приехали на склад с опозданием. * `FBY_CANCELLATION_RATE` — доля отмененных или недоставленных товаров. * `FBY_DELIVERY_DIFF_RATE` — доля товаров, которые не прибыли вместе с поставкой или которые не приняли. * `FBY_LATE_EDITING_RATE` — доля товаров, которые поздно убрали из заявки.
 * @export
 * @enum {string}
 */

export const QualityRatingComponentType = {
	DbsCancellationRate: 'DBS_CANCELLATION_RATE',
	DbsLateDeliveryRate: 'DBS_LATE_DELIVERY_RATE',
	FbsCancellationRate: 'FBS_CANCELLATION_RATE',
	FbsLateShipRate: 'FBS_LATE_SHIP_RATE',
	FbyLateDeliveryRate: 'FBY_LATE_DELIVERY_RATE',
	FbyCancellationRate: 'FBY_CANCELLATION_RATE',
	FbyDeliveryDiffRate: 'FBY_DELIVERY_DIFF_RATE',
	FbyLateEditingRate: 'FBY_LATE_EDITING_RATE',
} as const

export type QualityRatingComponentType =
	(typeof QualityRatingComponentType)[keyof typeof QualityRatingComponentType]

/**
 * Информация об индексе качества.
 * @export
 * @interface QualityRatingDTO
 */
export interface QualityRatingDTO {
	/**
	 * Значение индекса качества.
	 * @type {number}
	 * @memberof QualityRatingDTO
	 */
	rating: number
	/**
	 * Дата вычисления.  Формат даты: `ГГГГ‑ММ‑ДД`.
	 * @type {string}
	 * @memberof QualityRatingDTO
	 */
	calculationDate: string
	/**
	 * Составляющие индекса качества.
	 * @type {Array<QualityRatingComponentDTO>}
	 * @memberof QualityRatingDTO
	 */
	components: QualityRatingComponentDTO[]
}
/**
 * Информация о заказах, которые повлияли на индекс качества.
 * @export
 * @interface QualityRatingDetailsDTO
 */
export interface QualityRatingDetailsDTO {
	/**
	 * Список заказов, которые повлияли на индекс качества.
	 * @type {Array<QualityRatingAffectedOrderDTO>}
	 * @memberof QualityRatingDetailsDTO
	 */
	affectedOrders: QualityRatingAffectedOrderDTO[]
}
/**
 * Настройка продажи квантами.  Чтобы сбросить установленные ранее значения, передайте пустой параметр `quantum`.  {% cut \"Пример\" %}  ```json {   \"offers\": [     {       \"offerId\": \"08e35dc1-89a2-11e3-8055-0015e9b8c48d\",       \"quantum\": {}     }   ] } ```  {% endcut %}
 * @export
 * @interface QuantumDTO
 */
export interface QuantumDTO {
	/**
	 * Минимальное количество единиц товара в заказе. Например, если указать 10, покупатель сможет добавить в корзину не меньше 10 единиц.  ⚠️ Если количество товара на складе меньше заданного, ограничение не сработает и покупатель сможет его заказать.
	 * @type {number}
	 * @memberof QuantumDTO
	 */
	minQuantity?: number
	/**
	 * На сколько единиц покупатель сможет увеличить количество товара в корзине.  Например, если задать 5, покупатель сможет добавить к заказу только 5, 10, 15, ... единиц товара.  ⚠️ Если количество товара на складе не дотягивает до кванта, ограничение не сработает и покупатель сможет заказать количество, не кратное кванту.
	 * @type {number}
	 * @memberof QuantumDTO
	 */
	stepQuantity?: number
}
/**
 * Товар в карантине.
 * @export
 * @interface QuarantineOfferDTO
 */
export interface QuarantineOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof QuarantineOfferDTO
	 */
	offerId?: string
	/**
	 *
	 * @type {BasePriceDTO}
	 * @memberof QuarantineOfferDTO
	 */
	currentPrice?: BasePriceDTO
	/**
	 *
	 * @type {BasePriceDTO}
	 * @memberof QuarantineOfferDTO
	 */
	lastValidPrice?: BasePriceDTO
	/**
	 * Причины попадания товара в карантин.
	 * @type {Array<PriceQuarantineVerdictDTO>}
	 * @memberof QuarantineOfferDTO
	 */
	verdicts?: PriceQuarantineVerdictDTO[] | null
}
/**
 * Способ возврата товара покупателем:  * `SHOP` — в точку возврата магазина.  * `DELIVERY_SERVICE` — отправить курьером.  * `POST` — почта.
 * @export
 * @enum {string}
 */

export const RecipientType = {
	Shop: 'SHOP',
	DeliveryService: 'DELIVERY_SERVICE',
	Post: 'POST',
} as const

export type RecipientType = (typeof RecipientType)[keyof typeof RecipientType]

/**
 * Cтатус возврата денег:  * `STARTED_BY_USER` — создан клиентом из личного кабинета.  * `REFUND_IN_PROGRESS` — ждет решение о возврате денег.  * `REFUNDED` — по возврату проведены все возвратные денежные транзакции.  * `FAILED` — невозможно провести возврат покупателю.  * `WAITING_FOR_DECISION` — ожидает решения.  * `DECISION_MADE` — по возврату принято решение.  * `REFUNDED_WITH_BONUSES` — возврат осуществлен баллами Плюса или промокодом.  * `REFUNDED_BY_SHOP` — магазин сделал самостоятельно возврат денег.  * `COMPLETE_WITHOUT_REFUND` — возврат денег не требуется.  * `CANCELLED` — возврат отменен.  * `UNKNOWN` — неизвестный статус.
 * @export
 * @enum {string}
 */

export const RefundStatusType = {
	StartedByUser: 'STARTED_BY_USER',
	RefundInProgress: 'REFUND_IN_PROGRESS',
	Refunded: 'REFUNDED',
	Failed: 'FAILED',
	WaitingForDecision: 'WAITING_FOR_DECISION',
	DecisionMade: 'DECISION_MADE',
	RefundedWithBonuses: 'REFUNDED_WITH_BONUSES',
	RefundedByShop: 'REFUNDED_BY_SHOP',
	Cancelled: 'CANCELLED',
	CompleteWithoutRefund: 'COMPLETE_WITHOUT_REFUND',
	Unknown: 'UNKNOWN',
} as const

export type RefundStatusType =
	(typeof RefundStatusType)[keyof typeof RefundStatusType]

/**
 * Регион доставки.
 * @export
 * @interface RegionDTO
 */
export interface RegionDTO {
	/**
	 * Идентификатор региона.
	 * @type {number}
	 * @memberof RegionDTO
	 */
	id: number
	/**
	 * Название региона.
	 * @type {string}
	 * @memberof RegionDTO
	 */
	name: string
	/**
	 *
	 * @type {RegionType}
	 * @memberof RegionDTO
	 */
	type: RegionType
	/**
	 *
	 * @type {RegionDTO}
	 * @memberof RegionDTO
	 */
	parent?: RegionDTO
	/**
	 * Дочерние регионы.
	 * @type {Array<RegionDTO>}
	 * @memberof RegionDTO
	 */
	children?: RegionDTO[] | null
}

/**
 * Тип региона.  Возможные значения:  * `CITY_DISTRICT` — район города.  * `CITY` — крупный город.  * `CONTINENT` — континент.  * `COUNTRY_DISTRICT` — область.  * `COUNTRY` — страна.  * `REGION` — регион.  * `REPUBLIC_AREA` — район субъекта федерации.  * `REPUBLIC` — субъект федерации.  * `SUBWAY_STATION` — станция метро.  * `VILLAGE` — город.  * `OTHER` — неизвестный регион.
 * @export
 * @enum {string}
 */

export const RegionType = {
	Other: 'OTHER',
	Continent: 'CONTINENT',
	Region: 'REGION',
	Country: 'COUNTRY',
	CountryDistrict: 'COUNTRY_DISTRICT',
	Republic: 'REPUBLIC',
	City: 'CITY',
	Village: 'VILLAGE',
	CityDistrict: 'CITY_DISTRICT',
	SubwayStation: 'SUBWAY_STATION',
	RepublicArea: 'REPUBLIC_AREA',
} as const

export type RegionType = (typeof RegionType)[keyof typeof RegionType]

/**
 * Региональная информация.
 * @export
 * @interface RegionalModelInfoDTO
 */
export interface RegionalModelInfoDTO {
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof RegionalModelInfoDTO
	 */
	currency?: CurrencyType
	/**
	 * Идентификатор региона, для которого выводится информация о предложениях модели (доставляемых в этот регион).  Информацию о регионе по идентификатору можно получить с помощью запроса [GET regions/{regionId}](../../reference/regions/searchRegionsById.md).
	 * @type {number}
	 * @memberof RegionalModelInfoDTO
	 */
	regionId?: number
}

/**
 * Информация о товаре и ошибки, которые появились при его удалении.
 * @export
 * @interface RejectedPromoOfferDeleteDTO
 */
export interface RejectedPromoOfferDeleteDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof RejectedPromoOfferDeleteDTO
	 */
	offerId: string
	/**
	 *
	 * @type {RejectedPromoOfferDeleteReasonType}
	 * @memberof RejectedPromoOfferDeleteDTO
	 */
	reason: RejectedPromoOfferDeleteReasonType
}

/**
 * Описание ошибки:  * `OFFER_DOES_NOT_EXIST` — в кабинете нет товара с таким SKU.
 * @export
 * @enum {string}
 */

export const RejectedPromoOfferDeleteReasonType = {
	OfferDoesNotExist: 'OFFER_DOES_NOT_EXIST',
} as const

export type RejectedPromoOfferDeleteReasonType =
	(typeof RejectedPromoOfferDeleteReasonType)[keyof typeof RejectedPromoOfferDeleteReasonType]

/**
 * Описание отклоненного изменения.
 * @export
 * @interface RejectedPromoOfferUpdateDTO
 */
export interface RejectedPromoOfferUpdateDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof RejectedPromoOfferUpdateDTO
	 */
	offerId: string
	/**
	 *
	 * @type {RejectedPromoOfferUpdateReasonType}
	 * @memberof RejectedPromoOfferUpdateDTO
	 */
	reason: RejectedPromoOfferUpdateReasonType
}

/**
 * Причина отклонения изменения:  * `OFFER_DOES_NOT_EXIST` — в кабинете нет товара с таким SKU.  * `OFFER_DUPLICATION` — один и тот же товар передан несколько раз.  * `OFFER_NOT_ELIGIBLE_FOR_PROMO` — товар не подходит под условия акции.  * `OFFER_PROMOS_MAX_BYTE_SIZE_EXCEEDED` — товар не добавлен в акцию по техническим причинам.  * `DEADLINE_FOR_FOCUS_PROMOS_EXCEEDED` — истек срок добавления товаров в акцию.  * `EMPTY_OLD_PRICE` — не указана зачеркнутая цена.  * `EMPTY_PROMO_PRICE` — не указана цена по акции.  * `MAX_PROMO_PRICE_EXCEEDED` — цена по акции превышает максимально возможную цену для участия в акции.  * `PROMO_PRICE_BIGGER_THAN_MAX` — цена по акции больше 95% от зачеркнутой цены.  * `PROMO_PRICE_SMALLER_THAN_MIN` — цена по акции меньше 1% от зачеркнутой цены.
 * @export
 * @enum {string}
 */

export const RejectedPromoOfferUpdateReasonType = {
	OfferDoesNotExist: 'OFFER_DOES_NOT_EXIST',
	OfferDuplication: 'OFFER_DUPLICATION',
	OfferNotEligibleForPromo: 'OFFER_NOT_ELIGIBLE_FOR_PROMO',
	OfferPromosMaxByteSizeExceeded: 'OFFER_PROMOS_MAX_BYTE_SIZE_EXCEEDED',
	DeadlineForFocusPromosExceeded: 'DEADLINE_FOR_FOCUS_PROMOS_EXCEEDED',
	EmptyOldPrice: 'EMPTY_OLD_PRICE',
	EmptyPromoPrice: 'EMPTY_PROMO_PRICE',
	MaxPromoPriceExceeded: 'MAX_PROMO_PRICE_EXCEEDED',
	PromoPriceBiggerThanMax: 'PROMO_PRICE_BIGGER_THAN_MAX',
	PromoPriceSmallerThanMin: 'PROMO_PRICE_SMALLER_THAN_MIN',
} as const

export type RejectedPromoOfferUpdateReasonType =
	(typeof RejectedPromoOfferUpdateReasonType)[keyof typeof RejectedPromoOfferUpdateReasonType]

/**
 * Формат отчета:  * `FILE` — файл с электронной таблицей (XLSX). * `CSV` — ZIP-архив с CSV-файлами на каждый лист отчета. * `JSON` — ZIP-архив с JSON-файлами на каждый лист отчета.
 * @export
 * @enum {string}
 */

export const ReportFormatType = {
	File: 'FILE',
	Csv: 'CSV',
	Json: 'JSON',
} as const

export type ReportFormatType =
	(typeof ReportFormatType)[keyof typeof ReportFormatType]

/**
 * Статус генерации и ссылка на готовый отчет.
 * @export
 * @interface ReportInfoDTO
 */
export interface ReportInfoDTO {
	/**
	 *
	 * @type {ReportStatusType}
	 * @memberof ReportInfoDTO
	 */
	status: ReportStatusType
	/**
	 *
	 * @type {ReportSubStatusType}
	 * @memberof ReportInfoDTO
	 */
	subStatus?: ReportSubStatusType
	/**
	 * Дата и время запроса на генерацию.
	 * @type {string}
	 * @memberof ReportInfoDTO
	 */
	generationRequestedAt: string
	/**
	 * Дата и время завершения генерации.
	 * @type {string}
	 * @memberof ReportInfoDTO
	 */
	generationFinishedAt?: string
	/**
	 * Ссылка на готовый отчет.
	 * @type {string}
	 * @memberof ReportInfoDTO
	 */
	file?: string
	/**
	 * Ожидаемая продолжительность генерации в миллисекундах.
	 * @type {number}
	 * @memberof ReportInfoDTO
	 */
	estimatedGenerationTime?: number
}

/**
 * Язык отчета:  * `RU` — русский язык. * `EN` — английский язык.
 * @export
 * @interface ReportLanguageType
 */
export type ReportLanguageType = Record<string, null>
/**
 * Статус генерации отчета:  * `PENDING` — отчет ожидает генерации. * `PROCESSING` — отчет генерируется. * `FAILED` — во время генерации произошла ошибка. * `DONE` — отчет готов.
 * @export
 * @enum {string}
 */

export const ReportStatusType = {
	Pending: 'PENDING',
	Processing: 'PROCESSING',
	Failed: 'FAILED',
	Done: 'DONE',
} as const

export type ReportStatusType =
	(typeof ReportStatusType)[keyof typeof ReportStatusType]

/**
 * Подстатус генерации отчета: * `NO_DATA` — для такого отчета нет данных. * `TOO_LARGE` — отчет превысил допустимый размер — укажите меньший период времени или уточните условия запроса. * `RESOURCE_NOT_FOUND` — для такого отчета не удалось найти часть сущностей.
 * @export
 * @enum {string}
 */

export const ReportSubStatusType = {
	NoData: 'NO_DATA',
	TooLarge: 'TOO_LARGE',
	ResourceNotFound: 'RESOURCE_NOT_FOUND',
} as const

export type ReportSubStatusType =
	(typeof ReportSubStatusType)[keyof typeof ReportSubStatusType]

/**
 * Возврат заказа.  Параметров `logisticPickupPoint`, `shipmentRecipientType` и `shipmentStatus` может не быть в случае возврата:   * С опцией **Быстрый возврат денег за дешевый брак**, когда товар остается у покупателя (`fastReturn=true`).   * По заказу от бизнеса, если:     * статус возврата `STARTED_BY_USER` или `WAITING_FOR_DECISION`;     * возврат отменен до передачи товара.
 * @export
 * @interface ReturnDTO
 */
export interface ReturnDTO {
	/**
	 * Идентификатор возврата.
	 * @type {number}
	 * @memberof ReturnDTO
	 */
	id: number
	/**
	 * Номер заказа.
	 * @type {number}
	 * @memberof ReturnDTO
	 */
	orderId: number
	/**
	 * Дата создания возврата клиентом.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof ReturnDTO
	 */
	creationDate?: string
	/**
	 * Дата обновления возврата.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof ReturnDTO
	 */
	updateDate?: string
	/**
	 *
	 * @type {RefundStatusType}
	 * @memberof ReturnDTO
	 */
	refundStatus?: RefundStatusType
	/**
	 *
	 * @type {LogisticPickupPointDTO}
	 * @memberof ReturnDTO
	 */
	logisticPickupPoint?: LogisticPickupPointDTO
	/**
	 *
	 * @type {RecipientType}
	 * @memberof ReturnDTO
	 */
	shipmentRecipientType?: RecipientType
	/**
	 *
	 * @type {ReturnShipmentStatusType}
	 * @memberof ReturnDTO
	 */
	shipmentStatus?: ReturnShipmentStatusType
	/**
	 * Сумма возврата.
	 * @type {number}
	 * @memberof ReturnDTO
	 */
	refundAmount?: number
	/**
	 * Список товаров в возврате.
	 * @type {Array<ReturnItemDTO>}
	 * @memberof ReturnDTO
	 */
	items: ReturnItemDTO[]
	/**
	 *
	 * @type {ReturnType}
	 * @memberof ReturnDTO
	 */
	returnType: ReturnType
	/**
	 * Используется ли опция **Быстрый возврат денег за дешевый брак**.
	 * @type {boolean}
	 * @memberof ReturnDTO
	 */
	fastReturn?: boolean
}

/**
 * Решения по возвратам.
 * @export
 * @interface ReturnDecisionDTO
 */
export interface ReturnDecisionDTO {
	/**
	 * Идентификатор товара в возврате.
	 * @type {number}
	 * @memberof ReturnDecisionDTO
	 */
	returnItemId?: number
	/**
	 * Количество единиц товара.
	 * @type {number}
	 * @memberof ReturnDecisionDTO
	 */
	count?: number
	/**
	 * Комментарий.
	 * @type {string}
	 * @memberof ReturnDecisionDTO
	 */
	comment?: string
	/**
	 *
	 * @type {ReturnDecisionReasonType}
	 * @memberof ReturnDecisionDTO
	 */
	reasonType?: ReturnDecisionReasonType
	/**
	 *
	 * @type {ReturnDecisionSubreasonType}
	 * @memberof ReturnDecisionDTO
	 */
	subreasonType?: ReturnDecisionSubreasonType
	/**
	 *
	 * @type {ReturnDecisionType}
	 * @memberof ReturnDecisionDTO
	 */
	decisionType?: ReturnDecisionType
	/**
	 * Сумма возврата.
	 * @type {number}
	 * @memberof ReturnDecisionDTO
	 */
	refundAmount?: number
	/**
	 * Компенсация за обратную доставку.
	 * @type {number}
	 * @memberof ReturnDecisionDTO
	 */
	partnerCompensation?: number
	/**
	 * Список хеш-кодов фотографий товара от покупателя.
	 * @type {Array<string>}
	 * @memberof ReturnDecisionDTO
	 */
	images?: string[] | null
}

/**
 * Причины возврата:  * `BAD_QUALITY` — бракованный товар (есть недостатки).  * `DOES_NOT_FIT` — товар не подошел.  * `WRONG_ITEM` — привезли не тот товар.  * `DAMAGE_DELIVERY` — товар поврежден при доставке.  * `LOYALTY_FAIL` — невозможно установить виновного в браке/пересорте.  * `CONTENT_FAIL` — ошибочное описание товара по вине Маркета.  * `DELIVERY_FAIL` — товар не привезли.  * `UNKNOWN` — причина не известна.
 * @export
 * @enum {string}
 */

export const ReturnDecisionReasonType = {
	BadQuality: 'BAD_QUALITY',
	DoesNotFit: 'DOES_NOT_FIT',
	WrongItem: 'WRONG_ITEM',
	DamageDelivery: 'DAMAGE_DELIVERY',
	LoyaltyFail: 'LOYALTY_FAIL',
	ContentFail: 'CONTENT_FAIL',
	DeliveryFail: 'DELIVERY_FAIL',
	Unknown: 'UNKNOWN',
} as const

export type ReturnDecisionReasonType =
	(typeof ReturnDecisionReasonType)[keyof typeof ReturnDecisionReasonType]

/**
 * Детали причин возврата:   * `DOES_NOT_FIT`:     * `USER_DID_NOT_LIKE` — товар не понравился.     * `USER_CHANGED_MIND` — передумал покупать.     * `DELIVERED_TOO_LONG` — передумал покупать из-за длительного срока доставки.    * `BAD_QUALITY`:     * `BAD_PACKAGE` — заводская упаковка повреждена.     * `DAMAGED` — царапины, сколы.     * `NOT_WORKING` — не включается, не работает.     * `INCOMPLETENESS` — некомплект (не хватает детали в наборе, к товару).     * `WRAPPING_DAMAGED` — транспортная упаковка повреждена.     * `ITEM_WAS_USED` — следы использования на товаре.     * `BROKEN` — товар разбит.     * `BAD_FLOWERS` — некачественные цветы.    * `WRONG_ITEM`:     * `WRONG_ITEM` — не тот товар.     * `WRONG_COLOR` — цвет не соответствует заявленному.     * `DID_NOT_MATCH_DESCRIPTION` — описание или характеристики не соответствуют заявленным.     * `WRONG_ORDER` — доставили чужой заказ.     * `WRONG_AMOUNT_DELIVERED` — неверное количество товара.     * `PARCEL_MISSING` — часть заказа отсутствует.     * `INCOMPLETE` — заказ не привезли полностью.    * `UNKNOWN` — детали причины не указаны.
 * @export
 * @enum {string}
 */

export const ReturnDecisionSubreasonType = {
	UserDidNotLike: 'USER_DID_NOT_LIKE',
	UserChangedMind: 'USER_CHANGED_MIND',
	DeliveredTooLong: 'DELIVERED_TOO_LONG',
	BadPackage: 'BAD_PACKAGE',
	Damaged: 'DAMAGED',
	NotWorking: 'NOT_WORKING',
	Incompleteness: 'INCOMPLETENESS',
	WrongItem: 'WRONG_ITEM',
	WrongColor: 'WRONG_COLOR',
	DidNotMatchDescription: 'DID_NOT_MATCH_DESCRIPTION',
	WrongOrder: 'WRONG_ORDER',
	WrongAmountDelivered: 'WRONG_AMOUNT_DELIVERED',
	WrappingDamaged: 'WRAPPING_DAMAGED',
	ItemWasUsed: 'ITEM_WAS_USED',
	Broken: 'BROKEN',
	BadFlowers: 'BAD_FLOWERS',
	ParcelMissing: 'PARCEL_MISSING',
	Incomplete: 'INCOMPLETE',
	Unknown: 'UNKNOWN',
} as const

export type ReturnDecisionSubreasonType =
	(typeof ReturnDecisionSubreasonType)[keyof typeof ReturnDecisionSubreasonType]

/**
 * Решение по возврату:  * `REFUND_MONEY` — вернуть деньги покупателю.  * `REFUND_MONEY_INCLUDING_SHIPMENT` — вернуть деньги за товар и пересылку.  * `REPAIR` — отремонтировать товар.  * `REPLACE` — заменить товар.  * `SEND_TO_EXAMINATION` — взять товар на экспертизу.  * `DECLINE_REFUND` — отказать в возврате.  * `OTHER_DECISION` — другое решение.  * `UNKNOWN` — не указано.
 * @export
 * @enum {string}
 */

export const ReturnDecisionType = {
	RefundMoney: 'REFUND_MONEY',
	RefundMoneyIncludingShipment: 'REFUND_MONEY_INCLUDING_SHIPMENT',
	Repair: 'REPAIR',
	Replace: 'REPLACE',
	SendToExamination: 'SEND_TO_EXAMINATION',
	DeclineRefund: 'DECLINE_REFUND',
	OtherDecision: 'OTHER_DECISION',
	Unknown: 'UNKNOWN',
} as const

export type ReturnDecisionType =
	(typeof ReturnDecisionType)[keyof typeof ReturnDecisionType]

/**
 * Логистическая информация по возврату.
 * @export
 * @interface ReturnInstanceDTO
 */
export interface ReturnInstanceDTO {
	/**
	 *
	 * @type {ReturnInstanceStockType}
	 * @memberof ReturnInstanceDTO
	 */
	stockType?: ReturnInstanceStockType
	/**
	 *
	 * @type {ReturnInstanceStatusType}
	 * @memberof ReturnInstanceDTO
	 */
	status?: ReturnInstanceStatusType
	/**
	 * Код идентификации единицы товара [в системе «Честный ЗНАК»](https://честныйзнак.рф/).
	 * @type {string}
	 * @memberof ReturnInstanceDTO
	 */
	cis?: string
	/**
	 * Международный идентификатор мобильного оборудования.
	 * @type {string}
	 * @memberof ReturnInstanceDTO
	 */
	imei?: string
}

/**
 * Логистический статус конкретного товара:  * `CREATED` — возврат создан.  * `RECEIVED` — возврат принят у отправителя.  * `IN_TRANSIT` — возврат в пути.  * `READY_FOR_PICKUP` — возврат готов к выдаче магазину.  * `PICKED` — возврат выдан магазину.  * `RECEIVED_ON_FULFILLMENT` — возврат принят на складе Маркета.  * `CANCELLED` — возврат отменен.  * `LOST` — возврат утерян.  * `UTILIZED` — возврат утилизирован.  * `PREPARED_FOR_UTILIZATION` — возврат готов к утилизации.  * `EXPROPRIATED` — товары в возврате направлены на перепродажу.  * `NOT_IN_DEMAND` — возврат не забрали с почты.
 * @export
 * @enum {string}
 */

export const ReturnInstanceStatusType = {
	Created: 'CREATED',
	Received: 'RECEIVED',
	InTransit: 'IN_TRANSIT',
	ReadyForPickup: 'READY_FOR_PICKUP',
	Picked: 'PICKED',
	ReceivedOnFulfillment: 'RECEIVED_ON_FULFILLMENT',
	Cancelled: 'CANCELLED',
	Lost: 'LOST',
	Utilized: 'UTILIZED',
	PreparedForUtilization: 'PREPARED_FOR_UTILIZATION',
	Expropriated: 'EXPROPRIATED',
	NotInDemand: 'NOT_IN_DEMAND',
} as const

export type ReturnInstanceStatusType =
	(typeof ReturnInstanceStatusType)[keyof typeof ReturnInstanceStatusType]

/**
 * Тип остатка на складе:  * `FIT` — годный.  * `DEFECT` — бракованный.  * `ANOMALY` — аномалия.  * `SURPLUS` — лишний.  * `EXPIRED` — просроченный.  * `MISGRADING` — пересортица.  * `UNDEFINED` — с неизвестным статусом.  * `INCORRECT_IMEI` — товар с некорректным [IMEI](https://ru.wikipedia.org/wiki/IMEI).  * `INCORRECT_SERIAL_NUMBER` — товар с некорректным серийным номером.  * `INCORRECT_CIS` — товар с некорректным кодом идентификации единицы товара [в системе «Честный ЗНАК»](https://честныйзнак.рф/).  * `PART_MISSING` — недостача.  * `NON_COMPLIENT` — товар с множественными несоответствиями.  * `NOT_ACCEPTABLE` — товар, который Маркет не принимает.  * `SERVICE` — сервисный сток.  * `MARKDOWN` — уценка.  * `DEMO` — демо.  * `REPAIR` — ремонт.  * `FIRMWARE` — прошивка.  * `UNKNOWN` — неизвестный тип товара.
 * @export
 * @enum {string}
 */

export const ReturnInstanceStockType = {
	Fit: 'FIT',
	Defect: 'DEFECT',
	Anomaly: 'ANOMALY',
	Surplus: 'SURPLUS',
	Expired: 'EXPIRED',
	Misgrading: 'MISGRADING',
	Undefined: 'UNDEFINED',
	IncorrectImei: 'INCORRECT_IMEI',
	IncorrectSerialNumber: 'INCORRECT_SERIAL_NUMBER',
	IncorrectCis: 'INCORRECT_CIS',
	PartMissing: 'PART_MISSING',
	NonComplient: 'NON_COMPLIENT',
	NotAcceptable: 'NOT_ACCEPTABLE',
	Service: 'SERVICE',
	Markdown: 'MARKDOWN',
	Demo: 'DEMO',
	Repair: 'REPAIR',
	Firmware: 'FIRMWARE',
	Unknown: 'UNKNOWN',
} as const

export type ReturnInstanceStockType =
	(typeof ReturnInstanceStockType)[keyof typeof ReturnInstanceStockType]

/**
 * Список товаров в возврате.
 * @export
 * @interface ReturnItemDTO
 */
export interface ReturnItemDTO {
	/**
	 * SKU на Маркете.
	 * @type {number}
	 * @memberof ReturnItemDTO
	 */
	marketSku?: number
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof ReturnItemDTO
	 */
	shopSku: string
	/**
	 * Количество единиц товара.
	 * @type {number}
	 * @memberof ReturnItemDTO
	 */
	count: number
	/**
	 * Список решений по возврату.
	 * @type {Array<ReturnDecisionDTO>}
	 * @memberof ReturnItemDTO
	 */
	decisions?: ReturnDecisionDTO[] | null
	/**
	 * Список логистических позиций возврата.
	 * @type {Array<ReturnInstanceDTO>}
	 * @memberof ReturnItemDTO
	 */
	instances?: ReturnInstanceDTO[] | null
	/**
	 * Список трек-кодов для почтовых отправлений.
	 * @type {Array<TrackDTO>}
	 * @memberof ReturnItemDTO
	 */
	tracks?: TrackDTO[] | null
}
/**
 * Решение по товару в возврате:  * `REFUND_MONEY` — вернуть деньги за товар. * `REFUND_MONEY_INCLUDING_SHIPMENT` — вернуть деньги за товар и обратную пересылку. * `REPAIR` — магазин устранит недостатки товара. * `REPLACE` — магазин заменит товар. * `SEND_TO_EXAMINATION` — магазин отправит товар на экспертизу. * `DECLINE_REFUND` — не возвращать деньги. * `OTHER_DECISION` — другое решение.
 * @export
 * @enum {string}
 */

export const ReturnRequestDecisionType = {
	RefundMoney: 'REFUND_MONEY',
	RefundMoneyIncludingShipment: 'REFUND_MONEY_INCLUDING_SHIPMENT',
	Repair: 'REPAIR',
	Replace: 'REPLACE',
	SendToExamination: 'SEND_TO_EXAMINATION',
	DeclineRefund: 'DECLINE_REFUND',
	OtherDecision: 'OTHER_DECISION',
} as const

export type ReturnRequestDecisionType =
	(typeof ReturnRequestDecisionType)[keyof typeof ReturnRequestDecisionType]

/**
 * Статус передачи возврата:  * `CREATED` — возврат создан.  * `RECEIVED` — принят у покупателя.  * `IN_TRANSIT` — возврат в пути.  * `READY_FOR_PICKUP` — возврат готов к выдаче магазину.  * `PICKED` — возврат выдан магазину.  * `LOST` — возврат утерян при транспортировке.  * `EXPIRED` — покупатель не принес товар на возврат вовремя.  * `CANCELLED` — возврат отменен.  * `FULFILMENT_RECEIVED` — возврат принят на складе Маркета.  * `PREPARED_FOR_UTILIZATION` — возврат передан в утилизацию.  * `NOT_IN_DEMAND` — возврат не забрали с почты.  * `UTILIZED` — возврат утилизирован.  * `READY_FOR_EXPROPRIATION` — товары в возврате направлены на перепродажу.  * `RECEIVED_FOR_EXPROPRIATION` — товары в возврате приняты для перепродажи.
 * @export
 * @enum {string}
 */

export const ReturnShipmentStatusType = {
	Created: 'CREATED',
	Received: 'RECEIVED',
	InTransit: 'IN_TRANSIT',
	ReadyForPickup: 'READY_FOR_PICKUP',
	Picked: 'PICKED',
	Lost: 'LOST',
	Expired: 'EXPIRED',
	Cancelled: 'CANCELLED',
	FulfilmentReceived: 'FULFILMENT_RECEIVED',
	PreparedForUtilization: 'PREPARED_FOR_UTILIZATION',
	NotInDemand: 'NOT_IN_DEMAND',
	Utilized: 'UTILIZED',
	ReadyForExpropriation: 'READY_FOR_EXPROPRIATION',
	ReceivedForExpropriation: 'RECEIVED_FOR_EXPROPRIATION',
} as const

export type ReturnShipmentStatusType =
	(typeof ReturnShipmentStatusType)[keyof typeof ReturnShipmentStatusType]

/**
 * Тип заказа для фильтрации:  * `RETURN` — возврат.  * `UNREDEEMED` — невыкуп.  Если не указывать, в ответе будут и возвраты, и невыкупы.
 * @export
 * @enum {string}
 */

export const ReturnType = {
	Unredeemed: 'UNREDEEMED',
	Return: 'RETURN',
} as const

export type ReturnType = (typeof ReturnType)[keyof typeof ReturnType]

/**
 * Информация о страницах результатов.
 * @export
 * @interface ScrollingPagerDTO
 */
export interface ScrollingPagerDTO {
	/**
	 * Идентификатор следующей страницы результатов.
	 * @type {string}
	 * @memberof ScrollingPagerDTO
	 */
	nextPageToken?: string
	/**
	 * Идентификатор предыдущей страницы результатов.
	 * @type {string}
	 * @memberof ScrollingPagerDTO
	 */
	prevPageToken?: string
}
/**
 *
 * @export
 * @interface SearchModelsResponse
 */
export interface SearchModelsResponse {
	/**
	 * Список моделей товаров.
	 * @type {Array<ModelDTO>}
	 * @memberof SearchModelsResponse
	 */
	models: ModelDTO[]
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof SearchModelsResponse
	 */
	currency?: CurrencyType
	/**
	 * Идентификатор региона, для которого выводится информация о предложениях модели (доставляемых в этот регион).  Информацию о регионе по идентификатору можно получить с помощью запроса [GET regions/{regionId}](../../reference/regions/searchRegionsById.md).
	 * @type {number}
	 * @memberof SearchModelsResponse
	 */
	regionId?: number
	/**
	 *
	 * @type {FlippingPagerDTO}
	 * @memberof SearchModelsResponse
	 */
	pager?: FlippingPagerDTO
}

/**
 * Запрос информации об отгрузках.
 * @export
 * @interface SearchShipmentsRequest
 */
export interface SearchShipmentsRequest {
	/**
	 * Начальная дата для фильтрации по дате отгрузки (включительно).  Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof SearchShipmentsRequest
	 */
	dateFrom: string
	/**
	 * Конечная дата для фильтрации по дате отгрузки (включительно).  Формат даты: `ДД-ММ-ГГГГ`.
	 * @type {string}
	 * @memberof SearchShipmentsRequest
	 */
	dateTo: string
	/**
	 * Список статусов отгрузок.
	 * @type {Set<ShipmentStatusType>}
	 * @memberof SearchShipmentsRequest
	 */
	statuses?: Set<ShipmentStatusType> | null
	/**
	 * Список идентификаторов заказов из отгрузок.
	 * @type {Set<number>}
	 * @memberof SearchShipmentsRequest
	 */
	orderIds?: Set<number> | null
	/**
	 * Возвращать ли отмененные заказы.  Значение по умолчанию: `true`. Если возвращать отмененные заказы не нужно, передайте значение `false`.
	 * @type {boolean}
	 * @memberof SearchShipmentsRequest
	 */
	cancelledOrders?: boolean
}
/**
 * Ответ на запрос информации об отгрузках.
 * @export
 * @interface SearchShipmentsResponse
 */
export interface SearchShipmentsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof SearchShipmentsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {SearchShipmentsResponseDTO}
	 * @memberof SearchShipmentsResponse
	 */
	result?: SearchShipmentsResponseDTO
}

/**
 * Информация об отгрузках.
 * @export
 * @interface SearchShipmentsResponseDTO
 */
export interface SearchShipmentsResponseDTO {
	/**
	 * Список с информацией об отгрузках.
	 * @type {Array<ShipmentInfoDTO>}
	 * @memberof SearchShipmentsResponseDTO
	 */
	shipments: ShipmentInfoDTO[]
	/**
	 *
	 * @type {ForwardScrollingPagerDTO}
	 * @memberof SearchShipmentsResponseDTO
	 */
	paging?: ForwardScrollingPagerDTO
}
/**
 * Модель размещения:  * `FBY` — FBY. * `FBS` — FBS. * `DBS` — DBS. * `EXPRESS` — Экспресс.
 * @export
 * @enum {string}
 */

export const SellingProgramType = {
	Fby: 'FBY',
	Fbs: 'FBS',
	Dbs: 'DBS',
	Express: 'EXPRESS',
} as const

export type SellingProgramType =
	(typeof SellingProgramType)[keyof typeof SellingProgramType]

/**
 * В какой чат нужно отправить сообщение и текст сообщения.
 * @export
 * @interface SendMessageToChatRequest
 */
export interface SendMessageToChatRequest {
	/**
	 * Текст сообщения.
	 * @type {string}
	 * @memberof SendMessageToChatRequest
	 */
	message: string
}
/**
 * Запрос на обновление изменение параметров прайс-листа.
 * @export
 * @interface SetFeedParamsRequest
 */
export interface SetFeedParamsRequest {
	/**
	 * Параметры прайс-листа.  Обязательный параметр.
	 * @type {Array<FeedParameterDTO>}
	 * @memberof SetFeedParamsRequest
	 */
	parameters: FeedParameterDTO[]
}
/**
 *
 * @export
 * @interface SetOrderBoxLayoutRequest
 */
export interface SetOrderBoxLayoutRequest {
	/**
	 * Список коробок.
	 * @type {Array<OrderBoxLayoutDTO>}
	 * @memberof SetOrderBoxLayoutRequest
	 */
	boxes: OrderBoxLayoutDTO[]
	/**
	 * Передайте `true`, если вы собираетесь удалить часть товаров из заказа.
	 * @type {boolean}
	 * @memberof SetOrderBoxLayoutRequest
	 */
	allowRemove?: boolean
}
/**
 *
 * @export
 * @interface SetOrderBoxLayoutResponse
 */
export interface SetOrderBoxLayoutResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof SetOrderBoxLayoutResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {OrderBoxesLayoutDTO}
	 * @memberof SetOrderBoxLayoutResponse
	 */
	result?: OrderBoxesLayoutDTO
}

/**
 *
 * @export
 * @interface SetOrderDeliveryDateRequest
 */
export interface SetOrderDeliveryDateRequest {
	/**
	 *
	 * @type {OrderDeliveryDateDTO}
	 * @memberof SetOrderDeliveryDateRequest
	 */
	dates: OrderDeliveryDateDTO
	/**
	 *
	 * @type {OrderDeliveryDateReasonType}
	 * @memberof SetOrderDeliveryDateRequest
	 */
	reason: OrderDeliveryDateReasonType
}

/**
 *
 * @export
 * @interface SetOrderDeliveryTrackCodeRequest
 */
export interface SetOrderDeliveryTrackCodeRequest {
	/**
	 * Трек‑номер посылки.
	 * @type {string}
	 * @memberof SetOrderDeliveryTrackCodeRequest
	 */
	trackCode: string
	/**
	 * Идентификатор службы доставки. Информацию о службе доставки можно получить с помощью запроса [GET delivery/services](../../reference/orders/getDeliveryServices.md).
	 * @type {number}
	 * @memberof SetOrderDeliveryTrackCodeRequest
	 */
	deliveryServiceId: number
}
/**
 *
 * @export
 * @interface SetOrderShipmentBoxesRequest
 */
export interface SetOrderShipmentBoxesRequest {
	/**
	 * Список грузовых мест. По его длине Маркет определяет количество мест.
	 * @type {Array<ParcelBoxRequestDTO>}
	 * @memberof SetOrderShipmentBoxesRequest
	 */
	boxes: ParcelBoxRequestDTO[]
}
/**
 *
 * @export
 * @interface SetOrderShipmentBoxesResponse
 */
export interface SetOrderShipmentBoxesResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof SetOrderShipmentBoxesResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {ShipmentBoxesDTO}
	 * @memberof SetOrderShipmentBoxesResponse
	 */
	result?: ShipmentBoxesDTO
}

/**
 * Решения по товару в возврате.
 * @export
 * @interface SetReturnDecisionRequest
 */
export interface SetReturnDecisionRequest {
	/**
	 * Идентификатор товара в возврате.
	 * @type {number}
	 * @memberof SetReturnDecisionRequest
	 */
	returnItemId: number
	/**
	 *
	 * @type {ReturnRequestDecisionType}
	 * @memberof SetReturnDecisionRequest
	 */
	decisionType: ReturnRequestDecisionType
	/**
	 * Комментарий к решению. Укажите:  * для `REFUND_MONEY_INCLUDING_SHIPMENT`— стоимость обратной пересылки.  * для `REPAIR` — когда вы устраните недостатки товара.  * для `DECLINE_REFUND` — причину отказа.  * для `OTHER_DECISION` — какое решение вы предлагаете.
	 * @type {string}
	 * @memberof SetReturnDecisionRequest
	 */
	comment?: string
}

/**
 * Запрос на передачу количества упаковок в отгрузке.
 * @export
 * @interface SetShipmentPalletsCountRequest
 */
export interface SetShipmentPalletsCountRequest {
	/**
	 * Количество упаковок в отгрузке.
	 * @type {number}
	 * @memberof SetShipmentPalletsCountRequest
	 */
	placesCount: number
}
/**
 * Тип атрибуции:   * `CLICKS` — по кликам.   * `SHOWS` — по показам. <br><br>  О том, какие данные в отчете зависят и не зависят от типа атрибуции, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/marketing/shelf#stats).
 * @export
 * @enum {string}
 */

export const ShelfsStatisticsAttributionType = {
	Clicks: 'CLICKS',
	Shows: 'SHOWS',
} as const

export type ShelfsStatisticsAttributionType =
	(typeof ShelfsStatisticsAttributionType)[keyof typeof ShelfsStatisticsAttributionType]

/**
 * Действия с отгрузкой:  * `CONFIRM` — подтвердить отгрузку. * `DOWNLOAD_ACT` — скачать акт приема-передачи отгрузки. * `DOWNLOAD_INBOUND_ACT` — скачать список принятых заказов. * `DOWNLOAD_DISCREPANCY_ACT` — скачать акт расхождений. * `CHANGE_PALLETS_COUNT` — указать количество палет.
 * @export
 * @enum {string}
 */

export const ShipmentActionType = {
	Confirm: 'CONFIRM',
	DownloadAct: 'DOWNLOAD_ACT',
	DownloadInboundAct: 'DOWNLOAD_INBOUND_ACT',
	DownloadDiscrepancyAct: 'DOWNLOAD_DISCREPANCY_ACT',
	ChangePalletsCount: 'CHANGE_PALLETS_COUNT',
} as const

export type ShipmentActionType =
	(typeof ShipmentActionType)[keyof typeof ShipmentActionType]

/**
 * В ответе Маркет возвращает переданный вами список грузовых мест. Не обращайте на это поле внимания.
 * @export
 * @interface ShipmentBoxesDTO
 */
export interface ShipmentBoxesDTO {
	/**
	 * Список грузовых мест. По его длине Маркет определил количество мест.
	 * @type {Array<ParcelBoxDTO>}
	 * @memberof ShipmentBoxesDTO
	 */
	boxes: ParcelBoxDTO[]
}
/**
 * Информация об отгрузке.
 * @export
 * @interface ShipmentDTO
 */
export interface ShipmentDTO {
	/**
	 * Идентификатор отгрузки.
	 * @type {number}
	 * @memberof ShipmentDTO
	 */
	id: number
	/**
	 * Начало планового интервала отгрузки.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof ShipmentDTO
	 */
	planIntervalFrom: string
	/**
	 * Конец планового интервала отгрузки.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof ShipmentDTO
	 */
	planIntervalTo: string
	/**
	 *
	 * @type {ShipmentType}
	 * @memberof ShipmentDTO
	 */
	shipmentType?: ShipmentType
	/**
	 *
	 * @type {PartnerShipmentWarehouseDTO}
	 * @memberof ShipmentDTO
	 */
	warehouse?: PartnerShipmentWarehouseDTO
	/**
	 *
	 * @type {PartnerShipmentWarehouseDTO}
	 * @memberof ShipmentDTO
	 */
	warehouseTo?: PartnerShipmentWarehouseDTO
	/**
	 * Идентификатор отгрузки в вашей системе. Если вы еще не передавали идентификатор, вернется идентификатор из параметра `id`.
	 * @type {string}
	 * @memberof ShipmentDTO
	 */
	externalId?: string
	/**
	 *
	 * @type {DeliveryServiceDTO}
	 * @memberof ShipmentDTO
	 */
	deliveryService?: DeliveryServiceDTO
	/**
	 *
	 * @type {PalletsCountDTO}
	 * @memberof ShipmentDTO
	 */
	palletsCount?: PalletsCountDTO
	/**
	 * Идентификаторы заказов в отгрузке.
	 * @type {Set<number>}
	 * @memberof ShipmentDTO
	 */
	orderIds: Set<number>
	/**
	 * Количество заказов, которое Маркет запланировал к отгрузке.
	 * @type {number}
	 * @memberof ShipmentDTO
	 */
	draftCount: number
	/**
	 * Количество заказов, которое Маркет подтвердил к отгрузке.
	 * @type {number}
	 * @memberof ShipmentDTO
	 */
	plannedCount: number
	/**
	 * Количество заказов, принятых в сортировочном центре или пункте приема.
	 * @type {number}
	 * @memberof ShipmentDTO
	 */
	factCount: number
	/**
	 *
	 * @type {ShipmentStatusChangeDTO}
	 * @memberof ShipmentDTO
	 */
	currentStatus?: ShipmentStatusChangeDTO
	/**
	 * Доступные действия над отгрузкой.
	 * @type {Set<ShipmentActionType>}
	 * @memberof ShipmentDTO
	 */
	availableActions: Set<ShipmentActionType>
}

/**
 * Список с информацией об отгрузках.
 * @export
 * @interface ShipmentInfoDTO
 */
export interface ShipmentInfoDTO {
	/**
	 * Идентификатор отгрузки.
	 * @type {number}
	 * @memberof ShipmentInfoDTO
	 */
	id: number
	/**
	 * Начало планового интервала отгрузки.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof ShipmentInfoDTO
	 */
	planIntervalFrom: string
	/**
	 * Конец планового интервала отгрузки.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof ShipmentInfoDTO
	 */
	planIntervalTo: string
	/**
	 *
	 * @type {ShipmentType}
	 * @memberof ShipmentInfoDTO
	 */
	shipmentType?: ShipmentType
	/**
	 *
	 * @type {PartnerShipmentWarehouseDTO}
	 * @memberof ShipmentInfoDTO
	 */
	warehouse?: PartnerShipmentWarehouseDTO
	/**
	 *
	 * @type {PartnerShipmentWarehouseDTO}
	 * @memberof ShipmentInfoDTO
	 */
	warehouseTo?: PartnerShipmentWarehouseDTO
	/**
	 * Идентификатор отгрузки в вашей системе. Если вы еще не передавали идентификатор, вернется идентификатор из параметра `id`.
	 * @type {string}
	 * @memberof ShipmentInfoDTO
	 */
	externalId?: string
	/**
	 *
	 * @type {DeliveryServiceDTO}
	 * @memberof ShipmentInfoDTO
	 */
	deliveryService?: DeliveryServiceDTO
	/**
	 *
	 * @type {PalletsCountDTO}
	 * @memberof ShipmentInfoDTO
	 */
	palletsCount?: PalletsCountDTO
	/**
	 * Идентификаторы заказов в отгрузке.
	 * @type {Set<number>}
	 * @memberof ShipmentInfoDTO
	 */
	orderIds: Set<number>
	/**
	 * Количество заказов, которое Маркет запланировал к отгрузке.
	 * @type {number}
	 * @memberof ShipmentInfoDTO
	 */
	draftCount: number
	/**
	 * Количество заказов, которое Маркет подтвердил к отгрузке.
	 * @type {number}
	 * @memberof ShipmentInfoDTO
	 */
	plannedCount: number
	/**
	 * Количество заказов, принятых в сортировочном центре или пункте приема.
	 * @type {number}
	 * @memberof ShipmentInfoDTO
	 */
	factCount: number
	/**
	 *
	 * @type {ShipmentStatusType}
	 * @memberof ShipmentInfoDTO
	 */
	status?: ShipmentStatusType
	/**
	 * Описание статуса отгрузки.
	 * @type {string}
	 * @memberof ShipmentInfoDTO
	 */
	statusDescription?: string
	/**
	 * Время последнего изменения статуса отгрузки  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof ShipmentInfoDTO
	 */
	statusUpdateTime?: string
}

/**
 * Формат страницы: * `A4` — формат страницы A4. * `A8` — формат страницы A8.
 * @export
 * @enum {string}
 */

export const ShipmentPalletLabelPageFormatType = {
	A4: 'A4',
	A8: 'A8',
} as const

export type ShipmentPalletLabelPageFormatType =
	(typeof ShipmentPalletLabelPageFormatType)[keyof typeof ShipmentPalletLabelPageFormatType]

/**
 * Статус отгрузки.
 * @export
 * @interface ShipmentStatusChangeDTO
 */
export interface ShipmentStatusChangeDTO {
	/**
	 *
	 * @type {ShipmentStatusType}
	 * @memberof ShipmentStatusChangeDTO
	 */
	status?: ShipmentStatusType
	/**
	 * Описание статуса отгрузки.
	 * @type {string}
	 * @memberof ShipmentStatusChangeDTO
	 */
	description?: string
	/**
	 * Время последнего изменения статуса отгрузки.  Формат даты: ISO 8601 со смещением относительно UTC.
	 * @type {string}
	 * @memberof ShipmentStatusChangeDTO
	 */
	updateTime?: string
}

/**
 * Статус отгрузки:  * `OUTBOUND_CREATED` — формируется. * `OUTBOUND_READY_FOR_CONFIRMATION` — можно обрабатывать. * `OUTBOUND_CONFIRMED` — подтверждена и готова к отправке. * `OUTBOUND_SIGNED` — по ней подписан электронный акт приема-передачи. * `ACCEPTED` — принята в сортировочном центре или пункте приема. * `ACCEPTED_WITH_DISCREPANCIES` — принята с расхождениями. * `FINISHED` — завершена. * `ERROR` — отменена из-за ошибки.
 * @export
 * @enum {string}
 */

export const ShipmentStatusType = {
	OutboundCreated: 'OUTBOUND_CREATED',
	OutboundReadyForConfirmation: 'OUTBOUND_READY_FOR_CONFIRMATION',
	OutboundConfirmed: 'OUTBOUND_CONFIRMED',
	OutboundSigned: 'OUTBOUND_SIGNED',
	Finished: 'FINISHED',
	Accepted: 'ACCEPTED',
	AcceptedWithDiscrepancies: 'ACCEPTED_WITH_DISCREPANCIES',
	Error: 'ERROR',
} as const

export type ShipmentStatusType =
	(typeof ShipmentStatusType)[keyof typeof ShipmentStatusType]

/**
 * Способ отгрузки заказов:  * `IMPORT` — вы самостоятельно привозите заказы в выбранный сортировочный центр или пункт приема заказов. * `WITHDRAW` — вы отгружаете заказы со своего склада курьерам Яндекс Маркета.
 * @export
 * @enum {string}
 */

export const ShipmentType = {
	Import: 'IMPORT',
	Withdraw: 'WITHDRAW',
} as const

export type ShipmentType = (typeof ShipmentType)[keyof typeof ShipmentType]

/**
 * Группировка данных отчета. Возможные значения: * `CATEGORIES` — группировка по категориям. * `OFFERS` — группировка по товарам.
 * @export
 * @enum {string}
 */

export const ShowsSalesGroupingType = {
	Categories: 'CATEGORIES',
	Offers: 'OFFERS',
} as const

export type ShowsSalesGroupingType =
	(typeof ShowsSalesGroupingType)[keyof typeof ShowsSalesGroupingType]

/**
 * Идентификаторы отзывов.
 * @export
 * @interface SkipGoodsFeedbackReactionRequest
 */
export interface SkipGoodsFeedbackReactionRequest {
	/**
	 * Список идентификаторов отзывов, на которые магазин не будет отвечать.
	 * @type {Set<number>}
	 * @memberof SkipGoodsFeedbackReactionRequest
	 */
	feedbackIds: Set<number>
}
/**
 * Список товаров и ставок на них.
 * @export
 * @interface SkuBidItemDTO
 */
export interface SkuBidItemDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof SkuBidItemDTO
	 */
	sku: string
	/**
	 * Значение ставки.
	 * @type {number}
	 * @memberof SkuBidItemDTO
	 */
	bid: number
}
/**
 * Список товаров с рекомендованными ставками.
 * @export
 * @interface SkuBidRecommendationItemDTO
 */
export interface SkuBidRecommendationItemDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof SkuBidRecommendationItemDTO
	 */
	sku: string
	/**
	 * Значение ставки.
	 * @type {number}
	 * @memberof SkuBidRecommendationItemDTO
	 */
	bid: number
	/**
	 * Список рекомендованных ставок с соответствующими долями показов и доступными дополнительными инструментами продвижения.  Чем больше ставка, тем большую долю показов она помогает получить и тем больше дополнительных инструментов продвижения доступно.
	 * @type {Array<BidRecommendationItemDTO>}
	 * @memberof SkuBidRecommendationItemDTO
	 */
	bidRecommendations?: BidRecommendationItemDTO[] | null
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Рекомендованные цены.
	 * @type {Array<PriceRecommendationItemDTO>}
	 * @memberof SkuBidRecommendationItemDTO
	 * @deprecated
	 */
	priceRecommendations?: PriceRecommendationItemDTO[] | null
}
/**
 * Направление сортировки.  Возможные значения: - `ASC` — сортировка по возрастанию. - `DESC` — сортировка по убыванию.
 * @export
 * @enum {string}
 */

export const SortOrderType = {
	Asc: 'ASC',
	Desc: 'DESC',
} as const

export type SortOrderType = (typeof SortOrderType)[keyof typeof SortOrderType]

/**
 * Товар, для которого требуется получить цены для продвижения.
 * @export
 * @interface SuggestOfferPriceDTO
 */
export interface SuggestOfferPriceDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof SuggestOfferPriceDTO
	 */
	offerId?: string
	/**
	 * SKU на Маркете.
	 * @type {number}
	 * @memberof SuggestOfferPriceDTO
	 */
	marketSku?: number
}
/**
 * Запрос на получение списка цен для продвижения.
 * @export
 * @interface SuggestPricesRequest
 */
export interface SuggestPricesRequest {
	/**
	 * Список товаров.
	 * @type {Array<SuggestOfferPriceDTO>}
	 * @memberof SuggestPricesRequest
	 */
	offers: SuggestOfferPriceDTO[]
}
/**
 * Ответ на запрос списка цен для продвижения.
 * @export
 * @interface SuggestPricesResponse
 */
export interface SuggestPricesResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof SuggestPricesResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {SuggestPricesResultDTO}
	 * @memberof SuggestPricesResponse
	 */
	result?: SuggestPricesResultDTO
}

/**
 * Результат запроса цен для продвижения.
 * @export
 * @interface SuggestPricesResultDTO
 */
export interface SuggestPricesResultDTO {
	/**
	 * Список товаров с ценами для продвижения.
	 * @type {Array<PriceSuggestOfferDTO>}
	 * @memberof SuggestPricesResultDTO
	 */
	offers: PriceSuggestOfferDTO[]
}
/**
 * Информация о товаре.
 * @export
 * @interface SuggestedOfferDTO
 */
export interface SuggestedOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof SuggestedOfferDTO
	 */
	offerId?: string
	/**
	 * Составляйте название по схеме: тип + бренд или производитель + модель + особенности, если есть (например, цвет, размер или вес) и количество в упаковке.  Не включайте в название условия продажи (например, «скидка», «бесплатная доставка» и т. д.), эмоциональные характеристики («хит», «супер» и т. д.). Не пишите слова большими буквами — кроме устоявшихся названий брендов и моделей.  Оптимальная длина — 50–60 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/title.html)
	 * @type {string}
	 * @memberof SuggestedOfferDTO
	 */
	name?: string
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `marketCategoryId`.  {% endnote %}  Категория товара в вашем магазине.
	 * @type {string}
	 * @memberof SuggestedOfferDTO
	 * @deprecated
	 */
	category?: string
	/**
	 * Название бренда или производителя. Должно быть записано так, как его пишет сам бренд.
	 * @type {string}
	 * @memberof SuggestedOfferDTO
	 */
	vendor?: string
	/**
	 * Указывайте в виде последовательности цифр. Подойдут коды EAN-13, EAN-8, UPC-A, UPC-E или Code 128.  Для книг указывайте ISBN.  Для товаров [определенных категорий и торговых марок](https://yastatic.net/s3/doc-binary/src/support/market/ru/yandex-market-list-for-gtin.xlsx) штрихкод должен быть действительным кодом GTIN. Обратите внимание: внутренние штрихкоды, начинающиеся на 2 или 02, и коды формата Code 128 не являются GTIN.  [Что такое GTIN](*gtin)
	 * @type {Array<string>}
	 * @memberof SuggestedOfferDTO
	 */
	barcodes?: string[] | null
	/**
	 * Подробное описание товара: например, его преимущества и особенности.  Не давайте в описании инструкций по установке и сборке. Не используйте слова «скидка», «распродажа», «дешевый», «подарок» (кроме подарочных категорий), «бесплатно», «акция», «специальная цена», «новинка», «new», «аналог», «заказ», «хит». Не указывайте никакой контактной информации и не давайте ссылок.  Можно использовать теги:  * \\<h>, \\<h1>, \\<h2> и так далее — для заголовков; * \\<br> и \\<p> — для переноса строки; * \\<ol> — для нумерованного списка; * \\<ul> — для маркированного списка; * \\<li> — для создания элементов списка (должен находиться внутри \\<ol> или \\<ul>); * \\<div> — поддерживается, но не влияет на отображение текста.  Оптимальная длина — 400–600 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/description.html)
	 * @type {string}
	 * @memberof SuggestedOfferDTO
	 */
	description?: string
	/**
	 * Артикул товара от производителя.
	 * @type {string}
	 * @memberof SuggestedOfferDTO
	 */
	vendorCode?: string
	/**
	 *
	 * @type {BasePriceDTO}
	 * @memberof SuggestedOfferDTO
	 */
	basicPrice?: BasePriceDTO
}
/**
 * Товар с соответствующей карточкой на Маркете.
 * @export
 * @interface SuggestedOfferMappingDTO
 */
export interface SuggestedOfferMappingDTO {
	/**
	 *
	 * @type {SuggestedOfferDTO}
	 * @memberof SuggestedOfferMappingDTO
	 */
	offer?: SuggestedOfferDTO
	/**
	 *
	 * @type {GetMappingDTO}
	 * @memberof SuggestedOfferMappingDTO
	 */
	mapping?: GetMappingDTO
}
/**
 * Информация о тарифах, по которым нужно заплатить за услуги Маркета.
 * @export
 * @interface TariffDTO
 */
export interface TariffDTO {
	/**
	 *
	 * @type {TariffType}
	 * @memberof TariffDTO
	 */
	type: TariffType
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Не используйте его.  {% endnote %}  Значение тарифа в процентах.
	 * @type {number}
	 * @memberof TariffDTO
	 * @deprecated
	 */
	percent?: number
	/**
	 * Значение тарифа в рублях.
	 * @type {number}
	 * @memberof TariffDTO
	 */
	amount: number
	/**
	 * Параметры расчета тарифа.
	 * @type {Array<TariffParameterDTO>}
	 * @memberof TariffDTO
	 */
	parameters: TariffParameterDTO[]
}

/**
 * Детали расчета конкретной услуги Маркета.
 * @export
 * @interface TariffParameterDTO
 */
export interface TariffParameterDTO {
	/**
	 * Название параметра.
	 * @type {string}
	 * @memberof TariffParameterDTO
	 */
	name: string
	/**
	 * Значение параметра.
	 * @type {string}
	 * @memberof TariffParameterDTO
	 */
	value: string
}
/**
 * Услуга Маркета или дополнительный тариф к услуге размещения:  * `AGENCY_COMMISSION` — прием платежа покупателя.  * `PAYMENT_TRANSFER` — перевод платежа покупателя.  * `STORAGE` — хранение товара на складе Маркета в течение суток.  * `SURPLUS` — хранение излишков на складе Маркета.  * `WITHDRAW` — вывоз товара со склада Маркета.  * `FEE` — размещение товара на Маркете.  * `DELIVERY_TO_CUSTOMER` — доставка покупателю.  * `CROSSREGIONAL_DELIVERY` — доставка в федеральный округ, город или населенный пункт.  * `CROSSREGIONAL_DELIVERY_RETURN` — доставка невыкупов и возвратов.  * `DISPOSAL` — утилизация.  * `SORTING_CENTER_STORAGE` — хранение невыкупов и возвратов.  * `EXPRESS_DELIVERY` — экспресс-доставка покупателю.  * `FF_XDOC_SUPPLY_BOX` — поставка товара через транзитный склад (за короб).  * `FF_XDOC_SUPPLY_PALLET` — поставка товара через транзитный склад (за палету).  * `SORTING` — обработка заказа.  * `MIDDLE_MILE` — средняя миля.  * `RETURN_PROCESSING` — обработка невыкупов и возвратов.  * `EXPRESS_CANCELLED_BY_PARTNER` — отмена заказа с экспресс-доставкой.  * `CROSSBORDER_DELIVERY` — доставка из-за рубежа.  * `INTAKE_SORTING_BULKY_CARGO` — сортировка заказов с крупногабаритными товарами, которые Маркет забрал со склада продавца.  * `INTAKE_SORTING_SMALL_GOODS` — сортировка заказов с малогабаритными товарами, которые Маркет забрал со склада продавца.  * `INTAKE_SORTING_DAILY` — организация забора заказов со склада продавца.  * `FF_STORAGE_BILLING` — хранения товаров на складе.  * `CANCELLED_ORDER_FEE_QI` — отмена заказа по вине продавца.  * `LATE_ORDER_EXECUTION_FEE_QI` — несвоевременная отгрузка или доставка.  Подробнее об услугах Маркета читайте [в Справке Маркета для продавцов](https://yandex.ru/support/marketplace/introduction/rates/index.html).
 * @export
 * @enum {string}
 */

export const TariffType = {
	AgencyCommission: 'AGENCY_COMMISSION',
	PaymentTransfer: 'PAYMENT_TRANSFER',
	Storage: 'STORAGE',
	Withdraw: 'WITHDRAW',
	Surplus: 'SURPLUS',
	Fee: 'FEE',
	DeliveryToCustomer: 'DELIVERY_TO_CUSTOMER',
	CrossregionalDelivery: 'CROSSREGIONAL_DELIVERY',
	CrossregionalDeliveryReturn: 'CROSSREGIONAL_DELIVERY_RETURN',
	Disposal: 'DISPOSAL',
	SortingCenterStorage: 'SORTING_CENTER_STORAGE',
	ExpressDelivery: 'EXPRESS_DELIVERY',
	FfXdocSupplyBox: 'FF_XDOC_SUPPLY_BOX',
	FfXdocSupplyPallet: 'FF_XDOC_SUPPLY_PALLET',
	Sorting: 'SORTING',
	MiddleMile: 'MIDDLE_MILE',
	ReturnProcessing: 'RETURN_PROCESSING',
	ExpressCancelledByPartner: 'EXPRESS_CANCELLED_BY_PARTNER',
	CrossborderDelivery: 'CROSSBORDER_DELIVERY',
	IntakeSortingBulkyCargo: 'INTAKE_SORTING_BULKY_CARGO',
	IntakeSortingSmallGoods: 'INTAKE_SORTING_SMALL_GOODS',
	IntakeSortingDaily: 'INTAKE_SORTING_DAILY',
	FfStorageBilling: 'FF_STORAGE_BILLING',
	CancelledOrderFeeQi: 'CANCELLED_ORDER_FEE_QI',
	LateOrderExecutionFeeQi: 'LATE_ORDER_EXECUTION_FEE_QI',
} as const

export type TariffType = (typeof TariffType)[keyof typeof TariffType]

/**
 * Временной отрезок с комментарием. Требования к содержанию комментария зависят от контекста использования параметра и указаны в описании поля, которое его содержит.
 * @export
 * @interface TimePeriodDTO
 */
export interface TimePeriodDTO {
	/**
	 * Продолжительность в указанных единицах.
	 * @type {number}
	 * @memberof TimePeriodDTO
	 */
	timePeriod: number
	/**
	 *
	 * @type {TimeUnitType}
	 * @memberof TimePeriodDTO
	 */
	timeUnit: TimeUnitType
	/**
	 * Комментарий.
	 * @type {string}
	 * @memberof TimePeriodDTO
	 */
	comment?: string
}

/**
 * Единица измерения времени:  * `HOUR` — час. * `DAY` — сутки. * `WEEK` — неделя. * `MONTH` — месяц. * `YEAR` — год.
 * @export
 * @enum {string}
 */

export const TimeUnitType = {
	Hour: 'HOUR',
	Day: 'DAY',
	Week: 'WEEK',
	Month: 'MONTH',
	Year: 'YEAR',
} as const

export type TimeUnitType = (typeof TimeUnitType)[keyof typeof TimeUnitType]

/**
 * Информация о трек-номерах.
 * @export
 * @interface TrackDTO
 */
export interface TrackDTO {
	/**
	 * Трек-код почтового отправления.
	 * @type {string}
	 * @memberof TrackDTO
	 */
	trackCode?: string
}
/**
 * Запрос переноса заказов из отгрузки.
 * @export
 * @interface TransferOrdersFromShipmentRequest
 */
export interface TransferOrdersFromShipmentRequest {
	/**
	 * Список заказов, которые вы не успеваете подготовить.
	 * @type {Array<number>}
	 * @memberof TransferOrdersFromShipmentRequest
	 */
	orderIds: number[]
}
/**
 * Информация об оборачиваемости товара.
 * @export
 * @interface TurnoverDTO
 */
export interface TurnoverDTO {
	/**
	 *
	 * @type {TurnoverType}
	 * @memberof TurnoverDTO
	 */
	turnover: TurnoverType
	/**
	 * Значение в днях. [Что это за число?](https://yandex.ru/support/marketplace/analytics/turnover.html)
	 * @type {number}
	 * @memberof TurnoverDTO
	 */
	turnoverDays?: number
}

/**
 * Оценка оборачиваемости.  |enum|Диапазон оборачиваемости|Комментарий| |-|-|-| |`LOW`|`turnoverDays` ≥ 120|| |`ALMOST_LOW`|100 ≤ `turnoverDays` < 120|| |`HIGH`|45 ≤ `turnoverDays` < 100|| |`VERY_HIGH`|0 ≤ `turnoverDays` < 45|| |`NO_SALES`|—|Продаж нет.| |`FREE_STORE`|Любое значение.|Товары этой категории сейчас хранятся бесплатно.|
 * @export
 * @enum {string}
 */

export const TurnoverType = {
	Low: 'LOW',
	AlmostLow: 'ALMOST_LOW',
	High: 'HIGH',
	VeryHigh: 'VERY_HIGH',
	NoSales: 'NO_SALES',
	FreeStore: 'FREE_STORE',
} as const

export type TurnoverType = (typeof TurnoverType)[keyof typeof TurnoverType]

/**
 * Единица измерения.
 * @export
 * @interface UnitDTO
 */
export interface UnitDTO {
	/**
	 * Идентификатор единицы измерения.
	 * @type {number}
	 * @memberof UnitDTO
	 */
	id: number
	/**
	 * Сокращенное название единицы измерения.
	 * @type {string}
	 * @memberof UnitDTO
	 */
	name: string
	/**
	 * Полное название единицы измерения.
	 * @type {string}
	 * @memberof UnitDTO
	 */
	fullName: string
}
/**
 * Товар с новой ценой.
 * @export
 * @interface UpdateBusinessOfferPriceDTO
 */
export interface UpdateBusinessOfferPriceDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof UpdateBusinessOfferPriceDTO
	 */
	offerId: string
	/**
	 *
	 * @type {UpdatePriceWithDiscountDTO}
	 * @memberof UpdateBusinessOfferPriceDTO
	 */
	price: UpdatePriceWithDiscountDTO
}
/**
 * Запрос на установку цен, которые действуют во всех магазинах.
 * @export
 * @interface UpdateBusinessPricesRequest
 */
export interface UpdateBusinessPricesRequest {
	/**
	 * Список товаров с ценами.
	 * @type {Array<UpdateBusinessOfferPriceDTO>}
	 * @memberof UpdateBusinessPricesRequest
	 */
	offers: UpdateBusinessOfferPriceDTO[]
}
/**
 * Параметры размещения товара в магазине.
 * @export
 * @interface UpdateCampaignOfferDTO
 */
export interface UpdateCampaignOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof UpdateCampaignOfferDTO
	 */
	offerId: string
	/**
	 *
	 * @type {QuantumDTO}
	 * @memberof UpdateCampaignOfferDTO
	 */
	quantum?: QuantumDTO
	/**
	 * Есть ли товар в продаже.
	 * @type {boolean}
	 * @memberof UpdateCampaignOfferDTO
	 */
	available?: boolean
	/**
	 * Идентификатор НДС, применяемый для товара:  * `2` — НДС 10%. Например, используется при реализации отдельных продовольственных и медицинских товаров. * `5` — НДС 0%. Например, используется при продаже товаров, вывезенных в таможенной процедуре экспорта, или при оказании услуг по международной перевозке товаров. * `6` — НДС не облагается, используется только для отдельных видов услуг. * `7` — НДС 20%. Основной НДС с 2019 года. * `9` — НДС 12%. Используется только в Узбекистане. * `10` — НДС 5%. НДС для упрощенной системы налогообложения (УСН). * `11` — НДС 7%. НДС для упрощенной системы налогообложения (УСН).  Если параметр не указан, используется НДС, установленный в кабинете.
	 * @type {number}
	 * @memberof UpdateCampaignOfferDTO
	 */
	vat?: number
}
/**
 * Запрос на обновление предложений товаров магазина.
 * @export
 * @interface UpdateCampaignOffersRequest
 */
export interface UpdateCampaignOffersRequest {
	/**
	 * Параметры размещения товаров в заданном магазине.
	 * @type {Array<UpdateCampaignOfferDTO>}
	 * @memberof UpdateCampaignOffersRequest
	 */
	offers: UpdateCampaignOfferDTO[]
}
/**
 * Комментарий к отзыву или другому комментарию.
 * @export
 * @interface UpdateGoodsFeedbackCommentDTO
 */
export interface UpdateGoodsFeedbackCommentDTO {
	/**
	 * Идентификатор комментария к отзыву.
	 * @type {number}
	 * @memberof UpdateGoodsFeedbackCommentDTO
	 */
	id?: number
	/**
	 * Идентификатор комментария к отзыву.
	 * @type {number}
	 * @memberof UpdateGoodsFeedbackCommentDTO
	 */
	parentId?: number
	/**
	 * Текст комментария.
	 * @type {string}
	 * @memberof UpdateGoodsFeedbackCommentDTO
	 */
	text: string
}
/**
 * Комментарий к отзыву.
 * @export
 * @interface UpdateGoodsFeedbackCommentRequest
 */
export interface UpdateGoodsFeedbackCommentRequest {
	/**
	 * Идентификатор отзыва.
	 * @type {number}
	 * @memberof UpdateGoodsFeedbackCommentRequest
	 */
	feedbackId: number
	/**
	 *
	 * @type {UpdateGoodsFeedbackCommentDTO}
	 * @memberof UpdateGoodsFeedbackCommentRequest
	 */
	comment: UpdateGoodsFeedbackCommentDTO
}
/**
 *
 * @export
 * @interface UpdateGoodsFeedbackCommentResponse
 */
export interface UpdateGoodsFeedbackCommentResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof UpdateGoodsFeedbackCommentResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {GoodsFeedbackCommentDTO}
	 * @memberof UpdateGoodsFeedbackCommentResponse
	 */
	result?: GoodsFeedbackCommentDTO
}

/**
 * Карточка на Маркете, которая, с вашей точки зрения, подходит товару. Чтобы определить идентификатор подходящей карточки, воспользуйтесь поиском в кабинете (**Товары** → **Каталог** → **Загрузить товары**).  По результатам проверки Маркет может привязать товар к более подходящей карточке.
 * @export
 * @interface UpdateMappingDTO
 */
export interface UpdateMappingDTO {
	/**
	 * SKU на Маркете.
	 * @type {number}
	 * @memberof UpdateMappingDTO
	 */
	marketSku?: number
}
/**
 * Информация о товарах в каталоге.
 * @export
 * @interface UpdateMappingsOfferDTO
 */
export interface UpdateMappingsOfferDTO {
	/**
	 * Составляйте название по схеме: тип + бренд или производитель + модель + особенности, если есть (например, цвет, размер или вес) и количество в упаковке.  Не включайте в название условия продажи (например, «скидка», «бесплатная доставка» и т. д.), эмоциональные характеристики («хит», «супер» и т. д.). Не пишите слова большими буквами — кроме устоявшихся названий брендов и моделей.  Оптимальная длина — 50–60 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/title.html)
	 * @type {string}
	 * @memberof UpdateMappingsOfferDTO
	 */
	name?: string
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof UpdateMappingsOfferDTO
	 */
	shopSku?: string
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `marketCategoryId`.  {% endnote %}  Категория товара в вашем магазине.
	 * @type {string}
	 * @memberof UpdateMappingsOfferDTO
	 * @deprecated
	 */
	category?: string
	/**
	 * Название бренда или производителя. Должно быть записано так, как его пишет сам бренд.
	 * @type {string}
	 * @memberof UpdateMappingsOfferDTO
	 */
	vendor?: string
	/**
	 * Артикул товара от производителя.
	 * @type {string}
	 * @memberof UpdateMappingsOfferDTO
	 */
	vendorCode?: string
	/**
	 * Подробное описание товара: например, его преимущества и особенности.  Не давайте в описании инструкций по установке и сборке. Не используйте слова «скидка», «распродажа», «дешевый», «подарок» (кроме подарочных категорий), «бесплатно», «акция», «специальная цена», «новинка», «new», «аналог», «заказ», «хит». Не указывайте никакой контактной информации и не давайте ссылок.  Можно использовать теги:  * \\<h>, \\<h1>, \\<h2> и так далее — для заголовков; * \\<br> и \\<p> — для переноса строки; * \\<ol> — для нумерованного списка; * \\<ul> — для маркированного списка; * \\<li> — для создания элементов списка (должен находиться внутри \\<ol> или \\<ul>); * \\<div> — поддерживается, но не влияет на отображение текста.  Оптимальная длина — 400–600 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/description.html)
	 * @type {string}
	 * @memberof UpdateMappingsOfferDTO
	 */
	description?: string
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof UpdateMappingsOfferDTO
	 */
	id?: string
	/**
	 * Идентификатор фида.
	 * @type {number}
	 * @memberof UpdateMappingsOfferDTO
	 */
	feedId?: number
	/**
	 * Указывайте в виде последовательности цифр. Подойдут коды EAN-13, EAN-8, UPC-A, UPC-E или Code 128.  Для книг указывайте ISBN.  Для товаров [определенных категорий и торговых марок](https://yastatic.net/s3/doc-binary/src/support/market/ru/yandex-market-list-for-gtin.xlsx) штрихкод должен быть действительным кодом GTIN. Обратите внимание: внутренние штрихкоды, начинающиеся на 2 или 02, и коды формата Code 128 не являются GTIN.  [Что такое GTIN](*gtin)
	 * @type {Array<string>}
	 * @memberof UpdateMappingsOfferDTO
	 */
	barcodes?: string[] | null
	/**
	 * URL фотографии товара или страницы с описанием на вашем сайте.  Переданные данные не будут отображаться на витрине, но они помогут специалистам Маркета найти карточку для вашего товара.  Должен содержать один вложенный параметр url.
	 * @type {Array<string>}
	 * @memberof UpdateMappingsOfferDTO
	 */
	urls?: string[] | null
	/**
	 * Ссылки (URL) изображений товара в хорошем качестве.  Можно указать до 30 ссылок. При этом изображение по первой ссылке будет основным. Оно используется в качестве изображения товара в поиске Маркета и на карточке товара. Другие изображения товара доступны в режиме просмотра увеличенных изображений.  Обязательный параметр.  Должен содержать хотя бы один вложенный параметр `picture`.
	 * @type {Array<string>}
	 * @memberof UpdateMappingsOfferDTO
	 */
	pictures?: string[] | null
	/**
	 * Изготовитель товара: компания, которая произвела товар, ее адрес и регистрационный номер (если есть).  Необязательный параметр.
	 * @type {string}
	 * @memberof UpdateMappingsOfferDTO
	 */
	manufacturer?: string
	/**
	 * Список стран, в которых произведен товар.  Обязательный параметр.  Должен содержать хотя бы одну, но не больше 5 стран.
	 * @type {Array<string>}
	 * @memberof UpdateMappingsOfferDTO
	 */
	manufacturerCountries?: string[] | null
	/**
	 * Минимальное количество единиц товара, которое вы поставляете на склад.  Например, если вы поставляете детское питание партиями минимум по 10 коробок, а в каждой коробке по 6 баночек, укажите значение 60.
	 * @type {number}
	 * @memberof UpdateMappingsOfferDTO
	 */
	minShipment?: number
	/**
	 * Количество единиц товара в одной упаковке, которую вы поставляете на склад.  Например, если вы поставляете детское питание коробками по 6 баночек, укажите значение 6.
	 * @type {number}
	 * @memberof UpdateMappingsOfferDTO
	 */
	transportUnitSize?: number
	/**
	 * Добавочная партия: по сколько единиц товара можно добавлять к минимальному количеству minShipment.  Например, если вы поставляете детское питание партиями минимум по 10 коробок и хотите добавлять к минимальной партии по 2 коробки, а в каждой коробке по 6 баночек, укажите значение 12.
	 * @type {number}
	 * @memberof UpdateMappingsOfferDTO
	 */
	quantumOfSupply?: number
	/**
	 * Срок, за который продавец поставляет товары на склад, в днях.
	 * @type {number}
	 * @memberof UpdateMappingsOfferDTO
	 */
	deliveryDurationDays?: number
	/**
	 * Сколько мест (если больше одного) занимает товар.  Параметр указывается, только если товар занимает больше одного места (например, кондиционер занимает два места: внешний и внутренний блоки в двух коробках). Если товар занимает одно место, не указывайте этот параметр.
	 * @type {number}
	 * @memberof UpdateMappingsOfferDTO
	 */
	boxCount?: number
	/**
	 * Список кодов товара в единой Товарной номенклатуре внешнеэкономической деятельности (ТН ВЭД).  Обязательный параметр, если товар подлежит особому учету (например, в системе «Меркурий» как продукция животного происхождения или в системе «Честный ЗНАК»).  Может содержать только один вложенный код ТН ВЭД.
	 * @type {Array<string>}
	 * @memberof UpdateMappingsOfferDTO
	 */
	customsCommodityCodes?: string[] | null
	/**
	 *
	 * @type {OfferWeightDimensionsDTO}
	 * @memberof UpdateMappingsOfferDTO
	 */
	weightDimensions?: OfferWeightDimensionsDTO
	/**
	 * Дни недели, в которые продавец поставляет товары на склад.
	 * @type {Array<DayOfWeekType>}
	 * @memberof UpdateMappingsOfferDTO
	 */
	supplyScheduleDays?: DayOfWeekType[] | null
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `shelfLife`. Совместное использование обоих параметров приведет к ошибке.  {% endnote %}  Срок годности: через сколько дней товар станет непригоден для использования.
	 * @type {number}
	 * @memberof UpdateMappingsOfferDTO
	 */
	shelfLifeDays?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `lifeTime`. Совместное использование обоих параметров приведет к ошибке.  {% endnote %}  Срок службы: сколько дней товар будет исправно выполнять свою функцию, а изготовитель — нести ответственность за его существенные недостатки.
	 * @type {number}
	 * @memberof UpdateMappingsOfferDTO
	 */
	lifeTimeDays?: number
	/**
	 * Гарантийный срок товара: сколько дней возможно обслуживание и ремонт товара или возврат денег, а изготовитель или продавец будет нести ответственность за недостатки товара.
	 * @type {number}
	 * @memberof UpdateMappingsOfferDTO
	 */
	guaranteePeriodDays?: number
	/**
	 *
	 * @type {OfferProcessingStateDTO}
	 * @memberof UpdateMappingsOfferDTO
	 */
	processingState?: OfferProcessingStateDTO
	/**
	 *
	 * @type {OfferAvailabilityStatusType}
	 * @memberof UpdateMappingsOfferDTO
	 */
	availability?: OfferAvailabilityStatusType
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof UpdateMappingsOfferDTO
	 */
	shelfLife?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof UpdateMappingsOfferDTO
	 */
	lifeTime?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof UpdateMappingsOfferDTO
	 */
	guaranteePeriod?: TimePeriodDTO
	/**
	 * Номер документа на товар.  Перед указанием номера документ нужно загрузить в кабинете продавца на Маркете. [Инструкция](https://yandex.ru/support/marketplace/assortment/restrictions/certificates.html)
	 * @type {string}
	 * @memberof UpdateMappingsOfferDTO
	 */
	certificate?: string
}

/**
 * Запрос на установку новых значений для параметров.
 * @export
 * @interface UpdateOfferContentRequest
 */
export interface UpdateOfferContentRequest {
	/**
	 * Список товаров с указанными характеристиками.
	 * @type {Array<OfferContentDTO>}
	 * @memberof UpdateOfferContentRequest
	 */
	offersContent: OfferContentDTO[]
}
/**
 * Описывает проблемы, которые появились при сохранении товара.
 * @export
 * @interface UpdateOfferContentResponse
 */
export interface UpdateOfferContentResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof UpdateOfferContentResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Ошибки и предупреждения, которые появились при обработке переданных значений. Каждый элемент списка соответствует одному товару.  Если ошибок и предупреждений нет, поле не передается.
	 * @type {Array<UpdateOfferContentResultDTO>}
	 * @memberof UpdateOfferContentResponse
	 */
	results?: UpdateOfferContentResultDTO[] | null
}

/**
 * Ошибки и предупреждения, которые появились из-за переданных характеристик.
 * @export
 * @interface UpdateOfferContentResultDTO
 */
export interface UpdateOfferContentResultDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof UpdateOfferContentResultDTO
	 */
	offerId: string
	/**
	 * Ошибки.  Если хотя бы по одному товару есть ошибка, информация в каталоге не обновится по всем переданным товарам.
	 * @type {Array<OfferContentErrorDTO>}
	 * @memberof UpdateOfferContentResultDTO
	 */
	errors?: OfferContentErrorDTO[] | null
	/**
	 * Предупреждения.  Информация в каталоге обновится.
	 * @type {Array<OfferContentErrorDTO>}
	 * @memberof UpdateOfferContentResultDTO
	 */
	warnings?: OfferContentErrorDTO[] | null
}
/**
 * Параметры товара.
 * @export
 * @interface UpdateOfferDTO
 */
export interface UpdateOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof UpdateOfferDTO
	 */
	offerId: string
	/**
	 * Составляйте название по схеме: тип + бренд или производитель + модель + особенности, если есть (например, цвет, размер или вес) и количество в упаковке.  Не включайте в название условия продажи (например, «скидка», «бесплатная доставка» и т. д.), эмоциональные характеристики («хит», «супер» и т. д.). Не пишите слова большими буквами — кроме устоявшихся названий брендов и моделей.  Оптимальная длина — 50–60 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/title.html)
	 * @type {string}
	 * @memberof UpdateOfferDTO
	 */
	name?: string
	/**
	 * Идентификатор категории на Маркете, к которой вы относите свой товар.  Если не указать `marketCategoryId`, то маркетная категория будет определена автоматически.  При изменении категории убедитесь, что характеристики товара и их значения в параметре `parameterValues` вы передаете для новой категории.  Список категорий Маркета можно получить с помощью запроса  [POST categories/tree](../../reference/categories/getCategoriesTree.md).
	 * @type {number}
	 * @memberof UpdateOfferDTO
	 */
	marketCategoryId?: number
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `marketCategoryId`.  {% endnote %}  Категория товара в вашем магазине.
	 * @type {string}
	 * @memberof UpdateOfferDTO
	 * @deprecated
	 */
	category?: string
	/**
	 * Ссылки на изображения товара. Изображение по первой ссылке считается основным, остальные дополнительными.  **Требования к ссылкам**  * Ссылок может быть до 30. * Указывайте ссылку целиком, включая протокол http или https. * Максимальная длина — 512 символов. * Русские буквы в URL можно. * Можно использовать прямые ссылки на изображения и на Яндекс Диск. Ссылки на Яндекс Диске нужно копировать с помощью функции **Поделиться**. Относительные ссылки и ссылки на другие облачные хранилища — не работают.  ✅ `https://example-shop.ru/images/sku12345.jpg`  ✅ `https://yadi.sk/i/NaBoRsimVOLov`  ❌ `/images/sku12345.jpg`  ❌ `https://www.dropbox.com/s/818f/tovar.jpg`  Ссылки на изображение должны быть постоянными. Нельзя использовать динамические ссылки, меняющиеся от выгрузки к выгрузке.  Если нужно заменить изображение, выложите новое изображение по новой ссылке, а ссылку на старое удалите. Если просто заменить изображение по старой ссылке, оно не обновится.  [Требования к изображениям](https://yandex.ru/support/marketplace/assortment/fields/images.html)
	 * @type {Array<string>}
	 * @memberof UpdateOfferDTO
	 */
	pictures?: string[] | null
	/**
	 * Ссылки (URL) на видео товара.  Максимальное количество ссылок — 6.  **Требования к ссылке**  * Указывайте ссылку целиком, включая протокол http или https. * Максимальная длина — 512 символов. * Русские буквы в URL можно. * Можно использовать прямые ссылки на видео и на Яндекс Диск. Ссылки на Яндекс Диске нужно копировать с помощью функции **Поделиться**. Относительные ссылки и ссылки на другие облачные хранилища — не работают.  ✅ `https://example-shop.ru/video/sku12345.avi`  ✅ `https://yadi.sk/i/NaBoRsimVOLov`  ❌ `/video/sku12345.avi`  ❌ `https://www.dropbox.com/s/818f/super-tovar.avi`  Ссылки на видео должны быть постоянными. Нельзя использовать динамические ссылки, меняющиеся от выгрузки к выгрузке.  Если нужно заменить видео, выложите новое видео по новой ссылке, а ссылку на старое удалите. Если просто заменить видео по старой ссылке, оно не обновится.  [Требования к видео](https://yandex.ru/support/marketplace/assortment/fields/video.html)
	 * @type {Array<string>}
	 * @memberof UpdateOfferDTO
	 */
	videos?: string[] | null
	/**
	 * Список инструкций по использованию товара.  Максимальное количество инструкций — 6.  Если вы передадите пустое поле `manuals`, загруженные ранее инструкции удалятся.
	 * @type {Array<OfferManualDTO>}
	 * @memberof UpdateOfferDTO
	 */
	manuals?: OfferManualDTO[] | null
	/**
	 * Название бренда или производителя. Должно быть записано так, как его пишет сам бренд.
	 * @type {string}
	 * @memberof UpdateOfferDTO
	 */
	vendor?: string
	/**
	 * Указывайте в виде последовательности цифр. Подойдут коды EAN-13, EAN-8, UPC-A, UPC-E или Code 128.  Для книг указывайте ISBN.  Для товаров [определенных категорий и торговых марок](https://yastatic.net/s3/doc-binary/src/support/market/ru/yandex-market-list-for-gtin.xlsx) штрихкод должен быть действительным кодом GTIN. Обратите внимание: внутренние штрихкоды, начинающиеся на 2 или 02, и коды формата Code 128 не являются GTIN.  [Что такое GTIN](*gtin)
	 * @type {Array<string>}
	 * @memberof UpdateOfferDTO
	 */
	barcodes?: string[] | null
	/**
	 * Подробное описание товара: например, его преимущества и особенности.  Не давайте в описании инструкций по установке и сборке. Не используйте слова «скидка», «распродажа», «дешевый», «подарок» (кроме подарочных категорий), «бесплатно», «акция», «специальная цена», «новинка», «new», «аналог», «заказ», «хит». Не указывайте никакой контактной информации и не давайте ссылок.  Можно использовать теги:  * \\<h>, \\<h1>, \\<h2> и так далее — для заголовков; * \\<br> и \\<p> — для переноса строки; * \\<ol> — для нумерованного списка; * \\<ul> — для маркированного списка; * \\<li> — для создания элементов списка (должен находиться внутри \\<ol> или \\<ul>); * \\<div> — поддерживается, но не влияет на отображение текста.  Оптимальная длина — 400–600 символов.  [Рекомендации и правила](https://yandex.ru/support/marketplace/assortment/fields/description.html)
	 * @type {string}
	 * @memberof UpdateOfferDTO
	 */
	description?: string
	/**
	 * Страна, где был произведен товар.  Записывайте названия стран так, как они записаны в [списке](https://yastatic.net/s3/doc-binary/src/support/market/ru/countries.xlsx).
	 * @type {Array<string>}
	 * @memberof UpdateOfferDTO
	 */
	manufacturerCountries?: string[] | null
	/**
	 *
	 * @type {OfferWeightDimensionsDTO}
	 * @memberof UpdateOfferDTO
	 */
	weightDimensions?: OfferWeightDimensionsDTO
	/**
	 * Артикул товара от производителя.
	 * @type {string}
	 * @memberof UpdateOfferDTO
	 */
	vendorCode?: string
	/**
	 * Метки товара, которые использует магазин. Покупателям теги не видны. По тегам можно группировать и фильтровать разные товары в каталоге — например, товары одной серии, коллекции или линейки.  Максимальная длина тега 20 символов. У одного товара может быть максимум 10 тегов. Всего можно создать не больше 50 разных тегов.
	 * @type {Array<string>}
	 * @memberof UpdateOfferDTO
	 */
	tags?: string[] | null
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof UpdateOfferDTO
	 */
	shelfLife?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof UpdateOfferDTO
	 */
	lifeTime?: TimePeriodDTO
	/**
	 *
	 * @type {TimePeriodDTO}
	 * @memberof UpdateOfferDTO
	 */
	guaranteePeriod?: TimePeriodDTO
	/**
	 * {% note warning \"Этот параметр устарел\" %}  Вместо него используйте `commodityCodes` с типом `CUSTOMS_COMMODITY_CODE`.  {% endnote %}  Код товара в единой Товарной номенклатуре внешнеэкономической деятельности (ТН ВЭД) — 10 или 14 цифр без пробелов.  Обязательно укажите, если он есть.
	 * @type {string}
	 * @memberof UpdateOfferDTO
	 * @deprecated
	 */
	customsCommodityCode?: string
	/**
	 * Товарные коды.
	 * @type {Array<CommodityCodeDTO>}
	 * @memberof UpdateOfferDTO
	 */
	commodityCodes?: CommodityCodeDTO[] | null
	/**
	 * Номера документов на товар: сертификата, декларации соответствия и т. п.  Передавать можно только номера документов, сканы которого загружены в кабинете продавца по [инструкции](https://yandex.ru/support/marketplace/assortment/restrictions/certificates.html).
	 * @type {Array<string>}
	 * @memberof UpdateOfferDTO
	 */
	certificates?: string[] | null
	/**
	 * Количество грузовых мест.  Параметр используется, если товар представляет собой несколько коробок, упаковок и так далее. Например, кондиционер занимает два места — внешний и внутренний блоки в двух коробках.  Для товаров, занимающих одно место, не передавайте этот параметр.
	 * @type {number}
	 * @memberof UpdateOfferDTO
	 */
	boxCount?: number
	/**
	 *
	 * @type {OfferConditionDTO}
	 * @memberof UpdateOfferDTO
	 */
	condition?: OfferConditionDTO
	/**
	 *
	 * @type {OfferType}
	 * @memberof UpdateOfferDTO
	 */
	type?: OfferType
	/**
	 * Признак цифрового товара. Укажите `true`, если товар доставляется по электронной почте.  [Как работать с цифровыми товарами](../../step-by-step/digital.md)
	 * @type {boolean}
	 * @memberof UpdateOfferDTO
	 */
	downloadable?: boolean
	/**
	 * Параметр включает для товара пометку 18+. Устанавливайте ее только для товаров, которые относятся к удовлетворению сексуальных потребностей.
	 * @type {boolean}
	 * @memberof UpdateOfferDTO
	 */
	adult?: boolean
	/**
	 *
	 * @type {AgeDTO}
	 * @memberof UpdateOfferDTO
	 */
	age?: AgeDTO
	/**
	 * {% note warning \"Этот параметр устарел\" %}  При передаче характеристик используйте `parameterValues`.  {% endnote %}  Характеристики, которые есть только у товаров конкретной категории — например, диаметр колес велосипеда или материал подошвы обуви.
	 * @type {Array<OfferParamDTO>}
	 * @memberof UpdateOfferDTO
	 * @deprecated
	 */
	params?: OfferParamDTO[] | null
	/**
	 * Список характеристик с их значениями.  С `parameterValues` обязательно передавайте `marketCategoryId` — идентификатор категории на Маркете, к которой относятся указанные характеристики товара.  При **изменении** характеристик передавайте только те, значение которых нужно обновить. Если в `marketCategoryId` вы меняете категорию, значения общих характеристик для старой и новой категории сохранятся, передавать их не нужно.  Чтобы **удалить** значение заданной характеристики, передайте ее `parameterId` с пустым `value`.  Максимальное количество характеристик — 300.
	 * @type {Array<ParameterValueDTO>}
	 * @memberof UpdateOfferDTO
	 */
	parameterValues?: ParameterValueDTO[] | null
	/**
	 *
	 * @type {UpdatePriceWithDiscountDTO}
	 * @memberof UpdateOfferDTO
	 */
	basicPrice?: UpdatePriceWithDiscountDTO
	/**
	 *
	 * @type {BasePriceDTO}
	 * @memberof UpdateOfferDTO
	 */
	purchasePrice?: BasePriceDTO
	/**
	 *
	 * @type {BasePriceDTO}
	 * @memberof UpdateOfferDTO
	 */
	additionalExpenses?: BasePriceDTO
	/**
	 *
	 * @type {BasePriceDTO}
	 * @memberof UpdateOfferDTO
	 */
	cofinancePrice?: BasePriceDTO
	/**
	 * Использовать первое видео в карточке как видеообложку.  Передайте `true`, чтобы первое видео использовалось как видеообложка, или `false`, чтобы видеообложка не отображалась в карточке товара.
	 * @type {boolean}
	 * @memberof UpdateOfferDTO
	 */
	firstVideoAsCover?: boolean
	/**
	 * Параметры, которые вы ранее передали в `UpdateOfferDTO`, а теперь хотите удалить.  Если передать `adult`, `downloadable` и `firstVideoAsCover`, они не удалятся — их значение изменится на `false`.  Можно передать сразу несколько значений.  Не используйте вместе с соответствующим параметром в `UpdateOfferDTO`. Это приведет к ошибке `400`.
	 * @type {Set<DeleteOfferParameterType>}
	 * @memberof UpdateOfferDTO
	 */
	deleteParameters?: Set<DeleteOfferParameterType> | null
}

/**
 * Информация о товаре.
 * @export
 * @interface UpdateOfferMappingDTO
 */
export interface UpdateOfferMappingDTO {
	/**
	 *
	 * @type {UpdateOfferDTO}
	 * @memberof UpdateOfferMappingDTO
	 */
	offer: UpdateOfferDTO
	/**
	 *
	 * @type {UpdateMappingDTO}
	 * @memberof UpdateOfferMappingDTO
	 */
	mapping?: UpdateMappingDTO
}
/**
 * Список товаров.  В теле запроса можно передать от одного до 500 товаров.  Обязательный параметр.
 * @export
 * @interface UpdateOfferMappingEntryDTO
 */
export interface UpdateOfferMappingEntryDTO {
	/**
	 *
	 * @type {OfferMappingDTO}
	 * @memberof UpdateOfferMappingEntryDTO
	 */
	mapping?: OfferMappingDTO
	/**
	 *
	 * @type {OfferMappingDTO}
	 * @memberof UpdateOfferMappingEntryDTO
	 */
	awaitingModerationMapping?: OfferMappingDTO
	/**
	 *
	 * @type {OfferMappingDTO}
	 * @memberof UpdateOfferMappingEntryDTO
	 */
	rejectedMapping?: OfferMappingDTO
	/**
	 *
	 * @type {UpdateMappingsOfferDTO}
	 * @memberof UpdateOfferMappingEntryDTO
	 */
	offer?: UpdateMappingsOfferDTO
}
/**
 * Запрос на обновление товаров.
 * @export
 * @interface UpdateOfferMappingEntryRequest
 */
export interface UpdateOfferMappingEntryRequest {
	/**
	 * Информация о товарах в каталоге.
	 * @type {Array<UpdateOfferMappingEntryDTO>}
	 * @memberof UpdateOfferMappingEntryRequest
	 */
	offerMappingEntries: UpdateOfferMappingEntryDTO[]
}
/**
 * Ошибки и предупреждения, которые появились из-за переданных характеристик.
 * @export
 * @interface UpdateOfferMappingResultDTO
 */
export interface UpdateOfferMappingResultDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof UpdateOfferMappingResultDTO
	 */
	offerId: string
	/**
	 * Ошибки.  Если хотя бы по одному товару есть ошибка, информация в каталоге не обновится по всем переданным товарам.
	 * @type {Array<OfferMappingErrorDTO>}
	 * @memberof UpdateOfferMappingResultDTO
	 */
	errors?: OfferMappingErrorDTO[] | null
	/**
	 * Предупреждения.  Информация в каталоге обновится.
	 * @type {Array<OfferMappingErrorDTO>}
	 * @memberof UpdateOfferMappingResultDTO
	 */
	warnings?: OfferMappingErrorDTO[] | null
}
/**
 *
 * @export
 * @interface UpdateOfferMappingsRequest
 */
export interface UpdateOfferMappingsRequest {
	/**
	 * Перечень товаров, которые нужно добавить или обновить.
	 * @type {Array<UpdateOfferMappingDTO>}
	 * @memberof UpdateOfferMappingsRequest
	 */
	offerMappings: UpdateOfferMappingDTO[]
	/**
	 * Будут ли использоваться только переданные вами данные о товарах.  Значение по умолчанию: `false`. Чтобы удалить данные, которые добавил Маркет, передайте значение `true`.
	 * @type {boolean}
	 * @memberof UpdateOfferMappingsRequest
	 */
	onlyPartnerMediaContent?: boolean
}
/**
 * Описывает проблемы, возникшие при сохранении товара.
 * @export
 * @interface UpdateOfferMappingsResponse
 */
export interface UpdateOfferMappingsResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof UpdateOfferMappingsResponse
	 */
	status?: ApiResponseStatusType
	/**
	 * Ошибки и предупреждения, которые появились при обработке списка характеристик. Каждый элемент списка соответствует одному товару.  Если ошибок и предупреждений нет, поле не передается.
	 * @type {Array<UpdateOfferMappingResultDTO>}
	 * @memberof UpdateOfferMappingsResponse
	 */
	results?: UpdateOfferMappingResultDTO[] | null
}

/**
 * Запрос на обновление состава заказа.
 * @export
 * @interface UpdateOrderItemRequest
 */
export interface UpdateOrderItemRequest {
	/**
	 * Список товаров в заказе.  Если магазин не передал информацию о товаре во входных данных, он будет удален из заказа.  Обязательный параметр.
	 * @type {Array<OrderItemModificationDTO>}
	 * @memberof UpdateOrderItemRequest
	 */
	items: OrderItemModificationDTO[]
	/**
	 *
	 * @type {OrderItemsModificationRequestReasonType}
	 * @memberof UpdateOrderItemRequest
	 */
	reason?: OrderItemsModificationRequestReasonType
}

/**
 * Список заказов.
 * @export
 * @interface UpdateOrderStatusDTO
 */
export interface UpdateOrderStatusDTO {
	/**
	 * Идентификатор заказа.
	 * @type {number}
	 * @memberof UpdateOrderStatusDTO
	 */
	id?: number
	/**
	 *
	 * @type {OrderStatusType}
	 * @memberof UpdateOrderStatusDTO
	 */
	status?: OrderStatusType
	/**
	 *
	 * @type {OrderSubstatusType}
	 * @memberof UpdateOrderStatusDTO
	 */
	substatus?: OrderSubstatusType
	/**
	 *
	 * @type {OrderUpdateStatusType}
	 * @memberof UpdateOrderStatusDTO
	 */
	updateStatus?: OrderUpdateStatusType
	/**
	 * Ошибка при изменении статуса заказа. Содержит описание ошибки и идентификатор заказа.  Возвращается, если параметр `updateStatus` принимает значение `ERROR`.
	 * @type {string}
	 * @memberof UpdateOrderStatusDTO
	 */
	errorDetails?: string
}

/**
 *
 * @export
 * @interface UpdateOrderStatusRequest
 */
export interface UpdateOrderStatusRequest {
	/**
	 *
	 * @type {OrderStatusChangeDTO}
	 * @memberof UpdateOrderStatusRequest
	 */
	order: OrderStatusChangeDTO
}
/**
 * Информация об изменении статуса заказа.
 * @export
 * @interface UpdateOrderStatusResponse
 */
export interface UpdateOrderStatusResponse {
	/**
	 *
	 * @type {OrderDTO}
	 * @memberof UpdateOrderStatusResponse
	 */
	order?: OrderDTO
}
/**
 * Список заказов, статус которых обновился.
 * @export
 * @interface UpdateOrderStatusesDTO
 */
export interface UpdateOrderStatusesDTO {
	/**
	 * Список с обновленными заказами.
	 * @type {Array<UpdateOrderStatusDTO>}
	 * @memberof UpdateOrderStatusesDTO
	 */
	orders: UpdateOrderStatusDTO[]
}
/**
 * Список заказов.
 * @export
 * @interface UpdateOrderStatusesRequest
 */
export interface UpdateOrderStatusesRequest {
	/**
	 * Список заказов.
	 * @type {Array<OrderStateDTO>}
	 * @memberof UpdateOrderStatusesRequest
	 */
	orders: OrderStateDTO[]
}
/**
 *
 * @export
 * @interface UpdateOrderStatusesResponse
 */
export interface UpdateOrderStatusesResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof UpdateOrderStatusesResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {UpdateOrderStatusesDTO}
	 * @memberof UpdateOrderStatusesResponse
	 */
	result?: UpdateOrderStatusesDTO
}

/**
 * Запрос на обновление срока хранения заказа в ПВЗ.
 * @export
 * @interface UpdateOrderStorageLimitRequest
 */
export interface UpdateOrderStorageLimitRequest {
	/**
	 * Новая дата, до которой заказ будет храниться в пункте выдачи.  Срок хранения можно увеличить не больше, чем на 30 дней.  Формат даты: `ГГГГ-ММ-ДД`.
	 * @type {string}
	 * @memberof UpdateOrderStorageLimitRequest
	 */
	newDate: string
}
/**
 * Запрос на создание или изменение лицензий для точек продаж.
 * @export
 * @interface UpdateOutletLicenseRequest
 */
export interface UpdateOutletLicenseRequest {
	/**
	 * Список лицензий. Обязательный параметр, должен содержать информацию хотя бы об одной лицензии.
	 * @type {Array<OutletLicenseDTO>}
	 * @memberof UpdateOutletLicenseRequest
	 */
	licenses: OutletLicenseDTO[]
}
/**
 * Цена с указанием скидки.
 * @export
 * @interface UpdatePriceWithDiscountDTO
 */
export interface UpdatePriceWithDiscountDTO {
	/**
	 * Значение.
	 * @type {number}
	 * @memberof UpdatePriceWithDiscountDTO
	 */
	value: number
	/**
	 *
	 * @type {CurrencyType}
	 * @memberof UpdatePriceWithDiscountDTO
	 */
	currencyId: CurrencyType
	/**
	 * Зачеркнутая цена.  Число должно быть целым. Вы можете указать цену со скидкой от 5 до 99%.  Передавайте этот параметр при каждом обновлении цены, если предоставляете скидку на товар.
	 * @type {number}
	 * @memberof UpdatePriceWithDiscountDTO
	 */
	discountBase?: number
	minimumForBestseller?: number
}

/**
 * Запрос на установку цен на товары.
 * @export
 * @interface UpdatePricesRequest
 */
export interface UpdatePricesRequest {
	/**
	 * Список товаров.
	 * @type {Array<OfferPriceDTO>}
	 * @memberof UpdatePricesRequest
	 */
	offers: OfferPriceDTO[]
}
/**
 * Описание товаров, которые участвуют в акции.
 * @export
 * @interface UpdatePromoOfferDTO
 */
export interface UpdatePromoOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof UpdatePromoOfferDTO
	 */
	offerId: string
	/**
	 *
	 * @type {UpdatePromoOfferParamsDTO}
	 * @memberof UpdatePromoOfferDTO
	 */
	params?: UpdatePromoOfferParamsDTO
}
/**
 * Параметры товара в акции с типом `DIRECT_DISCOUNT` или `BLUE_FLASH`.  Обязательный параметр для акций с этими типами.
 * @export
 * @interface UpdatePromoOfferDiscountParamsDTO
 */
export interface UpdatePromoOfferDiscountParamsDTO {
	/**
	 * Зачеркнутая цена — та, по которой товар продавался до акции.  Указывается в рублях.  Число должно быть целым.
	 * @type {number}
	 * @memberof UpdatePromoOfferDiscountParamsDTO
	 */
	price?: number
	/**
	 * Цена по акции — та, по которой вы хотите продавать товар.  Указывается в рублях.  Число должно быть целым.
	 * @type {number}
	 * @memberof UpdatePromoOfferDiscountParamsDTO
	 */
	promoPrice?: number
}
/**
 * Параметры товара, который участвует в акции.
 * @export
 * @interface UpdatePromoOfferParamsDTO
 */
export interface UpdatePromoOfferParamsDTO {
	/**
	 *
	 * @type {UpdatePromoOfferDiscountParamsDTO}
	 * @memberof UpdatePromoOfferParamsDTO
	 */
	discountParams?: UpdatePromoOfferDiscountParamsDTO
}
/**
 * Добавление товаров в акцию или обновление их параметров.  Чтобы добавить товары в акцию или обновить параметры каких-то товаров, передайте их в параметре `offers`.
 * @export
 * @interface UpdatePromoOffersRequest
 */
export interface UpdatePromoOffersRequest {
	/**
	 * Идентификатор акции.
	 * @type {string}
	 * @memberof UpdatePromoOffersRequest
	 */
	promoId: string
	/**
	 * Товары, которые необходимо добавить в акцию или цены которых нужно изменить.
	 * @type {Array<UpdatePromoOfferDTO>}
	 * @memberof UpdatePromoOffersRequest
	 */
	offers: UpdatePromoOfferDTO[]
}
/**
 * Результат добавления товаров в акцию.
 * @export
 * @interface UpdatePromoOffersResponse
 */
export interface UpdatePromoOffersResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof UpdatePromoOffersResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {UpdatePromoOffersResultDTO}
	 * @memberof UpdatePromoOffersResponse
	 */
	result?: UpdatePromoOffersResultDTO
}

/**
 * Ошибки и предупреждения, которые появились при добавлении товаров в акцию.
 * @export
 * @interface UpdatePromoOffersResultDTO
 */
export interface UpdatePromoOffersResultDTO {
	/**
	 * Изменения, которые были отклонены.  Возвращается, только если есть отклоненные изменения.
	 * @type {Array<RejectedPromoOfferUpdateDTO>}
	 * @memberof UpdatePromoOffersResultDTO
	 */
	rejectedOffers?: RejectedPromoOfferUpdateDTO[] | null
	/**
	 * Изменения, по которым есть предупреждения. Они информируют о возможных проблемах. Информация о товарах обновится.  Возвращается, только если есть предупреждения.
	 * @type {Array<WarningPromoOfferUpdateDTO>}
	 * @memberof UpdatePromoOffersResultDTO
	 */
	warningOffers?: WarningPromoOfferUpdateDTO[] | null
}
/**
 * Информация об остатках одного товара на одном из складов.
 * @export
 * @interface UpdateStockDTO
 */
export interface UpdateStockDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof UpdateStockDTO
	 */
	sku: string
	/**
	 * Информация об остатках товара.
	 * @type {Array<UpdateStockItemDTO>}
	 * @memberof UpdateStockDTO
	 */
	items: UpdateStockItemDTO[]
}
/**
 * Информация об остатках товара.
 * @export
 * @interface UpdateStockItemDTO
 */
export interface UpdateStockItemDTO {
	/**
	 * Количество доступного товара.
	 * @type {number}
	 * @memberof UpdateStockItemDTO
	 */
	count: number
	/**
	 * Дата и время последнего обновления информации об остатках. <br><br> Если вы не передали параметр `updatedAt`, используется текущее время. <br><br> Формат даты и времени: ISO 8601 со смещением относительно UTC. Например, `2017-11-21T00:42:42+03:00`.
	 * @type {string}
	 * @memberof UpdateStockItemDTO
	 */
	updatedAt?: string
}
/**
 * Запрос на изменение информации по остаткам товаров.
 * @export
 * @interface UpdateStocksRequest
 */
export interface UpdateStocksRequest {
	/**
	 * Данные об остатках товаров.
	 * @type {Array<UpdateStockDTO>}
	 * @memberof UpdateStocksRequest
	 */
	skus: Array<UpdateStockDTO>
}
/**
 * Время последнего обновления.
 * @export
 * @interface UpdateTimeDTO
 */
export interface UpdateTimeDTO {
	/**
	 * Время последнего обновления.
	 * @type {string}
	 * @memberof UpdateTimeDTO
	 */
	updatedAt: string
}
/**
 * Ограничение на возможные значения, накладываемое другой характеристикой.  Если ограничивающая характеристика принимает определенное значение, список возможных значений ограничиваемой характеристики сокращается.  **Пример**  Характеристика **размер** сама по себе может принимать девять разных значений: `S`, `M`, `L`, `44`, `46`, `48`, `42/164`, `46/176`, `44S`.  Если ограничивающая характеристика **размерная сетка** принимает значение `RU`, список возможных значений размера сокращается до `44`, `46`, `48`.
 * @export
 * @interface ValueRestrictionDTO
 */
export interface ValueRestrictionDTO {
	/**
	 * Идентификатор ограничивающей характеристики.
	 * @type {number}
	 * @memberof ValueRestrictionDTO
	 */
	limitingParameterId: number
	/**
	 * Значения ограничивающей характеристики и соответствующие допустимые значения текущей характеристики.
	 * @type {Array<OptionValuesLimitedDTO>}
	 * @memberof ValueRestrictionDTO
	 */
	limitedValues: OptionValuesLimitedDTO[]
}
/**
 *
 * @export
 * @interface VerifyOrderEacRequest
 */
export interface VerifyOrderEacRequest {
	/**
	 * Код для подтверждения ЭАПП.
	 * @type {string}
	 * @memberof VerifyOrderEacRequest
	 */
	code: string
}
/**
 *
 * @export
 * @interface VerifyOrderEacResponse
 */
export interface VerifyOrderEacResponse {
	/**
	 *
	 * @type {ApiResponseStatusType}
	 * @memberof VerifyOrderEacResponse
	 */
	status?: ApiResponseStatusType
	/**
	 *
	 * @type {EacVerificationResultDTO}
	 * @memberof VerifyOrderEacResponse
	 */
	result?: EacVerificationResultDTO
}

/**
 * Адрес склада.
 * @export
 * @interface WarehouseAddressDTO
 */
export interface WarehouseAddressDTO {
	/**
	 * Город.
	 * @type {string}
	 * @memberof WarehouseAddressDTO
	 */
	city: string
	/**
	 * Улица.
	 * @type {string}
	 * @memberof WarehouseAddressDTO
	 */
	street?: string
	/**
	 * Номер дома.
	 * @type {string}
	 * @memberof WarehouseAddressDTO
	 */
	number?: string
	/**
	 * Номер строения.
	 * @type {string}
	 * @memberof WarehouseAddressDTO
	 */
	building?: string
	/**
	 * Номер корпуса.
	 * @type {string}
	 * @memberof WarehouseAddressDTO
	 */
	block?: string
	/**
	 *
	 * @type {GpsDTO}
	 * @memberof WarehouseAddressDTO
	 */
	gps: GpsDTO
}
/**
 * Информация о складе.
 * @export
 * @interface WarehouseDTO
 */
export interface WarehouseDTO {
	/**
	 * Идентификатор склада.
	 * @type {number}
	 * @memberof WarehouseDTO
	 */
	id: number
	/**
	 * Название склада.
	 * @type {string}
	 * @memberof WarehouseDTO
	 */
	name: string
	/**
	 * Идентификатор кампании в API и идентификатор магазина.
	 * @type {number}
	 * @memberof WarehouseDTO
	 */
	campaignId: number
	/**
	 * Возможна ли доставка по модели Экспресс.
	 * @type {boolean}
	 * @memberof WarehouseDTO
	 */
	express: boolean
	/**
	 *
	 * @type {WarehouseAddressDTO}
	 * @memberof WarehouseDTO
	 */
	address?: WarehouseAddressDTO
}
/**
 * Информация о группе складов.
 * @export
 * @interface WarehouseGroupDTO
 */
export interface WarehouseGroupDTO {
	/**
	 * Название группы складов.
	 * @type {string}
	 * @memberof WarehouseGroupDTO
	 */
	name: string
	/**
	 *
	 * @type {WarehouseDTO}
	 * @memberof WarehouseGroupDTO
	 */
	mainWarehouse: WarehouseDTO
	/**
	 * Список складов, входящих в группу.
	 * @type {Array<WarehouseDTO>}
	 * @memberof WarehouseGroupDTO
	 */
	warehouses: WarehouseDTO[]
}
/**
 * Информация об остатках товара.
 * @export
 * @interface WarehouseOfferDTO
 */
export interface WarehouseOfferDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof WarehouseOfferDTO
	 */
	offerId: string
	/**
	 *
	 * @type {TurnoverDTO}
	 * @memberof WarehouseOfferDTO
	 */
	turnoverSummary?: TurnoverDTO
	/**
	 * Информация об остатках.
	 * @type {Array<WarehouseStockDTO>}
	 * @memberof WarehouseOfferDTO
	 */
	stocks: WarehouseStockDTO[]
	/**
	 * Дата и время последнего обновления информации об остатках.  Формат даты и времени: ISO 8601 со смещением относительно UTC. Например, `2023-11-21T00:42:42+03:00`.
	 * @type {string}
	 * @memberof WarehouseOfferDTO
	 */
	updatedAt?: string
}
/**
 * Информация об остатках товаров на складе.
 * @export
 * @interface WarehouseOffersDTO
 */
export interface WarehouseOffersDTO {
	/**
	 * Идентификатор склада.
	 * @type {number}
	 * @memberof WarehouseOffersDTO
	 */
	warehouseId: number
	/**
	 * Информация об остатках.
	 * @type {Array<WarehouseOfferDTO>}
	 * @memberof WarehouseOffersDTO
	 */
	offers: WarehouseOfferDTO[]
}
/**
 * Информация об остатках товара.
 * @export
 * @interface WarehouseStockDTO
 */
export interface WarehouseStockDTO {
	/**
	 *
	 * @type {WarehouseStockType}
	 * @memberof WarehouseStockDTO
	 */
	type: WarehouseStockType
	/**
	 * Значение остатков.
	 * @type {number}
	 * @memberof WarehouseStockDTO
	 */
	count: number
}

/**
 * Тип остатков товаров на складе:  * `AVAILABLE` (соответствует типу «Доступный к заказу» в отчете «Остатки на складе» в кабинете продавца на Маркете) — товар, доступный для продажи.  * `DEFECT` (соответствует типу «Брак») — товар с браком.  * `EXPIRED` (соответствует типу «Просрочен») — товар с истекшим сроком годности.  * `FIT` (соответствует типу «Годный») — товар, который доступен для продажи или уже зарезервирован.  * `FREEZE` — товар, который зарезервирован для заказов.  * `QUARANTINE` (соответствует типу «Карантин») — товар, временно недоступный для продажи (например, товар перемещают из одного помещения склада в другое).  * `UTILIZATION` — товар, который будет утилизирован.
 * @export
 * @enum {string}
 */

export const WarehouseStockType = {
	Fit: 'FIT',
	Freeze: 'FREEZE',
	Available: 'AVAILABLE',
	Quarantine: 'QUARANTINE',
	Utilization: 'UTILIZATION',
	Defect: 'DEFECT',
	Expired: 'EXPIRED',
} as const

export type WarehouseStockType =
	(typeof WarehouseStockType)[keyof typeof WarehouseStockType]

/**
 * Информация о складах и группах складов.
 * @export
 * @interface WarehousesDTO
 */
export interface WarehousesDTO {
	/**
	 * Список складов, не входящих в группы.
	 * @type {Array<WarehouseDTO>}
	 * @memberof WarehousesDTO
	 */
	warehouses: WarehouseDTO[]
	/**
	 * Список групп складов.
	 * @type {Array<WarehouseGroupDTO>}
	 * @memberof WarehousesDTO
	 */
	warehouseGroups: WarehouseGroupDTO[]
}
/**
 * Описание предупреждения, которое появилось при добавлении товара.
 * @export
 * @interface WarningPromoOfferUpdateDTO
 */
export interface WarningPromoOfferUpdateDTO {
	/**
	 * Ваш SKU — идентификатор товара в вашей системе.  Правила использования SKU:  * У каждого товара SKU должен быть свой.  * Уже заданный SKU нельзя освободить и использовать заново для другого товара. Каждый товар должен получать новый идентификатор, до того никогда не использовавшийся в вашем каталоге.  SKU товара можно изменить в кабинете продавца на Маркете. О том, как это сделать, читайте [в Справке Маркета для продавцов](https://yandex.ru/support2/marketplace/ru/assortment/operations/edit-sku).  [Что такое SKU и как его назначать](https://yandex.ru/support/marketplace/assortment/add/index.html#fields)
	 * @type {string}
	 * @memberof WarningPromoOfferUpdateDTO
	 */
	offerId: string
	/**
	 * Предупреждения, которые появились при добавлении товара в акцию или изменении его цен.
	 * @type {Array<PromoOfferUpdateWarningDTO>}
	 * @memberof WarningPromoOfferUpdateDTO
	 */
	warnings: PromoOfferUpdateWarningDTO[]
}

export interface EnrichedOrdersStatsOrderDTO
	extends OrdersStatsOrderDTO,
		Pick<OrderDTO, 'delivery' | 'substatus'> {}
