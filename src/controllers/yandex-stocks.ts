import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import { getCampaigns } from '../services/yandex/campaignController'
import { getStocks, sendStocks } from '../services/yandex/stockController'
import { type StocksSendRequest, type OfferStores } from '../types/marketTypes'
import { getCampaignIds } from '../utils/yandex/getCampaignIds'

export const updateYandexStocks = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products != null && products.rows.length > 0) {
			const articlesFromMS = products.rows.map(row => row.article)

			const campaigns = await getCampaigns(store)
			const campaignIds = getCampaignIds(campaigns?.campaigns)

			Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

			if (campaignIds !== undefined && campaigns !== undefined) {
				const stocks = await getStocks(store, campaignIds.FBS, {
					offerIds: articlesFromMS,
				})

				Logger.info(
					`[${store}]: Получены данные по остаткам магазина...`
				)

				const stocksLessTen = stocks?.reduce<OfferStores[]>(
					(acc, cur) => {
						const available = cur.stocks.find(
							item => item.type === 'AVAILABLE'
						)
						if (available != null && available?.count < 10) {
							acc.push(cur)
						}
						return acc
					},
					[]
				)

				const stocksForSend = stocksLessTen?.reduce(
					(acc, cur) => {
						acc.skus.push({
							sku: cur.offerId,
							items: [
								{
									count: 20,
								},
							],
						})

						return acc
					},
					{
						skus: [] as unknown as StocksSendRequest[],
					}
				)

				if (stocksForSend != null && stocksForSend?.skus.length > 0) {
					Logger.info(`[${store}]: Отправляю новые остатки...`)

					const response = await sendStocks(
						store,
						campaignIds.FBS,
						stocksForSend
					)

					await sendMessage(
						`[${store}]: Маркет ответил ${response?.data.status}`
					)

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
		}
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
