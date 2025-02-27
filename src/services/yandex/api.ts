import { AxiosResponse } from 'axios'
import {
	DeletePromoOffersRequest,
	GetCampaignsResponse,
	GetGoodsFeedbackRequest,
	GetGoodsFeedbackResponse,
	GetOfferMappingDTO,
	GetOfferMappingsRequest,
	GetOfferMappingsResponse,
	GetOrderResponse,
	GetOrdersResponse,
	GetOrdersStatsRequest,
	GetOrdersStatsResponse,
	GetPromoDTO,
	GetPromoOfferDTO,
	GetPromoOffersRequest,
	GetPromoOffersResponse,
	GetPromosRequest,
	GetPromosResponse,
	GetReturnResponse,
	GetReturnsResponse,
	GetWarehouseStocksRequest,
	GetWarehouseStocksResponse,
	GoodsFeedbackCommentDTO,
	GoodsFeedbackDTO,
	OrderDTO,
	OrdersStatsOrderDTO,
	ReturnDTO,
	UpdateBusinessPricesRequest,
	UpdateGoodsFeedbackCommentRequest,
	UpdateGoodsFeedbackCommentResponse,
	UpdateOfferMappingsRequest,
	UpdateOfferMappingsResponse,
	UpdatePromoOffersRequest,
	UpdatePromoOffersResponse,
	UpdatePromoOffersResultDTO,
	UpdateStocksRequest,
	WarehouseOfferDTO,
} from '../../types/yandex/api'
import { getService } from '../../utils/get-service'
import { logError } from '../../utils/log-error'
import { getRequest, postRequest } from './service'
import {
	OrderCancelledNotificationDTO,
	OrderCreatedNotificationDTO,
	OrderReturnCreatedNotificationDTO,
	OrderStatusUpdatedNotificationDTO,
} from '../notifications'
import { Logger } from '../../lib'

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

export const addFeedback = async (
	store: string,
	id: number,
	data?: UpdateGoodsFeedbackCommentRequest
): Promise<GoodsFeedbackCommentDTO | undefined> => {
	const response = await postRequest<
		UpdateGoodsFeedbackCommentRequest,
		UpdateGoodsFeedbackCommentResponse
	>(store, `businesses/${id}/goods-feedback/comments/update`, data)
	return response?.result
}

export const getFeedbacks = async (
	store: string,
	id: number
): Promise<GoodsFeedbackDTO[] | undefined> => {
	const getFeedback = async (token: string): Promise<GoodsFeedbackDTO[]> => {
		const response = await postRequest<
			GetGoodsFeedbackRequest,
			GetGoodsFeedbackResponse
		>(store, `businesses/${id}/goods-feedback?limit=50&page_token=${token}`)

		const offers = response?.result

		if (offers?.feedbacks == null) {
			return []
		}

		const feedbacks = offers.feedbacks

		if (feedbacks.length > 0 && offers.paging?.nextPageToken) {
			const nextFeedbacks = await getFeedback(offers.paging.nextPageToken)
			return feedbacks.concat(nextFeedbacks)
		}
		return feedbacks
	}

	try {
		return await getFeedback('')
	} catch (error) {
		logError(error)
	}
}

export const sendOffers = async (
	store: string,
	id: number,
	data: UpdateOfferMappingsRequest
): Promise<UpdateOfferMappingsResponse['results']> => {
	const response = await postRequest<
		UpdateOfferMappingsRequest,
		UpdateOfferMappingsResponse
	>(store, `businesses/${id}/offer-mappings/update`, data)

	return response?.results
}

export const getOffers = async (
	store: string,
	id: number,
	data: GetOfferMappingsRequest
): Promise<GetOfferMappingDTO[] | undefined> => {
	const getOffer = async (token: string): Promise<GetOfferMappingDTO[]> => {
		const response = await postRequest<
			GetOfferMappingsRequest,
			GetOfferMappingsResponse
		>(
			store,
			`businesses/${id}/offer-mappings?limit=200&page_token=${token}`,
			data
		)

		const offers = response?.result

		if (offers?.offerMappings && offers.offerMappings.length > 0) {
			const nextPageToken = offers.paging?.nextPageToken
			if (nextPageToken) {
				const nextOffers = await getOffer(nextPageToken)
				return offers.offerMappings.concat(nextOffers)
			}
			return offers.offerMappings
		}
		return []
	}

	try {
		return await getOffer('')
	} catch (error: unknown) {
		logError(error)
	}
}

