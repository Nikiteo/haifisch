import path from 'path'
import { writeFile } from 'fs'
import { generateApi } from 'swagger-typescript-api'

const prefix = '/** THIS FILE WAS GENERATED */\n'
const eslintDisable = `
/* eslint-disable @typescript-eslint/array-type, @typescript-eslint/ban-types, max-lines, @typescript-eslint/no-namespace, @typescript-eslint/indent, @typescript-eslint/no-invalid-void-type */\n\n`
const NAME = 'ozon-types.ts'
const PATH = './scripts/openapi.yaml'
const OUTPUT = 'src/types/ozon'

generateApi({
	name: NAME,
	url: PATH,
	output: path.resolve(process.cwd(), OUTPUT),
	input: path.resolve(process.cwd(), PATH),
	generateClient: false,
	extractRequestBody: false,
	extractResponseBody: false,
	extractEnums: true,
	prettier: {
		printWidth: 120,
		tabWidth: 4,
		singleQuote: true,
		semi: false,
		trailingComma: 'none',
		parser: 'typescript',
	},
})
	.then(({ files }) => {
		files.forEach(({ fileContent }) => {
			const fullContent =
				prefix + eslintDisable + fileContent.replace(/any/g, 'unknown')
			writeFile(
				path.resolve(process.cwd(), OUTPUT, NAME),
				fullContent,
				'utf-8',
				err => {
					if (err) {
						console.error(err)
					}
				}
			)
		})
	})
	.catch(e => {
		console.error(e)
	})
