import { Router, Request, Response } from 'express'
import { Logger } from '../../lib'
import { createProduct, updateProduct } from '../../controllers'
import { sendTelegramMessage } from '../../utils'
import { processFeedbackAndReply } from '../../controllers/notifications/feedback-controller'
import {
	GoodsFeedbackCreatedNotificationDTO,
	NotificationApiErrorType,
	NotificationType,
	OrderCancelledNotificationDTO,
	OrderCreatedNotificationDTO,
	OrderReturnCreatedNotificationDTO,
	OrderReturnStatusUpdatedNotificationDTO,
	OrderStatusUpdatedNotificationDTO,
	SendNotificationErrorResponse,
	SendNotificationResponse,
} from '../../types/yandex/notification-types'

export const yandexRouter = Router()

const handleResponse = (res: Response, response: SendNotificationResponse) => {
	res.json(response)
}

const handleError = async (res: Response, reqBody: any) => {
	const errorResponse: SendNotificationErrorResponse = {
		error: {
			type: NotificationApiErrorType.UNKNOWN,
			message: 'UNKNOWN error',
		},
	}
	Logger.error(`Error processing notification: ${JSON.stringify(reqBody)}`)
	await sendTelegramMessage(
		`Ошибка: \`\`\`json\n${JSON.stringify(reqBody, null, 2)}\n\`\`\``,
		true
	)
	res.status(500).json(errorResponse)
}

const notificationHandlers: {
	[key in NotificationType]: (req: Request, res: Response) => Promise<void>
} = {
	[NotificationType.PING]: async (req, res) => {
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
	},
	[NotificationType.ORDER_CREATED]: async (req, res) => {
		const orderCreatedNotification: OrderCreatedNotificationDTO = req.body
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
		const createdProduct = await createProduct(orderCreatedNotification)
		await sendTelegramMessage(
			`Создан заказ покупателя: ${createdProduct?.meta?.uuidHref}`,
			false
		)
	},
	[NotificationType.ORDER_CANCELLED]: async (req, res) => {
		const orderCancelledNotification: OrderCancelledNotificationDTO =
			req.body
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
		await updateProduct(orderCancelledNotification)
	},
	[NotificationType.ORDER_STATUS_UPDATED]: async (req, res) => {
		const orderStatusUpdatedNotification: OrderStatusUpdatedNotificationDTO =
			req.body
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
		await updateProduct(orderStatusUpdatedNotification)
	},
	[NotificationType.ORDER_RETURN_CREATED]: async (req, res) => {
		const orderReturnCreatedNotification: OrderReturnCreatedNotificationDTO =
			req.body
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
	},
	[NotificationType.GOODS_FEEDBACK_CREATED]: async (req, res) => {
		const feedbackCreatedNotification: GoodsFeedbackCreatedNotificationDTO =
			req.body
		const store =
			feedbackCreatedNotification.businessId === 6328344
				? 'Haifisch'
				: 'Top'
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
		const feedbackResponse = await processFeedbackAndReply(
			feedbackCreatedNotification,
			store
		)
		await sendTelegramMessage(
			`Ответ: \`\`\`json\n${JSON.stringify(feedbackResponse, null, 2)}\n\`\`\``,
			true
		)
	},
	[NotificationType.ORDER_RETURN_STATUS_UPDATED]: async (req, res) => {
		const orderReturnUpdated: OrderReturnStatusUpdatedNotificationDTO =
			req.body
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
		await sendTelegramMessage(
			`Обновлен статус возврата или невыкупа: \`\`\`json\n${JSON.stringify(orderReturnUpdated, null, 2)}\n\`\`\``,
			true
		)
	},
	[NotificationType.CHAT_CREATED]: async (req, res) => {
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
	},
	[NotificationType.CHAT_MESSAGE_SENT]: async (req, res) => {
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
	},
	[NotificationType.GOODS_FEEDBACK_COMMENT_CREATED]: async (req, res) => {
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
	},
	[NotificationType.CHAT_ARBITRAGE_STARTED]: async (req, res) => {
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
	},
	[NotificationType.CHAT_ARBITRAGE_FINISHED]: async (req, res) => {
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
	},
	[NotificationType.ORDER_CANCELLATION_REQUEST]: async (req, res) => {
		handleResponse(res, {
			version: '1.0.0',
			name: 'Haifisch',
			time: new Date().toISOString(),
		})
	},
}

yandexRouter.post('/notification', async (req: Request, res: Response) => {
	const { notificationType } = req.body as {
		notificationType: NotificationType
	}
	await sendTelegramMessage(
		`Запрос: \`\`\`json\n${JSON.stringify(req.body, null, 2)}\n\`\`\``,
		true
	)
	const handler = notificationHandlers[notificationType]

	if (handler) {
		await handler(req, res)
	} else {
		await handleError(res, req.body)
	}
})
