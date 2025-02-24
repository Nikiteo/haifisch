import axios from 'axios'
import {
	type ResponseMS,
	type Demand,
	type ErrorResponse,
} from '../../types/ms-types'
import { apiService } from './service'
import { Logger } from '../../lib'

export const getDemands = async (dates: {
	dateFrom: string
	dateTo: string
}): Promise<Demand[] | undefined> => {
	try {
		const getDemand = async (offset: number): Promise<Demand[]> => {
			const response = await apiService.get<ResponseMS<Demand>>(
				`entity/demand?offset=${offset}&filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
			)

			const demands = response.data.rows

			if (
				response.data.meta.size >
				response.data.meta.limit + response.data.meta.offset
			) {
				return demands.concat(await getDemand(1000))
			} else {
				return demands
			}
		}
		return await getDemand(0)
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

export const createDemand = async (
	demands: Demand[]
): Promise<Demand[] | undefined> => {
	try {
		const response = await apiService.post<Demand[]>(
			'entity/demand',
			demands
		)
		return response.data
	} catch (error: unknown) {
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				if (err.response.data.length > 0) {
					const errorsFiltered = err.response.data?.filter(
						(item: any) => item.errors
					)
					if (errorsFiltered.length > 0) {
						Logger.error(
							`В запросе ${err.response.config.url} найдено ошибок: ${errorsFiltered.length}`
						)
						return err.response.data?.filter((item: any) =>
							errorsFiltered.some(
								(errItem: any) => item.name !== errItem.name
							)
						)
					}
				}
			}
		} else {
			Logger.error('different error than axios')
		}
	}
}
