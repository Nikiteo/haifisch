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
	]
	const rentalKeywords = [
		'аренда',
		'подписка',
		'лизинг',
		'арендные платежи',
		'арендные расходы',
	]
	const salaryKeywords = [
		'зарплата',
		'оклад',
		'вознаграждение',
		'премия',
		'доплаты',
		'надбавки',
	]
	const withdrawalKeywords = [
		'вывод',
		'выводы',
		'вывод средств',
		'перевод',
		'снятие',
	]
	const writeOffKeywords = [
		'списание',
		'списания',
		'аннулирование',
		'уменьшение',
		'выбытие',
	]
	const rawMaterialKeywords = [
		'сырье',
		'техкарта',
		'материалы',
		'первичные материалы',
		'основные материалы',
	]
	const purchaseKeywords = [
		'закупка',
		'товары',
		'приобретение',
		'покупка',
		'закупочные расходы',
	]
	const returnKeywords = [
		'возврат',
		'возврат товара',
		'возврат средств',
		'возврат платежа',
	]
	const taxKeywords = [
		'налоги',
		'сборы',
		'налоговые платежи',
		'обязательные платежи',
		'фискальные сборы',
	]
	const consumablesKeywords = [
		'расходники',
		'расходные материалы',
		'потребляемые материалы',
		'канцелярские товары',
	]
	const equipmentKeywords = [
		'оборудование',
		'аппаратура',
		'инструменты',
		'техника',
		'механизмы',
	]
	const formsKeywords = ['формы', 'модели', 'шаблоны', 'документы', 'образцы']
	const improvementKeywords = [
		'благоустройство',
		'помещение',
		'ремонт',
		'обновление',
		'модернизация',
	]
	const optimizationKeywords = [
		'оптимизация',
		'улучшение',
		'повышение эффективности',
		'совершенствование',
		'рационализация',
	]

	if (expenseItem != null) {
		if (purchaseKeywords.some(keyword => expenseItem.includes(keyword))) {
			return purchase
		}
		if (taxKeywords.some(keyword => expenseItem.includes(keyword))) {
			return taxes
		}
		if (movingKeywords.some(keyword => expenseItem.includes(keyword))) {
			return moving
		}
		if (rentalKeywords.some(keyword => expenseItem.includes(keyword))) {
			return rent
		}
		if (salaryKeywords.some(keyword => expenseItem.includes(keyword))) {
			return salary
		}
		if (withdrawalKeywords.some(keyword => expenseItem.includes(keyword))) {
			return entertainment
		}
		if (
			rawMaterialKeywords.some(keyword => expenseItem.includes(keyword))
		) {
			return services
		}
		if (returnKeywords.some(keyword => expenseItem.includes(keyword))) {
			return refund
		}
		if (writeOffKeywords.some(keyword => expenseItem.includes(keyword))) {
			return writing
		}
		if (
			consumablesKeywords.some(keyword => expenseItem.includes(keyword))
		) {
			return consumables
		}
		if (equipmentKeywords.some(keyword => expenseItem.includes(keyword))) {
			return equipment
		}
		if (formsKeywords.some(keyword => expenseItem.includes(keyword))) {
			return forms
		}
		if (
			improvementKeywords.some(keyword => expenseItem.includes(keyword))
		) {
			return improvement
		}
		if (
			optimizationKeywords.some(keyword => expenseItem.includes(keyword))
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
