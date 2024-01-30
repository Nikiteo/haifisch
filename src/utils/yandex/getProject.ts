import {
	fbyHfProject,
	fbsHfProject,
	fbyTopProject,
	fbsTopProject,
} from '../../database'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getProject = (domain: string, type: string) => {
	if (domain === 'Haifisch') {
		if (type === 'FBY') {
			return fbyHfProject
		}
		return fbsHfProject
	} else {
		if (type === 'FBY') {
			return fbyTopProject
		}
		return fbsTopProject
	}
}
