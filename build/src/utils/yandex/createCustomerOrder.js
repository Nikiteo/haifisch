"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerOrder = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
var database_1 = require("../../database");
var customerOrderAttributes_1 = require("./customerOrderAttributes");
var getProject_1 = require("./getProject");
var getStore_1 = require("./getStore");
var preparePositions_1 = require("./preparePositions");
var prepareStatusesForCustomerOrders_1 = require("./prepareStatusesForCustomerOrders");
dayjs_1.default.extend(customParseFormat_1.default);
var createMoment = function (delivery) {
    var _a, _b, _c, _d, _e, _f;
    return (0, dayjs_1.default)((0, dayjs_1.default)((0, dayjs_1.default)(delivery.shipments[0].shipmentDate, 'DD-MM-YYYY'))
        .set('hour', ((_a = delivery.shipments[0]) === null || _a === void 0 ? void 0 : _a.shipmentTime) !== undefined &&
        ((_b = delivery.shipments[0]) === null || _b === void 0 ? void 0 : _b.shipmentTime.length) > 0
        ? Number((_c = delivery.shipments[0]) === null || _c === void 0 ? void 0 : _c.shipmentTime.split(':')[0])
        : 0)
        .set('minute', ((_d = delivery.shipments[0]) === null || _d === void 0 ? void 0 : _d.shipmentTime) !== undefined &&
        ((_e = delivery.shipments[0]) === null || _e === void 0 ? void 0 : _e.shipmentTime.length) > 0
        ? Number((_f = delivery.shipments[0]) === null || _f === void 0 ? void 0 : _f.shipmentTime.split(':')[1])
        : 0)).format('YYYY-MM-DD HH:mm:ss.SSS');
};
var createCustomerOrder = function (domain, order, boughtProducts, type) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return {
        shared: true,
        group: database_1.group,
        name: (_a = order.id) === null || _a === void 0 ? void 0 : _a.toString(),
        moment: (0, dayjs_1.default)(order.creationDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
        applicable: true,
        rate: {
            currency: database_1.currency,
        },
        store: (0, getStore_1.getStore)(domain, type),
        project: (0, getProject_1.getProject)(domain, type),
        agent: database_1.agent,
        attributes: (0, customerOrderAttributes_1.prepareCustomerOrdersAttributes)(boughtProducts, order),
        organization: database_1.organization,
        state: (0, prepareStatusesForCustomerOrders_1.prepareStatusesForCustomerOrders)(order.status, order.substatus),
        printed: false,
        published: false,
        positions: (0, preparePositions_1.preparePositions)(boughtProducts, order.items, order.status),
        vatEnabled: true,
        vatIncluded: true,
        vatSum: 0.0,
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        deliveryPlannedMoment: order.delivery
            ? createMoment(order.delivery)
            : (0, dayjs_1.default)(order.creationDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
        shipmentAddressFull: {
            postalCode: (_c = (_b = order === null || order === void 0 ? void 0 : order.delivery) === null || _b === void 0 ? void 0 : _b.address) === null || _c === void 0 ? void 0 : _c.postcode,
            country: database_1.country,
            city: (_e = (_d = order === null || order === void 0 ? void 0 : order.deliveryRegion) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : '',
            street: (_g = (_f = order === null || order === void 0 ? void 0 : order.delivery) === null || _f === void 0 ? void 0 : _f.address) === null || _g === void 0 ? void 0 : _g.street,
            house: (_j = (_h = order === null || order === void 0 ? void 0 : order.delivery) === null || _h === void 0 ? void 0 : _h.address) === null || _j === void 0 ? void 0 : _j.house,
            apartment: (_l = (_k = order === null || order === void 0 ? void 0 : order.delivery) === null || _k === void 0 ? void 0 : _k.address) === null || _l === void 0 ? void 0 : _l.apartment,
        },
        salesChannel: database_1.salesChannels,
    };
};
exports.createCustomerOrder = createCustomerOrder;
