"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiService = void 0;
var axios_1 = __importDefault(require("axios"));
var URL = process.env.MEGAMARKET_URL;
exports.apiService = axios_1.default.create({
    baseURL: URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
