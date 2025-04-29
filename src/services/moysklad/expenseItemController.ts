import axios from 'axios'
import {
	type ResponseMS,
	type IExpenseItem,
	type ErrorResponse,
} from '../../types/ms-types'
import { apiService } from './service'
import { Logger } from '../../lib'

export const getExpenseItems = async (): Promise<
	IExpenseItem[] | undefined
> => {
	try {
		const getExpenseItem = async (
			offset: number
		): Promise<IExpenseItem[]> => {
			const response = await apiService.get<ResponseMS<IExpenseItem>>(
				`entity/expenseitem?offset=${offset}`
			)

			const expenseitems = response.data.rows

			if (
				response.data.meta.size >
				response.data.meta.limit + response.data.meta.offset
			) {
				return expenseitems.concat(await getExpenseItem(1000))
			} else {
				return expenseitems
			}
		}
		return await getExpenseItem(0)
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

export const createExpenseItem = async (
	expenseItem: IExpenseItem[]
): Promise<IExpenseItem[] | undefined> => {
	try {
		const response = await apiService.post<IExpenseItem[]>(
			'entity/expenseitem',
			expenseItem
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

export const postExpenseItem = async (
	expenseItem: IExpenseItem
): Promise<IExpenseItem | undefined> => {
	try {
		const response = await apiService.post<IExpenseItem>(
			'entity/expenseitem',
			expenseItem
		)
		return response.data
	} catch (error: unknown) {
		Logger.warn(error)
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				Logger.error(err.response.data)
			}
		} else {
			Logger.error('Different error than axios')
		}
	}
}

export const getExpenseItemByName = async (
	name: string
): Promise<IExpenseItem[] | undefined> => {
	try {
		const response = await apiService.get<ResponseMS<IExpenseItem>>(
			`entity/expenseitem?filter=name=${name}`
		)
		return response.data.rows
	} catch (error: unknown) {
		Logger.warn(error)
		const err = error as ErrorResponse
		if (axios.isAxiosError(err)) {
			if (err?.response == null || err.code === null) {
				Logger.error('No response')
			} else {
				Logger.error(err.response.data)
			}
		} else {
			Logger.error('Different error than axios')
		}
	}
}
