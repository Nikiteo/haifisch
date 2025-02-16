import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import { getCampaigns } from '../services/yandex/campaignController'
import { getOffers } from '../services/yandex/offerController'
import { sendPrices } from '../services/yandex/updatePrice'
import { type UpdateBusinessPricesRequest } from '../types/yandex/api'

export const updateYandexPrice = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()
		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products?.rows && products.rows.length > 0) {
			const campaigns = await getCampaigns(store)
			Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

			if (campaigns?.campaigns && campaigns.campaigns.length > 0) {
				const businessId = campaigns.campaigns[0]?.business?.id

				if (businessId) {
					const offers = await getOffers(store, businessId, {
						archived: false,
						tags: ['Мрамор', 'мрамор'],
					})

					const offersForSend =
						offers?.reduce<UpdateBusinessPricesRequest>(
							(acc, cur) => {
								if (!cur?.offer) return acc

								const product = products.rows.find(
									item => item.article === cur.offer?.offerId
								)

								if (product) {
									const basicPrice =
										product.salePrices?.find(
											item =>
												item.priceType.id ===
												'5f713df2-9981-11ee-0a80-0b5a00058c80'
										)?.value ?? 0

									acc.offers.push({
										offerId: cur.offer.offerId,
										price: {
											value: basicPrice / 100,
											discountBase:
												basicPrice / 100 + 300,
											currencyId: 'RUR',
										},
									})
								}
								return acc
							},
							{ offers: [] }
						)

					if (offersForSend && offersForSend?.offers?.length > 0) {
						await sendPrices(store, businessId, offersForSend)
					}

					Logger.warn(
						`Количество отправляемых предложений: ${offersForSend?.offers.length}`
					)

					await sendMessage(`[${store}]: Магазин синхронизирован`)
					Logger.info(`[${store}]: Магазин синхронизирован`)
				}
			}
		}
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(`[${store}]: ${err.message}`)
		} else {
			Logger.error(
				`[${store}]: Неизвестная ошибка: ${JSON.stringify(err)}`
			)
		}
	}
}
