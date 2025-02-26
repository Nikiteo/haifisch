import { apiService } from './service'

import axios from 'axios'
import {
	type ResponseMS,
	type CustomerOrder,
	type ErrorResponse,
} from '../../types/ms-types'
import { Logger } from '../../lib'

export const getCustomerOrders = async (
	dates: {
		dateFrom: string
		dateTo: string
	},
	store: string
): Promise<CustomerOrder[] | undefined> => {
	try {
		const ozonAgent =
			'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/50f00f03-9830-11ee-0a80-11fb0042a37d'
		const yandexAgent =
			'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/2d059b74-92a6-11ee-0a80-145a0044e87e'

		const agent = store === 'Ozon' ? ozonAgent : yandexAgent

		const getCustomerOrder = async (
			offset: number
		): Promise<CustomerOrder[]> => {
			const response = await apiService.get<ResponseMS<CustomerOrder>>(
				`entity/customerorder?offset=${offset}&filter=moment>${dates.dateFrom};moment<${dates.dateTo};agent=${agent}`
			)

			const orders = response.data.rows

			if (
				response.data.meta.size >
				response.data.meta.limit + response.data.meta.offset
			) {
				return orders.concat(await getCustomerOrder(1000))
			} else {
				return orders
			}
		}
		return await getCustomerOrder(0)
	} catch (error: unknown) {
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				Logger.error(err.response.data)
			}
		} else {
			Logger.error('different error than axios')
		}
	}
}

export const createCustomerOrder = async (
	orders: CustomerOrder[]
): Promise<CustomerOrder[] | undefined> => {
	try {
		const response = await apiService.post<CustomerOrder[]>(
			'entity/customerorder',
			orders
		)
		return response.data
	} catch (error: unknown) {
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				if (err.response.data.length > 0) {
					const errorsFiltered = err.response.data?.filter(
						(item: any) => item.errors
					)
					if (errorsFiltered.length > 0) {
						Logger.error(
							`В запросе ${err.response.config.url} найдено ошибок: ${errorsFiltered.length}`
						)
						return err.response.data?.filter((item: any) =>
							errorsFiltered.some(
								(errItem: any) => item.name !== errItem.name
							)
						)
					}
				}
			}
		} else {
			Logger.error('different error than axios')
		}
	}
}

export const getCustomerOrderByName = async (
	name: string
): Promise<CustomerOrder[] | undefined> => {
	try {
		const response = await apiService.get<ResponseMS<CustomerOrder>>(
			`entity/customerorder?filter=name=${name}`
		)
		return response.data.rows
	} catch (error: unknown) {
		Logger.warn(error)
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				Logger.error(err.response.data)
			}
		} else {
			Logger.error('Different error than axios')
		}
	}
}
export const getCustomerOrderById = async (
	id: string
): Promise<CustomerOrder | undefined> => {
	try {
		const response = await apiService.get<CustomerOrder>(
			`entity/customerorder/${id}`
		)
		return response.data
	} catch (error: unknown) {
		Logger.warn(error)
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				Logger.error(err.response.data)
			}
		} else {
			Logger.error('Different error than axios')
		}
	}
}

export const createNewCustomerOrder = async (
	order: CustomerOrder
): Promise<CustomerOrder | undefined> => {
	try {
		const response = await apiService.post<CustomerOrder>(
			'entity/customerorder',
			order
		)
		return response.data
	} catch (error: unknown) {
		Logger.warn(error)
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				Logger.error(err.response.data)
			}
		} else {
			Logger.error('Different error than axios')
		}
	}
}

export const updateCustomerOrder = async (
	order: CustomerOrder
): Promise<CustomerOrder | undefined> => {
	try {
		const response = await apiService.put<CustomerOrder>(
			`entity/customerorder/${order.id}`,
			order
		)
		return response.data
	} catch (error: unknown) {
		Logger.warn(error)
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				Logger.error(err.response.data)
			}
		} else {
			Logger.error('Different error than axios')
		}
	}
}