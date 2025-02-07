import {
	anyaOwner,
	consumables,
	currency,
	entertainment,
	equipment,
	forms,
	improvement,
	mishaOwner,
	moving,
	optimization,
	organization,
	owner,
	purchase,
	refund,
	rent,
	retailer,
	salary,
	services,
	taxes,
	writing,
} from '../database'
import { type Owner, type Cashout, type Meta } from '../types/msTypes'

interface CreateCashoutObjectProps {
	username?: string
	sum: number
	description?: string
	expenseItem?: string
}

const getOwner = (username?: string): Owner => {
	switch (username) {
		case 'Nikiteo':
			return owner
		case 'chekannaa':
			return anyaOwner
		case 'Haifisch_store':
			return mishaOwner
		default:
			return owner
	}
}

export const getExpenseItem = (
	expenseItem?: string
): Record<string, Meta> | undefined => {
	const movingKeywords = [
		'перемещение',
		'перестановка',
		'трансфер',
		'перемещение средств',
		'перемещение денег',
		'транспортировка',
		'транспортные услуги',
		'логистика',
		'перемещения',
		'трансферы',
	]

	const rentalKeywords = [
		'аренда',
		'подписка',
		'подписки',
		'лизинг',
		'арендные платежи',
		'арендные расходы',
		'арендатор',
		'арендаторы',
		'долгосрочная аренда',
		'краткосрочная аренда',
	]

	const salaryKeywords = [
		'зарплата',
		'оклад',
		'вознаграждение',
		'премия',
		'доплаты',
		'надбавки',
		'бонусы',
		'вознаграждения',
		'зарплатные ведомости',
		'оклады',
	]

	const withdrawalKeywords = [
		'вывод',
		'выводы',
		'вывод средств',
		'перевод',
		'снятие',
		'снятия',
		'транзакции',
		'операции',
		'выводы денег',
		'вывод средств на карту',
	]

	const writeOffKeywords = [
		'списание',
		'списания',
		'аннулирование',
		'уменьшение',
		'выбытие',
		'списания активов',
		'списание долгов',
		'списание затрат',
		'списания средств',
	]

	const rawMaterialKeywords = [
		'сырье',
		'техкарта',
		'материалы',
		'первичные материалы',
		'основные материалы',
		'вторичные материалы',
		'компоненты',
		'материальные запасы',
		'сырьевые ресурсы',
	]

	const purchaseKeywords = [
		'закупка',
		'товары',
		'приобретение',
		'покупка',
		'закупочные расходы',
		'закупки',
		'покупки',
		'поставки',
		'договоры поставки',
	]

	const returnKeywords = [
		'возврат',
		'возврат товара',
		'возврат средств',
		'возврат платежа',
		'возвраты',
		'возвратные операции',
		'возвратные товары',
	]

	const taxKeywords = [
		'налоги',
		'сборы',
		'налоговые платежи',
		'обязательные платежи',
		'фискальные сборы',
		'налоговые декларации',
		'налоговые обязательства',
		'налоговые вычеты',
	]

	const consumablesKeywords = [
		'расходники',
		'расходные материалы',
		'потребляемые материалы',
		'канцелярские товары',
		'расходные запасы',
		'расходные изделия',
		'потребительские товары',
	]

	const equipmentKeywords = [
		'оборудование',
		'аппаратура',
		'инструменты',
		'техника',
		'механизмы',
		'устройства',
		'оборудования',
		'технические средства',
	]

	const formsKeywords = [
		'формы',
		'модели',
		'шаблоны',
		'документы',
		'образцы',
		'форматы',
		'формуляры',
		'документация',
	]

	const improvementKeywords = [
		'благоустройство',
		'помещение',
		'ремонт',
		'обновление',
		'модернизация',
		'улучшение',
		'оптимизация',
		'развитие',
	]

	const optimizationKeywords = [
		'оптимизация',
		'улучшение',
		'повышение эффективности',
		'совершенствование',
		'рационализация',
		'оптимизации',
		'оптимальные решения',
	]

	if (expenseItem != null) {
		if (
			purchaseKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return purchase
		}
		if (
			taxKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return taxes
		}
		if (
			movingKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return moving
		}
		if (
			rentalKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return rent
		}
		if (
			salaryKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return salary
		}
		if (
			withdrawalKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return entertainment
		}
		if (
			rawMaterialKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return services
		}
		if (
			returnKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return refund
		}
		if (
			writeOffKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return writing
		}
		if (
			consumablesKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return consumables
		}
		if (
			equipmentKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return equipment
		}
		if (
			formsKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return forms
		}
		if (
			improvementKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return improvement
		}
		if (
			optimizationKeywords.some(keyword =>
				expenseItem.includes(keyword.toLowerCase())
			)
		) {
			return optimization
		}
	}
}

export const createCashoutObject = ({
	username,
	sum,
	description,
	expenseItem,
}: CreateCashoutObjectProps): Cashout => {
	return {
		owner: getOwner(username),
		applicable: true,
		shared: true,
		rate: {
			currency,
		},
		organization,
		agent: retailer,
		sum: parseFloat((sum * 100).toFixed(2)),
		paymentPurpose: description,
		expenseItem: getExpenseItem(expenseItem),
		state: {
			meta: {
				href: 'https://api.moysklad.ru/api/remap/1.2/entity/cashout/metadata/states/a833cd42-c5c1-11ee-0a80-0669002e69ef',
				metadataHref:
					'https://api.moysklad.ru/api/remap/1.2/entity/cashout/metadata',
				type: 'state',
				mediaType: 'application/json',
			},
		},
	}
}
