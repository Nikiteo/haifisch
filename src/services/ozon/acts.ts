import axios from 'axios'

import { apiService } from './service'
import Logger from '../../lib/logger'
import { type ErrorResponse } from '../../types/msTypes'
import {
	type CreateActResponse,
	type CreateActRequest,
	type GetActResponse,
	type GetActsResponse,
	type GetQrRequest,
} from '../../types/ozonTypes'

export const getActs = async (): Promise<GetActResponse[] | undefined> => {
	try {
		const response = await apiService.post<GetActsResponse>(
			'v1/posting/carriage-available/list'
		)
		return response.data.result
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

export const createAct = async ({
	...props
}: CreateActRequest): Promise<CreateActResponse['result'] | undefined> => {
	try {
		const response = await apiService.post<CreateActResponse>(
			'v2/posting/fbs/act/create',
			{ ...props }
		)
		return response.data.result
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

export const getQr = async ({
	...props
}: GetQrRequest): Promise<Buffer | undefined> => {
	try {
		const response = await apiService.post<string>(
			'v2/posting/fbs/act/get-barcode',
			{ ...props },
			{
				responseType: 'arraybuffer',
			}
		)
		return Buffer.from(response.data)
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
