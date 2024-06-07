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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSber = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var logger_1 = __importDefault(require("../lib/logger"));
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
var orderController_1 = require("../services/megamarket/orderController");
var ordersController_1 = require("../services/moysklad/ordersController");
var productController_1 = require("../services/moysklad/productController");
var prepareCustomerOrders_1 = require("../utils/sber/prepareCustomerOrders");
var demandController_1 = require("../services/moysklad/demandController");
var prepareDemands_1 = require("../utils/yandex/prepareDemands");
var paymentinController_1 = require("../services/moysklad/paymentinController");
var preparePaymentins_1 = require("../utils/sber/preparePaymentins");
dayjs_1.default.extend(utc_1.default);
var updateSber = function (store, sendMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var dates, data, products, customerOrders, shipments, orders, preparedCustomerOrders_1, createdCustomerOrders, demands, ordersForDemands, preparedDemands, newDemands, preparedPaymentins, err_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 10, , 11]);
                dates = {
                    dateFrom: (0, dayjs_1.default)()
                        .set('hour', 0)
                        .set('minute', 0)
                        .set('second', 0)
                        .set('milliseconds', 0)
                        .subtract(2, 'month')
                        .format('YYYY-MM-DD'),
                    dateTo: (0, dayjs_1.default)()
                        .set('hour', 23)
                        .set('minute', 59)
                        .set('second', 59)
                        .set('milliseconds', 59)
                        .add(1, 'month')
                        .format('YYYY-MM-DD'),
                };
                data = {
                    meta: {},
                    data: {
                        token: (_a = process.env.MEGAMARKET_TOKEN) !== null && _a !== void 0 ? _a : '',
                        dateFrom: dates.dateFrom,
                        dateTo: dates.dateTo,
                        count: 100,
                        statuses: [
                            'NEW',
                            'CONFIRMED',
                            'PACKED',
                            'PACKING_EXPIRED',
                            'SHIPPED',
                            'DELIVERED',
                            'MERCHANT_CANCELED',
                            'CUSTOMER_CANCELED',
                        ],
                    },
                };
                return [4 /*yield*/, (0, productController_1.getProducts)()];
            case 1:
                products = _d.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u043C \u0438\u0437 \u041C\u0421..."));
                return [4 /*yield*/, (0, ordersController_1.getCustomerOrders)(dates)];
            case 2:
                customerOrders = _d.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0430\u043C \u0438\u0437 \u041C\u0421..."));
                return [4 /*yield*/, (0, orderController_1.getSberShipments)(data)];
            case 3:
                shipments = _d.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u043D\u043E\u043C\u0435\u0440\u0430 \u043E\u0442\u0433\u0440\u0443\u0437\u043E\u043A \u0438\u0437 \u041C\u0435\u0433\u0430\u043C\u0430\u0440\u043A\u0435\u0442\u0430..."));
                return [4 /*yield*/, (0, orderController_1.getSberOrders)({
                        meta: {},
                        data: {
                            token: (_b = process.env.MEGAMARKET_TOKEN) !== null && _b !== void 0 ? _b : '',
                            shipments: shipments !== null && shipments !== void 0 ? shipments : [],
                        },
                    })];
            case 4:
                orders = _d.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0438\u0437 \u041C\u0435\u0433\u0430\u043C\u0430\u0440\u043A\u0435\u0442\u0430..."));
                preparedCustomerOrders_1 = (0, prepareCustomerOrders_1.prepareCustomerOrders)((_c = products === null || products === void 0 ? void 0 : products.rows) !== null && _c !== void 0 ? _c : [], customerOrders !== null && customerOrders !== void 0 ? customerOrders : [], orders !== null && orders !== void 0 ? orders : []);
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0437\u0430\u043A\u0430\u0437\u044B \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0435\u0439..."));
                return [4 /*yield*/, (0, ordersController_1.createCustomerOrder)(preparedCustomerOrders_1)];
            case 5:
                createdCustomerOrders = _d.sent();
                return [4 /*yield*/, (0, demandController_1.getDemands)(dates)];
            case 6:
                demands = _d.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043E\u0442\u0433\u0440\u0443\u0437\u043E\u043A..."));
                ordersForDemands = createdCustomerOrders === null || createdCustomerOrders === void 0 ? void 0 : createdCustomerOrders.reduce(function (acc, cur) {
                    preparedCustomerOrders_1.forEach(function (order) {
                        if (order.name === cur.name) {
                            acc.push(__assign(__assign({}, order), { meta: cur.meta }));
                        }
                    });
                    return acc;
                }, []);
                preparedDemands = (0, prepareDemands_1.prepareDemands)(ordersForDemands !== null && ordersForDemands !== void 0 ? ordersForDemands : [], demands !== null && demands !== void 0 ? demands : [], 'SBER');
                return [4 /*yield*/, (0, demandController_1.createDemand)(preparedDemands)];
            case 7:
                newDemands = _d.sent();
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043E\u0442\u0433\u0440\u0443\u0437\u043E\u043A..."));
                preparedPaymentins = (0, preparePaymentins_1.preparePaymentin)(newDemands !== null && newDemands !== void 0 ? newDemands : [], orders !== null && orders !== void 0 ? orders : []);
                return [4 /*yield*/, (0, paymentinController_1.createPaymentin)(preparedPaymentins)];
            case 8:
                _d.sent();
                logger_1.default.info("[".concat(store, "]: \u0421\u043E\u0437\u0434\u0430\u044E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439..."));
                return [4 /*yield*/, sendMessage("[".concat(store, "]: \u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D"))];
            case 9:
                _d.sent();
                logger_1.default.info("[".concat(store, "]: \u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D"));
                return [3 /*break*/, 11];
            case 10:
                err_1 = _d.sent();
                logger_1.default.error("[".concat(store, "]: ").concat(err_1));
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.updateSber = updateSber;
