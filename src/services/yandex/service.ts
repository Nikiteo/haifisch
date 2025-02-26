import axios from 'axios'
import { logError } from '../../utils/log-error'
import { getService } from '../../utils/get-service'
import { Logger } from '../../lib'

const TOP_TOKEN = process.env.TOP_TOKEN
const HF_TOKEN = process.env.HF_TOKEN
const URL = process.env.YANDEX_URL

export const apiServiceTop = axios.create({
	baseURL: URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Api-Key': TOP_TOKEN,
	},
})
export const apiServiceHf = axios.create({
	baseURL: URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Api-Key': HF_TOKEN,
	},
})

export const postRequest = async <T, R>(
	store: string,
	url: string,
	data?: T
): Promise<R | undefined> => {
	const service = getService(store)

	try {
		const response = await service.post<R>(url, data)
		return response.data
	} catch (error: unknown) {
		logError(error)
	}
}

export const getRequest = async <R>(
	store: string,
	url: string,
	params?: Record<string, any>
): Promise<R | undefined> => {
	const service = getService(store)
	Logger.info(service)
	try {
		const response = await service.get<R>(url, { params })
		return response.data
	} catch (error: unknown) {
		logError(error)
	}
}
