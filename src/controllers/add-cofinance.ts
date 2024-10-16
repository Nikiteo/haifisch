import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import { getCampaigns } from '../services/yandex/campaignController'
import { getOffers, sendOffers } from '../services/yandex/offerController'
import { type OfferMapping } from '../types/marketTypes'

export const addCofinance = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendReply: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products != null && products.rows.length > 0) {
			const campaigns = await getCampaigns(store)

			Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

			if (campaigns !== undefined) {
				const businessId = campaigns.campaigns[0].business.id

				const offers = await getOffers(store, businessId, {
					archived: false,
					tags: ['Мрамор', 'мрамор'],
				})

				const offersForSend = offers?.reduce(
					(acc, cur) => {
						const product = products.rows.find(
							item => item.article === cur.offer.offerId
						)
						const minPrice =
							product?.salePrices?.find(
								item =>
									item.priceType.id ===
									'b4b53c4e-7cd3-11ef-0a80-0f350015a3b8'
							)?.value ?? 0

						const optPrice =
							product?.salePrices?.find(
								item =>
									item.priceType.id ===
									'209bade1-8a19-11ef-0a80-156400730036'
							)?.value ?? 0

						if (optPrice !== 0) {
							acc.offerMappings.push({
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-expect-error
								offer: {
									offerId: cur.offer.offerId,
									cofinancePrice: {
										value: minPrice / 100,
										currencyId: 'RUR',
									},
									purchasePrice: {
										value: optPrice / 100,
										currencyId: 'RUR',
									},
								},
							})
						}
						return acc
					},
					{
						offerMappings: [] as unknown as OfferMapping[],
					}
				)

				if (
					offersForSend?.offerMappings != null &&
					offersForSend.offerMappings.length > 0
				) {
					await sendOffers(store, businessId, offersForSend)
				}

				await sendMessage(`[${store}]: Магазин синхронизирован`)
				Logger.info(`[${store}]: Магазин синхронизирован`)
			}
		}
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
