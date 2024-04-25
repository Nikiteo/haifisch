"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preparePaymentin = void 0;
var logger_1 = __importDefault(require("../../lib/logger"));
var createPaymentin_1 = require("./createPaymentin");
var preparePaymentin = function (demands, orders) {
    try {
        if (demands.length === 0) {
            return [];
        }
        if (orders.length === 0) {
            return [];
        }
        var unPaymentedDemands_1 = demands.filter(function (demand) { return demand.payments === undefined; });
        var newPaymentins = orders
            .filter(function (order) { return order.status === 'DELIVERED'; })
            .reduce(function (acc, cur) {
            unPaymentedDemands_1.forEach(function (demand) {
                var _a, _b;
                if (demand.name === ((_a = cur.shipmentId) === null || _a === void 0 ? void 0 : _a.toString())) {
                    (_b = cur.items) === null || _b === void 0 ? void 0 : _b.forEach(function (pay) {
                        acc.push((0, createPaymentin_1.createPaymentin)(demand, pay, cur.deliveryDateTo));
                    });
                }
            });
            return acc;
        }, []);
        return __spreadArray([], newPaymentins, true);
    }
    catch (err) {
        logger_1.default.error(err);
    }
    return [];
};
exports.preparePaymentin = preparePaymentin;
