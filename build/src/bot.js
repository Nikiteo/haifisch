"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
var telegraf_1 = require("telegraf");
exports.bot = new telegraf_1.Telegraf((_a = process.env.BOT_TOKEN) !== null && _a !== void 0 ? _a : '', {
    handlerTimeout: Infinity,
});
