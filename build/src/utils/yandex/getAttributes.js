"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributes = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
(0, dayjs_1.default)().format();
var getAttributes = function (domain, offer) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    if (domain === 'Haifisch') {
        return [
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/47e81023-9269-11ee-0a80-022f00336d0c',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                name: 'Название ХФ',
                value: offer.offer.name,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/e94ca09b-9269-11ee-0a80-0fee00353147',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                name: 'Размеры (ДШВ) ХФ',
                value: "".concat((_c = (_b = (_a = offer.offer) === null || _a === void 0 ? void 0 : _a.weightDimensions) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0, "x").concat((_f = (_e = (_d = offer.offer) === null || _d === void 0 ? void 0 : _d.weightDimensions) === null || _e === void 0 ? void 0 : _e.width) !== null && _f !== void 0 ? _f : 0, "x").concat((_j = (_h = (_g = offer.offer) === null || _g === void 0 ? void 0 : _g.weightDimensions) === null || _h === void 0 ? void 0 : _h.height) !== null && _j !== void 0 ? _j : 0),
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/d2655ad2-928a-11ee-0a80-1128003e59bc',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                name: 'Категория',
                value: offer.mapping.marketCategoryName,
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/240e9535-94de-11ee-0a80-146400228e0e',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: '240e9535-94de-11ee-0a80-146400228e0e',
                name: 'Дата изготовление',
                type: 'time',
                value: (0, dayjs_1.default)()
                    .subtract(2, 'month')
                    .format('YYYY-MM-DD HH:mm:ss.SSS'),
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/dee3a537-94dd-11ee-0a80-03920020a493',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                id: 'dee3a537-94dd-11ee-0a80-03920020a493',
                name: 'Изготовитель',
                type: 'string',
                value: 'Мастерская “Haifisch”, Москва, ул.Артюхиной д.4, склад №1',
            },
            {
                meta: {
                    href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/b5ece328-928b-11ee-0a80-016c003fe4de',
                    type: 'attributemetadata',
                    mediaType: 'application/json',
                },
                name: 'Цена софинансирования от Маркета',
                value: (_l = (_k = offer.offer.cofinancePrice) === null || _k === void 0 ? void 0 : _k.value.toString()) !== null && _l !== void 0 ? _l : '0',
            },
        ];
    }
    return [
        {
            meta: {
                href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/47e80e11-9269-11ee-0a80-022f00336d0b',
                type: 'attributemetadata',
                mediaType: 'application/json',
            },
            name: 'Название Тор',
            value: offer.offer.name,
        },
        {
            meta: {
                href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/240e9535-94de-11ee-0a80-146400228e0e',
                type: 'attributemetadata',
                mediaType: 'application/json',
            },
            id: '240e9535-94de-11ee-0a80-146400228e0e',
            name: 'Дата изготовление',
            type: 'time',
            value: (0, dayjs_1.default)()
                .subtract(2, 'month')
                .format('YYYY-MM-DD HH:mm:ss.SSS'),
        },
        {
            meta: {
                href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/dee3a537-94dd-11ee-0a80-03920020a493',
                type: 'attributemetadata',
                mediaType: 'application/json',
            },
            id: 'dee3a537-94dd-11ee-0a80-03920020a493',
            name: 'Изготовитель',
            type: 'string',
            value: 'Мастерская “Haifisch”, Москва, ул.Артюхиной д.4, склад №1',
        },
        {
            meta: {
                href: 'https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/946807ab-997b-11ee-0a80-017d000443c5',
                type: 'attributemetadata',
                mediaType: 'application/json',
            },
            id: '946807ab-997b-11ee-0a80-017d000443c5',
            name: 'Размеры (ДШВ) Тор',
            type: 'string',
            value: "".concat((_p = (_o = (_m = offer.offer) === null || _m === void 0 ? void 0 : _m.weightDimensions) === null || _o === void 0 ? void 0 : _o.length) !== null && _p !== void 0 ? _p : 0, "x").concat((_s = (_r = (_q = offer.offer) === null || _q === void 0 ? void 0 : _q.weightDimensions) === null || _r === void 0 ? void 0 : _r.width) !== null && _s !== void 0 ? _s : 0, "x").concat((_v = (_u = (_t = offer.offer) === null || _t === void 0 ? void 0 : _t.weightDimensions) === null || _u === void 0 ? void 0 : _u.height) !== null && _v !== void 0 ? _v : 0),
        },
    ];
};
exports.getAttributes = getAttributes;
