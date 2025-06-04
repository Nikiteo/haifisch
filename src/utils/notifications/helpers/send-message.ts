import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { bot } from '../../../bot'

export const sendTelegramMessage = async (
    message: string,
    markdown?: boolean,
    chatId?: number,
    topicId?: number
) => {
    try {
        const options: ExtraReplyMessage = {
            ...(markdown && { parse_mode: 'MarkdownV2' }),
            ...(topicId && { message_thread_id: topicId })
        }

        await bot.telegram.sendMessage(
            chatId || 838975962,
            message,
            options
        )
    } catch (error) {
        console.error('Ошибка отправки сообщения в Telegram:', error)
        throw error
    }
}
