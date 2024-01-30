"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareOzonPositions = void 0;
var prepareOzonPositions = function (products, items, status) {
    return products.reduce(function (acc, cur) {
        items.forEach(function (item) {
            if (item.offer_id === cur.article) {
                acc.push({
                    quantity: item.quantity,
                    price: parseFloat(item.price) * 100,
                    discount: 0,
                    vat: 0,
                    assortment: {
                        meta: cur.meta,
                    },
                    reserve: status === 'awaiting_packaging' ? item.quantity : 0,
                });
            }
        });
        return acc;
    }, []);
};
exports.prepareOzonPositions = prepareOzonPositions;
