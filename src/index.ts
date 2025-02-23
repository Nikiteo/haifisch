import Logger from './lib/logger'
import { bot } from './bot'
import { onText } from './lib/onText'
import { syncCommand } from './lib/sync-command'
import { stocksCommand } from './lib/stocks-command'
import { remainingCommand } from './controllers/remainingCommand'
import { updateCommand } from './lib/update-command'
import { addPromos } from './lib/add-promos'
import { addYandexCofinance } from './lib/add-cofinance'
import { feedbacks } from './lib/feedbacks'
import { deletePromos } from './lib/delete-promos'
import { updatePrices } from './lib/update-prices'
import { actCreateOzon } from './lib/act-create-ozon'
import { howMuchMoney } from './lib/how-much-money'

void bot.telegram.setMyCommands([
	{ command: '/sync', description: 'Синхронизировать' },
	{ command: '/remainings', description: 'Показать остатки' },
	{ command: '/offers', description: 'Обновить товары' },
	{ command: '/stocks', description: 'Обновить остатки' },
	{ command: '/promos', description: 'Добавить в акции' },
	{ command: '/del', description: 'Удалить из акций' },
	{ command: '/prices', description: 'Обновить цены' },
	{ command: '/act', description: 'Подтвердить отгрузку' },
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
actCreateOzon()
addYandexCofinance()
feedbacks()
onText()

void bot.launch({
	dropPendingUpdates: true,
})
