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

const app = express()

app.use(bodyParser.json())

app.post('/notification', (req, res) => {
	const { notificationType, time } = req.body

	if (notificationType === 'PING') {
		const response = {
			version: '1.0',
			name: 'Haifisch',
			time: time,
		}
		res.json(response)
	} else {
		res.status(400).json({ error: 'Invalid notification type' })
	}
})

const options = {
	key: fs.readFileSync('path/to/your/private.key'),
	cert: fs.readFileSync('path/to/your/certificate.crt'),
}

const httpsServer = https.createServer(options, app)

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

httpsServer.listen(3000, () => {
	Logger.info('HTTPS сервер запущен на порту 3000')
})

void bot.launch({
	dropPendingUpdates: true,
})
