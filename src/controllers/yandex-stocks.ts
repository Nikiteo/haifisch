import { Logger } from '../lib'
import { getCampaigns, getStocks, sendStocks } from '../services'
import { getProducts } from '../services/moysklad/productController'
import {
	type UpdateStockDTO,
	type UpdateStocksRequest,
	type WarehouseOfferDTO,
} from '../types/yandex/api'
import { getCampaignIds } from '../utils/yandex/getCampaignIds'

export const updateYandexStocks = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products && products.rows.length > 0) {
			const articlesFromMS = products.rows.map(row => row.article)

			const campaigns = await getCampaigns(store)
			const campaignIds = getCampaignIds(campaigns)

			Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

			if (campaignIds?.FBS && campaigns) {
				const stocks = await getStocks(store, campaignIds.FBS, {
					offerIds: new Set(articlesFromMS),
				})

				Logger.info(
					`[${store}]: Получены данные по остаткам магазина...`
				)

				const stocksLessTen = stocks?.reduce<WarehouseOfferDTO[]>(
					(acc, cur) => {
						const available = cur.stocks.find(
							item => item.type === 'AVAILABLE'
						)
						if (
							available &&
							available.count < 10 &&
							available.count !== 0
						) {
							acc.push(cur)
						}
						return acc
					},
					[]
				)

				const stocksForSend = stocksLessTen?.reduce(
					(acc, cur) => {
						acc.skus.add({
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
						skus: new Set<UpdateStockDTO>(),
					} as unknown as UpdateStocksRequest
				)

				if (stocksForSend && stocksForSend.skus.size > 0) {
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
