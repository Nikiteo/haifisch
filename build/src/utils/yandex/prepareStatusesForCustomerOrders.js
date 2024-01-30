"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareStatusesForCustomerOrders = void 0;
var database_1 = require("../../database");
var marketTypes_1 = require("../../types/marketTypes");
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
var prepareSubstatuses = function (substatus) {
    if (substatus === 'READY_TO_SHIP') {
        return database_1.states.READY_TO_SHIP;
    }
    if (substatus === 'SHIPPED') {
        return database_1.states.PICKUP;
    }
    return database_1.states.PROCESSING;
};
var prepareStatusesForCustomerOrders = function (status, substatus
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) {
    switch (status) {
        case marketTypes_1.OrderStatusEnum.CANCELLED_IN_PROCESSING:
            return database_1.states.CANCELLED;
        case marketTypes_1.OrderStatusEnum.CANCELLED_IN_DELIVERY:
        case marketTypes_1.OrderStatusEnum.REJECTED:
            return database_1.states.CANCELLED_IN_DELIVERY;
        case marketTypes_1.OrderStatusEnum.DELIVERED:
            return database_1.states.DELIVERED;
        case marketTypes_1.OrderStatusEnum.DELIVERY:
        case marketTypes_1.OrderStatusEnum.PICKUP:
            return database_1.states.DELIVERY;
        case marketTypes_1.OrderStatusEnum.RESERVED:
        case marketTypes_1.OrderStatusEnum.PENDING:
        case marketTypes_1.OrderStatusEnum.UNPAID:
            return database_1.states.NEW;
        case marketTypes_1.OrderStatusEnum.PROCESSING:
            return prepareSubstatuses(substatus);
        case marketTypes_1.OrderStatusEnum.PARTIALLY_RETURNED:
            return database_1.states.PARTIALLY_RETURNED;
        case marketTypes_1.OrderStatusEnum.RETURNED:
            return database_1.states.RETURNED;
        case marketTypes_1.OrderStatusEnum.LOST:
            return database_1.states.LOST;
        default:
            return database_1.states.UNKNOWN;
    }
};
exports.prepareStatusesForCustomerOrders = prepareStatusesForCustomerOrders;
