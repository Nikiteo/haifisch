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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSalesReturn = void 0;
var database_1 = require("../../database");
var logger_1 = __importDefault(require("../../lib/logger"));
var createSalesreturn_1 = require("./createSalesreturn");
var prepareSalesReturn = function (demands, orders, salesreturn, place) {
    try {
        if (demands.length === 0) {
            return [];
        }
        if (orders.length === 0) {
            return [];
        }
        if (salesreturn.length === 0) {
            if (place === 'OZON') {
                var filteredOrders_1 = orders.filter(function (order) {
                    var _a, _b;
                    return ((_a = order.state) === null || _a === void 0 ? void 0 : _a.meta) === database_1.states.RETURNED.meta ||
                        ((_b = order.state) === null || _b === void 0 ? void 0 : _b.meta) === database_1.states.PARTIALLY_RETURNED.meta;
                });
                var addPositionsToDemands = demands.reduce(function (acc, cur) {
                    filteredOrders_1.forEach(function (order) {
                        var _a;
                        if (order.name === cur.name) {
                            acc.push(__assign(__assign({}, cur), { positions: (_a = order.positions) === null || _a === void 0 ? void 0 : _a.map(function (pos) {
                                    return __assign(__assign({}, pos), { country: database_1.country });
                                }) }));
                        }
                    });
                    return acc;
                }, []);
                return addPositionsToDemands.reduce(function (acc, cur) {
                    acc.push((0, createSalesreturn_1.createSalesReturn)(cur));
                    return acc;
                }, []);
            }
            else {
                var filteredOrders_2 = orders.filter(function (order) {
                    var _a, _b, _c, _d;
                    return ((_a = order.state) === null || _a === void 0 ? void 0 : _a.meta) === database_1.states.CANCELLED.meta ||
                        ((_b = order.state) === null || _b === void 0 ? void 0 : _b.meta) ===
                            database_1.states.CANCELLED_IN_DELIVERY.meta ||
                        ((_c = order.state) === null || _c === void 0 ? void 0 : _c.meta) === database_1.states.RETURNED.meta ||
                        ((_d = order.state) === null || _d === void 0 ? void 0 : _d.meta) === database_1.states.PARTIALLY_RETURNED.meta;
                });
                var addPositionsToDemands = demands.reduce(function (acc, cur) {
                    filteredOrders_2.forEach(function (order) {
                        var _a;
                        if (order.name === cur.name) {
                            acc.push(__assign(__assign({}, cur), { positions: (_a = order.positions) === null || _a === void 0 ? void 0 : _a.map(function (pos) {
                                    return __assign(__assign({}, pos), { country: database_1.country });
                                }) }));
                        }
                    });
                    return acc;
                }, []);
                return addPositionsToDemands.reduce(function (acc, cur) {
                    acc.push((0, createSalesreturn_1.createSalesReturn)(cur));
                    return acc;
                }, []);
            }
        }
        if (salesreturn.length !== 0) {
            if (place === 'OZON') {
                var filteredOrders_3 = orders.filter(function (order) {
                    var _a, _b;
                    return ((_a = order.state) === null || _a === void 0 ? void 0 : _a.meta) === database_1.states.RETURNED.meta ||
                        ((_b = order.state) === null || _b === void 0 ? void 0 : _b.meta) === database_1.states.PARTIALLY_RETURNED.meta;
                });
                var updatedSalesreturn_1 = demands.reduce(function (acc, cur) {
                    salesreturn.forEach(function (returns) {
                        if (returns.name === cur.name) {
                            var updated = (0, createSalesreturn_1.createSalesReturn)(cur);
                            acc.push(__assign(__assign(__assign({}, returns), updated), { organization: returns.organization }));
                        }
                    });
                    return acc;
                }, []);
                var findNewDemands = demands.filter(function (demand) {
                    return updatedSalesreturn_1.every(function (sale) { return sale.name !== demand.name; });
                });
                var addPositionsToDemands = findNewDemands.reduce(function (acc, cur) {
                    filteredOrders_3.forEach(function (order) {
                        var _a;
                        if (order.name === cur.name) {
                            acc.push(__assign(__assign({}, cur), { positions: (_a = order.positions) === null || _a === void 0 ? void 0 : _a.map(function (pos) {
                                    return __assign(__assign({}, pos), { country: database_1.country });
                                }) }));
                        }
                    });
                    return acc;
                }, []);
                addPositionsToDemands.forEach(function (demand) {
                    updatedSalesreturn_1.push((0, createSalesreturn_1.createSalesReturn)(demand));
                });
                return updatedSalesreturn_1;
            }
            else {
                var filteredOrders_4 = orders.filter(function (order) {
                    var _a, _b, _c, _d;
                    return ((_a = order.state) === null || _a === void 0 ? void 0 : _a.meta) === database_1.states.CANCELLED.meta ||
                        ((_b = order.state) === null || _b === void 0 ? void 0 : _b.meta) ===
                            database_1.states.CANCELLED_IN_DELIVERY.meta ||
                        ((_c = order.state) === null || _c === void 0 ? void 0 : _c.meta) === database_1.states.RETURNED.meta ||
                        ((_d = order.state) === null || _d === void 0 ? void 0 : _d.meta) === database_1.states.PARTIALLY_RETURNED.meta;
                });
                var updatedSalesreturn_2 = demands.reduce(function (acc, cur) {
                    salesreturn.forEach(function (returns) {
                        if (returns.name === cur.name) {
                            var updated = (0, createSalesreturn_1.createSalesReturn)(cur);
                            acc.push(__assign(__assign(__assign({}, returns), updated), { organization: returns.organization }));
                        }
                    });
                    return acc;
                }, []);
                var findNewDemands = demands.filter(function (demand) {
                    return updatedSalesreturn_2.every(function (sale) { return sale.name !== demand.name; });
                });
                var addPositionsToDemands = findNewDemands.reduce(function (acc, cur) {
                    filteredOrders_4.forEach(function (order) {
                        var _a;
                        if (order.name === cur.name) {
                            acc.push(__assign(__assign({}, cur), { positions: (_a = order.positions) === null || _a === void 0 ? void 0 : _a.map(function (pos) {
                                    return __assign(__assign({}, pos), { country: database_1.country });
                                }) }));
                        }
                    });
                    return acc;
                }, []);
                addPositionsToDemands.forEach(function (demand) {
                    updatedSalesreturn_2.push((0, createSalesreturn_1.createSalesReturn)(demand));
                });
                return updatedSalesreturn_2;
            }
        }
    }
    catch (err) {
        logger_1.default.error(err);
    }
    return [];
};
exports.prepareSalesReturn = prepareSalesReturn;
