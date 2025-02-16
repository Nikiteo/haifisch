import { getService } from '../../utils/get-service'
import { logError } from '../../utils/log-error'
import { type ReturnDTO, type GetReturnsResponse } from '../../types/yandex/api'

const fetchReturns = async (
	service: ReturnType<typeof getService>,
	id: number,
	token: string
): Promise<ReturnDTO[]> => {
	const response = await service.get<GetReturnsResponse>(
		`campaigns/${id}/returns?limit=200&page_token=${token}`
	)
	const returns = response.data.result

	if (returns?.returns && returns.returns.length > 0) {
		const nextPageToken = returns.paging?.nextPageToken

		if (nextPageToken) {
			const nextReturns = await fetchReturns(service, id, nextPageToken)
			return returns.returns.concat(nextReturns)
		}
	}

	return returns?.returns || []
}

export const getReturns = async (
	store: string,
	id: number
): Promise<ReturnDTO[] | undefined> => {
	const service = getService(store)

	try {
		return await fetchReturns(service, id, '')
	} catch (error: unknown) {
		logError(error)
		return undefined
	}
}
