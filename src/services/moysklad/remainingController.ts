import axios from 'axios'
import {
	type ResponseMS,
	type ErrorResponse,
	type Remainings,
} from '../../types/ms-types'
import { Logger } from '../../lib'

import { apiService } from './service'

export const getRemainingGoods = async (): Promise<
	ResponseMS<Remainings> | undefined
> => {
	try {
		const response = await apiService.get<ResponseMS<Remainings>>(
			'report/stock/all?filter=productFolder=https://api.moysklad.ru/api/remap/1.2/entity/productfolder/00002a80-94c3-11ee-0a80-0b9c001d1240'
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
