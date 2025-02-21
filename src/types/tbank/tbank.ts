/** THIS FILE WAS GENERATED */

/* eslint-disable @typescript-eslint/array-type, @typescript-eslint/ban-types, max-lines, @typescript-eslint/no-namespace, @typescript-eslint/indent, @typescript-eslint/no-invalid-void-type */

export interface PaymentRegistrySubmitResultResponse {
    /**
     * Идентификатор платежного реестра.
     * @format int32
     */
    paymentRegistryId: number
    /** Статус подписания платежного реестра. */
    status: SubmissionStatus
    /** Общая ошибка, произошедшая при создании реестра. */
    error?: {
        /** Код ошибки. */
        errorCode: string
        /** Описание ошибки. */
        errorMessage: string
    }
    /** Платежи внутри реестра, содержащие ошибки. */
    paymentErrors?: EmployedSubmitPaymentError[]
}

export interface BeneficiaryIpResidentRequest {
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryIpResidentRequestTypeEnum
    /** Имя. */
    firstName: string
    /** Отчество. */
    middleName?: string
    /** Фамилия. */
    lastName: string
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace?: string
    /**
     * Гражданство. Код страны в формате `ISO 3166-1 alpha-2`.
     * @pattern ^([A-Z]{2})$
     */
    citizenship: string
    /**
     * Номер телефона. phoneNumber или email обязателен к заполнению.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. phoneNumber или email обязателен к заполнению. */
    email?: string
    /**
     * Документы. Для ИП резидента обязателен тип PASSPORT.
     * @minItems 1
     */
    documents: Document2[]
    /**
     * Адреса.
     * @minItems 1
     */
    addresses: Address[]
    /**
     * Дата регистрации.
     * @format date
     */
    registrationDate: string
    /**
     * ИНН.
     * @pattern ^(\d{12})$
     */
    inn: string
    /**
     * Основной государственный регистрационный номер.
     * @pattern ^(\d{15})$
     */
    ogrn?: string
}

export interface StepListResponse {
    /**
     * Запрошенное количество этапов сделки для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество этапов сделки для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество этапов сделки в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего этапов сделки, подходящих под условия запроса.
     * @format int32
     */
    total: number
    /** Список этапов сделки. */
    results?: StepResponse[]
}

/** Субстатус, присутствует только у заявок, где status = IN_PROGRESS. */
export enum ApplicationSubStatus {
    PERMISSION_REQUESTED = 'PERMISSION_REQUESTED'
}

/** Баланс счета. */
export interface Balance {
    /** Доступный остаток — деньги на счете + сумма доступного овердрафта, если он подключен. */
    otb: number
    /** Сумма авторизаций — захолдированные на счете средства. */
    authorized: number
    /** Сумма платежей в картотеке клиента — собственные платежи. */
    pendingPayments: number
    /** Сумма платежей в картотеке банка — требования к клиенту. */
    pendingRequisitions: number
}

export interface ReceiptService {
    /** Название услуги. */
    name: string
    /** Цена. */
    price: number
}

export interface BeneficiaryScoringInfoListResponse {
    /**
     * Запрошенное количество результатов проверки для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество результатов проверки для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество результатов проверки в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего результатов проверки, подходящих под условия запроса.
     * @format int32
     */
    total: number
    /** Список результатов проверки. */
    results?: BeneficiaryScoringInfo[]
}

/** Тип телефона. */
export enum PhoneType1 {
    ValueМобильный = 'Мобильный',
    ValueПоМестуЖительства = 'По месту жительства',
    ValueРабочий = 'Рабочий'
}

export interface Terminal {
    /** Серийный номер терминала. */
    key: string
    /** Идентификатор терминала. */
    id: string
}

/** Не требующий идентификации контакт. */
export interface BeneficiaryLiteContactRequest {
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryLiteContactRequestTypeEnum
}

/** Данные паспорта. */
export interface Passport1 {
    /**
     * Серия.
     * @pattern ^\d{4}$
     */
    series: string
    /**
     * Номер.
     * @pattern ^\d{6}$
     */
    number: string
    /** Кем выдан. */
    issuerName: string
    /** Код подразделения. */
    issuerCode: string
    /**
     * Дата выдачи в формате `yyyy-MM-dd`.
     * @format date
     */
    issueDate: string
}

/** Адрес, по которому нужно получить доступные интервалы для назначения встречи. */
export interface Address2 {
    /** Полный адрес. */
    fullAddress: string
    /** Почтовый индекс. */
    zipCode?: string
    /** Страна. */
    country?: string
    /** Регион. */
    region?: string
    /** Район. */
    area?: string
    /** Город. */
    city?: string
    /** Улица. */
    street?: string
    /** Дом. */
    house?: string
    /** Корпус. */
    building?: string
    /** Квартира. */
    flat?: string
    /** Строение. */
    construction?: string
    /** Поселение. */
    settlement?: string
}

/** Реквизиты плательщика. */
export interface CardPayerRequisites {
    /**
     * Номер расчетного счета для списания.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
}

export interface SubmitPaymentError {
    /**
     * Идентификатор платежа, переданный клиентом при создании.
     * @format int32
     */
    number: number
    /** Номер счета сотрудника. */
    accountNumber?: string
    /** Ошибки валидации. */
    errors?: FieldValidationError[]
}

/** Период даты добавления. */
export interface SelfEmployedCreationDate {
    /**
     * Дата начала периода.
     * @format date-time
     */
    from?: string
    /**
     * Дата окончания периода.
     * @format date-time
     */
    to?: string
}

export interface Passport {
    /** Тип документа. */
    type: PassportTypeEnum
    /** Серия документа. */
    serial: string
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /** Кем выдан. */
    organization?: string
    /**
     * Код подразделения.
     * @pattern ^(\d{3}-\d{3})$
     */
    division: string
}

export interface Photo {
    id: string
    /** Тип фото. */
    type?: string
    /** Подтип фото. */
    subType?: string
    /**
     * Номер страницы.
     * @format int32
     */
    sheetNumber?: number
    /** Результат проверки фото в формате `JSON`. */
    review?: Record<string, string>
}

export interface CreatePhone {
    /** Тип телефона. */
    type: PhoneType
    /** Номер телефона. */
    number: string
}

export interface CreateEmployeesResponse {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
}

export interface SubscriptionResponse {
    /** Тип подписки. */
    type: BundleCode
}

export interface OfficialPassport {
    /** Тип документа. */
    type: OfficialPassportTypeEnum
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /** Кем выдан. */
    organization: string
}

export interface SelfEmployedPayPaymentRegistryResponse {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
}

export interface PaymentError {
    /**
     * Идентификатор платежа, переданный клиентом при создании.
     * @format int32
     */
    number: number
    /** Номер счета сотрудника. */
    accountNumber?: string
    /** Ошибки валидации. */
    errors?: {
        /** Название поля, в котором возникла ошибка, на русском языке. */
        fieldName: string
        /** Описание ошибки. */
        errorDescription: string
    }[]
}

export interface RkcBankDetails {
    /**
     * Тип банковских реквизитов:
     * * `PAYMENT_DETAILS` — По реквизитам счета.
     * * `CARD` — На карту.
     * * `SBP` — Через СБП.
     */
    type: RkcBankDetailsTypeEnum
    /**
     * БИК банка получателя.
     *
     *
     * С 1 января 2021 года при перечислении налоговых платежей указываются новые значения БИК банков получателя.
     *
     *
     * <a href="https://spmag.ru/articles/polya-platezhnogo-porucheniya-v-2021-godu-obrazec">Подробнее о полях платежного поручения</a>
     * @pattern \d{9}
     */
    bik: string
    /**
     * КПП получателя
     * @pattern ^(\d{9})$
     */
    kpp?: string
    /**
     * ИНН. Укажите 0, чтобы не заполнять.
     * @pattern ^(\d{12}|\d{10}|0{1})$
     */
    inn?: string
    /**
     * Наименование получателя.
     * @maxLength 160
     */
    name?: string
    /**
     * Наименование банка получателя.
     *
     *
     * С 1 января 2021 года при заполнении платежей на перечисление налогов после названия банка указывается название счета казначейства через знак <code>//</code>.
     * @minLength 1
     * @maxLength 255
     */
    bankName: string
    /**
     * Номер расчетного счета. ВАЖНО: Для бюджетных платежей с 01.01.2021 в данном поле нужно указывать новые номера казначейских счетов.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * Корреспондентский счет банка получателя.
     *
     *
     * С 1 января 2021 года при уплате налогов указывается номер счета банка получателя, входящий в состав единого казначейского счета (ЕКС). Раньше это поле заполнялось нулями.
     * @pattern \d{20}
     */
    corrAccountNumber: string
}

export interface UpdateTaskRequest {
    /** Шаблон, определяющий бизнес-логику задания. */
    template: string
    /** Комментарий к заданию для представителя. */
    commentForAgent?: string
    /** Идентификатор родительского задания. */
    parentTaskId?: string
    /** Дополнительные метаданные в формате JSON. */
    meta?: Record<string, string>
    /** Группа объектов с информацией о данных каждого участника задания, подлежащего удостоверению на встрече. */
    contacts?: Contact[]
    /** Группа объектов с информацией о фото, относящихся к заданию. */
    photos?: Photo[]
}

export interface SelfEmployedPaymentRegistrySubmitRequest {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
    /**
     * Идентификатор платежного реестра.
     * @format int32
     */
    paymentRegistryId: number
}

export interface Patent {
    /** Тип документа. */
    type: PatentTypeEnum
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate: string
}

export interface CancelReceiptResponse {
    /**
     * Идентификатор чека.
     * @format uuid
     */
    receiptId: string
    operation: ReceiptOperation
}

export interface TemporaryResidencePermit {
    /** Тип документа. */
    type: TemporaryResidencePermitTypeEnum
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate: string
}

export interface TooMunknownRequestsErrorResponse {
    errorId: string
    /**
     * Текст ошибки.
     * @maxLength 400
     */
    errorMessage: string
    /**
     * Код ошибки.
     * @maxLength 50
     */
    errorCode: string
}

export interface PositionInfo {
    /** Код валюты. */
    currency: string
    /** Общий баланс по валюте. */
    currentBalance: number
    /** Сумма денежных средств, доступных для вывода. */
    currentBalanceForWithdrawal: number
    /** Количество заблокированной валюты. */
    blockedQuantity?: number
}

export interface BeneficiaryIpResidentResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryIpResidentResponseTypeEnum
    /** Имя. */
    firstName: string
    /** Отчество. */
    middleName?: string
    /** Фамилия. */
    lastName: string
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace?: string
    /**
     * Гражданство. Код страны в формате `ISO 3166-1 alpha-2`.
     * @pattern ^([A-Z]{2})$
     */
    citizenship?: string
    /**
     * Номер телефона.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. */
    email?: string
    /** Документы. */
    documents?: Document2[]
    /** Адреса. */
    addresses?: Address[]
    /**
     * Дата регистрации.
     * @format date
     */
    registrationDate: string
    /**
     * ИНН.
     * @pattern ^(\d{12})$
     */
    inn?: string
    /**
     * Основной государственный регистрационный номер.
     * @pattern ^(\d{15})$
     */
    ogrn?: string
}

export interface IN_PROGRESS {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Статус проверки в финансовом мониторинге. */
    status: InProgressStatusEnum
}

/** Информация о транзитном счете. Актуально для валютных счетов. */
export interface TransitAccount {
    /** Номер транзитного банковского счета. */
    accountNumber: string
}

export interface DeponentRequest {
    /** Сумма депонента. */
    amount: number
}

export interface GetIntervalsResponse {
    /** Идентификатор назначения встречи. */
    appointmentId: string
    /** Временная зона адреса, для которого выбирается временной интервал в формате `ISO 8601`. Например, +03:00. */
    timeOffset: string
    /** Cписок объектов, содержащих информацию о начале и окончании временного интервала. */
    intervals?: Interval[]
}

export interface BeneficiaryFlNonresidentRequest {
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryFlNonresidentRequestTypeEnum
    /** Имя. */
    firstName: string
    /** Отчество. */
    middleName?: string
    /** Фамилия. */
    lastName: string
    /** Самозанятый. */
    isSelfEmployed: boolean
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace?: string
    /**
     * Гражданство. Код страны в формате `ISO 3166-1 alpha-2`.
     * @pattern ^([A-Z]{2})$
     */
    citizenship: string
    /**
     * Номер телефона. phoneNumber или email обязателен к заполнению.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. phoneNumber или email обязателен к заполнению. */
    email?: string
    /**
     * Документы. Обязательно — минимум 2.
     *
     *
     * В большинстве случаев основной документ нерезидента РФ — `FOREIGN_PASSPORT`. Второй документ — любой из документов, подтверждающих право на пребывание в РФ. <a href="https://cdn.tbank.ru/static/documents/f829a126-7506-4d38-ae20-c5584668a3a6.pdf">Подробнее о документах</a>.
     *
     *
     * Для нерезидентов с гражданством BY достаточно одного документа с типом `FOREIGN_PASSPORT`.
     * @minItems 1
     */
    documents: Document2[]
    /**
     * Адреса.
     * @minItems 1
     */
    addresses: Address[]
    /**
     * ИНН.
     * @pattern ^(\d{12})$
     */
    inn?: string
}

/** Тип документа. */
export enum DocumentType1 {
    ValueПаспорт = 'Паспорт',
    ValueИностранныйПаспорт = 'Иностранный паспорт',
    ValueЗагрПаспортИностранногоГр = 'Загр. паспорт иностранного гр.',
    ValueСлужебныйОфициальныйПаспорт = 'Служебный/официальный паспорт',
    ValueДипломатическийПаспорт = 'Дипломатический паспорт',
    ValueМиграционнаяКарта = 'Миграционная карта',
    ValueРазрНаВременноеПроживание = 'Разр. на временное проживание',
    ValueВиза = 'Виза',
    ValueВидНаЖительство = 'Вид на жительство'
}

export interface IncomingTransactionListItem {
    /**
     * Номер счета.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * ID операции пополнения.
     * @format uuid
     */
    operationId: string
    /** Сумма пополнения в валюте счета. */
    amount: number
    /**
     * Валюта пополнения в валюте счета.
     * @pattern ^\d{3}$
     */
    currency?: string
    /** Сумма пополнения в валюте пополнения. */
    operationAmount?: number
    /**
     * Валюта пополнения в валюте пополнения.
     * @pattern ^\d{3}$
     */
    operationCurrency?: string
    /**
     * БИК плательщика.
     * @pattern \d{9}
     */
    payerBik?: string
    /**
     * КПП плательщика.
     * @pattern ^(\d{9})$
     */
    payerKpp?: string
    /**
     * ИНН плательщика.
     * @pattern ^(\d{12}|\d{10})$
     */
    payerInn?: string
    /**
     * Наименования банка плательщика.
     * @minLength 1
     * @maxLength 255
     */
    payerBankName?: string
    /** SWIFT-код банка плательщика. */
    payerBankSwiftCode?: string
    /**
     * Номер счета плательщика.
     * @pattern ^(\d{20}|\d{22})$
     */
    payerAccountNumber?: string
    /**
     * Корр. счет плательщика.
     * @pattern \d{20}
     */
    payerCorrAccountNumber?: string
    /**
     * Имя плательщика.
     * @maxLength 160
     */
    payerName?: string
    /**
     * Назначение платежа.
     * @minLength 1
     * @maxLength 210
     */
    paymentPurpose?: string
    /** Номер платежного поручения. */
    documentNumber?: string
    /**
     * Дата и время пополнения.
     * @format date-time
     */
    chargeDate?: string
    /**
     * Дата авторизации.
     * @format date-time
     */
    authorizationDate?: string
    /**
     * Дата транзакции.
     * @format date-time
     */
    transactionDate?: string
    /**
     * Дата списания.
     * @format date-time
     */
    drawDate?: string
}

export interface BankStatement {
    /** Расчетный счет организации. */
    accountNumber: string
    /** Баланс на начало периода. */
    saldoIn: number
    /** Обороты входящих платежей. */
    income: number
    /** Обороты исходящих платежей. */
    outcome: number
    /** Баланс на конец периода. */
    saldoOut: number
    /** Список операций по счету. */
    operation?: BankStatementOperation[]
}

/**
 * Статус платежа:
 * <ul>
 * <li><code>IN_PROGRESS</code> — в процессе исполнения;</li>
 * <li><code>EXECUTED</code> — исполнен;</li>
 * <li><code>FAILED</code> — не исполнен;</li>
 * <li><code>CANCELLED</code> — отменен.</li>
 * </ul>
 */
export enum PaymentStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    EXECUTED = 'EXECUTED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED'
}

export interface DealListResponse {
    /**
     * Запрошенное количество сделок для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество сделок для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество сделок в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего сделок, подходящих под условия запроса.
     * @format int32
     */
    total: number
    /** Список сделок. */
    results?: DealResponse[]
}

/** Тип операции. */
export enum ReceiptOperationType {
    REGISTRATION = 'REGISTRATION',
    REGISTRATION_OFFLINE = 'REGISTRATION_OFFLINE',
    CANCELLATION = 'CANCELLATION'
}

export interface CardBankDetails {
    /**
     * Тип банковских реквизитов:
     * * `PAYMENT_DETAILS` — По реквизитам счета.
     * * `CARD` — На карту.
     * * `SBP` — Через СБП.
     */
    type: CardBankDetailsTypeEnum
    /**
     * Идентификатор карты в системе банка.
     * @minLength 1
     * @maxLength 256
     */
    cardId: string
    /**
     * Ключ терминала.
     * @minLength 1
     * @maxLength 256
     */
    terminalKey: string
}

export interface SelfEmployedReceipts {
    /** Статус запроса на получение чеков. */
    status: SelfEmployedReceiptsRequestStatus
    /** Ошибка получения чеков по реестру. */
    error?: {
        /** Код ошибки. */
        errorCode: string
        /** Описание ошибки. */
        errorMessage: string
    }
    /** Результат регистрации дохода. */
    receipts?: SelfEmployedReceipt[]
}

export type AddCardRequestResponse =
    | FailedAddCardRequestResponse
    | PendingAddCardRequestResponse
    | ReadyAddCardRequestResponse

export interface SelfEmployedCreatePaymentRegistryResultResponse {
    /**
     * Идентификатор платежного реестра.
     * @format int32
     */
    paymentRegistryId?: number
    /** Статус создания:<br /><ul><li>QUEUED — платежный реестр стоит в очереди на создание;</li><li>CREATED — платежный реестр создан;</li><li>ERROR — платежный реестр не был создан, ошибки перечислены в параметре <b>errors</b>.</li></ul> */
    status: CreationRegisterStatus
    error?: FieldValidationError
    /** Платежи внутри реестра, содержащие ошибки. */
    paymentErrors?: PaymentError1[]
}

export interface CreateTaskResponse {
    /** Уникальный идентификатор задания. */
    id: string
}

/** Реквизиты плательщика. */
export interface PayerRequisites {
    /**
     * Номер расчетного счета для списания.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
}

export interface PaymentPayResult {
    /**
     * Номер платежа.
     * @format int32
     */
    number: number
    /** Статус платежа. */
    paymentStatus: PayStatus
    /** Номер счета. */
    accountNumber?: string
    /** Ошибки валидации. */
    errors?: FieldValidationError1[]
}

export interface Visa {
    /** Тип документа. */
    type: VisaTypeEnum
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate: string
}

export interface Phone2 {
    /** Тип телефона */
    type: PhoneType2
    /**
     * Номер телефона в формате +7xxxxxxxxxx
     * @pattern ^((\+7)([0-9]){10})$
     */
    number: string
}

export interface AccountInfo1 {
    /** Расчетный счет организации. */
    accountNumber: string
    /** Наименование счета. */
    name: string
    /** Код валюты счета по ОКВ (цифрами). */
    currency: string
    /**
     * БИК банка.
     * @pattern \d{9}
     */
    bankBik: string
    /**
     * Тип счета
     * * `Current` — расчетный счет
     * * `Tax` — счет Т-Бухгалтерии
     * * `Tender` — специальный счет для участия в госзакупках
     * * `Overnight` — счет Overnight
     */
    accountType: AccountInfo1AccountTypeEnum
    /** Баланс счета. */
    balance: Balance
    /** Информация о транзитном счете. Актуально для валютных счетов. */
    transitAccount?: TransitAccount
}

/** Статус самозанятого:<br /><ul><li><code>ERROR</code> — ошибка создания анкеты самозанятого.</li><li><code>DRAFT</code> — анкета самозанятого готова к отправке.</li><li><code>PROCESSING_ERROR</code> — ошибка отправки анкеты. Обратитесь к персональному менеджеру для уточнения причины.</li><li><code>PROCESSING</code> — обрабатываем анкету самозанятого.</li><li><code>REJECTED</code> — отказ в открытии счета. Конечный статус добавления.</li><li><code>MTNG_WAIT</code> — самозанятый ожидает назначения встречи для доставки карты. </li><li><code>MTNG_SCHD</code> — встреча для доставки карты самозанятому назначена.</li><li><code>MTNG_CANC</code> — встреча для доставки карты самозанятому отменена.</li><li><code>ACTIVE</code> — самозанятый добавлен. Конечный статус добавления.</li><li><code>DELETED</code> — самозанятый удален.</li></ul> */
export enum EmployeeStatus1 {
    PROCESSING = 'PROCESSING',
    DRAFT = 'DRAFT',
    PROCESSING_ERROR = 'PROCESSING_ERROR',
    ACTIVE = 'ACTIVE',
    ERROR = 'ERROR',
    REJECTED = 'REJECTED',
    DELETED = 'DELETED',
    MTNG_SCHD = 'MTNG_SCHD',
    MTNG_WAIT = 'MTNG_WAIT',
    MTNG_CANC = 'MTNG_CANC'
}

export type IdentificationDocument = Passport2

/** Информация о карте */
export interface Card {
    /** UCID */
    ucid?: string
    /** MCC */
    mcc?: string
    /** Номер карты */
    number?: string
}

export interface PaymentListResponse {
    /**
     * Запрошенное количество платежей для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество платежей для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество платежей в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего платежей.
     * @format int32
     */
    total: number
    /** Список платежей. */
    results?: PaymentResponse[]
}

/**
 *
 * Может принимать одно из двух значений:
 * <ul>
 * <li>IGNORE_ERRORS — реестр будет создан из всех корректных платежей, его идентификатор вернется в поле <b>paymentRegistryId</b> метода <a href="/docs/api/self-employed-get-payment-registry-create-result">Получить результат создания черновика платежного реестра</a>. Если корректных платежей нет, реестр не создастся.</li>
 * <li>FAIL_ERRORS — если есть ошибочные платежи, реестр не создастся.
 * </ul>
 * Значение по умолчанию — FAIL_ERRORS.</li>
 */
export enum SelfEmployedRegistryCreateTypeRequest {
    IGNORE_ERRORS = 'IGNORE_ERRORS',
    FAIL_ERRORS = 'FAIL_ERRORS'
}

