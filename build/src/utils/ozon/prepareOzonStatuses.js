"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareOzonStatuses = void 0;
var database_1 = require("../../database");
var ozonTypes_1 = require("../../types/ozonTypes");
var prepareOzonStatuses = function (status) {
    switch (status) {
        case ozonTypes_1.OrderStatusEnum.cancelled:
            return database_1.states.CANCELLED;
        case ozonTypes_1.OrderStatusEnum.awaiting_deliver:
            return database_1.states.READY_TO_SHIP;
        case ozonTypes_1.OrderStatusEnum.delivering:
            return database_1.states.DELIVERY;
        case ozonTypes_1.OrderStatusEnum.delivered:
            return database_1.states.DELIVERED;
        case ozonTypes_1.OrderStatusEnum.awaiting_packaging:
            return database_1.states.PROCESSING;
        case ozonTypes_1.OrderStatusEnum.returned:
            return database_1.states.RETURNED;
        default:
            return database_1.states.UNKNOWN;
    }
};
exports.prepareOzonStatuses = prepareOzonStatuses;
