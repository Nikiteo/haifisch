import { AccountInfo3 } from '../../types/tbank/tbank'
import { getRequest } from './service'

export const getBankAccounts = async (
	token?: 'Haifisch' | 'Ozon' | 'Top'
): Promise<AccountInfo3[] | undefined> => {
	const response = await getRequest<AccountInfo3[]>(
		'api/v4/bank-accounts',
		undefined,
		token
	)
	return response
}
