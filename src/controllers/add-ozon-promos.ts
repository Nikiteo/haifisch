import { Logger } from '../lib'
import {
	getOzonPromos,
	getOzonPromosOffers,
	sendPromosOffers,
} from '../services'
import { getProducts } from '../services/moysklad/productController'

import { ActivateActionProductsRequest } from '../types/ozon/ozon-types'
import { PromoOffersById } from '../types/ozon/types'

export const addOzonPromos = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendReply: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()
		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (!products || products.rows.length === 0) return

		Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)
		const promos = await getOzonPromos()
		Logger.info(`[${store}]: Получены данные по акциям из магазина...`)

		const promosIds =
			promos
				?.map(promo => promo.id)
				.filter((id): id is number => id !== undefined) || []

		const fetchAllOffers = async (
			ids: number[]
		): Promise<PromoOffersById> => {
			const offersById: PromoOffersById = {}
			await Promise.all(
				ids.map(async id => {
					const offer = await getOzonPromosOffers({
						action_id: id,
						limit: 1000,
					})
					if (offer) offersById[id] = offer
				})
			)
			return offersById
		}

		const offersById = await fetchAllOffers(promosIds)
		Logger.info(
			`[${store}]: Получены данные по товарам для акций из магазина...`
		)

		for (const promoId in offersById) {
			const promoOffers = offersById[promoId]
			if (!promoOffers) continue

			const promoForSend =
				promoOffers.reduce<ActivateActionProductsRequest>(
					(acc, cur) => {
						const product = products.rows.find(item =>
							item.attributes?.some(
								attr =>
									attr.id ===
										'8966aa35-8c49-11ef-0a80-0dcd0004b2ca' &&
									attr.value === cur?.id?.toString()
							)
						)

						const promoPrice = cur.max_action_price
						const maxPrice =
							product?.salePrices?.find(
								item =>
									item.priceType.id ===
									'b4b53d6a-7cd3-11ef-0a80-0f350015a3b9'
							)?.value ?? 0
						const minPrice =
							product?.salePrices?.find(
								item =>
									item.priceType.id ===
									'b4b53c4e-7cd3-11ef-0a80-0f350015a3b8'
							)?.value ?? 0

						if (maxPrice > 0 && minPrice > 0 && promoPrice) {
							const actionPrice =
								promoPrice > maxPrice / 100
									? maxPrice / 100
									: promoPrice > minPrice / 100
										? Math.round(
												(maxPrice + minPrice) / 2 / 100
											)
										: minPrice / 100
							if (actionPrice !== undefined) {
								acc.products?.push({
									product_id: cur.id,
									action_price: actionPrice,
								})
							}
						}
						return acc
					},
					{
						action_id: +promoId,
						products: [],
					} as ActivateActionProductsRequest
				)

			if (promoForSend.products && promoForSend.products.length > 0) {
				const response = await sendPromosOffers(promoForSend)
				if (response?.product_ids?.length) {
					await sendReply(
						`[${store}]: В акцию ["${promos?.find(promo => promo.id === +promoId)?.title}"](https://seller.ozon.ru/app/highlights/${promoId}) были добавлены товары с ID - ${response.product_ids.join(', ')}`
					)
				}
				if (response?.rejected?.length) {
					const rejectedIds = response.rejected
						.map(item => item.product_id)
						.join(', ')
					await sendReply(
						`[${store}]: В акцию ["${promos?.find(promo => promo.id === +promoId)?.title}"](https://seller.ozon.ru/app/highlights/${promoId}) не были добавлены товары с ID - ${rejectedIds}`
					)
					Logger.warn(
						`[${store}]: В акцию "${promos?.find(promo => promo.id === +promoId)?.title}" не были добавлены товары с ID - ${rejectedIds}`
					)
				}
			} else {
				const countProducts = promos?.find(
					promo => promo.id === +promoId
				)?.potential_products_count
				if (countProducts && countProducts > 0) {
					await sendReply(
						`[${store}]: В акцию ["${promos?.find(promo => promo.id === +promoId)?.title}"](https://seller.ozon.ru/app/highlights/${promoId}) можно добавить ${countProducts}, но товары не прошли ценовой отбор`
					)
				}
			}
		}
		await sendMessage(`[${store}]: Магазин синхронизирован`)
		Logger.info(`[${store}]: Магазин синхронизирован`)
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
