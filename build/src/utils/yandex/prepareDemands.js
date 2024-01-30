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
exports.prepareDemands = void 0;
var database_1 = require("../../database");
var logger_1 = __importDefault(require("../../lib/logger"));
var createDemand_1 = require("./createDemand");
var prepareDemands = function (orders, demands, place) {
    try {
        if (orders.length === 0 && demands.length === 0) {
            return [];
        }
        if (demands.length === 0) {
            var filteredOrders = orders.filter(function (order) {
                var _a, _b, _c;
                return ((_a = order.state) === null || _a === void 0 ? void 0 : _a.meta) !== database_1.states.NEW.meta &&
                    ((_b = order.state) === null || _b === void 0 ? void 0 : _b.meta) !== database_1.states.PROCESSING.meta &&
                    ((_c = order.state) === null || _c === void 0 ? void 0 : _c.meta) !== database_1.states.CANCELLED.meta;
            });
            if (place === 'OZON') {
                var withOutCancel = filteredOrders.filter(function (order) { var _a; return ((_a = order.state) === null || _a === void 0 ? void 0 : _a.meta) !== database_1.states.CANCELLED.meta; });
                return withOutCancel.reduce(function (acc, cur) {
                    acc.push((0, createDemand_1.createDemand)(cur, place));
                    return acc;
                }, []);
            }
            return filteredOrders.reduce(function (acc, cur) {
                acc.push((0, createDemand_1.createDemand)(cur, place));
                return acc;
            }, []);
        }
        if (demands.length !== 0) {
            var filteredOrders = orders.filter(function (order) {
                var _a, _b, _c;
                return ((_a = order.state) === null || _a === void 0 ? void 0 : _a.meta) !== database_1.states.NEW.meta &&
                    ((_b = order.state) === null || _b === void 0 ? void 0 : _b.meta) !== database_1.states.PROCESSING.meta &&
                    ((_c = order.state) === null || _c === void 0 ? void 0 : _c.meta) !== database_1.states.CANCELLED.meta;
            });
            if (place === 'OZON') {
                var withOutCancel = filteredOrders.filter(function (order) { var _a; return ((_a = order.state) === null || _a === void 0 ? void 0 : _a.meta) !== database_1.states.CANCELLED.meta; });
                var updatedDemands_1 = withOutCancel.reduce(function (acc, cur) {
                    demands.forEach(function (demand) {
                        if (demand.name === cur.name) {
                            var updateDemand = (0, createDemand_1.createDemand)(cur, place);
                            acc.push(__assign(__assign({}, demand), updateDemand));
                        }
                    });
                    return acc;
                }, []);
                var findNewOrders_1 = withOutCancel.filter(function (order) {
                    return updatedDemands_1.every(function (demand) { return demand.name !== order.name; });
                });
                findNewOrders_1.forEach(function (order) {
                    updatedDemands_1.push((0, createDemand_1.createDemand)(order, place));
                });
                return updatedDemands_1;
            }
            var updatedDemands_2 = filteredOrders.reduce(function (acc, cur) {
                demands.forEach(function (demand) {
                    if (demand.name === cur.name) {
                        var updateDemand = (0, createDemand_1.createDemand)(cur, place);
                        acc.push(__assign(__assign({}, demand), updateDemand));
                    }
                });
                return acc;
            }, []);
            var findNewOrders = filteredOrders.filter(function (order) {
                return updatedDemands_2.every(function (demand) { return demand.name !== order.name; });
            });
            findNewOrders.forEach(function (order) {
                updatedDemands_2.push((0, createDemand_1.createDemand)(order, place));
            });
            return updatedDemands_2;
        }
    }
    catch (err) {
        logger_1.default.error(err);
    }
    return [];
};
exports.prepareDemands = prepareDemands;
