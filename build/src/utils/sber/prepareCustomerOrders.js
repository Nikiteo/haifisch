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
exports.prepareCustomerOrders = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var logger_1 = __importDefault(require("../../lib/logger"));
var createCustomerOrder_1 = require("./createCustomerOrder");
var prepareCustomerOrders = function (products, orders, sberOrders) {
    try {
        if (sberOrders.length === 0) {
            return [];
        }
        if (products.length === 0) {
            return [];
        }
        if (orders.length === 0) {
            var allOrders = [];
            if (sberOrders.length !== 0) {
                var orders_1 = sberOrders.reduce(function (acc, cur) {
                    var items = cur.items;
                    var boughtProducts = products.filter(function (product) {
                        return items === null || items === void 0 ? void 0 : items.some(function (item) { return item.offerId === product.article; });
                    });
                    if (boughtProducts.length > 0) {
                        acc.push((0, createCustomerOrder_1.createCustomerOrder)(cur, boughtProducts));
                    }
                    return acc;
                }, []);
                allOrders.push.apply(allOrders, orders_1);
            }
            return allOrders;
        }
        if (orders.length !== 0) {
            var allOrders = [];
            if (sberOrders.length !== 0) {
                var fbyOrders = sberOrders.reduce(function (acc, cur) {
                    orders.forEach(function (order) {
                        var _a;
                        if (order.name === ((_a = cur.shipmentId) === null || _a === void 0 ? void 0 : _a.toString()) &&
                            (0, dayjs_1.default)()
                                .add(3, 'hour')
                                .diff((0, dayjs_1.default)(order.deliveryPlannedMoment), 'month') <= 1) {
                            var items_1 = cur.items;
                            var boughtProducts = products.filter(function (product) {
                                return items_1 === null || items_1 === void 0 ? void 0 : items_1.some(function (item) {
                                    return item.offerId === product.article;
                                });
                            });
                            if (boughtProducts.length > 0) {
                                var updatedOrders = (0, createCustomerOrder_1.createCustomerOrder)(cur, boughtProducts);
                                acc.push(__assign(__assign({}, order), updatedOrders));
                            }
                        }
                    });
                    return acc;
                }, []);
                var findNewOrders = sberOrders.filter(function (order) {
                    return orders.every(function (item) { var _a; return item.name !== ((_a = order.shipmentId) === null || _a === void 0 ? void 0 : _a.toString()); });
                });
                var newCustomerOrders = findNewOrders.reduce(function (acc, cur) {
                    var items = cur.items;
                    var boughtProducts = products.filter(function (product) {
                        return items === null || items === void 0 ? void 0 : items.some(function (item) { return item.offerId === product.article; });
                    });
                    if (boughtProducts.length > 0) {
                        acc.push((0, createCustomerOrder_1.createCustomerOrder)(cur, boughtProducts));
                    }
                    return acc;
                }, []);
                allOrders.push.apply(allOrders, __spreadArray(__spreadArray([], fbyOrders, false), newCustomerOrders, false));
            }
            return allOrders;
        }
        return [];
    }
    catch (err) {
        logger_1.default.error(err);
    }
    return [];
};
exports.prepareCustomerOrders = prepareCustomerOrders;
