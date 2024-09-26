import axios from 'axios'
import {
	type TransactionsResponse,
	type ErrorResponse,
	type TransactionsRequest,
	type Operation,
} from '../../types/ozonTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getTransactions = async ({
	...props
}: TransactionsRequest): Promise<Operation[] | undefined> => {
	try {
		const getTransaction = async (page: number): Promise<Operation[]> => {
			const response = await apiService.post<TransactionsResponse>(
				'v3/finance/transaction/list',
				{ ...props, page }
			)
			const operations = response.data.result.operations

			if (page < response.data.result.page_count) {
				return operations.concat(await getTransaction(page + 1))
			} else {
				return operations
			}
		}
		return await getTransaction(1)
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
