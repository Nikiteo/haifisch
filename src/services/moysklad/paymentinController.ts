import axios from 'axios'
import {
	type ErrorResponse,
	type ResponseMS,
	type Paymentin,
} from '../../types/ms-types'
import { apiService } from './service'
import { Logger } from '../../lib'

export const getPaymentin = async (dates: {
	dateFrom: string
	dateTo: string
}): Promise<Paymentin[] | undefined> => {
	try {
		const getPaymentin = async (offset: number): Promise<Paymentin[]> => {
			const response = await apiService.get<ResponseMS<Paymentin>>(
				`entity/paymentin?offset=${offset}&filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
			)

			const paymentins = response.data.rows

			if (
				response.data.meta.size >
				response.data.meta.limit + response.data.meta.offset
			) {
				return paymentins.concat(await getPaymentin(1000))
			} else {
				return paymentins
			}
		}
		return await getPaymentin(0)
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

export const createPaymentin = async (
	paymentins: Paymentin[]
): Promise<Paymentin[] | undefined> => {
	try {
		const response = await apiService.post<ResponseMS<Paymentin>>(
			'entity/paymentin',
			paymentins
		)
		return response.data.rows
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
