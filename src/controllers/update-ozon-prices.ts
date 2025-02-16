import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import {
	getProductPrices,
	sendPrices,
} from '../services/ozon/productController'
import { type SendPricesRequest } from '../types/ozonTypes'

export const updateOzonPrices = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
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

					const basicPrice =
						product?.salePrices?.find(
							item =>
								item.priceType.id ===
								'5f713df2-9981-11ee-0a80-0b5a00058c80'
						)?.value ?? 0

					acc.prices.push({
						...cur,
						price: (basicPrice / 100).toString(),
						old_price: (basicPrice / 100 + 500).toString(),
					})
					return acc
				},
				{
					prices: [],
				}
			)
			Logger.info(`[${store}]: Отправляю данные по ценам магазина...`)

			if (pricesForSend != null && pricesForSend?.prices.length > 0) {
				const response = await sendPrices(pricesForSend)

				if (response?.result !== undefined) {
					for (const item of response.result) {
						if (item.errors.length > 0) {
							for (const error of item.errors) {
								const message = `ID: ${item.offer_id}\nКод ошибки: ${error.code}\nСообщение: ${error.message}`
								await sendMessage(`[${store}]: ${message}`)
							}
						}
					}
				} else {
					Logger.warn(
						`[${store}]: Ответ от sendPrices пустой или не содержит result`
					)
				}
			}

			await sendMessage(`[${store}]: Магазин синхронизирован`)
			Logger.info(`[${store}]: Магазин синхронизирован`)
		}
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
