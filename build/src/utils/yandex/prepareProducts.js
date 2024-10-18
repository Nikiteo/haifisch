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
exports.prepareProducts = void 0;
var database_1 = require("../../database");
var createProduct_1 = require("./createProduct");
var getAttributes_1 = require("./getAttributes");
var prepareProducts = function (products, offers, domain) {
    if (products.length === 0 && offers.length === 0) {
        return [];
    }
    if (offers.length === 0) {
        return [];
    }
    if (products.length === 0) {
        return offers.reduce(function (acc, cur) {
            acc.push((0, createProduct_1.createProduct)(domain, cur));
            return acc;
        }, []);
    }
    if (products.length !== 0 && offers.length !== 0) {
        var updatedProducts_1 = offers.reduce(function (acc, cur) {
            products.forEach(function (prod) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                if (prod.article === cur.offer.offerId.toString()) {
                    acc.push(__assign(__assign({}, prod), { supplier: database_1.organization, salePrices: [
                            {
                                value: cur.offer.basicPrice.value * 100,
                                currency: database_1.currency,
                                priceType: domain === 'Haifisch'
                                    ? database_1.priceTypeHF
                                    : database_1.priceTypeTop,
                            },
                        ], attributes: (0, getAttributes_1.getAttributes)(domain, cur), volume: parseFloat((((_c = (_b = (_a = cur.offer) === null || _a === void 0 ? void 0 : _a.weightDimensions) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0 / 100) *
                            ((_f = (_e = (_d = cur.offer) === null || _d === void 0 ? void 0 : _d.weightDimensions) === null || _e === void 0 ? void 0 : _e.width) !== null && _f !== void 0 ? _f : 0 / 100) *
                            ((_j = (_h = (_g = cur.offer) === null || _g === void 0 ? void 0 : _g.weightDimensions) === null || _h === void 0 ? void 0 : _h.height) !== null && _j !== void 0 ? _j : 0 / 100)).toFixed(5)) }));
                }
            });
            return acc;
        }, []);
        var findNewProducts = offers.filter(function (offer) {
            return updatedProducts_1.every(function (item) { return item.article !== offer.offer.offerId; });
        });
        findNewProducts.forEach(function (cur) {
            updatedProducts_1.push((0, createProduct_1.createProduct)(domain, cur));
        });
        return updatedProducts_1;
    }
    return [];
};
exports.prepareProducts = prepareProducts;
