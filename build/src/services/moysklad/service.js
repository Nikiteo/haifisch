"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiService = void 0;
var axios_1 = __importDefault(require("axios"));
var TOKEN = process.env.MOYSKLAD_TOKEN;
exports.apiService = axios_1.default.create({
    baseURL: process.env.MOY_SKLAD_URL,
    headers: {
        'Accept-Encoding': 'gzip',
        Authorization: "Bearer ".concat(TOKEN),
        'Content-Type': 'application/json',
    },
});
