"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerOrderFbs = void 0;
/* eslint-disable no-mixed-spaces-and-tabs */
var dayjs_1 = __importDefault(require("dayjs"));
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
var database_1 = require("../../database");
var prepareOzonFbsStatuses_1 = require("./prepareOzonFbsStatuses");
var prepareOzonPositions_1 = require("./prepareOzonPositions");
dayjs_1.default.extend(utc_1.default);
var prepareComissions = function (data, prices, prodsInOrder, status) {
    if (data.products.length === 0) {
        return 0;
    }
    var sumOfLogistics = parseFloat(prodsInOrder
        .reduce(function (acc, cur) {
        prices.forEach(function (price) {
            if (price.offer_id === cur.offer_id) {
                acc.push(price.commissions.fbs_direct_flow_trans_max_amount);
            }
        });
        return acc;
    }, [])
        .reduce(function (a, b) { return a + +b; }, 0)
        .toFixed(2));
    var sumOfReturnLogistic = parseFloat(prodsInOrder
        .reduce(function (acc, cur) {
        prices.forEach(function (price) {
            if (price.offer_id === cur.offer_id) {
                acc.push(price.commissions.fbs_return_flow_trans_max_amount);
            }
        });
        return acc;
    }, [])
        .reduce(function (a, b) { return a + +b; }, 0)
        .toFixed(2));
    var productsComission = data.products.reduce(function (a, b) {
        return a +
            b.commission_amount +
            ((b === null || b === void 0 ? void 0 : b.item_services) !== undefined
                ? Object.values(b.item_services).reduce(function (c, d) { return c + d; }, 0)
                : 0);
    }, 0);
    var postingComissions = Object.values(data.posting_services).reduce(function (a, b) { return a + b; }, 0);
    if (status.meta.href === database_1.states.RETURNED.meta.href) {
        return parseFloat((Math.abs(productsComission + postingComissions) +
            sumOfLogistics +
            sumOfReturnLogistic).toFixed(2));
    }
    return parseFloat((Math.abs(productsComission + postingComissions) + sumOfLogistics).toFixed(2));
};
var createCustomerOrderFbs = function (order, boughtProducts, prices) {
    return {
        shared: true,
        group: database_1.group,
        name: order.posting_number,
        moment: (0, dayjs_1.default)(order.in_process_at)
            .subtract(3, 'hour')
            .format('YYYY-MM-DD HH:mm:ss.SSS'),
        applicable: true,
        rate: {
            currency: database_1.currency,
        },
        store: database_1.fbsOzonStore,
        project: database_1.fbosOzonProject,
        agent: database_1.ozonAgent,
        attributes: [
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/customerorder/metadata/attributes/279ba9fa-9d67-11ee-0a80-09f500178da3',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '279ba9fa-9d67-11ee-0a80-09f500178da3',
                name: 'Комиссии Ozon',
                type: 'double',
                value: prepareComissions(order.financial_data, prices, order.products, (0, prepareOzonFbsStatuses_1.prepareOzonFbsStatuses)(order.status, order.cancellation.cancelled_after_ship)),
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
                value: order.products
                    .map(function (product) { return "".concat(product.offer_id, " - ").concat(product.quantity); })
                    .join('\n'),
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
                value: boughtProducts
                    .filter(function (product) {
                    return order.products.some(function (item) { return product.article === item.offer_id; });
                })
                    .map(function (prod) { return "".concat(prod.name.split(' ').at(-1)); })
                    .join('\n'),
            },
        ],
        organization: database_1.organization,
        state: (0, prepareOzonFbsStatuses_1.prepareOzonFbsStatuses)(order.status, order.cancellation.cancelled_after_ship),
        printed: false,
        published: false,
        positions: (0, prepareOzonPositions_1.prepareOzonPositions)(boughtProducts, order.products, order.status),
        vatEnabled: true,
        vatIncluded: true,
        vatSum: 0.0,
        deliveryPlannedMoment: (0, dayjs_1.default)(order.shipment_date)
            .subtract(3, 'hour')
            .add(10, 'hour')
            .format('YYYY-MM-DD HH:mm:ss.SSS'),
        shipmentAddressFull: {
            country: database_1.country,
            city: order === null || order === void 0 ? void 0 : order.analytics_data.city,
        },
        salesChannel: database_1.ozonSalesChannel,
        description: order.status === 'cancelled' || order.status === 'returned'
            ? "\u041E\u0442\u043C\u0435\u043D\u0435\u043D \u043F\u043E\u0441\u043B\u0435 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438: ".concat(order.cancellation.cancelled_after_ship ? 'Да' : 'Нет', "\n\u0418\u043D\u0438\u0446\u0438\u0430\u0442\u043E\u0440 \u043E\u0442\u043C\u0435\u043D\u044B: ").concat(order.cancellation.cancellation_initiator, "\n\u041F\u0440\u0438\u0447\u0438\u043D\u0430 \u043E\u0442\u043C\u0435\u043D\u044B: ").concat(order.cancellation.cancel_reason, "\n\u0412\u043B\u0438\u044F\u043D\u0438\u0435 \u043D\u0430 \u0440\u0435\u0439\u0442\u0438\u043D\u0433: ").concat(order.cancellation.affect_cancellation_rating
                ? 'Да'
                : 'Нет')
            : '',
    };
};
exports.createCustomerOrderFbs = createCustomerOrderFbs;
