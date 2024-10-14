"use strict";
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
exports.updateYandex = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var logger_1 = __importDefault(require("../lib/logger"));
var ordersController_1 = require("../services/moysklad/ordersController");
var productController_1 = require("../services/moysklad/productController");
var campaignController_1 = require("../services/yandex/campaignController");
var getCampaignIds_1 = require("../utils/yandex/getCampaignIds");
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
var moveController_1 = require("../services/moysklad/moveController");
var returnsController_1 = require("../services/yandex/returnsController");
var prepareMoves_1 = require("../utils/yandex/prepareMoves");
dayjs_1.default.extend(utc_1.default);
var updateYandex = function (store, sendMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var dates, products, customerOrders, campaigns, campaignIds, domain, moves_1, returns, pickedReturns, filteredReturns, preparedMoves, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
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
                products = _b.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u043C \u0438\u0437 \u041C\u0421..."));
                return [4 /*yield*/, (0, ordersController_1.getCustomerOrders)(dates)];
            case 2:
                customerOrders = _b.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0430\u043C \u0438\u0437 \u041C\u0421..."));
                return [4 /*yield*/, (0, campaignController_1.getCampaigns)(store)];
            case 3:
                campaigns = _b.sent();
                campaignIds = (0, getCampaignIds_1.getCampaignIds)(campaigns === null || campaigns === void 0 ? void 0 : campaigns.campaigns);
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F\u043C \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430..."));
                if (!(campaignIds !== undefined && campaigns !== undefined)) return [3 /*break*/, 6];
                domain = campaigns.campaigns[0].domain;
                return [4 /*yield*/, (0, moveController_1.getMoves)()];
            case 4:
                moves_1 = _b.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0438\u0437 \u041C\u0421..."));
                return [4 /*yield*/, (0, returnsController_1.getReturns)(store, campaignIds.FBS)];
            case 5:
                returns = _b.sent();
                logger_1.default.info("[".concat(store, "]: \u041F\u043E\u043B\u0443\u0447\u0430\u044E \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u044B \u0438\u0437 \u041C\u0421..."));
                pickedReturns = returns === null || returns === void 0 ? void 0 : returns.filter(function (r) { return r.shipmentStatus === 'PICKED'; });
                filteredReturns = pickedReturns === null || pickedReturns === void 0 ? void 0 : pickedReturns.filter(function (ret) {
                    return moves_1 === null || moves_1 === void 0 ? void 0 : moves_1.every(function (move) { return move.name !== ret.orderId.toString(); });
                });
                preparedMoves = (0, prepareMoves_1.prepareMoves)(domain, filteredReturns !== null && filteredReturns !== void 0 ? filteredReturns : [], (_a = products === null || products === void 0 ? void 0 : products.rows) !== null && _a !== void 0 ? _a : []);
                logger_1.default.warn(JSON.stringify(preparedMoves));
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _b.sent();
                logger_1.default.error("[".concat(store, "]: ").concat(err_1));
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateYandex = updateYandex;
