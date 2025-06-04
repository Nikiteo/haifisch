import { Logger } from '../lib'
import { bot } from '../bot'
import { checkUser } from './check-user'
import { message } from 'telegraf/filters'

import { howMuchMoney } from './how-much-money'
import { addCashout } from './add-cashout'
import { ReactionType } from 'telegraf/typings/core/types/typegram'

export const onText = (): void => {
	bot.on(message('text'), async ctx => {
		try {
			const username = ctx.from.username
			const text = ctx.message.text
			const chatId = ctx.chat.id
			const messageId = ctx.message.message_id
			const messageThreadId = ctx.message.message_thread_id
			const sendMessage = async (
				text: string,
				extra?: {
					reply_parameters: {
						message_id: number
					}
				}
			): Promise<void> => {
				await ctx.telegram.sendMessage(chatId, text, extra)
			}

			if (text.toLocaleLowerCase() === 'мой id') {
				Logger.info(
					`Бот пытался запустить: ${username} с текстом ${text}`
				)
				if (checkUser(username)) {
					await ctx.sendMessage('Твой chatID: ' + chatId)
				} else {
					return await sendMessage(
						'Прости, но ты не можешь использовать меня'
					)
				}
			}

			if (text.toLocaleLowerCase() === 'topicId') {
				Logger.info(
					`Бот пытался запустить: ${username} с текстом ${text}`
				)
				if (checkUser(username)) {
					await ctx.sendMessage('Твой topicId: ' + messageThreadId)
				} else {
					return await sendMessage(
						'Прости, но ты не можешь использовать меня'
					)
				}
			}

			if (text.toLocaleLowerCase() === 'логи') {
				Logger.info(
					`Бот пытался запустить: ${username} с текстом ${text}`
				)

				if (checkUser(username)) {
					await ctx.sendDocument({ source: 'logs/all.log' })
					await ctx.sendDocument({ source: 'logs/error.log' })
				} else {
					return await sendMessage(
						'Прости, но ты не можешь использовать меня'
					)
				}
			}

			if (
				text.toLocaleLowerCase().includes('трата') &&
				ctx.message.chat.id === -1002457683199
			) {
				const setReaction = async (
					reaction: ReactionType[]
				): Promise<void> => {
					await ctx.telegram.setMessageReaction(
						-1002457683199,
						messageId,
						reaction
					)
				}

				await addCashout({
					username,
					text,
					messageId,
					sendMessage,
					setReaction,
				})
			}

			if (
				text.toLocaleLowerCase().includes('сколько денег у нас?') ||
				text.toLocaleLowerCase().includes('сколько у нас денег?') ||
				text.toLocaleLowerCase().includes('сколько денег?') ||
				text.toLocaleLowerCase().includes('деньги?')
			) {
				await howMuchMoney({
					username,
					text,
					sendMessage,
				})
			}
		} catch (err) {
			Logger.error(err)
		}
	})
}
