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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOzon = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var logger_1 = __importDefault(require("../lib/logger"));
var demandController_1 = require("../services/moysklad/demandController");
var ordersController_1 = require("../services/moysklad/ordersController");
var paymentinController_1 = require("../services/moysklad/paymentinController");
var paymentoutController_1 = require("../services/moysklad/paymentoutController");
var productController_1 = require("../services/moysklad/productController");
var salesreturnController_1 = require("../services/moysklad/salesreturnController");
var orderController_1 = require("../services/ozon/orderController");
var productController_2 = require("../services/ozon/productController");
var returnsController_1 = require("../services/ozon/returnsController");
var ozonTypes_1 = require("../types/ozonTypes");
var prepareOzonCustomerOrder_1 = require("../utils/ozon/prepareOzonCustomerOrder");
var prepareOzonPaymentin_1 = require("../utils/ozon/prepareOzonPaymentin");
var prepareOzonPaymentout_1 = require("../utils/ozon/prepareOzonPaymentout");
var prepareDemands_1 = require("../utils/yandex/prepareDemands");
var prepareSalesreturn_1 = require("../utils/yandex/prepareSalesreturn");
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
var updateOzon = function (store, sendMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var dates, filter, ordersProps, products, customerOrders, fboOrders, fbsOrders, fboReturns_1, fbsReturns_1, articlesFromMS, prices, fboAfterReturns_1, fbsAfterReturns_1, filteredFboOrders, filteredFbsOrders, preparedCustomerOrders_1, createdCustomerOrders, demands, ordersForDemands, preparedDemands, newDemands, paymentins, preparedPaymentins, salesReturn, preparedSalesReturn, uniqReturns, newSalesReturns, paymentouts, preparedPaymentouts, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 19, , 20]);
                dates = {
                    dateFrom: (0, dayjs_1.default)()
                        .set('hour', 0)
                        .set('minute', 0)
                        .set('second', 0)
                        .set('milliseconds', 0)
                        .subtract(4, 'month')
                        .format('YYYY-MM-DD'),
                    dateTo: (0, dayjs_1.default)()
                        .set('hour', 0)
                        .set('minute', 0)
                        .set('second', 0)
                        .set('milliseconds', 0)
                        .add(1, 'month')
                        .format('YYYY-MM-DD'),
                };
                filter = {
                    since: (0, dayjs_1.default)()
                        .set('hour', 0)
                        .set('minute', 0)
                        .set('second', 0)
                        .set('milliseconds', 0)
                        .subtract(4, 'month')
                        .toISOString(),
                    to: (0, dayjs_1.default)()
                        .set('hour', 23)
                        .set('minute', 59)
                        .set('second', 59)
                        .set('milliseconds', 59)
                        .add(1, 'month')
                        .toISOString(),
                };
                ordersProps = {
                    dir: 'ASC',
                    filter: filter,
                    with: {
                        analytics_data: true,
                        barcodes: false,
                        financial_data: true,
                        translit: false,
                    },
                    limit: 1000,
                    offset: 0,
                };
                return [4 /*yield*/, (0, productController_1.getProducts)()];
            case 1:
                products = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u043C \u0438\u0437 \u041C\u0421..."));
                return [4 /*yield*/, (0, ordersController_1.getCustomerOrders)(dates)];
            case 2:
                customerOrders = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0430\u043C \u0438\u0437 \u041C\u0421..."));
                return [4 /*yield*/, (0, orderController_1.getOzonFboOrders)(ordersProps)];
            case 3:
                fboOrders = _c.sent();
                return [4 /*yield*/, (0, orderController_1.getOzonFbsOrders)(ordersProps)];
            case 4:
                fbsOrders = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0430\u043C \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430..."));
                return [4 /*yield*/, (0, returnsController_1.getOzonFboReturns)({
                        filter: {},
                        last_id: 0,
                        limit: 1000,
                    })];
            case 5:
                fboReturns_1 = _c.sent();
                return [4 /*yield*/, (0, returnsController_1.getOzonFbsReturns)({
                        filter: {},
                        last_id: 0,
                        limit: 1000,
                    })];
            case 6:
                fbsReturns_1 = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430\u043C \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430..."));
                articlesFromMS = products === null || products === void 0 ? void 0 : products.rows.map(function (row) { return row.article; });
                return [4 /*yield*/, (0, productController_2.getProductPrices)({
                        filter: {
                            offer_id: articlesFromMS !== null && articlesFromMS !== void 0 ? articlesFromMS : [],
                            visibility: 'ALL',
                        },
                        last_id: '',
                        limit: 1000,
                    })];
            case 7:
                prices = _c.sent();
                fboAfterReturns_1 = fboOrders === null || fboOrders === void 0 ? void 0 : fboOrders.result.reduce(function (acc, cur) {
                    fboReturns_1 === null || fboReturns_1 === void 0 ? void 0 : fboReturns_1.returns.forEach(function (item) {
                        if (item.posting_number === cur.posting_number) {
                            acc.push(__assign(__assign({}, cur), { status: ozonTypes_1.OrderStatusEnum.returned }));
                        }
                    });
                    return acc;
                }, []);
                fbsAfterReturns_1 = fbsOrders === null || fbsOrders === void 0 ? void 0 : fbsOrders.result.postings.reduce(function (acc, cur) {
                    fbsReturns_1 === null || fbsReturns_1 === void 0 ? void 0 : fbsReturns_1.returns.forEach(function (item) {
                        if (item.posting_number === cur.posting_number) {
                            acc.push(__assign(__assign({}, cur), { status: ozonTypes_1.OrderFbsOzonStatus.returned }));
                        }
                    });
                    return acc;
                }, []);
                filteredFboOrders = fboOrders === null || fboOrders === void 0 ? void 0 : fboOrders.result.filter(function (order) {
                    return fboAfterReturns_1 === null || fboAfterReturns_1 === void 0 ? void 0 : fboAfterReturns_1.every(function (fbo) { return fbo.posting_number !== order.posting_number; });
                });
                filteredFbsOrders = fbsOrders === null || fbsOrders === void 0 ? void 0 : fbsOrders.result.postings.filter(function (order) {
                    return fbsAfterReturns_1 === null || fbsAfterReturns_1 === void 0 ? void 0 : fbsAfterReturns_1.every(function (fbs) { return fbs.posting_number !== order.posting_number; });
                });
                preparedCustomerOrders_1 = (0, prepareOzonCustomerOrder_1.prepareOzonCustomerOrders)((_a = products === null || products === void 0 ? void 0 : products.rows) !== null && _a !== void 0 ? _a : [], __spreadArray(__spreadArray([], (filteredFboOrders !== null && filteredFboOrders !== void 0 ? filteredFboOrders : []), true), (fboAfterReturns_1 !== null && fboAfterReturns_1 !== void 0 ? fboAfterReturns_1 : []), true), __spreadArray(__spreadArray([], (filteredFbsOrders !== null && filteredFbsOrders !== void 0 ? filteredFbsOrders : []), true), (fbsAfterReturns_1 !== null && fbsAfterReturns_1 !== void 0 ? fbsAfterReturns_1 : []), true).filter(function (item) { return item.posting_number !== '0145992433-0031-1'; })
                    .filter(function (item) { return item.posting_number !== '28059370-0058-6'; })
                    .filter(function (item) { return item.posting_number !== '0122683245-0020-1'; }), customerOrders !== null && customerOrders !== void 0 ? customerOrders : [], (_b = prices === null || prices === void 0 ? void 0 : prices.result.items) !== null && _b !== void 0 ? _b : []);
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0437\u0430\u043A\u0430\u0437\u044B \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0435\u0439..."));
                return [4 /*yield*/, (0, ordersController_1.createCustomerOrder)(preparedCustomerOrders_1)];
            case 8:
                createdCustomerOrders = _c.sent();
                return [4 /*yield*/, (0, demandController_1.getDemands)(dates)];
            case 9:
                demands = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043E\u0442\u0433\u0440\u0443\u0437\u043E\u043A..."));
                ordersForDemands = createdCustomerOrders === null || createdCustomerOrders === void 0 ? void 0 : createdCustomerOrders.reduce(function (acc, cur) {
                    preparedCustomerOrders_1.forEach(function (order) {
                        if (order.name === cur.name) {
                            acc.push(__assign(__assign({}, order), { meta: cur.meta }));
                        }
                    });
                    return acc;
                }, []);
                preparedDemands = (0, prepareDemands_1.prepareDemands)(ordersForDemands !== null && ordersForDemands !== void 0 ? ordersForDemands : [], demands !== null && demands !== void 0 ? demands : [], 'OZON');
                return [4 /*yield*/, (0, demandController_1.createDemand)(preparedDemands)];
            case 10:
                newDemands = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043E\u0442\u0433\u0440\u0443\u0437\u043E\u043A..."));
                return [4 /*yield*/, (0, paymentinController_1.getPaymentin)(dates)];
            case 11:
                paymentins = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439..."));
                preparedPaymentins = (0, prepareOzonPaymentin_1.prepareOzonPaymentin)(newDemands !== null && newDemands !== void 0 ? newDemands : [], __spreadArray(__spreadArray([], (filteredFboOrders !== null && filteredFboOrders !== void 0 ? filteredFboOrders : []), true), (fboAfterReturns_1 !== null && fboAfterReturns_1 !== void 0 ? fboAfterReturns_1 : []), true), __spreadArray(__spreadArray([], (filteredFbsOrders !== null && filteredFbsOrders !== void 0 ? filteredFbsOrders : []), true), (fbsAfterReturns_1 !== null && fbsAfterReturns_1 !== void 0 ? fbsAfterReturns_1 : []), true).filter(function (item) { return item.posting_number !== '0145992433-0031-1'; })
                    .filter(function (item) { return item.posting_number !== '28059370-0058-6'; })
                    .filter(function (item) { return item.posting_number !== '0122683245-0020-1'; }), paymentins !== null && paymentins !== void 0 ? paymentins : []);
                return [4 /*yield*/, (0, paymentinController_1.createPaymentin)(preparedPaymentins)];
            case 12:
                _c.sent();
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439..."));
                return [4 /*yield*/, (0, salesreturnController_1.getSalesReturn)(dates)];
            case 13:
                salesReturn = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043E\u0432..."));
                preparedSalesReturn = (0, prepareSalesreturn_1.prepareSalesReturn)(newDemands !== null && newDemands !== void 0 ? newDemands : [], ordersForDemands !== null && ordersForDemands !== void 0 ? ordersForDemands : [], salesReturn !== null && salesReturn !== void 0 ? salesReturn : [], 'OZON');
                uniqReturns = preparedSalesReturn.reduce(function (acc, ret) {
                    if (ret.name !== undefined) {
                        if (acc.forEach[ret.name])
                            return acc;
                        acc.forEach[ret.name] = true;
                        acc.uniqReturns.push(ret);
                    }
                    return acc;
                }, {
                    forEach: {},
                    uniqReturns: [],
                }).uniqReturns;
                return [4 /*yield*/, (0, salesreturnController_1.createSalesReturn)(uniqReturns)];
            case 14:
                newSalesReturns = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043E\u0432..."));
                return [4 /*yield*/, (0, paymentoutController_1.getPaymentout)(dates)];
            case 15:
                paymentouts = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439..."));
                preparedPaymentouts = (0, prepareOzonPaymentout_1.prepareOzonPaymentout)(newSalesReturns !== null && newSalesReturns !== void 0 ? newSalesReturns : [], __spreadArray(__spreadArray([], (filteredFboOrders !== null && filteredFboOrders !== void 0 ? filteredFboOrders : []), true), (fboAfterReturns_1 !== null && fboAfterReturns_1 !== void 0 ? fboAfterReturns_1 : []), true), __spreadArray(__spreadArray([], (filteredFbsOrders !== null && filteredFbsOrders !== void 0 ? filteredFbsOrders : []), true), (fbsAfterReturns_1 !== null && fbsAfterReturns_1 !== void 0 ? fbsAfterReturns_1 : []), true).filter(function (item) { return item.posting_number !== '0145992433-0031-1'; })
                    .filter(function (item) { return item.posting_number !== '28059370-0058-6'; })
                    .filter(function (item) { return item.posting_number !== '0122683245-0020-1'; }), paymentouts !== null && paymentouts !== void 0 ? paymentouts : []);
                if (!(preparedPaymentouts.length > 0)) return [3 /*break*/, 17];
                return [4 /*yield*/, (0, paymentoutController_1.createPaymentout)(preparedPaymentouts)];
            case 16:
                _c.sent();
                _c.label = 17;
            case 17:
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439..."));
                return [4 /*yield*/, sendMessage("[".concat(store, "]: \u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D"))];
            case 18:
                _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D"));
                return [3 /*break*/, 20];
            case 19:
                err_1 = _c.sent();
                logger_1.default.error("[".concat(store, "]: ").concat(err_1));
                return [3 /*break*/, 20];
            case 20: return [2 /*return*/];
        }
    });
}); };
exports.updateOzon = updateOzon;
