import axios from 'axios'
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
	try {
		const response = await apiService.get<ResponseMS<Demand>>(
			`entity/demand?filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
		)
		if (response.status !== 200) {
			throw new Error('Кажется, что в entity/demand ошибки')
		} else {
			return response.data
		}
	} catch (error: unknown) {
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				return {
					message: 'No response',
				}
			} else {
				return err.response.data
			}
		} else {
			throw new Error('different error than axios')
		}
	}
}

export const createDemand = async (
	demands: Demand[]
): Promise<Demand[] | ErrorResponse | { message: string }> => {
	try {
		const response = await apiService.post<Demand[]>(
			'entity/demand',
			demands
		)
		if (response.status !== 200) {
			throw new Error('Кажется, что в entity/demand ошибки')
		} else {
			return response.data
		}
	} catch (error: unknown) {
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				return {
					message: 'No response',
				}
			} else {
				return err.response.data
			}
		} else {
			throw new Error('different error than axios')
		}
	}
}
