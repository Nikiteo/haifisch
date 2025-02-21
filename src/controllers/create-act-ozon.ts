import Logger from '../lib/logger'
import { createAct, getActs, getReturnPng } from '../services/ozon/api'

export const createActOzon = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendDocument: (document: Buffer, filename: string) => Promise<void>
): Promise<void> => {
	try {
		await sendMessage('Начинаю формирование отгрузки...')
		const acts = await getActs({})

		if (acts && acts[0].carriage_status !== 'sended') {
			if (
				acts[0].errors &&
				acts[0].errors.length > 0 &&
				acts[0].errors[0].code === 'has_seller_returns_in_stock'
			) {
				const returnPng = await getReturnPng({})

				if (returnPng) {
					await sendMessage(
						'Кстати, кажется ты уже можешь забрать возвраты по этому QR-коду 👇'
					)
					const qrBuffer = Buffer.from(returnPng, 'base64')
					await sendDocument(qrBuffer, 'qr.png')
				}
			}
			const createdAct = await createAct({
				delivery_method_id: 1020000718066000,
			})

			if (createdAct?.id) {
				await sendMessage(
					`Сформирована отгрузка на ${acts[0].mandatory_packaged_count} товаров`
				)
			} else {
				await sendMessage('Нет доступных отгрузок для подтверждения')
			}
		} else {
			await sendMessage('Нет доступных отгрузок для подтверждения')
		}
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
		await sendMessage('Произошла ошибка при отправке изображения.')
	}
}
