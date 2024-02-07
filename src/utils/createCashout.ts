import {
	agent,
	anyaOwner,
	currency,
	entertainment,
	fboOzonProject,
	fbosOzonProject,
	fbsHfProject,
	fbsTopProject,
	fbyHfProject,
	fbyTopProject,
	mishaOwner,
	moving,
	organization,
	owner,
	ozonAgent,
	ozonSalesChannel,
	purchase,
	refund,
	rent,
	salary,
	salesChannels,
	taxes,
} from '../database'
import {
	type Owner,
	type Cashout,
	type Project,
	type Meta,
} from '../types/msTypes'

interface CreateCashoutObjectProps {
	username?: string
	project?: string
	sum?: string
	description?: string
	expenseItem?: string
}

const getOwner = (username?: string): Owner => {
	switch (username) {
		case 'Nikiteo':
			return owner
		case 'puleekdun':
			return anyaOwner
		case 'Mi4ku':
			return mishaOwner
		default:
			return owner
	}
}

const getProject = (project?: string): Project => {
	switch (project) {
		case 'fbsOzon':
			return fbosOzonProject
		case 'fbsTop':
			return fbsTopProject
		case 'fbsHf':
			return fbsHfProject
		case 'fbyOzon':
			return fboOzonProject
		case 'fbyTop':
			return fbyTopProject
		case 'fbyHf':
			return fbyHfProject
		default:
			return fbosOzonProject
	}
}

const getExpenseItem = (expenseItem?: string): Record<string, Meta> => {
	switch (expenseItem) {
		case 'moving':
			return moving
		case 'rent':
			return rent
		case 'salary':
			return salary
		case 'entertainment':
			return entertainment
		case 'purchase':
			return purchase
		case 'taxes':
			return taxes
		default:
			return refund
	}
}

export const createCashoutObject = ({
	username,
	project = 'fbsOzon',
	sum = '0',
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
		project: getProject(project),
		agent: project.includes('Ozon') ? ozonAgent : agent,
		organization,
		salesChannel: project.includes('Ozon')
			? ozonSalesChannel
			: salesChannels,
		sum: parseFloat((+sum * 100).toFixed(2)),
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
