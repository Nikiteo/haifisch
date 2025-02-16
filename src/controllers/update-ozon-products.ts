import Logger from '../lib/logger'
import {
	createProducts,
	getProducts,
} from '../services/moysklad/productController'
import { getOzonAttributes } from '../services/ozon/offerAttributesController'
import { getOzonOffers } from '../services/ozon/offerController'
import { type OfferOzonWithAttributes } from '../types/ozonTypes'
import { prepareOzonOffers } from '../utils/ozon/prepareOzonOffers'

export const updateOzonProducts = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendReply: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products != null && products.rows.length > 0) {
			const articlesFromMS = products.rows.map(row => row.article)

			const ozonOffers = await getOzonOffers({
				offer_id: articlesFromMS,
			})

			Logger.info(`[${store}]: Получены данные по товарам из магазина...`)

			const ozonOffersAttributes = await getOzonAttributes({
				filter: {
					offer_id: articlesFromMS,
				},
				limit: 1000,
			})

			Logger.info(
				`[${store}]: Получены данные по атрибутам товаров из магазина...`
			)

			const updatedOzonOffers = ozonOffers?.items.reduce((acc, cur) => {
				ozonOffersAttributes?.result.forEach(att => {
					if (att.offer_id === cur.offer_id) {
						acc.push({
							...cur,
							height: att.height,
							depth: att.depth,
							width: att.width,
							dimension_unit: att.dimension_unit,
							weight: att.weight,
							weight_unit: att.weight_unit,
						})
					}
				})
				return acc
			}, [] as OfferOzonWithAttributes[])

			const preparedOzonProducts = prepareOzonOffers(
				products.rows ?? [],
				updatedOzonOffers ?? []
			)

			if (preparedOzonProducts.length > 0) {
				await createProducts(preparedOzonProducts)
			}
			const notSellingProducts = products.rows.filter(
				item =>
					item.salePrices.find(
						sale =>
							sale.priceType.id ===
							'5f713df2-9981-11ee-0a80-0b5a00058c80'
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
	} catch (err) {
		Logger.error(`[Ошибка]: ${err as string}`)
	}
}
