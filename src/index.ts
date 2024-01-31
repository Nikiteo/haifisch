import TelegramApi from 'node-telegram-bot-api'
import { updateOzon } from './controllers/update-ozon'
import { updateYandex } from './controllers/update-yandex'
import Logger from './lib/logger'

const token = process.env.BOT_TOKEN

const bot = new TelegramApi(token ?? '', { polling: true })

const start = async (): Promise<void> => {
	Logger.info('Bot started!')

	await bot.setMyCommands([
		{ command: '/sync', description: 'Синхронизировать' },
	])

	bot.on('message', async msg => {
		const text = msg.text
		const chatId = msg.chat.id

		const sendMessage = async (text: string): Promise<void> => {
			await bot.sendMessage(chatId, text)
		}

		Logger.info(
			`Бот пытался запустить: ${msg.chat.username} с текстом ${msg.text}`
		)

		try {
			if (text === '/start') {
				return await bot.sendMessage(
					chatId,
					'Добро пожаловать в телеграм бот Haifisch'
				)
			}
			if (text === '/sync') {
				if (
					msg.chat.username === 'puleekdun' ||
					msg.chat.username === 'Mi4ku' ||
					msg.chat.username === 'Nikiteo'
				) {
					await bot.sendMessage(chatId, 'Начал обновление...')
					await updateYandex('Haifisch', sendMessage)
					await updateYandex('Top', sendMessage)
					await updateOzon('Ozon', sendMessage)
				} else {
					return await bot.sendMessage(
						chatId,
						'Прости, но ты не можешь использовать меня'
					)
				}
			}
			if (text === 'Пришли мне логи' && msg.chat.username === 'Nikiteo') {
				await bot.sendDocument(chatId, 'logs/all.log')
				await bot.sendDocument(chatId, 'logs/error.log')
			}
		} catch (e) {
			Logger.error(e)
			return await bot.sendMessage(chatId, 'Произошла какая-то ошибка')
		}
	})
}

void start()
