"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiServiceHf = exports.apiServiceTop = void 0;
var axios_1 = __importDefault(require("axios"));
var TOP_TOKEN = process.env.TOP_TOKEN;
var HF_TOKEN = process.env.HF_TOKEN;
var URL = process.env.YANDEX_URL;
exports.apiServiceTop = axios_1.default.create({
    baseURL: URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Api-Key': TOP_TOKEN,
    },
});
exports.apiServiceHf = axios_1.default.create({
    baseURL: URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Api-Key': HF_TOKEN,
    },
});
