import { bot } from '../bot'
import { addOzonCofinance, addCofinance } from '../controllers'
import { Logger } from '../lib'

export const addYandexCofinance = (): void => {
	bot.command('cofinance', async ctx => {
		const username = ctx.from.username
		const chatId = ctx.chat.id

		Logger.info(
			`Бот пытался запустить: ${username} с текстом ${ctx.message.text}`
		)
		if (username === 'Nikiteo') {
			const sendMessage = async (text: string): Promise<void> => {
				await ctx.telegram.sendMessage(chatId, text)
			}
			await ctx.reply('Начал обновление...')
			await addOzonCofinance('Ozon', sendMessage)
			await addCofinance('Haifisch', sendMessage)
			await addCofinance('Top', sendMessage)
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
