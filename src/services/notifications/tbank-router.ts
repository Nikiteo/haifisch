import { Router, Request, Response } from 'express'
import { Logger } from '../../lib'
import { sendTelegramMessage } from '../../utils'
import { OperationType, TbankNotification } from '../../types/tbank/tbank'
import { createCashout, getCashoutByName } from '../moysklad/cashoutController'
import { createCashoutObject } from '../../utils/create-cashout'
import { tbankOperations } from '../../controllers'

export const tbankRouter = Router()

tbankRouter.post('/operations', async (req: Request, res: Response) => {
	try {
		res.status(200).send('OK')
		const operation: TbankNotification = req.body

		Logger.info(`Получена операция от TBank: ${JSON.stringify(operation)}`)
		await sendTelegramMessage(
			`Новая операция TBank: \`\`\`json\n${JSON.stringify(operation, null, 2)}\n\`\`\``,
			true
		)
		await tbankOperations(operation)
	} catch (error) {
		Logger.error(`Ошибка обработки операции TBank: ${error}`)
		await sendTelegramMessage(
			`Ошибка обработки операции TBank: \`\`\`${error}\`\`\``,
			true
		)
		res.status(500).send('Internal Server Error')
	}
})
