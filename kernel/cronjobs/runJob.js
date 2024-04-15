"use strict";
const cron = require('cron');
const path = require("path");
const BASE_PATH = './../../app/jobs';

module.exports = async (jobPath) => {
	const job = require(path.join(__dirname, BASE_PATH, jobPath))
	if (job.setCronJob) {
		cron.CronJob.from({
			cronTime: job.cronTime,
			onTick: async () => {
				console.log(`Cron job ${job.name} running...`);
				await job.handle()
			},
			onComplete: () => {
				console.log(`Cron job ${job.name} completed`);
			},
			start: true,
			timeZone: 'Asia/Ho_Chi_Minh'
		}).start()
	}
}