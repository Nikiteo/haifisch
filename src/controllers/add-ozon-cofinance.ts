import { Logger } from '../lib'
import { getProductPrices, sendOzonPrices } from '../services'
import { getProducts } from '../services/moysklad/productController'
import { Product } from '../types/ms-types'
import {
	GetProductPrice,
	GetProductPricesRequestVisibilityEnum,
	ImportProductPricesRequest,
	ImportProductPricesRequestAutoActionEnabledEnum,
} from '../types/ozon/ozon-types'

const createPriceEntry = (cur: GetProductPrice, product?: Product) => {
	const minPrice =
		product?.salePrices?.find(
			item => item.priceType.id === 'b4b53c4e-7cd3-11ef-0a80-0f350015a3b8'
		)?.value ?? 0

	return {
		offer_id: cur.offer_id,
		currency_code: cur.price?.currency_code,
		price: cur.price?.price?.toString(),
		old_price: cur.price?.old_price?.toString(),
		min_price: (minPrice / 100).toString(),
		min_price_for_auto_actions_enabled: true,
		auto_action_enabled:
			'ENABLED' as ImportProductPricesRequestAutoActionEnabledEnum,
	}
}

export const addOzonCofinance = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()
		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products && products?.rows.length > 0) {
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
					const product = products.rows.find(
						item => item.article === cur.offer_id
					)
					acc.prices?.push(createPriceEntry(cur, product))
					return acc
				},
				{ prices: [] }
			)

			Logger.info(`[${store}]: Отправляю данные по ценам магазина...`)

			if (pricesForSend?.prices && pricesForSend.prices.length > 0) {
				const response = await sendOzonPrices(pricesForSend)

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
