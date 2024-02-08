import { Markup, Telegraf } from 'telegraf'
import Logger from './lib/logger'
import { updateOzon } from './controllers/update-ozon'
import { updateYandex } from './controllers/update-yandex'
import { checkUser } from './lib/check-user'
import { createCashoutObject } from './utils/createCashout'
import { message } from 'telegraf/filters'
import { createCashout } from './services/moysklad/cashoutController'

const store = {
	username: '',
	project: '',
	sum: '',
	description: '',
	expenseItem: '',
	cashOutQuestionId: 0,
	whatBuyedQuestion: 0,
}

const bot = new Telegraf(process.env.BOT_TOKEN ?? '', {
	handlerTimeout: Infinity,
})

void bot.telegram.setMyCommands([
	{ command: '/sync', description: 'Синхронизировать' },
	{ command: '/spend', description: 'Записать трату' },
])

Logger.info('Bot started!')

console.log(store)

bot.start(async ctx => {
	const username = ctx.from.username
	const text = ctx.message.text
	Logger.info(`Бот пытался запустить: ${username} с текстом ${text}`)
	await ctx.reply('Добро пожаловать в телеграм бот Haifisch')
})

bot.command('sync', async ctx => {
	const username = ctx.from.username
	const chatId = ctx.chat.id
	if (checkUser(username)) {
		const sendMessage = async (text: string): Promise<void> => {
			await ctx.telegram.sendMessage(chatId, text)
		}
		await ctx.reply('Начал обновление...')
		await updateYandex('Haifisch', sendMessage)
		await updateYandex('Top', sendMessage)
		await updateOzon('Ozon', sendMessage)
	} else {
		return await ctx.reply('Прости, но ты не можешь использовать меня')
	}
})

bot.hears('Логи', async ctx => {
	const username = ctx.from.username
	const text = ctx.message.text

	Logger.info(`Бот пытался запустить: ${username} с текстом ${text}`)

	if (checkUser(username)) {
		await ctx.sendDocument('logs/all.log')
		await ctx.sendDocument('logs/error.log')
	} else {
		return await ctx.reply('Прости, но ты не можешь использовать меня')
	}
})

bot.command('spend', async ctx => {
	const username = ctx.from.username
	const text = ctx.message.text

	store.username = username ?? ''

	Logger.info(`Бот пытался запустить: ${username} с текстом ${text}`)

	if (checkUser(username)) {
		return await ctx.reply('Выбери магазин:', {
			...Markup.inlineKeyboard([
				[
					Markup.button.callback('🚀 ФБУ ОЗОН', 'fbyOzon'),
					Markup.button.callback('🚀 ФБС ОЗОН', 'fbsOzon'),
				],
				[
					Markup.button.callback('💻 ФБУ ХФ', 'fbyHf'),
					Markup.button.callback('💻 ФБС ХФ', 'fbsHf'),
				],
				[
					Markup.button.callback('💄 ФБУ ТОР', 'fbyTop'),
					Markup.button.callback('💄 ФБС ТОР', 'fbsTop'),
				],
			]),
		})
	} else {
		return await ctx.reply('Прости, но ты не можешь использовать меня')
	}
})

bot.action(
	['fbyOzon', 'fbsOzon', 'fbyHf', 'fbsHf', 'fbyTop', 'fbsTop'],
	async ctx => {
		const username = ctx.from?.username
		const chatId = ctx.chat?.id
		if (chatId !== undefined) {
			await ctx.deleteMessage()

			store.project = ctx.match.input

			if (checkUser(username)) {
				return await ctx.reply('Выбери статью расходов:', {
					...Markup.inlineKeyboard([
						[
							Markup.button.callback('Перемещение', 'moving'),
							Markup.button.callback('Налоги и сборы', 'taxes'),
						],
						[
							Markup.button.callback('Зарплата', 'salary'),
							Markup.button.callback('Услуги', 'services'),
							Markup.button.callback('Аренда', 'rent'),
						],
						[
							Markup.button.callback(
								'Закупка товаров',
								'purchase'
							),
							Markup.button.callback(
								'Маркетинг и реклама',
								'entertainment'
							),
						],
					]),
				})
			} else {
				return await ctx.reply(
					'Прости, но ты не можешь использовать меня'
				)
			}
		}
	}
)

bot.action(
	[
		'moving',
		'rent',
		'salary',
		'entertainment',
		'services',
		'purchase',
		'taxes',
	],
	async ctx => {
		const username = ctx.from?.username
		const chatId = ctx.chat?.id
		if (chatId !== undefined) {
			await ctx.deleteMessage()
			store.expenseItem = ctx.match.input
			if (checkUser(username)) {
				const cachOutQuestion = await ctx.reply('Сколько потратили?', {
					reply_markup: {
						force_reply: true,
					},
				})
				store.cashOutQuestionId = cachOutQuestion.message_id
			} else {
				return await ctx.reply(
					'Прости, но ты не можешь использовать меня'
				)
			}
		}
	}
)

bot.on(message('text'), async ctx => {
	const username = ctx.from?.username

	if (ctx.update.message.message_id === store.cashOutQuestionId + 1) {
		if (checkUser(username)) {
			const whatBuyedQuestion = await ctx.reply('На что потратили?', {
				reply_markup: {
					force_reply: true,
				},
			})
			store.whatBuyedQuestion = whatBuyedQuestion.message_id
			store.sum = ctx.update.message.text
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	}

	if (ctx.update.message.message_id === store.whatBuyedQuestion + 1) {
		if (checkUser(username)) {
			const newCashOut = createCashoutObject({
				username: store.username,
				project: store.project,
				sum: store.sum,
				description: ctx.message.text,
				expenseItem: store.expenseItem,
			})
			const createdCashOut = await createCashout(newCashOut)
			await ctx.reply(
				`Держи ссылку на созданный документ и проверь правильность - ${createdCashOut?.meta?.uuidHref}`
			)
			Logger.info(
				`${store.username} создал расходный ордер: ${store.project} - ${store.sum} - ${ctx.message.text} - ${store.expenseItem}`
			)
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	}
})

void bot.launch()
