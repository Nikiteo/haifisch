"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentin = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var createPaymentin = function (demand, payment, date) {
    var salesChannel = demand.salesChannel, shared = demand.shared, organization = demand.organization, agent = demand.agent, project = demand.project, vatSum = demand.vatSum, group = demand.group, name = demand.name;
    return {
        group: group,
        vatSum: vatSum,
        salesChannel: salesChannel,
        shared: shared,
        organization: organization,
        agent: agent,
        project: project,
        sum: parseFloat((payment.price * 100).toFixed(2)),
        name: name,
        moment: (0, dayjs_1.default)(date).format('YYYY-MM-DD HH:mm:ss.SSS'),
        operations: [
            {
                meta: demand.meta,
                linkedSum: parseFloat((payment.price * 100).toFixed(2)),
            },
        ],
    };
};
exports.createPaymentin = createPaymentin;
