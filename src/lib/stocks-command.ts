import { checkUser } from './check-user'
import { bot } from '../bot'
import { updateYandexStocks } from '../controllers/yandex-stocks'
import { updateOzonStocks } from '../controllers/ozon-stocks'

export const stocksCommand = (): void => {
	bot.command('stocks', async ctx => {
		const username = ctx.from.username
		const chatId = ctx.chat.id
		if (checkUser(username)) {
			const sendMessage = async (text: string): Promise<void> => {
				await ctx.telegram.sendMessage(chatId, text)
			}
			await ctx.reply('Начал обновление...')
			await updateOzonStocks('Ozon', sendMessage)
			await updateYandexStocks('Haifisch', sendMessage)
			await updateYandexStocks('Top', sendMessage)
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
