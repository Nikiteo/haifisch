"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareOzonFbsStatuses = void 0;
var database_1 = require("../../database");
var ozonTypes_1 = require("../../types/ozonTypes");
var prepareOzonFbsStatuses = function (status) {
    switch (status) {
        case ozonTypes_1.OrderFbsOzonStatus.cancelled:
        case ozonTypes_1.OrderFbsOzonStatus.cancelled_from_split_pending:
            return database_1.states.CANCELLED;
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
        case ozonTypes_1.OrderFbsOzonStatus.picked_return:
            return database_1.states.PICKED_REFUND;
        default:
            return database_1.states.UNKNOWN;
    }
};
exports.prepareOzonFbsStatuses = prepareOzonFbsStatuses;
