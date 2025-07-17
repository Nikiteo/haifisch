import { Logger } from '../lib'
import { getProducts } from '../services/moysklad/productController'
import { getCampaigns, getOffers, sendOffers } from '../services/yandex'

import { type UpdateOfferMappingsRequest } from '../types/yandex/api'
export const addCofinance = async (
	store: string,
	sendMessage: (text: string) => Promise<void>
): Promise<void> => {
	try {
		const products = await getProducts()
		Logger.info(`[${store}]: Получены данные по продуктам из МС...`)

		if (products?.rows && products.rows.length > 0) {
			const campaigns = await getCampaigns(store)
			Logger.info(`[${store}]: Получены данные по кампаниям магазина...`)

			if (campaigns && campaigns.length > 0) {
				const businessId = campaigns[0]?.business?.id

				if (businessId) {
					const offers = await getOffers(store, businessId, {
						archived: false,
						tags: ['Мрамор', 'мрамор'],
					})

					const offersForSend =
						offers?.reduce<UpdateOfferMappingsRequest>(
							(acc, cur) => {
								if (!cur?.offer) return acc

								const product = products.rows.find(
									item => item.article === cur.offer?.offerId
								)

								if (product) {
									// const box:string =
									// 	product.attributes.find(
									// 		item =>
									// 			item.id ===
									// 			'19d7f9fa-13a5-11f0-0a80-146400324e7f'
									// 	)?.value ?? ''
									// const boxArray = box.split('х')

									// const boxLength = boxArray[0]
									// const boxWidth = boxArray[1]
									// const boxHeigth = boxArray[2]

									const minPrice =
										product.salePrices?.find(
											item =>
												item.priceType.id ===
												'a5608f73-630f-11f0-0a80-197e00103deb'
										)?.value ?? 0

									const optPrice =
										product.salePrices?.find(
											item =>
												item.priceType.id ===
												'a5609083-630f-11f0-0a80-197e00103dec'
										)?.value ?? 0

									const basicPrice =
										product.salePrices?.find(
											item =>
												item.priceType.id ===
												'4f9e295d-f557-11ed-0a80-11cd001da711'
										)?.value ?? 0

									// if (hfName) {
									// 	acc.offerMappings.push({
									// 		offer: {
									// 			name: hfName,
									// 			offerId: cur.offer.offerId,
									// 		},
									// 	})
									// }

									if (
										optPrice !== 0 &&
										basicPrice !== 0 &&
										cur.offer.basicPrice?.value !==
											basicPrice / 100
									) {
										const newName =
											cur.offer.name?.includes(
												'из литьевого мрамора'
											)
												? cur.offer.name.replace(
														'из литьевого мрамора',
														'из искусственного камня'
														// eslint-disable-next-line no-mixed-spaces-and-tabs
													)
												: cur.offer.name

										acc.offerMappings.push({
											offer: {
												name: newName || '',
												offerId: cur.offer.offerId,
												manufacturerCountries: [
													'Россия',
												],
												basicPrice: {
													...cur.offer.basicPrice,
													value: basicPrice / 100,
													discountBase:
														basicPrice / 100 + 300,
													currencyId: 'RUR',
												},
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
								}
								return acc
							},
							{ offerMappings: [] }
						)

					if (
						offersForSend &&
						offersForSend?.offerMappings?.length > 0
					) {
						await sendOffers(store, businessId, offersForSend)
					}

					Logger.warn(
						`Количество отправляемых предложений: ${offersForSend?.offerMappings.length}`
					)

					await sendMessage(`[${store}]: Магазин синхронизирован`)
					Logger.info(`[${store}]: Магазин синхронизирован`)
				}
			}
		}
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(`[${store}]: ${err.message}`)
		} else {
			Logger.error(
				`[${store}]: Неизвестная ошибка: ${JSON.stringify(err)}`
			)
		}
	}
}
