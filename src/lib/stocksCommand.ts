import { checkUser } from './check-user'
import { bot } from '../bot'
import { ozonStocks } from '../controllers/ozon-stocks'

export const stocksCommand = (): void => {
	bot.command('stocks', async ctx => {
		const username = ctx.from.username
		const chatId = ctx.chat.id
		if (checkUser(username)) {
			await ozonStocks()
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
