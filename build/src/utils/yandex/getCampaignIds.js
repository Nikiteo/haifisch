"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampaignIds = void 0;
var getCampaignIds = function (campaigns) {
    if (campaigns === undefined) {
        return undefined;
    }
    if (campaigns[0].domain === 'Haifisch') {
        return campaigns.reduce(function (acc, cur) {
            acc[cur.placementType] = cur.id;
            return acc;
        }, {});
    }
    return campaigns
        .filter(function (campaign) { return campaign.id !== 22880458; })
        .reduce(function (acc, cur) {
        acc[cur.placementType] = cur.id;
        return acc;
    }, {});
};
exports.getCampaignIds = getCampaignIds;
