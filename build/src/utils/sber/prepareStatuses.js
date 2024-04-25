"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareStatuses = void 0;
var database_1 = require("../../database");
var sberTypes_1 = require("../../types/sberTypes");
var prepareStatuses = function (status) {
    switch (status) {
        case sberTypes_1.SberStatuses.MERCHANT_CANCELED:
        case sberTypes_1.SberStatuses.CUSTOMER_CANCELED:
            return database_1.states.CANCELLED;
        case sberTypes_1.SberStatuses.DELIVERED:
            return database_1.states.DELIVERED;
        case sberTypes_1.SberStatuses.SHIPPED:
            return database_1.states.DELIVERY;
        case sberTypes_1.SberStatuses.NEW:
            return database_1.states.NEW;
        case sberTypes_1.SberStatuses.CONFIRMED:
        case sberTypes_1.SberStatuses.PACKED:
        case sberTypes_1.SberStatuses.PACKING_EXPIRED:
            return database_1.states.PROCESSING;
        default:
            return database_1.states.UNKNOWN;
    }
};
exports.prepareStatuses = prepareStatuses;
