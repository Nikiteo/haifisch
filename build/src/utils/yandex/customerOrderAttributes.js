"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareCustomerOrdersAttributes = void 0;
var createBidFee = function (bidFees) {
    return bidFees !== undefined
        ? bidFees.reduce(function (acc, cur) {
            return parseFloat((parseFloat((acc + cur).toFixed(2)) / 100).toFixed(2));
        }, 0
        // eslint-disable-next-line no-mixed-spaces-and-tabs
        )
        : 0;
};
var prepareCustomerOrdersAttributes = function (products, order) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    return order.commissions !== undefined && order.commissions.length > 0
        ? [
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/ee32b906-95a7-11ee-0a80-107d000a1171',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: 'ee32b906-95a7-11ee-0a80-107d000a1171',
                name: 'Размещение товаров на витрине',
                type: 'double',
                value: (_b = (_a = order.commissions.find(function (commissions) { return commissions.type === 'FEE'; })) === null || _a === void 0 ? void 0 : _a.actual) !== null && _b !== void 0 ? _b : 0,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/ee32bc6d-95a7-11ee-0a80-107d000a1173',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: 'ee32bc6d-95a7-11ee-0a80-107d000a1173',
                name: 'Приём платежа покупателя',
                type: 'double',
                value: (_d = (_c = order.commissions.find(function (commissions) { return commissions.type === 'AGENCY'; })) === null || _c === void 0 ? void 0 : _c.actual) !== null && _d !== void 0 ? _d : 0,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/f719cd6f-95ad-11ee-0a80-0179000b864b',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: 'f719cd6f-95ad-11ee-0a80-0179000b864b',
                name: 'Перевод платежа покупателя',
                type: 'double',
                value: (_f = (_e = order.commissions.find(function (commissions) {
                    return commissions.type === 'PAYMENT_TRANSFER';
                })) === null || _e === void 0 ? void 0 : _e.actual) !== null && _f !== void 0 ? _f : 0,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/ee32bb61-95a7-11ee-0a80-107d000a1172',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: 'ee32bb61-95a7-11ee-0a80-107d000a1172',
                name: 'Участие в программе лояльности',
                type: 'double',
                value: (_h = (_g = order.commissions.find(function (commissions) {
                    return commissions.type === 'LOYALTY_PARTICIPATION_FEE';
                })) === null || _g === void 0 ? void 0 : _g.actual) !== null && _h !== void 0 ? _h : 0,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/ee32bd45-95a7-11ee-0a80-107d000a1174',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: 'ee32bd45-95a7-11ee-0a80-107d000a1174',
                name: 'Буст продаж',
                type: 'double',
                value: (_k = (_j = order.commissions.find(function (commissions) {
                    return commissions.type === 'AUCTION_PROMOTION';
                })) === null || _j === void 0 ? void 0 : _j.actual) !== null && _k !== void 0 ? _k : 0,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/ee32c117-95a7-11ee-0a80-107d000a1175',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: 'ee32c117-95a7-11ee-0a80-107d000a1175',
                name: 'Доставка покупателю',
                type: 'double',
                value: (_m = (_l = order.commissions.find(function (commissions) {
                    return commissions.type === 'DELIVERY_TO_CUSTOMER';
                })) === null || _l === void 0 ? void 0 : _l.actual) !== null && _m !== void 0 ? _m : 0,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/4136c718-95a8-11ee-0a80-0834000a4aba',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '4136c718-95a8-11ee-0a80-0834000a4aba',
                name: 'Обработка заказа FBS',
                type: 'double',
                value: (_p = (_o = order.commissions.find(function (commissions) { return commissions.type === 'SORTING'; })) === null || _o === void 0 ? void 0 : _o.actual) !== null && _p !== void 0 ? _p : 0,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/3cd85d68-95ab-11ee-0a80-11fb000af56e',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '3cd85d68-95ab-11ee-0a80-11fb000af56e',
                name: 'Обработка заказа FBY',
                type: 'double',
                value: (_r = (_q = order.commissions.find(function (commissions) { return commissions.type === 'FULFILLMENT'; })) === null || _q === void 0 ? void 0 : _q.actual) !== null && _r !== void 0 ? _r : 0,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/66dd48c7-95a8-11ee-0a80-0e9e0009fc78',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '66dd48c7-95a8-11ee-0a80-0e9e0009fc78',
                name: 'Хранение невыкупов и возвратов',
                type: 'double',
                value: (_t = (_s = order.commissions.find(function (commissions) {
                    return commissions.type === 'RETURNED_ORDERS_STORAGE';
                })) === null || _s === void 0 ? void 0 : _s.actual) !== null && _t !== void 0 ? _t : 0,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/54623519-968d-11ee-0a80-04d8001e7e59',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '54623519-968d-11ee-0a80-04d8001e7e59',
                name: 'Предоплачен',
                type: 'boolean',
                value: order.paymentType === 'PREPAID',
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/546237cb-968d-11ee-0a80-04d8001e7e5a',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '546237cb-968d-11ee-0a80-04d8001e7e5a',
                name: 'Тип покупателя',
                type: 'string',
                value: order.buyerType === 'PERSON'
                    ? 'Физическое лицо'
                    : 'Юридическое лицо',
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/2d77bca0-974b-11ee-0a80-146900276f3a',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '2d77bca0-974b-11ee-0a80-146900276f3a',
                name: 'Ставка буста',
                type: 'double',
                value: createBidFee((_u = order === null || order === void 0 ? void 0 : order.items) === null || _u === void 0 ? void 0 : _u.map(function (item) { var _a; return (_a = item.bidFee) !== null && _a !== void 0 ? _a : 0; })),
            },
            // eslint-disable-next-line no-mixed-spaces-and-tabs
        ]
        : [
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/54623519-968d-11ee-0a80-04d8001e7e59',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '54623519-968d-11ee-0a80-04d8001e7e59',
                name: 'Предоплачен',
                type: 'boolean',
                value: order.paymentType === 'PREPAID',
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/546237cb-968d-11ee-0a80-04d8001e7e5a',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '546237cb-968d-11ee-0a80-04d8001e7e5a',
                name: 'Тип покупателя',
                type: 'string',
                value: order.buyerType === 'PERSON'
                    ? 'Физическое лицо'
                    : 'Юридическое лицо',
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/2d77bca0-974b-11ee-0a80-146900276f3a',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '2d77bca0-974b-11ee-0a80-146900276f3a',
                name: 'Ставка буста',
                type: 'double',
                value: createBidFee((_v = order === null || order === void 0 ? void 0 : order.items) === null || _v === void 0 ? void 0 : _v.map(function (item) { var _a; return (_a = item.bidFee) !== null && _a !== void 0 ? _a : 0; })),
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/85c662bb-9fcb-11ee-0a80-03c00003edfc',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '85c662bb-9fcb-11ee-0a80-03c00003edfc',
                name: 'SKU заказа',
                type: 'text',
                value: (_w = order.items) === null || _w === void 0 ? void 0 : _w.map(function (item) { return "".concat(item.shopSku, " - ").concat(item.count); }).join('\n'),
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/14538b65-b36f-11ee-0a80-02a00031fa90',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '14538b65-b36f-11ee-0a80-02a00031fa90',
                name: 'Цвет',
                type: 'text',
                value: products
                    .filter(function (product) {
                    var _a;
                    return (_a = order.items) === null || _a === void 0 ? void 0 : _a.some(function (item) { return product.article === item.shopSku; });
                })
                    .map(function (prod) { return "".concat(prod.name.split(' ').at(-1)); })
                    .join('\n'),
            },
            // eslint-disable-next-line no-mixed-spaces-and-tabs
        ];
};
exports.prepareCustomerOrdersAttributes = prepareCustomerOrdersAttributes;