export interface CardBankDetailsResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Идентификатор банковских реквизитов.
     * @format uuid
     */
    bankDetailsId: string
    /**
     * Тип банковских реквизитов:
     * * `PAYMENT_DETAILS` — По реквизитам счета.
     * * `CARD` — На карту.
     * * `SBP` — Через СБП.
     */
    type: CardBankDetailsResponseTypeEnum
    /** Являются ли реквизиты основными для бенефициара. По умолчанию для первых добавленных реквизитов — `true`, для следующих — `false`. */
    isDefault?: boolean
    /**
     * Идентификатор карты в системе банка.
     * @minLength 1
     * @maxLength 256
     */
    cardId: string
    /**
     * Ключ терминала.
     * @minLength 1
     * @maxLength 256
     */
    terminalKey: string
}

/** Ошибка по результатам проверки бенефициара в финансовом мониторинге. */
export interface BeneficiaryScoringError {
    /** Код ошибки. */
    code: string
    /** Описание ошибки. */
    description: string
}

export type ReceiptResponse =
    | FromForeignAgencyReceiptResponse
    | FromIndividualReceiptResponse
    | FromLegalEntityReceiptResponse

export interface SelfEmployedPayPaymentRegistryResultRequest {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
}

/** Тип подписки. */
export enum BundleCode {
    PRO = 'PRO',
    PREMIUM = 'PREMIUM',
    PRIVATE = 'PRIVATE',
    TEAM_PRO = 'TEAM_PRO',
    TEAM_SELECT = 'TEAM_SELECT',
    TEAM_PREMIUM = 'TEAM_PREMIUM',
    TEAM_PRIVATE = 'TEAM_PRIVATE',
    DEFAULT = 'DEFAULT'
}

/** Реквизиты для оплаты налогов за третьих лиц. <a href="https://glavkniga.ru/situations/s509587">Подробнее</a>. */
export interface TaxThirdParty {
    /**
     * ИНН третьего лица.
     * @pattern ^(\d{12}|\d{10}|0{1})$
     */
    inn: string
    /**
     * КПП третьего лица.
     * @pattern ^(\d{9}|0)$
     */
    kpp: string
}

export interface BankDetailsListResponse {
    /**
     * Запрошенное количество реквизитов для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество реквизитов для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество реквизитов в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего реквизитов, подходящих под условия запроса.
     * @format int32
     */
    total: number
    /** Список реквизитов бенефициара. */
    results?: BankDetailsResponse[]
}

export interface CancelTaskRequest {
    /** Причина отмены задания. */
    reason: string
}

export interface CancelReceiptRequest {
    /** Причина аннулирования. */
    reason: CancelReceiptRequestReasonEnum
}

export type ReceiptOperation = ReceiptFailedOperation | ReceiptInProgressOperation | ReceiptSuccessOperation

export interface Ready {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Статус проверки в финансовом мониторинге. */
    status: ReadyStatusEnum
    result: BeneficiaryScoringResult
}

export interface SbpBankDetailsResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Идентификатор банковских реквизитов.
     * @format uuid
     */
    bankDetailsId: string
    /**
     * Тип банковских реквизитов:
     * * `PAYMENT_DETAILS` — По реквизитам счета.
     * * `CARD` — На карту.
     * * `SBP` — Через СБП.
     */
    type: SbpBankDetailsResponseTypeEnum
    /** Являются ли реквизиты основными для бенефициара. По умолчанию для первых добавленных реквизитов — `true`, для следующих — `false`. */
    isDefault?: boolean
    /**
     * Номер мобильного телефона.
     * @pattern ^((\+7)([0-9]){10})$
     */
    phoneNumber: string
    /**
     * Идентификатор банка в системе быстрых платежей.
     * @pattern ^\d{12}$
     */
    bankId: string
    /**
     * Ключ терминала.
     * @minLength 1
     * @maxLength 256
     */
    terminalKey: string
}

/** Баланс счета. */
export interface Balance1 {
    /** Текущий остаток на счете. */
    balance: number
    /** Доступный остаток без учета овердрафта и с вычетом блокировок. */
    realOtb: number
    /** Доступный остаток — деньги на счете + сумма доступного овердрафта, если он подключен. */
    otb: number
    /** Сумма авторизаций — захолдированные на счете средства. */
    authorized: number
    /** Сумма платежей в картотеке клиента — собственные платежи. */
    pendingPayments: number
    /** Сумма платежей в картотеке банка — требования к клиенту. */
    pendingRequisitions: number
}

export interface PersonalDataResponse {
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace: string
    /**
     * ИНН.
     * @pattern ^(\d{12})$
     */
    inn: string
    /** Фамилия. */
    lastName: string
    /** Отчество, если есть. */
    middleName?: string
    /** Имя. */
    firstName: string
    /** Адрес регистрации. */
    address: string
    /**
     * БИК банка.
     * @pattern \d{9}
     */
    bic?: string
    /** Номер лицевого счета в Т-Банке. */
    accountNumber?: string
    /** Паспортные данные. */
    passport: Passport3
}

/** Информация о контрагенте */
export interface Merch {
    /** Идентификатор */
    id?: string
    /** Имя */
    name?: string
    /** Место совершения операции (Адрес) */
    address?: string
    /** Место совершения операции (Город) */
    city?: string
    /** Место совершения операции (Страна) */
    country?: string
}

/** Тип телефона. */
export enum CreatePhoneType {
    ValueМобильный = 'Мобильный',
    ValueПоМестуЖительства = 'По месту жительства',
    ValueРабочий = 'Рабочий'
}

/** Адрес бенефициара. */
export interface Address {
    /**
     *
     * Тип адреса.
     * Для типов `FL_RESIDENT`, `FL_NONRESIDENT`, `IP_RESIDENT`, `IP_NONRESIDENT` обязателен один из адресов:
     *
     *  * `REGISTRATION_ADDRESS` — адрес регистрации по месту жительства;
     *  * `RESIDENCE_ADDRESS` — адрес регистрации по месту пребывания.
     *
     * Для типов `UL_RESIDENT`, `UL_NONRESIDENT` обязательно передавать `LEGAL_ENTITY_ADDRESS` — адрес юридического лица.
     */
    type: AddressTypeEnum
    /**
     * Адрес.
     * @maxLength 256
     */
    address: string
}

export interface CreateSelfEmployedResultResponse {
    /** Список результатов создания самозанятых. */
    recipientResults?: CreateSelfEmployed[]
}

export interface BeneficiaryFlResidentRequest {
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryFlResidentRequestTypeEnum
    /** Имя. */
    firstName: string
    /** Отчество. */
    middleName?: string
    /** Фамилия. */
    lastName: string
    /** Самозанятый. */
    isSelfEmployed: boolean
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace?: string
    /**
     * Гражданство. Код страны в формате `ISO 3166-1 alpha-2`.
     * @pattern ^([A-Z]{2})$
     */
    citizenship: string
    /**
     * Номер телефона. Номер телефона или электронная почта обязательны к заполнению.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. Номер телефона или электронная почта обязательны к заполнению. */
    email?: string
    /**
     * Документы. Обязательный тип для физического лица-резидента — `PASSPORT`.
     * @minItems 1
     */
    documents: Document2[]
    /**
     * Адреса
     * @minItems 1
     */
    addresses: Address[]
    /**
     * ИНН
     * @pattern ^(\d{12})$
     */
    inn?: string
    /**
     * СНИЛС
     * @pattern ^(\d{11})$
     */
    snils?: string
}

export interface ApiBlacklistResponse {
    /** Находится ли пользователь в черных списках. */
    isBlacklisted: boolean
}

export interface SelfEmployedReceiptsResponse {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
}

export interface SelfEmployedPaymentRegistry {
    /** Статус платежного реестра:<br /><ul><li>DRAFT — готов к отправке;</li><li>ERROR — ошибка создания;</li><li>ACCEPTED — ожидает поступления денежных средств;</li><li>EXECUTED — исполнен;</li><li>PART_EXEC — исполнен частично;</li><li>REJECTED — отклонен банком;</li><li>CANCELLED — отменен;</li><li>DELETED — удален.</li></ul> */
    status: PaymentRegistryStatus1
    /** Дата исполнения реестра. */
    loadDate?: string
    /**
     * Количество платежей в реестре.
     * @format int32
     */
    paymentsCount: number
    /** Общая сумма платежей в реестре. */
    totalSum: number
    /** Список платежей внутри реестра. */
    payments?: SelfEmployedPaymentInfo[]
}

export interface CreateAddress1 {
    /** Тип адреса. */
    type: CreateAddressType
    /** Страна. */
    country?: string
    /** Индекс. */
    postalCode: string
    /** Регион. */
    state: string
    /** Город. */
    city?: string
    /** Район. */
    district?: string
    /** Населенный пункт. */
    settlement?: string
    /** Улица. */
    street?: string
    /** Дом. */
    house?: string
    /** Здание. */
    building?: string
    /** Корпус. */
    construction?: string
    /** Квартира. */
    apartment?: string
}

export interface Contract {
    /** Тип документа. */
    type: ContractTypeEnum
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate?: string
}

export interface BeneficiaryUlNonresidentRequest {
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryUlNonresidentRequestTypeEnum
    /** Наименование организации. */
    name: string
    /**
     * Номер телефона. phoneNumber или email обязателен к заполнению.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. phoneNumber или email обязателен к заполнению. */
    email?: string
    /**
     * Адреса.
     * @minItems 1
     */
    addresses: Address[]
    /** Номер записи об аккредитации. */
    nza?: string
    /**
     * Дата регистрации.
     * @format date
     */
    registrationDate: string
    /** Номер регистрации. */
    registrationNumber: string
    /** Организационно-правовая форма. */
    opf?: string
    /**
     * ИНН.
     * @pattern ^(\d{10})$
     */
    inn?: string
    /** Код иностранной организации. Обязателен, если ИНН не задан. */
    kio?: string
}

/** Статус заявки. */
export enum ApplicationStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface ReissueVirtualCardRequest {
    /**
     * Уникальный идентификатор карты.
     * @format int64
     */
    ucid: number
}

export interface ReadyAddCardRequestResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Идентификатор запроса на добавление карты. */
    addCardRequestId: string
    /**
     * Ключ терминала.
     * @minLength 1
     * @maxLength 256
     */
    terminalKey: string
    /**
     * Статус запроса на добавление карты:
     * * `PENDING` — карта в процессе добавления.
     * * `READY` — карта успешно добавлена.
     * * `FAILED` — не удалось добавить карту.
     */
    status: ReadyAddCardRequestResponseStatusEnum
    /**
     * Идентификатор банковских реквизитов.
     * @format uuid
     */
    bankDetailsId: string
}

export interface DiplomaticPassport {
    /** Тип документа. */
    type: DiplomaticPassportTypeEnum
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /** Кем выдан. */
    organization: string
}

export interface SbpBankDetails {
    /**
     * Тип банковских реквизитов:
     * * `PAYMENT_DETAILS` — По реквизитам счета.
     * * `CARD` — На карту.
     * * `SBP` — Через СБП.
     */
    type: SbpBankDetailsTypeEnum
    /**
     * Номер мобильного телефона.
     * @pattern ^((\+7)([0-9]){10})$
     */
    phoneNumber: string
    /**
     * Идентификатор банка в системе быстрых платежей.
     * @pattern ^\d{12}$
     */
    bankId: string
    /**
     * Ключ терминала.
     * @minLength 1
     * @maxLength 256
     */
    terminalKey: string
}

export interface CreateDocument {
    /** Тип документа. */
    type: DocumentType
    /** Серия. */
    serial: string
    /** Номер документа. */
    number?: string
    /**
     * Дата.
     * @format date
     */
    date: string
    /** Кем выдан. */
    organization: string
    /** Код подразделения. */
    division?: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate?: string
}

/** Тип операции */
export enum AccountOperationType {
    Debit = 'debit',
    Credit = 'credit'
}

export interface DealRequest {
    /**
     * Номер номинального счета.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
}

export interface BeneficiaryScoringInfoListResponseV2 {
    /**
     * Запрошенное количество результатов проверки для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество результатов проверки для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество результатов проверки в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего результатов проверки, подходящих под условия запроса.
     * @format int32
     */
    total: number
    /** Список результатов проверки. */
    results?: BeneficiaryScoringInfoV2[]
}

export interface EmployeeResponse {
    /** Список сотрудников. */
    employees?: Employee[]
}

/** Статус подписания платежного реестра. */
export enum SubmissionStatus1 {
    ACCEPTED = 'ACCEPTED',
    ERROR = 'ERROR',
    IN_PROGRESS = 'IN_PROGRESS'
}

export interface SUCCEEDED {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Статус проверки в финансовом мониторинге. */
    status: SucceededStatusEnum
    warnings?: BeneficiaryScoringError[]
}

export interface Document1 {
    /** Тип документа. */
    type: DocumentType1
    /** Серия. */
    serial?: string
    /** Номер документа. */
    number?: string
    /**
     * Дата.
     * @format date
     */
    date?: string
    /** Кем выдан. */
    organization?: string
    /** Код подразделения. */
    division?: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate?: string
}

/** Статус создания:<br /><ul><li><code>QUEUED</code> — сотрудник  стоит в очереди на создание.</li><li><code>CREATED</code> — сотрудник создан в зарплатном проекте.</li><li><code>ERROR</code> — сотрудник не был создан в зарплатном проекте. Ошибки перечислены в параметре <b>errors</b>.</li></ul> */
export enum CreationEmployedStatus {
    CREATED = 'CREATED',
    ERROR = 'ERROR',
    QUEUED = 'QUEUED'
}

export interface OperationsResponse {
    /** Список картотек ЭТП. */
    etpFees?: Etp[]
    /** Список списаний за нарушения контракта. */
    contractBreaches?: Etp[]
    /** Данные о блокировках. */
    arrests: ListOfArrest
}

export interface RkcBankDetailsRequest {
    /**
     * Тип банковских реквизитов:
     * * `PAYMENT_DETAILS` — По реквизитам счета.
     * * `CARD` — На карту.
     * * `SBP` — Через СБП.
     */
    type: RkcBankDetailsRequestTypeEnum
    /** Являются ли реквизиты основными для бенефициара. По умолчанию для первых добавленных реквизитов — `true`, для следующих — `false`. */
    isDefault?: boolean
    /**
     * БИК банка получателя.
     *
     *
     * С 1 января 2021 года при перечислении налоговых платежей указываются новые значения БИК банков получателя.
     *
     *
     * <a href="https://spmag.ru/articles/polya-platezhnogo-porucheniya-v-2021-godu-obrazec">Подробнее о полях платежного поручения</a>
     * @pattern \d{9}
     */
    bik: string
    /**
     * КПП получателя. Чтобы не заполнять, передайте `0`. Обязательно только для бенефициаров юридических лиц-резидентов (UL_RESIDENT).
     * @pattern ^(\d{9}|0)$
     */
    kpp?: string
    /**
     *
     * ИНН бенефициара. Если платеж выполняется в пользу физического или юридического лица-нерезидента (FL_RESIDENT/FL_NONRESIDENT/UL_NONRESIDENT) и его ИНН неизвестен, передайте `0`.
     * В остальных случаях передавайте фактический ИНН получателя.
     * \
     * Если у бенефициара в методе создания бенефициара был заполнен ИНН, поле ИНН заполнять не нужно.
     * ИНН подставляется автоматически по информации из бенефициара в момент отправки платежа. Для корректной работы передавать `0` не нужно.
     * @pattern ^(\d{12}|\d{10}|0{1})$
     */
    inn?: string
    /**
     * Наименование получателя.
     * @maxLength 160
     */
    name?: string
    /**
     * Наименование банка получателя.
     * @minLength 1
     * @maxLength 160
     */
    bankName: string
    /**
     * Номер расчетного счета получателя.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * Корреспондентский счет банка получателя.
     * @pattern \d{20}
     */
    corrAccountNumber: string
}

export interface DeponentResponse {
    /**
     * Идентификатор сделки.
     * @format uuid
     */
    dealId: string
    /**
     * Идентификатор этапа сделки.
     * @format uuid
     */
    stepId: string
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Сумма депонента. */
    amount: number
}

export interface ResidencePermit {
    /** Тип документа. */
    type: ResidencePermitTypeEnum
    /** Серия документа. */
    serial?: string
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate?: string
}

export interface GetTaxpayerStatusResponse {
    /** Статус самозанятости в Т-Банке. */
    status: string
    info?: Info
    /** Объект с информацией о последней заявке на изменение самозанятости в Т-Банке. Изначально имеет статус IN_PROGRESS и переходит в DONE при завершении процесса (как успешном, так и с ошибкой). Если от пользователя требуется выдать права в ЛК ФНС, то будет иметь subStatus PERMISSION_REQUESTED. После создания новой заявки — предыдущая исчезает. Нельзя завести новую заявку, если текущая IN_PROGRESS. */
    application?: Application
}

/** Не требующий идентификации контакт. */
export interface BeneficiaryLiteContactResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryLiteContactResponseTypeEnum
}

/** Паспортные данные. */
export interface Passport3 {
    /**
     * Серия и номер.
     * @pattern ^\d{4}\d{6}$
     */
    serialNumber: string
    /** Кем выдан. */
    unitName: string
    /**
     * Код подразделения.
     * @pattern ^\d{3}-\d{3}$
     */
    unitCode: string
    /**
     * Дата выдачи в формате `yyyy-mm-dd`.
     * @pattern ^\d{4}-\d{2}-\d{2}$
     */
    issueDate: string
    /** Гражданство. Код страны в формате ISO 3166-1 alpha-2. */
    citizenship?: string
}

export interface FromIndividualReceiptResponse {
    /**
     * Идентификатор чека.
     * @format uuid
     */
    receiptId: string
    /** От кого самозанятый получил доход. */
    incomeType: FromIndividualReceiptResponseIncomeTypeEnum
    /**
     * Дата и время получения дохода в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    incomeReceivedAt: string
    /**
     * Дата и время заявления дохода в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    incomeStatedAt: string
    /** Статус чека. */
    status: ReceiptStatus
    /** Сумма заявленного дохода. */
    totalAmount: number
    /** Массив объектов с информацией об оказанных услугах. */
    services?: ReceiptService[]
    /** Массив объектов с информацией по операциям, произведенным с чеком. */
    operations?: ReceiptOperation[]
    /** Ссылка на временный чек в случае недоступности сервисов ФНС. */
    tinkoffLink?: string
    /** Ссылка на чек в случае успешной регистрации в ФНС. */
    fnsLink?: string
}

export interface CreateSelfEmployedResponse {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
}

export interface Contact {
    /** Уникальный идентификатор контакта. */
    id: string
    /** Роль. */
    role?: string
    /** Имя. */
    firstName?: string
    /** Фамилия. */
    lastName?: string
    /** Отчество. */
    middleName?: string
    /**
     * Дата рождения.
     * @format date
     */
    birthDate?: string
    /** Телефон. */
    phones?: Phone2[]
    /** Документы, удостоверяющие личность. Для роли `REALTOR` параметр можно не передавать. */
    documents?: IdentificationDocument[]
}

/** Объект с информацией о лимите на снятие наличных. */
export interface CashLimit {
    /** Лимит на снятия наличных в валюте счета, к которому привязана карта. */
    limitValue: number
    /** Доступный остаток лимита на снятия наличных в валюте счета, к которому привязана карта. */
    limitRemain: number
    /**
     *
     * Период обновления доступного остатка лимита на снятия наличных:
     * <ul>
     * <li>`DAY" — доступный остаток станет равным лимиту в начале следующих суток;</li>
     * <li>`MONTH` — доступный остаток станет равным лимиту в начале следующего месяца;</li>
     * <li>`IRREGULAR` — доступный остаток станет равным лимиту только при обновлении лимита;</li>
     * <li>`CUSTOM` — период обновления лимита установлен в дополнительное состояние вручную — его можно узнать у вашего персонального менеджера.</li>
     * </ul>
     */
    limitPeriod: OutputLimitPeriod
}

export interface CreatePaymentDraftRequest {
    /**
     * Номер распоряжения, определяемый клиентом.
     * @pattern ^(\d{1,6})$
     */
    documentNumber: string
    /**
     * Дата и время исполнения платежа. Может быть в будущем или не передаваться. Если поле не передано, подписанный документ будет принят к исполнению немедленно.
     * @format date-time
     */
    date?: string
    /** Сумма платежа. */
    amount: number
    /** Получатель. */
    recipientName: string
    /**
     * ИНН получателя. Если платеж выполняется в пользу физ. лица и его ИНН неизвестен, передайте <code>0</code>. Во всех остальных случаях передавайте фактический ИНН получателя.
     * @pattern ^(\d{12}|\d{10}|0{1})$
     */
    inn: string
    /**
     * КПП получателя. Если у получателя платежа нет КПП, например, это физ. лицо или ИП, передайте <code>0</code>.
     * @pattern ^(\d{9}|0)$
     */
    kpp: string
    /** Номер счета получателя. */
    bankAcnt: string
    /** БИК банка. */
    bankBik: string
    /**
     * Номер расчетного счета для списания.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * Назначение платежа.
     * @minLength 1
     * @maxLength 210
     */
    paymentPurpose: string
    /**
     * Очередность платежа.
     * @deprecated
     * @format int32
     * @min 1
     * @max 5
     */
    executionOrder?: number
    /** Статус составителя расчетного документа. Поле платежки 101. Если платеж не бюджетный, передайте <code>0</code>. */
    taxPayerStatus: string
    /** Код бюджетной классификации. Поле платежки 104. Если платеж не бюджетный или КБК отсутствует, передайте <code>0</code>. */
    kbk: string
    /** Код ОКТМО территории, на которой мобилизуются денежные средства от уплаты налога, сбора и иного платежа. Если платеж не бюджетный, передайте <code>0</code>. */
    oktmo: string
    /** Основание налогового платежа. Поле платежки 106. Если платеж не бюджетный или основание неизвестно, передайте <code>0</code>. */
    taxEvidence: string
    /** Налоговый период. Поле платежки 107. Формат — ДД.ММ.ГГГГ, первые два символа могут быть буквами. Если платеж не бюджетный или период отсутствует, передайте <code>0</code>. */
    taxPeriod: string
    /** Уникальный идентификатор платежа. Если платеж не бюджетный, передайте <code>0</code>. */
    uin: string
    /** Номер налогового документа. Поле платежки 108. Если платеж не бюджетный или задолженность оплачивается в добровольном порядке, передайте <code>0</code>. */
    taxDocNumber: string
    /** Дата налогового документа. Поле платежки 109. Формат — ДД.ММ.ГГГГ. Если платеж не бюджетный или дата отсутствует, передайте <code>0</code>. */
    taxDocDate: string
    /** Код вида выплаты. Обязательное поле для платежей в пользу физ. лиц. <a href="https://www.audit-it.ru/news/account/1013406.html">Подробнее</a>. */
    revenueTypeCode?: CreatePaymentDraftRequestRevenueTypeCodeEnum
    /** Удержанная сумма из заработной платы и иных доходов работника в рублях. <a href="https://www.b-kontur.ru/enquiry/95">Подробнее</a>. */
    collectionAmountNumber?: number
    /** Корреспондентский счет банка получателя. Для налогового платежа обязательно указывается номер счета банка получателя средств — номер банковского счета, который входит в состав единого казначейского счета (ЕКС). */
    recipientCorrAccountNumber?: string
    /** Информация для совершения налоговых платежей за третьих лиц. */
    thirdParty?: ThirdPartyInfo
}

/** Статус операции. */
export enum ReceiptOperationStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED'
}

