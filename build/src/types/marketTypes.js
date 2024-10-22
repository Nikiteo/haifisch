"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusEnum = void 0;
// eslint-disable-next-line no-shadow
var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum["CANCELLED_BEFORE_PROCESSING"] = "CANCELLED_BEFORE_PROCESSING";
    OrderStatusEnum["CANCELLED_IN_DELIVERY"] = "CANCELLED_IN_DELIVERY";
    OrderStatusEnum["CANCELLED_IN_PROCESSING"] = "CANCELLED_IN_PROCESSING";
    OrderStatusEnum["DELIVERY"] = "DELIVERY";
    OrderStatusEnum["DELIVERED"] = "DELIVERED";
    OrderStatusEnum["PARTIALLY_DELIVERED"] = "PARTIALLY_DELIVERED";
    OrderStatusEnum["PARTIALLY_RETURNED"] = "PARTIALLY_RETURNED";
    OrderStatusEnum["PENDING"] = "PENDING";
    OrderStatusEnum["PICKUP"] = "PICKUP";
    OrderStatusEnum["PROCESSING"] = "PROCESSING";
    OrderStatusEnum["RESERVED"] = "RESERVED";
    OrderStatusEnum["RETURNED"] = "RETURNED";
    OrderStatusEnum["PICKED_REFUND"] = "PICKED_REFUND";
    OrderStatusEnum["REJECTED"] = "REJECTED";
    OrderStatusEnum["UNKNOWN"] = "UNKNOWN";
    OrderStatusEnum["UNPAID"] = "UNPAID";
    OrderStatusEnum["LOST"] = "LOST";
})(OrderStatusEnum || (exports.OrderStatusEnum = OrderStatusEnum = {}));
