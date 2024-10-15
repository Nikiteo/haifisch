import { bot } from '../bot'
import { updateOzonProducts } from '../controllers/update-ozon-products'
import { updateYandexProducts } from '../controllers/update-yandex-products'
import { checkUser } from './check-user'
import Logger from './logger'

export const updateCommand = (): void => {
	bot.command('offers', async ctx => {
		const username = ctx.from.username
		const chatId = ctx.chat.id
		if (username === 'Mi4ku') {
			await ctx.reply('Миш, иди нахуй, а, шо доебался до меня?')
		}
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
