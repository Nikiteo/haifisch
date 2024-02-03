import {
	fbsHfStore,
	fbsTopStore,
	fbyHfStore,
	fbyTopStore,
} from '../../database'
import { type Store } from '../../types/msTypes'

export const getStore = (domain: string, type: string): Store => {
	if (domain === 'Haifisch') {
		if (type === 'FBY') {
			return fbyHfStore
		}
		return fbsHfStore
	} else {
		if (type === 'FBY') {
			return fbyTopStore
		}
		return fbsTopStore
	}
}
