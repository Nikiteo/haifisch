import axios from 'axios'

const TOKEN = process.env.OZON_TOKEN
const CLIENT_ID = process.env.OZON_CLIENT_ID
const URL = process.env.OZON_URL

export const apiService = axios.create({
	baseURL: URL,
	headers: {
		Accept: 'application/json',
		'Api-Key': TOKEN,
		'Client-Id': CLIENT_ID,
		'Content-Type': 'application/json',
	},
})
