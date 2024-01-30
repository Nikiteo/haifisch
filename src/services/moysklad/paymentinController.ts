import axios, { type AxiosError } from 'axios'
import {
	type ErrorResponse,
	type ResponseMS,
	type Paymentin,
} from '../../types/msTypes'
import { apiService } from './service'

export const getPaymentin = async (dates: {
	dateFrom: string
	dateTo: string
}): Promise<ResponseMS<Paymentin> | ErrorResponse | { message: string }> => {
	return await apiService
		.get<ResponseMS<Paymentin>>(
			`entity/paymentin?filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
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

export const createPaymentin = async (
	paymentins: Paymentin[]
): Promise<ResponseMS<Paymentin> | ErrorResponse | { message: string }> => {
	return await apiService
		.post<ResponseMS<Paymentin>>('entity/paymentin', paymentins)
		.then(response => {
			if (response.status !== 200) {
				throw new Error('Кажется, что в entity/paymentin ошибки')
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