export interface CreateSelfEmployedData {
    /**
     * Идентификатор самозанятого на стороне клиента.
     * @format int32
     */
    number: number
    /** Имя (кириллица). */
    firstName: string
    /** Фамилия (кириллица). */
    lastName: string
    /** Отчество (кириллица). */
    middleName?: string
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace: string
    /** Гражданство. */
    citizenship: string
    /** Электронная почта. */
    email?: string
    /** Имя (латиница). */
    latinFirstName?: string
    /** Фамилия (латиница). */
    latinLastName?: string
    /** Мобильный телефон. */
    phones?: CreatePhone1[]
    /** Адреса места жительства и регистрации. */
    addresses?: CreateAddress1[]
    /**
     * Для граждан РФ укажите данные паспорта.
     *
     *
     * Для иностранных граждан укажите:
     * <ul>
     *   <li>Один из основных документов — «Иностранный паспорт», «Загр. паспорт иностранного гр.», «Служебный/официальный паспорт», «Дипломатический паспорт».</li>
     *   <li>Один из миграционных документов — «Миграционная карта», «Разр. на временное проживание», «Вид на жительство».</li>
     * </ul>
     *
     */
    documents?: CreateDocument1[]
    /** Если значение передано, Т-Банк поставит исполнителя на учет как самозанятого. Функция доступна клиентам, которые получили от исполнителей согласие на регистрацию. */
    registrationInfo?: CreateSelfEmployedRegistrationInfo
}

export interface FromLegalEntityReceiptResponse {
    /**
     * Идентификатор чека.
     * @format uuid
     */
    receiptId: string
    /** От кого самозанятый получил доход. */
    incomeType: FromLegalEntityReceiptResponseIncomeTypeEnum
    /**
     * Дата и время получения дохода в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    incomeReceivedAt: string
    /**
     * Дата и время заявления дохода в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    incomeStatedAt: string
    /** Статус чека. */
    status: ReceiptStatus
    /** Сумма заявленного дохода. */
    totalAmount: number
    /** Массив объектов с информацией об оказанных услугах. */
    services?: ReceiptService[]
    /** Массив объектов с информацией по операциям, произведенным с чеком. */
    operations?: ReceiptOperation[]
    /**
     * ИНН компании-заказчика, которой самозанятый оказал услугу.
     * @pattern ^(\d{10})$
     */
    customerInn: string
    /** Название компании-заказчика, которой самозанятый оказывал услуги. */
    customerOrganization: string
    /** Ссылка на временный чек в случае недоступности сервисов ФНС. */
    tinkoffLink?: string
    /** Ссылка на чек в случае успешной регистрации в ФНС. */
    fnsLink?: string
}

export interface SbpBankDetailsRequest {
    /**
     * Тип банковских реквизитов:
     * * `PAYMENT_DETAILS` — По реквизитам счета.
     * * `CARD` — На карту.
     * * `SBP` — Через СБП.
     */
    type: SbpBankDetailsRequestTypeEnum
    /** Являются ли реквизиты основными для бенефициара. По умолчанию для первых добавленных реквизитов — `true`, для следующих — `false`. */
    isDefault?: boolean
    /**
     * Ключ терминала.
     * @minLength 1
     * @maxLength 256
     */
    terminalKey: string
    /**
     * Номер мобильного телефона.
     * @pattern ^((\+7)([0-9]){10})$
     */
    phoneNumber: string
    /**
     * Идентификатор банка в системе быстрых платежей.
     * @pattern ^\d{12}$
     */
    bankId: string
}

export interface Interval {
    /** Время начала интервала. Локальное время в формате `ISO 8601`. */
    startInterval: string
    /** Время окончания интервала. Локальное время в формате `ISO 8601`. */
    endInterval: string
}

export interface CreateForeignAgencyReceiptRequest {
    /**
     * От кого самозанятый получил доход:
     * * `FROM_INDIVIDUAL` — от физического лица;
     * * `FROM_LEGAL_ENTITY` — от компании;
     * * `FROM_FOREIGN_AGENCY` — от иностранной компании.
     */
    incomeType: CreateForeignAgencyReceiptRequestIncomeTypeEnum
    /**
     * Дата и время получения дохода в UTC. Ожидается в ISO-8601 формате <b>yyyy-MM-ddTHH:mm:ss<.fff><TZDSuffix></b>, где:
     * * HH — часы в 24-часовой нотации. Допускаются значения от 00 до 23.
     * * .fff — опциональная часть, содержащая доли секунд. Допускается не больше трех знаков.
     * * TZDSuffix — опциональный суффикс. Допускается значение <code>Z</code> или <code>+00:00</code>.
     * @format date-time
     */
    incomeReceivedAt?: string
    /** Список услуг. */
    services?: ReceiptService[]
    /** Название организации, которой самозанятый оказывал услуги. */
    customerOrganization: string
}

export interface CreateApplicationResponse {
    /**
     * ID заявки на выпуск виртуальной карты на сотрудника.
     * @format uuid
     */
    cardIssueApplicationId: string
}

export interface HoldListResponse {
    /**
     * Запрошенное количество холдов для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество холдов для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество холдов в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего холдов, подходящих под условия запроса.
     * @format int32
     */
    total: number
    /** Список холдов. */
    results?: HoldListItem[]
}

export interface EmployeesInfoRequest {
    /** Идентификаторы сотрудников. */
    employeeIds?: number[]
}

export interface CreatePaymentRegistryResultResponse {
    /**
     * Идентификатор платежного реестра
     * @format int32
     */
    paymentRegistryId?: number
    /** Статус создания:<br /><ul><li>QUEUED — платежный реестр стоит в очереди на создание.</li><li>CREATED — платежный реестр создан.</li><li>ERROR — платежный реестр не был создан. Ошибки перечислены в параметре <b>errors</b>.</li></ul> */
    status: CreationRegistryStatus
    /** Общая ошибка, произошедшая при создании реестра. */
    error?: {
        /** Название поля, в котором возникла ошибка, на русском языке. */
        fieldName: string
        /** Описание ошибки. */
        errorDescription: string
    }
    /** Платежи внутри реестра, содержащие ошибки. */
    paymentErrors?: PaymentError[]
}

export interface CardIssueApplicationStatusResponse {
    /**
     * Идентификатор заявки на выпуск бизнес-карты.
     * @format uuid
     */
    cardIssueApplicationId: string
    /**
     *
     * Статус заявки:
     * <ul>
     * <li>`NEW` — заявка принята, в работу еще не взята;</li>
     * <li>`IDENTIFICATION` — производится удаленная идентификация сотрудника, на которого выпускается бизнес-карта;</li>
     * <li>`ISSUING` — бизнес-карта выпускается;</li>
     * <li>`FAILED_FATAL` — в процессе возникла фатальная ошибка, выпустить бизнес-карту на этого сотрудника нельзя;</li>
     * <li>`FAILED_NON_FATAL` — в процессе возникла ошибка, подайте новую заявку;</li>
     * <li>`CARD_ISSUED` — карта выпущена.</li>
     *  </ul>
     */
    status: CardIssueApplicationStatus
    /** Описание причины неуспешной обработки. Возвращается только для статусов `FAILED_NON_FATAL` и `FAILED_FATAL`. */
    failedReason?: string
    /**
     * Идентификатор карты. Возвращается только для статуса `CARD_ISSUED`.
     * @format int64
     */
    ucid?: number
}

export interface DocumentResponse {
    /**
     * ID документа.
     * @format uuid
     */
    id: string
    /** Тип документа. */
    title: string
    /** Название файла. */
    fileName: string
    /** Формат файла. */
    mime: string
    /**
     * Размер файла.
     * @format int64
     */
    size: number
}

export interface ApiPDLResponse {
    /** Является ли пользователь публичным должностным лицом. */
    isPublicOfficialPerson: boolean
}

export interface BeneficiaryIpNonresidentResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryIpNonresidentResponseTypeEnum
    /** Имя. */
    firstName: string
    /** Отчество. */
    middleName?: string
    /** Фамилия. */
    lastName: string
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace?: string
    /**
     * Гражданство. Код страны в формате `ISO 3166-1 alpha-2`.
     * @pattern ^([A-Z]{2})$
     */
    citizenship: string
    /**
     * Номер телефона.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. */
    email?: string
    /** Документы. */
    documents?: Document2[]
    /** Адреса. */
    addresses?: Address[]
    /**
     * Дата регистрации.
     * @format date
     */
    registrationDate: string
    /**
     * ИНН.
     * @pattern ^(\d{12})$
     */
    inn?: string
    /**
     * Основной государственный регистрационный номер.
     * @pattern ^(\d{15})$
     */
    ogrn?: string
}

export interface CreateSelfEmployed {
    /**
     * Номер самозанятого, переданный клиентом при создании.
     * @format int32
     */
    number: number
    /**
     * Идентификатор самозанятого. Может не прийти, если при создании самозанятого возникли ошибки.
     * @format int32
     */
    recipientId?: number
    /** Имя. */
    firstName: string
    /** Фамилия. */
    lastName: string
    /** Отчество. */
    middleName?: string
    /**
     *
     * Статус создания:
     *
     * <ul><li><code>QUEUED</code> — самозанятый стоит в очереди на создание;</li>
     * <li><code>CREATED</code> — самозанятый создан;</li>
     * <li><code>ERROR</code> — самозанятый не был создан. Ошибки перечислены в параметре <b>errors</b>.</li></ul>
     *
     */
    status: CreationSelfEmployedStatus
    /** Список ошибок. */
    errors?: FieldValidationError[]
}

export interface EmployedSubmitPaymentError {
    /**
     * Идентификатор платежа, переданный клиентом при создании.
     * @format int32
     */
    number: number
    /** Номер счета сотрудника. */
    accountNumber?: string
    /** Ошибки валидации. */
    errors?: {
        /** Название поля, в котором возникла ошибка, на русском языке. */
        fieldName: string
        /** Описание ошибки. */
        errorDescription: string
    }[]
}

export interface SelfEmployedCreatePaymentRegistryRequest {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
    /**
     *
     * Номер счета компании, с которого будут списаны деньги для оплаты реестра — при наличии РКО в Т-Банке.<br />
     * Если номер счета не передан, средства спишутся с основного счета компании.
     *
     */
    compunknownAccountNumber?: string
    /**
     *
     * Может принимать одно из двух значений:
     * <ul>
     * <li>IGNORE_ERRORS — реестр будет создан из всех корректных платежей, его идентификатор вернется в поле <b>paymentRegistryId</b> метода <a href="/docs/api/self-employed-get-payment-registry-create-result">Получить результат создания черновика платежного реестра</a>. Если корректных платежей нет, реестр не создастся.</li>
     * <li>FAIL_ERRORS — если есть ошибочные платежи, реестр не создастся.
     * </ul>
     * Значение по умолчанию — FAIL_ERRORS.</li>
     */
    registryCreateType?: SelfEmployedRegistryCreateTypeRequest
    /** Список платежей внутри реестра. */
    payments?: SelfEmployedCreatePaymentInfo[]
    /**
     *
     * <ul>
     * <li><code>true</code> — Т-Банк переведет 6% от суммы платежа на налоговую копилку для последующей оплаты налогов;</li>
     * <li><code>false</code> — самозанятый получит полную сумму и налог удержан не будет.</li>
     * </ul>
     * Значение по умолчанию — <code>false</code>.
     */
    taxHolding?: boolean
    /**
     *
     * Может принимать одно из двух значений:
     * <ul>
     * <li>FROM_LEGAL_ENTITY — самозанятые получают доход от юридического лица;</li>
     * <li>FROM_INDIVIDUAL — самозанятые получают доход от физического лица.</li>
     * </ul>
     * Значение по умолчанию — FROM_LEGAL_ENTITY.
     */
    incomeType?: SelfEmployedIncomeType
}

export interface SetLimitRequest {
    /**
     * Величина лимита в валюте счета, к которому привязана карта. До двух дробных знаков.
     * @min 0
     * @max 1000000000000
     * @exclusiveMax true
     */
    limitValue: number
    /**
     *
     * Период обновления доступного остатка:
     * <ul>
     * <li>"DAY" &ndash; доступный остаток станет равным лимиту в начале следующих суток</li>
     * <li>"MONTH" &ndash; доступный остаток станет равным лимиту в начале следующего месяца</li>
     * <li>"IRREGULAR" &ndash; доступный остаток станет равным лимиту только при обновлении лимита</li>
     * </ul>
     */
    limitPeriod: InputLimitPeriod
}

/** Информация о банке. */
export interface BankInfo {
    /**
     * БИК.
     * @pattern \d{9}
     */
    bik: string
    /**
     * Корреспондентский счет.
     * @pattern \d{20}
     */
    corAccount: string
    /**
     * Наименование банка.
     * @minLength 1
     * @maxLength 255
     */
    name: string
}

export interface CreatePaymentRegistryResponse {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
}

/** Статус платежа. */
export enum PayStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    EXECUTED = 'EXECUTED',
    ERROR = 'ERROR',
    SENT = 'SENT'
}

export interface SelfEmployedPaymentInfo {
    /**
     * Идентификатор платежа на стороне клиента. Не возвращается, если платежный реестр был создан через личный кабинет.
     * @format int32
     */
    number?: number
    /** Статус платежа:<br /><ul><li>WAITING — платеж ожидает отправки реестра;</li><li>ACCEPTED — платеж ожидает исполнения реестра;</li><li>EXECUTED — платеж исполнен;</li><li>REJECTED — платеж отклонен банком;</li><li>CANCELLED — платеж отменен;</li><li>DELETED — платеж удален.</li></ul> */
    status: PaymentInfoRegistryStatus1
    /** Данные самозанятого. */
    selfEmployedInfo: {
        /** Имя (кириллица). */
        firstName: string
        /** Фамилия (кириллица). */
        lastName: string
        /** Отчество (кириллица). */
        middleName?: string
    }
    /** Номер счета самозанятого. */
    accountNumber?: string
    /** Назначение платежа. */
    paymentPurpose?: string
    /** Сумма платежа. */
    sum: number
    /** Код вида дохода. */
    revenueTypeCode?: SelfEmployedPaymentInfoRevenueTypeCodeEnum
    /** Удержанная сумма. */
    collectionAmount?: number
}

export interface CreateMeetingResponse {
    /** Идентификатор назначенной встречи */
    meetingId: string
}

export interface CardInfoSeqResponse {
    /** Список карт компании. */
    cards?: CardInfoResponse[]
    /**
     * Количество пропущенных карт.
     * @format int32
     */
    offset: number
    /**
     * Количество карт на странице.
     * @format int32
     */
    limit: number
    /**
     * Общее количество карт.
     * @format int32
     */
    totalNumber: number
}

/** Информация о работе. */
export interface CreateJobInfo {
    /** Должность. */
    position: string
}

export interface Phone1 {
    /** Тип телефона. */
    type: PhoneType1
    /** Номер телефона. */
    number?: string
}

export interface BeneficiaryIpNonresidentRequest {
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryIpNonresidentRequestTypeEnum
    /** Имя. */
    firstName: string
    /** Отчество. */
    middleName?: string
    /** Фамилия. */
    lastName: string
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace?: string
    /**
     * Гражданство. Код страны в формате `ISO 3166-1 alpha-2`.
     * @pattern ^([A-Z]{2})$
     */
    citizenship: string
    /**
     * Номер телефона. phoneNumber или email обязателен к заполнению.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. phoneNumber или email обязателен к заполнению. */
    email?: string
    /**
     *
     * Документы. Обязательно — минимум 2 документа. Основной документ нерезидента РФ в большинстве случаев — `FOREIGN_PASSPORT`. Второй документ — любой из документов, подтверждающих право на пребывание в РФ. <a href="https://cdn.tbank.ru/static/documents/f829a126-7506-4d38-ae20-c5584668a3a6.pdf">Подробнее о документах</a>.
     *
     *
     *  Для нерезидентов с гражданством BY достаточно 1 документа с типом `FOREIGN_PASSPORT`
     * @minItems 1
     */
    documents: Document2[]
    /**
     * Адреса.
     * @minItems 1
     */
    addresses: Address[]
    /**
     * Дата регистрации.
     * @format date
     */
    registrationDate: string
    /**
     * ИНН.
     * @pattern ^(\d{12})$
     */
    inn: string
    /**
     * Основной государственный регистрационный номер.
     * @pattern ^(\d{15})$
     */
    ogrn?: string
}

export interface BeneficiaryListResponse {
    /**
     * Запрошенное количество бенефициаров для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество бенефициаров для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество бенефициаров в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего бенефициаров у компании.
     * @format int32
     */
    total: number
    /** Список бенефициаров. */
    results?: BeneficiaryResponse[]
}

export interface FieldValidationError1 {
    /** Название поля с ошибкой. */
    fieldName: string
    /** Описание ошибки. */
    errorDescription: string
}

/** Статус платежного реестра:<br /><ul><li>DRAFT — готов к отправке;</li><li>ERROR — ошибка создания;</li><li>ACCEPTED — ожидает поступления денежных средств;</li><li>EXECUTED — исполнен;</li><li>PART_EXEC — исполнен частично;</li><li>REJECTED — отклонен банком;</li><li>CANCELLED — отменен;</li><li>DELETED — удален.</li></ul> */
export enum PaymentRegistryStatus1 {
    DRAFT = 'DRAFT',
    ERROR = 'ERROR',
    ACCEPTED = 'ACCEPTED',
    EXECUTED = 'EXECUTED',
    PART_EXEC = 'PART_EXEC',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED',
    DELETED = 'DELETED'
}

/** Тип карты — кредитная или дебетовая. */
export enum CardType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT'
}

export interface SelfEmployedPaymentRegistryResultSubmitResponse {
    /**
     * Идентификатор платежного реестра.
     * @format int32
     */
    paymentRegistryId: number
    /** Статус подписания платежного реестра. */
    status: SubmissionStatus1
    /** Общая ошибка, произошедшая при создании реестра. */
    error?: {
        /** Код ошибки. */
        errorCode: string
        /** Описание ошибки. */
        errorMessage: string
    }
    /** Платежи внутри реестра, содержащие ошибки. */
    paymentErrors?: SubmitPaymentError[]
}

export interface IdentifyIncomingTransactionRequest {
    /** Список распределений по бенефициарам. */
    amountDistribution?: AmountDistributionItem[]
}

/** Тип декларации. */
export enum DeclarationType {
    Primary = 'Primary',
    Clarifying = 'Clarifying'
}

/** Реквизиты получателя платежа. */
export interface ReceiverRequisites {
    /** Получатель. */
    name: string
    /**
     *
     * ИНН получателя. Если платеж выполняется в пользу физ. лица
     * и его ИНН неизвестен, передайте `0`.
     * Во всех остальных случаях передавайте фактический ИНН получателя.
     * @pattern ^(\d{12}|\d{10}|0{1})$
     */
    inn: string
    /**
     * КПП получателя.
     * @pattern ^(\d{9}|0)$
     */
    kpp?: string
    /**
     * БИК банка получателя.
     *
     *
     * С 1 января 2021 года при перечислении налоговых платежей указываются новые значения БИК банков получателя.
     *
     *
     * <a href="https://spmag.ru/articles/polya-platezhnogo-porucheniya-v-2021-godu-obrazec">Подробнее о полях платежного поручения</a>
     * @pattern \d{9}
     */
    bik: string
    /**
     * Наименование банка получателя.
     *
     *
     * С 1 января 2021 года при заполнении платежей на перечисление налогов после названия банка указывается название счета казначейства через знак <code>//</code>.
     * @minLength 1
     * @maxLength 255
     */
    bankName?: string
    /**
     * Корреспондентский счет банка получателя.
     *
     *
     * С 1 января 2021 года при уплате налогов указывается номер счета банка получателя, входящий в состав единого казначейского счета (ЕКС). Раньше это поле заполнялось нулями.
     * @pattern \d{20}
     */
    corrAccountNumber?: string
    /**
     * Номер расчетного счета. ВАЖНО: Для бюджетных платежей с 01.01.2021 в данном поле нужно указывать новые номера казначейских счетов.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
}

export interface CreatePaymentRegistryRequest {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
    /**
     *
     * Номер счета компании, с которого будут списаны деньги для оплаты реестра (при наличии РКО в Т-Банке).<br />
     * Если номер счета не передан, средства спишутся с основного счета компании.
     *
     */
    compunknownAccountNumber?: string
    /** Дата отправки реестра */
    loadDate?: string
    /**
     *
     * Может принимать одно из двух значений:
     * <ul>
     * <li>IGNORE_ERRORS — реестр будет создан из всех корректных платежей, его идентификатор вернется в поле <b>paymentRegistryId</b> метода <a href="/docs/api/self-employed-get-payment-registry-create-result">Получить результат создания черновика платежного реестра</a>. Если корректных платежей нет, реестр не создастся.</li>
     * <li>FAIL_ERRORS — если есть ошибочные платежи, реестр не создастся. Значение по умолчанию — FAIL_ERRORS.</li>
     * </ul>
     */
    registryCreateType?: EmployeeRegistryCreateTypeRequest
    /** Список платежей внутри реестра. */
    payments?: CreatePaymentInfo[]
}

/** Тип телефона */
export enum PhoneType2 {
    MOBILE = 'MOBILE',
    HOME = 'HOME',
    WORK = 'WORK',
    OTHER = 'OTHER'
}

/** Информация, которая использовалась при постановке на учет. */
export interface RegistrationInfo {
    /** ОКТМО. */
    oktmo: string
    /** Коды активностей. */
    activityCodes?: string[]
}

export interface SelfEmployed {
    /**
     * Идентификатор самозанятого.
     * @format int32
     */
    id: number
    /** Статус самозанятого:<br /><ul><li><code>ERROR</code> — ошибка создания анкеты самозанятого.</li><li><code>DRAFT</code> — анкета самозанятого готова к отправке.</li><li><code>PROCESSING_ERROR</code> — ошибка отправки анкеты. Обратитесь к персональному менеджеру для уточнения причины.</li><li><code>PROCESSING</code> — обрабатываем анкету самозанятого.</li><li><code>REJECTED</code> — отказ в открытии счета. Конечный статус добавления.</li><li><code>MTNG_WAIT</code> — самозанятый ожидает назначения встречи для доставки карты. </li><li><code>MTNG_SCHD</code> — встреча для доставки карты самозанятому назначена.</li><li><code>MTNG_CANC</code> — встреча для доставки карты самозанятому отменена.</li><li><code>ACTIVE</code> — самозанятый добавлен. Конечный статус добавления.</li><li><code>DELETED</code> — самозанятый удален.</li></ul> */
    status: EmployeeStatus1
    /** Статус самозанятости:<br /><ul><li><code>ACTIVE</code> — получатель самозанятый, привязан к Т-Банку. Доступны выплаты с чеками.</li><li><code>NOT_ACTIVE</code> — получатель не самозанятый или не привязан к Т-Банку. Выплаты с чеками недоступны.</li><li><code>REGISTRATION_WAIT</code> — получатель ожидает постановки на учет в качестве самозанятого. Статус возможен в случае, если в методе создания самозанятого было передано значение <code>registrationInfo</code>.</li><li><code>NOT_CONFIRM</code> — статус самозанятости неизвестен.</li></ul> */
    selfEmployedStatus: SelfEmployedStatus
    /** Имя. */
    firstName: string
    /** Фамилия. */
    lastName: string
    /** Отчество. */
    middleName?: string
    /**
     * Дата рождения.
     * @format date
     */
    birthDate?: string
    /** Номера телефонов. */
    phones?: Phone1[]
    /** Документы. */
    documents?: Document1[]
    /** Информация, которая использовалась при постановке на учет. */
    registrationInfo?: RegistrationInfo
    /** Банковская информация самозанятого. */
    bankInfo: BankInfo2
    /** ИНН самозанятого. */
    inn?: string
    /**
     * Дата создания самозанятого.
     * @format date-time
     */
    creationDate?: string
}

