import axios, { type AxiosResponse, type AxiosError } from 'axios'
import {
	type ErrorResponse,
	type ResponseMS,
	type Product,
} from '../../types/msTypes'
import { apiService } from './service'

export const getProducts = async (): Promise<
	ResponseMS<Product> | ErrorResponse | { message: string }
> => {
	return await apiService
		.get<ResponseMS<Product>>('entity/product?filter=pathName=Изделия')
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

export const createProducts = async (
	products: Product[]
): Promise<
	| ErrorResponse
	| AxiosResponse<ResponseMS<Product>, any>
	| { message: string }
> => {
	return await apiService
		.post<AxiosResponse<ResponseMS<Product>>>('entity/product', products)
		.then(response => {
			if (response.status !== 200) {
				throw new Error('Кажется, что в entity/product ошибки')
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
