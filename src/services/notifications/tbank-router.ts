import { Router, Request, Response } from 'express'
import { Logger } from '../../lib'
import { sendTelegramMessage } from '../../utils'

export const tbankRouter = Router()

tbankRouter.post('/operations', async (req: Request, res: Response) => {
	try {
		const operation = req.body

		// Логируем полученное уведомление
		Logger.info(`Получена операция от TBank: ${JSON.stringify(operation)}`)
		await sendTelegramMessage(
			`Новая операция TBank: \`\`\`json\n${JSON.stringify(operation, null, 2)}\n\`\`\``,
			true
		)

		// Здесь можно добавить обработку операции (сохранение в БД, интеграция с МойСклад и т.д.)
		// Например:
		// await processTBankOperation(operation)

		// Отправляем успешный ответ
		res.status(200).send('OK')
	} catch (error) {
		Logger.error(`Ошибка обработки операции TBank: ${error}`)
		await sendTelegramMessage(
			`Ошибка обработки операции TBank: \`\`\`${error}\`\`\``,
			true
		)
		res.status(500).send('Internal Server Error')
	}
})
