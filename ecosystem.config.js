module.exports = {
	apps: [
		{
			name: 'Haifisch',
			script: 'build/src/index.js',
			env: {
				MOYSKLAD_TOKEN: 'a12459266a94bd3e90bbf509af60ffef36c3af17',
				MOY_SKLAD_URL: 'https://api.moysklad.ru/api/remap/1.2/',
				YANDEX_URL: 'https://api.partner.market.yandex.ru/',
				OZON_URL: 'https://api-seller.ozon.ru/',
				TOP_TOKEN:
					'ACMA:yWsnGSKskUHdrXfTxZTalcxMyT6udE46gVnRrNl9:ee8e50db',
				HF_TOKEN:
					'ACMA:w9c81EUz7m5YPYT4Od8da0UjdfbG6UTx7KEwDTcU:87f70bf7',
				OZON_TOKEN: '4ff0f445-b7a6-4525-b588-384214d821a8',
				OZON_CLIENT_ID: '150026',
				BOT_TOKEN: '6742105364:AAHXB-l_3JOFvBF269rF31bEuOXspUrRWU4',
				MEGAMARKET_TOKEN: 'DB78D941-E88B-4A72-8BCF-5814395967E7',
				MEGAMARKET_URL:
					'https://api.megamarket.tech/api/market/v1/orderService/order/',
				TINKOFF_URL: 'https://business.tbank.ru/openapi/',
				TINKOFF_HF_TOKEN:
					't.U6VThFXOG8qI-WqZ5cPjfrdh6vlMLawvFl7mWNXvuiLsgjzFryrE4Y19RmvNwm3Wstn_xAnegAd1a3WO65cb3Q',
				TINKOFF_TOP_TOKEN:
					't.6PGooVV3ljQoMtiYq2UH72fT_2BU5dRCEUjdcgiukj9MwfqIqeUFEEWu_xHPg1GwwDK5xeNA3Uyh0ivewt7RDA',
				TINKOFF_OZON_TOKEN:
					't.p8WtcwUtAXt2a7wmO-7NlhYXMryaS46ox3nTwsJ26JtBNxzbUPO853cnlVbmHJjrkuR_4ZHWEK9rEvwiiS71MQ',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
}
