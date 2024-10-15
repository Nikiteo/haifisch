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
exports.updateYandex = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var logger_1 = __importDefault(require("../lib/logger"));
var demandController_1 = require("../services/moysklad/demandController");
var ordersController_1 = require("../services/moysklad/ordersController");
var paymentinController_1 = require("../services/moysklad/paymentinController");
var paymentoutController_1 = require("../services/moysklad/paymentoutController");
var productController_1 = require("../services/moysklad/productController");
var salesreturnController_1 = require("../services/moysklad/salesreturnController");
var campaignController_1 = require("../services/yandex/campaignController");
var orderController_1 = require("../services/yandex/orderController");
var orderNewController_1 = require("../services/yandex/orderNewController");
var filterYandexOrders_1 = require("../utils/yandex/filterYandexOrders");
var getCampaignIds_1 = require("../utils/yandex/getCampaignIds");
var prepareCustomerOrders_1 = require("../utils/yandex/prepareCustomerOrders");
var prepareDemands_1 = require("../utils/yandex/prepareDemands");
var preparePaymentin_1 = require("../utils/yandex/preparePaymentin");
var preparePaymentout_1 = require("../utils/yandex/preparePaymentout");
var prepareSalesreturn_1 = require("../utils/yandex/prepareSalesreturn");
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
var moveController_1 = require("../services/moysklad/moveController");
var returnsController_1 = require("../services/yandex/returnsController");
var prepareMoves_1 = require("../utils/yandex/prepareMoves");
dayjs_1.default.extend(utc_1.default);
var updateYandex = function (store, sendMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var dates, products, customerOrders, campaigns, campaignIds, fbsOrders, fbyOrders, fbsNewOrders, fbyNewOrders, _a, fbsOrdersWithNewData, fbsFilteredOrders, _b, fbyOrdersWithNewData, fbyFilteredOrders, fby, fbs, domain, preparedCustomerOrders_1, createdCustomerOrders, demands, ordersForDemands, preparedDemands, newDemands, paymentins, preparedPaymentins, salesReturn, preparedSalesReturn, newSalesReturns, paymentouts, preparedPaymentouts, moves_1, returns, pickedReturns, filteredReturns, preparedMoves, err_1;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 24, , 25]);
                dates = {
                    dateFrom: (0, dayjs_1.default)()
                        .set('hour', 0)
                        .set('minute', 0)
                        .set('second', 0)
                        .set('milliseconds', 0)
                        .subtract(1, 'month')
                        .format('YYYY-MM-DD'),
                    dateTo: (0, dayjs_1.default)()
                        .set('hour', 23)
                        .set('minute', 59)
                        .set('second', 59)
                        .set('milliseconds', 59)
                        .add(1, 'month')
                        .format('YYYY-MM-DD'),
                };
                logger_1.default.info("[".concat(store, "]: ").concat(dates.dateFrom, " - ").concat(dates.dateTo));
                return [4 /*yield*/, (0, productController_1.getProducts)()];
            case 1:
                products = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u043C \u0438\u0437 \u041C\u0421..."));
                return [4 /*yield*/, (0, ordersController_1.getCustomerOrders)(dates)];
            case 2:
                customerOrders = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0430\u043C \u0438\u0437 \u041C\u0421..."));
                return [4 /*yield*/, (0, campaignController_1.getCampaigns)(store)];
            case 3:
                campaigns = _e.sent();
                campaignIds = (0, getCampaignIds_1.getCampaignIds)(campaigns === null || campaigns === void 0 ? void 0 : campaigns.campaigns);
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F\u043C \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430..."));
                if (!(campaignIds !== undefined && campaigns !== undefined)) return [3 /*break*/, 23];
                return [4 /*yield*/, (0, orderController_1.getOrders)(store, campaignIds.FBS, dates)];
            case 4:
                fbsOrders = _e.sent();
                return [4 /*yield*/, (0, orderController_1.getOrders)(store, campaignIds.FBY, dates)];
            case 5:
                fbyOrders = _e.sent();
                return [4 /*yield*/, (0, orderNewController_1.getNewOrders)(store, campaignIds.FBS)];
            case 6:
                fbsNewOrders = _e.sent();
                return [4 /*yield*/, (0, orderNewController_1.getNewOrders)(store, campaignIds.FBY)];
            case 7:
                fbyNewOrders = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0430\u043C \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430..."));
                _a = (0, filterYandexOrders_1.filterYandexOrders)(fbsOrders, fbsNewOrders), fbsOrdersWithNewData = _a.ordersWithNewData, fbsFilteredOrders = _a.filteredOrders;
                _b = (0, filterYandexOrders_1.filterYandexOrders)(fbyOrders, fbyNewOrders), fbyOrdersWithNewData = _b.ordersWithNewData, fbyFilteredOrders = _b.filteredOrders;
                fby = __spreadArray(__spreadArray([], fbyOrdersWithNewData, true), fbyFilteredOrders, true);
                fbs = __spreadArray(__spreadArray([], fbsOrdersWithNewData, true), fbsFilteredOrders, true);
                domain = campaigns.campaigns[0].domain;
                preparedCustomerOrders_1 = (0, prepareCustomerOrders_1.prepareCustomerOrders)((_c = products === null || products === void 0 ? void 0 : products.rows) !== null && _c !== void 0 ? _c : [], fby, fbs, customerOrders !== null && customerOrders !== void 0 ? customerOrders : [], domain);
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0437\u0430\u043A\u0430\u0437\u044B \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0435\u0439..."));
                return [4 /*yield*/, (0, ordersController_1.createCustomerOrder)(preparedCustomerOrders_1)];
            case 8:
                createdCustomerOrders = _e.sent();
                return [4 /*yield*/, (0, demandController_1.getDemands)(dates)];
            case 9:
                demands = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043E\u0442\u0433\u0440\u0443\u0437\u043E\u043A..."));
                ordersForDemands = createdCustomerOrders === null || createdCustomerOrders === void 0 ? void 0 : createdCustomerOrders.reduce(function (acc, cur) {
                    preparedCustomerOrders_1.forEach(function (order) {
                        if (order.name === cur.name) {
                            acc.push(__assign(__assign({}, order), { meta: cur.meta }));
                        }
                    });
                    return acc;
                }, []);
                preparedDemands = (0, prepareDemands_1.prepareDemands)(ordersForDemands !== null && ordersForDemands !== void 0 ? ordersForDemands : [], demands !== null && demands !== void 0 ? demands : []);
                return [4 /*yield*/, (0, demandController_1.createDemand)(preparedDemands)];
            case 10:
                newDemands = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043E\u0442\u0433\u0440\u0443\u0437\u043E\u043A..."));
                return [4 /*yield*/, (0, paymentinController_1.getPaymentin)(dates)];
            case 11:
                paymentins = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439..."));
                preparedPaymentins = (0, preparePaymentin_1.preparePaymentin)(newDemands !== null && newDemands !== void 0 ? newDemands : [], __spreadArray(__spreadArray([], (fbyOrders !== null && fbyOrders !== void 0 ? fbyOrders : []), true), (fbsOrders !== null && fbsOrders !== void 0 ? fbsOrders : []), true), paymentins !== null && paymentins !== void 0 ? paymentins : []);
                return [4 /*yield*/, (0, paymentinController_1.createPaymentin)(preparedPaymentins)];
            case 12:
                _e.sent();
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439..."));
                return [4 /*yield*/, (0, salesreturnController_1.getSalesReturn)(dates)];
            case 13:
                salesReturn = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043E\u0432..."));
                preparedSalesReturn = (0, prepareSalesreturn_1.prepareSalesReturn)(newDemands !== null && newDemands !== void 0 ? newDemands : [], ordersForDemands !== null && ordersForDemands !== void 0 ? ordersForDemands : [], salesReturn !== null && salesReturn !== void 0 ? salesReturn : []);
                return [4 /*yield*/, (0, salesreturnController_1.createSalesReturn)(preparedSalesReturn)];
            case 14:
                newSalesReturns = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043E\u0432..."));
                return [4 /*yield*/, (0, paymentoutController_1.getPaymentout)(dates)];
            case 15:
                paymentouts = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439..."));
                preparedPaymentouts = (0, preparePaymentout_1.preparePaymentout)(newSalesReturns !== null && newSalesReturns !== void 0 ? newSalesReturns : [], __spreadArray(__spreadArray([], (fbyOrders !== null && fbyOrders !== void 0 ? fbyOrders : []), true), (fbsOrders !== null && fbsOrders !== void 0 ? fbsOrders : []), true), paymentouts !== null && paymentouts !== void 0 ? paymentouts : []);
                if (!(preparedPaymentouts.length > 0)) return [3 /*break*/, 17];
                return [4 /*yield*/, (0, paymentoutController_1.createPaymentout)(preparedPaymentouts)];
            case 16:
                _e.sent();
                _e.label = 17;
            case 17:
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439..."));
                return [4 /*yield*/, (0, moveController_1.getMoves)()];
            case 18:
                moves_1 = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0438\u0437 \u041C\u0421..."));
                return [4 /*yield*/, (0, returnsController_1.getReturns)(store, campaignIds.FBS)];
            case 19:
                returns = _e.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u044B \u0438\u0437 \u041C\u0421..."));
                pickedReturns = returns === null || returns === void 0 ? void 0 : returns.filter(function (r) { return r.shipmentStatus === 'PICKED'; });
                filteredReturns = pickedReturns === null || pickedReturns === void 0 ? void 0 : pickedReturns.filter(function (ret) {
                    return moves_1 === null || moves_1 === void 0 ? void 0 : moves_1.every(function (move) { return move.name !== ret.orderId.toString(); });
                });
                preparedMoves = (0, prepareMoves_1.prepareMoves)(domain, filteredReturns !== null && filteredReturns !== void 0 ? filteredReturns : [], (_d = products === null || products === void 0 ? void 0 : products.rows) !== null && _d !== void 0 ? _d : []);
                if (!(preparedMoves.length > 0)) return [3 /*break*/, 21];
                return [4 /*yield*/, (0, moveController_1.createMove)(preparedMoves)];
            case 20:
                _e.sent();
                _e.label = 21;
            case 21:
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0439..."));
                return [4 /*yield*/, sendMessage("[".concat(store, "]: \u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D"))];
            case 22:
                _e.sent();
                logger_1.default.info("[".concat(store, "]: \u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D"));
                _e.label = 23;
            case 23: return [3 /*break*/, 25];
            case 24:
                err_1 = _e.sent();
                logger_1.default.error("[".concat(store, "]: ").concat(err_1));
                return [3 /*break*/, 25];
            case 25: return [2 /*return*/];
        }
    });
}); };
exports.updateYandex = updateYandex;
