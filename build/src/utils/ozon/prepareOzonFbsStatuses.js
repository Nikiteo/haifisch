"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareOzonFbsStatuses = void 0;
var database_1 = require("../../database");
var ozonTypes_1 = require("../../types/ozonTypes");
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
var refundCheck = function (after) {
    if (after !== undefined && after) {
        return database_1.states.RETURNED;
    }
    return database_1.states.CANCELLED;
};
var prepareOzonFbsStatuses = function (status, refund
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) {
    switch (status) {
        case ozonTypes_1.OrderFbsOzonStatus.cancelled:
        case ozonTypes_1.OrderFbsOzonStatus.cancelled_from_split_pending:
            return refundCheck(refund);
        case ozonTypes_1.OrderFbsOzonStatus.awaiting_deliver:
            return database_1.states.READY_TO_SHIP;
        case ozonTypes_1.OrderFbsOzonStatus.delivering:
        case ozonTypes_1.OrderFbsOzonStatus.driver_pickup:
            return database_1.states.DELIVERY;
        case ozonTypes_1.OrderFbsOzonStatus.delivered:
            return database_1.states.DELIVERED;
        case ozonTypes_1.OrderFbsOzonStatus.awaiting_packaging:
            return database_1.states.PROCESSING;
        case ozonTypes_1.OrderFbsOzonStatus.awaiting_approve:
        case ozonTypes_1.OrderFbsOzonStatus.awaiting_registration:
            return database_1.states.NEW;
        case ozonTypes_1.OrderFbsOzonStatus.returned:
            return database_1.states.RETURNED;
        default:
            return database_1.states.UNKNOWN;
    }
};
exports.prepareOzonFbsStatuses = prepareOzonFbsStatuses;