export interface CobrandAccount {
    /** Тип карты — кредитная или дебетовая. */
    cardType: CardType
    /** Номер программы лояльности. */
    loyaltyId?: string
}

export type BankDetailsRequest = CardBankDetailsRequest | RkcBankDetailsRequest | SbpBankDetailsRequest

export interface PendingAddCardRequestResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Идентификатор запроса на добавление карты. */
    addCardRequestId: string
    /**
     * Ключ терминала.
     * @minLength 1
     * @maxLength 256
     */
    terminalKey: string
    /**
     * Статус запроса на добавление карты:
     * * `PENDING` — карта в процессе добавления.
     * * `READY` — карта успешно добавлена.
     * * `FAILED` — не удалось добавить карту.
     */
    status: PendingAddCardRequestResponseStatusEnum
    /** Ссылка на страницу добавления карты. Чтобы добавить карту, переадресуйте клиента на эту страницу. */
    addCardUrl: string
}

export interface Passport2 {
    /** Тип документа */
    type: IdentificationDocumentType
    /** Номер документа */
    number: string
    /** Серия документа */
    series: string
    /** Подразделение */
    divisionName?: string
    /**
     * Дата выдачи документа
     * @format date
     */
    issueDate?: string
}

export interface FieldValidationError {
    /** Название поля, в котором возникла ошибка, на русском языке. */
    fieldName: string
    /** Описание ошибки. */
    errorDescription: string
}

export interface AuthenticationFailedResponse {
    /**
     * Уникальный идентификатор ошибки.
     * @maxLength 50
     */
    errorId: string
    /**
     * Текст ошибки.
     * @maxLength 400
     */
    errorMessage: string
    /**
     * Код ошибки.
     * @maxLength 50
     */
    errorCode: string
}

/** Результат регистрации дохода:<br /><ul><li>IN_PROGRESS — доход регистрируется.</li><li>SUCCESS — доход был успешно зарегистрирован, возвращается <code>fnsLink</code>.</li><li>CANCELED — чек был сторнирован, возвращается <code>fnsLink</code>.</li><li>FISCALIZE_FAILED — доход не удалось зарегистрировать в налоговой.</li><li>ERROR — не удалось получить статус наличия зарегистрированного дохода. <br />Возвращается при внутренней ошибке или если доход по платежу еще не регистрировался.</li></ul> */
export enum SelfEmployedReceiptsStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESS = 'SUCCESS',
    CANCELED = 'CANCELED',
    FISCALIZE_FAILED = 'FISCALIZE_FAILED',
    ERROR = 'ERROR'
}

export interface DebitAccountsResponse {
    /** Cчета. */
    accounts?: DebitAccount[]
}

export interface Operation {
    /** Идентификатор банковской транзакции. */
    rrn: string
    /**
     * Дата совершения операции в UTC. Формат — `yyyy-MM-ddTHH:mm:ssZ`.
     * @format date-time
     */
    transactionDate: string
    /**
     * Сумма операции в копейках.
     * @format int64
     */
    amount: number
    /** Номер карты. */
    cardNumber: string
    /** Тип операции. */
    type: OperationType
}

export type ReissueVirtualCardResultResponse =
    | {
          /** Данные перевыпущенной карты. Присутствует в ответе, если status = READY */
          info: ReissuedVirtualCardInfo
          /** Статус заявки на перевыпуск виртуальной карты. status = READY - карта успешно перевыпущена, вы можете ей пользоваться */
          status: ReissueVirtualCardResultResponseStatusEnum
      }
    | {
          /** Статус заявки на перевыпуск виртуальной карты. status = ERROR - произошла ошибка при обработке заявки, попробуйте отправить новую */
          status: ReissueVirtualCardResultResponseStatusEnum1
      }
    | {
          /** Статус заявки на перевыпуск виртуальной карты. status = IN_PROGRESS - заявка в работе, проверьте результат через некоторое время (обычно заявка исполняется в течение 5 минут) */
          status: ReissueVirtualCardResultResponseStatusEnum2
      }

export interface ForeignPassport {
    /** Тип документа. */
    type: ForeignPassportTypeEnum
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /** Кем выдан. */
    organization: string
}

export interface CreateRegistryPaymentRequest {
    /**
     * Идентификатор платежа. Должен быть уникален в пределах интеграции.
     * @minLength 1
     * @maxLength 64
     */
    id: string
    /**
     * Идентификатор платежного реестра. Реестр должен находиться в статусе <code>ACCEPTED</code>.
     * @format int32
     */
    paymentRegistryId: number
    /**
     * Номер расчетного счета для списания.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * Назначение платежа.
     * @minLength 1
     * @maxLength 210
     */
    purpose: string
    /**
     * Номер распоряжения, определяемый клиентом. Заполняется на усмотрение плательщика. Номер документа — не больше 6 цифр.
     * @format int32
     * @min 1
     */
    documentNumber?: number
    /**
     * Очередность платежа.
     * @deprecated
     * @format int32
     * @min 1
     * @max 5
     */
    executionOrder?: number
    /**
     * Дата, до которой нужно провести платеж. При неуспешных попытках платежа он будет повторен вплоть до указанной даты. Если дату не передать, платеж не будет повторен в случае неуспешной попытки. Время на проведение платежа не может быть больше 30 дней.
     * @format date-time
     */
    dueDate?: string
    /** Дополнительные метаданные в формате JSON. Сохраняются при создании платежа и возвращаются при получении статуса. */
    meta?: Record<string, string>
}

/** Результат по заявке со статусом DONE. */
export enum ApplicationResult {
    REGISTERED = 'REGISTERED',
    DEREGISTERED = 'DEREGISTERED',
    REGISTRATION_DENIED = 'REGISTRATION_DENIED',
    DEREGISTRATION_DENIED = 'DEREGISTRATION_DENIED',
    DEREGISTRATION_ERROR = 'DEREGISTRATION_ERROR',
    REGISTRATION_ERROR = 'REGISTRATION_ERROR'
}

export interface TaxReturnReasonResponse {
    /** Название группы налоговых вычетов. */
    title: string
    /**
     * Детализация налоговых вычетов в рамках группы.
     * @maxItems 100
     */
    options?: OptionResponse[]
}

export type BeneficiaryResponse =
    | BeneficiaryFlNonresidentResponse
    | BeneficiaryFlResidentResponse
    | BeneficiaryIpNonresidentResponse
    | BeneficiaryIpResidentResponse
    | BeneficiaryLiteContactResponse
    | BeneficiaryUlNonresidentResponse
    | BeneficiaryUlResidentResponse

export interface Info {
    /**
     * Дата и время последней постановки на учет в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    registeredAt: string
    /** Виды деятельности, которые самозанятый указал при регистрации. */
    activityCodes?: string[]
    /** Регион деятельности самозанятого. */
    oktmo: string
    /** Список прав, которые самозанятый выдал Т-Банку. */
    permissions?: PermissionTypeEnum[]
}

/**
 *
 * Статус создания:
 *
 * <ul><li><code>QUEUED</code> — самозанятый стоит в очереди на создание;</li>
 * <li><code>CREATED</code> — самозанятый создан;</li>
 * <li><code>ERROR</code> — самозанятый не был создан. Ошибки перечислены в параметре <b>errors</b>.</li></ul>
 *
 */
export enum CreationSelfEmployedStatus {
    CREATED = 'CREATED',
    ERROR = 'ERROR',
    QUEUED = 'QUEUED'
}

export interface CreateAddress {
    /** Тип адреса. */
    type: AddressType
    /** Страна. */
    country?: string
    /** Индекс. */
    postalCode: string
    /** Регион. */
    state: string
    /** Город. */
    city?: string
    /** Район. */
    district?: string
    /** Населенный пункт. */
    settlement?: string
    /** Улица. */
    street?: string
    /** Дом. */
    house?: string
    /** Здание. */
    building?: string
    /** Корпус. */
    construction?: string
    /** Квартира. */
    apartment?: string
}

/** Статус самозанятости:<br /><ul><li><code>ACTIVE</code> — получатель самозанятый, привязан к Т-Банку. Доступны выплаты с чеками.</li><li><code>NOT_ACTIVE</code> — получатель не самозанятый или не привязан к Т-Банку. Выплаты с чеками недоступны.</li><li><code>REGISTRATION_WAIT</code> — получатель ожидает постановки на учет в качестве самозанятого. Статус возможен в случае, если в методе создания самозанятого было передано значение <code>registrationInfo</code>.</li><li><code>NOT_CONFIRM</code> — статус самозанятости неизвестен.</li></ul> */
export enum SelfEmployedStatus {
    REGISTRATION_WAIT = 'REGISTRATION_WAIT',
    NOT_CONFIRM = 'NOT_CONFIRM',
    NOT_ACTIVE = 'NOT_ACTIVE',
    ACTIVE = 'ACTIVE'
}

export interface FromForeignAgencyReceiptResponse {
    /**
     * Идентификатор чека.
     * @format uuid
     */
    receiptId: string
    /** От кого самозанятый получил доход. */
    incomeType: FromForeignAgencyReceiptResponseIncomeTypeEnum
    /**
     * Дата и время получения дохода в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    incomeReceivedAt: string
    /**
     * Дата и время заявления дохода в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    incomeStatedAt: string
    /** Статус чека. */
    status: ReceiptStatus
    /** Сумма заявленного дохода. */
    totalAmount: number
    /** Массив объектов с информацией об оказанных услугах. */
    services?: ReceiptService[]
    /** Массив объектов с информацией по операциям, произведенным с чеком. */
    operations?: ReceiptOperation[]
    /** Название компании-заказчика, которой самозанятый оказывал услуги. */
    customerOrganization: string
    /** Ссылка на временный чек в случае недоступности сервисов ФНС. */
    tinkoffLink?: string
    /** Ссылка на чек в случае успешной регистрации в ФНС. */
    fnsLink?: string
}

/** Реквизиты для уплаты налогов и иных бюджетных платежей. */
export interface TaxPaymentParameters {
    /**
     * Статус составителя расчетного документа. Поле платежки 101.
     *
     *
     * При оплате налога за третьих лиц указывается налоговый статус человека, за которого происходит оплата. Может принимать следующие значения:
     * <ul>
     * <li> <code>01</code> — налогоплательщик (плательщик сборов) — юрлицо; </li>
     * <li> <code>02</code> — налоговый агент; </li>
     * <li> <code>08</code> — плательщик-юрлицо (ИП), осуществляющий уплату страховых взносов и иных платежей в бюджетную систему РФ; </li>
     * <li> <code>13</code> — физическое лицо, уплачивающее налоги, сборы за совершение налоговыми органами юридически значимых действий, страховые взносы и иные платежи, администрируемые налоговыми органами; </li>
     * <li> <code>14</code> — указывается плательщиком, который осуществляет транзакции в пользу физлиц; </li>
     * <li> <code>19</code> — организации и их филиалы, перечисляющие средства, удержанные из заработной платы (дохода) должника — физлица в счет погашения задолженности по платежам в бюджет на основании исполнительного документа; </li>
     * <li> <code>24</code> — плательщик-физлицо, осуществляющий уплату страховых взносов и иных платежей в бюджетную систему РФ. </li>
     * </ul>
     * <a href="https://www.buhonline.ru/pub/beginner/2019/10/15119_status-platelshhika-v-platezhke-2021">Статус плательщика в платежном поручении в 2024 году</a>
     *
     * @pattern \d{2}
     */
    payerStatus: string
    /**
     * Код бюджетной классификации. Поле платежки 104. <a href="https://buhguru.com/spravka-info/kbk-2021.html">Подробнее</a>.
     * @pattern \d{20}|0
     */
    kbk: string
    /**
     * Код ОКТМО территории, на которой мобилизуются денежные средства от уплаты налога, сбора и иного платежа. Поле платежки 105.
     * <a href="https://nalog-nalog.ru/uplata_nalogov/rekvizity_dlya_uplaty_nalogov_vznosov/oktmo_v_platezhnom_poruchenii_nyuansy">Подробнее</a>.
     * @pattern \d{8}|\d{11}|0
     */
    oktmo: string
    /**
     * Основание налогового платежа. Поле платежки 106. Может принимать следующие значения:
     * <ul>
     * <li> <code>ТП</code> — платежи текущего года; </li>
     * <li> <code>ЗД</code> — добровольное погашение задолженности по истекшим налоговым, расчетным (отчетным) периодам при отсутствии требования налогового органа об уплате налогов (сборов); </li>
     * <li> <code>РС</code> — погашение рассроченной задолженности; </li>
     * <li> <code>ОТ</code> — погашение отсроченной задолженности; </li>
     * <li> <code>РТ</code> — погашение реструктурируемой задолженности; </li>
     * <li> <code>ПБ</code> — погашение должником задолженности в ходе процедур, применяемых в деле о банкротстве; </li>
     * <li> <code>ИН</code> — погашение инвестиционного налогового кредита; </li>
     * <li> <code>ТЛ</code> — погашение учредителем (участником) должника или собственником имущества должника — унитарного предприятия или третьим лицом задолженности в ходе процедур, применяемых в деле о банкротстве; </li>
     * <li> <code>ЗТ</code> — погашение текущей задолженности в ходе процедур, применяемых в деле о банкротстве; </li>
     * <li> <code>00</code> — иные случаи (для таможенных платежей); </li>
     * <li> <code>0</code> — при незнании основания платежа. </li>
     * </ul>
     * <a href="https://www.26-2.ru/art/356241-polya-106-platejnyh-1-oktyabrya-2021">Новые правила заполнения поля 106 платежных поручений с 1 октября 2021 года (26-2.ru)</a>
     *
     * @pattern [A-Za-zА-Яа-я]{2}|00|0
     */
    evidence: string
    /**
     * Налоговый период. Поле платежки 107.
     * Формат — ДД.ММ.ГГГГ, первые два символа могут быть буквами или цифрами. В поле можно передать `0`.
     * <a href="https://www.nalog.ru/rn40/news/tax_doc_news/6181298/">Подробнее</a>.
     * @pattern ^(0)$|^(\d{8})$|^(.{2}\.\d{2}\.\d{4})$
     */
    period: string
    /**
     * Номер налогового документа. Поле платежки 108. [Как заполнить поля платежного поручения без ошибок](https://azbuha.ru/uchet-denezhnyx-sredstv/kak-zapolnit-polya-platezhnogo-porucheniya/#:~:text=%D0%92%20%D0%BF%D0%BE%D0%BB%D0%B5%20108%20%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%81%D1%8F%20%C2%AB0%C2%BB%2C,%D0%9F%D0%BE%D0%BB%D0%B5%20109%20%C2%AB%D0%94%D0%B0%D1%82%D0%B0%20%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%BF%D0%BB%D0%B0%D1%82%D0%B5%D0%B6%D0%B0%C2%BB).
     * @pattern [A-Za-zА-Яа-я]{2}\d{13}|\d{2};\d{1,20}|[A-Za-zА-Яа-я]{2}|0{1}
     */
    docNumber: string
    /**
     * Дата налогового документа. Поле платежки 109. Формат — ДД.ММ.ГГГГ или 0.
     * <a href="https://www.nalog.ru/rn40/news/tax_doc_news/4604512/">Подробнее</a>.
     * @pattern \d{2}\.\d{2}\.\d{4}|0
     */
    docDate: string
    /** Реквизиты для оплаты налогов за третьих лиц. <a href="https://glavkniga.ru/situations/s509587">Подробнее</a>. */
    thirdParty?: TaxThirdParty
}

export interface BeneficiaryFlResidentResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryFlResidentResponseTypeEnum
    /** Имя. */
    firstName: string
    /** Отчество. */
    middleName?: string
    /** Фамилия. */
    lastName: string
    /** Самозанятый. */
    isSelfEmployed: boolean
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace?: string
    /**
     * Гражданство. Код страны в формате `ISO 3166-1 alpha-2`.
     * @pattern ^([A-Z]{2})$
     */
    citizenship?: string
    /**
     * Номер телефона.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта почта. */
    email?: string
    /** Документы. */
    documents?: Document2[]
    /** Адреса. */
    addresses?: Address[]
    /**
     * ИНН.
     * @pattern ^(\d{12})$
     */
    inn?: string
    /**
     * СНИЛС.
     * @pattern ^(\d{11})$
     */
    snils?: string
}

export interface EmployeesResponse {
    /**
     * Номер сотрудника, переданный клиентом при создании.
     * @format int32
     */
    number: number
    /**
     * Идентификатор сотрудника в зарплатном проекте. Может не прийти, если при создании сотрудника возникли ошибки.
     * @format int32
     */
    employeeId?: number
    /** Имя. */
    firstName: string
    /** Фамилия. */
    lastName: string
    /** Отчество. */
    middleName?: string
    /** Статус создания:<br /><ul><li><code>QUEUED</code> — сотрудник  стоит в очереди на создание.</li><li><code>CREATED</code> — сотрудник создан в зарплатном проекте.</li><li><code>ERROR</code> — сотрудник не был создан в зарплатном проекте. Ошибки перечислены в параметре <b>errors</b>.</li></ul> */
    status: CreationEmployedStatus
    /** Список ошибок. */
    errors?: {
        /** Название поля, в котором возникла ошибка, на русском языке. */
        fieldName: string
        /** Описание ошибки. */
        errorDescription: string
    }[]
}

/**
 *
 * Может принимать одно из двух значений:
 * <ul>
 * <li>FROM_LEGAL_ENTITY — самозанятые получают доход от юридического лица;</li>
 * <li>FROM_INDIVIDUAL — самозанятые получают доход от физического лица.</li>
 * </ul>
 * Значение по умолчанию — FROM_LEGAL_ENTITY.
 */
export enum SelfEmployedIncomeType {
    FROM_LEGAL_ENTITY = 'FROM_LEGAL_ENTITY',
    FROM_INDIVIDUAL = 'FROM_INDIVIDUAL'
}

export interface Phone {
    /** Тип телефона. */
    type: PhoneType
    /** Номер телефона. */
    number?: string
}

export interface InProgress {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Статус проверки в финансовом мониторинге. */
    status: InProgressStatusEnum1
}

export type BankDetailsResponse = CardBankDetailsResponse | RkcBankDetailsResponse | SbpBankDetailsResponse

/** Статус подписания платежного реестра. */
export enum SubmissionStatus {
    ACCEPTED = 'ACCEPTED',
    ERROR = 'ERROR',
    IN_PROGRESS = 'IN_PROGRESS'
}

export interface FailedAddCardRequestResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Идентификатор запроса на добавление карты. */
    addCardRequestId: string
    /**
     * Ключ терминала.
     * @minLength 1
     * @maxLength 256
     */
    terminalKey: string
    /**
     * Статус запроса на добавление карты:
     * * `PENDING` — карта в процессе добавления.
     * * `READY` — карта успешно добавлена.
     * * `FAILED` — не удалось добавить карту.
     */
    status: FailedAddCardRequestResponseStatusEnum
    /**
     *
     * Краткое сообщение об ошибке с кодом в формате `{Description} [{Code}]`.
     * <a href="https://www.tbank.ru/kassa/dev/payments/#tag/Kody-oshibok">Список кодов ошибок с описанием</a>.
     */
    errorMessage: string
}

export interface AuthorizationFailedResponse {
    /**
     * Уникальный идентификатор ошибки.
     * @maxLength 50
     */
    errorId: string
    /**
     * Текст ошибки.
     * @maxLength 400
     */
    errorMessage: string
    /**
     * Код ошибки.
     * @maxLength 50
     */
    errorCode: string
}

export interface CardLimitsResponse {
    /**
     * Уникальный идентификатор карты.
     * @format int64
     */
    ucid: number
    /** Объект с информацией о расходном лимите. */
    spendLimit: SpendLimit
    /** Объект с информацией о лимите на снятие наличных. */
    cashLimit: CashLimit
}

/** Тип документа. */
export enum CreateDocumentType {
    ValueПаспорт = 'Паспорт',
    ValueИностранныйПаспорт = 'Иностранный паспорт',
    ValueЗагрПаспортИностранногоГр = 'Загр. паспорт иностранного гр.',
    ValueСлужебныйОфициальныйПаспорт = 'Служебный/официальный паспорт',
    ValueДипломатическийПаспорт = 'Дипломатический паспорт',
    ValueМиграционнаяКарта = 'Миграционная карта',
    ValueРазрНаВременноеПроживание = 'Разр. на временное проживание',
    ValueВиза = 'Виза',
    ValueВидНаЖительство = 'Вид на жительство'
}

/** Если значение передано, Т-Банк поставит исполнителя на учет как самозанятого. Функция доступна клиентам, которые получили от исполнителей согласие на регистрацию. */
export interface CreateSelfEmployedRegistrationInfo {
    /** ОКТМО. */
    oktmo: string
    /** Коды активностей. */
    activityCodes: string[]
}

export interface RetryPaymentResponse {
    /**
     * Идентификатор повторенного платежа.
     * @format uuid
     */
    retryPaymentId: string
}

export interface TacqTerminalsResponse {
    /**
     * Общее количество страниц с данными по запросу клиента.
     * @format int64
     */
    totalPages: number
    /**
     * Общее количество элементов (терминалов) на всех страницах.
     * @format int64
     */
    totalElements: number
    /** Флаг первой страницы. */
    first: boolean
    /** Флаг последней страницы. */
    last: boolean
    /** Страница данных с терминалами. */
    terminals?: Terminal[]
}

export interface TaxPaymentResponse {
    /**
     * Тип платежа:
     * * `REGULAR` — обычный.
     * * `TAX` — налоговый.
     */
    type: TaxPaymentResponseTypeEnum
    /**
     * Идентификатор платежа.
     * @format uuid
     */
    paymentId: string
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Номер номинального счета.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    bankDetails: BankDetails
    /** Сумма платежа. */
    amount: number
    /**
     * Статус платежа![payment-statuses](https://business.t-static.ru/static/images/opensme/nominal-accounts/payment-statuses.svg)
     * * `PENDING` — Ожидает обработки.
     * * `IN_PROGRESS` — В процессе.
     * * `FAILED` — Неуспешен.
     * * `CANCELLED` — Отменен.
     * * `SUCCEEDED` — Успешно завершен.
     */
    status: TaxPaymentResponseStatusEnum
    /** Описание ошибки в случае неуспешности платежа. */
    errorMessage?: string
    /**
     * Назначение платежа.
     * @minLength 1
     * @maxLength 210
     */
    purpose: string
    /**
     * Уникальный идентификатор платежа.
     * @pattern 0|[А-Яа-яA-Za-z0-9]{4}|[А-ЯA-Z0-9]{15}|[а-яА-Яa-zA-Z0-9№\s!"#$%;'()*+,-\.\/:;;=>?@\]\[\\\^_`{|}~]{20}|[а-яА-Яa-zA-Z0-9№\s!"#$%;'()*+,-\.\/:;;=>?@\]\[\\\^_`{|}~]{25}
     */
    uin: string
    /** Реквизиты для уплаты налогов и иных бюджетных платежей. */
    tax: TaxPaymentParameters
    /**
     * Уникальный ID операции.
     * @format uuid
     */
    operationId?: string
}

