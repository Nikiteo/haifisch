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
import { bot } from '../../bot'
import { createProduct } from '../../controllers/create-product'
import { createNewCustomerOrder } from '../moysklad/ordersController'

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
			const ping: PingNotificationDTO = req.body
			Logger.info(`Ping request: ${JSON.stringify(ping)}`)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(response, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
			break

		case NotificationType.ORDER_CREATED:
			const orderCreatedNotification: OrderCreatedNotificationDTO =
				req.body
			Logger.info(
				`Order request: ${JSON.stringify(orderCreatedNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(response, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
			const createOrder = await createProduct(orderCreatedNotification)
			if (createOrder) {
				const createdOrder = await createNewCustomerOrder(createOrder)
				await bot.telegram.sendMessage(
					838975962,
					`Создан [заказ покупателя](${createdOrder?.meta?.uuidHref})`,
					{ parse_mode: 'MarkdownV2' }
				)
			}
			break

		case NotificationType.ORDER_CANCELLED:
			const orderCancelledNotification: OrderCancelledNotificationDTO =
				req.body
			Logger.info(
				`Order cancelled request: ${JSON.stringify(orderCancelledNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(response, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)

			break

		case NotificationType.ORDER_STATUS_UPDATED:
			const orderStatusUpdatedNotification: OrderStatusUpdatedNotificationDTO =
				req.body
			Logger.info(
				`Order status updated request: ${JSON.stringify(orderStatusUpdatedNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(response, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
			break

		case NotificationType.ORDER_RETURN_CREATED:
			const orderReturnCreatedNotification: OrderReturnCreatedNotificationDTO =
				req.body
			Logger.info(
				`Order return created request: ${JSON.stringify(orderReturnCreatedNotification)}`
			)
			Logger.info(`Response: ${JSON.stringify(response)}`)
			res.json(response)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
			await bot.telegram.sendMessage(
				838975962,
				`Запрос: \`\`\`json\n${JSON.stringify(response, null, 2)}\n\`\`\``,
				{ parse_mode: 'MarkdownV2' }
			)
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
