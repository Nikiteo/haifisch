"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCashoutObject = void 0;
var database_1 = require("../database");
var getOwner = function (username) {
    switch (username) {
        case 'Nikiteo':
            return database_1.owner;
        case 'puleekdun':
            return database_1.anyaOwner;
        case 'Mi4ku':
            return database_1.mishaOwner;
        default:
            return database_1.owner;
    }
};
var getProject = function (project) {
    switch (project) {
        case 'fbsOzon':
            return database_1.fbosOzonProject;
        case 'fbsTop':
            return database_1.fbsTopProject;
        case 'fbsHf':
            return database_1.fbsHfProject;
        case 'fbyOzon':
            return database_1.fboOzonProject;
        case 'fbyTop':
            return database_1.fbyTopProject;
        case 'fbyHf':
            return database_1.fbyHfProject;
        default:
            return database_1.fbosOzonProject;
    }
};
var getExpenseItem = function (expenseItem) {
    switch (expenseItem) {
        case 'moving':
            return database_1.moving;
        case 'rent':
            return database_1.rent;
        case 'salary':
            return database_1.salary;
        case 'entertainment':
            return database_1.entertainment;
        case 'purchase':
            return database_1.purchase;
        case 'taxes':
            return database_1.taxes;
        default:
            return database_1.refund;
    }
};
var createCashoutObject = function (_a) {
    var username = _a.username, _b = _a.project, project = _b === void 0 ? 'fbsOzon' : _b, _c = _a.sum, sum = _c === void 0 ? '0' : _c, description = _a.description, expenseItem = _a.expenseItem;
    return {
        owner: getOwner(username),
        applicable: true,
        shared: true,
        rate: {
            currency: database_1.currency,
        },
        project: getProject(project),
        agent: project.includes('Ozon') ? database_1.ozonAgent : database_1.agent,
        organization: database_1.organization,
        salesChannel: project.includes('Ozon')
            ? database_1.ozonSalesChannel
            : database_1.salesChannels,
        sum: parseFloat((+sum * 100).toFixed(2)),
        paymentPurpose: description,
        expenseItem: getExpenseItem(expenseItem),
        state: {
            meta: {
                href: 'https://api.moysklad.ru/api/remap/1.2/entity/cashout/metadata/states/a833cd42-c5c1-11ee-0a80-0669002e69ef',
                metadataHref: 'https://api.moysklad.ru/api/remap/1.2/entity/cashout/metadata',
                type: 'state',
                mediaType: 'application/json',
            },
        },
    };
};
exports.createCashoutObject = createCashoutObject;
