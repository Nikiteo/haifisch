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
exports.createDemand = exports.getDemands = void 0;
var axios_1 = __importDefault(require("axios"));
var service_1 = require("./service");
var logger_1 = __importDefault(require("../../lib/logger"));
var getDemands = function (dates) { return __awaiter(void 0, void 0, void 0, function () {
    var getDemand_1, error_1, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                getDemand_1 = function (offset) { return __awaiter(void 0, void 0, void 0, function () {
                    var response, demands, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, service_1.apiService.get("entity/demand?offset=".concat(offset, "&filter=moment>").concat(dates.dateFrom, ";moment<").concat(dates.dateTo))];
                            case 1:
                                response = _c.sent();
                                demands = response.data.rows;
                                if (!(response.data.meta.size >
                                    response.data.meta.limit + response.data.meta.offset)) return [3 /*break*/, 3];
                                _b = (_a = demands).concat;
                                return [4 /*yield*/, getDemand_1(1000)];
                            case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                            case 3: return [2 /*return*/, demands];
                        }
                    });
                }); };
                return [4 /*yield*/, getDemand_1(0)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_1 = _a.sent();
                err = error_1;
                if (axios_1.default.isAxiosError(err)) {
                    if ((err === null || err === void 0 ? void 0 : err.response) == null || err.code === null) {
                        logger_1.default.error('No response');
                    }
                    else {
                        logger_1.default.error(err.response.data);
                    }
                }
                else {
                    logger_1.default.error('different error than axios');
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDemands = getDemands;
var createDemand = function (demands) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2, err, errorsFiltered_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, service_1.apiService.post('entity/demand', demands)];
            case 1:
                response = _c.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_2 = _c.sent();
                err = error_2;
                if (axios_1.default.isAxiosError(err)) {
                    if ((err === null || err === void 0 ? void 0 : err.response) == null || err.code === null) {
                        logger_1.default.error('No response');
                    }
                    else {
                        if (err.response.data.length > 0) {
                            errorsFiltered_1 = (_a = err.response.data) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item.errors; });
                            if (errorsFiltered_1.length > 0) {
                                logger_1.default.error("\u0412 \u0437\u0430\u043F\u0440\u043E\u0441\u0435 ".concat(err.response.config.url, " \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043E\u0448\u0438\u0431\u043E\u043A: ").concat(errorsFiltered_1.length));
                                return [2 /*return*/, (_b = err.response.data) === null || _b === void 0 ? void 0 : _b.filter(function (item) {
                                        return errorsFiltered_1.some(function (errItem) { return item.name !== errItem.name; });
                                    })];
                            }
                        }
                    }
                }
                else {
                    logger_1.default.error('different error than axios');
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createDemand = createDemand;
