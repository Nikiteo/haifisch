"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taxes = exports.purchase = exports.paymentinState = exports.paymentoutState = exports.carrier = exports.consignee = exports.sberProject = exports.fbyHfProject = exports.fbsHfProject = exports.fbyTopProject = exports.fbosOzonProject = exports.fboOzonProject = exports.fbsTopProject = exports.sberAgent = exports.ozonAgent = exports.agent = exports.sberSalesChannel = exports.salesChannels = exports.states = exports.productFolder = exports.fbsOzonRefund = exports.fboOzonRefund = exports.fbyTopRefund = exports.fbsTopRefund = exports.fbyHfRefund = exports.fbsHfRefund = exports.sberStore = exports.sourceStore = exports.fbyTopStore = exports.fbyHfStore = exports.fbsTopStore = exports.fbsHfStore = exports.fbsOzonStore = exports.fbsStore = exports.fboOzonStore = exports.anyaOwner = exports.mishaOwner = exports.owner = exports.group = exports.uom = exports.priceTypeOzon = exports.priceTypeTop = exports.priceTypeHF = exports.currency = exports.country = exports.organization = exports.ozonSupplier = exports.ozonSalesChannel = exports.topSupplier = exports.hfSupplier = void 0;
exports.returnPicked = exports.refund = exports.services = exports.entertainment = exports.salary = exports.rent = exports.moving = void 0;
exports.hfSupplier = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/organization/4f9c637b-f557-11ed-0a80-11cd001da709',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/organization/metadata',
        type: 'organization',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#mycompany/edit?id=4f9c637b-f557-11ed-0a80-11cd001da709',
    },
};
exports.topSupplier = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/organization/846d12a8-97e8-11ee-0a80-0246002f6590',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/organization/metadata',
        type: 'organization',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#mycompany/edit?id=846d12a8-97e8-11ee-0a80-0246002f6590',
    },
};
exports.ozonSalesChannel = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/saleschannel/20ece5dc-9d64-11ee-0a80-10c700174782',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/saleschannel/metadata',
        type: 'saleschannel',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#saleschannel/edit?id=20ece5dc-9d64-11ee-0a80-10c700174782',
    },
};
exports.ozonSupplier = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/organization/d77580ae-9991-11ee-0a80-148f0009369c',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/organization/metadata',
        type: 'organization',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#mycompany/edit?id=d77580ae-9991-11ee-0a80-148f0009369c',
    },
};
exports.organization = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/organization/70d5fbcd-b36c-11ee-0a80-02a00031689f',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/organization/metadata',
        type: 'organization',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#mycompany/edit?id=70d5fbcd-b36c-11ee-0a80-02a00031689f',
    },
};
exports.country = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/country/9df7c2c3-7782-4c5c-a8ed-1102af611608',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/country/metadata',
        type: 'country',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#country/edit?id=9df7c2c3-7782-4c5c-a8ed-1102af611608',
    },
};
exports.currency = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/currency/4f9de8e0-f557-11ed-0a80-11cd001da710',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/currency/metadata',
        type: 'currency',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#currency/edit?id=4f9de8e0-f557-11ed-0a80-11cd001da710',
    },
};
exports.priceTypeHF = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/4f9e295d-f557-11ed-0a80-11cd001da711',
        type: 'pricetype',
        mediaType: 'application/json',
    },
    id: '4f9e295d-f557-11ed-0a80-11cd001da711',
    name: 'Базовая цена Haifisch',
    externalCode: 'cbcf493b-55bc-11d9-848a-00112f43529a',
};
exports.priceTypeTop = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/7c24e5c8-9423-11ee-0a80-1464000e6213',
        type: 'pricetype',
        mediaType: 'application/json',
    },
    id: '7c24e5c8-9423-11ee-0a80-1464000e6213',
    name: 'Базовая цена Тор',
    externalCode: 'f9c3884f-44e3-4d8b-9881-e56188ae0b2e',
};
exports.priceTypeOzon = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/5f713df2-9981-11ee-0a80-0b5a00058c80',
        type: 'pricetype',
        mediaType: 'application/json',
    },
    id: '5f713df2-9981-11ee-0a80-0b5a00058c80',
    name: 'Базовая цена Ozon',
    externalCode: '5f4909a7-2738-4a02-bde1-abd3f23d5f99',
};
exports.uom = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/uom/19f1edc0-fc42-4001-94cb-c9ec9c62ec10',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/uom/metadata',
        type: 'uom',
        mediaType: 'application/json',
    },
};
exports.group = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/group/4f4694ca-f557-11ed-0a80-0cd400013e79',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/group/metadata',
        type: 'group',
        mediaType: 'application/json',
    },
};
exports.owner = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/employee/4f894604-f557-11ed-0a80-11cd001da6bd',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/employee/metadata',
        type: 'employee',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#employee/edit?id=4f894604-f557-11ed-0a80-11cd001da6bd',
    },
};
exports.mishaOwner = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/employee/5905057e-f558-11ed-0a80-1411001d633f',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/employee/metadata',
        type: 'employee',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#employee/edit?id=5905057e-f558-11ed-0a80-1411001d633f',
    },
};
exports.anyaOwner = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/employee/81d8f5fb-f558-11ed-0a80-1411001d6a6c',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/employee/metadata',
        type: 'employee',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#employee/edit?id=81d8f5fb-f558-11ed-0a80-1411001d6a6c',
    },
};
exports.fboOzonStore = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/702fc37a-9037-11ee-0a80-0d6b00124713',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=702fc37a-9037-11ee-0a80-0d6b00124713',
    },
};
exports.fbsStore = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/2078b4fa-4f42-11ef-0a80-0f9f0016aea6',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=2078b4fa-4f42-11ef-0a80-0f9f0016aea6',
    },
};
exports.fbsOzonStore = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/73134230-9037-11ee-0a80-156300126436',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=73134230-9037-11ee-0a80-156300126436',
    },
};
exports.fbsHfStore = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/672b05f0-9037-11ee-0a80-112800118806',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=672b05f0-9037-11ee-0a80-112800118806',
    },
};
exports.fbsTopStore = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/6ca2cea4-9037-11ee-0a80-04c80012aa64',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=6ca2cea4-9037-11ee-0a80-04c80012aa64',
    },
};
exports.fbyHfStore = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/638399f8-9037-11ee-0a80-0b7200117b2d',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=638399f8-9037-11ee-0a80-0b7200117b2d',
    },
};
exports.fbyTopStore = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/6a22d928-9037-11ee-0a80-016c00134c2d',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=6a22d928-9037-11ee-0a80-016c00134c2d',
    },
};
exports.sourceStore = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/a8306907-9450-11ee-0a80-109f00177296',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=a8306907-9450-11ee-0a80-109f00177296',
    },
};
exports.sberStore = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/bdbba638-d153-11ee-0a80-156c00051ec2',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=bdbba638-d153-11ee-0a80-156c00051ec2',
    },
};
exports.fbsHfRefund = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/12a929db-980c-11ee-0a80-04d80038a3a3',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=12a929db-980c-11ee-0a80-04d80038a3a3',
    },
};
exports.fbyHfRefund = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/f4a67774-9814-11ee-0a80-0397003ae2ec',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=f4a67774-9814-11ee-0a80-0397003ae2ec',
    },
};
exports.fbsTopRefund = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/fa92e400-9814-11ee-0a80-0397003ae3fe',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=fa92e400-9814-11ee-0a80-0397003ae3fe',
    },
};
exports.fbyTopRefund = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/0076ac29-9815-11ee-0a80-04d8003ae3b3',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=0076ac29-9815-11ee-0a80-04d8003ae3b3',
    },
};
exports.fboOzonRefund = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/4992766c-9f08-11ee-0a80-026e0006caf9',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=4992766c-9f08-11ee-0a80-026e0006caf9',
    },
};
exports.fbsOzonRefund = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/4ee0823d-9f08-11ee-0a80-026e0006cc11',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#warehouse/edit?id=4ee0823d-9f08-11ee-0a80-026e0006cc11',
    },
};
exports.productFolder = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/productfolder/0fbdc67d-94c3-11ee-0a80-109f001c42ce',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/productfolder/metadata',
        type: 'productfolder',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#good/edit?id=0fbdc67d-94c3-11ee-0a80-109f001c42ce',
    },
};
exports.states = {
    NEW: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/5017961e-f557-11ed-0a80-11cd001da788',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '5017961e-f557-11ed-0a80-11cd001da788',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Новый',
        color: 12430848,
        stateType: 'Regular',
        entityType: 'customerorder',
    },
    PROCESSING: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/5017972b-f557-11ed-0a80-11cd001da789',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '5017972b-f557-11ed-0a80-11cd001da789',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'На сборке',
        color: 40931,
        stateType: 'Regular',
        entityType: 'customerorder',
    },
    PICKUP: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/501798d3-f557-11ed-0a80-11cd001da78b',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '501798d3-f557-11ed-0a80-11cd001da78b',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Передан доставке',
        color: 8825440,
        stateType: 'Regular',
        entityType: 'customerorder',
    },
    READY_TO_SHIP: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/5017978a-f557-11ed-0a80-11cd001da78a',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '5017978a-f557-11ed-0a80-11cd001da78a',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Собран',
        color: 15106326,
        stateType: 'Regular',
        entityType: 'customerorder',
    },
    DELIVERY: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/5017991e-f557-11ed-0a80-11cd001da78c',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '5017991e-f557-11ed-0a80-11cd001da78c',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Доставляется',
        color: 8825440,
        stateType: 'Regular',
        entityType: 'customerorder',
    },
    DELIVERED: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/50179979-f557-11ed-0a80-11cd001da78d',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '50179979-f557-11ed-0a80-11cd001da78d',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Доставлен',
        color: 34617,
        stateType: 'Successful',
        entityType: 'customerorder',
    },
    CANCELLED: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/50179a31-f557-11ed-0a80-11cd001da78e',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '50179a31-f557-11ed-0a80-11cd001da78e',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Отменен в процессе обработки',
        color: 15280409,
        stateType: 'Unsuccessful',
        entityType: 'customerorder',
    },
    CANCELLED_IN_DELIVERY: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/ddb344c2-9690-11ee-0a80-09df001ec863',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: 'ddb344c2-9690-11ee-0a80-09df001ec863',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Отменен в процессе доставки',
        color: 15280409,
        stateType: 'Unsuccessful',
        entityType: 'customerorder',
    },
    RETURNED: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/5eb7909c-9354-11ee-0a80-1091000d155b',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '5eb7909c-9354-11ee-0a80-1091000d155b',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Возврат',
        color: 9245744,
        stateType: 'Unsuccessful',
        entityType: 'customerorder',
    },
    PARTIALLY_RETURNED: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/5eb799af-9354-11ee-0a80-1091000d155d',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '5eb799af-9354-11ee-0a80-1091000d155d',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Частичный возврат',
        color: 9245744,
        stateType: 'Unsuccessful',
        entityType: 'customerorder',
    },
    UNKNOWN: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/a5b7e021-94f8-11ee-0a80-111f00295438',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: 'a5b7e021-94f8-11ee-0a80-111f00295438',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Неизвестный статус',
        color: 15491487,
        stateType: 'Regular',
        entityType: 'customerorder',
    },
    LOST: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/states/a6bba379-9590-11ee-0a80-024600053a2f',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: 'a6bba379-9590-11ee-0a80-024600053a2f',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Утерян',
        color: 15280409,
        stateType: 'Unsuccessful',
        entityType: 'customerorder',
    },
};
exports.salesChannels = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/saleschannel/28429701-94f9-11ee-0a80-13920029b8cd',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/saleschannel/metadata',
        type: 'saleschannel',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#saleschannel/edit?id=28429701-94f9-11ee-0a80-13920029b8cd',
    },
};
exports.sberSalesChannel = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/saleschannel/c86fa6c4-d153-11ee-0a80-06b8000577b2',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/saleschannel/metadata',
        type: 'saleschannel',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#saleschannel/edit?id=c86fa6c4-d153-11ee-0a80-06b8000577b2',
    },
};
exports.agent = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/2d059b74-92a6-11ee-0a80-145a0044e87e',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/metadata',
        type: 'counterparty',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#company/edit?id=2d059b74-92a6-11ee-0a80-145a0044e87e',
    },
};
exports.ozonAgent = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/50f00f03-9830-11ee-0a80-11fb0042a37d',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/metadata',
        type: 'counterparty',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#company/edit?id=50f00f03-9830-11ee-0a80-11fb0042a37d',
    },
};
exports.sberAgent = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/5b13b2d1-d154-11ee-0a80-02ac0005189e',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/metadata',
        type: 'counterparty',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#company/edit?id=5b13b2d1-d154-11ee-0a80-02ac0005189e',
    },
};
exports.fbsTopProject = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/project/fa266c8d-f558-11ed-0a80-0d7c001cc14a',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/project/metadata',
        type: 'project',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#project/edit?id=fa266c8d-f558-11ed-0a80-0d7c001cc14a',
    },
};
exports.fboOzonProject = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/project/000926c7-f559-11ed-0a80-071f001dbb13',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/project/metadata',
        type: 'project',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#project/edit?id=000926c7-f559-11ed-0a80-071f001dbb13',
    },
};
exports.fbosOzonProject = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/project/04a65fe0-f559-11ed-0a80-1411001da68b',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/project/metadata',
        type: 'project',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#project/edit?id=04a65fe0-f559-11ed-0a80-1411001da68b',
    },
};
exports.fbyTopProject = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/project/f6c5a0f7-f558-11ed-0a80-01bd001d779e',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/project/metadata',
        type: 'project',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#project/edit?id=f6c5a0f7-f558-11ed-0a80-01bd001d779e',
    },
};
exports.fbsHfProject = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/project/ef221472-f558-11ed-0a80-01bd001d764e',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/project/metadata',
        type: 'project',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#project/edit?id=ef221472-f558-11ed-0a80-01bd001d764e',
    },
};
exports.fbyHfProject = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/project/e76ac9c9-f558-11ed-0a80-0267001dbec5',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/project/metadata',
        type: 'project',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#project/edit?id=e76ac9c9-f558-11ed-0a80-0267001dbec5',
    },
};
exports.sberProject = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/project/d0c21ffb-d153-11ee-0a80-156c0005272d',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/project/metadata',
        type: 'project',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#project/edit?id=d0c21ffb-d153-11ee-0a80-156c0005272d',
    },
};
exports.consignee = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/500dc004-f557-11ed-0a80-11cd001da732',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/metadata',
        type: 'counterparty',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#company/edit?id=500dc004-f557-11ed-0a80-11cd001da732',
    },
};
exports.carrier = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/2d059b74-92a6-11ee-0a80-145a0044e87e',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/metadata',
        type: 'counterparty',
        mediaType: 'application/json',
        uuidHref: 'https://online.moysklad.ru/app/#company/edit?id=2d059b74-92a6-11ee-0a80-145a0044e87e',
    },
};
exports.paymentoutState = {
    BUYER: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentout/metadata/states/1f6df7df-982b-11ee-0a80-1398003f69fb',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentout/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '1f6df7df-982b-11ee-0a80-1398003f69fb',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Деньги покупателя',
        color: 34617,
        stateType: 'Regular',
        entityType: 'paymentout',
    },
    CASHBACK: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentout/metadata/states/1f6df938-982b-11ee-0a80-1398003f69fc',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentout/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '1f6df938-982b-11ee-0a80-1398003f69fc',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Баллы кэшбэк',
        color: 10066329,
        stateType: 'Regular',
        entityType: 'paymentout',
    },
    MARKETPLACE: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentout/metadata/states/1f6df99e-982b-11ee-0a80-1398003f69fd',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentout/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '1f6df99e-982b-11ee-0a80-1398003f69fd',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Купоны',
        color: 10066329,
        stateType: 'Regular',
        entityType: 'paymentout',
    },
    SPASIBO: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentout/metadata/states/1f6df9f0-982b-11ee-0a80-1398003f69fe',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentout/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '1f6df9f0-982b-11ee-0a80-1398003f69fe',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Бонусы СберСпасибо',
        color: 10066329,
        stateType: 'Regular',
        entityType: 'paymentout',
    },
};
exports.paymentinState = {
    BUYER: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentin/metadata/states/94bffe8f-9747-11ee-0a80-107d00286a08',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentin/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '94bffe8f-9747-11ee-0a80-107d00286a08',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Деньги покупателя',
        color: 34617,
        stateType: 'Regular',
        entityType: 'paymentin',
    },
    CASHBACK: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentin/metadata/states/94bfff78-9747-11ee-0a80-107d00286a09',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentin/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '94bfff78-9747-11ee-0a80-107d00286a09',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Баллы кэшбэк',
        color: 10066329,
        stateType: 'Regular',
        entityType: 'paymentin',
    },
    MARKETPLACE: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentin/metadata/states/94bfffd3-9747-11ee-0a80-107d00286a0a',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentin/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '94bfffd3-9747-11ee-0a80-107d00286a0a',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Купоны',
        color: 10066329,
        stateType: 'Regular',
        entityType: 'paymentin',
    },
    SPASIBO: {
        meta: {
            href: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentin/metadata/states/94c00028-9747-11ee-0a80-107d00286a0b',
            metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/paymentin/metadata',
            type: 'state',
            mediaType: 'application/json',
        },
        id: '94c00028-9747-11ee-0a80-107d00286a0b',
        accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
        name: 'Бонусы СберСпасибо',
        color: 10066329,
        stateType: 'Regular',
        entityType: 'paymentin',
    },
};
exports.purchase = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/8dbf9374-0a01-11e4-b9bf-002590a32f46',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/metadata',
        type: 'expenseitem',
        mediaType: 'application/json',
    },
};
exports.taxes = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/8dbf9a86-0a01-11e4-a190-002590a32f46',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/metadata',
        type: 'expenseitem',
        mediaType: 'application/json',
    },
};
exports.moving = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/4e1c05f2-0673-11e6-a655-0cc47a342ca4',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/metadata',
        type: 'expenseitem',
        mediaType: 'application/json',
    },
};
exports.rent = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/50098823-f557-11ed-0a80-11cd001da725',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/metadata',
        type: 'expenseitem',
        mediaType: 'application/json',
    },
};
exports.salary = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/500a2395-f557-11ed-0a80-11cd001da726',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/metadata',
        type: 'expenseitem',
        mediaType: 'application/json',
    },
};
exports.entertainment = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/500a70cd-f557-11ed-0a80-11cd001da727',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/metadata',
        type: 'expenseitem',
        mediaType: 'application/json',
    },
};
exports.services = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/780256d2-afc6-11ee-0a80-01b80015a3f4',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/metadata',
        type: 'expenseitem',
        mediaType: 'application/json',
    },
};
exports.refund = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/8dbf99a0-0a01-11e4-a743-002590a32f46',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/metadata',
        type: 'expenseitem',
        mediaType: 'application/json',
    },
};
exports.returnPicked = {
    meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/move/metadata/states/539a9278-a582-11ee-0a80-0b8100123600',
        metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/move/metadata',
        type: 'state',
        mediaType: 'application/json',
    },
    id: '539a9278-a582-11ee-0a80-0b8100123600',
    accountId: '4f45c052-f557-11ed-0a80-0cd400013e78',
    name: 'Возврат ФБС (получен)',
    color: 8825440,
    stateType: 'Regular',
    entityType: 'move',
};
