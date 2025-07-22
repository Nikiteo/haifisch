import { Request, Response, Router } from 'express'
import { bot } from '../../bot'
import { Logger } from '../../lib'
import {
	NotificationApiErrorType,
	SendNotificationErrorResponse,
	SendNotificationResponse,
} from '../../types/yandex/notification-types'
import {
	MessageType,
	NewPostingEvent,
	Ping,
	PostingCancelledEvent,
	StateChangedEvent,
} from './types'

export const ozonRouter = Router()

ozonRouter.post('/', async (req: Request, res: Response) => {
	const { message_type } = req.body

	const currentTime = new Date().toISOString()
	const pingResponse: SendNotificationResponse = {
		version: '1.0.0',
		name: 'Haifisch',
		time: currentTime,
	}
	const response = {
		result: true,
	}
	switch (message_type) {
		case MessageType.TYPE_PING:
			const ping: Ping = req.body
			Logger.info(`Ping request: ${JSON.stringify(ping)}`)
			Logger.info(`Response: ${JSON.stringify(pingResponse)}`)
			res.json(pingResponse)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)

			break

		case MessageType.TYPE_NEW_POSTING:
			const postingCreatedNotification: NewPostingEvent = req.body
			Logger.info(
				`Posting created request: ${JSON.stringify(postingCreatedNotification)}`
			)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)

			break

		case MessageType.TYPE_POSTING_CANCELLED:
			const postingCancelledNotification: PostingCancelledEvent = req.body
			Logger.info(
				`Posting cancelled request: ${JSON.stringify(postingCancelledNotification)}`
			)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)

			break

		case MessageType.TYPE_STATE_CHANGED:
			const postingStateChangedNotification: StateChangedEvent = req.body
			Logger.info(
				`Posting state changed request: ${JSON.stringify(postingStateChangedNotification)}`
			)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)

			break

		default:
			const errorResponse: SendNotificationErrorResponse = {
				error: {
					type: NotificationApiErrorType.UNKNOWN,
					message: 'UNKNOWN error',
					details: null,
				},
			}
			Logger.error(
				`Error processing notification: ${JSON.stringify(errorResponse)}`
			)
			res.status(500).json(errorResponse)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(errorResponse, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
			break
	}
})
