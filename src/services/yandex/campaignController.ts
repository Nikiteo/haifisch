import axios, { type AxiosError } from 'axios'
import {
	type ErrorResponse,
	type CampaignResponse,
} from '../../types/marketTypes'
import { apiServiceHf, apiServiceTop } from './service'

export const getCampaigns = async (
	store: string
): Promise<CampaignResponse | ErrorResponse | { message: string }> => {
	const service = store === 'Haifisch' ? apiServiceHf : apiServiceTop
	return await service
		.get<CampaignResponse>('/campaigns')
		.then(response => {
			return response.data
		})
		.catch((error: AxiosError<ErrorResponse>) => {
			if (axios.isAxiosError(error)) {
				if (error?.response == null || error.code === null) {
					return {
						message: 'No response',
					}
				} else {
					return error.response.data
				}
			} else {
				throw new Error('different error than axios')
			}
		})
}
