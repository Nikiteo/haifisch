import Logger from '../lib/logger'
import {
	createProducts,
	getProducts,
} from '../services/moysklad/productController'
import { getCampaigns } from '../services/yandex/campaignController'
import { getOffers } from '../services/yandex/offerController'
import { type Product } from '../types/msTypes'
import { prepareProducts } from '../utils/yandex/prepareProducts'

const getNotSellingProducts = (
	products: Product[],
	store: string
): Product[] => {
	return products.filter(item =>
		item.salePrices.some(
			sale =>
				sale.priceType.id ===
					(store === 'Haifisch'
						? '4f9e295d-f557-11ed-0a80-11cd001da711'
						: '7c24e5c8-9423-11ee-0a80-1464000e6213') &&
				sale.value === 0
		)
	)
}

const formatNotSellingProducts = (notSellingProducts: Product[]): string => {
	return notSellingProducts
		.map(row => `[${row.name}](${row?.meta?.uuidHref})`)
		.join('\n')
}

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

		if (!campaigns || !products || products.rows.length === 0) {
			Logger.warn(`[${store}]: Нет доступных кампаний или продуктов`)
			await sendMessage(
				`[${store}]: Нет доступных кампаний или продуктов`
			)
			return
		}

		const businessId = campaigns.campaigns[0]?.business?.id
		if (!businessId) {
			Logger.warn(`[${store}]: Не удалось получить businessId`)
			await sendMessage(`[${store}]: Не удалось получить businessId`)
			return
		}

		const offers = await getOffers(store, businessId, {
			archived: false,
			tags: ['Мрамор', 'мрамор'],
		})

		const domain = campaigns.campaigns[0].domain
		const preparedProducts = prepareProducts(
			products.rows,
			offers ?? [],
			domain ?? ''
		)

		if (preparedProducts.length > 0) {
			const midIndex = Math.ceil(preparedProducts.length / 2)
			const firstBatch = preparedProducts.slice(0, midIndex)
			const secondBatch = preparedProducts.slice(midIndex)

			await createProducts(firstBatch)
			Logger.info(`[${store}]: Первая партия товаров создана...`)

			await createProducts(secondBatch)
			Logger.info(`[${store}]: Вторая партия товаров создана...`)
		}

		const notSellingProducts = getNotSellingProducts(products.rows, store)
		if (notSellingProducts.length > 0) {
			const formattedProducts =
				formatNotSellingProducts(notSellingProducts)
			await sendReply(
				`В магазине [${store}] не продаются следующие товары:\n\n${formattedProducts}`
			)
		}

		await sendMessage(`[${store}]: Магазин синхронизирован`)
		Logger.info(`[${store}]: Магазин синхронизирован`)
	} catch (err) {
		Logger.error(`[Ошибка]: ${err as string}`)
	}
}
