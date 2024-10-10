import axios from 'axios'
import {
	type ResponseMS,
	type Move,
	type ErrorResponse,
} from '../../types/msTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'

export const getMoves = async (): Promise<Move[] | undefined> => {
	try {
		const getMove = async (offset: number): Promise<Move[]> => {
			const response = await apiService.get<ResponseMS<Move>>(
				`entity/move?offset=${offset}`
			)

			const moves = response.data.rows

			if (
				response.data.meta.size >
				response.data.meta.limit + response.data.meta.offset
			) {
				return moves.concat(await getMove(1000))
			} else {
				return moves
			}
		}
		return await getMove(0)
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

export const createMove = async (
	moves: Move[]
): Promise<Move[] | undefined> => {
	try {
		const response = await apiService.post<Move[]>('entity/move', moves)
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
