import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import { getOzonStocks, sendOzonStocks } from '../services/ozon/api'
import {
	UpdateProductStocksRequest,
	GetProductStocksRequestVisibilityEnum,
} from '../types/ozon/ozon-types'

export const updateOzonStocks = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products && products.rows.length > 0) {
			const articlesFromMS = products.rows.map(row => row.article)
			const stocks = await getOzonStocks({
				filter: {
					offer_id: articlesFromMS,
					visibility: 'ALL' as GetProductStocksRequestVisibilityEnum,
				},
				limit: 1000,
			})

			Logger.info(`[${store}]: Получены данные по остаткам магазина...`)

			const offersForSend = stocks?.reduce<UpdateProductStocksRequest>(
				(acc, item) => {
					const fbsStock = item.stocks?.find(
						stock => stock.type === 'fbs'
					)
					if (
						fbsStock &&
						fbsStock.present !== undefined &&
						fbsStock.present < 10 &&
						fbsStock.present !== 0
					) {
						if (!acc.stocks) {
							acc.stocks = []
						}
						acc.stocks.push({
							product_id: item.product_id,
							stock: 30,
							warehouse_id: 1020000718066000,
						})
					}
					return acc
				},
				{ stocks: [] }
			)

			if (
				offersForSend &&
				offersForSend.stocks &&
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
