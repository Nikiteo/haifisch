import axios from 'axios'
import {} from '../../types/ozonTypes'
import { apiService } from './service'
import Logger from '../../lib/logger'
import {
	type Shipments,
	type RequestShipments,
	type RequestOrders,
	type Orders,
	type ShipmentsData,
	type Shipment,
} from '../../types/sberTypes'

export const getSberShipments = async ({
	...props
}: RequestShipments): Promise<ShipmentsData['shipments'] | undefined> => {
	const data = JSON.stringify(props)
	try {
		const response = await apiService.get<Shipments>('search', { data })
		return response.data.data.shipments
	} catch (error: unknown) {
		const err = error
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

export const getSberOrders = async ({
	...props
}: RequestOrders): Promise<Shipment[] | undefined> => {
	const data = JSON.stringify(props)
	try {
		const response = await apiService.get<Orders>('get', { data })
		return response.data.data.shipments
	} catch (error: unknown) {
		const err = error
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