export interface PaymentRegistrySubmitResponse {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
}

/** Тип операции. */
export enum OperationType {
    Debit = 'Debit',
    Credit = 'Credit',
    Other = 'Other'
}

export interface RkcBankDetailsResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Идентификатор банковских реквизитов.
     * @format uuid
     */
    bankDetailsId: string
    /**
     * Тип банковских реквизитов:
     * * `PAYMENT_DETAILS` — По реквизитам счета.
     * * `CARD` — На карту.
     * * `SBP` — Через СБП.
     */
    type: RkcBankDetailsResponseTypeEnum
    /** Являются ли реквизиты основными для бенефициара. По умолчанию для первых добавленных реквизитов — `true`, для следующих — `false`. */
    isDefault?: boolean
    /**
     * БИК банка получателя.
     *
     *
     * С 1 января 2021 года при перечислении налоговых платежей указываются новые значения БИК банков получателя.
     *
     *
     * <a href="https://spmag.ru/articles/polya-platezhnogo-porucheniya-v-2021-godu-obrazec">Подробнее о полях платежного поручения</a>
     * @pattern \d{9}
     */
    bik: string
    /**
     * КПП получателя. Укажите 0, чтобы не заполнять
     * @pattern ^(\d{9}|0)$
     */
    kpp?: string
    /**
     * ИНН. Укажите 0, чтобы не заполнять.
     * @pattern ^(\d{12}|\d{10}|0{1})$
     */
    inn?: string
    /**
     * Наименование получателя.
     * @maxLength 160
     */
    name?: string
    /**
     * Наименование банка получателя.
     * @minLength 1
     * @maxLength 160
     */
    bankName: string
    /**
     * Номер расчетного счета получателя.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * Корреспондентский счет банка получателя.
     * @pattern \d{20}
     */
    corrAccountNumber: string
}

/** Документ бенефициара: */
export type Document2 =
    | Contract
    | ContractGPD
    | DiplomaticPassport
    | ForeignPassport
    | ForeignPassportOfForeignCitizens
    | MigrationCard
    | OfficialPassport
    | Passport
    | Patent
    | ResidencePermit
    | TemporaryResidencePermit
    | Visa

export type PaymentResponse = RegularPaymentResponse | TaxPaymentResponse

export interface CreatePaymentRequest {
    /**
     * Идентификатор платежа. Должен быть уникален в пределах интеграции.
     * @minLength 1
     * @maxLength 64
     */
    id: string
    /** Реквизиты плательщика. */
    from: PayerRequisites
    /** Реквизиты получателя платежа. */
    to: ReceiverRequisites
    /**
     * Уникальный идентификатор платежа. Поле платежки 22.
     * Обязательное поле для налоговых платежей.
     * <a href="https://www.glavbukh.ru/art/98739-uin-v-platejnom-poruchenii-2021">Подробнее</a>.
     * @pattern 0|[А-Яа-яA-Za-z0-9]{4}|[А-ЯA-Z0-9]{15}|[а-яА-Яa-zA-Z0-9№\s!"#$%;'()*+,-\.\/:;;=>?@\]\[\\\^_`{|}~]{20}|[а-яА-Яa-zA-Z0-9№\s!"#$%;'()*+,-\.\/:;;=>?@\]\[\\\^_`{|}~]{25}
     */
    uin?: string
    /** Реквизиты для уплаты налогов и иных бюджетных платежей. */
    tax?: TaxPaymentParameters
    /**
     * Назначение платежа.
     *
     *
     * При заполнении назначения платежа для налоговых платежей за третьих лиц следуйте шаблону:
     * ИНН того, кто перечисляет / КПП того, кто перечисляет / наименование лица, за которого происходит оплата / назначение платежа.
     * <a href="https://glavkniga.ru/situations/s509587">Подробнее</a>.
     * @minLength 1
     * @maxLength 210
     */
    purpose: string
    /**
     * Номер распоряжения, определяемый клиентом. Заполняется на усмотрение плательщика. Номер документа — не больше 6 цифр.
     * @format int32
     * @min 1
     */
    documentNumber?: number
    /**
     * Очередность платежа. По умолчанию — <code>5</code>.
     *
     *
     * <code>1</code> — алиментные удержания из заработной платы, компенсации вреда жизни и здоровью. Основания для уплаты — алиментный договор, заверенный у нотариуса, судебный приказ, исполнительный лист от судебных приставов.
     *
     * <code>2</code>  — погашение задолженностей по зарплатам сотрудникам, выплаты выходных пособий и авторских вознаграждений. Основание для уплаты — исполнительный лист, судебный приказ.
     *
     * <code>3</code> — выплаты зарплат сотрудникам по трудовым соглашениям, принудительная уплата налогов и отчислений во внебюджетные фонды. Основание для уплаты — расчетная документация, платежные требования и инкассовые поручения от ИФНС, ФСС, ПФР.
     *
     * <code>4</code> — принудительные выплаты, которые не вошли в первую, вторую и третью очередь, например задолженности по договорам, штрафы, неустойки, коммунальные платежи. Основание для уплаты — исполнительные документы, требования, постановления, приказы, судебные решения.
     *
     * <code>5</code> — все остальные, не вошедшие в первую, вторую, третью и четвертую категории — например, добровольная уплата долгов, пеней, штрафов.
     *
     * <a href="https://www.consultant.ru/document/cons_doc_LAW_9027/04773c69503b27588ace9c3e2c7eda3904ec7282/">Подробнее</a>
     * @format int32
     * @min 1
     * @max 5
     */
    executionOrder?: number
    /** Сумма платежа в рублях. */
    amount: number
    /**
     * Дата, до которой нужно провести платеж. При неуспешных попытках платежа он будет повторен вплоть до указанной даты. Если дату не передать, платеж не будет повторен в случае неуспешной попытки. Время на проведение платежа не может быть больше 30 дней.
     * @format date-time
     */
    dueDate?: string
    /** Код вида выплаты. <a href="https://www.buhsoft.ru/article/4085-novye-kody-v-platejkah-s-1-maya-2022-goda">Подробнее</a>. */
    revenueTypeCode?: CreatePaymentRequestRevenueTypeCodeEnum
    /** Удержанная сумма из заработной платы и иных доходов работника в рублях. <a href="https://www.b-kontur.ru/enquiry/95">Подробнее</a>. */
    collectionAmount?: number
    /** Дополнительные метаданные в формате JSON. Сохраняются при создании платежа и возвращаются при получении статуса. */
    meta?: Record<string, string>
}

export interface PaymentRegistryResponse {
    /** Статус платежного реестра:<br /><ul><li>DRAFT — готов к отправке;</li><li>ERROR — ошибка создания платежного реестра;</li><li>ACCEPTED — ожидает поступления денежных средств;</li><li>EXECUTED — исполнен;</li><li>PART_EXEC — исполнен частично;</li><li>REJECTED — отклонен банком;</li><li>CANCELLED — отменен;</li><li>DELETED — удален.</li></ul> */
    status: PaymentRegistryStatus
    /**
     *
     * Номер счета компании, с которого будут списаны деньги для оплаты реестра — при наличии РКО в Т-Банке.<br />
     * Если номер счета не передан, средства спишутся с основного счета компании.
     *
     */
    compunknownAccountNumber?: string
    /** Дата отправки реестра. */
    loadDate?: string
    /**
     * Количество платежей в реестре.
     * @format int32
     */
    paymentsCount: number
    /** Общая сумма платежей в реестре. */
    totalSum: number
    /** Список платежей внутри реестра. */
    payments?: PaymentInfo[]
}

export interface CreatePaymentDraftResponse {
    /**
     * Идентификатор созданного черновика.
     * @format uuid
     */
    documentId: string
}

export type BeneficiaryScoringInfo = InProgress | Ready

export type Empty = object

export interface CreateDraftResponse {
    /**
     * ID созданной заявки на удаленную идентификацию.
     * @format uuid
     */
    applicationId: string
}

export interface OptionResponse {
    /** Название детализации. */
    title: string
    /**
     * Документы, приложенные к анкете.
     * @maxItems 100
     */
    documents?: DocumentResponse[]
}

export interface BalanceListResponse {
    /**
     * Запрошенное количество балансов для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество балансов для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество балансов в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего балансов, подходящих под условия запроса.
     * @format int32
     */
    total: number
    /** Список балансов. */
    results?: BalanceListItem[]
}

/**
 *
 * Статус карты:
 * <ul>
 * <li>`NORM` — карта активна;</li>
 * <li>`CLOSED` — карта неактивна;</li>
 * <li>`BLOCKED` — карта заблокирована.</li>
 * </ul>
 */
export enum CardStatus {
    NORM = 'NORM',
    CLOSED = 'CLOSED',
    BLOCKED = 'BLOCKED'
}

export interface CreatePaymentInfo {
    /**
     * Идентификатор платежа на стороне клиента.
     * @format int32
     */
    number: number
    /** Номер счета сотрудника. */
    accountNumber: string
    /** Назначение платежа данному сотруднику в рамках зарплатного реестра. */
    paymentPurpose: string
    /** Данные сотрудника, находящегося в статусах `ACTIVE` или `FIRED`. */
    employeeInfo: {
        /** Имя (кириллица). */
        firstName: string
        /** Фамилия (кириллица). */
        lastName: string
        /** Отчество (кириллица). */
        middleName?: string
        /**
         * Идентификатор сотрудника. Возвращается для реестров в статусе <code>DRAFT</code>, <code>ACCEPTED</code>, <code>PART_EXEC</code> или <code>EXECUTED</code>.
         * @format int32
         */
        employeeId?: number
    }
    /** Сумма платежа. */
    sum: number
    /**
     * Начало периода платежа.
     * @format date
     */
    periodStart?: string
    /**
     * Окончание периода платежа.
     * @format date
     */
    periodEnd?: string
    /** Код вида дохода. */
    revenueTypeCode?: CreatePaymentInfoRevenueTypeCodeEnum
    /** Удержанная сумма. */
    collectionAmount?: number
}

export interface CreateApplicationRequest {
    /**
     * ID заявки на удаленную идентификацию сотрудника.
     * @format uuid
     */
    employeeIdentificationApplicationId: string
    /**
     * Номер счета, к которому выпускается карта.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /** Международная платежная система. */
    cardNetwork: CardNetwork
}

/** Статус сотрудника:<br /><ul><li>ERROR — ошибка создания анкеты сотрудника;</li><li>DRAFT — анкета сотрудника готова к отправке;</li><li>PROCESSING_ERROR — ошибка отправки анкеты — обратитесь к персональному менеджеру для уточнения причины;</li><li>PROCESSING — обрабатываем анкету сотрудника;</li><li>REJECTED — отказ в открытии счета (конечный статус добавления);</li><li>MTNG_WAIT — сотрудник ожидает назначения встречи для доставки карты; </li><li>MTNG_SCHD — встреча для доставки карты сотруднику назначена;</li><li>MTNG_CANC — встреча для доставки карты сотруднику отменена;</li><li>ACTIVE — сотрудник добавлен (конечный статус добавления);</li><li>FIRED — сотрудник уволен;</li><li>DELETED — сотрудник удален из зарплатного проекта.</li></ul> */
export enum EmployeeStatus {
    PROCESSING = 'PROCESSING',
    DRAFT = 'DRAFT',
    PROCESSING_ERROR = 'PROCESSING_ERROR',
    ACTIVE = 'ACTIVE',
    ERROR = 'ERROR',
    REJECTED = 'REJECTED',
    FIRED = 'FIRED',
    DELETED = 'DELETED',
    MTNG_SCHD = 'MTNG_SCHD',
    MTNG_WAIT = 'MTNG_WAIT',
    MTNG_CANC = 'MTNG_CANC'
}

export interface DeponentListResponse {
    /**
     * Запрошенное количество депонентов для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество депонентов для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество депонентов в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего депонентов, подходящих под условия запроса.
     * @format int32
     */
    total: number
    /** Список депонентов этапа сделки. */
    results?: DeponentResponse[]
}

export interface AccountInfo3 {
    /** Расчетный счет организации. */
    accountNumber: string
    /** Наименование счета. */
    name: string
    /** Статус счета. Возможные значения: <ul><li><code>BLLE</code> — первичная блокировка договора ЮЛ. Находится в этом статусе до момента активации (переход в NORM) или закрытия (переход в CLSC/CLSB).</li><li><code>ARSS</code> — частичный арест.</li><li><code>ARSF</code> — полный арест.</li><li><code>ARMF</code> — полная блокировка.</li><li><code>CAIN</code> — картотека.</li><li><code>CLBL</code> — в процессе закрытия.</li><li><code>CLSC</code> — закрыт по инициативе клиента.</li><li><code>CLSB</code> — закрыт по инициативе банка.</li></ul> */
    status: string
    /** Пользовательское наименование тарифа. */
    tariffName: string
    /** Код тарифа. */
    tariffCode: string
    /** Код валюты счета по ОКВ (цифрами). */
    currency: string
    /**
     * Дата открытия счета.
     * @format date
     */
    createdOn: string
    /** Флаг основного счета: <ul><li>Y.</li><li>N.</li></ul> */
    mainFlag: string
    /**
     * БИК банка.
     * @pattern \d{9}
     */
    bankBik: string
    /**
     * Тип счета. Список вариантов значений может пополняться.
     * * `Current` — расчетный счет.
     * * `Tax` — счет Т-Бухгалтерии.
     * * `Tender` — специальный счет для участия в госзакупках.
     * * `Overnight` — счет Overnight.
     * * `Trust` — специальный счет доверительного управляющего ПИФ.
     * * `Broker` — специальный брокерский счет.
     * * `BankPaymentAgent` — специальный счет банковского платежного агента.
     * * `PaymentAgent` — счет платежного агента.
     * * `Nominal` — номинальный счет.
     * * `NominalIpo` — номинальный счет оператора инвестиционной платформы.
     * * `TrustManagementSmp` — специальный счет доверительного управления.
     * * `Cashbox` — бизнес-копилка.
     * * `Invest` — инвестиционный счет.
     */
    accountType: string
    /**
     * Дата активации.
     * @format date
     */
    activationDate?: string
    /** Баланс счета. */
    balance: Balance1
    /** Информация о транзитном счете. Актуально для валютных счетов. */
    transitAccount?: TransitAccount
    /** Информация о брокерских счетах. Актуально для инвестиционных счетов. */
    brokerCurrencyBalance?: PositionInfo[]
}

/** Статус платежного реестра:<br /><ul><li>DRAFT — готов к отправке;</li><li>ERROR — ошибка создания платежного реестра;</li><li>ACCEPTED — ожидает поступления денежных средств;</li><li>EXECUTED — исполнен;</li><li>PART_EXEC — исполнен частично;</li><li>REJECTED — отклонен банком;</li><li>CANCELLED — отменен;</li><li>DELETED — удален.</li></ul> */
export enum PaymentRegistryStatus {
    DRAFT = 'DRAFT',
    ERROR = 'ERROR',
    ACCEPTED = 'ACCEPTED',
    EXECUTED = 'EXECUTED',
    PART_EXEC = 'PART_EXEC',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED',
    DELETED = 'DELETED'
}

/** Номер договора получателя. */
export interface AgreementNumberRequisites {
    /** Номер договора. */
    agreementNumber: string
}

export interface PaymentRegistrySubmitRequest {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
    /**
     * Идентификатор платежного реестра.
     * @format int32
     */
    paymentRegistryId: number
}

/** Данные перевыпущенной карты. Присутствует в ответе, если status = READY */
export interface ReissuedVirtualCardInfo {
    /**
     * Уникальный идентификатор старой карты
     * @format int64
     */
    oldUcid: number
    /**
     * Уникальный идентификатор новой карты
     * @format int64
     */
    newUcid: number
    /**
     * Первые 6 цифр номера новой карты (BIN карты)
     * @minLength 6
     * @maxLength 6
     * @pattern \d{6}
     */
    cardBin: string
    /**
     * Последние 4 цифры номера новой карты
     * @minLength 4
     * @maxLength 4
     * @pattern \d{4}
     */
    cardLastFourDigits: string
}

export interface CreateEmployeesRequest {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
    /** Список сотрудников на создание. */
    employees?: EmployeeCreateData[]
}

/** Тип документа. */
export enum DocumentType {
    ValueПаспорт = 'Паспорт',
    ValueИностранныйПаспорт = 'Иностранный паспорт',
    ValueЗагрПаспортИностранногоГр = 'Загр. паспорт иностранного гр.',
    ValueСлужебныйОфициальныйПаспорт = 'Служебный/официальный паспорт',
    ValueДипломатическийПаспорт = 'Дипломатический паспорт',
    ValueМиграционнаяКарта = 'Миграционная карта',
    ValueРазрНаВременноеПроживание = 'Разр. на временное проживание',
    ValueВиза = 'Виза',
    ValueВидНаЖительство = 'Вид на жительство'
}

export interface Attachment {
    /** Идентификатор документа. */
    id: string
    /** Тип документа. */
    type: string
    /** Дополнительные метаданные в формате JSON. */
    meta?: Record<string, string>
}

export interface CreateLegalEntityReceiptRequest {
    /**
     * От кого самозанятый получил доход:
     * * `FROM_INDIVIDUAL` — от физического лица;
     * * `FROM_LEGAL_ENTITY` — от компании;
     * * `FROM_FOREIGN_AGENCY` — от иностранной компании.
     */
    incomeType: CreateLegalEntityReceiptRequestIncomeTypeEnum
    /**
     * Дата и время получения дохода в UTC. Ожидается в ISO-8601 формате <b>yyyy-MM-ddTHH:mm:ss<.fff><TZDSuffix></b>, где:
     * * HH — часы в 24-часовой нотации. Допускаются значения от 00 до 23.
     * * .fff — опциональная часть, содержащая доли секунд. Допускается не больше трех знаков.
     * * TZDSuffix — опциональный суффикс. Допускается значение <code>Z</code> или <code>+00:00</code>.
     * @format date-time
     */
    incomeReceivedAt?: string
    /** Список услуг. */
    services?: ReceiptService[]
    /**
     * ИНН покупателя-компании.
     * @pattern ^(\d{10})$
     */
    customerInn: string
    /** Название организации, которой самозанятый оказывал услуги. */
    customerOrganization: string
}

/** Объект с информацией о последней заявке на изменение самозанятости в Т-Банке. Изначально имеет статус IN_PROGRESS и переходит в DONE при завершении процесса (как успешном, так и с ошибкой). Если от пользователя требуется выдать права в ЛК ФНС, то будет иметь subStatus PERMISSION_REQUESTED. После создания новой заявки — предыдущая исчезает. Нельзя завести новую заявку, если текущая IN_PROGRESS. */
export interface Application {
    /** Статус заявки. */
    status: ApplicationStatus
    /** Субстатус, присутствует только у заявок, где status = IN_PROGRESS. */
    subStatus?: ApplicationSubStatus
    /**
     * Дата и время последнего изменения данных по заявке в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    changedAt: string
    /** Результат по заявке со статусом DONE. */
    result?: ApplicationResult
    /** Причина, по которой рассмотрение заявки не завершилось успехом. Может быть у заявок в статусе DONE. */
    reason?: string
    /** Более подробное описание причины неуспеха. Может быть у заявок в статусе DONE. */
    reasonDescription?: string
}

/** Информация о получателе. */
export interface Recipient {
    /**
     * ИНН получателя.
     * @pattern ^(\d{12}|\d{10}|0{1})$
     */
    inn: string
    /** Наименование получателя. */
    name?: string
    /**
     * Счет получателя.
     * @pattern ^(\d{20}|\d{22})$
     */
    account?: string
}

export interface CreateRegularPaymentRequest {
    /**
     * Тип платежа:
     * * `REGULAR` — обычный.
     * * `TAX` — налоговый.
     */
    type: CreateRegularPaymentRequestTypeEnum
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Номер номинального счета.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * Идентификатор банковских реквизитов.
     * @format uuid
     */
    bankDetailsId?: string
    /** Сумма платежа. */
    amount: number
    /**
     * Назначение платежа.
     * @minLength 1
     * @maxLength 210
     */
    purpose: string
}

export type BankDetails = CardBankDetails | RkcBankDetails | SbpBankDetails

export interface TacqOperationResponse {
    /**
     * Последняя дата совершения транзакции для выборки в UTC. Формат — `yyyy-MM-ddTHH:mm:ssZ`.
     * @format date-time
     */
    lastTransactionDate?: string
    /** Список операций по терминалу. */
    operations?: Operation[]
}

/** Статус запроса на получение чеков. */
export enum SelfEmployedReceiptsRequestStatus {
    FINISHED = 'FINISHED',
    IN_PROGRESS = 'IN_PROGRESS',
    ERROR = 'ERROR'
}

/** Тип адреса. */
export enum AddressType {
    ValueЖительства = 'Жительства',
    ValueРегистрации = 'Регистрации',
    ValueРаботы = 'Работы'
}

/** Данные о блокировках. */
export interface ListOfArrest {
    /** Список блокировок. */
    sum: number
    values?: Arrest[]
}

/** Информация о работе. */
export interface JobInfo {
    /** Должность. */
    position?: string
}

/** Статус платежа:<br /><ul><li>WAITING — ожидает отправки реестра;</li><li>ACCEPTED — ожидает исполнения реестра;</li><li>EXECUTED — исполнен;</li><li>REJECTED — отклонен банком;</li><li>CANCELLED — отменен;</li><li>DELETED — удален.</li></ul> */
export enum PaymentInfoRegistryStatus {
    ACCEPTED = 'ACCEPTED',
    EXECUTED = 'EXECUTED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED',
    DELETED = 'DELETED',
    WAITING = 'WAITING'
}

export interface BeneficiaryScoringResult {
    /** Индикатор валидности ИНН. */
    isInnValid: boolean
    /** Индикатор валидности паспортных данных. */
    isPassportValid: boolean
    /** Индикатор нахождения бенефициара в черном списке. */
    isInBlacklist: boolean
}

/** Статус платежа:<br /><ul><li>WAITING — платеж ожидает отправки реестра;</li><li>ACCEPTED — платеж ожидает исполнения реестра;</li><li>EXECUTED — платеж исполнен;</li><li>REJECTED — платеж отклонен банком;</li><li>CANCELLED — платеж отменен;</li><li>DELETED — платеж удален.</li></ul> */
export enum PaymentInfoRegistryStatus1 {
    ACCEPTED = 'ACCEPTED',
    EXECUTED = 'EXECUTED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED',
    DELETED = 'DELETED',
    WAITING = 'WAITING'
}

export interface MigrationCard {
    /** Тип документа. */
    type: MigrationCardTypeEnum
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate: string
}

export interface BeneficiaryUlResidentRequest {
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryUlResidentRequestTypeEnum
    /** Наименование организации. */
    name?: string
    /**
     * Номер телефона. phoneNumber или email обязателен к заполнению.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. phoneNumber или email обязателен к заполнению. */
    email?: string
    /** Адреса. */
    addresses?: Address[]
    /**
     * Дата регистрации.
     * @format date
     */
    registrationDate?: string
    /** Организационно-правовая форма. */
    opf?: string
    /**
     * ИНН.
     * @pattern ^(\d{10})$
     */
    inn: string
    /**
     * Основной государственный регистрационный номер.
     * @pattern ^(\d{13})$
     */
    ogrn?: string
}

