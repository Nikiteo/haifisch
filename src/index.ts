import TelegramApi from 'node-telegram-bot-api'
import { updateOzon } from './controllers/update-ozon'
import { updateYandex } from './controllers/update-yandex'
import Logger from './lib/logger'
import { checkUser } from './lib/check-user'

const token = process.env.BOT_TOKEN

const bot = new TelegramApi(token ?? '', { polling: true })

const start = async (): Promise<void> => {
	Logger.info('Bot started!')

	await bot.setMyCommands([
		{ command: '/sync', description: 'Синхронизировать' },
		{ command: '/spend', description: 'Записать трату' },
	])

	bot.on('message', async msg => {
		const text = msg.text
		const chatId = msg.chat.id
		const username = msg.chat.username

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
				if (checkUser(username)) {
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
			if (text === 'Пришли мне логи' && checkUser(username)) {
				await bot.sendDocument(chatId, 'logs/all.log')
				await bot.sendDocument(chatId, 'logs/error.log')
			}
			if (text === '/spend') {
				await bot.sendMessage(chatId, 'Напишите мне текст в формате: магазин + описание траты + сумма + дата')
				await bot.sendMessage(chatId, 'Например, Озон (ХФ/Тор) + закупка гелькоута + 6000 + 21.02.2024')
			}
		} catch (e) {
			Logger.error(e)
			return await bot.sendMessage(chatId, 'Произошла какая-то ошибка')
		}
	})
}

void start()
