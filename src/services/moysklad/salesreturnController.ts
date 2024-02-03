import axios from 'axios'
import {
	type ErrorResponse,
	type ResponseMS,
	type SalesReturn,
} from '../../types/msTypes'
import { apiService } from './service'

export const getSalesReturn = async (dates: {
	dateFrom: string
	dateTo: string
}): Promise<ResponseMS<SalesReturn> | ErrorResponse | { message: string }> => {
	return await apiService
		.get<ResponseMS<SalesReturn>>(
			`entity/salesreturn?filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
		)
		.then(response => {
			return response.data
		})
		.catch((error: ErrorResponse) => {
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

export const createSalesReturn = async (
	salesReturns: SalesReturn[]
): Promise<SalesReturn[] | ErrorResponse | { message: string }> => {
	return await apiService
		.post<SalesReturn[]>('entity/salesreturn', salesReturns)
		.then(response => {
			if (response.status !== 200) {
				throw new Error('Кажется, что в entity/salesreturn ошибки')
			} else {
				return response.data
			}
		})
		.catch((error: ErrorResponse) => {
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
