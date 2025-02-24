import { bot } from '../bot'
import { updateOzonProducts, updateYandexProducts } from '../controllers'
import { checkUser } from './check-user'
import { Logger } from '../lib'

export const updateCommand = (): void => {
	bot.command('offers', async ctx => {
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
			await updateOzonProducts('Ozon', sendMessage, sendReply)
			await updateYandexProducts('Top', sendMessage, sendReply)
			await updateYandexProducts('Haifisch', sendMessage, sendReply)
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
