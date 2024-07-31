import Logger from './lib/logger'
import { spendCommand } from './lib/spendCommand'
import { bot } from './bot'
import { articlesAction } from './lib/articlesAction'
import { onText } from './lib/onText'
import { afterArticlesAction } from './lib/afterArticlesAction'
import { syncCommand } from './lib/syncCommand'
import { stocksCommand } from './lib/stocksCommand'
import { remainingCommand } from './controllers/remainingCommand'

const store = {
	username: '',
	project: '',
	sum: '',
	description: '',
	expenseItem: '',
	cashOutQuestionId: 0,
	whatBuyedQuestion: 0,
}

void bot.telegram.setMyCommands([
	{ command: '/sync', description: 'Синхронизировать' },
	// { command: '/spend', description: 'Записать трату' },
	{ command: '/remainings', description: 'Покажи остатки' },
	// { command: '/stocks', description: 'Проверить остатки' },
])

Logger.info('Bot started!')

bot.start(async ctx => {
	const username = ctx.from.username
	const text = ctx.message.text
	Logger.info(`Бот пытался запустить: ${username} с текстом ${text}`)
	await ctx.reply('Добро пожаловать в телеграм бот Haifisch')
})

syncCommand()
spendCommand(store)
remainingCommand()
stocksCommand()
articlesAction(store)
afterArticlesAction(store)
onText(store)

void bot.launch({
	dropPendingUpdates: true,
})
