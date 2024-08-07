"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStore = void 0;
var database_1 = require("../../database");
var getStore = function (domain, type) {
    if (domain === 'Haifisch') {
        if (type === 'FBY') {
            return database_1.fbyHfStore;
        }
        return database_1.fbsStore;
    }
    else {
        if (type === 'FBY') {
            return database_1.fbyTopStore;
        }
        return database_1.fbsStore;
    }
};
exports.getStore = getStore;
