import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import {
	deletePromosOffers,
	getPromos,
	getPromosOffers,
	getPromosProducts,
} from '../services/ozon/api'
import { DeactivateActionProductsRequest } from '../types/ozon/ozon-types'
import { PromoOffersById } from '../types/ozon/types'

export const deleteOzonPromos = async (
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
						const offer = await getPromosOffers({
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
					promoOffers.reduce<DeactivateActionProductsRequest>(
						(acc, cur) => {
							const product = products.rows.find(
								item =>
									item.attributes?.find(
										attr =>
											attr.id ===
											'8966aa35-8c49-11ef-0a80-0dcd0004b2ca'
									)?.value === cur?.id?.toString()
							)

							const promoPrice = cur.max_action_price
							const minPrice =
								product?.salePrices?.find(
									item =>
										item.priceType.id ===
										'b4b53c4e-7cd3-11ef-0a80-0f350015a3b8'
								)?.value ?? 0

							if (minPrice !== 0 && promoPrice) {
								if (promoPrice < minPrice / 100) {
									acc.product_ids?.push(cur.id!)
								}
							}
							return acc
						},
						{
							action_id: +promoId,
							product_ids: [],
						} as DeactivateActionProductsRequest
					)

				if (
					promoForSend.product_ids &&
					promoForSend?.product_ids?.length > 0
				) {
					const response = await deletePromosOffers(promoForSend)

					if (
						response?.product_ids != null &&
						response.product_ids.length > 0
					) {
						await sendReply(
							`[${store}]: Из акции ["${
								promos?.find(promo => promo.id === +promoId)
									?.title
							}"](https://seller.ozon.ru/app/highlights/${promoId}) было удалено ${
								response?.product_ids.length
							} товаров`
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
