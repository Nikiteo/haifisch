import { bot } from '../../../bot'

export const sendTelegramMessage = async (message: string) => {
	await bot.telegram.sendMessage(838975962, message, {
		parse_mode: 'MarkdownV2',
	})
}
