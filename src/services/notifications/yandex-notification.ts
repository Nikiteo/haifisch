import { Router, Request, Response } from 'express'
import { Logger } from '../../lib'
import {
	OrderCreatedNotificationDTO,
	OrderCancelledNotificationDTO,
	OrderStatusUpdatedNotificationDTO,
	OrderReturnCreatedNotificationDTO,
	Integration,
	ErrorResponse,
	NotificationType,
	PingNotificationDTO,
} from './types'
import { message } from 'telegraf/filters'
import { bot } from '../../bot'

export const yandexRouter = Router()

yandexRouter.post('/notification', async (req: Request, res: Response) => {
	const { notificationType } = req.body

	const currentTime = new Date().toISOString()
	const response: Integration = {
		version: '1.0.0',
		name: 'Haifisch',
		time: currentTime,
	}

	switch (notificationType) {
		case NotificationType.PING:
			// await bot.telegram.sendMessage(chatId, message)
			const ping: PingNotificationDTO = req.body
			Logger.info(`Ping request: ${JSON.stringify(ping)}`)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			break

		case NotificationType.ORDER_CREATED:
			const orderCreatedNotification: OrderCreatedNotificationDTO =
				req.body
			Logger.info(
				`Order request: ${JSON.stringify(orderCreatedNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			break

		case NotificationType.ORDER_CANCELLED:
			const orderCancelledNotification: OrderCancelledNotificationDTO =
				req.body
			Logger.info(
				`Order cancelled request: ${JSON.stringify(orderCancelledNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			break

		case NotificationType.ORDER_STATUS_UPDATED:
			const orderStatusUpdatedNotification: OrderStatusUpdatedNotificationDTO =
				req.body
			Logger.info(
				`Order status updated request: ${JSON.stringify(orderStatusUpdatedNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			break

		case NotificationType.ORDER_RETURN_CREATED:
			const orderReturnCreatedNotification: OrderReturnCreatedNotificationDTO =
				req.body
			Logger.info(
				`Order return created request: ${JSON.stringify(orderReturnCreatedNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			break

		default:
			const errorResponse: ErrorResponse = {
				error: {
					type: 'UNKNOWN',
					message: 'UNKNOWN error',
				},
			}
			Logger.error(
				`Error processing notification: ${JSON.stringify(errorResponse)}`
			)

			res.status(500).json(errorResponse)
			break
	}
})
