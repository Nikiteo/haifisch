import { Logger } from '../lib'
import { bot } from '../bot'
import { checkUser } from './check-user'
import { createActOzon } from '../controllers'

export const actCreateOzon = (): void => {
	bot.command('act', async ctx => {
		const username = ctx.from.username
		const chatId = ctx.chat.id

		Logger.info(
			`Бот пытался запустить: ${username} с текстом ${ctx.message.text}`
		)
		if (checkUser(username)) {
			const sendMessage = async (text: string): Promise<void> => {
				await ctx.telegram.sendMessage(chatId, text)
			}
			const sendDocument = async (
				document: Buffer,
				filename: string
			): Promise<void> => {
				await ctx.replyWithDocument({ source: document, filename })
			}
			await createActOzon('Ozon', sendMessage, sendDocument)
		}
	})
}
