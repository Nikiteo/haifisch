"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentin = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var database_1 = require("../../database");
var createStatusPaymentin = function (source) {
    switch (source) {
        case 'BUYER':
            return database_1.paymentinState.BUYER;
        case 'CASHBACK':
            return database_1.paymentinState.CASHBACK;
        case 'MARKETPLACE':
            return database_1.paymentinState.MARKETPLACE;
        case 'SPASIBO':
            return database_1.paymentinState.SPASIBO;
    }
};
var createPaymentin = function (demand, payment) {
    var salesChannel = demand.salesChannel, shared = demand.shared, organization = demand.organization, agent = demand.agent, project = demand.project, vatSum = demand.vatSum, group = demand.group;
    return {
        group: group,
        vatSum: vatSum,
        salesChannel: salesChannel,
        shared: shared,
        organization: organization,
        agent: agent,
        project: project,
        sum: parseFloat((payment.total * 100).toFixed(2)),
        name: payment.id,
        state: createStatusPaymentin(payment.source),
        moment: (0, dayjs_1.default)(payment.date).format('YYYY-MM-DD HH:mm:ss.SSS'),
        operations: [
            {
                meta: demand.meta,
                linkedSum: parseFloat((payment.total * 100).toFixed(2)),
            },
        ],
        paymentPurpose: payment.source,
        incomingNumber: payment.paymentOrder !== undefined
            ? payment.paymentOrder.id
            : undefined,
        incomingDate: payment.paymentOrder !== undefined
            ? (0, dayjs_1.default)(payment.paymentOrder.date).format('YYYY-MM-DD HH:mm:ss.SSS'
            // eslint-disable-next-line no-mixed-spaces-and-tabs
            )
            : undefined,
    };
};
exports.createPaymentin = createPaymentin;
