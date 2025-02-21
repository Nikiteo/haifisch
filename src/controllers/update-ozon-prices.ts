import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import { getProductPrices, sendPrices } from '../services/ozon/api'
import { Product } from '../types/msTypes'
import {
	GetProductPricesRequestVisibilityEnum,
	GetProductPrice,
	ImportProductPricesRequest,
} from '../types/ozon/ozon-types'

const calculatePrices = (product?: Product, cur?: GetProductPrice) => {
	const basicPrice =
		product?.salePrices?.find(
			item => item.priceType.id === '5f713df2-9981-11ee-0a80-0b5a00058c80'
		)?.value ?? 0

	const oldPrice = basicPrice / 100 + 500
	const price = basicPrice / 100
	const minPrice = Math.floor(price - price * 0.4)

	return {
		...cur,
		min_price: minPrice.toString(),
		price: price.toString(),
		old_price: oldPrice.toString(),
	}
}

export const updateOzonPrices = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()
		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products?.rows && products.rows.length > 0) {
			const articlesFromMS = products.rows.map(row => row.article)
			const prices = await getProductPrices({
				filter: {
					offer_id: articlesFromMS,
					visibility: 'ALL' as GetProductPricesRequestVisibilityEnum,
				},
				limit: 1000,
			})
			Logger.info(`[${store}]: Получены данные по ценам магазина...`)

			const pricesForSend = prices?.reduce<ImportProductPricesRequest>(
				(acc, cur) => {
					const product = products?.rows.find(
						item => item.article === cur.offer_id
					)
					acc.prices?.push(calculatePrices(product, cur))
					return acc
				},
				{ prices: [] }
			)

			Logger.info(`[${store}]: Отправляю данные по ценам магазина...`)

			if (pricesForSend?.prices && pricesForSend?.prices?.length > 0) {
				const response = await sendPrices(pricesForSend)

				if (response?.result) {
					for (const item of response.result) {
						if (item.errors && item.errors?.length > 0) {
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
		Logger.error(
			`[${store}]: Ошибка - ${err instanceof Error ? err.message : err}`
		)
	}
}
