import axios from 'axios'

const URL = process.env.MEGAMARKET_URL

export const apiService = axios.create({
	baseURL: URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})
