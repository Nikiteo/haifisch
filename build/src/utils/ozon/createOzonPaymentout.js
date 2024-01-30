"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOzonPaymentout = void 0;
var createOzonPaymentout = function (ret, payment) {
    var salesChannel = ret.salesChannel, shared = ret.shared, organization = ret.organization, agent = ret.agent, project = ret.project, vatSum = ret.vatSum, group = ret.group, name = ret.name, moment = ret.moment;
    return {
        group: group,
        vatSum: vatSum,
        salesChannel: salesChannel,
        shared: shared,
        organization: organization,
        agent: agent,
        project: project,
        sum: parseFloat((payment * 100).toFixed(2)),
        name: name,
        moment: moment,
        operations: [
            {
                meta: ret.meta,
                linkedSum: parseFloat((payment * 100).toFixed(2)),
            },
        ],
        expenseItem: {
            meta: {
                href: 'https://api.moysklad.ru/api/remap/1.2/entity/expenseitem/8dbf99a0-0a01-11e4-a743-002590a32f46',
                type: 'expenseitem',
                mediaType: 'application/json',
            },
        },
    };
};
exports.createOzonPaymentout = createOzonPaymentout;
