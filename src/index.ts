import Logger from './lib/logger'
import { bot } from './bot'
import { onText } from './lib/onText'
import { syncCommand } from './lib/syncCommand'
import { stocksCommand } from './lib/stocksCommand'
import { remainingCommand } from './controllers/remainingCommand'
import { updateCommand } from './lib/updateCommand'
import { addPromos } from './lib/addPromos'
import { addYandexCofinance } from './lib/addCofinance'
import { feedbacks } from './lib/feedbacks'
import { deletePromos } from './lib/deletePromos'
import { updatePrices } from './lib/updatePrices'
// import { actCreateOzon } from './lib/actCreateOzon'

void bot.telegram.setMyCommands([
	{ command: '/sync', description: 'Синхронизировать' },
	{ command: '/remainings', description: 'Показать остатки' },
	{ command: '/offers', description: 'Обновить товары' },
	{ command: '/stocks', description: 'Обновить остатки' },
	{ command: '/promos', description: 'Добавить в акции' },
	{ command: '/del', description: 'Удалить из акций' },
	{ command: '/prices', description: 'Обновить цены' },
	// { command: '/act', description: 'Подтвердить отгрузку' },
	{ command: '/cofinance', description: 'Проставить цену софинансирования' },
	{ command: '/feedbacks', description: 'Ответить на отзывы' },
])

Logger.info('Bot started!')

bot.start(async ctx => {
	const username = ctx.from.username
	const text = ctx.message.text
	Logger.info(`Бот пытался запустить: ${username} с текстом ${text}`)
	await ctx.reply('Добро пожаловать в телеграм бот Haifisch')
})

syncCommand()
remainingCommand()
updateCommand()
stocksCommand()
addPromos()
deletePromos()
updatePrices()
// actCreateOzon()
addYandexCofinance()
feedbacks()
onText()

void bot.launch({
	dropPendingUpdates: true,
})
