import {
	DeletePromoOffersRequest,
	GetCampaignsResponse,
	GetPromoDTO,
	GetPromoOfferDTO,
	GetPromoOffersRequest,
	GetPromoOffersResponse,
	GetPromosRequest,
	GetPromosResponse,
	UpdatePromoOffersRequest,
	UpdatePromoOffersResponse,
	UpdatePromoOffersResultDTO,
} from '../../types/yandex/api'
import { getRequest, postRequest } from './service'

export const getCampaigns = async (
	store: string
): Promise<GetCampaignsResponse['campaigns'] | undefined> => {
	const response = await getRequest<GetCampaignsResponse>(store, '/campaigns')
	return response?.campaigns
}

export const getPromos = async (
	store: string,
	id: number,
	data: GetPromosRequest
): Promise<GetPromoDTO[] | undefined> => {
	const result = await postRequest<GetPromosRequest, GetPromosResponse>(
		store,
		`businesses/${id}/promos`,
		data
	)
	return result?.result?.promos
}

export const getPromosOffers = async (
	store: string,
	id: number,
	data: GetPromoOffersRequest
): Promise<GetPromoOfferDTO[] | undefined> => {
	const result = await postRequest<
		GetPromoOffersRequest,
		GetPromoOffersResponse
	>(store, `businesses/${id}/promos/offers?limit=500`, data)
	return result?.result?.offers
}

export const addPromosOffers = async (
	store: string,
	id: number,
	data?: UpdatePromoOffersRequest
): Promise<UpdatePromoOffersResultDTO | undefined> => {
	const result = await postRequest<
		UpdatePromoOffersRequest,
		UpdatePromoOffersResponse
	>(store, `businesses/${id}/promos/offers/update`, data)
	return result?.result
}

export const deletePromosOffers = async (
	store: string,
	id: number,
	data?: DeletePromoOffersRequest
): Promise<UpdatePromoOffersResultDTO | undefined> => {
	const result = await postRequest<
		DeletePromoOffersRequest,
		UpdatePromoOffersResponse
	>(store, `businesses/${id}/promos/offers/delete`, data)
	return result?.result
}
