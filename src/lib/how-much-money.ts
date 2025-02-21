import { bot } from '../bot'
import { getBankAccounts } from '../services/tbank/api'
import { AccountInfo3 } from '../types/tbank/tbank'
import Logger from './logger'

const calculateTotalBalance = (accounts: AccountInfo3[]): number => {
	return accounts.reduce((total, account) => {
		return total + (account.balance?.balance || 0)
	}, 0)
}

export const howMuchMoney = (): void => {
	bot.command('money', async ctx => {
		const username = ctx.from.username
		const chatId = ctx.chat.id

		Logger.info(
			`Бот пытался запустить: ${username} с текстом ${ctx.message.text}`
		)

		if (
			username === 'Nikiteo' ||
			username === 'Haifisch_store' ||
			username === 'chekannaa'
		) {
			try {
				const haifisch = (await getBankAccounts('Haifisch')) || []
				const top = (await getBankAccounts('Top')) || []
				const ozon = (await getBankAccounts('Ozon')) || []

				const accounts: { account: AccountInfo3; source: string }[] = [
					...haifisch.map(account => ({
						account,
						source: 'Haifisch',
					})),
					...top.map(account => ({ account, source: 'Top' })),
					...ozon.map(account => ({ account, source: 'Ozon' })),
				]

				if (accounts.length > 0) {
					const totalBalance = calculateTotalBalance(
						accounts.map(a => a.account)
					)

					const balancesMessage = accounts
						.map(({ account, source }) => {
							return `Счет (${source}): ${account.balance?.balance || 0} рублей`
						})
						.join('\n')

					await ctx.reply(
						`На всех счетах: ${totalBalance} рублей\n\nБалансы по счетам:\n${balancesMessage}`
					)
				} else {
					await ctx.reply('Не удалось получить информацию о счетах.')
				}
			} catch (error) {
				Logger.error(`Ошибка при получении балансов: ${error}`)
				await ctx.reply(
					'Произошла ошибка при получении информации о счетах.'
				)
			}
		} else {
			await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
