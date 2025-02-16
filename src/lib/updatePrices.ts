import Logger from './logger'
import { bot } from '../bot'
import { checkUser } from './check-user'
import { updateYandexPrice } from '../controllers/update-yandex-price'

export const updatePrices = (): void => {
	bot.command('prices', async ctx => {
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
			await updateYandexPrice('Haifisch', sendMessage)
			await updateYandexPrice('Top', sendMessage)
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
