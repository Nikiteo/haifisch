"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareCustomerOrdersAttributes = void 0;
var prepareCustomerOrdersAttributes = function (products, order) {
    var _a;
    return [
        {
            meta: {
                href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/85c662bb-9fcb-11ee-0a80-03c00003edfc',
                type: 'attributemetadata',
                mediaType: 'application/json',
            },
            id: '85c662bb-9fcb-11ee-0a80-03c00003edfc',
            name: 'SKU заказа',
            type: 'text',
            value: (_a = order.items) === null || _a === void 0 ? void 0 : _a.map(function (item) { return "".concat(item.offerId, " - ").concat(item.quantity); }).join('\n'),
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
                .filter(function (product) { var _a; return (_a = order.items) === null || _a === void 0 ? void 0 : _a.some(function (item) { return product.article === item.offerId; }); })
                .map(function (prod) { return "".concat(prod.name.split(' ').at(-1)); })
                .join('\n'),
        },
        // eslint-disable-next-line no-mixed-spaces-and-tabs
    ];
};
exports.prepareCustomerOrdersAttributes = prepareCustomerOrdersAttributes;
