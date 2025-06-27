export const checkUser = (username?: string): boolean => {
	switch (username) {
		case 'Nikiteo':
		case 'chekannaa':
		case 'Haifisch_store':
		case 'tatitoto_tt':
		case 'turbovzor252':
			return true
		default:
			return false
	}
}
