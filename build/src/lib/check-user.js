"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = void 0;
var checkUser = function (username) {
    switch (username) {
        case 'Nikiteo':
        case 'puleekdun':
        case 'Mi4ku':
        case 'tatitoto_tt':
            return true;
        default:
            return false;
    }
};
exports.checkUser = checkUser;
