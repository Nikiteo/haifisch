import {
	type UpdateOfferMappingsRequest,
	type GetOfferMappingsResponse,
	type UpdateOfferMappingsResponse,
	type GetOfferMappingsRequest,
	type GetOfferMappingDTO,
} from '../../types/yandex/api'
import { logError } from '../../utils/log-error'
import { getService } from '../../utils/get-service'

export const getOffers = async (
	store: string,
	id: number,
	data: GetOfferMappingsRequest
): Promise<GetOfferMappingDTO[] | undefined> => {
	const service = getService(store)

	const fetchOffers = async (
		token: string
	): Promise<GetOfferMappingDTO[]> => {
		const response = await service.post<GetOfferMappingsResponse>(
			`businesses/${id}/offer-mappings?limit=200&page_token=${token}`,
			data
		)

		const offers = response.data.result

		if (offers?.offerMappings && offers.offerMappings.length > 0) {
			const nextPageToken = offers.paging?.nextPageToken
			if (nextPageToken) {
				const nextOffers = await fetchOffers(nextPageToken)
				return offers.offerMappings.concat(nextOffers)
			}
			return offers.offerMappings
		}
		return []
	}

	try {
		return await fetchOffers('')
	} catch (error: unknown) {
		logError(error)
	}
}

export const sendOffers = async (
	store: string,
	id: number,
	data: UpdateOfferMappingsRequest
): Promise<UpdateOfferMappingsResponse['results']> => {
	const service = getService(store)

	try {
		const response = await service.post<UpdateOfferMappingsResponse>(
			`businesses/${id}/offer-mappings/update`,
			data
		)

		return response.data.results
	} catch (error: unknown) {
		logError(error)
	}
}
