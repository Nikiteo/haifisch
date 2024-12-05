export const checkUser = (username?: string): boolean => {
	switch (username) {
		case 'Nikiteo':
		case 'puleekdun':
		case 'Haifisch_store':
		case 'tatitoto_tt':
			return true
		default:
			return false
	}
}
