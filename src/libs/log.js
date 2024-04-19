const config = require("./../configs/log")
const path = require('path')
const pathStorage = "./../storage/sys"
const winston = require('winston');

const options = {
	all: {
		level: "info",
		filename: path.join(__dirname, pathStorage, 'logs', 'all.log'),
		handleExceptions: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.json()
		),
	},
	error: {
		level: "error",
		filename: path.join(__dirname, pathStorage, 'logs', 'error.log'),
		handleExceptions: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.json()
		),
	},
	job: {
		level: "warn",
		filename: path.join(__dirname, pathStorage, 'logs', 'job.log'),
		handleExceptions: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.json()
		),
	},
	console: {
		level: "debug",
		handleExceptions: true,
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		),
	},
};

const addTransportsLevel = (level, extend = null) => {
	const transports = [
		new winston.transports.Console(options.console)
	];
	if (config.logFile?.access) {
		transports.push(
			new winston.transports.File(options.all)
		)
		switch (level) {
			case 'error':
				transports.push(
					new winston.transports.File(options.error)
				)
				return transports
			case 'job': 
				transports.push(
					new winston.transports.File({
						...options.error, 
						filename: path.join(__dirname, pathStorage, 'logs', `job_${extend}.log`)
					})
				)
		}
	}

	return transports
}

const Logger = {
	info: (content = { level, message, metadata }) => {
		content = {...content, level: 'info'}
		return winston.createLogger({
			level: 'info',
			format: winston.format.json(),
			defaultMeta: { service: process.env.APP_NAME },
			transports: addTransportsLevel("info"),
			exitOnError: false, // do not exit on handled exceptions
		}).log(content)
	},
	error: (content = { level, message, metadata }) => {
		content = { ...content, level: 'error' }
		return winston.createLogger({
			level: 'error',
			format: winston.format.json(),
			defaultMeta: { service: process.env.APP_NAME },
			transports: addTransportsLevel("error"),
			exitOnError: false, // do not exit on handled exceptions
		}).log(content)
	},
	job: (jobName, content = { level, message, metadata }) => {
		content = { ...content, level: 'warn' }
		return winston.createLogger({
			level: 'warn',
			format: winston.format.json(),
			defaultMeta: { service: process.env.APP_NAME },
			transports: addTransportsLevel("job", jobName),
			exitOnError: false, // do not exit on handled exceptions
		}).log(content)
	},
	stream: {
		write: (content,) => {
			Logger.info({ message: content })
		}
	}
}

module.exports = Logger;