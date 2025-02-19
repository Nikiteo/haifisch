import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import {
	getOzonStocks,
	sendOzonStocks,
} from '../services/ozon/stocksController'
import { type StockRequest } from '../types/ozonTypes'

export const updateOzonStocks = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products != null && products.rows.length > 0) {
			const articlesFromMS = products.rows.map(row => row.article)
			const stocks = await getOzonStocks({
				filter: {
					offer_id: articlesFromMS,
					visibility: 'ALL',
				},
				limit: 1000,
			})

			Logger.info(`[${store}]: Получены данные по остаткам магазина...`)

			const offersForSend = stocks?.reduce(
				(acc, item) => {
					const fbsStock = item.stocks.find(
						stock => stock.type === 'fbs'
					)
					if (
						fbsStock != null &&
						fbsStock.present < 10 &&
						fbsStock.present !== 0
					) {
						acc.stocks.push({
							product_id: item.product_id,
							stock: 30,
							warehouse_id: 1020000718066000,
						})
					}
					return acc
				},
				{ stocks: [] as unknown as StockRequest[] }
			)

			if (
				offersForSend !== undefined &&
				offersForSend.stocks.length > 0
			) {
				Logger.info(`[${store}]: Отправляю новые остатки...`)
				await sendOzonStocks(offersForSend)
				await sendMessage(`[${store}]: Магазин синхронизирован`)
				Logger.info(`[${store}]: Магазин синхронизирован`)
			} else {
				await sendMessage(
					`[${store}]: Все остатки больше 10 - обновлять нечего`
				)
				Logger.info(
					`[${store}]: Все остатки больше 10 - обновлять нечего`
				)
			}
		}
	} catch (err) {
		Logger.error(`[Ozon]: ${err as string}`)
	}
}
