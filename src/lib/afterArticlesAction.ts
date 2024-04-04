import Logger from './logger'
import { bot } from '../bot'
import { checkUser } from './check-user'

interface Store {
	username: string
	project: string
	sum: string
	description: string
	expenseItem: string
	cashOutQuestionId: number
	whatBuyedQuestion: number
}

export const afterArticlesAction = (store: Store): void => {
	bot.action(
		[
			'moving',
			'rent',
			'salary',
			'entertainment',
			'services',
			'purchase',
			'taxes',
		],
		async ctx => {
			try {
				const username = ctx.from?.username
				const chatId = ctx.chat?.id
				if (chatId !== undefined) {
					await ctx.deleteMessage()
					store.expenseItem = ctx.match.input
					if (checkUser(username)) {
						const cachOutQuestion = await ctx.reply(
							'Сколько потратили?',
							{
								reply_markup: {
									force_reply: true,
								},
							}
						)
						store.cashOutQuestionId = cachOutQuestion.message_id
					} else {
						return await ctx.reply(
							'Прости, но ты не можешь использовать меня'
						)
					}
				}
			} catch (err) {
				Logger.error(err)
			}
		}
	)
}
