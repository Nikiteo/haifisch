"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOzonPaymentin = void 0;
var createOzonPaymentin = function (demand, payment) {
    var salesChannel = demand.salesChannel, shared = demand.shared, organization = demand.organization, agent = demand.agent, project = demand.project, vatSum = demand.vatSum, group = demand.group;
    return {
        group: group,
        vatSum: vatSum,
        salesChannel: salesChannel,
        shared: shared,
        organization: organization,
        agent: agent,
        project: project,
        sum: parseFloat((payment * 100).toFixed(2)),
        name: demand.name,
        moment: demand.moment,
        operations: [
            {
                meta: demand.meta,
                linkedSum: parseFloat((payment * 100).toFixed(2)),
            },
        ],
    };
};
exports.createOzonPaymentin = createOzonPaymentin;
