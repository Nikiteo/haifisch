import {
	fbyHfProject,
	fbsHfProject,
	fbyTopProject,
	fbsTopProject,
} from '../../database'
import { type Project } from '../../types/ms-types'

export const getProject = (domain: string, type: string): Project => {
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
