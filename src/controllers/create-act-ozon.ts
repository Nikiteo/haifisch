import { Logger } from '../lib'
import { createAct, getActs, getReturnPng } from '../services'
import { createCanvas, loadImage } from 'canvas'

async function createEnhancedQRImage(
	qrBase64: string,
	options: {
		width?: number
		height?: number
		padding?: number
	} = {}
): Promise<Buffer> {
	const width = options.width || 800
	const height = options.height || 800
	const padding = options.padding || 40
	const textColor = '#333333'

	const canvas = createCanvas(width, height)
	const ctx = canvas.getContext('2d')

	ctx.fillStyle = 'white'
	ctx.fillRect(0, 0, width, height)

	try {
		const qrImg = await loadImage(`data:image/png;base64,${qrBase64}`)
		const qrSize = Math.min(width - padding * 2, 400)
		const qrX = (width - qrSize) / 2
		const qrY = padding + 80

		ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize)

		ctx.fillStyle = textColor
		ctx.textAlign = 'center'

		return canvas.toBuffer('image/png')
	} catch (error) {
		throw new Error(`Ошибка при создании изображения`)
	}
}

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
						'Кстати, кажется ты уже можешь забрать возвраты. Вот QR-код с инструкциями 👇'
					)

					try {
						const enhancedImage =
							await createEnhancedQRImage(returnPng)
						await sendDocument(enhancedImage, 'ozon_returns_qr.png')
					} catch (error) {
						Logger.error(`[${store}]: Ошибка при создании QR-кода:`)
						const qrBuffer = Buffer.from(returnPng, 'base64')
						await sendDocument(qrBuffer, 'qr_fallback.png')
						await sendMessage(
							'(Отправил простой QR-код, так как не удалось создать красивый вариант)'
						)
					}
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
		await sendMessage('Произошла ошибка при обработке запроса.')
	}
}
