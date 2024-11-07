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
			const articlesFromMS = products.rows
				.map(
					row =>
						row.attributes?.find(
							item =>
								item.id ===
								'2ca97089-8ade-11ef-0a80-148c0011190c'
						)?.value
				)
				.filter(item => Boolean(item))

			const stocks = await getOzonStocks({
				sku: articlesFromMS
					.filter(sku => sku !== 9999667)
					.filter(sku => sku !== 9999666),
			})

			Logger.info(`[${store}]: Получены данные по остаткам магазина...`)

			const offersForSend = stocks
				?.filter(stock => stock.warehouse_id === 1020000718066000)
				?.reduce(
					(acc, cur) => {
						if (cur.present < 10) {
							acc.stocks.push({
								product_id: cur.product_id,
								stock: 20,
								warehouse_id: cur.warehouse_id,
							})
						}

						return acc
					},
					{
						stocks: [] as unknown as StockRequest[],
					}
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
