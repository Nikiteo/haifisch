import express, { Request, Response } from 'express'
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

app.post('/notification', (req: Request, res: Response) => {
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

app.get('/notification', (req: Request, res: Response) => {
	res.send('GET request received')
})

const options = {
	key: fs.readFileSync('/etc/letsencrypt/live/haifisch.ru/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/haifisch.ru/fullchain.pem'),
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

httpsServer
	.listen(443, () => {
		Logger.info('HTTPS сервер запущен на порту 443')
	})
	.on('error', err => {
		Logger.error(`Ошибка при запуске сервера: ${err.message}`)
	})

// Запуск бота
void bot.launch({
	dropPendingUpdates: true,
})
