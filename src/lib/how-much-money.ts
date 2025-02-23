import { bot } from '../bot'
import { getBankAccounts } from '../services/tbank/api'
import { AccountInfo3 } from '../types/tbank/tbank'
import Logger from './logger'

interface HowMuchMoney {
	username?: string
	text: string
	sendMessage: (text: string) => Promise<void>
}

const calculateTotalBalance = (accounts: AccountInfo3[]): number => {
	return accounts.reduce((total, account) => {
		return total + (account.balance?.balance || 0)
	}, 0)
}

export const howMuchMoney = async ({
	username,
	text,
	sendMessage,
}: HowMuchMoney): Promise<void> => {
	Logger.info(`Бот пытался запустить: ${username} с текстом ${text}`)

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

				await sendMessage(
					`На всех счетах: ${totalBalance} рублей\n\nБалансы по счетам:\n${balancesMessage}`
				)
			} else {
				await sendMessage('Не удалось получить информацию о счетах.')
			}
		} catch (error) {
			Logger.error(`Ошибка при получении балансов: ${error}`)
			await sendMessage(
				'Произошла ошибка при получении информации о счетах.'
			)
		}
	} else {
		await sendMessage('Прости, но ты не можешь использовать меня')
	}
}
