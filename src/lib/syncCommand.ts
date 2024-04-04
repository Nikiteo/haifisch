import { bot } from '../bot'
import { updateOzon } from '../controllers/update-ozon'
import { updateYandex } from '../controllers/update-yandex'
import { checkUser } from './check-user'

export const syncCommand = (): void => {
	bot.command('sync', async ctx => {
		const username = ctx.from.username
		const chatId = ctx.chat.id
		if (checkUser(username)) {
			const sendMessage = async (text: string): Promise<void> => {
				await ctx.telegram.sendMessage(chatId, text)
			}
			await ctx.reply('Начал обновление...')
			await updateYandex('Haifisch', sendMessage)
			await updateYandex('Top', sendMessage)
			await updateOzon('Ozon', sendMessage)
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
