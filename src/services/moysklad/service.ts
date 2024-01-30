import axios from 'axios'
const TOKEN = process.env.MOYSKLAD_TOKEN

export const apiService = axios.create({
	baseURL: process.env.MOY_SKLAD_URL,
	headers: {
		'Accept-Encoding': 'gzip',
		Authorization: `Bearer ${TOKEN}`,
		'Content-Type': 'application/json',
	},
})
