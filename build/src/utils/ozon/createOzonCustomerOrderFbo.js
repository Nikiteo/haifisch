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
var prepareComissions = function (products, prices, status, prodsInOrder) {
    if (products.length === 0) {
        return 0;
    }
    var sumOfLogistics = parseFloat(prodsInOrder
        .reduce(function (acc, cur) {
        prices.forEach(function (price) {
            if (price.offer_id === cur.offer_id) {
                acc.push(price.commissions.fbo_direct_flow_trans_max_amount *
                    cur.quantity);
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
                acc.push(price.commissions.fbo_return_flow_trans_max_amount);
            }
        });
        return acc;
    }, [])
        .reduce(function (a, b) { return a + +b; }, 0)
        .toFixed(2));
    var comissions = parseFloat(Math.abs(products.reduce(function (a, b) {
        return a +
            b.commission_amount +
            ((b === null || b === void 0 ? void 0 : b.item_services) !== undefined
                ? Object.values(b.item_services).reduce(function (c, d) { return c + d; }, 0
                // eslint-disable-next-line no-mixed-spaces-and-tabs
                )
                : 0);
    }, 0)).toFixed(2));
    if (status.meta.href === database_1.states.RETURNED.meta.href) {
        return parseFloat((comissions + sumOfLogistics + sumOfReturnLogistic).toFixed(2));
    }
    return parseFloat((comissions + sumOfLogistics).toFixed(2));
};
var createCustomerOrderFbo = function (order, boughtProducts, prices) {
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
                value: prepareComissions(order.financial_data.products, prices, (0, prepareOzonStatuses_1.prepareOzonStatuses)(order.status), order.products),
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
