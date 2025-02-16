import { type CampaignDTO } from '../../types/yandex/api'

type CampaignObject = Record<string, CampaignDTO['id']>

export const getCampaignIds = (
	campaigns?: CampaignDTO[]
): CampaignObject | undefined => {
	if (!campaigns) {
		return undefined
	}

	return campaigns.reduce<CampaignObject>((acc, cur) => {
		if (cur.placementType !== undefined) {
			if (cur.domain === 'Haifisch' || cur.id !== 22880458) {
				acc[cur.placementType] = cur.id
			}
		}
		return acc
	}, {})
}
