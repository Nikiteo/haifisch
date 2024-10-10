import axios from 'axios'

const TOP_TOKEN = process.env.TOP_TOKEN
const HF_TOKEN = process.env.HF_TOKEN
const URL = process.env.YANDEX_URL

export const apiServiceTop = axios.create({
	baseURL: URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Api-Key': TOP_TOKEN,
	},
})
export const apiServiceHf = axios.create({
	baseURL: URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Api-Key': HF_TOKEN,
	},
})
