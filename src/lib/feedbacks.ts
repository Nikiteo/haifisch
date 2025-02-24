import { bot } from '../bot'
import { feedbackAnswer } from '../controllers'

import { Logger } from '../lib'

export const feedbacks = (): void => {
	bot.command('feedbacks', async ctx => {
		const username = ctx.from.username
		const chatId = ctx.chat.id

		Logger.info(
			`Бот пытался запустить: ${username} с текстом ${ctx.message.text}`
		)
		if (username === 'Nikiteo') {
			const sendReply = async (text: string): Promise<void> => {
				await ctx.reply(text, { parse_mode: 'Markdown' })
			}
			const sendMessage = async (text: string): Promise<void> => {
				await ctx.telegram.sendMessage(chatId, text)
			}
			await ctx.reply('Начал обновление...')
			await feedbackAnswer('Haifisch', sendMessage, sendReply)
			await feedbackAnswer('Top', sendMessage, sendReply)
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
