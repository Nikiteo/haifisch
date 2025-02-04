export const checkUser = (username?: string): boolean => {
	switch (username) {
		case 'Nikiteo':
		case 'chekannaa':
		case 'Haifisch_store':
		case 'tatitoto_tt':
			return true
		default:
			return false
	}
}
