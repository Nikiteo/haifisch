import Logger from '../lib/logger'
import { createAct, getActs } from '../services/ozon/carriage-controller'
import {
	getGiveoutsOzon,
	getReturnPng,
} from '../services/ozon/returnsController'

export const createActOzon = async (
	store: string,
	sendMessage: (text: string) => Promise<void>,
	sendDocument: (document: Buffer, filename: string) => Promise<void>
): Promise<void> => {
	try {
		await sendMessage('Начинаю формирование отгрузки...')
		const acts = await getActs()
		const giveouts = await getGiveoutsOzon()

		if (giveouts && giveouts.length > 0) {
			const returnPng = await getReturnPng()

			if (returnPng?.png) {
				await sendMessage(
					'Кстати, кажется ты уже можешь забрать возвраты по этому QR-коду 👇'
				)
				const qrBase64 = returnPng?.png
				const qrBuffer = Buffer.from(qrBase64, 'base64')
				await sendDocument(qrBuffer, 'qr.png')
			}
		}

		const createdAct = await createAct({
			delivery_method_id: 1020000718066000,
		})

		if (acts && createdAct?.id && acts[0].carriage_status !== 'sended') {
			await sendMessage(
				`Сформирована отгрузка на ${acts[0].mandatory_packaged_count} товаров`
			)
		} else {
			await sendMessage('Нет доступных отгрузок для подтверждения')
		}

		// if (createdAct?.id) {
		// 	const qr = await getQr({
		// 		id: createdAct.id,
		// 	})

		// 	if (acts && qr) {
		// 		await sendMessage(
		// 			`Сформирована отгрузка на ${acts[0].mandatory_packaged_count} товаров`
		// 		)
		// 		await sendMessage(
		// 			'А этот QR-код ты можешь показать в пункте OZON 👇'
		// 		)
		// 		await sendDocument(qr, 'qr.png')
		// 	} else {
		// 		await sendMessage('QR-код не был получен.')
		// 	}
		// }
	} catch (err) {
		Logger.error(`[${store}]: ${err as string}`)
		await sendMessage('Произошла ошибка при отправке изображения.')
	}
}
