import axios from 'axios'
import {
	type ResponseMS,
	type Paymentout,
	type ErrorResponse,
} from '../../types/msTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getPaymentout = async (dates: {
	dateFrom: string
	dateTo: string
}): Promise<Paymentout[] | undefined> => {
	try {
		const getPaymentout = async (offset: number): Promise<Paymentout[]> => {
			const response = await apiService.get<ResponseMS<Paymentout>>(
				`entity/paymentout?offset=${offset}&filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
			)

			const paymentouts = response.data.rows

			if (
				response.data.meta.size >
				response.data.meta.limit + response.data.meta.offset
			) {
				return paymentouts.concat(await getPaymentout(1000))
			} else {
				return paymentouts
			}
		}
		return await getPaymentout(0)
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

export const createPaymentout = async (
	paymentouts: Paymentout[]
): Promise<ResponseMS<Paymentout> | undefined> => {
	try {
		const response = await apiService.post<ResponseMS<Paymentout>>(
			'entity/paymentout',
			paymentouts
		)
		return response.data
	} catch (error: unknown) {
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				if (err.response.data.length > 0) {
					const errorsFiltered = err.response.data.filter(
						(item: any) => item.errors
					)
					if (errorsFiltered.length > 0) {
						Logger.error(
							`В запросе ${err.response.config.url} найдено ошибок: ${errorsFiltered.length}`
						)
						return err.response.data.filter((item: any) =>
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
