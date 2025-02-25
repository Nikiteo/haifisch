import { Router, Request, Response } from 'express'
import { Logger } from '../../lib'
import {
	Integration,
	ErrorResponse,
	MessageType,
	Ping,
	NewPostingEvent,
	PostingCancelledEvent,
	StateChangedEvent,
} from './types'
import { bot } from '../../bot'

export const ozonRouter = Router()

ozonRouter.post('/', async (req: Request, res: Response) => {
	const { message_type } = req.body

	const currentTime = new Date().toISOString()
	const pingResponse: Integration = {
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
				`Запрос: ${JSON.stringify(req.body)}`
			)
			await bot.telegram.sendMessage(
				838975962,
				`Ответ: ${JSON.stringify(pingResponse)}`
			)
			break

		case MessageType.TYPE_NEW_POSTING:
			const postingCreatedNotification: NewPostingEvent = req.body
			Logger.info(
				`Posting created request: ${JSON.stringify(postingCreatedNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: ${JSON.stringify(req.body)}`
			)
			await bot.telegram.sendMessage(
				838975962,
				`Ответ: ${JSON.stringify(response)}`
			)
			break

		case MessageType.TYPE_POSTING_CANCELLED:
			const postingCancelledNotification: PostingCancelledEvent = req.body
			Logger.info(
				`Posting cancelled request: ${JSON.stringify(postingCancelledNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: ${JSON.stringify(req.body)}`
			)
			await bot.telegram.sendMessage(
				838975962,
				`Ответ: ${JSON.stringify(response)}`
			)
			break

		case MessageType.TYPE_STATE_CHANGED:
			const postingStateChangedNotification: StateChangedEvent = req.body
			Logger.info(
				`Posting state changed request: ${JSON.stringify(postingStateChangedNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: ${JSON.stringify(req.body)}`
			)
			await bot.telegram.sendMessage(
				838975962,
				`Ответ: ${JSON.stringify(response)}`
			)
			break

		default:
			const errorResponse: ErrorResponse = {
				error: {
					type: 'UNKNOWN',
					message: 'UNKNOWN error',
					details: null,
				},
			}
			Logger.error(
				`Error processing notification: ${JSON.stringify(errorResponse)}`
			)
			res.status(500).json(errorResponse)
			break
	}
})
