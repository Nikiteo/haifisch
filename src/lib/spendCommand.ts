import { bot } from '../bot'
import { checkUser } from './check-user'
import Logger from './logger'

import { Markup } from 'telegraf'

interface Store {
	username: string
	project: string
	sum: string
	description: string
	expenseItem: string
	cashOutQuestionId: number
	whatBuyedQuestion: number
}

export const spendCommand = (store: Store): void => {
	bot.command('spend', async ctx => {
		const username = ctx.from.username
		const text = ctx.message.text

		store.username = username ?? ''

		Logger.info(`Бот пытался запустить: ${username} с текстом ${text}`)

		if (checkUser(username)) {
			return await ctx.reply('Выбери магазин:', {
				...Markup.inlineKeyboard([
					[
						Markup.button.callback('🚀 ФБУ ОЗОН', 'fbyOzon'),
						Markup.button.callback('🚀 ФБС ОЗОН', 'fbsOzon'),
					],
					[
						Markup.button.callback('💻 ФБУ ХФ', 'fbyHf'),
						Markup.button.callback('💻 ФБС ХФ', 'fbsHf'),
					],
					[
						Markup.button.callback('💄 ФБУ ТОР', 'fbyTop'),
						Markup.button.callback('💄 ФБС ТОР', 'fbsTop'),
					],
				]),
			})
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
