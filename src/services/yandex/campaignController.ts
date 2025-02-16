import { type GetCampaignsResponse } from '../../types/yandex/api'
import { logError } from '../../utils/log-error'
import { getService } from '../../utils/get-service'

export const getCampaigns = async (
	store: string
): Promise<GetCampaignsResponse | undefined> => {
	const service = getService(store)

	try {
		const response = await service.get<GetCampaignsResponse>('/campaigns')
		return response.data
	} catch (error: unknown) {
		logError(error)
	}
}
