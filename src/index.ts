import TelegramApi from 'node-telegram-bot-api'
import { updateOzon } from './controllers/update-ozon'
import { updateYandex } from './controllers/update-yandex'
import Logger from './lib/logger'
import { checkUser } from './lib/check-user'
import { createCashoutObject } from './utils/createCashout'
import { createCashout } from './services/moysklad/cashoutController'

const token = process.env.BOT_TOKEN

const bot = new TelegramApi(token ?? '', { polling: true })

const inlineService = {
	reply_markup: {
		inline_keyboard: [
			[
				{
					text: 'Перемещение',
					callback_data: 'moving',
				},
				{
					text: 'Аренда',
					callback_data: 'rent',
				},
			],
			[
				{
					text: 'Зарплата',
					callback_data: 'salary',
				},
				{
					text: 'Маркетинг и реклама',
					callback_data: 'entertainment',
				},
			],
			[
				{
					text: 'Услуги',
					callback_data: 'services',
				},
				{
					text: 'Закупка товаров',
					callback_data: 'purchase',
				},
			],
			[
				{
					text: 'Налоги и сборы',
					callback_data: 'taxes',
				},
			],
		],
		resize_keyboard: true,
		one_time_keyboard: true,
	},
}

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

		try {
			if (text === '/start') {
				Logger.info(
					`Бот пытался запустить: ${msg.chat.username} с текстом ${msg.text}`
				)

				return await bot.sendMessage(
					chatId,
					'Добро пожаловать в телеграм бот Haifisch'
				)
			}
			if (text === '/sync') {
				Logger.info(
					`Бот пытался запустить: ${msg.chat.username} с текстом ${msg.text}`
				)

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
				Logger.info(
					`Бот пытался запустить: ${msg.chat.username} с текстом ${msg.text}`
				)

				await bot.sendDocument(chatId, 'logs/all.log')
				await bot.sendDocument(chatId, 'logs/error.log')
			}
			if (text === '/spend' && checkUser(username)) {
				Logger.info(
					`Бот пытался запустить: ${msg.chat.username} с текстом ${msg.text}`
				)

				await bot.sendMessage(chatId, 'Выбери магазин:', {
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: '🚀 ФБУ ОЗОН',
									callback_data: 'fbyOzon',
								},
								{
									text: '🚀 ФБС ОЗОН',
									callback_data: 'fbsOzon',
								},
							],
							[
								{ text: '💻 ФБУ ХФ', callback_data: 'fbyHf' },
								{ text: '💻 ФБС ХФ', callback_data: 'fbsHf' },
							],
							[
								{ text: '💄 ФБУ ТОР', callback_data: 'fbyTop' },
								{ text: '💄 ФБС ТОР', callback_data: 'fbsTop' },
							],
						],
						resize_keyboard: true,
						one_time_keyboard: true,
					},
				})
			}
			bot.on('callback_query', async ctx => {
				try {
					if (ctx.data === 'fbyOzon') {
						if (ctx.message?.message_id !== undefined) {
							await bot.deleteMessage(
								chatId,
								ctx.message?.message_id
							)
						}
						await bot.sendMessage(
							chatId,
							'Выбери статью расходов:',
							inlineService
						)

						bot.on('callback_query', async context => {
							if (context.message?.message_id !== undefined) {
								await bot.deleteMessage(
									chatId,
									context.message?.message_id
								)
							}

							await bot.sendMessage(chatId, 'Сколько потратили?')
							bot.on('message', async msg => {
								const cashOut = msg.text
								await bot.sendMessage(
									chatId,
									'На что потратили?'
								)
								bot.removeAllListeners()
								bot.on('message', async message => {
									const newCashOut = createCashoutObject({
										username,
										project: ctx.data,
										sum: cashOut,
										description: message.text,
										expenseItem: context.data,
									})
									await bot.sendMessage(
										chatId,
										'Принял! Создаю расходный ордер...'
									)
									const createdCashOut = await createCashout(
										newCashOut
									)
									await bot.sendMessage(
										chatId,
										`Держи ссылку на созданный документ и проверь правильность - ${createdCashOut?.meta?.uuidHref}`
									)
									Logger.info(
										`${username} создал расходный ордер: ${ctx.data} - ${cashOut} - ${message.text} - ${context.data}`
									)
								})
							})
						})
					}

					if (ctx.data === 'fbsOzon') {
						if (ctx.message?.message_id !== undefined) {
							await bot.deleteMessage(
								chatId,
								ctx.message?.message_id
							)
						}
						await bot.sendMessage(
							chatId,
							'Выбери статью расходов:',
							inlineService
						)

						bot.on('callback_query', async context => {
							if (context.message?.message_id !== undefined) {
								await bot.deleteMessage(
									chatId,
									context.message?.message_id
								)
							}

							await bot.sendMessage(chatId, 'Сколько потратили?')
							bot.on('message', async msg => {
								const cashOut = msg.text
								await bot.sendMessage(
									chatId,
									'На что потратили?'
								)
								bot.removeAllListeners()
								bot.on('message', async message => {
									const newCashOut = createCashoutObject({
										username,
										project: ctx.data,
										sum: cashOut,
										description: message.text,
										expenseItem: context.data,
									})
									await bot.sendMessage(
										chatId,
										'Принял! Создаю расходный ордер...'
									)
									const createdCashOut = await createCashout(
										newCashOut
									)
									await bot.sendMessage(
										chatId,
										`Держи ссылку на созданный документ и проверь правильность - ${createdCashOut?.meta?.uuidHref}`
									)
									Logger.info(
										`${username} создал расходный ордер: ${ctx.data} - ${cashOut} - ${message.text} - ${context.data}`
									)
								})
							})
						})
					}

					if (ctx.data === 'fbyHf') {
						if (ctx.message?.message_id !== undefined) {
							await bot.deleteMessage(
								chatId,
								ctx.message?.message_id
							)
						}
						await bot.sendMessage(
							chatId,
							'Выбери статью расходов:',
							inlineService
						)

						bot.on('callback_query', async context => {
							if (context.message?.message_id !== undefined) {
								await bot.deleteMessage(
									chatId,
									context.message?.message_id
								)
							}
							await bot.sendMessage(chatId, 'Сколько потратили?')
							bot.on('message', async msg => {
								const cashOut = msg.text
								await bot.sendMessage(
									chatId,
									'На что потратили?'
								)
								bot.removeAllListeners()
								bot.on('message', async message => {
									const newCashOut = createCashoutObject({
										username,
										project: ctx.data,
										sum: cashOut,
										description: message.text,
										expenseItem: context.data,
									})
									await bot.sendMessage(
										chatId,
										'Принял! Создаю расходный ордер...'
									)
									const createdCashOut = await createCashout(
										newCashOut
									)
									await bot.sendMessage(
										chatId,
										`Держи ссылку на созданный документ и проверь правильность - ${createdCashOut?.meta?.uuidHref}`
									)
									Logger.info(
										`${username} создал расходный ордер: ${ctx.data} - ${cashOut} - ${message.text} - ${context.data}`
									)
								})
							})
						})
					}

					if (ctx.data === 'fbsHf') {
						if (ctx.message?.message_id !== undefined) {
							await bot.deleteMessage(
								chatId,
								ctx.message?.message_id
							)
						}
						await bot.sendMessage(
							chatId,
							'Выбери статью расходов:',
							inlineService
						)

						bot.on('callback_query', async context => {
							if (context.message?.message_id !== undefined) {
								await bot.deleteMessage(
									chatId,
									context.message?.message_id
								)
							}
							await bot.sendMessage(chatId, 'Сколько потратили?')
							bot.on('message', async msg => {
								const cashOut = msg.text
								await bot.sendMessage(
									chatId,
									'На что потратили?'
								)
								bot.removeAllListeners()
								bot.on('message', async message => {
									const newCashOut = createCashoutObject({
										username,
										project: ctx.data,
										sum: cashOut,
										description: message.text,
										expenseItem: context.data,
									})
									await bot.sendMessage(
										chatId,
										'Принял! Создаю расходный ордер...'
									)
									const createdCashOut = await createCashout(
										newCashOut
									)
									await bot.sendMessage(
										chatId,
										`Держи ссылку на созданный документ и проверь правильность - ${createdCashOut?.meta?.uuidHref}`
									)
									Logger.info(
										`${username} создал расходный ордер: ${ctx.data} - ${cashOut} - ${message.text} - ${context.data}`
									)
								})
							})
						})
					}

					if (ctx.data === 'fbyTop') {
						if (ctx.message?.message_id !== undefined) {
							await bot.deleteMessage(
								chatId,
								ctx.message?.message_id
							)
						}
						await bot.sendMessage(
							chatId,
							'Выбери статью расходов:',
							inlineService
						)

						bot.on('callback_query', async context => {
							if (context.message?.message_id !== undefined) {
								await bot.deleteMessage(
									chatId,
									context.message?.message_id
								)
							}
							await bot.sendMessage(chatId, 'Сколько потратили?')
							bot.on('message', async msg => {
								const cashOut = msg.text
								await bot.sendMessage(
									chatId,
									'На что потратили?'
								)
								bot.removeAllListeners()
								bot.on('message', async message => {
									const newCashOut = createCashoutObject({
										username,
										project: ctx.data,
										sum: cashOut,
										description: message.text,
										expenseItem: context.data,
									})
									await bot.sendMessage(
										chatId,
										'Принял! Создаю расходный ордер...'
									)
									const createdCashOut = await createCashout(
										newCashOut
									)
									await bot.sendMessage(
										chatId,
										`Держи ссылку на созданный документ и проверь правильность - ${createdCashOut?.meta?.uuidHref}`
									)
									Logger.info(
										`${username} создал расходный ордер: ${ctx.data} - ${cashOut} - ${message.text} - ${context.data}`
									)
								})
							})
						})
					}

					if (ctx.data === 'fbsTop') {
						if (ctx.message?.message_id !== undefined) {
							await bot.deleteMessage(
								chatId,
								ctx.message?.message_id
							)
						}
						await bot.sendMessage(
							chatId,
							'Выбери статью расходов:',
							inlineService
						)

						bot.on('callback_query', async context => {
							if (context.message?.message_id !== undefined) {
								await bot.deleteMessage(
									chatId,
									context.message?.message_id
								)
							}
							await bot.sendMessage(chatId, 'Сколько потратили?')
							bot.on('message', async msg => {
								const cashOut = msg.text
								await bot.sendMessage(
									chatId,
									'На что потратили?'
								)
								bot.removeAllListeners()
								bot.on('message', async message => {
									const newCashOut = createCashoutObject({
										username,
										project: ctx.data,
										sum: cashOut,
										description: message.text,
										expenseItem: context.data,
									})
									await bot.sendMessage(
										chatId,
										'Принял! Создаю расходный ордер...'
									)
									const createdCashOut = await createCashout(
										newCashOut
									)
									await bot.sendMessage(
										chatId,
										`Держи ссылку на созданный документ и проверь правильность - ${createdCashOut?.meta?.uuidHref}`
									)
									Logger.info(
										`${username} создал расходный ордер: ${ctx.data} - ${cashOut} - ${message.text} - ${context.data}`
									)
								})
							})
						})
					}
				} catch (e) {
					Logger.error(e)
				}
			})
		} catch (e) {
			Logger.error(e)
			return await bot.sendMessage(chatId, 'Произошла какая-то ошибка')
		}
	})
}

void start()
