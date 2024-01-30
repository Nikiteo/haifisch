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
var prepareCustomerOrders = function (products, fby, fbs, orders, domain) {
    try {
        if (fby.length === 0 && fbs.length === 0) {
            return [];
        }
        if (products.length === 0) {
            return [];
        }
        if (orders.length === 0) {
            var allOrders = [];
            if (fby.length !== 0) {
                var fbyOrders = fby
                    .filter(function (order) { return order.status !== 'CANCELLED_BEFORE_PROCESSING'; })
                    .reduce(function (acc, cur) {
                    var items = cur.items;
                    var boughtProducts = products.filter(function (product) {
                        return items === null || items === void 0 ? void 0 : items.some(function (item) { return item.shopSku === product.article; });
                    });
                    if (boughtProducts.length > 0) {
                        acc.push((0, createCustomerOrder_1.createCustomerOrder)(domain, cur, boughtProducts, 'FBY'));
                    }
                    return acc;
                }, []);
                allOrders.push.apply(allOrders, fbyOrders);
            }
            if (fbs.length !== 0) {
                var fbsOrders = fbs
                    .filter(function (order) { return order.status !== 'CANCELLED_BEFORE_PROCESSING'; })
                    .reduce(function (acc, cur) {
                    var items = cur.items;
                    var boughtProducts = products.filter(function (product) {
                        return items === null || items === void 0 ? void 0 : items.some(function (item) { return item.shopSku === product.article; });
                    });
                    if (boughtProducts.length > 0) {
                        acc.push((0, createCustomerOrder_1.createCustomerOrder)(domain, cur, boughtProducts, 'FBS'));
                    }
                    return acc;
                }, []);
                allOrders.push.apply(allOrders, fbsOrders);
            }
            return allOrders;
        }
        if (orders.length !== 0) {
            var allOrders = [];
            if (fby.length !== 0) {
                var fbyOrders = fby
                    .filter(function (order) { return order.status !== 'CANCELLED_BEFORE_PROCESSING'; })
                    .reduce(function (acc, cur) {
                    orders.forEach(function (order) {
                        var _a;
                        if (order.name === ((_a = cur.id) === null || _a === void 0 ? void 0 : _a.toString()) &&
                            (0, dayjs_1.default)(new Date()).diff((0, dayjs_1.default)(order.deliveryPlannedMoment), 'month') <= 1) {
                            var items_1 = cur.items;
                            var boughtProducts = products.filter(function (product) {
                                return items_1 === null || items_1 === void 0 ? void 0 : items_1.some(function (item) {
                                    return item.shopSku === product.article;
                                });
                            });
                            if (boughtProducts.length > 0) {
                                var updatedOrders = (0, createCustomerOrder_1.createCustomerOrder)(domain, cur, boughtProducts, 'FBY');
                                acc.push(__assign(__assign({}, order), updatedOrders));
                            }
                        }
                    });
                    return acc;
                }, []);
                var findNewOrders = fby
                    .filter(function (order) { return order.status !== 'CANCELLED_BEFORE_PROCESSING'; })
                    .filter(function (order) {
                    return orders.every(function (item) { var _a; return item.name !== ((_a = order.id) === null || _a === void 0 ? void 0 : _a.toString()); });
                });
                var newCustomerOrders = findNewOrders.reduce(function (acc, cur) {
                    var items = cur.items;
                    var boughtProducts = products.filter(function (product) {
                        return items === null || items === void 0 ? void 0 : items.some(function (item) { return item.shopSku === product.article; });
                    });
                    if (boughtProducts.length > 0) {
                        acc.push((0, createCustomerOrder_1.createCustomerOrder)(domain, cur, boughtProducts, 'FBY'));
                    }
                    return acc;
                }, []);
                allOrders.push.apply(allOrders, __spreadArray(__spreadArray([], fbyOrders, false), newCustomerOrders, false));
            }
            if (fbs.length !== 0) {
                var fbsOrders = fbs
                    .filter(function (order) { return order.status !== 'CANCELLED_BEFORE_PROCESSING'; })
                    .reduce(function (acc, cur) {
                    orders.forEach(function (order) {
                        var _a;
                        if (order.name === ((_a = cur.id) === null || _a === void 0 ? void 0 : _a.toString()) &&
                            (0, dayjs_1.default)(new Date()).diff((0, dayjs_1.default)(order.deliveryPlannedMoment), 'month') <= 1) {
                            var items_2 = cur.items;
                            var boughtProducts = products.filter(function (product) {
                                return items_2 === null || items_2 === void 0 ? void 0 : items_2.some(function (item) {
                                    return item.shopSku === product.article;
                                });
                            });
                            if (boughtProducts.length > 0) {
                                var updatedOrders = (0, createCustomerOrder_1.createCustomerOrder)(domain, cur, boughtProducts, 'FBS');
                                acc.push(__assign(__assign({}, order), updatedOrders));
                            }
                        }
                    });
                    return acc;
                }, []);
                var findNewOrders = fbs
                    .filter(function (order) { return order.status !== 'CANCELLED_BEFORE_PROCESSING'; })
                    .filter(function (order) {
                    return orders.every(function (item) { var _a; return item.name !== ((_a = order.id) === null || _a === void 0 ? void 0 : _a.toString()); });
                });
                var newCustomerOrders = findNewOrders.reduce(function (acc, cur) {
                    var items = cur.items;
                    var boughtProducts = products.filter(function (product) {
                        return items === null || items === void 0 ? void 0 : items.some(function (item) { return item.shopSku === product.article; });
                    });
                    if (boughtProducts.length > 0) {
                        acc.push((0, createCustomerOrder_1.createCustomerOrder)(domain, cur, boughtProducts, 'FBS'));
                    }
                    return acc;
                }, []);
                allOrders.push.apply(allOrders, __spreadArray(__spreadArray([], fbsOrders, false), newCustomerOrders, false));
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
