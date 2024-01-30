import {
	fbsHfStore,
	fbsTopStore,
	fbyHfStore,
	fbyTopStore,
} from '../../database'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStore = (domain: string, type: string) => {
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
