export const checkUser = (username?: string): boolean => {
	switch (username) {
		case 'Nikiteo':
		case 'puleekdun':
		case 'Mi4ku':
		case 'tatitoto_tt':
			return true
		default:
			return false
	}
}
