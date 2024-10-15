import Logger from '../lib/logger'
import {
	createProducts,
	getProducts,
} from '../services/moysklad/productController'
import { getCampaigns } from '../services/yandex/campaignController'
import { getOffers } from '../services/yandex/offerController'
import { prepareProducts } from '../utils/yandex/prepareProducts'

export const updateYandexProducts = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendReply: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const campaigns = await getCampaigns(store)

		Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (campaigns !== undefined) {
			if (products != null && products.rows.length > 0) {
				const offers = await getOffers(
					store,
					campaigns.campaigns[0].business.id,
					{
						archived: false,
						tags: ['Мрамор', 'мрамор'],
					}
				)

				const domain = campaigns.campaigns[0].domain

				const preparedProducts = prepareProducts(
					products.rows,
					offers ?? [],
					domain
				)

				if (preparedProducts.length > 0) {
					await createProducts(preparedProducts)
				}

				const notSellingProducts = products.rows.filter(
					item =>
						item.salePrices.find(
							sale =>
								sale.priceType.id ===
								(store === 'Haifisch'
									? '4f9e295d-f557-11ed-0a80-11cd001da711'
									: '7c24e5c8-9423-11ee-0a80-1464000e6213')
						)?.value === 0
				)

				const resp = notSellingProducts.map(row => {
					return `[${row.name}](${row?.meta?.uuidHref})\n`
				})

				await sendReply(
					`В магазине [${store}] не продаются следующие товары:\n\n${resp?.join(
						'\n'
					)}`
				)

				Logger.info(`[${store}]: Создаю товары...`)
				await sendMessage(`[${store}]: Магазин синхронизирован`)
				Logger.info(`[${store}]: Магазин синхронизирован`)
			}
		}
	} catch (err) {
		Logger.error(`[Ошибка]: ${err as string}`)
	}
}
