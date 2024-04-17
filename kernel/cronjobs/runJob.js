"use strict";
const cron = require('cron');
const path = require("path");
const BASE_PATH = './../../app/jobs';
const logger = require("./../../libs/log")

module.exports = async (jobPath) => {
	const job = require(path.join(__dirname, BASE_PATH, jobPath))
	if (job.setCronJob) {
		cron.CronJob.from({
			cronTime: job.cronTime,
			onTick: async () => {
				logger.job(job.name, {message:`Cron job ${job.name} running...`})
				await job.handle()
			},
			onComplete: () => {
				logger.job(job.name, { message: `Cron job ${job.name} running...` })
			},
			start: true,
			timeZone: 'Asia/Ho_Chi_Minh'
		}).start()
	}
}