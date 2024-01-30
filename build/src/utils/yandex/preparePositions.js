"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preparePositions = void 0;
var preparePositions = function (products, items, status) {
    return products.reduce(function (acc, cur) {
        items === null || items === void 0 ? void 0 : items.forEach(function (item) {
            if (item.shopSku === cur.article) {
                acc.push({
                    quantity: item.count,
                    price: item.prices.reduce(function (a, b) { return a + +b.costPerItem; }, 0) *
                        100,
                    discount: 0,
                    vat: 0,
                    assortment: {
                        meta: cur.meta,
                    },
                    reserve: status === 'PROCESSING' ||
                        status === 'RESERVED' ||
                        status === 'PENDING' ||
                        status === 'UNPAID'
                        ? item.count
                        : 0,
                });
            }
        });
        return acc;
    }, []);
};
exports.preparePositions = preparePositions;
