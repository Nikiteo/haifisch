import Logger from './logger'
import { bot } from '../bot'
import { checkUser } from './check-user'
import { message } from 'telegraf/filters'
import { createCashout } from '../services/moysklad/cashoutController'
import { createCashoutObject, getExpenseItem } from '../utils/createCashout'

export const onText = (): void => {
	bot.on(message('text'), async ctx => {
		try {
			const username = ctx.from.username
			const text = ctx.message.text

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

			if (
				text.toLocaleLowerCase().includes('трата') &&
				ctx.message.chat.id === -1002457683199
			) {
				Logger.info(
					`Бот пытался запустить: ${username} с текстом ${text}`
				)
				if (checkUser(username)) {
					const textArray = text.split(',')
					const numberMatch = textArray[0].match(/\d+/)
					const sum =
						numberMatch != null
							? parseInt(numberMatch[0], 10)
							: null
					const expenseItem = textArray[1].trim().toLowerCase()
					const description = textArray[2].trim().toLowerCase()

					const expenseItemNew = getExpenseItem(expenseItem)

					if (expenseItemNew === undefined) {
						return await ctx.reply(
							`Прости, но я не могу распознать твою cтатью расходов - ${expenseItem}\nВведи трату в формате: трата {сумма}, {статья расходов}, {комментарий}`,
							{
								reply_to_message_id: ctx.message.message_id,
							}
						)
					}

					if (sum === null) {
						return await ctx.reply(
							`Прости, но я не могу распознать твою сумму расходов - ${sum}\nВведи трату в формате: трата {сумма}, {статья расходов}, {комментарий}`,
							{
								reply_to_message_id: ctx.message.message_id,
							}
						)
					}

					if (sum !== null && expenseItemNew !== undefined) {
						try {
							const newCashOut = createCashoutObject({
								username,
								sum,
								description,
								expenseItem,
							})

							if (newCashOut !== undefined) {
								const createdCashOut = await createCashout(
									newCashOut
								)
								await ctx.reply(
									`Держи ссылку на созданный документ и проверь правильность - ${createdCashOut?.meta?.uuidHref}`,
									{
										reply_to_message_id:
											ctx.message.message_id,
									}
								)
								Logger.info(
									`${username} создал расходный ордер: ${sum} - ${description} - ${expenseItem}`
								)
							}
						} catch (err) {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
							return await ctx.reply(err.message)
						}
					} else {
						return await ctx.reply(
							'Прости, но что-то пошло не так\nВведи трату в формате: трата {сумма}, {статья расходов}, {комментарий}',
							{
								reply_to_message_id: ctx.message.message_id,
							}
						)
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
