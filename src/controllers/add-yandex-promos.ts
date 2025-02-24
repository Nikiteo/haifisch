import { Logger } from '../lib'
import {
	getCampaigns,
	getPromos,
	getPromosOffers,
	addPromosOffers,
} from '../services'
import { getProducts } from '../services/moysklad/productController'

import {
	type UpdatePromoOffersRequest,
	type GetPromoOfferDTO,
	type UpdatePromoOfferDTO,
} from '../types/yandex/api'
import { getCampaignIds } from '../utils/yandex/getCampaignIds'

type GetPromoOfferDTOById = Record<string, GetPromoOfferDTO[] | undefined>

export const addYandexPromos = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendReply: (text: string) => Promise<void>
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
										if (
											promoPrice &&
											promoPrice === minPrice / 100
										) {
											acc.offers.push({
												offerId: cur.offerId,
												params: {
													discountParams: {
														price:
															minPrice / 100 +
															300,
														promoPrice:
															minPrice / 100,
													},
												},
											})
										}
										if (
											promoPrice &&
											promoPrice > maxPrice / 100
										) {
											acc.offers.push({
												offerId: cur.offerId,
												params: {
													discountParams: {
														price:
															maxPrice / 100 +
															300,
														promoPrice:
															maxPrice / 100,
													},
												},
											})
										}

										if (
											promoPrice &&
											promoPrice < maxPrice / 100
										) {
											if (promoPrice > minPrice / 100) {
												const newPrice = Math.round(
													Number(
														(maxPrice + minPrice) /
															2 /
															100
													)
												)
												if (promoPrice > newPrice) {
													acc.offers.push({
														offerId: cur.offerId,
														params: {
															discountParams: {
																price:
																	newPrice +
																	300,
																promoPrice:
																	newPrice,
															},
														},
													})
												} else {
													acc.offers.push({
														offerId: cur.offerId,
														params: {
															discountParams: {
																price:
																	newPrice +
																	300,
																promoPrice:
																	minPrice /
																	100,
															},
														},
													})
												}
											}
										}
									}

									return acc
								},
								{
									promoId,
									offers: [] as UpdatePromoOfferDTO[],
								} as unknown as UpdatePromoOffersRequest
							)

							if (
								promoForSend &&
								promoForSend?.offers.length > 0
							) {
								const response = await addPromosOffers(
									store,
									businessId,
									promoForSend
								)

								if (
									response?.warningOffers != null &&
									response?.warningOffers.length > 0
								) {
									await sendReply(
										`[${store}]: В акцию ["${
											promos?.find(
												promo => promo.id === promoId
											)?.name
										}"](https://partner.market.yandex.ru/business/${businessId}/business-promo?campaignId=${
											campaignIds.FBS
										}&promoId=${promoId}) не были добавлены товары с ID - ${response?.warningOffers
											.map(item => item.offerId)
											.join(', ')}`
									)
									Logger.warn(
										`[${store}]: В акцию "${
											promos?.find(
												promo => promo.id === promoId
											)?.name
										}" не были добавлены товары с ID - ${response?.warningOffers
											.map(item => item.offerId)
											.join(', ')}`
									)
								}

								if (
									response?.rejectedOffers != null &&
									response?.rejectedOffers.length > 0
								) {
									await sendReply(
										`[${store}]: В акции ["${
											promos?.find(
												promo => promo.id === promoId
											)?.name
										}"](https://partner.market.yandex.ru/business/${businessId}/business-promo?campaignId=${
											campaignIds.FBS
										}&promoId=${promoId}) нужно проверить товары с ID - ${response?.rejectedOffers
											.map(item => item.offerId)
											.join(', ')}`
									)
									Logger.warn(
										`[${store}]: В акции "${
											promos?.find(
												promo => promo.id === promoId
											)?.name
										}" нужно проверить товары с ID - ${response?.rejectedOffers
											.map(item => item.offerId)
											.join(', ')}`
									)
								}
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
