"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerOrderFbo = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var database_1 = require("../../database");
var prepareOzonPositions_1 = require("./prepareOzonPositions");
var prepareOzonStatuses_1 = require("./prepareOzonStatuses");
var prepareComissions = function (orderNumber, transactions) {
    if (transactions.length === 0) {
        return 0;
    }
    var regex = new RegExp("".concat(orderNumber, ".*$"));
    return Math.abs(parseFloat(transactions
        .reduce(function (acc, cur) {
        if (regex.test(cur.posting.posting_number)) {
            acc.push(cur.services.reduce(function (sum, service) { return sum + Number(service.price); }, 0));
            if (cur.type === 'orders') {
                acc.push(cur.sale_commission);
            }
            if (cur.type === 'returns' &&
                cur.services.length === 0) {
                acc.push(cur.sale_commission);
            }
        }
        return acc;
    }, [])
        .reduce(function (a, b) { return a + +b; }, 0)
        .toFixed(0)));
};
var createCustomerOrderFbo = function (order, boughtProducts, transactions) {
    return {
        shared: true,
        group: database_1.group,
        name: order.posting_number,
        moment: (0, dayjs_1.default)(order.created_at)
            .subtract(3, 'hour')
            .format('YYYY-MM-DD HH:mm:ss.SSS'),
        deliveryPlannedMoment: (0, dayjs_1.default)(order.created_at)
            .subtract(3, 'hour')
            .add(1, 'day')
            .format('YYYY-MM-DD HH:mm:ss.SSS'),
        applicable: true,
        rate: {
            currency: database_1.currency,
        },
        store: database_1.fboOzonStore,
        project: database_1.fboOzonProject,
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
                value: prepareComissions(order.posting_number, transactions),
            },
        ],
        organization: database_1.ozonSupplier,
        state: (0, prepareOzonStatuses_1.prepareOzonStatuses)(order.status),
        printed: false,
        published: false,
        positions: (0, prepareOzonPositions_1.prepareOzonPositions)(boughtProducts, order.products, order.status),
        vatEnabled: true,
        vatIncluded: true,
        vatSum: 0.0,
        shipmentAddressFull: {
            country: database_1.country,
            city: order === null || order === void 0 ? void 0 : order.analytics_data.city,
        },
        salesChannel: database_1.ozonSalesChannel,
        description: '',
    };
};
exports.createCustomerOrderFbo = createCustomerOrderFbo;