export interface CreateDraftRequest {
    /** Фамилия сотрудника. */
    lastName: string
    /** Имя сотрудника. */
    firstName: string
    /** Отчество сотрудника. */
    secondName?: string
    /**
     * Дата рождения в формате `yyyy-MM-dd`.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    placeOfBirth: string
    /**
     * Номер телефона.
     * @pattern ^((\+7)([0-9]){10})$
     */
    phoneNumber: string
    /** Данные паспорта. */
    passport: Passport1
    /** Адрес регистрации. */
    registrationAddress?: Address1
    /** Фактический адрес. */
    actualAddress: {
        /** Почтовый код. */
        zipCode?: string
        /** Страна. */
        country: string
        /** Регион. */
        region: string
        /** Район. */
        district?: string
        /** Город. */
        city?: string
        /** Населенный пункт. */
        settlement?: string
        /** Улица. */
        street?: string
        /** Дом. */
        house: string
        /** Строение. */
        building?: string
        /** Квартира. */
        apartment?: string
    }
}

export interface SelfEmployedListRequest {
    /** Список идентификаторов самозанятых. */
    recipientIds?: number[]
    /** ИНН самозанятых. */
    inn?: string[]
    /** Статусы самозанятых. */
    status?: string[]
    /** Статусы самозанятости. */
    selfEmployedStatus?: string[]
    /** Период даты добавления. */
    creationDate?: SelfEmployedCreationDate
    /**
     * Количество получателей, которых мы пропустим при выдаче с начала списка.
     * @format int32
     */
    offset?: number
    /**
     * Максимальное количество самозанятых, информацию по которым отдадим в ответе. Максимум и по умолчанию — 900.
     * @format int32
     */
    limit?: number
}

export interface AddCardRequestRequest {
    /**
     * Ключ терминала.
     * @minLength 1
     * @maxLength 256
     */
    terminalKey: string
}

export interface SelfEmployedCreatePaymentInfo {
    /**
     * Идентификатор платежа на стороне клиента.
     * @format int32
     */
    number: number
    /** Номер счета самозанятого. */
    accountNumber: string
    /** Назначение платежа. */
    paymentPurpose: string
    /** Данные самозанятого. */
    selfEmployedInfo: {
        /** Имя (кириллица). */
        firstName: string
        /** Фамилия (кириллица). */
        lastName: string
        /** Отчество (кириллица). */
        middleName?: string
    }
    /** Сумма платежа в рублях. */
    sum: number
    /** Код вида дохода. */
    revenueTypeCode?: SelfEmployedCreatePaymentInfoRevenueTypeCodeEnum
    collectionAmount?: number
}

export interface ReceiptFailedOperation {
    /** Статус операции. */
    status: ReceiptOperationStatus
    /** Тип операции. */
    type: ReceiptOperationType
    /**
     * Дата и время создания операции в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    createdAt: string
    /** Код ошибки. */
    errorCode: string
    /** Описание ошибки. */
    errorMessage?: string
}

/** Информация для совершения налоговых платежей за третьих лиц. */
export interface ThirdPartyInfo {
    /**
     * ИНН третьего лица.
     * @pattern ^(\d{12}|\d{10}|0{1})$
     */
    inn: string
    /**
     * КПП третьего лица.
     * @pattern ^(\d{9}|0)$
     */
    kpp: string
    /** ФИО третьего лица. */
    name: string
}

/** Объект с датой окончания срока действия карты. */
export interface ExpiryDate {
    /**
     * Год окончания срока действия карты.
     * @format int32
     */
    year: number
    /**
     * Месяц окончания срока действия карты.
     * @format int32
     */
    month: number
}

/** Статус создания:<br /><ul><li>QUEUED — платежный реестр стоит в очереди на создание;</li><li>CREATED — платежный реестр создан;</li><li>ERROR — платежный реестр не был создан, ошибки перечислены в параметре <b>errors</b>.</li></ul> */
export enum CreationRegisterStatus {
    CREATED = 'CREATED',
    ERROR = 'ERROR',
    QUEUED = 'QUEUED'
}

export interface BankStatementOperation {
    /** Уникальный идентификатор операции. */
    operationId: string
    /** Номер документа. */
    id: string
    /**
     * Дата документа.
     * @format date
     */
    date: string
    /** Сумма платежа. */
    amount: number
    /**
     * Дата списания средств с р/с плательщика.
     * @format date
     */
    drawDate: string
    /** Имя плательщика. */
    payerName: string
    /** ИНН плательщика. */
    payerInn?: string
    /** Номер счета плательщика. */
    payerAccount?: string
    /** Корреспондентский счет плательщика. */
    payerCorrAccount?: string
    /** БИК плательщика. */
    payerBic: string
    /** Банк плательщика. */
    payerBank: string
    /**
     * Дата поступления средств на р/с получателя.
     * @format date
     */
    chargeDate: string
    /** Получатель платежа. */
    recipient: string
    /** ИНН получателя платежа. */
    recipientInn?: string
    /** Номер счета получателя платежа. */
    recipientAccount: string
    /** Корреспондентский счет получателя платежа. */
    recipientCorrAccount?: string
    /** БИК получателя платежа. */
    recipientBic: string
    /** Банк получателя платежа. */
    recipientBank: string
    /** Вид платежа. */
    paymentType?: string
    /**
     * Условное обозначение (шифр) документа, проводимого по счету в кредитной организации. <a href="https://www.consultant.ru/document/cons_doc_LAW_436264/f0d58093feca12dbef02bd44fd633f1c94b49da1/">Перечень условных обозначений</a>.
     * @pattern \d{2}
     */
    operationType: string
    /** Уникальный идентификатор платежа. <a href="https://www.consultant.ru/law/podborki/unikalnyj_identifikator_platezha/">Подробнее</a>. */
    uin?: string
    /** Назначение платежа. */
    paymentPurpose: string
    /** Статус составителя расчетного документа. */
    creatorStatus: string
    /** КПП плательщика. */
    payerKpp?: string
    /** КПП получателя. */
    recipientKpp?: string
    /** Код бюджетной классификации. */
    kbk?: string
    /** Код ОКТМО территории, на которой мобилизуются денежные средства от уплаты налога, сбора и иного платежа. */
    oktmo?: string
    /** Основание налогового платежа. */
    taxEvidence?: string
    /** Налоговый период / код таможенного органа. */
    taxPeriod?: string
    /** Номер налогового документа. */
    taxDocNumber?: string
    /** Дата налогового документа. */
    taxDocDate?: string
    /** Тип налогового платежа. */
    taxType?: string
    /** Очередность платежа. */
    executionOrder?: string
}

export interface InvalidRequestResponse {
    /**
     * Уникальный идентификатор ошибки.
     * @maxLength 50
     */
    errorId: string
    /**
     * Текст ошибки.
     * @maxLength 400
     */
    errorMessage: string
    /**
     * Код ошибки.
     * @maxLength 50
     */
    errorCode: string
    /** Дополнительные данные об ошибке. */
    errorDetails?: object
}

/** Заполненная анкета клиента. */
export interface FormDataResponse {
    /**
     * Год, за который подается декларация.
     * @format int32
     */
    year: number
    /** Был ли клиент налоговым резидентом в выбранный год. */
    isResident: boolean
    /** Тип декларации. */
    type: DeclarationType
    /**
     * Группы источников дохода.
     * @maxItems 100
     */
    incomeSources?: IncomeSourceResponse[]
    /**
     * Группы налоговых вычетов.
     * @maxItems 100
     */
    taxReturnReasons?: TaxReturnReasonResponse[]
    /**
     * Версия анкеты.
     * @format int32
     */
    casVersion: number
    /**
     * Дата создания.
     * @format date-time
     */
    createdAt: string
}

/** Банковская информация сотрудника. */
export interface BankInfo1 {
    /** Номер счета сотрудника. */
    accountNumber?: string
    /** Номер договора сотрудника. */
    agreementNumber?: string
}

/** Международная платежная система. */
export enum CardNetwork {
    MASTERCARD = 'MASTERCARD',
    VISA = 'VISA',
    MIR = 'MIR'
}

export interface ReissueVirtualCardResponse {
    /**
     * Идентификатор заявки на перевыпуск виртуальной карты.
     * @format uuid
     */
    correlationId: string
}

export interface CreateIndividualReceiptRequest {
    /**
     * От кого самозанятый получил доход:
     * * `FROM_INDIVIDUAL` — от физического лица;
     * * `FROM_LEGAL_ENTITY` — от компании;
     * * `FROM_FOREIGN_AGENCY` — от иностранной компании.
     */
    incomeType: CreateIndividualReceiptRequestIncomeTypeEnum
    /**
     * Дата и время получения дохода в UTC. Ожидается в ISO-8601 формате <b>yyyy-MM-ddTHH:mm:ss<.fff><TZDSuffix></b>, где:
     * * `HH` — часы в 24-часовой нотации. Допускаются значения от 00 до 23.
     * * `.fff` — опциональная часть, содержащая доли секунд. Допускается не больше трех знаков.
     * * `TZDSuffix` — опциональный суффикс. Допускается значение <code>Z</code> или <code>+00:00</code>.
     * @format date-time
     */
    incomeReceivedAt?: string
    /** Список услуг. */
    services?: ReceiptService[]
}

export interface UploadTaskFileResponse {
    /** Идентификатор документа. */
    id: string
}

export interface RecipientResponse {
    /**
     * Идентификатор сделки.
     * @format uuid
     */
    dealId: string
    /**
     * Идентификатор этапа сделки.
     * @format uuid
     */
    stepId: string
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Идентификатор реципиента.
     * @format uuid
     */
    recipientId: string
    /** Сумма реципиента. */
    amount: number
    /** Налог реципиента. */
    tax?: number
    /**
     * Назначение платежа.
     * @minLength 1
     * @maxLength 210
     */
    purpose?: string
    /**
     * Идентификатор банковских реквизитов.
     * @format uuid
     */
    bankDetailsId?: string
    /**
     * Вывод на виртуальный счет в рамках номинального счета — <code>true</code>, на реальные реквизиты — <code>false</code>.
     *
     * При создании реципиента без банковских реквизитов, платеж в рамках сделки автоматически будет выполнен на виртуальный счет бенефициара.
     */
    keepOnVirtualAccount?: boolean
}

/** Статус авторизации */
export enum AuthStatus {
    Succeed = 'succeed',
    Cancelled = 'cancelled'
}

export interface CreateTaxPaymentRequest {
    /**
     * Тип платежа:
     * * `REGULAR` — обычный.
     * * `TAX` — налоговый.
     */
    type: CreateTaxPaymentRequestTypeEnum
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Номер номинального счета.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    bankDetails: BankDetails
    /** Сумма платежа. */
    amount: number
    /**
     * Назначение платежа.
     * @minLength 1
     * @maxLength 210
     */
    purpose: string
    /**
     * Уникальный идентификатор платежа.
     * @pattern 0|[А-Яа-яA-Za-z0-9]{4}|[А-ЯA-Z0-9]{15}|[а-яА-Яa-zA-Z0-9№\s!"#$%;'()*+,-\.\/:;;=>?@\]\[\\\^_`{|}~]{20}|[а-яА-Яa-zA-Z0-9№\s!"#$%;'()*+,-\.\/:;;=>?@\]\[\\\^_`{|}~]{25}
     */
    uin: string
    /** Реквизиты для уплаты налогов и иных бюджетных платежей. */
    tax: TaxPaymentParameters
}

export type BeneficiaryScoringInfoV2 = FAILED | IN_PROGRESS | SUCCEEDED

/** Адрес регистрации. */
export interface Address1 {
    /** Почтовый код. */
    zipCode?: string
    /** Страна. */
    country: string
    /** Регион. */
    region: string
    /** Район. */
    district?: string
    /** Город. */
    city?: string
    /** Населенный пункт. */
    settlement?: string
    /** Улица. */
    street?: string
    /** Дом. */
    house: string
    /** Строение. */
    building?: string
    /** Квартира. */
    apartment?: string
}

export interface BeneficiaryFlNonresidentResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryFlNonresidentResponseTypeEnum
    /** Имя. */
    firstName: string
    /** Отчество. */
    middleName?: string
    /** Фамилия. */
    lastName: string
    isSelfEmployed: boolean
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace?: string
    /**
     * Гражданство. Код страны в формате `ISO 3166-1 alpha-2`.
     * @pattern ^([A-Z]{2})$
     */
    citizenship: string
    /**
     * Номер телефона.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. */
    email?: string
    /** Документы. */
    documents?: Document2[]
    /** Адреса. */
    addresses?: Address[]
    /**
     * ИНН.
     * @pattern ^(\d{12})$
     */
    inn?: string
}

export interface Arrest {
    /** Уникальный идентификатор. */
    id: string
    /** Внешний идентификатор требования. Обеспечивается связь нескольких блокировок. */
    externalId?: string
    /** Сумма требования. */
    amount: number
    /**
     * Код валюты по ОКВ.
     * @pattern ^\d{3}$
     */
    currency: string
    /** Статус требования. */
    status: EptArrestStatus
    /**
     * Дата регистрации требования.
     * @format date-time
     */
    date: string
    /**
     * Дата отмены блокировки.
     * @format date-time
     */
    unblockDate: string
    /** Обстоятельства. */
    circumstances?: string
    /** Наименование площадки. */
    officeName?: string
}

export interface SelfEmployedReceipt {
    /**
     * Идентификатор платежа на стороне клиента.
     * @format int32
     */
    number: number
    /** Данные самозанятого. */
    selfEmployedInfo: {
        /** Имя (кириллица). */
        firstName: string
        /** Фамилия (кириллица). */
        lastName: string
        /** Отчество (кириллица). */
        middleName?: string
        /**
         * Идентификатор самозанятого.
         * @format int32
         */
        recipientId?: number
    }
    /** Ссылка на чек. */
    link?: string
    /** Результат регистрации дохода:<br /><ul><li>IN_PROGRESS — доход регистрируется.</li><li>SUCCESS — доход был успешно зарегистрирован, возвращается <code>fnsLink</code>.</li><li>CANCELED — чек был сторнирован, возвращается <code>fnsLink</code>.</li><li>FISCALIZE_FAILED — доход не удалось зарегистрировать в налоговой.</li><li>ERROR — не удалось получить статус наличия зарегистрированного дохода. <br />Возвращается при внутренней ошибке или если доход по платежу еще не регистрировался.</li></ul> */
    status: SelfEmployedReceiptsStatus
    /** Ошибка во время получения чека. */
    error?: {
        /** Код ошибки. */
        errorCode: string
        /** Описание ошибки. */
        errorMessage: string
    }
}

export interface RecipientListResponse {
    /**
     * Запрошенное количество реципиентов для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество реципиентов для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество реципиентов в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего реципиентов, подходящих под условия запроса.
     * @format int32
     */
    total: number
    /** Список реципиентов этапа сделки. */
    results?: RecipientResponse[]
}

export interface CobrandResponse {
    /** `true/false` — признак наличия кобрэнда. */
    programStatus: boolean
    /** Список аккаунтов. */
    accounts?: CobrandAccount[]
}

export interface BlockCardRequest {
    /**
     * Причина блокировки:
     * * `LOST` — карта утеряна;
     * * `STOLEN` — карта украдена;
     * * `BROKEN` — карта повреждена;
     * * `FRAUD` — мошенничество;
     * * `CLIENTINITIATED` — другая причина.
     */
    reason: BlockCardRequestReasonEnum
    /** Комментарий. */
    comment?: string
}

export interface PaymentInfo {
    /**
     * Идентификатор платежа на стороне клиента.
     * @format int32
     */
    number?: number
    /** Статус платежа:<br /><ul><li>WAITING — ожидает отправки реестра;</li><li>ACCEPTED — ожидает исполнения реестра;</li><li>EXECUTED — исполнен;</li><li>REJECTED — отклонен банком;</li><li>CANCELLED — отменен;</li><li>DELETED — удален.</li></ul> */
    status: PaymentInfoRegistryStatus
    /** Данные сотрудника. */
    employeeInfo: EmployeeInfo
    /** Номер счета сотрудника. */
    accountNumber?: string
    /** Назначение платежа. */
    paymentPurpose?: string
    /** Сумма платежа. */
    sum: number
    /**
     * Начало периода платежа.
     * @format date
     */
    periodStart?: string
    /**
     * Окончание периода платежа.
     * @format date
     */
    periodEnd?: string
}

export interface BalanceListItem {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Номер номинального счета.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /** Текущий баланс бенефициара. */
    amount: number
    /** Заблокированные средства бенефициара. */
    amountOnHold: number
}

export interface Employee {
    /**
     * Идентификатор сотрудника.
     * @format int32
     */
    id: number
    /** Статус сотрудника:<br /><ul><li>ERROR — ошибка создания анкеты сотрудника;</li><li>DRAFT — анкета сотрудника готова к отправке;</li><li>PROCESSING_ERROR — ошибка отправки анкеты — обратитесь к персональному менеджеру для уточнения причины;</li><li>PROCESSING — обрабатываем анкету сотрудника;</li><li>REJECTED — отказ в открытии счета (конечный статус добавления);</li><li>MTNG_WAIT — сотрудник ожидает назначения встречи для доставки карты; </li><li>MTNG_SCHD — встреча для доставки карты сотруднику назначена;</li><li>MTNG_CANC — встреча для доставки карты сотруднику отменена;</li><li>ACTIVE — сотрудник добавлен (конечный статус добавления);</li><li>FIRED — сотрудник уволен;</li><li>DELETED — сотрудник удален из зарплатного проекта.</li></ul> */
    status: EmployeeStatus
    /** Имя. */
    firstName: string
    /** Фамилия. */
    lastName: string
    /** Отчество. */
    middleName?: string
    /**
     * Дата рождения.
     * @format date
     */
    birthDate?: string
    /** Номера телефонов. */
    phones?: Phone[]
    /** Документы. */
    documents?: Document[]
    /** Информация о работе. */
    jobInfo?: JobInfo
    /** Банковская информация сотрудника. */
    bankInfo: BankInfo1
}

export interface UpdateRecipientBankDetailsRequest {
    /**
     * Идентификатор банковских реквизитов.
     * @format uuid
     */
    bankDetailsId: string
}

export interface CreateTaskRequest {
    /** Шаблон, определяющий бизнес-логику задания. */
    template: string
    /** Комментарий к заданию для представителя. */
    commentForAgent?: string
    /** Идентификатор родительского задания. */
    parentTaskId?: string
    /** Дополнительные метаданные в формате JSON. */
    meta?: Record<string, string>
    /** Группа объектов с информацией о данных каждого участника задания, подлежащего удостоверению на встрече. */
    contacts?: Contact[]
}

export interface StepRequest {
    /**
     * Описание этапа сделки.
     * @minLength 3
     * @maxLength 4096
     */
    description: string
}

export interface DealResponse {
    /**
     * Идентификатор сделки.
     * @format uuid
     */
    dealId: string
    /**
     * Номер номинального счета.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * Статус сделки.![payment-statuses](https://business.t-static.ru/static/images/opensme/nominal-accounts/deal-statuses.svg)
     * * `DRAFT` — сделка создана и доступна для редактирования.
     * * `ACCEPTED` — параметры сделки подтверждены, средства зарезервированы.
     * * `IN_PROGRESS` — сделка в процессе.
     * * `CANCELLED` — сделка отменена.
     * * `COMPLETED` — сделка успешно завершена.
     */
    status: DealResponseStatusEnum
}

export interface Etp {
    /** Уникальный идентификатор. */
    id: string
    /** Внешний идентификатор требования. Обеспечивается связь нескольких блокировок. */
    externalId?: string
    /** Сумма требования. */
    amount: number
    /**
     * Код валюты по ОКВ.
     * @pattern ^\d{3}$
     */
    currency: string
    /** Статус требования. */
    status: EptArrestStatus
    /**
     * Дата регистрации требования.
     * @format date-time
     */
    date: string
    /** Оплаченная сумма. */
    payedAmount: number
    /** Назначение платежа. */
    paymentPurpose?: string
    /**
     * ИНН плательщика.
     * @pattern ^(\d{12}|\d{10}|0{1})$
     */
    senderInn: string
    /** Информация о получателе. */
    recipient: Recipient
    /** Информация о банке получателя. */
    bank: Bank
    /** Наименование площадки. */
    officeName?: string
}

export interface BeneficiaryUlNonresidentResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryUlNonresidentResponseTypeEnum
    /** Наименование организации. */
    name: string
    /**
     * Номер телефона.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. */
    email?: string
    /** Адреса. */
    addresses?: Address[]
    /** Номер записи об аккредитации. */
    nza?: string
    /**
     * Дата регистрации.
     * @format date
     */
    registrationDate: string
    /** Номер регистрации. */
    registrationNumber: string
    /** Организационно-правовая форма. */
    opf?: string
    /**
     * ИНН.
     * @pattern ^(\d{10})$
     */
    inn?: string
    /** Код иностранной организации. */
    kio?: string
}

export type BeneficiaryRequest =
    | BeneficiaryFlNonresidentRequest
    | BeneficiaryFlResidentRequest
    | BeneficiaryIpNonresidentRequest
    | BeneficiaryIpResidentRequest
    | BeneficiaryLiteContactRequest
    | BeneficiaryUlNonresidentRequest
    | BeneficiaryUlResidentRequest

export interface CreateDocument1 {
    /** Тип документа. */
    type: CreateDocumentType
    /** Серия. */
    serial: string
    /** Номер документа. */
    number?: string
    /**
     * Дата.
     * @format date
     */
    date: string
    /** Кем выдан. */
    organization: string
    /** Код подразделения. */
    division?: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate?: string
}

export interface SelfEmployedResponse {
    /** Список самозанятых. */
    recipients?: SelfEmployed[]
}

export interface DeliveryTask {
    /** Идентификатор задания. */
    id: string
    /** Статус задания. */
    status: string
    /** Шаблон задания. */
    template: string
    meetResult?: string
    /** Результат задания. */
    resolution?: string
    /** Детальное описание результата задания. */
    subResolution?: string
    /** Идентификатор родительского задания. */
    parentTaskId?: string
    /** Дополнительные метаданные в формате JSON. */
    meta?: Record<string, string>
    /** Группа объектов с информацией о документах, относящихся к заданию. Может быть пустым, если документы не нужны в качестве результатов задания. */
    attachments?: Attachment[]
    /** Группа объектов с информацией о фото, относящихся к заданию. */
    photos?: Photo[]
}

/** Тип документа */
export enum IdentificationDocumentType {
    PASSPORT = 'PASSPORT'
}

export interface CreateSelfEmployedRequest {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
    /** Список самозанятых на создание. */
    recipients?: CreateSelfEmployedData[]
}

export interface AmountDistributionItem {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Сумма пополнения. */
    amount: number
}

export interface CardInfoResponse {
    /**
     * Уникальный идентификатор карты.
     * @format int64
     */
    ucid: number
    /**
     * Номер расчетного счета, к которому привязана карта.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * Первые 6 цифр номера карты (BIN карты).
     * @minLength 6
     * @maxLength 6
     * @pattern \d{6}
     */
    cardBin: string
    /**
     * Последние 4 цифры номера карты.
     * @minLength 4
     * @maxLength 4
     * @pattern \d{4}
     */
    cardLastFourDigits: string
    /** Флаг активации карты. */
    isActive: boolean
    /**
     *
     * Статус карты:
     * <ul>
     * <li>`NORM` — карта активна;</li>
     * <li>`CLOSED` — карта неактивна;</li>
     * <li>`BLOCKED` — карта заблокирована.</li>
     * </ul>
     */
    status: CardStatus
    /** Имя держателя карты. */
    embossedName: string
}

