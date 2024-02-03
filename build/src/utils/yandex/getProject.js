"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProject = void 0;
var database_1 = require("../../database");
var getProject = function (domain, type) {
    if (domain === 'Haifisch') {
        if (type === 'FBY') {
            return database_1.fbyHfProject;
        }
        return database_1.fbsHfProject;
    }
    else {
        if (type === 'FBY') {
            return database_1.fbyTopProject;
        }
        return database_1.fbsTopProject;
    }
};
exports.getProject = getProject;
