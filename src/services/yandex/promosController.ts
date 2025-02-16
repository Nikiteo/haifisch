import { getService } from '../../utils/get-service'
import { logError } from '../../utils/log-error'
import {
	type GetPromoOffersRequest,
	type GetPromoDTO,
	type GetPromosResponse,
	type GetPromoOffersResponse,
	type GetPromoOfferDTO,
	type UpdatePromoOffersRequest,
	type UpdatePromoOffersResponse,
	type UpdatePromoOffersResultDTO,
	type DeletePromoOffersRequest,
} from '../../types/yandex/api'

const handleServiceRequest = async <T>(
	store: string,
	id: number,
	endpoint: string,
	data?: unknown
): Promise<T | undefined> => {
	const service = getService(store)

	try {
		const response = await service.post<T>(endpoint, data)
		return response.data
	} catch (error: unknown) {
		logError(error)
		return undefined
	}
}

export const getPromos = async (
	store: string,
	id: number
): Promise<GetPromoDTO[] | undefined> => {
	const result = await handleServiceRequest<GetPromosResponse>(
		store,
		id,
		`businesses/${id}/promos`
	)
	return result?.result?.promos
}

export const getPromosOffers = async (
	store: string,
	id: number,
	data: GetPromoOffersRequest
): Promise<GetPromoOfferDTO[] | undefined> => {
	const result = await handleServiceRequest<GetPromoOffersResponse>(
		store,
		id,
		`businesses/${id}/promos/offers?limit=500`,
		data
	)
	return result?.result?.offers
}

export const addPromosOffers = async (
	store: string,
	id: number,
	data?: UpdatePromoOffersRequest
): Promise<UpdatePromoOffersResultDTO | undefined> => {
	const result = await handleServiceRequest<UpdatePromoOffersResponse>(
		store,
		id,
		`businesses/${id}/promos/offers/update`,
		data
	)
	return result?.result
}

export const deletePromosOffers = async (
	store: string,
	id: number,
	data?: DeletePromoOffersRequest
): Promise<UpdatePromoOffersResultDTO | undefined> => {
	const result = await handleServiceRequest<UpdatePromoOffersResponse>(
		store,
		id,
		`businesses/${id}/promos/offers/delete`,
		data
	)
	return result?.result
}