export const getOrdersStats = async (
	store: string,
	id: number,
	data: GetOrdersStatsRequest
): Promise<OrdersStatsOrderDTO[] | undefined> => {
	const getOrderStat = async (
		token: string
	): Promise<OrdersStatsOrderDTO[]> => {
		const response = await postRequest<
			GetOrdersStatsRequest,
			GetOrdersStatsResponse
		>(
			store,
			`campaigns/${id}/stats/orders?limit=200&page_token=${token}`,
			data
		)

		const orders = response?.result

		if (orders?.orders && orders.orders.length > 0) {
			const nextPageToken = orders.paging?.nextPageToken
			if (nextPageToken !== token) {
				const nextOrders = nextPageToken
					? await getOrderStat(nextPageToken)
					: []
				return orders.orders.concat(nextOrders)
			}
		}
		return []
	}

	return await getOrderStat('')
}

export const getOrders = async (
	store: string,
	id: number
): Promise<OrderDTO[] | undefined> => {
	const getOrder = async (token: string): Promise<OrderDTO[]> => {
		const response = await getRequest<GetOrdersResponse>(
			store,
			`campaigns/${id}/orders?limit=200&page_token=${token}`
		)

		if (response?.orders && response.orders.length > 0) {
			const nextPageToken = response.paging?.nextPageToken
			if (nextPageToken !== token) {
				const nextOrders = nextPageToken
					? await getOrder(nextPageToken)
					: []
				return response.orders.concat(nextOrders)
			}
		}
		return []
	}

	return await getOrder('')
}

export const getReturns = async (
	store: string,
	id: number
): Promise<ReturnDTO[] | undefined> => {
	const getReturn = async (token: string): Promise<ReturnDTO[]> => {
		const response = await getRequest<GetReturnsResponse>(
			store,
			`campaigns/${id}/returns?limit=200&page_token=${token}`
		)
		const returns = response?.result

		if (returns?.returns && returns.returns.length > 0) {
			const nextPageToken = returns.paging?.nextPageToken
			if (nextPageToken !== token) {
				const nextReturns = nextPageToken
					? await getReturn(nextPageToken)
					: []
				return returns.returns.concat(nextReturns)
			}
		}

		return []
	}

	return await getReturn('')
}

export const sendStocks = async (
	store: string,
	id: number,
	data: UpdateStocksRequest
): Promise<AxiosResponse<{ status: string }, any> | undefined> => {
	const service = getService(store)

	try {
		const response = await service.put<{ status: string }>(
			`campaigns/${id}/offers/stocks`,
			data
		)
		return response
	} catch (error: unknown) {
		logError(error)
	}
}

export const getStocks = async (
	store: string,
	id: number,
	data: GetWarehouseStocksRequest
): Promise<WarehouseOfferDTO[] | undefined> => {
	const getStock = async (token: string): Promise<WarehouseOfferDTO[]> => {
		const response = await postRequest<
			GetWarehouseStocksRequest,
			GetWarehouseStocksResponse
		>(store, `campaigns/${id}/offers/stocks?page_token=${token}`, data)
		const stocks = response?.result

		if (stocks && stocks.warehouses.length > 0) {
			const offers = stocks.warehouses[0].offers || []
			const nextPageToken = stocks.paging?.nextPageToken

			if (nextPageToken !== token) {
				const nextOffers = nextPageToken
					? await getStock(nextPageToken)
					: []
				return offers.concat(nextOffers)
			}

			return offers
		}

		return []
	}

	return await getStock('')
}

export const sendPrices = async (
	store: string,
	id: number,
	data: UpdateBusinessPricesRequest
): Promise<{ status: string } | undefined> => {
	const response = await postRequest<
		UpdateBusinessPricesRequest,
		{ status: string }
	>(store, `businesses/${id}/offer-prices/updates`, data)
	return response
}

export const getOrderById = async ({
	...props
}: Pick<OrderCreatedNotificationDTO, 'campaignId' | 'orderId'>): Promise<
	OrderDTO | undefined
> => {
	const { campaignId, orderId } = props
	const store = campaignId === 23726642 ? 'Haifisch' : 'Top'
	const response = await getRequest<GetOrderResponse>(
		store,
		`campaigns/${campaignId}/orders/${orderId}`
	)
	return response?.order
}

export const getReturnById = async ({
	...props
}: Pick<
	OrderReturnCreatedNotificationDTO,
	'campaignId' | 'orderId' | 'returnId'
>): Promise<ReturnDTO | undefined> => {
	const { campaignId, orderId, returnId } = props
	const store = campaignId === 23726642 ? 'Haifisch' : 'Top'
	const response = await getRequest<GetReturnResponse>(
		store,
		`campaigns/${campaignId}/orders/${orderId}/return/${returnId}`
	)
	return response?.result
}
