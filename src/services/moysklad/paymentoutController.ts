import axios, { type AxiosError } from 'axios'
import {
	type ResponseMS,
	type Paymentout,
	type ErrorResponse,
} from '../../types/msTypes'
import { apiService } from './service'

export const getPaymentout = async (dates: {
	dateFrom: string
	dateTo: string
}): Promise<ResponseMS<Paymentout> | ErrorResponse | { message: string }> => {
	return await apiService
		.get<ResponseMS<Paymentout>>(
			`entity/paymentout?filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
		)
		.then(response => {
			return response.data
		})
		.catch((error: AxiosError<ErrorResponse>) => {
			if (axios.isAxiosError(error)) {
				if (error?.response == null || error.code === null) {
					return {
						message: 'No response',
					}
				} else {
					return error.response.data
				}
			} else {
				throw new Error('different error than axios')
			}
		})
}

export const createPaymentout = async (
	paymentouts: Paymentout[]
): Promise<ResponseMS<Paymentout> | ErrorResponse | { message: string }> => {
	return await apiService
		.post<ResponseMS<Paymentout>>('entity/paymentout', paymentouts)
		.then(response => {
			if (response.status !== 200) {
				throw new Error('Кажется, что в entity/paymentout ошибки')
			} else {
				return response.data
			}
		})
		.catch((error: AxiosError<ErrorResponse>) => {
			if (axios.isAxiosError(error)) {
				if (error?.response == null || error.code === null) {
					return {
						message: 'No response',
					}
				} else {
					return error.response.data
				}
			} else {
				throw new Error('different error than axios')
			}
		})
}
