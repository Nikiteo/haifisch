import { type AxiosResponse } from 'axios'

import { getService } from '../../utils/get-service'
import { logError } from '../../utils/log-error'
import {
	type GetWarehouseStocksResponse,
	type WarehouseOfferDTO,
	type GetWarehouseStocksRequest,
	type UpdateStocksRequest,
} from '../../types/yandex/api'

const fetchStocks = async (
	service: ReturnType<typeof getService>,
	id: number,
	data: GetWarehouseStocksRequest,
	token: string
): Promise<WarehouseOfferDTO[]> => {
	const response = await service.post<GetWarehouseStocksResponse>(
		`campaigns/${id}/offers/stocks?page_token=${token}`,
		data
	)
	const stocks = response.data.result

	if (stocks && stocks.warehouses.length > 0) {
		const offers = stocks.warehouses[0].offers || []
		const nextPageToken = stocks.paging?.nextPageToken

		if (offers.length > 0 && nextPageToken) {
			const nextOffers = await fetchStocks(
				service,
				id,
				data,
				nextPageToken
			)
			return offers.concat(nextOffers)
		}

		return offers
	}

	return []
}

export const getStocks = async (
	store: string,
	id: number,
	data: GetWarehouseStocksRequest
): Promise<WarehouseOfferDTO[] | undefined> => {
	const service = getService(store)

	try {
		return await fetchStocks(service, id, data, '')
	} catch (error: unknown) {
		logError(error)
		return undefined
	}
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
