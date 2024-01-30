"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var preparePaymentin = function (demands, orders, paymentins) {
    try {
        if (demands.length === 0) {
            return [];
        }
        if (orders.length === 0) {
            return [];
        }
        var unPaymentedDemands_1 = demands.filter(function (demand) { return demand.payments !== undefined; });
        var paymentedDemands_1 = demands.filter(function (demand) { return !(demand.payments !== undefined); });
        var updatedPaymentin = orders
            .filter(function (order) { return order.status !== 'CANCELLED_BEFORE_PROCESSING'; })
            .reduce(function (acc, cur) {
            if (cur.payments !== undefined && cur.payments.length > 0) {
                paymentedDemands_1.forEach(function (demand) {
                    var _a, _b, _c, _d, _e;
                    if (demand.name === ((_a = cur.id) === null || _a === void 0 ? void 0 : _a.toString())) {
                        if (((_b = demand.payments) === null || _b === void 0 ? void 0 : _b.length) === ((_c = cur.payments) === null || _c === void 0 ? void 0 : _c.length)) {
                            (_d = cur.payments) === null || _d === void 0 ? void 0 : _d.forEach(function (pay) {
                                paymentins.forEach(function (payment) {
                                    if (payment.name === pay.id) {
                                        if (pay.type === 'PAYMENT') {
                                            var createdPayment = (0, createPaymentin_1.createPaymentin)(demand, pay);
                                            acc.push(__assign(__assign({}, payment), createdPayment));
                                        }
                                    }
                                });
                            });
                        }
                        else {
                            var findPaymentins_1 = paymentins.filter(function (payment) {
                                var _a;
                                return (_a = cur.payments) === null || _a === void 0 ? void 0 : _a.some(function (pay) { return pay.id === payment.name; });
                            });
                            var newPayments = (_e = cur.payments) === null || _e === void 0 ? void 0 : _e.filter(function (pay) {
                                return findPaymentins_1.every(function (payment) { return pay.id !== payment.name; });
                            });
                            newPayments === null || newPayments === void 0 ? void 0 : newPayments.forEach(function (payment) {
                                if (payment.type === 'PAYMENT') {
                                    acc.push((0, createPaymentin_1.createPaymentin)(demand, payment));
                                }
                            });
                        }
                    }
                });
            }
            return acc;
        }, []);
        var newPaymentins = orders
            .filter(function (order) { return order.status !== 'CANCELLED_BEFORE_PROCESSING'; })
            .reduce(function (acc, cur) {
            if (cur.payments !== undefined && cur.payments.length > 0) {
                unPaymentedDemands_1.forEach(function (demand) {
                    var _a, _b;
                    if (demand.name === ((_a = cur.id) === null || _a === void 0 ? void 0 : _a.toString())) {
                        (_b = cur.payments) === null || _b === void 0 ? void 0 : _b.forEach(function (pay) {
                            if (pay.type === 'PAYMENT') {
                                acc.push((0, createPaymentin_1.createPaymentin)(demand, pay));
                            }
                        });
                    }
                });
            }
            return acc;
        }, []);
        var allPaymentins = __spreadArray(__spreadArray([], updatedPaymentin, true), newPaymentins, true);
        var uniqPaymentins = allPaymentins.reduce(function (acc, payment) {
            if (payment.name !== undefined) {
                if (acc.forEach[payment.name])
                    return acc;
                acc.forEach[payment.name] = true;
                acc.uniqPaymentins.push(payment);
            }
            return acc;
        }, {
            forEach: {},
            uniqPaymentins: [],
        }).uniqPaymentins;
        return uniqPaymentins;
    }
    catch (err) {
        logger_1.default.error(err);
    }
    return [];
};
exports.preparePaymentin = preparePaymentin;
