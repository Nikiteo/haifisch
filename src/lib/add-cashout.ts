import { checkUser } from './check-user'
import Logger from './logger'
import { createCashout } from '../services/moysklad/cashoutController'
import { createCashoutObject, getExpenseItem } from '../utils/create-cashout'
import { ReactionType } from 'telegraf/typings/core/types/typegram'

interface AddCashout {
	username?: string
	text: string
	messageId: number
	sendMessage: (
		text: string,
		extra?: {
			reply_parameters: {
				message_id: number
			}
		}
	) => Promise<void>
	setReaction: (reaction: ReactionType[]) => Promise<void>
}

export const addCashout = async ({
	username,
	text,
	messageId,
	sendMessage,
	setReaction,
}: AddCashout): Promise<void> => {
	Logger.info(`Бот пытался запустить: ${username} с текстом ${text}`)
	if (checkUser(username)) {
		const textArray = text.split(',')
		const numberMatch = textArray[0].match(/\d+/)
		const sum = numberMatch != null ? parseInt(numberMatch[0], 10) : null
		const expenseItem = textArray[1].trim().toLowerCase()
		const description = textArray[2].trim().toLowerCase()

		const expenseItemNew = getExpenseItem(expenseItem)

		if (expenseItemNew === undefined) {
			setReaction([
				{
					type: 'emoji',
					emoji: '👎',
				},
			])
			return await sendMessage(
				`Прости, но я не могу распознать твою cтатью расходов - ${expenseItem}\nВведи трату в формате: трата {сумма}, {статья расходов}, {комментарий}`,
				{
					reply_parameters: {
						message_id: messageId,
					},
				}
			)
		}

		if (sum === null) {
			await setReaction([
				{
					type: 'emoji',
					emoji: '👎',
				},
			])
			return await sendMessage(
				`Прости, но я не могу распознать твою сумму расходов - ${sum}\nВведи трату в формате: трата {сумма}, {статья расходов}, {комментарий}`,
				{
					reply_parameters: {
						message_id: messageId,
					},
				}
			)
		}

		if (sum !== null && expenseItemNew !== undefined) {
			await setReaction([
				{
					type: 'emoji',
					emoji: '👍',
				},
			])
			try {
				const newCashOut = createCashoutObject({
					username,
					sum,
					description,
					expenseItem,
				})

				if (newCashOut !== undefined) {
					const createdCashOut = await createCashout(newCashOut)
					await sendMessage(
						`Держи ссылку на созданный документ и проверь правильность - ${createdCashOut?.meta?.uuidHref}`,
						{
							reply_parameters: {
								message_id: messageId,
							},
						}
					)
					Logger.info(
						`${username} создал расходный ордер: ${sum} - ${description} - ${expenseItem}`
					)
				}
			} catch (err) {
				const error = err as unknown as {
					message: string
				}
				return await sendMessage(error.message)
			}
		} else {
			await setReaction([
				{
					type: 'emoji',
					emoji: '👎',
				},
			])
			return await sendMessage(
				'Прости, но что-то пошло не так\nВведи трату в формате: трата {сумма}, {статья расходов}, {комментарий}',
				{
					reply_parameters: {
						message_id: messageId,
					},
				}
			)
		}
	} else {
		return await sendMessage('Прости, но ты не можешь использовать меня')
	}
}
