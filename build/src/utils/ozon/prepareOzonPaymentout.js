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
exports.prepareOzonPaymentout = void 0;
var logger_1 = __importDefault(require("../../lib/logger"));
var createOzonPaymentout_1 = require("./createOzonPaymentout");
var prepareOzonPaymentout = function (returns, fboOrders, fbsOrders, paymentouts) {
    try {
        if (returns.length === 0) {
            return [];
        }
        if (fboOrders.length === 0 && fbsOrders.length === 0) {
            return [];
        }
        var allPaymentouts = [];
        var unPaymentedReturns_1 = returns.filter(function (ret) { return ret.payments === undefined; });
        var paymentedReturns_1 = returns.filter(function (ret) { return ret.payments !== undefined; });
        if (fboOrders.length !== 0) {
            var updatedPaymentin = fboOrders
                .filter(function (order) { return order.status !== 'cancelled'; })
                .reduce(function (acc, cur) {
                paymentedReturns_1.forEach(function (ret) {
                    if (ret.name === cur.posting_number) {
                        var sumOfPayments_1 = cur.products.reduce(function (a, b) {
                            return parseFloat((a +
                                parseFloat(b.price) * b.quantity).toFixed(2));
                        }, 0);
                        if (sumOfPayments_1 !== 0) {
                            paymentouts.forEach(function (payment) {
                                if (payment.name === cur.posting_number) {
                                    var createdPayment = (0, createOzonPaymentout_1.createOzonPaymentout)(ret, sumOfPayments_1);
                                    acc.push(__assign(__assign({}, payment), createdPayment));
                                }
                            });
                        }
                    }
                });
                return acc;
            }, []);
            var newPaymentins = fboOrders
                .filter(function (order) { return order.status !== 'cancelled'; })
                .reduce(function (acc, cur) {
                unPaymentedReturns_1.forEach(function (ret) {
                    if (ret.name === cur.posting_number) {
                        var sumOfPayments = cur.products.reduce(function (a, b) {
                            return parseFloat((a +
                                parseFloat(b.price) * b.quantity).toFixed(2));
                        }, 0);
                        if (sumOfPayments !== 0) {
                            acc.push((0, createOzonPaymentout_1.createOzonPaymentout)(ret, sumOfPayments));
                        }
                    }
                });
                return acc;
            }, []);
            allPaymentouts.push.apply(allPaymentouts, __spreadArray(__spreadArray([], updatedPaymentin, false), newPaymentins, false));
        }
        if (fbsOrders.length !== 0) {
            var updatedPaymentin = fbsOrders
                .filter(function (order) { return order.status !== 'cancelled'; })
                .reduce(function (acc, cur) {
                paymentedReturns_1.forEach(function (ret) {
                    if (ret.name === cur.posting_number) {
                        var sumOfPayments_2 = cur.financial_data.products.reduce(function (a, b) {
                            return parseFloat((a + b.price * b.quantity).toFixed(2));
                        }, 0);
                        if (sumOfPayments_2 !== 0) {
                            paymentouts.forEach(function (payment) {
                                if (payment.name === cur.posting_number) {
                                    var createdPayment = (0, createOzonPaymentout_1.createOzonPaymentout)(ret, sumOfPayments_2);
                                    acc.push(__assign(__assign({}, payment), createdPayment));
                                }
                            });
                        }
                    }
                });
                return acc;
            }, []);
            var newPaymentins = fbsOrders.reduce(function (acc, cur) {
                unPaymentedReturns_1.forEach(function (ret) {
                    if (ret.name === cur.posting_number) {
                        var sumOfPayments = cur.financial_data.products.reduce(function (a, b) {
                            return parseFloat((a + b.price * b.quantity).toFixed(2));
                        }, 0);
                        if (sumOfPayments !== 0) {
                            acc.push((0, createOzonPaymentout_1.createOzonPaymentout)(ret, sumOfPayments));
                        }
                    }
                });
                return acc;
            }, []);
            allPaymentouts.push.apply(allPaymentouts, __spreadArray(__spreadArray([], updatedPaymentin, false), newPaymentins, false));
        }
        var uniqPaymentout = allPaymentouts.reduce(function (acc, payment) {
            if (payment.name !== undefined) {
                if (acc.forEach[payment.name])
                    return acc;
                acc.forEach[payment.name] = true;
                acc.uniqPaymentout.push(payment);
            }
            return acc;
        }, {
            forEach: {},
            uniqPaymentout: [],
        }).uniqPaymentout;
        return uniqPaymentout;
    }
    catch (err) {
        logger_1.default.error(err);
    }
    return [];
};
exports.prepareOzonPaymentout = prepareOzonPaymentout;