/** Данные сотрудника. */
export interface EmployeeInfo {
    /** Имя (кириллица). */
    firstName: string
    /** Фамилия (кириллица). */
    lastName: string
    /** Отчество (кириллица). */
    middleName?: string
    /**
     * Идентификатор сотрудника. Возвращается для реестров в статусе <code>DRAFT</code>, <code>ACCEPTED</code>, <code>PART_EXEC</code> или <code>EXECUTED</code>.
     * @format int32
     */
    employeeId?: number
}

export interface ContractGPD {
    /** Тип документа. */
    type: ContractGpdTypeEnum
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate?: string
}

export interface CreatePhone1 {
    /** Тип телефона. */
    type: CreatePhoneType
    /** Номер телефона. */
    number: string
}

export interface AccountOperation {
    /**
     * Номер счета
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * Дата авторизации
     * @format date-time
     */
    authDateTime: string
    /**
     * Дата транзакции
     * @format date-time
     */
    trxnDateTime?: string
    /** Идентификатор авторизации */
    authId?: string
    /** Идентификатор транзакции */
    trxnId?: string
    /** Статус авторизации */
    authStatus?: AuthStatus
    /** Тип операции */
    operationType: AccountOperationType
    operationStatus: AccountOperationStatus
    /** Сумма операции в валюте операции */
    amount: number
    /** Валюта операции */
    currency: string
    /** Сумма операции в валюте счета */
    accountAmount: number
    /** Назначение платежа */
    description?: string
    /** Информация о карте */
    card: Card
    /** Информация о контрагенте */
    merch?: Merch
    /** RRN */
    rrn?: string
    /** acquirerId */
    acquirerId?: string
}

/**
 *
 * Статус заявки:
 * <ul>
 * <li>`NEW` — заявка принята, в работу еще не взята;</li>
 * <li>`IDENTIFICATION` — производится удаленная идентификация сотрудника, на которого выпускается бизнес-карта;</li>
 * <li>`ISSUING` — бизнес-карта выпускается;</li>
 * <li>`FAILED_FATAL` — в процессе возникла фатальная ошибка, выпустить бизнес-карту на этого сотрудника нельзя;</li>
 * <li>`FAILED_NON_FATAL` — в процессе возникла ошибка, подайте новую заявку;</li>
 * <li>`CARD_ISSUED` — карта выпущена.</li>
 *  </ul>
 */
export enum CardIssueApplicationStatus {
    NEW = 'NEW',
    IDENTIFICATION = 'IDENTIFICATION',
    ISSUING = 'ISSUING',
    FAILED_FATAL = 'FAILED_FATAL',
    FAILED_NON_FATAL = 'FAILED_NON_FATAL',
    CARD_ISSUED = 'CARD_ISSUED'
}

export interface FAILED {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Статус проверки в финансовом мониторинге. */
    status: FailedStatusEnum
    warnings?: BeneficiaryScoringError[]
    errors?: BeneficiaryScoringError[]
}

export interface DebitAccount {
    /** Получатель (ФИО). */
    name: string
    /** Счет получателя платежа. */
    accountNumber: string
    /** Информация о банке. */
    bank: BankInfo
}

export interface CreateMeetingRequest {
    /** Идентификатор назначения встречи. */
    appointmentId: string
    /** Время начала интервала. */
    intervalStartTime: string
    /** Время окончания интервала. */
    intervalEndTime: string
    /** Комментарий к встрече для представителя. */
    commentForAgent?: string
}

export interface HoldListItem {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Номер номинального счета.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    /**
     * ID холда.
     * @format uuid
     */
    holdId: string
    /**
     * ID сделки, под которую сделан холд.
     * @format uuid
     */
    dealId?: string
    /**
     * ID этапа сделки, под который сделан холд.
     * @format uuid
     */
    stepId?: string
    /**
     * ID реципиента этапа сделки, под которого сделан холд.
     * @format uuid
     */
    recipientId?: string
    /**
     * ID выплаты, под которую сделан холд.
     * @format uuid
     */
    paymentId?: string
    /** Сумма холда. */
    amount: number
}

export interface BusinessErrorResponse {
    /**
     * Уникальный идентификатор ошибки.
     * @maxLength 50
     */
    errorId: string
    /**
     * Текст ошибки.
     * @maxLength 400
     */
    errorMessage: string
    /**
     * Код ошибки.
     * @maxLength 50
     */
    errorCode: string
    /** Дополнительные данные об ошибке. */
    errorDetails?: object
}

export enum DocumentType2 {
    PASSPORT = 'PASSPORT',
    SELFIE_WITH_PASSPORT = 'SELFIE_WITH_PASSPORT'
}

/** Тип адреса. */
export enum CreateAddressType {
    ValueЖительства = 'Жительства',
    ValueРегистрации = 'Регистрации'
}

export interface InternalServerErrorResponse {
    /**
     * Уникальный идентификатор ошибки.
     * @maxLength 50
     */
    errorId: string
    /**
     * Текст ошибки.
     * @maxLength 400
     */
    errorMessage: string
    /**
     * Код ошибки.
     * @maxLength 50
     */
    errorCode: string
}

export interface SelfEmployedPayPaymentRegistryRequest {
    /**
     * Идентификатор платежного реестра.
     * @format int32
     */
    paymentRegistryId: number
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
}

export enum AccountOperationStatus {
    Authorization = 'authorization',
    Transaction = 'transaction'
}

