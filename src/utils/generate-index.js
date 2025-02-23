const fs = require('fs')
const path = require('path')

// Путь к текущей директории
const directoryPath = path.join(__dirname)

// Функция для генерации index.ts
function generateIndexFile() {
	const files = fs.readdirSync(directoryPath)
	const exports = []

	files.forEach(file => {
		// Проверяем, что файл имеет расширение .ts и не является index.ts
		if (file.endsWith('.ts') && file !== 'index.ts') {
			const fileNameWithoutExt = path.basename(file, '.ts')
			exports.push(`export * from './${fileNameWithoutExt}';`)
		}
	})

	// Записываем в index.ts
	fs.writeFileSync(
		path.join(directoryPath, 'index.ts'),
		exports.join('\n'),
		'utf8'
	)
	console.log('index.ts был успешно сгенерирован!')
}

// Запускаем функцию
generateIndexFile()
