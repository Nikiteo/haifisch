import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import {
	getProductPrices,
	sendPrices,
} from '../services/ozon/productController'
import { type SendPricesRequest } from '../types/ozonTypes'

export const addOzonCofinance = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendReply: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products != null && products.rows.length > 0) {
			const articlesFromMS = products.rows.map(row => row.article)
			const prices = await getProductPrices({
				filter: {
					offer_id: articlesFromMS,
					visibility: 'ALL',
				},
				limit: 1000,
			})
			Logger.info(`[${store}]: Получены данные по ценам магазина...`)

			const pricesForSend = prices?.items.reduce<SendPricesRequest>(
				(acc, cur) => {
					const product = products.rows.find(
						item => item.article === cur.offer_id
					)
					const minPrice =
						product?.salePrices?.find(
							item =>
								item.priceType.id ===
								'b4b53c4e-7cd3-11ef-0a80-0f350015a3b8'
						)?.value ?? 0

					acc.prices.push({
						offer_id: cur.offer_id,
						currency_code: cur.price.currency_code,
						price: cur.price.price.toString(),
						old_price: cur.price.old_price.toString(),
						min_price: (minPrice / 100).toString(),
						min_price_for_auto_actions_enabled: true,
					})
					return acc
				},
				{
					prices: [],
				}
			)
			Logger.info(`[${store}]: Отправляю данные по ценам магазина...`)

			if (pricesForSend != null && pricesForSend?.prices.length > 0) {
				await sendPrices(pricesForSend)
			}

			await sendMessage(`[${store}]: Магазин синхронизирован`)
			Logger.info(`[${store}]: Магазин синхронизирован`)
		}
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
