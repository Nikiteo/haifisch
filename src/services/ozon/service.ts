import axios from 'axios'
import { logOzonError } from '../../utils/log-ozon-error'

const TOKEN = process.env.OZON_TOKEN
const CLIENT_ID = process.env.OZON_CLIENT_ID
const URL = process.env.OZON_URL

export const apiService = axios.create({
	baseURL: URL,
	headers: {
		Accept: 'application/json',
		'Api-Key': TOKEN,
		'Client-Id': CLIENT_ID,
		'Content-Type': 'application/json',
	},
})

export const postRequest = async <T, R>(
	url: string,
	data?: T,
	responseType?: 'arraybuffer'
): Promise<R | undefined> => {
	try {
		const response = await apiService.post<R>(url, data, { responseType })
		return response.data
	} catch (error: unknown) {
		logOzonError(error)
	}
}

export const getRequest = async <R>(
	url: string,
	params?: Record<string, any>
): Promise<R | undefined> => {
	try {
		const response = await apiService.get<R>(url, { params })
		return response.data
	} catch (error: unknown) {
		logOzonError(error)
	}
}
