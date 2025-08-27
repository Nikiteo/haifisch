import { Request, Response, Router } from 'express'
import { tbankOperations } from '../../controllers'
import { Logger } from '../../lib'
import { TbankNotification } from '../../types/tbank/tbank'
import { sendTelegramMessage } from '../../utils'

export const tbankRouter = Router()

tbankRouter.post('/operations', async (req: Request, res: Response) => {
	try {
		res.status(200).send('OK')
		const operation: TbankNotification = req.body

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
