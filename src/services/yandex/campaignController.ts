import axios from 'axios'
import {
	type ErrorResponse,
	type CampaignResponse,
} from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'
import Logger from '../../lib/logger'

export const getCampaigns = async (
	store: string
): Promise<CampaignResponse | undefined> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop
	try {
		const response = await service.get<CampaignResponse>('/campaigns')
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
