"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStore = void 0;
var database_1 = require("../../database");
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
var getStore = function (domain, type) {
    if (domain === 'Haifisch') {
        if (type === 'FBY') {
            return database_1.fbyHfStore;
        }
        return database_1.fbsHfStore;
    }
    else {
        if (type === 'FBY') {
            return database_1.fbyTopStore;
        }
        return database_1.fbsTopStore;
    }
};
exports.getStore = getStore;
