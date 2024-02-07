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
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var update_ozon_1 = require("./controllers/update-ozon");
var update_yandex_1 = require("./controllers/update-yandex");
var logger_1 = __importDefault(require("./lib/logger"));
var check_user_1 = require("./lib/check-user");
var createCashout_1 = require("./utils/createCashout");
var cashoutController_1 = require("./services/moysklad/cashoutController");
var token = process.env.BOT_TOKEN;
var bot = new node_telegram_bot_api_1.default(token !== null && token !== void 0 ? token : '', { polling: true });
var inlineService = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Перемещение',
                    callback_data: 'moving',
                },
                {
                    text: 'Аренда',
                    callback_data: 'rent',
                },
            ],
            [
                {
                    text: 'Зарплата',
                    callback_data: 'salary',
                },
                {
                    text: 'Маркетинг и реклама',
                    callback_data: 'entertainment',
                },
            ],
            [
                {
                    text: 'Услуги',
                    callback_data: 'services',
                },
                {
                    text: 'Закупка товаров',
                    callback_data: 'purchase',
                },
            ],
            [
                {
                    text: 'Налоги и сборы',
                    callback_data: 'taxes',
                },
            ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.default.info('Bot started!');
                return [4 /*yield*/, bot.setMyCommands([
                        { command: '/sync', description: 'Синхронизировать' },
                        { command: '/spend', description: 'Записать трату' },
                    ])];
            case 1:
                _a.sent();
                bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
                    var text, chatId, username, sendMessage, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                text = msg.text;
                                chatId = msg.chat.id;
                                username = msg.chat.username;
                                sendMessage = function (text) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, bot.sendMessage(chatId, text)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); };
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 16, , 18]);
                                if (!(text === '/start')) return [3 /*break*/, 3];
                                logger_1.default.info("\u0411\u043E\u0442 \u043F\u044B\u0442\u0430\u043B\u0441\u044F \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C: ".concat(msg.chat.username, " \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C ").concat(msg.text));
                                return [4 /*yield*/, bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот Haifisch')];
                            case 2: return [2 /*return*/, _a.sent()];
                            case 3:
                                if (!(text === '/sync')) return [3 /*break*/, 10];
                                logger_1.default.info("\u0411\u043E\u0442 \u043F\u044B\u0442\u0430\u043B\u0441\u044F \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C: ".concat(msg.chat.username, " \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C ").concat(msg.text));
                                if (!(0, check_user_1.checkUser)(username)) return [3 /*break*/, 8];
                                return [4 /*yield*/, bot.sendMessage(chatId, 'Начал обновление...')];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, (0, update_yandex_1.updateYandex)('Haifisch', sendMessage)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, (0, update_yandex_1.updateYandex)('Top', sendMessage)];
                            case 6:
                                _a.sent();
                                return [4 /*yield*/, (0, update_ozon_1.updateOzon)('Ozon', sendMessage)];
                            case 7:
                                _a.sent();
                                return [3 /*break*/, 10];
                            case 8: return [4 /*yield*/, bot.sendMessage(chatId, 'Прости, но ты не можешь использовать меня')];
                            case 9: return [2 /*return*/, _a.sent()];
                            case 10:
                                if (!(text === 'Пришли мне логи' && (0, check_user_1.checkUser)(username))) return [3 /*break*/, 13];
                                logger_1.default.info("\u0411\u043E\u0442 \u043F\u044B\u0442\u0430\u043B\u0441\u044F \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C: ".concat(msg.chat.username, " \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C ").concat(msg.text));
                                return [4 /*yield*/, bot.sendDocument(chatId, 'logs/all.log')];
                            case 11:
                                _a.sent();
                                return [4 /*yield*/, bot.sendDocument(chatId, 'logs/error.log')];
                            case 12:
                                _a.sent();
                                _a.label = 13;
                            case 13:
                                if (!(text === '/spend' && (0, check_user_1.checkUser)(username))) return [3 /*break*/, 15];
                                logger_1.default.info("\u0411\u043E\u0442 \u043F\u044B\u0442\u0430\u043B\u0441\u044F \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C: ".concat(msg.chat.username, " \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C ").concat(msg.text));
                                return [4 /*yield*/, bot.sendMessage(chatId, 'Выбери магазин:', {
                                        reply_markup: {
                                            inline_keyboard: [
                                                [
                                                    {
                                                        text: '🚀 ФБУ ОЗОН',
                                                        callback_data: 'fbyOzon',
                                                    },
                                                    {
                                                        text: '🚀 ФБС ОЗОН',
                                                        callback_data: 'fbsOzon',
                                                    },
                                                ],
                                                [
                                                    { text: '💻 ФБУ ХФ', callback_data: 'fbyHf' },
                                                    { text: '💻 ФБС ХФ', callback_data: 'fbsHf' },
                                                ],
                                                [
                                                    { text: '💄 ФБУ ТОР', callback_data: 'fbyTop' },
                                                    { text: '💄 ФБС ТОР', callback_data: 'fbsTop' },
                                                ],
                                            ],
                                            resize_keyboard: true,
                                            one_time_keyboard: true,
                                        },
                                    })];
                            case 14:
                                _a.sent();
                                _a.label = 15;
                            case 15:
                                bot.on('callback_query', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
                                    var e_2;
                                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                                    return __generator(this, function (_o) {
                                        switch (_o.label) {
                                            case 0:
                                                _o.trys.push([0, 25, , 26]);
                                                if (!(ctx.data === 'fbyOzon')) return [3 /*break*/, 4];
                                                if (!(((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.message_id) !== undefined)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.message_id)];
                                            case 1:
                                                _o.sent();
                                                _o.label = 2;
                                            case 2: return [4 /*yield*/, bot.sendMessage(chatId, 'Выбери статью расходов:', inlineService)];
                                            case 3:
                                                _o.sent();
                                                bot.on('callback_query', function (context) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var _a, _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                if (!(((_a = context.message) === null || _a === void 0 ? void 0 : _a.message_id) !== undefined)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_b = context.message) === null || _b === void 0 ? void 0 : _b.message_id)];
                                                            case 1:
                                                                _c.sent();
                                                                _c.label = 2;
                                                            case 2: return [4 /*yield*/, bot.sendMessage(chatId, 'Сколько потратили?')];
                                                            case 3:
                                                                _c.sent();
                                                                bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
                                                                    var cashOut;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                cashOut = msg.text;
                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'На что потратили?')];
                                                                            case 1:
                                                                                _a.sent();
                                                                                bot.removeAllListeners();
                                                                                bot.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    var newCashOut, createdCashOut;
                                                                                    var _a;
                                                                                    return __generator(this, function (_b) {
                                                                                        switch (_b.label) {
                                                                                            case 0:
                                                                                                newCashOut = (0, createCashout_1.createCashoutObject)({
                                                                                                    username: username,
                                                                                                    project: ctx.data,
                                                                                                    sum: cashOut,
                                                                                                    description: message.text,
                                                                                                    expenseItem: context.data,
                                                                                                });
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'Принял! Создаю расходный ордер...')];
                                                                                            case 1:
                                                                                                _b.sent();
                                                                                                return [4 /*yield*/, (0, cashoutController_1.createCashout)(newCashOut)];
                                                                                            case 2:
                                                                                                createdCashOut = _b.sent();
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, "\u0414\u0435\u0440\u0436\u0438 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C - ".concat((_a = createdCashOut === null || createdCashOut === void 0 ? void 0 : createdCashOut.meta) === null || _a === void 0 ? void 0 : _a.uuidHref))];
                                                                                            case 3:
                                                                                                _b.sent();
                                                                                                logger_1.default.info("".concat(username, " \u0441\u043E\u0437\u0434\u0430\u043B \u0440\u0430\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u043E\u0440\u0434\u0435\u0440: ").concat(ctx.data, " - ").concat(cashOut, " - ").concat(message.text, " - ").concat(context.data));
                                                                                                bot.removeAllListeners();
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); });
                                                                                return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                                _o.label = 4;
                                            case 4:
                                                if (!(ctx.data === 'fbsOzon')) return [3 /*break*/, 8];
                                                if (!(((_c = ctx.message) === null || _c === void 0 ? void 0 : _c.message_id) !== undefined)) return [3 /*break*/, 6];
                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_d = ctx.message) === null || _d === void 0 ? void 0 : _d.message_id)];
                                            case 5:
                                                _o.sent();
                                                _o.label = 6;
                                            case 6: return [4 /*yield*/, bot.sendMessage(chatId, 'Выбери статью расходов:', inlineService)];
                                            case 7:
                                                _o.sent();
                                                bot.on('callback_query', function (context) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var _a, _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                if (!(((_a = context.message) === null || _a === void 0 ? void 0 : _a.message_id) !== undefined)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_b = context.message) === null || _b === void 0 ? void 0 : _b.message_id)];
                                                            case 1:
                                                                _c.sent();
                                                                _c.label = 2;
                                                            case 2: return [4 /*yield*/, bot.sendMessage(chatId, 'Сколько потратили?')];
                                                            case 3:
                                                                _c.sent();
                                                                bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
                                                                    var cashOut;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                cashOut = msg.text;
                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'На что потратили?')];
                                                                            case 1:
                                                                                _a.sent();
                                                                                bot.removeAllListeners();
                                                                                bot.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    var newCashOut, createdCashOut;
                                                                                    var _a;
                                                                                    return __generator(this, function (_b) {
                                                                                        switch (_b.label) {
                                                                                            case 0:
                                                                                                newCashOut = (0, createCashout_1.createCashoutObject)({
                                                                                                    username: username,
                                                                                                    project: ctx.data,
                                                                                                    sum: cashOut,
                                                                                                    description: message.text,
                                                                                                    expenseItem: context.data,
                                                                                                });
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'Принял! Создаю расходный ордер...')];
                                                                                            case 1:
                                                                                                _b.sent();
                                                                                                return [4 /*yield*/, (0, cashoutController_1.createCashout)(newCashOut)];
                                                                                            case 2:
                                                                                                createdCashOut = _b.sent();
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, "\u0414\u0435\u0440\u0436\u0438 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C - ".concat((_a = createdCashOut === null || createdCashOut === void 0 ? void 0 : createdCashOut.meta) === null || _a === void 0 ? void 0 : _a.uuidHref))];
                                                                                            case 3:
                                                                                                _b.sent();
                                                                                                logger_1.default.info("".concat(username, " \u0441\u043E\u0437\u0434\u0430\u043B \u0440\u0430\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u043E\u0440\u0434\u0435\u0440: ").concat(ctx.data, " - ").concat(cashOut, " - ").concat(message.text, " - ").concat(context.data));
                                                                                                bot.removeAllListeners();
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); });
                                                                                return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                                _o.label = 8;
                                            case 8:
                                                if (!(ctx.data === 'fbyHf')) return [3 /*break*/, 12];
                                                if (!(((_e = ctx.message) === null || _e === void 0 ? void 0 : _e.message_id) !== undefined)) return [3 /*break*/, 10];
                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_f = ctx.message) === null || _f === void 0 ? void 0 : _f.message_id)];
                                            case 9:
                                                _o.sent();
                                                _o.label = 10;
                                            case 10: return [4 /*yield*/, bot.sendMessage(chatId, 'Выбери статью расходов:', inlineService)];
                                            case 11:
                                                _o.sent();
                                                bot.on('callback_query', function (context) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var _a, _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                if (!(((_a = context.message) === null || _a === void 0 ? void 0 : _a.message_id) !== undefined)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_b = context.message) === null || _b === void 0 ? void 0 : _b.message_id)];
                                                            case 1:
                                                                _c.sent();
                                                                _c.label = 2;
                                                            case 2: return [4 /*yield*/, bot.sendMessage(chatId, 'Сколько потратили?')];
                                                            case 3:
                                                                _c.sent();
                                                                bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
                                                                    var cashOut;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                cashOut = msg.text;
                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'На что потратили?')];
                                                                            case 1:
                                                                                _a.sent();
                                                                                bot.removeAllListeners();
                                                                                bot.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    var newCashOut, createdCashOut;
                                                                                    var _a;
                                                                                    return __generator(this, function (_b) {
                                                                                        switch (_b.label) {
                                                                                            case 0:
                                                                                                newCashOut = (0, createCashout_1.createCashoutObject)({
                                                                                                    username: username,
                                                                                                    project: ctx.data,
                                                                                                    sum: cashOut,
                                                                                                    description: message.text,
                                                                                                    expenseItem: context.data,
                                                                                                });
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'Принял! Создаю расходный ордер...')];
                                                                                            case 1:
                                                                                                _b.sent();
                                                                                                return [4 /*yield*/, (0, cashoutController_1.createCashout)(newCashOut)];
                                                                                            case 2:
                                                                                                createdCashOut = _b.sent();
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, "\u0414\u0435\u0440\u0436\u0438 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C - ".concat((_a = createdCashOut === null || createdCashOut === void 0 ? void 0 : createdCashOut.meta) === null || _a === void 0 ? void 0 : _a.uuidHref))];
                                                                                            case 3:
                                                                                                _b.sent();
                                                                                                logger_1.default.info("".concat(username, " \u0441\u043E\u0437\u0434\u0430\u043B \u0440\u0430\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u043E\u0440\u0434\u0435\u0440: ").concat(ctx.data, " - ").concat(cashOut, " - ").concat(message.text, " - ").concat(context.data));
                                                                                                bot.removeAllListeners();
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); });
                                                                                return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                                _o.label = 12;
                                            case 12:
                                                if (!(ctx.data === 'fbsHf')) return [3 /*break*/, 16];
                                                if (!(((_g = ctx.message) === null || _g === void 0 ? void 0 : _g.message_id) !== undefined)) return [3 /*break*/, 14];
                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_h = ctx.message) === null || _h === void 0 ? void 0 : _h.message_id)];
                                            case 13:
                                                _o.sent();
                                                _o.label = 14;
                                            case 14: return [4 /*yield*/, bot.sendMessage(chatId, 'Выбери статью расходов:', inlineService)];
                                            case 15:
                                                _o.sent();
                                                bot.on('callback_query', function (context) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var _a, _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                if (!(((_a = context.message) === null || _a === void 0 ? void 0 : _a.message_id) !== undefined)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_b = context.message) === null || _b === void 0 ? void 0 : _b.message_id)];
                                                            case 1:
                                                                _c.sent();
                                                                _c.label = 2;
                                                            case 2: return [4 /*yield*/, bot.sendMessage(chatId, 'Сколько потратили?')];
                                                            case 3:
                                                                _c.sent();
                                                                bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
                                                                    var cashOut;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                cashOut = msg.text;
                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'На что потратили?')];
                                                                            case 1:
                                                                                _a.sent();
                                                                                bot.removeAllListeners();
                                                                                bot.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    var newCashOut, createdCashOut;
                                                                                    var _a;
                                                                                    return __generator(this, function (_b) {
                                                                                        switch (_b.label) {
                                                                                            case 0:
                                                                                                newCashOut = (0, createCashout_1.createCashoutObject)({
                                                                                                    username: username,
                                                                                                    project: ctx.data,
                                                                                                    sum: cashOut,
                                                                                                    description: message.text,
                                                                                                    expenseItem: context.data,
                                                                                                });
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'Принял! Создаю расходный ордер...')];
                                                                                            case 1:
                                                                                                _b.sent();
                                                                                                return [4 /*yield*/, (0, cashoutController_1.createCashout)(newCashOut)];
                                                                                            case 2:
                                                                                                createdCashOut = _b.sent();
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, "\u0414\u0435\u0440\u0436\u0438 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C - ".concat((_a = createdCashOut === null || createdCashOut === void 0 ? void 0 : createdCashOut.meta) === null || _a === void 0 ? void 0 : _a.uuidHref))];
                                                                                            case 3:
                                                                                                _b.sent();
                                                                                                logger_1.default.info("".concat(username, " \u0441\u043E\u0437\u0434\u0430\u043B \u0440\u0430\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u043E\u0440\u0434\u0435\u0440: ").concat(ctx.data, " - ").concat(cashOut, " - ").concat(message.text, " - ").concat(context.data));
                                                                                                bot.removeAllListeners();
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); });
                                                                                return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                                _o.label = 16;
                                            case 16:
                                                if (!(ctx.data === 'fbyTop')) return [3 /*break*/, 20];
                                                if (!(((_j = ctx.message) === null || _j === void 0 ? void 0 : _j.message_id) !== undefined)) return [3 /*break*/, 18];
                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_k = ctx.message) === null || _k === void 0 ? void 0 : _k.message_id)];
                                            case 17:
                                                _o.sent();
                                                _o.label = 18;
                                            case 18: return [4 /*yield*/, bot.sendMessage(chatId, 'Выбери статью расходов:', inlineService)];
                                            case 19:
                                                _o.sent();
                                                bot.on('callback_query', function (context) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var _a, _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                if (!(((_a = context.message) === null || _a === void 0 ? void 0 : _a.message_id) !== undefined)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_b = context.message) === null || _b === void 0 ? void 0 : _b.message_id)];
                                                            case 1:
                                                                _c.sent();
                                                                _c.label = 2;
                                                            case 2: return [4 /*yield*/, bot.sendMessage(chatId, 'Сколько потратили?')];
                                                            case 3:
                                                                _c.sent();
                                                                bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
                                                                    var cashOut;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                cashOut = msg.text;
                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'На что потратили?')];
                                                                            case 1:
                                                                                _a.sent();
                                                                                bot.removeAllListeners();
                                                                                bot.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    var newCashOut, createdCashOut;
                                                                                    var _a;
                                                                                    return __generator(this, function (_b) {
                                                                                        switch (_b.label) {
                                                                                            case 0:
                                                                                                newCashOut = (0, createCashout_1.createCashoutObject)({
                                                                                                    username: username,
                                                                                                    project: ctx.data,
                                                                                                    sum: cashOut,
                                                                                                    description: message.text,
                                                                                                    expenseItem: context.data,
                                                                                                });
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'Принял! Создаю расходный ордер...')];
                                                                                            case 1:
                                                                                                _b.sent();
                                                                                                return [4 /*yield*/, (0, cashoutController_1.createCashout)(newCashOut)];
                                                                                            case 2:
                                                                                                createdCashOut = _b.sent();
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, "\u0414\u0435\u0440\u0436\u0438 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C - ".concat((_a = createdCashOut === null || createdCashOut === void 0 ? void 0 : createdCashOut.meta) === null || _a === void 0 ? void 0 : _a.uuidHref))];
                                                                                            case 3:
                                                                                                _b.sent();
                                                                                                logger_1.default.info("".concat(username, " \u0441\u043E\u0437\u0434\u0430\u043B \u0440\u0430\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u043E\u0440\u0434\u0435\u0440: ").concat(ctx.data, " - ").concat(cashOut, " - ").concat(message.text, " - ").concat(context.data));
                                                                                                bot.removeAllListeners();
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); });
                                                                                return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                                _o.label = 20;
                                            case 20:
                                                if (!(ctx.data === 'fbsTop')) return [3 /*break*/, 24];
                                                if (!(((_l = ctx.message) === null || _l === void 0 ? void 0 : _l.message_id) !== undefined)) return [3 /*break*/, 22];
                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_m = ctx.message) === null || _m === void 0 ? void 0 : _m.message_id)];
                                            case 21:
                                                _o.sent();
                                                _o.label = 22;
                                            case 22: return [4 /*yield*/, bot.sendMessage(chatId, 'Выбери статью расходов:', inlineService)];
                                            case 23:
                                                _o.sent();
                                                bot.on('callback_query', function (context) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var _a, _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                if (!(((_a = context.message) === null || _a === void 0 ? void 0 : _a.message_id) !== undefined)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, bot.deleteMessage(chatId, (_b = context.message) === null || _b === void 0 ? void 0 : _b.message_id)];
                                                            case 1:
                                                                _c.sent();
                                                                _c.label = 2;
                                                            case 2: return [4 /*yield*/, bot.sendMessage(chatId, 'Сколько потратили?')];
                                                            case 3:
                                                                _c.sent();
                                                                bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
                                                                    var cashOut;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                cashOut = msg.text;
                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'На что потратили?')];
                                                                            case 1:
                                                                                _a.sent();
                                                                                bot.removeAllListeners();
                                                                                bot.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    var newCashOut, createdCashOut;
                                                                                    var _a;
                                                                                    return __generator(this, function (_b) {
                                                                                        switch (_b.label) {
                                                                                            case 0:
                                                                                                newCashOut = (0, createCashout_1.createCashoutObject)({
                                                                                                    username: username,
                                                                                                    project: ctx.data,
                                                                                                    sum: cashOut,
                                                                                                    description: message.text,
                                                                                                    expenseItem: context.data,
                                                                                                });
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, 'Принял! Создаю расходный ордер...')];
                                                                                            case 1:
                                                                                                _b.sent();
                                                                                                return [4 /*yield*/, (0, cashoutController_1.createCashout)(newCashOut)];
                                                                                            case 2:
                                                                                                createdCashOut = _b.sent();
                                                                                                return [4 /*yield*/, bot.sendMessage(chatId, "\u0414\u0435\u0440\u0436\u0438 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C - ".concat((_a = createdCashOut === null || createdCashOut === void 0 ? void 0 : createdCashOut.meta) === null || _a === void 0 ? void 0 : _a.uuidHref))];
                                                                                            case 3:
                                                                                                _b.sent();
                                                                                                logger_1.default.info("".concat(username, " \u0441\u043E\u0437\u0434\u0430\u043B \u0440\u0430\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u043E\u0440\u0434\u0435\u0440: ").concat(ctx.data, " - ").concat(cashOut, " - ").concat(message.text, " - ").concat(context.data));
                                                                                                bot.removeAllListeners();
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); });
                                                                                return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                                _o.label = 24;
                                            case 24: return [3 /*break*/, 26];
                                            case 25:
                                                e_2 = _o.sent();
                                                logger_1.default.error(e_2);
                                                return [3 /*break*/, 26];
                                            case 26: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [3 /*break*/, 18];
                            case 16:
                                e_1 = _a.sent();
                                logger_1.default.error(e_1);
                                return [4 /*yield*/, bot.sendMessage(chatId, 'Произошла какая-то ошибка')];
                            case 17: return [2 /*return*/, _a.sent()];
                            case 18: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
void start();
