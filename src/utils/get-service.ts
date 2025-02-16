import { type AxiosInstance } from 'axios'
import { apiServiceHf, apiServiceTop } from '../services/yandex/service'

export const getService = (store: string): AxiosInstance =>
	store === 'Haifisch' ? apiServiceHf : apiServiceTop
