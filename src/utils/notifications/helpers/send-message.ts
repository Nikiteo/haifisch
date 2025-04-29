import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { bot } from '../../../bot'

export const sendTelegramMessage = async (
	message: string,
	markdown?: boolean,
	chatId?: number
) => {
	const data = markdown
		? ({
				parse_mode: 'MarkdownV2',
			} as ExtraReplyMessage)
		: undefined
	await bot.telegram.sendMessage(chatId || 838975962, message, data)
}
