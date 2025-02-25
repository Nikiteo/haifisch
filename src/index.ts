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
import http from 'http'

const app = express()

// Middleware для парсинга JSON
app.use(bodyParser.json())

// Обработка POST-запроса на /notification
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

// Обработка GET-запроса на /notification
app.get('/notification', (req: Request, res: Response) => {
	res.send('GET request received')
})

// Настройка HTTP-сервера
const httpServer = http.createServer(app)

// Настройка команд бота
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

// Обработка запуска бота
bot.start(async ctx => {
	const username = ctx.from.username
	const text = ctx.message.text
	Logger.info(`Бот пытался запустить: ${username} с текстом ${text}`)
	await ctx.reply('Добро пожаловать в телеграм бот Haifisch')
})

// Инициализация команд
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

// Запуск HTTP-сервера на порту 80
httpServer.listen(80, () => {
	Logger.info('HTTP сервер запущен на порту 80')
})

// Запуск бота
void bot.launch({
	dropPendingUpdates: true,
})
