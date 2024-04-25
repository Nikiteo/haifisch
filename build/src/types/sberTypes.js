"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SberStatuses = void 0;
var SberStatuses;
(function (SberStatuses) {
    SberStatuses["NEW"] = "NEW";
    SberStatuses["CONFIRMED"] = "CONFIRMED";
    SberStatuses["PACKED"] = "PACKED";
    SberStatuses["PACKING_EXPIRED"] = "PACKING_EXPIRED";
    SberStatuses["SHIPPED"] = "SHIPPED";
    SberStatuses["DELIVERED"] = "DELIVERED";
    SberStatuses["MERCHANT_CANCELED"] = "MERCHANT_CANCELED";
    SberStatuses["CUSTOMER_CANCELED"] = "CUSTOMER_CANCELED";
})(SberStatuses || (exports.SberStatuses = SberStatuses = {}));
