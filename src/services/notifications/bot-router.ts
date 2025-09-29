import { Router } from 'express';
import { Logger } from '../../lib';
import { sendTelegramMessage } from '../../utils';

export const botRouter = Router()

botRouter.post('/telegram', async (req, res) => {
	Logger.info('POST /telegram body:', req.body);

	try {
		const { chatId, text } = req.body as { chatId: number, text: string }

		if (!chatId || !text) {
			res.status(400).json({ error: 'chatId и text обязательны' })
			return
		}

		Logger.info(`Получено сообщение ${text}`)
		await sendTelegramMessage(text, true, chatId)

		res.json({ ok: true })
	} catch (error) {
		Logger.error(`Ошибка при отправке сообщения в Telegram: ${error}`)
		res.status(500).json({ error: 'Ошибка при отправке сообщения' })
	}
})
