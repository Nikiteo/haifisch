"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentout = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var database_1 = require("../../database");
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
var createStatusPaymentout = function (source) {
    switch (source) {
        case 'BUYER':
            return database_1.paymentoutState.BUYER;
        case 'CASHBACK':
            return database_1.paymentoutState.CASHBACK;
        case 'MARKETPLACE':
            return database_1.paymentoutState.MARKETPLACE;
        case 'SPASIBO':
            return database_1.paymentoutState.SPASIBO;
    }
};
var createPaymentout = function (ret, payment) {
    var salesChannel = ret.salesChannel, shared = ret.shared, organization = ret.organization, agent = ret.agent, project = ret.project, vatSum = ret.vatSum, group = ret.group;
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
        moment: (0, dayjs_1.default)(payment.date).format('YYYY-MM-DD HH:mm:ss.SSS'),
        operations: [
            {
                meta: ret.meta,
                linkedSum: parseFloat((payment.total * 100).toFixed(2)),
            },
        ],
        paymentPurpose: payment.source,
        state: createStatusPaymentout(payment.source),
        expenseItem: {
            meta: {
                href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/8dbf99a0-0a01-11e4-a743-002590a32f46',
                type: 'expenseitem',
                mediaType: 'application/json',
            },
        },
    };
};
exports.createPaymentout = createPaymentout;
