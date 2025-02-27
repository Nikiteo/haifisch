import axios from 'axios'
import {
	type ErrorResponse,
	type ResponseMS,
	type SalesReturn,
} from '../../types/ms-types'
import { apiService } from './service'
import { Logger } from '../../lib'

export const getSalesReturn = async (dates: {
	dateFrom: string
	dateTo: string
}): Promise<SalesReturn[] | undefined> => {
	try {
		const getSalereturn = async (
			offset: number
		): Promise<SalesReturn[]> => {
			const response = await apiService.get<ResponseMS<SalesReturn>>(
				`entity/salesreturn?offset=${offset}&filter=moment>${dates.dateFrom};moment<${dates.dateTo}`
			)

			const salesreturns = response.data.rows

			if (
				response.data.meta.size >
				response.data.meta.limit + response.data.meta.offset
			) {
				return salesreturns.concat(await getSalereturn(1000))
			} else {
				return salesreturns
			}
		}
		return await getSalereturn(0)
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

export const createSalesReturn = async (
	salesReturns: SalesReturn[]
): Promise<SalesReturn[] | undefined> => {
	try {
		const response = await apiService.post<SalesReturn[]>(
			'entity/salesreturn',
			salesReturns
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

export const getSaleReturnById = async (
	id: string
): Promise<SalesReturn | undefined> => {
	try {
		const response = await apiService.get<SalesReturn>(
			`entity/salesreturn/${id}`
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

export const getSaleReturnByName = async (
	name: string
): Promise<SalesReturn[] | undefined> => {
	try {
		const response = await apiService.post<ResponseMS<SalesReturn>>(
			`entity/salesreturn?filter=name=${name}`
		)
		return response.data.rows
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
