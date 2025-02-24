import { Logger } from '../lib'
import {
	createProducts,
	getProducts,
} from '../services/moysklad/productController'
import { getOzonAttributes, getOzonOffers } from '../services'
import { Product } from '../types/ms-types'
import { ProductInfoWithAttributes } from '../types/ozon/types'

import { prepareOzonOffers } from '../utils/ozon/prepareOzonOffers'

const getNotSellingProducts = (products: Product[]): Product[] => {
	return products.filter(
		item =>
			item.salePrices.find(
				sale =>
					sale.priceType.id === '5f713df2-9981-11ee-0a80-0b5a00058c80'
			)?.value === 0
	)
}

const formatNotSellingProducts = (notSellingProducts: Product[]): string => {
	return notSellingProducts
		.map(row => `[${row.name}](${row?.meta?.uuidHref})`)
		.join('\n')
}

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

			const updatedOzonOffers = ozonOffers?.reduce<
				ProductInfoWithAttributes[]
			>((acc, cur) => {
				ozonOffersAttributes?.forEach(att => {
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
			}, [])

			const preparedOzonProducts = prepareOzonOffers(
				products.rows ?? [],
				updatedOzonOffers ?? []
			)

			if (preparedOzonProducts.length > 0) {
				const midIndex = Math.ceil(preparedOzonProducts.length / 2)
				const firstBatch = preparedOzonProducts.slice(0, midIndex)
				const secondBatch = preparedOzonProducts.slice(midIndex)

				await createProducts(firstBatch)
				Logger.info(`[${store}]: Первая партия товаров создана...`)

				await createProducts(secondBatch)
				Logger.info(`[${store}]: Вторая партия товаров создана...`)
			}

			const notSellingProducts = getNotSellingProducts(products.rows)

			if (notSellingProducts.length > 0) {
				const formattedProducts =
					formatNotSellingProducts(notSellingProducts)
				await sendReply(
					`В магазине [${store}] не продаются следующие товары:\n\n${formattedProducts}`
				)
			}

			await sendMessage(`[${store}]: Магазин синхронизирован`)
			Logger.info(`[${store}]: Магазин синхронизирован`)
		}
	} catch (err) {
		Logger.error(`[Ошибка]: ${err as string}`)
	}
}
