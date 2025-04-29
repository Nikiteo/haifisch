import { Agent } from 'node:https'
import { currency, organization, retailer } from '../../database'
import { Logger } from '../../lib'
import {
	getCashoutByName,
	createCashout,
} from '../../services/moysklad/cashoutController'
import {
	getExpenseItems,
	postExpenseItem,
} from '../../services/moysklad/expenseItemController'
import { TbankNotification, OperationType } from '../../types/tbank/tbank'
import { sendTelegramMessage } from '../../utils'
import { getEmojii, getOwnerByInn } from './utils'
import GigaChat from 'gigachat'
import { IExpenseItem } from '../../types/ms-types'

const GIGA_TOKEN = process.env.GIGACHAT_TOKEN

const httpsAgent = new Agent({
	rejectUnauthorized: false,
})

const client = new GigaChat({
	credentials: GIGA_TOKEN,
	scope: 'GIGACHAT_API_PERS',
	httpsAgent,
})

let expenseItemsCache: IExpenseItem[] = []
let lastCacheUpdate: Date | null = null

const updateExpenseItemsCache = async (): Promise<void> => {
	try {
		const items = await getExpenseItems()
		if (items) {
			expenseItemsCache = items
			lastCacheUpdate = new Date()
			Logger.info(
				`Кэш статей расходов обновлен. Всего статей: ${items.length}`
			)
		}
	} catch (error) {
		Logger.error('Ошибка обновления кэша статей расходов:', error)
	}
}

const findExpenseItem = (name: string): IExpenseItem | undefined => {
	return expenseItemsCache.find(
		item => item.name.toLowerCase() === name.toLowerCase()
	)
}

const createNewExpenseItem = async (
	name: string,
	description?: string
): Promise<IExpenseItem | undefined> => {
	try {
		const newItem = {
			name,
			description:
				description || `Автоматически создана для: ${description}`,
		}

		const createdItem = await postExpenseItem(newItem)
		if (createdItem) {
			await updateExpenseItemsCache()
			Logger.info(`Создана новая статья расходов: ${name}`)
			return createdItem
		}
	} catch (error) {
		Logger.error('Ошибка при создании статьи расходов:', error)
	}
	return undefined
}

export const getExpenseItemForOperation = async (
	operation: TbankNotification
): Promise<IExpenseItem | undefined> => {
	try {
		if (
			expenseItemsCache.length === 0 ||
			(lastCacheUpdate &&
				new Date().getTime() - lastCacheUpdate.getTime() > 3600000)
		) {
			await updateExpenseItemsCache()
		}

		if (!operation.description) {
			Logger.warn('Нет описания операции для определения статьи расходов')
			return undefined
		}

		await client.updateToken()

		const categoriesList = expenseItemsCache
			.map(item => item.name)
			.join(', ')

		const prompt = `Определи наиболее подходящую статью расходов для транзакции: "${operation.description}".
        Выбери только из этого списка: ${categoriesList}.
        Если ни одна статья не подходит, предложи новую (только название).
        Ответ должен содержать только название статьи без дополнительных пояснений.`

		const response = await client.chat({
			messages: [
				{
					role: 'system',
					content:
						'Ты помогаешь классифицировать финансовые транзакции. Отвечай только названием статьи. Если подходящей статьи нет - предложи новую.',
				},
				{ role: 'user', content: prompt },
			],
			temperature: 0.3,
			max_tokens: 50,
		})

		const predictedCategory = response.choices[0]?.message.content?.trim()

		if (!predictedCategory) {
			Logger.warn('GigaChat не вернул категорию')
			return undefined
		}

		let matchedItem = findExpenseItem(predictedCategory)

		if (!matchedItem) {
			Logger.info(
				`Статья "${predictedCategory}" не найдена, создаем новую`
			)
			matchedItem = await createNewExpenseItem(
				predictedCategory,
				operation.description
			)

			if (!matchedItem) {
				Logger.warn(`Не удалось создать статью "${predictedCategory}"`)
				matchedItem = findExpenseItem('Прочие')
			}
		}

		return matchedItem
	} catch (error) {
		Logger.error('Ошибка при определении статьи расходов:', error)
		return undefined
	}
}

export const tbankOperations = async (operation: TbankNotification) => {
	if (operation.typeOfOperation !== OperationType.Debit) return

	try {
		const existingCashouts = await getCashoutByName(operation.operationId)
		if (existingCashouts?.length) {
			Logger.warn(`Дубликат операции: ${operation.operationId}`)
			return
		}

		const sum =
			parseFloat(operation.rubleAmount) ||
			parseFloat(operation.operationAmount)

		const expenseItem =
			(await getExpenseItemForOperation(operation)) ||
			(await createNewExpenseItem(
				'Прочие',
				'Автоматически созданная статья'
			))

		if (!expenseItem) {
			throw new Error('Не удалось определить или создать статью расходов')
		}

		const cashoutData = {
			name: operation.operationId,
			owner: getOwnerByInn(operation.payer.inn),
			applicable: true,
			shared: true,
			rate: {
				currency,
			},
			organization,
			agent: retailer,
			sum: parseFloat((sum * 100).toFixed(2)),
			paymentPurpose: operation.description,
			expenseItem: expenseItem ? { meta: expenseItem.meta } : undefined,
			state: {
				meta: {
					href: 'https://api.moysklad.ru/api/remap/1.2/entity/cashout/metadata/states/a833cd42-c5c1-11ee-0a80-0669002e69ef',
					metadataHref:
						'https://api.moysklad.ru/api/remap/1.2/entity/cashout/metadata',
					type: 'state',
					mediaType: 'application/json',
				},
			},
			description: `Получатель: ${operation.counterParty.name}\n\nПлательщик: ${operation.payer.name}`,
		}

		const createdCashout = await createCashout(cashoutData)
		Logger.info(`Создан расходный ордер: ${JSON.stringify(createdCashout)}`)

		await sendTelegramMessage(
			`✅ Создан расходный ордер в МойСклад\n` +
				`📝 Описание: ${operation.description || 'Нет описания'}\n` +
				`💰 Сумма: ${sum} руб.\n` +
				`🏷️ Статья: ${expenseItem?.name || 'Не определена'}\n` +
				`🔗 Ссылка: ${createdCashout?.meta?.uuidHref || ''}\n` +
				`${getEmojii(operation.payer.inn)} Плательщик: ${operation.payer.name}`,
			undefined,
			-1002457683199
		)
	} catch (error) {
		Logger.error(
			`Ошибка обработки операции ${operation.operationId}:`,
			error
		)
		await sendTelegramMessage(
			`❌ Ошибка обработки операции ${operation.operationId}:\n` +
				`\`\`\`${error instanceof Error ? error.message : JSON.stringify(error)}\`\`\``,
			undefined,
			-1002457683199
		)
	}
}
