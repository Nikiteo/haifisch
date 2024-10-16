import { bot } from '../bot'
import { addYandexPromos } from '../controllers/add-yandex-promos'
import { checkUser } from './check-user'
import Logger from './logger'

export const addPromos = (): void => {
	bot.command('promos', async ctx => {
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
			await addYandexPromos('Haifisch', sendMessage, sendReply)
			await addYandexPromos('Top', sendMessage, sendReply)
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
