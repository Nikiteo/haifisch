import { bot } from '../bot'
import { addCofinance } from '../controllers/add-cofinance'
import { checkUser } from './check-user'
import Logger from './logger'

export const addYandexCofinance = (): void => {
	bot.command('cofinance', async ctx => {
		const username = ctx.from.username
		const chatId = ctx.chat.id

		Logger.info(
			`Бот пытался запустить: ${username} с текстом ${ctx.message.text}`
		)
		if (checkUser(username)) {
			const sendReply = async (text: string): Promise<void> => {
				await ctx.reply(text, { parse_mode: 'Markdown' })
			}
			const sendMessage = async (text: string): Promise<void> => {
				await ctx.telegram.sendMessage(chatId, text)
			}
			await ctx.reply('Начал обновление...')
			await addCofinance('Haifisch', sendMessage, sendReply)
			await addCofinance('Top', sendMessage, sendReply)
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
