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
exports.prepareOzonCustomerOrders = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var logger_1 = __importDefault(require("../../lib/logger"));
var createCustomerOrderFbs_1 = require("./createCustomerOrderFbs");
var createOzonCustomerOrderFbo_1 = require("./createOzonCustomerOrderFbo");
var prepareOzonCustomerOrders = function (products, fboOrders, fbsOrders, orders, prices) {
    try {
        if (fboOrders.length === 0 && fbsOrders.length === 0) {
            return [];
        }
        if (products.length === 0) {
            return [];
        }
        if (orders.length === 0) {
            var allOrders = [];
            if (fboOrders.length !== 0) {
                var ordersFbo = fboOrders.reduce(function (acc, cur) {
                    var boughtProducts = cur.products;
                    var boughtItems = products.filter(function (product) {
                        return boughtProducts.some(function (item) { return item.offer_id === product.article; });
                    });
                    if (boughtItems.length > 0) {
                        acc.push((0, createOzonCustomerOrderFbo_1.createCustomerOrderFbo)(cur, boughtItems, prices));
                    }
                    return acc;
                }, []);
                allOrders.push.apply(allOrders, ordersFbo);
            }
            if (fbsOrders.length !== 0) {
                var ordersFbs = fbsOrders.reduce(function (acc, cur) {
                    var boughtProducts = cur.products;
                    var boughtItems = products.filter(function (product) {
                        return boughtProducts.some(function (item) { return item.offer_id === product.article; });
                    });
                    if (boughtItems.length > 0) {
                        acc.push((0, createCustomerOrderFbs_1.createCustomerOrderFbs)(cur, boughtItems, prices));
                    }
                    return acc;
                }, []);
                allOrders.push.apply(allOrders, ordersFbs);
            }
            return allOrders;
        }
        if (orders.length !== 0) {
            var allOrders = [];
            if (fboOrders.length !== 0) {
                var ordersFbo = fboOrders.reduce(function (acc, cur) {
                    orders.forEach(function (order) {
                        if (order.name === cur.posting_number &&
                            (0, dayjs_1.default)(new Date()).diff((0, dayjs_1.default)(order.deliveryPlannedMoment), 'month') <= 1) {
                            var boughtProducts_1 = cur.products;
                            var boughtItems = products.filter(function (product) {
                                return boughtProducts_1.some(function (item) {
                                    return item.offer_id === product.article;
                                });
                            });
                            if (boughtItems.length > 0) {
                                var updatedOrders = (0, createOzonCustomerOrderFbo_1.createCustomerOrderFbo)(cur, boughtItems, prices);
                                acc.push(__assign(__assign({}, order), updatedOrders));
                            }
                        }
                    });
                    return acc;
                }, []);
                var findNewOrders = fboOrders.filter(function (order) {
                    return orders.every(function (item) { return item.name !== order.posting_number; });
                });
                var newCustomerOrders = findNewOrders.reduce(function (acc, cur) {
                    var boughtProducts = cur.products;
                    var boughtItems = products.filter(function (product) {
                        return boughtProducts.some(function (item) { return item.offer_id === product.article; });
                    });
                    if (boughtItems.length > 0) {
                        acc.push((0, createOzonCustomerOrderFbo_1.createCustomerOrderFbo)(cur, boughtItems, prices));
                    }
                    return acc;
                }, []);
                allOrders.push.apply(allOrders, __spreadArray(__spreadArray([], ordersFbo, false), newCustomerOrders, false));
            }
            if (fbsOrders.length !== 0) {
                var ordersFbs = fbsOrders.reduce(function (acc, cur) {
                    orders.forEach(function (order) {
                        if (order.name === cur.posting_number &&
                            (0, dayjs_1.default)(new Date()).diff((0, dayjs_1.default)(order.deliveryPlannedMoment), 'month') <= 1) {
                            var boughtProducts_2 = cur.products;
                            var boughtItems = products.filter(function (product) {
                                return boughtProducts_2.some(function (item) {
                                    return item.offer_id === product.article;
                                });
                            });
                            if (boughtItems.length > 0) {
                                var updatedOrders = (0, createCustomerOrderFbs_1.createCustomerOrderFbs)(cur, boughtItems, prices);
                                acc.push(__assign(__assign({}, order), updatedOrders));
                            }
                        }
                    });
                    return acc;
                }, []);
                var findNewOrders = fbsOrders.filter(function (order) {
                    return orders.every(function (item) { return item.name !== order.posting_number; });
                });
                var newCustomerOrders = findNewOrders.reduce(function (acc, cur) {
                    var boughtProducts = cur.products;
                    var boughtItems = products.filter(function (product) {
                        return boughtProducts.some(function (item) { return item.offer_id === product.article; });
                    });
                    if (boughtItems.length > 0) {
                        acc.push((0, createCustomerOrderFbs_1.createCustomerOrderFbs)(cur, boughtItems, prices));
                    }
                    return acc;
                }, []);
                allOrders.push.apply(allOrders, __spreadArray(__spreadArray([], ordersFbs, false), newCustomerOrders, false));
            }
            return allOrders;
        }
    }
    catch (err) {
        logger_1.default.error(err);
    }
    return [];
};
exports.prepareOzonCustomerOrders = prepareOzonCustomerOrders;
