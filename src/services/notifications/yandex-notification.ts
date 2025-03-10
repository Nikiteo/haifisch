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
} from './types'
import { createProduct, updateProduct } from '../../controllers'
import { sendTelegramMessage } from '../../utils'

export const yandexRouter = Router()

const handleResponse = (res: Response, response: Integration) => {
	res.json(response)
}

const handleError = async (res: Response, reqBody: any) => {
	const errorResponse: ErrorResponse = {
		error: {
			type: 'UNKNOWN',
			message: 'UNKNOWN error',
		},
	}
	Logger.error(`Error processing notification: ${JSON.stringify(reqBody)}`)
	await sendTelegramMessage(
		`Ошибка: \`\`\`json\n${JSON.stringify(reqBody, null, 2)}\n\`\`\``
	)
	res.status(500).json(errorResponse)
}

const notificationHandlers: {
	[key in NotificationType]: (req: Request, res: Response) => Promise<void>
} = {
	[NotificationType.PING]: async (req, res) => {
		const response: Integration = {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		}
		handleResponse(res, response)
	},
	[NotificationType.ORDER_CREATED]: async (req, res) => {
		const orderCreatedNotification: OrderCreatedNotificationDTO = req.body
		const response: Integration = {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		}
		handleResponse(res, response)
		await sendTelegramMessage(
			`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``
		)
		const createdProduct = await createProduct(orderCreatedNotification)
		await sendTelegramMessage(
			`Отгрузка: \`\`\`json\n${JSON.stringify(createdProduct?.meta?.uuidHref, null, 2)}\n\`\`\``
		)
	},
	[NotificationType.ORDER_CANCELLED]: async (req, res) => {
		const orderCancelledNotification: OrderCancelledNotificationDTO =
			req.body
		const response: Integration = {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		}
		handleResponse(res, response)
		await updateProduct(orderCancelledNotification)
	},
	[NotificationType.ORDER_STATUS_UPDATED]: async (req, res) => {
		const orderStatusUpdatedNotification: OrderStatusUpdatedNotificationDTO =
			req.body
		const response: Integration = {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		}
		handleResponse(res, response)
		await sendTelegramMessage(
			`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``
		)
		await updateProduct(orderStatusUpdatedNotification)
	},
	[NotificationType.ORDER_RETURN_CREATED]: async (req, res) => {
		const orderReturnCreatedNotification: OrderReturnCreatedNotificationDTO =
			req.body
		const response: Integration = {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		}
		handleResponse(res, response)
		await sendTelegramMessage(
			`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``
		)
	},
}

yandexRouter.post('/notification', async (req: Request, res: Response) => {
	const { notificationType } = req.body as {
		notificationType: NotificationType
	}
	const handler = notificationHandlers[notificationType]

	if (handler) {
		await handler(req, res)
	} else {
		await handleError(res, req.body)
	}
})
