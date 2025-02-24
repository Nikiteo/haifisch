import axios from 'axios'
import {
	type ErrorResponse,
	type ResponseMS,
	type Product,
} from '../../types/ms-types'
import { apiService } from './service'
import { Logger } from '../../lib'

export const getProducts = async (): Promise<
	ResponseMS<Product> | undefined
> => {
	try {
		const response = await apiService.get<ResponseMS<Product>>(
			'entity/product?filter=pathName=Изделия'
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

export const createProducts = async (
	products: Product[]
): Promise<ResponseMS<Product> | undefined> => {
	try {
		const response = await apiService.post<ResponseMS<Product>>(
			'entity/product',
			products
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
