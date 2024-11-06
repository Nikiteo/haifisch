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
var prepareStore = function (project) {
    switch (project === null || project === void 0 ? void 0 : project.meta.href) {
        case database_1.fbyTopProject.meta.href:
            return database_1.fbyTopRefund;
        case database_1.fbyHfProject.meta.href:
            return database_1.fbyHfRefund;
        case database_1.fbsTopProject.meta.href:
            return database_1.fbsTopRefund;
        case database_1.fbsHfProject.meta.href:
            return database_1.fbsHfRefund;
        case database_1.fboOzonProject.meta.href:
            return database_1.fboOzonRefund;
        case database_1.fbosOzonProject.meta.href:
            return database_1.sourceStore;
    }
};
var createSalesReturn = function (demand) {
    var _a, _b, _c;
    var meta = demand.meta, id = demand.id, accountId = demand.accountId, applicable = demand.applicable, owner = demand.owner, externalCode = demand.externalCode, updated = demand.updated, sum = demand.sum, created = demand.created, printed = demand.printed, published = demand.published, payedSum = demand.payedSum, carrier = demand.carrier, consignee = demand.consignee, customerOrder = demand.customerOrder, shipmentAddressFull = demand.shipmentAddressFull, overhead = demand.overhead, payments = demand.payments, rest = __rest(demand
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    , ["meta", "id", "accountId", "applicable", "owner", "externalCode", "updated", "sum", "created", "printed", "published", "payedSum", "carrier", "consignee", "customerOrder", "shipmentAddressFull", "overhead", "payments"]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return __assign(__assign({}, rest), { demand: {
            meta: demand.meta,
        }, moment: (_c = (_b = (_a = demand.attributes) === null || _a === void 0 ? void 0 : _a.find(function (attribute) {
            return attribute.id === '807c3874-9100-11ef-0a80-0de10004c634';
        })) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : demand.moment, store: prepareStore(demand.project) });
};
exports.createSalesReturn = createSalesReturn;
