import Logger from '../lib/logger'
import { getOzonStocks } from '../services/ozon/stocksController'

export const ozonStocks = async (): Promise<void> => {
	try {
		const stocksProps = {
			limit: 1000,
			offset: 0,
			warehouse_type: 'ALL',
		}

		const stocks = await getOzonStocks(stocksProps)

		Logger.info(JSON.stringify(stocks))
	} catch (err) {
		Logger.error(`[Ozon]: ${err as string}`)
	}
}
