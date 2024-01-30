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
exports.createDemand = exports.createOverhadSum = void 0;
var database_1 = require("../../database");
var createOverhadSum = function (attributes, place) {
    var _a;
    if (attributes.filter(function (attribute) { return attribute.type === 'double'; }).length === 0) {
        return 0;
    }
    if (place === 'OZON') {
        return parseFloat((parseFloat(parseFloat(((_a = attributes.find(function (attribute) {
            return attribute.id ===
                '279ba9fa-9d67-11ee-0a80-09f500178da3';
        })) === null || _a === void 0 ? void 0 : _a.value) || 0).toFixed(2)) * 100).toFixed(2));
    }
    var sumOfComissions = attributes
        .filter(function (attribute) { return attribute.type === 'double'; })
        .filter(function (attribute) { return attribute.id !== '2d77bca0-974b-11ee-0a80-146900276f3a'; })
        .filter(function (attribute) { return attribute.id !== '279ba9fa-9d67-11ee-0a80-09f500178da3'; })
        .map(function (attribute) { return attribute.value; })
        .reduce(function (acc, cur) {
        return parseFloat((acc + cur).toFixed(2));
    }, 0);
    return parseFloat((sumOfComissions * 100).toFixed(2));
};
exports.createOverhadSum = createOverhadSum;
var createDemand = function (order, place) {
    var meta = order.meta, id = order.id, accountId = order.accountId, applicable = order.applicable, attributes = order.attributes, owner = order.owner, organizationAccount = order.organizationAccount, deliveryPlannedMoment = order.deliveryPlannedMoment, externalCode = order.externalCode, syncId = order.syncId, updated = order.updated, state = order.state, sum = order.sum, agentAccount = order.agentAccount, created = order.created, printed = order.printed, published = order.published, reservedSum = order.reservedSum, payedSum = order.payedSum, shippedSum = order.shippedSum, invoicedSum = order.invoicedSum, rest = __rest(order, ["meta", "id", "accountId", "applicable", "attributes", "owner", "organizationAccount", "deliveryPlannedMoment", "externalCode", "syncId", "updated", "state", "sum", "agentAccount", "created", "printed", "published", "reservedSum", "payedSum", "shippedSum", "invoicedSum"]);
    return __assign(__assign({}, rest), { customerOrder: {
            meta: order.meta,
        }, overhead: {
            sum: order.attributes !== undefined
                ? (0, exports.createOverhadSum)(order.attributes, place)
                : 0,
            distribution: 'price',
        }, consignee: database_1.consignee, carrier: place === 'OZON' ? database_1.ozonAgent : database_1.carrier, moment: order.deliveryPlannedMoment });
};
exports.createDemand = createDemand;