export interface BindTaxpayerRequest {
    /** Имя самозанятого. */
    firstName: string
    /** Фамилия самозанятого. */
    lastName: string
    /** Отчество самозанятого. */
    middleName?: string
    /**
     * Номер телефона самозанятого.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber: string
}

/** Объект с информацией о расходном лимите. */
export interface SpendLimit {
    /** Лимит на покупки и снятия наличных в валюте счета, к которому привязана карта */
    limitValue: number
    /** Доступный остаток расходного лимита в валюте счета, к которому привязана карта */
    limitRemain: number
    /**
     *
     * Период обновления доступного остатка расходного лимита:
     * <ul>
     * <li>`DAY" — доступный остаток станет равным лимиту в начале следующих суток;</li>
     * <li>`MONTH` — доступный остаток станет равным лимиту в начале следующего месяца;</li>
     * <li>`IRREGULAR` — доступный остаток станет равным лимиту только при обновлении лимита;</li>
     * <li>`CUSTOM` — период обновления лимита установлен в дополнительное состояние вручную — его можно узнать у вашего персонального менеджера.</li>
     * </ul>
     */
    limitPeriod: SpendLimitLimitPeriodEnum
}

/** Информация о банке получателя. */
export interface Bank {
    /**
     * БИК банка получателя.
     *
     *
     * С 1 января 2021 года при перечислении налоговых платежей указываются новые значения БИК банков получателя.
     *
     *
     * <a href="https://spmag.ru/articles/polya-platezhnogo-porucheniya-v-2021-godu-obrazec">Подробнее о полях платежного поручения</a>
     * @pattern \d{9}
     */
    bik?: string
    /**
     * Корреспондентский счет банка получателя.
     *
     *
     * С 1 января 2021 года при уплате налогов указывается номер счета банка получателя, входящий в состав единого казначейского счета (ЕКС). Раньше это поле заполнялось нулями.
     * @pattern \d{20}
     */
    corAccount?: string
    /**
     * Наименование банка получателя.
     *
     *
     * С 1 января 2021 года при заполнении платежей на перечисление налогов после названия банка указывается название счета казначейства через знак <code>//</code>.
     * @minLength 1
     * @maxLength 255
     */
    name?: string
}

export interface PaymentStatusResponse {
    /**
     * Статус платежа:
     * <ul>
     * <li><code>IN_PROGRESS</code> — в процессе исполнения;</li>
     * <li><code>EXECUTED</code> — исполнен;</li>
     * <li><code>FAILED</code> — не исполнен;</li>
     * <li><code>CANCELLED</code> — отменен.</li>
     * </ul>
     */
    status: PaymentStatus
    /** Описание ошибки. */
    errorMessage?: string
    /** Дополнительные данные, переданные в поле <b>meta</b> запроса платежа. */
    meta?: Record<string, string>
}

export interface ApiForeignAgentResponse {
    /** Является ли пользователь иностранным агентом. */
    isForeignAgent: boolean
}

export interface RegularPaymentResponse {
    /**
     * Тип платежа:
     * * `REGULAR` — обычный.
     * * `TAX` — налоговый.
     */
    type: RegularPaymentResponseTypeEnum
    /**
     * Идентификатор платежа.
     * @format uuid
     */
    paymentId: string
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Номер номинального счета.
     * @pattern ^(\d{20}|\d{22})$
     */
    accountNumber: string
    bankDetails: BankDetails
    /**
     * Идентификатор сделки.
     * @format uuid
     */
    dealId?: string
    /**
     * Идентификатор этапа сделки.
     * @format uuid
     */
    stepId?: string
    /**
     * Идентификатор реципиента.
     * @format uuid
     */
    recipientId?: string
    /** Сумма платежа. */
    amount: number
    /**
     * Статус платежа![payment-statuses](https://business.t-static.ru/static/images/opensme/nominal-accounts/payment-statuses.svg)
     * * `PENDING` — Ожидает обработки.
     * * `IN_PROGRESS` — В процессе.
     * * `FAILED` — Неуспешен.
     * * `CANCELLED` — Отменен.
     * * `SUCCEEDED` — Успешно завершен.
     */
    status: RegularPaymentResponseStatusEnum
    /** Описание ошибки в случае неуспешности платежа. */
    errorMessage?: string
    /**
     * Назначение платежа.
     * @minLength 1
     * @maxLength 210
     */
    purpose: string
    /**
     * Уникальный ID операции.
     * @format uuid
     */
    operationId?: string
}

/**
 *
 * Может принимать одно из двух значений:
 * <ul>
 * <li>IGNORE_ERRORS — реестр будет создан из всех корректных платежей, его идентификатор вернется в поле <b>paymentRegistryId</b> метода <a href="/docs/api/self-employed-get-payment-registry-create-result">Получить результат создания черновика платежного реестра</a>. Если корректных платежей нет, реестр не создастся.</li>
 * <li>FAIL_ERRORS — если есть ошибочные платежи, реестр не создастся. Значение по умолчанию — FAIL_ERRORS.</li>
 * </ul>
 */
export enum EmployeeRegistryCreateTypeRequest {
    IGNORE_ERRORS = 'IGNORE_ERRORS',
    FAIL_ERRORS = 'FAIL_ERRORS'
}

export interface StepResponse {
    /**
     * Идентификатор сделки.
     * @format uuid
     */
    dealId: string
    /**
     * Идентификатор этапа сделки.
     * @format uuid
     */
    stepId: string
    /**
     * Порядковый номер этапа сделки.
     * @format int32
     */
    stepNumber: number
    /**
     * Описание этапа сделки.
     * @minLength 3
     * @maxLength 4096
     */
    description: string
    /**
     * Статус этапа сделки.![payment-statuses](https://business.t-static.ru/static/images/opensme/nominal-accounts/step-statuses.svg)
     * * `NEW` — создан.
     * * `PAYMENT_IN_PROGRESS` — одна или несколько выплат этапа сделки в процессе.
     * * `PAYMENT_FAILED` — одна или несколько выплат этапа сделки неуспешны.
     * * `CANCELLED` — отменен.
     * * `COMPLETED` — успешно завершен.
     */
    status: StepResponseStatusEnum
}

export interface SelfEmployedReceiptsRequest {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
    /**
     * Номер платежного реестра. Необходимо, чтобы ранее по реестру была проведена регистрация дохода.
     * @format int32
     */
    paymentRegistryId: number
}

export interface ReceiptSuccessOperation {
    /** Статус операции. */
    status: ReceiptOperationStatus
    /** Тип операции. */
    type: ReceiptOperationType
    /**
     * Дата и время создания операции в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    createdAt: string
}

/** Банковская информация самозанятого. */
export interface BankInfo2 {
    /** Номер счета самозанятого. */
    accountNumber?: string
    /** Номер договора самозанятого. */
    agreementNumber?: string
    /** БИК банка самозанятого. */
    bankBic?: string
}

export interface RecipientRequest {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /** Сумма реципиента. */
    amount: number
    /** Налог реципиента. */
    tax?: number
    /**
     * Назначение платежа.
     * @minLength 1
     * @maxLength 210
     */
    purpose?: string
    /**
     * Идентификатор банковских реквизитов.
     * @format uuid
     */
    bankDetailsId?: string
    /**
     * Вывод на виртуальный счет в рамках номинального счета — <code>true</code>, на реальные реквизиты — <code>false</code>.
     *
     * При создании реципиента без банковских реквизитов, платеж в рамках сделки автоматически будет выполнен на виртуальный счет бенефициара.
     */
    keepOnVirtualAccount?: boolean
}

export interface CreateCardPaymentRequest {
    /**
     * Идентификатор платежа. Должен быть уникален в пределах интеграции <a href="/docs/api/payments-core-pay">платежей по банковским реквизитам</a>.
     * @minLength 1
     * @maxLength 64
     */
    id: string
    /** Реквизиты плательщика. */
    from: CardPayerRequisites
    /** Номер договора получателя. */
    to: AgreementNumberRequisites
    /**
     * Назначение платежа.
     * @minLength 1
     * @maxLength 210
     */
    purpose: string
    /**
     * Номер распоряжения, определяемый клиентом. Заполняется на усмотрение плательщика. Номер документа — не больше 6 цифр.
     * @format int32
     * @min 1
     */
    documentNumber?: number
    /** Сумма платежа в рублях */
    amount: number
    /**
     * Очередность платежа.
     * @deprecated
     * @format int32
     * @min 1
     * @max 5
     */
    executionOrder?: number
    /**
     * Дата, до которой нужно провести платеж. При неуспешных попытках платежа он будет повторен вплоть до указанной даты. Если дату не передать, платеж не будет повторен в случае неуспешной попытки. Время на проведение платежа не может быть больше 30 дней.
     * @format date-time
     */
    dueDate?: string
}

export interface ReceiptInProgressOperation {
    /** Статус операции. */
    status: ReceiptOperationStatus
    /** Тип операции. */
    type: ReceiptOperationType
    /**
     * Дата и время создания операции в UTC. Возвращается в формате ISO-8601.
     * @format date-time
     */
    createdAt: string
}

export interface IncomingTransactionListResponse {
    /**
     * Запрошенное количество неидентифицированных пополнений для пропуска.
     * @format int32
     */
    offset: number
    /**
     * Запрошенное количество неидентифицированных пополнений для вывода.
     * @format int32
     */
    limit: number
    /**
     * Количество неидентифицированных пополнений в ответе.
     * @format int32
     */
    size: number
    /**
     * Всего неидентифицированных пополнений.
     * @format int32
     */
    total: number
    /** Список неидентифицированных пополнений. */
    results?: IncomingTransactionListItem[]
}

export interface IdentificationStatusResponse {
    /** Идентифицирован ли пользователь. */
    isIdentified: boolean
}

export interface ForeignPassportOfForeignCitizens {
    /** Тип документа. */
    type: ForeignPassportOfForeignCitizensTypeEnum
    /** Номер документа. */
    number: string
    /**
     * Дата выдачи.
     * @format date
     */
    date: string
    /** Кем выдан. */
    organization: string
}

/** Статус требования. */
export enum EptArrestStatus {
    PAYED = 'PAYED',
    ACTIVE = 'ACTIVE',
    PAUSE = 'PAUSE',
    CANCELED = 'CANCELED'
}

export type CreateReceiptRequest =
    | CreateForeignAgencyReceiptRequest
    | CreateIndividualReceiptRequest
    | CreateLegalEntityReceiptRequest

export interface PaymentError1 {
    /**
     * Идентификатор платежа, переданный клиентом при создании.
     * @format int32
     */
    number: number
    /** Номер счета самозанятого. */
    accountNumber?: string
    /** Ошибки валидации. */
    errors?: FieldValidationError[]
}

/** Статус чека. */
export enum ReceiptStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    REGISTERED = 'REGISTERED',
    DECLINED = 'DECLINED',
    REGISTERED_OFFLINE = 'REGISTERED_OFFLINE',
    CANCELLED = 'CANCELLED'
}

/**
 *
 * Период обновления доступного остатка лимита на снятия наличных:
 * <ul>
 * <li>`DAY" — доступный остаток станет равным лимиту в начале следующих суток;</li>
 * <li>`MONTH` — доступный остаток станет равным лимиту в начале следующего месяца;</li>
 * <li>`IRREGULAR` — доступный остаток станет равным лимиту только при обновлении лимита;</li>
 * <li>`CUSTOM` — период обновления лимита установлен в дополнительное состояние вручную — его можно узнать у вашего персонального менеджера.</li>
 * </ul>
 */
export enum OutputLimitPeriod {
    DAY = 'DAY',
    MONTH = 'MONTH',
    IRREGULAR = 'IRREGULAR',
    CUSTOM = 'CUSTOM'
}

export interface SelfEmployedPayPaymentRegistryResultResponse {
    /**
     * Идентификатор платежного реестра.
     * @format int32
     */
    paymentRegistryId: number
    /** Статус создания платежного реестра. */
    status: OrderPayStatus
    /**
     * Количество платежей в реестре.
     * @format int32
     */
    count: number
    /** Общая ошибка, произошедшая при создании реестра. */
    error?: {
        /** Код ошибки. */
        errorCode: string
        /** Описание ошибки. */
        errorDescription: string
    }
    /** Результаты оплаты. */
    paymentResults?: PaymentPayResult[]
}

export interface AccountInfo2 {
    /** Расчетный счет организации. */
    accountNumber: string
    /** Наименование счета. */
    name: string
    /** Код валюты счета по ОКВ (цифрами). */
    currency: string
    /**
     * БИК банка.
     * @pattern \d{9}
     */
    bankBik: string
    /**
     * Тип счета. Список вариантов значений может пополняться.
     * * `Current` — расчетный счет.
     * * `Tax` — счет Т-Бухгалтерии.
     * * `Tender` — специальный счет для участия в госзакупках.
     * * `Overnight` — счет Overnight.
     * * `Trust` — специальный счет доверительного управляющего ПИФ.
     * * `Broker` — специальный брокерский счет.
     * * `BankPaymentAgent` — специальный счет банковского платежного агента.
     * * `PaymentAgent` — счет платежного агента.
     * * `Nominal` — номинальный счет.
     * * `NominalIpo` — номинальный счет оператора инвестиционной платформы.
     * * `TrustManagementSmp` — специальный счет доверительного управления.
     * * `Cashbox` — бизнес-копилка.
     */
    accountType: string
    /**
     * Дата активации.
     * @format date
     */
    activationDate?: string
    /** Баланс счета. */
    balance: Balance
    /** Информация о транзитном счете. Актуально для валютных счетов. */
    transitAccount?: TransitAccount
}

export interface SelfEmployedPaymentRegistrySubmitResponse {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
}

/** Тип телефона. */
export enum PhoneType {
    ValueМобильный = 'Мобильный',
    ValueПоМестуЖительства = 'По месту жительства',
    ValueРабочий = 'Рабочий'
}

export interface VirtualCardRequisitesResponse {
    /**
     * Немаскированный номер карты.
     * @pattern ^\d{16,19}$
     */
    number: string
    /** Имя держателя карты. */
    embossedName: string
    /**
     * CVC карты.
     * @pattern ^\d{3,4}$
     */
    cvc: string
    /** Объект с датой окончания срока действия карты. */
    expiryDate: ExpiryDate
}

export type CreatePaymentRequest1 = CreateRegularPaymentRequest | CreateTaxPaymentRequest

/**
 *
 * Период обновления доступного остатка:
 * <ul>
 * <li>"DAY" &ndash; доступный остаток станет равным лимиту в начале следующих суток</li>
 * <li>"MONTH" &ndash; доступный остаток станет равным лимиту в начале следующего месяца</li>
 * <li>"IRREGULAR" &ndash; доступный остаток станет равным лимиту только при обновлении лимита</li>
 * </ul>
 */
export enum InputLimitPeriod {
    DAY = 'DAY',
    MONTH = 'MONTH',
    IRREGULAR = 'IRREGULAR'
}

export interface AccountInfo {
    /** Расчетный счет организации. */
    accountNumber: string
    /** Код валюты счета по ОКВ (цифрами). */
    currency: string
    /** Баланс счета. */
    balance: Balance
}

export interface CreateEmployeeResultResponse {
    /** Список результатов создания сотрудников. */
    employeeResults?: EmployeesResponse[]
}

/** Статус создания:<br /><ul><li>QUEUED — платежный реестр стоит в очереди на создание.</li><li>CREATED — платежный реестр создан.</li><li>ERROR — платежный реестр не был создан. Ошибки перечислены в параметре <b>errors</b>.</li></ul> */
export enum CreationRegistryStatus {
    CREATED = 'CREATED',
    ERROR = 'ERROR',
    QUEUED = 'QUEUED'
}

/** Статус создания платежного реестра. */
export enum OrderPayStatus {
    SEND_IN_PROGRESS = 'SEND_IN_PROGRESS',
    SENT = 'SENT',
    REJECTED = 'REJECTED',
    EXECUTED = 'EXECUTED',
    PART_EXEC = 'PART_EXEC',
    ERROR = 'ERROR'
}

export interface IncomeSourceResponse {
    /** Название группы */
    title: string
    /**
     * Детализация источников дохода в рамках группы
     * @maxItems 100
     */
    options?: OptionResponse[]
}

export interface EmployeeCreateData {
    /**
     * Идентификатор сотрудника на стороне клиента.
     * @format int32
     */
    number: number
    /** Имя (кириллица). */
    firstName: string
    /** Фамилия (кириллица). */
    lastName: string
    /** Отчество (кириллица). */
    middleName?: string
    /**
     * Дата рождения.
     * @format date
     */
    birthDate: string
    /** Место рождения. */
    birthPlace: string
    /** Гражданство. */
    citizenship: string
    /** Электронная почта. */
    email?: string
    /** Имя (латиница). */
    latinFirstName?: string
    /** Фамилия (латиница). */
    latinLastName?: string
    /** Телефон — обязательно укажите мобильный телефон. */
    phones?: CreatePhone[]
    /** Адреса — обязательно укажите адреса жительства, регистрации и работы. */
    addresses?: CreateAddress[]
    /**
     * Для граждан РФ укажите данные паспорта.
     *
     * Для иностранных граждан укажите:
     * <ul>
     *   <li>Один из основных документов — «Иностранный паспорт», «Загр. паспорт иностранного гр.», «Служебный/официальный паспорт», «Дипломатический паспорт».</li>
     *   <li>Один из миграционных документов — «Миграционная карта», «Разр. на временное проживание», «Вид на жительство".</li>
     * </ul>
     */
    documents?: CreateDocument[]
    /** Информация о работе. */
    jobInfo: CreateJobInfo
}

export interface SelfEmployedCreatePaymentRegistryResponse {
    /**
     * Идентификатор, связывающий запрос создания с запросом получения ответа.
     * @format uuid
     */
    correlationId: string
}

export interface Document {
    /** Тип документа. */
    type: DocumentType
    /** Серия. */
    serial?: string
    /** Номер документа. */
    number?: string
    /**
     * Дата.
     * @format date
     */
    date?: string
    /** Кем выдан. */
    organization?: string
    /** Код подразделения. */
    division?: string
    /**
     * Дата истечения.
     * @format date
     */
    expireDate?: string
}

export interface GetIntervalsRequest {
    /** Cписок идентификаторов заданий, по которым нужно получить доступные интервалы для назначения встреч. */
    taskIds?: string[]
    /** Адрес, по которому нужно получить доступные интервалы для назначения встречи. */
    address: Address2
}

export interface BeneficiaryUlResidentResponse {
    /**
     * Идентификатор бенефициара.
     * @format uuid
     */
    beneficiaryId: string
    /**
     * Тип бенефициара:
     * * `FL_RESIDENT` — физическое лицо, резидент.
     * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
     * * `UL_RESIDENT` — юридическое лицо, резидент.
     * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
     * * `IP_RESIDENT` — ИП, резидент.
     * * `IP_NONRESIDENT` — ИП, нерезидент.
     * * `LITE_CONTACT` — легкий контакт.
     */
    type: BeneficiaryUlResidentResponseTypeEnum
    /** Наименование организации. */
    name?: string
    /**
     * Номер телефона.
     * @pattern ^((\+[0-9])([0-9]){6,14})$
     */
    phoneNumber?: string
    /** Электронная почта. */
    email?: string
    /** Адреса. */
    addresses?: Address[]
    /**
     * Дата регистрации.
     * @format date
     */
    registrationDate?: string
    /** Организационно-правовая форма. */
    opf?: string
    /**
     * ИНН.
     * @pattern ^(\d{10})$
     */
    inn: string
    /**
     * Основной государственный регистрационный номер.
     * @pattern ^(\d{13})$
     */
    ogrn?: string
}

export enum PermissionTypeEnum {
    PAYMENT_INFORMATION = 'PAYMENT_INFORMATION',
    TAXPAYER_UPDATE = 'TAXPAYER_UPDATE',
    CANCEL_ANY_INCOME = 'CANCEL_ANY_INCOME',
    CANCEL_INCOME = 'CANCEL_INCOME',
    INCOME_SUMMARY = 'INCOME_SUMMARY',
    INCOME_REGISTRATION = 'INCOME_REGISTRATION',
    INCOME_LIST = 'INCOME_LIST',
    PERMISSIONS_MGMT = 'PERMISSIONS_MGMT',
    TAX_PAYMENT = 'TAX_PAYMENT'
}

export interface CardBankDetailsRequest {
    /**
     * Тип банковских реквизитов:
     * * `PAYMENT_DETAILS` — По реквизитам счета.
     * * `CARD` — На карту.
     * * `SBP` — Через СБП.
     */
    type: CardBankDetailsRequestTypeEnum
    /** Являются ли реквизиты основными для бенефициара. По умолчанию для первых добавленных реквизитов — `true`, для следующих — `false`. */
    isDefault?: boolean
    /**
     * Ключ терминала.
     * @minLength 1
     * @maxLength 256
     */
    terminalKey: string
    /**
     *
     * Зашифрованные данные карты.
     * Объект `CardData` собирается в виде списка «ключ=значение» (разделитель «;») и зашифровывается открытым ключом (X509 RSA 2048). Получившееся бинарное значение кодируется в Base64.
     * Список значений:
     *
     * * `PAN` — обязательный параметр, номер карты. Число.
     * * `ExpDate` — необязательный параметр, месяц и год срока действия карты в формате MMYY. Число.
     * * `CardHolder` — необязательный параметр, имя и фамилия держателя карты — как на карте. Строка.
     * * `CVV` — необязательный параметр, код защиты с обратной стороны карты. Строка.
     *
     * Пример: `PAN=4300000000000777;ExpDate=0523;CardHolder=IVAN PETROV;CVV=111`
     *
     * Открытый ключ генерируется банком. Чтобы получить открытый ключ для шифрования `CardData`, напишите на acq_help@tinkoff.ru или обратитесь к сотруднику, который помогал вам с процессом выпуска терминала.
     * @minLength 1
     * @maxLength 512
     */
    cardData: string
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryIpResidentRequestTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryLiteContactRequestTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/** Тип документа. */
export enum PassportTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/** Тип документа. */
export enum OfficialPassportTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/**
 * Тип банковских реквизитов:
 * * `PAYMENT_DETAILS` — По реквизитам счета.
 * * `CARD` — На карту.
 * * `SBP` — Через СБП.
 */
export enum RkcBankDetailsTypeEnum {
    PAYMENT_DETAILS = 'PAYMENT_DETAILS',
    CARD = 'CARD',
    SBP = 'SBP'
}

/** Тип документа. */
export enum PatentTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/** Тип документа. */
export enum TemporaryResidencePermitTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryIpResidentResponseTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/** Статус проверки в финансовом мониторинге. */
export enum InProgressStatusEnum {
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryFlNonresidentRequestTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/**
 * Тип банковских реквизитов:
 * * `PAYMENT_DETAILS` — По реквизитам счета.
 * * `CARD` — На карту.
 * * `SBP` — Через СБП.
 */
export enum CardBankDetailsTypeEnum {
    PAYMENT_DETAILS = 'PAYMENT_DETAILS',
    CARD = 'CARD',
    SBP = 'SBP'
}

/** Тип документа. */
export enum VisaTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/**
 * Тип счета
 * * `Current` — расчетный счет
 * * `Tax` — счет Т-Бухгалтерии
 * * `Tender` — специальный счет для участия в госзакупках
 * * `Overnight` — счет Overnight
 */
export enum AccountInfo1AccountTypeEnum {
    Current = 'Current',
    Tax = 'Tax',
    Tender = 'Tender',
    Overnight = 'Overnight'
}

/**
 * Тип банковских реквизитов:
 * * `PAYMENT_DETAILS` — По реквизитам счета.
 * * `CARD` — На карту.
 * * `SBP` — Через СБП.
 */
export enum CardBankDetailsResponseTypeEnum {
    PAYMENT_DETAILS = 'PAYMENT_DETAILS',
    CARD = 'CARD',
    SBP = 'SBP'
}

/** Причина аннулирования. */
export enum CancelReceiptRequestReasonEnum {
    MISTAKE = 'MISTAKE',
    REFUND = 'REFUND'
}

/** Статус проверки в финансовом мониторинге. */
export enum ReadyStatusEnum {
    IN_PROGRESS = 'IN_PROGRESS',
    READY = 'READY'
}

/**
 * Тип банковских реквизитов:
 * * `PAYMENT_DETAILS` — По реквизитам счета.
 * * `CARD` — На карту.
 * * `SBP` — Через СБП.
 */
export enum SbpBankDetailsResponseTypeEnum {
    PAYMENT_DETAILS = 'PAYMENT_DETAILS',
    CARD = 'CARD',
    SBP = 'SBP'
}

/**
 *
 * Тип адреса.
 * Для типов `FL_RESIDENT`, `FL_NONRESIDENT`, `IP_RESIDENT`, `IP_NONRESIDENT` обязателен один из адресов:
 *
 *  * `REGISTRATION_ADDRESS` — адрес регистрации по месту жительства;
 *  * `RESIDENCE_ADDRESS` — адрес регистрации по месту пребывания.
 *
 * Для типов `UL_RESIDENT`, `UL_NONRESIDENT` обязательно передавать `LEGAL_ENTITY_ADDRESS` — адрес юридического лица.
 */
export enum AddressTypeEnum {
    POSTAL_ADDRESS = 'POSTAL_ADDRESS',
    REGISTRATION_ADDRESS = 'REGISTRATION_ADDRESS',
    RESIDENCE_ADDRESS = 'RESIDENCE_ADDRESS',
    LEGAL_ENTITY_ADDRESS = 'LEGAL_ENTITY_ADDRESS',
    OFFICE_OF_FOREIGN_LEGAL_ENTITY_ADDRESS = 'OFFICE_OF_FOREIGN_LEGAL_ENTITY_ADDRESS'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryFlResidentRequestTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/** Тип документа. */
export enum ContractTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryUlNonresidentRequestTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/**
 * Статус запроса на добавление карты:
 * * `PENDING` — карта в процессе добавления.
 * * `READY` — карта успешно добавлена.
 * * `FAILED` — не удалось добавить карту.
 */
export enum ReadyAddCardRequestResponseStatusEnum {
    PENDING = 'PENDING',
    READY = 'READY',
    FAILED = 'FAILED'
}

/** Тип документа. */
export enum DiplomaticPassportTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/**
 * Тип банковских реквизитов:
 * * `PAYMENT_DETAILS` — По реквизитам счета.
 * * `CARD` — На карту.
 * * `SBP` — Через СБП.
 */
export enum SbpBankDetailsTypeEnum {
    PAYMENT_DETAILS = 'PAYMENT_DETAILS',
    CARD = 'CARD',
    SBP = 'SBP'
}

/** Статус проверки в финансовом мониторинге. */
export enum SucceededStatusEnum {
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
}

/**
 * Тип банковских реквизитов:
 * * `PAYMENT_DETAILS` — По реквизитам счета.
 * * `CARD` — На карту.
 * * `SBP` — Через СБП.
 */
export enum RkcBankDetailsRequestTypeEnum {
    PAYMENT_DETAILS = 'PAYMENT_DETAILS',
    CARD = 'CARD',
    SBP = 'SBP'
}

/** Тип документа. */
export enum ResidencePermitTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryLiteContactResponseTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/** От кого самозанятый получил доход. */
export enum FromIndividualReceiptResponseIncomeTypeEnum {
    FROM_INDIVIDUAL = 'FROM_INDIVIDUAL',
    FROM_LEGAL_ENTITY = 'FROM_LEGAL_ENTITY',
    FROM_FOREIGN_AGENCY = 'FROM_FOREIGN_AGENCY'
}

/** Код вида выплаты. Обязательное поле для платежей в пользу физ. лиц. <a href="https://www.audit-it.ru/news/account/1013406.html">Подробнее</a>. */
export enum CreatePaymentDraftRequestRevenueTypeCodeEnum {
    Value1 = '1',
    Value2 = '2',
    Value3 = '3',
    Value4 = '4',
    Value5 = '5'
}

/** От кого самозанятый получил доход. */
export enum FromLegalEntityReceiptResponseIncomeTypeEnum {
    FROM_INDIVIDUAL = 'FROM_INDIVIDUAL',
    FROM_LEGAL_ENTITY = 'FROM_LEGAL_ENTITY',
    FROM_FOREIGN_AGENCY = 'FROM_FOREIGN_AGENCY'
}

/**
 * Тип банковских реквизитов:
 * * `PAYMENT_DETAILS` — По реквизитам счета.
 * * `CARD` — На карту.
 * * `SBP` — Через СБП.
 */
export enum SbpBankDetailsRequestTypeEnum {
    PAYMENT_DETAILS = 'PAYMENT_DETAILS',
    CARD = 'CARD',
    SBP = 'SBP'
}

/**
 * От кого самозанятый получил доход:
 * * `FROM_INDIVIDUAL` — от физического лица;
 * * `FROM_LEGAL_ENTITY` — от компании;
 * * `FROM_FOREIGN_AGENCY` — от иностранной компании.
 */
export enum CreateForeignAgencyReceiptRequestIncomeTypeEnum {
    FROM_INDIVIDUAL = 'FROM_INDIVIDUAL',
    FROM_LEGAL_ENTITY = 'FROM_LEGAL_ENTITY',
    FROM_FOREIGN_AGENCY = 'FROM_FOREIGN_AGENCY'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryIpNonresidentResponseTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/** Код вида дохода. */
export enum SelfEmployedPaymentInfoRevenueTypeCodeEnum {
    Value1 = '1',
    Value2 = '2',
    Value3 = '3',
    Value4 = '4',
    Value5 = '5'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryIpNonresidentRequestTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/**
 * Статус запроса на добавление карты:
 * * `PENDING` — карта в процессе добавления.
 * * `READY` — карта успешно добавлена.
 * * `FAILED` — не удалось добавить карту.
 */
export enum PendingAddCardRequestResponseStatusEnum {
    PENDING = 'PENDING',
    READY = 'READY',
    FAILED = 'FAILED'
}

/** Статус заявки на перевыпуск виртуальной карты. status = READY - карта успешно перевыпущена, вы можете ей пользоваться */
export enum ReissueVirtualCardResultResponseStatusEnum {
    READY = 'READY',
    IN_PROGRESS = 'IN_PROGRESS',
    ERROR = 'ERROR'
}

/** Статус заявки на перевыпуск виртуальной карты. status = ERROR - произошла ошибка при обработке заявки, попробуйте отправить новую */
export enum ReissueVirtualCardResultResponseStatusEnum1 {
    READY = 'READY',
    IN_PROGRESS = 'IN_PROGRESS',
    ERROR = 'ERROR'
}

/** Статус заявки на перевыпуск виртуальной карты. status = IN_PROGRESS - заявка в работе, проверьте результат через некоторое время (обычно заявка исполняется в течение 5 минут) */
export enum ReissueVirtualCardResultResponseStatusEnum2 {
    READY = 'READY',
    IN_PROGRESS = 'IN_PROGRESS',
    ERROR = 'ERROR'
}

/** Тип документа. */
export enum ForeignPassportTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/** От кого самозанятый получил доход. */
export enum FromForeignAgencyReceiptResponseIncomeTypeEnum {
    FROM_INDIVIDUAL = 'FROM_INDIVIDUAL',
    FROM_LEGAL_ENTITY = 'FROM_LEGAL_ENTITY',
    FROM_FOREIGN_AGENCY = 'FROM_FOREIGN_AGENCY'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryFlResidentResponseTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/** Статус проверки в финансовом мониторинге. */
export enum InProgressStatusEnum1 {
    IN_PROGRESS = 'IN_PROGRESS',
    READY = 'READY'
}

/**
 * Статус запроса на добавление карты:
 * * `PENDING` — карта в процессе добавления.
 * * `READY` — карта успешно добавлена.
 * * `FAILED` — не удалось добавить карту.
 */
export enum FailedAddCardRequestResponseStatusEnum {
    PENDING = 'PENDING',
    READY = 'READY',
    FAILED = 'FAILED'
}

/**
 * Тип платежа:
 * * `REGULAR` — обычный.
 * * `TAX` — налоговый.
 */
export enum TaxPaymentResponseTypeEnum {
    REGULAR = 'REGULAR',
    TAX = 'TAX'
}

/**
 * Статус платежа![payment-statuses](https://business.t-static.ru/static/images/opensme/nominal-accounts/payment-statuses.svg)
 * * `PENDING` — Ожидает обработки.
 * * `IN_PROGRESS` — В процессе.
 * * `FAILED` — Неуспешен.
 * * `CANCELLED` — Отменен.
 * * `SUCCEEDED` — Успешно завершен.
 */
export enum TaxPaymentResponseStatusEnum {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    SUCCEEDED = 'SUCCEEDED'
}

/**
 * Тип банковских реквизитов:
 * * `PAYMENT_DETAILS` — По реквизитам счета.
 * * `CARD` — На карту.
 * * `SBP` — Через СБП.
 */
export enum RkcBankDetailsResponseTypeEnum {
    PAYMENT_DETAILS = 'PAYMENT_DETAILS',
    CARD = 'CARD',
    SBP = 'SBP'
}

/** Код вида выплаты. <a href="https://www.buhsoft.ru/article/4085-novye-kody-v-platejkah-s-1-maya-2022-goda">Подробнее</a>. */
export enum CreatePaymentRequestRevenueTypeCodeEnum {
    Value1 = '1',
    Value2 = '2',
    Value3 = '3',
    Value4 = '4',
    Value5 = '5'
}

/** Код вида дохода. */
export enum CreatePaymentInfoRevenueTypeCodeEnum {
    Value1 = '1',
    Value2 = '2',
    Value3 = '3',
    Value4 = '4',
    Value5 = '5'
}

/**
 * От кого самозанятый получил доход:
 * * `FROM_INDIVIDUAL` — от физического лица;
 * * `FROM_LEGAL_ENTITY` — от компании;
 * * `FROM_FOREIGN_AGENCY` — от иностранной компании.
 */
export enum CreateLegalEntityReceiptRequestIncomeTypeEnum {
    FROM_INDIVIDUAL = 'FROM_INDIVIDUAL',
    FROM_LEGAL_ENTITY = 'FROM_LEGAL_ENTITY',
    FROM_FOREIGN_AGENCY = 'FROM_FOREIGN_AGENCY'
}

/**
 * Тип платежа:
 * * `REGULAR` — обычный.
 * * `TAX` — налоговый.
 */
export enum CreateRegularPaymentRequestTypeEnum {
    REGULAR = 'REGULAR',
    TAX = 'TAX'
}

/** Тип документа. */
export enum MigrationCardTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryUlResidentRequestTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/** Код вида дохода. */
export enum SelfEmployedCreatePaymentInfoRevenueTypeCodeEnum {
    Value1 = '1',
    Value2 = '2',
    Value3 = '3',
    Value4 = '4',
    Value5 = '5'
}

/**
 * От кого самозанятый получил доход:
 * * `FROM_INDIVIDUAL` — от физического лица;
 * * `FROM_LEGAL_ENTITY` — от компании;
 * * `FROM_FOREIGN_AGENCY` — от иностранной компании.
 */
export enum CreateIndividualReceiptRequestIncomeTypeEnum {
    FROM_INDIVIDUAL = 'FROM_INDIVIDUAL',
    FROM_LEGAL_ENTITY = 'FROM_LEGAL_ENTITY',
    FROM_FOREIGN_AGENCY = 'FROM_FOREIGN_AGENCY'
}

/**
 * Тип платежа:
 * * `REGULAR` — обычный.
 * * `TAX` — налоговый.
 */
export enum CreateTaxPaymentRequestTypeEnum {
    REGULAR = 'REGULAR',
    TAX = 'TAX'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryFlNonresidentResponseTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/**
 * Причина блокировки:
 * * `LOST` — карта утеряна;
 * * `STOLEN` — карта украдена;
 * * `BROKEN` — карта повреждена;
 * * `FRAUD` — мошенничество;
 * * `CLIENTINITIATED` — другая причина.
 */
export enum BlockCardRequestReasonEnum {
    LOST = 'LOST',
    STOLEN = 'STOLEN',
    BROKEN = 'BROKEN',
    FRAUD = 'FRAUD',
    CLIENTINITIATED = 'CLIENTINITIATED'
}

/**
 * Статус сделки.![payment-statuses](https://business.t-static.ru/static/images/opensme/nominal-accounts/deal-statuses.svg)
 * * `DRAFT` — сделка создана и доступна для редактирования.
 * * `ACCEPTED` — параметры сделки подтверждены, средства зарезервированы.
 * * `IN_PROGRESS` — сделка в процессе.
 * * `CANCELLED` — сделка отменена.
 * * `COMPLETED` — сделка успешно завершена.
 */
export enum DealResponseStatusEnum {
    DRAFT = 'DRAFT',
    ACCEPTED = 'ACCEPTED',
    IN_PROGRESS = 'IN_PROGRESS',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryUlNonresidentResponseTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/** Тип документа. */
export enum ContractGpdTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/** Статус проверки в финансовом мониторинге. */
export enum FailedStatusEnum {
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
}

/**
 *
 * Период обновления доступного остатка расходного лимита:
 * <ul>
 * <li>`DAY" — доступный остаток станет равным лимиту в начале следующих суток;</li>
 * <li>`MONTH` — доступный остаток станет равным лимиту в начале следующего месяца;</li>
 * <li>`IRREGULAR` — доступный остаток станет равным лимиту только при обновлении лимита;</li>
 * <li>`CUSTOM` — период обновления лимита установлен в дополнительное состояние вручную — его можно узнать у вашего персонального менеджера.</li>
 * </ul>
 */
export enum SpendLimitLimitPeriodEnum {
    DAY = 'DAY',
    MONTH = 'MONTH',
    IRREGULAR = 'IRREGULAR',
    CUSTOM = 'CUSTOM'
}

/**
 * Тип платежа:
 * * `REGULAR` — обычный.
 * * `TAX` — налоговый.
 */
export enum RegularPaymentResponseTypeEnum {
    REGULAR = 'REGULAR',
    TAX = 'TAX'
}

/**
 * Статус платежа![payment-statuses](https://business.t-static.ru/static/images/opensme/nominal-accounts/payment-statuses.svg)
 * * `PENDING` — Ожидает обработки.
 * * `IN_PROGRESS` — В процессе.
 * * `FAILED` — Неуспешен.
 * * `CANCELLED` — Отменен.
 * * `SUCCEEDED` — Успешно завершен.
 */
export enum RegularPaymentResponseStatusEnum {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    SUCCEEDED = 'SUCCEEDED'
}

/**
 * Статус этапа сделки.![payment-statuses](https://business.t-static.ru/static/images/opensme/nominal-accounts/step-statuses.svg)
 * * `NEW` — создан.
 * * `PAYMENT_IN_PROGRESS` — одна или несколько выплат этапа сделки в процессе.
 * * `PAYMENT_FAILED` — одна или несколько выплат этапа сделки неуспешны.
 * * `CANCELLED` — отменен.
 * * `COMPLETED` — успешно завершен.
 */
export enum StepResponseStatusEnum {
    NEW = 'NEW',
    PAYMENT_IN_PROGRESS = 'PAYMENT_IN_PROGRESS',
    PAYMENT_FAILED = 'PAYMENT_FAILED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

/** Тип документа. */
export enum ForeignPassportOfForeignCitizensTypeEnum {
    PASSPORT = 'PASSPORT',
    FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
    FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
    OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
    DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
    MIGRATION_CARD = 'MIGRATION_CARD',
    TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
    VISA = 'VISA',
    RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
    CONTRACT = 'CONTRACT',
    CONTRACT_GPD = 'CONTRACT_GPD',
    PATENT = 'PATENT'
}

/**
 * Тип бенефициара:
 * * `FL_RESIDENT` — физическое лицо, резидент.
 * * `FL_NONRESIDENT` — физическое лицо, нерезидент.
 * * `UL_RESIDENT` — юридическое лицо, резидент.
 * * `UL_NONRESIDENT` — юридическое лицо, нерезидент.
 * * `IP_RESIDENT` — ИП, резидент.
 * * `IP_NONRESIDENT` — ИП, нерезидент.
 * * `LITE_CONTACT` — легкий контакт.
 */
export enum BeneficiaryUlResidentResponseTypeEnum {
    FL_RESIDENT = 'FL_RESIDENT',
    FL_NONRESIDENT = 'FL_NONRESIDENT',
    UL_RESIDENT = 'UL_RESIDENT',
    UL_NONRESIDENT = 'UL_NONRESIDENT',
    IP_RESIDENT = 'IP_RESIDENT',
    IP_NONRESIDENT = 'IP_NONRESIDENT',
    LITE_CONTACT = 'LITE_CONTACT'
}

/**
 * Тип банковских реквизитов:
 * * `PAYMENT_DETAILS` — По реквизитам счета.
 * * `CARD` — На карту.
 * * `SBP` — Через СБП.
 */
export enum CardBankDetailsRequestTypeEnum {
    PAYMENT_DETAILS = 'PAYMENT_DETAILS',
    CARD = 'CARD',
    SBP = 'SBP'
}
