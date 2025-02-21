import axios, { AxiosError } from 'axios'
import Logger from '../../lib/logger'

const URL = process.env.TINKOFF_URL
const tokens = {
	Haifisch: process.env.TINKOFF_HF_TOKEN,
	Ozon: process.env.TINKOFF_OZON_TOKEN,
	Top: process.env.TINKOFF_TOP_TOKEN,
}

export const apiService = axios.create({
	baseURL: URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

export const getRequest = async <R>(
	url: string,
	params?: Record<string, any>,
	tokenKey: keyof typeof tokens = 'Haifisch'
): Promise<R | undefined> => {
	try {
		const token = tokens[tokenKey]

		const response = await apiService.get<R>(url, {
			params,
			headers: {
				Authorization: token ? `Bearer ${token}` : undefined,
			},
		})

		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			Logger.error(`Axios error: ${error.message}`)
		} else {
			Logger.error(`Unexpected error: ${error}`)
		}
		return undefined
	}
}
