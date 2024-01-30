"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiService = void 0;
var axios_1 = __importDefault(require("axios"));
var TOKEN = process.env.OZON_TOKEN;
var CLIENT_ID = process.env.OZON_CLIENT_ID;
var URL = process.env.OZON_URL;
exports.apiService = axios_1.default.create({
    baseURL: URL,
    headers: {
        Accept: 'application/json',
        'Api-Key': TOKEN,
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
    },
});
