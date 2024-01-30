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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSalesReturn = void 0;
var database_1 = require("../../database");
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
var prepareStore = function (store) {
    if ((store === null || store === void 0 ? void 0 : store.meta.href) === database_1.fbyTopStore.meta.href) {
        return database_1.fbyTopRefund;
    }
    if ((store === null || store === void 0 ? void 0 : store.meta.href) === database_1.fbyHfStore.meta.href) {
        return database_1.fbyHfRefund;
    }
    if ((store === null || store === void 0 ? void 0 : store.meta.href) === database_1.fbsTopStore.meta.href) {
        return database_1.fbsTopRefund;
    }
    if ((store === null || store === void 0 ? void 0 : store.meta.href) === database_1.fbsHfStore.meta.href) {
        return database_1.fbsHfRefund;
    }
    if ((store === null || store === void 0 ? void 0 : store.meta.href) === database_1.fboOzonStore.meta.href) {
        return database_1.fboOzonRefund;
    }
    if ((store === null || store === void 0 ? void 0 : store.meta.href) === database_1.fbsOzonStore.meta.href) {
        return database_1.fbsOzonRefund;
    }
};
var createSalesReturn = function (demand) {
    var meta = demand.meta, id = demand.id, accountId = demand.accountId, applicable = demand.applicable, owner = demand.owner, externalCode = demand.externalCode, updated = demand.updated, sum = demand.sum, created = demand.created, printed = demand.printed, published = demand.published, payedSum = demand.payedSum, carrier = demand.carrier, consignee = demand.consignee, customerOrder = demand.customerOrder, shipmentAddressFull = demand.shipmentAddressFull, overhead = demand.overhead, payments = demand.payments, rest = __rest(demand
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    , ["meta", "id", "accountId", "applicable", "owner", "externalCode", "updated", "sum", "created", "printed", "published", "payedSum", "carrier", "consignee", "customerOrder", "shipmentAddressFull", "overhead", "payments"]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return __assign(__assign({}, rest), { demand: {
            meta: demand.meta,
        }, store: prepareStore(demand.store) });
};
exports.createSalesReturn = createSalesReturn;
