import axios from 'axios'
import {
	type ErrorResponse,
	type ResponseMS,
	type Paymentin,
} from '../../types/msTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getPaymentin = async (): Promise<Paymentin[] | undefined> => {
	try {
		const getPaymentin = async (offset: number): Promise<Paymentin[]> => {
			const response = await apiService.get<ResponseMS<Paymentin>>(
				`entity/paymentin?offset=${offset}`
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
): Promise<ResponseMS<Paymentin> | undefined> => {
	try {
		const response = await apiService.post<ResponseMS<Paymentin>>(
			'entity/paymentin',
			paymentins
		)
		return response.data
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
