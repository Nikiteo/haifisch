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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOzon = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
var dayjs_1 = __importDefault(require("dayjs"));
var logger_1 = __importDefault(require("../lib/logger"));
var productController_1 = require("../services/moysklad/productController");
var returnsController_1 = require("../services/ozon/returnsController");
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
var prepareOzonMoves_1 = require("../utils/ozon/prepareOzonMoves");
var moveController_1 = require("../services/moysklad/moveController");
dayjs_1.default.extend(utc_1.default);
var updateOzon = function (store, sendMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var products, fbsReturns, moves_1, filteredReturns, returnsForMoves, preparedOzonMoves, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                return [4 /*yield*/, (0, productController_1.getProducts)()
                    // Logger.info(`[${store}]: Получены данные по продуктам из МС...`)
                    // const customerOrders = await getCustomerOrders(dates)
                    // Logger.info(`[${store}]: Получены данные по заказам из МС...`)
                    // const fboOrders = await getOzonFboOrders(ordersProps)
                    // const fbsOrders = await getOzonFbsOrders(ordersProps)
                    // Logger.info(`[${store}]: Получены данные по заказам магазина...`)
                    // const fboReturns = await getOzonFboReturns({
                    // 	filter: {},
                    // 	last_id: 0,
                    // 	limit: 1000,
                    // })
                ];
            case 1:
                products = _c.sent();
                return [4 /*yield*/, (0, returnsController_1.getOzonFbsReturns)({
                        filter: {},
                        last_id: 0,
                        limit: 1000,
                    })
                    // Logger.info(`[${store}]: Получены данные по возвратам магазина...`)
                    // const fboAfterReturns = fboOrders?.result.reduce<FboOrder[]>(
                    // 	(acc, cur) => {
                    // 		fboReturns?.returns.forEach(item => {
                    // 			if (item.posting_number === cur.posting_number) {
                    // 				acc.push({
                    // 					...cur,
                    // 					status: OrderStatusEnum.returned,
                    // 				})
                    // 			}
                    // 		})
                    // 		return acc
                    // 	},
                    // 	[]
                    // )
                    // const fbsAfterReturns = fbsOrders?.result.postings.reduce<Posting[]>(
                    // 	(acc, cur) => {
                    // 		fbsReturns?.returns.forEach(item => {
                    // 			if (item.posting_number === cur.posting_number) {
                    // 				acc.push({
                    // 					...cur,
                    // 					status: OrderFbsOzonStatus.returned,
                    // 				})
                    // 			}
                    // 		})
                    // 		return acc
                    // 	},
                    // 	[]
                    // )
                    // const filteredFboOrders = fboOrders?.result.filter(order =>
                    // 	fboAfterReturns?.every(
                    // 		fbo => fbo.posting_number !== order.posting_number
                    // 	)
                    // )
                    // const filteredFbsOrders = fbsOrders?.result.postings.filter(order =>
                    // 	fbsAfterReturns?.every(
                    // 		fbs => fbs.posting_number !== order.posting_number
                    // 	)
                    // )
                    // const transactions = await getTransactions(transactionsProps)
                    // const preparedCustomerOrders = prepareOzonCustomerOrders(
                    // 	products?.rows ?? [],
                    // 	[...(filteredFboOrders ?? []), ...(fboAfterReturns ?? [])],
                    // 	[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])]
                    // 		.filter(item => item.posting_number !== '0145992433-0031-1')
                    // 		.filter(item => item.posting_number !== '28059370-0058-6')
                    // 		.filter(item => item.posting_number !== '0122683245-0020-1'),
                    // 	customerOrders ?? [],
                    // 	transactions ?? []
                    // )
                    // Logger.info(`[${store}]: Создаю заказы покупателей...`)
                    // const createdCustomerOrders = await createCustomerOrder(
                    // 	preparedCustomerOrders
                    // )
                    // const demands = await getDemands(dates)
                    // Logger.info(`[${store}]: Получаю документы отгрузок...`)
                    // const ordersForDemands = createdCustomerOrders?.reduce<CustomerOrder[]>(
                    // 	(acc, cur) => {
                    // 		preparedCustomerOrders.forEach(order => {
                    // 			if (order.name === cur.name) {
                    // 				acc.push({
                    // 					...order,
                    // 					meta: cur.meta,
                    // 				})
                    // 			}
                    // 		})
                    // 		return acc
                    // 	},
                    // 	[]
                    // )
                    // const preparedDemands = prepareDemands(
                    // 	ordersForDemands ?? [],
                    // 	demands ?? [],
                    // 	'OZON'
                    // )
                    // const newDemands = await createDemand(preparedDemands)
                    // Logger.info(`[${store}]: Создаю документы отгрузок...`)
                    // const paymentins = await getPaymentin(dates)
                    // Logger.info(`[${store}]: Получаю документы входящих платежей...`)
                    // const preparedPaymentins = prepareOzonPaymentin(
                    // 	newDemands ?? [],
                    // 	[...(filteredFboOrders ?? []), ...(fboAfterReturns ?? [])],
                    // 	[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])]
                    // 		.filter(item => item.posting_number !== '0145992433-0031-1')
                    // 		.filter(item => item.posting_number !== '28059370-0058-6')
                    // 		.filter(item => item.posting_number !== '0122683245-0020-1'),
                    // 	paymentins ?? []
                    // )
                    // await createPaymentin(preparedPaymentins)
                    // Logger.info(`[${store}]: Создаю документы входящих платежей...`)
                    // const salesReturn = await getSalesReturn(dates)
                    // Logger.info(`[${store}]: Получаю документы возвратов...`)
                    // const preparedSalesReturn = prepareSalesReturn(
                    // 	newDemands ?? [],
                    // 	ordersForDemands ?? [],
                    // 	salesReturn ?? [],
                    // 	'OZON'
                    // )
                    // const uniqReturns = preparedSalesReturn.reduce(
                    // 	(acc, ret) => {
                    // 		if (ret.name !== undefined) {
                    // 			if (acc.forEach[ret.name]) return acc
                    // 			acc.forEach[ret.name] = true
                    // 			acc.uniqReturns.push(ret)
                    // 		}
                    // 		return acc
                    // 	},
                    // 	{
                    // 		forEach: {} as unknown as Record<string, boolean>,
                    // 		uniqReturns: [] as SalesReturn[],
                    // 	}
                    // ).uniqReturns
                    // const newSalesReturns = await createSalesReturn(uniqReturns)
                    // Logger.info(`[${store}]: Создаю документы возвратов...`)
                    // const paymentouts = await getPaymentout(dates)
                    // Logger.info(`[${store}]: Получаю документы исходящих платежей...`)
                    // const preparedPaymentouts = prepareOzonPaymentout(
                    // 	newSalesReturns ?? [],
                    // 	[...(filteredFboOrders ?? []), ...(fboAfterReturns ?? [])],
                    // 	[...(filteredFbsOrders ?? []), ...(fbsAfterReturns ?? [])]
                    // 		.filter(item => item.posting_number !== '0145992433-0031-1')
                    // 		.filter(item => item.posting_number !== '28059370-0058-6')
                    // 		.filter(item => item.posting_number !== '0122683245-0020-1'),
                    // 	paymentouts ?? []
                    // )
                    // if (preparedPaymentouts.length > 0) {
                    // 	await createPaymentout(preparedPaymentouts)
                    // }
                    // Logger.info(`[${store}]: Создаю документы исходящих платежей...`)
                ];
            case 2:
                fbsReturns = _c.sent();
                return [4 /*yield*/, (0, moveController_1.getMoves)()];
            case 3:
                moves_1 = _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0438\u0437 \u041C\u0421..."));
                filteredReturns = (_a = fbsReturns === null || fbsReturns === void 0 ? void 0 : fbsReturns.returns.filter(function (item) { return item.status === 'returned_to_seller'; })) === null || _a === void 0 ? void 0 : _a.filter(function (ret) {
                    return moves_1 === null || moves_1 === void 0 ? void 0 : moves_1.every(function (move) { return move.name !== ret.posting_number.toString(); });
                });
                returnsForMoves = filteredReturns === null || filteredReturns === void 0 ? void 0 : filteredReturns.reduce(function (acc, item) {
                    var found = acc.find(function (obj) { return obj.posting_number === item.posting_number; });
                    if ((found === null || found === void 0 ? void 0 : found.items) != null) {
                        found.items.push({
                            name: item.product_name,
                            quantity: item.quantity,
                            price: item.price,
                        });
                    }
                    else {
                        var product_name = item.product_name, quantity = item.quantity, price = item.price, rest = __rest(item, ["product_name", "quantity", "price"]);
                        acc.push(__assign(__assign({}, rest), { items: [
                                {
                                    name: item.product_name,
                                    quantity: item.quantity,
                                    price: item.price,
                                },
                            ] }));
                    }
                    return acc;
                }, []);
                preparedOzonMoves = (0, prepareOzonMoves_1.prepareOzonMoves)(returnsForMoves !== null && returnsForMoves !== void 0 ? returnsForMoves : [], (_b = products === null || products === void 0 ? void 0 : products.rows) !== null && _b !== void 0 ? _b : []);
                logger_1.default.warn(JSON.stringify(preparedOzonMoves));
                return [4 /*yield*/, sendMessage("[".concat(store, "]: \u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D"))];
            case 4:
                _c.sent();
                logger_1.default.info("[".concat(store, "]: \u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D"));
                return [3 /*break*/, 6];
            case 5:
                err_1 = _c.sent();
                logger_1.default.error("[".concat(store, "]: ").concat(err_1));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateOzon = updateOzon;
