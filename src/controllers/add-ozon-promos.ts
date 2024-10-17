import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import {
	getPromos,
	getPromosOffers,
	sendPromosOffers,
} from '../services/ozon/promosController'
import {
	type PromoProduct,
	type PromoOffersById,
	type SendPromoOffer,
} from '../types/ozonTypes'

export const addOzonPromos = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendReply: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products != null && products.rows.length > 0) {
			Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

			const promos = await getPromos()

			Logger.info(`[${store}]: Получены данные по акциям из магазина...`)

			const promosIds = promos?.map(promo => promo.id)

			const fetchOneOffer = async (
				id: number
			): Promise<PromoProduct[] | undefined> => {
				return await getPromosOffers({
					action_id: id,
					limit: 1000,
				})
			}

			const fetchAllOffers = async (
				ids?: number[]
			): Promise<PromoOffersById> => {
				let offers: PromoOffersById = {}

				if (ids !== null && ids !== undefined && ids.length > 0) {
					const offersById: PromoOffersById = {}

					for (const id of ids) {
						const offer = await fetchOneOffer(id)
						if (offer != null) {
							offersById[id] = offer
						}
					}
					offers = {
						...offers,
						...offersById,
					}
				}

				return offers
			}

			const offersById = await fetchAllOffers(promosIds)

			Logger.info(
				`[${store}]: Получены данные по товарам для акций из магазина...`
			)

			for (const promoId in offersById) {
				if (offersById[promoId]?.length != null) {
					const promoForSend = offersById[promoId]?.reduce(
						(acc, cur) => {
							const product = products.rows.find(
								item =>
									item.attributes?.find(
										attr =>
											attr.id ===
											'8966aa35-8c49-11ef-0a80-0dcd0004b2ca'
									)?.value === cur.id.toString()
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

							if (maxPrice !== 0 && minPrice !== 0) {
								if (promoPrice > maxPrice / 100) {
									acc.products.push({
										product_id: cur.id,
										action_price: maxPrice / 100,
									})
								}

								if (promoPrice < maxPrice / 100) {
									if (promoPrice > minPrice / 100) {
										const newPrice = Math.round(
											Number(
												(maxPrice + minPrice) / 2 / 100
											)
										)
										if (promoPrice > newPrice) {
											acc.products.push({
												product_id: cur.id,
												action_price: newPrice,
											})
										} else {
											acc.products.push({
												product_id: cur.id,
												action_price: minPrice / 100,
											})
										}
									}
								}
							}

							return acc
						},
						{
							action_id: +promoId,
							products: [] as unknown as SendPromoOffer[],
						}
					)

					if (
						promoForSend != null &&
						promoForSend?.products?.length > 0
					) {
						const response = await sendPromosOffers(promoForSend)

						if (
							response?.product_ids != null &&
							response.product_ids.length > 0
						) {
							await sendReply(
								`[${store}]: В акцию ["${
									promos?.find(promo => promo.id === +promoId)
										?.title
								}"](https://seller.ozon.ru/app/highlights/${promoId}) были добавлены товары с ID - ${response?.product_ids.join(
									', '
								)}`
							)
						}

						if (
							response?.rejected != null &&
							response?.rejected.length > 0
						) {
							await sendReply(
								`[${store}]: В акцию ["${
									promos?.find(promo => promo.id === +promoId)
										?.title
								}"](https://seller.ozon.ru/app/highlights/${promoId}) не были добавлены товары с ID - ${response?.rejected
									.map(item => item.product_id)
									.join(', ')}`
							)
							Logger.warn(
								`[${store}]: В акцию "${
									promos?.find(promo => promo.id === +promoId)
										?.title
								}" не были добавлены товары с ID - ${response?.rejected
									.map(item => item.product_id)
									.join(', ')}`
							)
						}
					} else {
						await sendReply(
							`[${store}]: В акциию ["${
								promos?.find(promo => promo.id === +promoId)
									?.title
							}"](https://seller.ozon.ru/app/highlights/${promoId}) можно добавить ${
								promos?.find(promo => promo.id === +promoId)
									?.potential_products_count
							}, но товары не прошли ценовой отбор`
						)
					}
				}
			}
			await sendMessage(`[${store}]: Магазин синхронизирован`)
			Logger.info(`[${store}]: Магазин синхронизирован`)
		}
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
