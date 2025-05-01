import express from 'express'
import bodyParser from 'body-parser'
import { bot } from './bot'
import { remainingCommand } from './controllers'
import {
	Logger,
	syncCommand,
	updateCommand,
	stocksCommand,
	addPromos,
	deletePromos,
	updatePrices,
	actCreateOzon,
	addYandexCofinance,
	feedbacks,
	onText,
} from './lib'
import https from 'https'
import fs from 'fs'
import { ozonRouter, yandexRouter, tbankRouter } from './services'

const app = express()

app.use(bodyParser.json())

app.use(yandexRouter)
app.use(ozonRouter)
app.use(tbankRouter)

// const options = {
// 	key: fs.readFileSync('/etc/letsencrypt/live/haifisch.ru/privkey.pem'),
// 	cert: fs.readFileSync('/etc/letsencrypt/live/haifisch.ru/fullchain.pem'),
// }

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

// const httpsServer = https.createServer(options, app)

app.listen(3000, () => {
	Logger.info('Сервер запущен на порту 3000')
}).on('error', err => {
	Logger.error(`Ошибка при запуске сервера: ${err.message}`)
})

void bot.launch({
	dropPendingUpdates: true,
})
