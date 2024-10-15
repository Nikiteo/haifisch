import { bot } from '../bot'
import { updateOzon } from '../controllers/update-ozon'
import { updateSber } from '../controllers/update-sber'
import { updateYandex } from '../controllers/update-yandex'
import { checkUser } from './check-user'
import Logger from './logger'

export const syncCommand = (): void => {
	bot.command('sync', async ctx => {
		const username = ctx.from.username
		const chatId = ctx.chat.id

		Logger.info(
			`Бот пытался запустить: ${username} с текстом ${ctx.message.text}`
		)
		if (checkUser(username)) {
			const sendMessage = async (text: string): Promise<void> => {
				await ctx.telegram.sendMessage(chatId, text)
			}
			await ctx.reply('Начал обновление...')
			await updateOzon('Ozon', sendMessage)
			await updateSber('Sber', sendMessage)
			await updateYandex('Haifisch', sendMessage)
			await updateYandex('Top', sendMessage)
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
