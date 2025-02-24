import { fbsStore, fbyHfStore, fbyTopStore } from '../../database'
import { type Store } from '../../types/ms-types'

export const getStore = (domain: string, type: string): Store => {
	if (domain === 'Haifisch') {
		if (type === 'FBY') {
			return fbyHfStore
		}
		return fbsStore
	} else {
		if (type === 'FBY') {
			return fbyTopStore
		}
		return fbsStore
	}
}
