// import Logger from './logger'
// import { bot } from '../bot'
// import { checkUser } from './check-user'

// export const actCreateOzon = (): void => {
// 	bot.command('cofinance', async ctx => {
// 		const username = ctx.from.username
// 		const chatId = ctx.chat.id

// 		Logger.info(
// 			`Бот пытался запустить: ${username} с текстом ${ctx.message.text}`
// 		)
// 		if (checkUser(username)) {
// 			const sendMessage = async (text: string): Promise<void> => {
// 				await ctx.telegram.sendMessage(chatId, text)
// 			}
// 		}
// 	})
// }
