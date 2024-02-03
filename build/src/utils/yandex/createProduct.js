"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
var database_1 = require("../../database");
var getAttributes_1 = require("./getAttributes");
var createProduct = function (domain, offer) {
    return {
        name: offer.offer.name,
        description: offer.offer.description,
        group: database_1.group,
        shared: true,
        pathName: '',
        code: offer.offer.offerId,
        externalCode: offer.offer.offerId,
        archived: false,
        effectiveVat: 0,
        effectiveVatEnabled: false,
        vat: 0,
        vatEnabled: false,
        useParentVat: false,
        uom: database_1.uom,
        productFolder: database_1.productFolder.meta,
        minPrice: {
            value: 0,
            currency: database_1.currency,
        },
        salePrices: [
            {
                value: offer.offer.basicPrice.value * 100,
                currency: database_1.currency,
                priceType: domain === 'Haifisch' ? database_1.priceTypeHF : database_1.priceTypeTop,
            },
        ],
        buyPrice: {
            value: 0,
            currency: database_1.currency,
        },
        barcodes: [
            {
                ean13: offer.offer.barcodes[0].toString(),
            },
        ],
        supplier: database_1.hfSupplier,
        attributes: (0, getAttributes_1.getAttributes)(domain, offer),
        paymentItemType: 'GOOD',
        discountProhibited: false,
        country: database_1.country,
        article: offer.offer.offerId,
        weight: offer.offer.weightDimensions.weight,
        volume: parseFloat(((offer.offer.weightDimensions.length / 100) *
            (offer.offer.weightDimensions.width / 100) *
            (offer.offer.weightDimensions.height / 100)).toFixed(5)),
        variantsCount: 0,
        isSerialTrackable: false,
        trackingType: 'NOT_TRACKED',
    };
};
exports.createProduct = createProduct;
