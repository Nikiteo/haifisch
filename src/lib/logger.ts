import winston from 'winston'

const levels = {
	error: 0,
	info: 1,
}

const colors = {
	error: 'red',
	info: 'green',
}

winston.addColors(colors)

const format = winston.format.combine(
	winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
	winston.format.colorize({ all: true }),
	winston.format.printf(
		info => `${info.timestamp} ${info.level}: ${info.message}`
	)
)

const transports = [
	winston.add(new winston.transports.Console()),
	winston.add(
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error',
		})
	),
	winston.add(
		new winston.transports.File({
			filename: 'logs/all.log',
		})
	),
]

const Logger = winston.createLogger({
	level: 'info',
	levels,
	format,
	transports,
})

export default Logger
