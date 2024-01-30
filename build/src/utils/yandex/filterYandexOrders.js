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
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterYandexOrders = void 0;
var filterYandexOrders = function (orders, newOrders) {
    var ordersWithNewData = orders.reduce(function (acc, cur) {
        newOrders.forEach(function (newOrder) {
            if (newOrder.id === cur.id) {
                acc.push(__assign(__assign({}, cur), { delivery: newOrder.delivery, substatus: newOrder.substatus }));
            }
        });
        return acc;
    }, []);
    var filteredOrders = orders.filter(function (order) {
        return ordersWithNewData.every(function (newOrder) { return newOrder.id !== order.id; });
    });
    return {
        ordersWithNewData: ordersWithNewData,
        filteredOrders: filteredOrders,
    };
};
exports.filterYandexOrders = filterYandexOrders;
