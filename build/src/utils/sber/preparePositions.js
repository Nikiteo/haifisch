"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preparePositions = void 0;
var preparePositions = function (products, items, status) {
    return products.reduce(function (acc, cur) {
        items === null || items === void 0 ? void 0 : items.forEach(function (item) {
            if (item.offerId === cur.article) {
                acc.push({
                    quantity: item.quantity,
                    price: item.price * 100,
                    discount: 0,
                    vat: 0,
                    assortment: {
                        meta: cur.meta,
                    },
                    reserve: status === 'NEW' || status === 'CONFIRMED'
                        ? item.quantity
                        : 0,
                });
            }
        });
        return acc;
    }, []);
};
exports.preparePositions = preparePositions;
