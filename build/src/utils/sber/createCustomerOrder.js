"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerOrder = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
var database_1 = require("../../database");
var prepareStatuses_1 = require("./prepareStatuses");
var prepareCustomerOrdersAttibutes_1 = require("./prepareCustomerOrdersAttibutes");
var preparePositions_1 = require("./preparePositions");
dayjs_1.default.extend(customParseFormat_1.default);
var createCustomerOrder = function (order, boughtProducts) {
    var _a;
    return {
        shared: true,
        group: database_1.group,
        name: (_a = order.shipmentId) === null || _a === void 0 ? void 0 : _a.toString(),
        moment: (0, dayjs_1.default)(order.creationDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
        applicable: true,
        rate: {
            currency: database_1.currency,
        },
        store: database_1.sberStore,
        project: database_1.sberProject,
        agent: database_1.sberAgent,
        attributes: (0, prepareCustomerOrdersAttibutes_1.prepareCustomerOrdersAttributes)(boughtProducts, order),
        organization: database_1.organization,
        state: (0, prepareStatuses_1.prepareStatuses)(order.status),
        printed: false,
        published: false,
        positions: (0, preparePositions_1.preparePositions)(boughtProducts, order.items, order.status),
        vatEnabled: true,
        vatIncluded: true,
        vatSum: 0.0,
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        deliveryPlannedMoment: (0, dayjs_1.default)(order.shipmentDateFrom).format('YYYY-MM-DD HH:mm:ss.SSS'),
        shipmentAddressFull: {
            addInfo: order.customerAddress,
        },
        salesChannel: database_1.sberSalesChannel,
    };
};
exports.createCustomerOrder = createCustomerOrder;
