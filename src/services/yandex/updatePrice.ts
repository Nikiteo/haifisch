import { type AxiosResponse } from 'axios'

import { getService } from '../../utils/get-service'
import { logError } from '../../utils/log-error'
import { type UpdateBusinessPricesRequest } from '../../types/yandex/api'

export const sendPrices = async (
	store: string,
	id: number,
	data: UpdateBusinessPricesRequest
): Promise<AxiosResponse<{ status: string }, any> | undefined> => {
	const service = getService(store)

	try {
		const response = await service.post<{ status: string }>(
			`businesses/${id}/offer-prices/updates`,
			data
		)
		return response
	} catch (error: unknown) {
		logError(error)
	}
}
