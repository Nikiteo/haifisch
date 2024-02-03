"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributes = void 0;
var prepareVolume = function (depth, width, height) {
    return "".concat(parseFloat((depth / 10).toFixed(2)), "x").concat(parseFloat((width / 10).toFixed(2)), "x").concat(parseFloat((height / 10).toFixed(2)));
};
var getAttributes = function (offer) {
    return [
        {
            meta: {
                href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/2b0c079d-9980-11ee-0a80-0ea300053894',
                type: 'attributemetadata',
                mediaType: 'application/json',
            },
            id: '2b0c079d-9980-11ee-0a80-0ea300053894',
            name: 'Название Озон',
            type: 'string',
            value: offer.name,
        },
        {
            meta: {
                href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/1edc5c8a-9981-11ee-0a80-0f640005706d',
                type: 'attributemetadata',
                mediaType: 'application/json',
            },
            id: '1edc5c8a-9981-11ee-0a80-0f640005706d',
            name: 'Размеры (ГШВ) Озон',
            type: 'string',
            value: prepareVolume(offer.depth, offer.width, offer.height),
        },
    ];
};
exports.getAttributes = getAttributes;
