import axios, { type AxiosError } from 'axios'
import {
	type ResponseMS,
	type Demand,
	type ErrorResponse,
} from '../../types/msTypes'
import { apiService } from './service'

export const getDemands = async (dates: {
	dateFrom: string
	dateTo: string
}): Promise<ResponseMS<Demand> | ErrorResponse | { message: string }> => {
	return await apiService
		.get<ResponseMS<Demand>>(
			`entity/demand?filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
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

export const createDemand = async (
	demands: Demand[]
): Promise<Demand[] | ErrorResponse | { message: string }> => {
	return await apiService
		.post<Demand[]>('entity/demand', demands)
		.then(response => {
			if (response.status !== 200) {
				throw new Error('Кажется, что в entity/demand ошибки')
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
