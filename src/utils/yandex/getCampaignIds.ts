import { type Campaign } from '../../types/marketTypes'

type CampaignObject = Record<string, Campaign['id']>

export const getCampaignIds = (
	campaigns?: Campaign[]
): CampaignObject | undefined => {
	if (campaigns === undefined) {
		return undefined
	}

	if (campaigns[0].domain === 'Haifisch') {
		return campaigns.reduce<CampaignObject>((acc, cur) => {
			acc[cur.placementType] = cur.id
			return acc
		}, {})
	}
	return campaigns
		.filter(campaign => campaign.id !== 22880458)
		.reduce<CampaignObject>((acc, cur) => {
			acc[cur.placementType] = cur.id
			return acc
		}, {})
}
