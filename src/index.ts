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
import path from 'path'

const __dirname = path.resolve()
const frontendPath = path.join(__dirname, '../haifisch-front/dist')
Logger.info(`Frontend path: ${frontendPath}`)

const app = express()

app.use(bodyParser.json())

app.use(yandexRouter)
app.use(ozonRouter)
app.use(tbankRouter)

app.use(express.static(frontendPath))
app.use((req, res, next) => {
	Logger.info(`Static file request: ${req.path}`)
	next()
})
app.get('*', (req, res) => {
	res.sendFile(path.join(frontendPath, 'index.html'))
})

const options = {
	key: fs.readFileSync('/etc/letsencrypt/live/haifisch.ru/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/haifisch.ru/fullchain.pem'),
}

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

try {
	const httpsServer = https.createServer(options, app)
	httpsServer
		.listen(443, () => {
			Logger.info('HTTPS сервер запущен на порту 443')
		})
		.on('error', err => {
			Logger.error(`Ошибка при запуске сервера: ${err.message}`)
		})
} catch (err) {
	//@ts-ignore
	Logger.error(`Критическая ошибка при создании сервера: ${err.message}`)
}

void bot.launch({
	dropPendingUpdates: true,
})
