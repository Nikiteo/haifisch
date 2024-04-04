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
exports.onText = void 0;
var logger_1 = __importDefault(require("./logger"));
var bot_1 = require("../bot");
var check_user_1 = require("./check-user");
var filters_1 = require("telegraf/filters");
var cashoutController_1 = require("../services/moysklad/cashoutController");
var createCashout_1 = require("../utils/createCashout");
var onText = function (store) {
    bot_1.bot.on((0, filters_1.message)('text'), function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var username, text, whatBuyedQuestion, newCashOut, createdCashOut, err_1, err_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 20, , 21]);
                    username = ctx.from.username;
                    text = ctx.message.text;
                    logger_1.default.info("\u0411\u043E\u0442 \u043F\u044B\u0442\u0430\u043B\u0441\u044F \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C: ".concat(username, " \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C ").concat(text));
                    if (!(text.toLocaleLowerCase() === 'логи')) return [3 /*break*/, 5];
                    logger_1.default.info("\u0411\u043E\u0442 \u043F\u044B\u0442\u0430\u043B\u0441\u044F \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C: ".concat(username, " \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C ").concat(text));
                    if (!(0, check_user_1.checkUser)(username)) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.sendDocument({ source: 'logs/all.log' })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, ctx.sendDocument({ source: 'logs/error.log' })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ctx.reply('Прости, но ты не можешь использовать меня')];
                case 4: return [2 /*return*/, _b.sent()];
                case 5:
                    if (!(ctx.update.message.message_id === store.cashOutQuestionId + 1)) return [3 /*break*/, 9];
                    if (!(0, check_user_1.checkUser)(username)) return [3 /*break*/, 7];
                    return [4 /*yield*/, ctx.reply('На что потратили?', {
                            reply_markup: {
                                force_reply: true,
                            },
                        })];
                case 6:
                    whatBuyedQuestion = _b.sent();
                    store.whatBuyedQuestion = whatBuyedQuestion.message_id;
                    store.sum = ctx.update.message.text;
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, ctx.reply('Прости, но ты не можешь использовать меня')];
                case 8: return [2 /*return*/, _b.sent()];
                case 9:
                    if (!(ctx.update.message.message_id === store.whatBuyedQuestion + 1)) return [3 /*break*/, 19];
                    if (!(0, check_user_1.checkUser)(username)) return [3 /*break*/, 17];
                    _b.label = 10;
                case 10:
                    _b.trys.push([10, 14, , 16]);
                    newCashOut = (0, createCashout_1.createCashoutObject)({
                        username: store.username,
                        project: store.project,
                        sum: store.sum,
                        description: ctx.message.text,
                        expenseItem: store.expenseItem,
                    });
                    if (!(newCashOut !== undefined)) return [3 /*break*/, 13];
                    return [4 /*yield*/, (0, cashoutController_1.createCashout)(newCashOut)];
                case 11:
                    createdCashOut = _b.sent();
                    return [4 /*yield*/, ctx.reply("\u0414\u0435\u0440\u0436\u0438 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C - ".concat((_a = createdCashOut === null || createdCashOut === void 0 ? void 0 : createdCashOut.meta) === null || _a === void 0 ? void 0 : _a.uuidHref))];
                case 12:
                    _b.sent();
                    logger_1.default.info("".concat(store.username, " \u0441\u043E\u0437\u0434\u0430\u043B \u0440\u0430\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u043E\u0440\u0434\u0435\u0440: ").concat(store.project, " - ").concat(store.sum, " - ").concat(ctx.message.text, " - ").concat(store.expenseItem));
                    _b.label = 13;
                case 13: return [3 /*break*/, 16];
                case 14:
                    err_1 = _b.sent();
                    logger_1.default.error(err_1);
                    return [4 /*yield*/, ctx.reply('Кажется, я сломался :(')];
                case 15: return [2 /*return*/, _b.sent()];
                case 16: return [3 /*break*/, 19];
                case 17: return [4 /*yield*/, ctx.reply('Прости, но ты не можешь использовать меня')];
                case 18: return [2 /*return*/, _b.sent()];
                case 19: return [3 /*break*/, 21];
                case 20:
                    err_2 = _b.sent();
                    logger_1.default.error(err_2);
                    return [3 /*break*/, 21];
                case 21: return [2 /*return*/];
            }
        });
    }); });
};
exports.onText = onText;
