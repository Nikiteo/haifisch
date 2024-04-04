import Logger from './logger'
import { bot } from '../bot'
import { checkUser } from './check-user'
import { message } from 'telegraf/filters'
import { createCashout } from '../services/moysklad/cashoutController'
import { createCashoutObject } from '../utils/createCashout'

interface Store {
	username: string
	project: string
	sum: string
	description: string
	expenseItem: string
	cashOutQuestionId: number
	whatBuyedQuestion: number
}

export const onText = (store: Store): void => {
	bot.on(message('text'), async ctx => {
		try {
			const username = ctx.from.username
			const text = ctx.message.text
			Logger.info(`Бот пытался запустить: ${username} с текстом ${text}`)

			if (text.toLocaleLowerCase() === 'логи') {
				Logger.info(
					`Бот пытался запустить: ${username} с текстом ${text}`
				)

				if (checkUser(username)) {
					await ctx.sendDocument({ source: 'logs/all.log' })
					await ctx.sendDocument({ source: 'logs/error.log' })
				} else {
					return await ctx.reply(
						'Прости, но ты не можешь использовать меня'
					)
				}
			}

			if (ctx.update.message.message_id === store.cashOutQuestionId + 1) {
				if (checkUser(username)) {
					const whatBuyedQuestion = await ctx.reply(
						'На что потратили?',
						{
							reply_markup: {
								force_reply: true,
							},
						}
					)
					store.whatBuyedQuestion = whatBuyedQuestion.message_id
					store.sum = ctx.update.message.text
				} else {
					return await ctx.reply(
						'Прости, но ты не можешь использовать меня'
					)
				}
			}

			if (ctx.update.message.message_id === store.whatBuyedQuestion + 1) {
				if (checkUser(username)) {
					try {
						const newCashOut = createCashoutObject({
							username: store.username,
							project: store.project,
							sum: store.sum,
							description: ctx.message.text,
							expenseItem: store.expenseItem,
						})
						if (newCashOut !== undefined) {
							const createdCashOut = await createCashout(
								newCashOut
							)
							await ctx.reply(
								`Держи ссылку на созданный документ и проверь правильность - ${createdCashOut?.meta?.uuidHref}`
							)
							Logger.info(
								`${store.username} создал расходный ордер: ${store.project} - ${store.sum} - ${ctx.message.text} - ${store.expenseItem}`
							)
						}
					} catch (err) {
						Logger.error(err)
						return await ctx.reply('Кажется, я сломался :(')
					}
				} else {
					return await ctx.reply(
						'Прости, но ты не можешь использовать меня'
					)
				}
			}
		} catch (err) {
			Logger.error(err)
		}
	})
}
