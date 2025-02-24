import { bot } from '../bot'
import { checkUser, Logger } from '../lib'

import { getRemainingGoods } from '../services/moysklad/remainingController'

export const remainingCommand = (): void => {
	bot.command('remainings', async ctx => {
		const username = ctx.from.username

		Logger.info(
			`Бот пытался запустить: ${username} с текстом ${ctx.message.text}`
		)
		if (checkUser(username)) {
			try {
				const remainings = await getRemainingGoods()
				const response = remainings?.rows?.map(row => {
					if (row.quantity.toString().includes('-')) {
						return `[${row.name}: ${row.quantity} ${row.uom.name}](${row.meta.uuidHref})\n`
					}
					return `${row.name}: ${row.quantity} ${row.uom.name}\n`
				})
				return await ctx.reply(`${response?.join('\n')}`, {
					parse_mode: 'Markdown',
				})
			} catch (err) {
				Logger.error(`[Ошибка]: ${err as string}`)
			}
		} else {
			return await ctx.reply('Прости, но ты не можешь использовать меня')
		}
	})
}
