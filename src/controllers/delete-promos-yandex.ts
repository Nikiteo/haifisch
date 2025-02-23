import Logger from '../lib/logger'
import { getProducts } from '../services/moysklad/productController'
import { deletePromosOffers, getCampaigns, getPromos, getPromosOffers } from '../services/yandex/api'
import {
	type DeletePromoOffersRequest,
	type GetPromoOfferDTO,
} from '../types/yandex/api'
import { getCampaignIds } from '../utils/yandex/getCampaignIds'

type GetPromoOfferDTOById = Record<string, GetPromoOfferDTO[] | undefined>

export const deletePromosYandex = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()

		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products != null && products.rows.length > 0) {
			const campaigns = await getCampaigns(store)
			const campaignIds = getCampaignIds(campaigns)
			Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

			if (campaignIds !== undefined && campaigns !== undefined) {
				const businessId = campaigns[0]?.business?.id

				if (businessId) {
					const promos = await getPromos(store, businessId, {})

					Logger.info(
						`[${store}]: Получены данные по акциям из магазина...`
					)

					const promosIds = promos
						?.filter(
							item =>
								item.mechanicsInfo.type !== 'MARKET_PROMOCODE'
						)
						.map(promo => promo.id)

					const fetchOneOffer = async (
						store: string,
						id: string
					): Promise<GetPromoOfferDTO[] | undefined> => {
						return await getPromosOffers(store, businessId, {
							promoId: id,
						})
					}

					const fetchAllOffers = async (
						store: string,
						ids?: string[]
					): Promise<GetPromoOfferDTOById> => {
						let offers: GetPromoOfferDTOById = {}

						if (ids && ids.length > 0) {
							const offersById: GetPromoOfferDTOById = {}

							for (const id of ids) {
								const offer = await fetchOneOffer(store, id)
								if (offer) {
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

					const offersById = await fetchAllOffers(store, promosIds)

					Logger.info(
						`[${store}]: Получены данные по товарам для акций из магазина...`
					)

					for (const promoId in offersById) {
						if (offersById[promoId]?.length) {
							const promoForSend = offersById[promoId]?.reduce(
								(acc, cur) => {
									const product = products.rows.find(
										item => item.article === cur.offerId
									)
									const promoPrice =
										cur?.params?.discountParams
											?.maxPromoPrice
									const minPrice =
										product?.salePrices?.find(
											item =>
												item.priceType.id ===
												'b4b53c4e-7cd3-11ef-0a80-0f350015a3b8'
										)?.value ?? 0

									if (minPrice !== 0) {
										if (
											promoPrice &&
											promoPrice < minPrice / 100
										) {
											if (!acc.offerIds) {
												acc.offerIds = []
											}
											acc.offerIds.push(cur.offerId)
										}
									}

									return acc
								},
								{
									promoId,
									deleteAllOffers: false,
									offerIds: [],
								} as unknown as DeletePromoOffersRequest
							)

							if (
								promoForSend?.offerIds &&
								promoForSend?.offerIds?.length > 0
							) {
								await deletePromosOffers(
									store,
									businessId,
									promoForSend
								)
							}
						}
					}
					await sendMessage(`[${store}]: Магазин синхронизирован`)
					Logger.info(`[${store}]: Магазин синхронизирован`)
				}
			}
		}
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
	}
}
