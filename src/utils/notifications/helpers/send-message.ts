import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { bot } from '../../../bot'

export const sendTelegramMessage = async (
	message: string,
	markdown?: boolean
) => {
	const data = markdown
		? ({
				parse_mode: 'MarkdownV2',
			} as ExtraReplyMessage)
		: undefined
	await bot.telegram.sendMessage(838975962, message, data)
}
