"use strict";
const cron = require('cron');
const jobConfig = require("./../configs/cron_job")
const path = require("path");
const BASE_PATH = './../app/jobs';

async function runJob(jobPath) {
	const job = require(path.join(__dirname, BASE_PATH, jobPath))
	if (job.setCronJob) {
		cron.CronJob.from({
			cronTime: job.cronTime,
			onTick: async () => {
				console.log(`Cron job ${job.name} running...`);
			},
			onComplete: () => {
				console.log(`Cron job ${job.name} completed`);
			},
			start: true,
			timeZone: 'Asia/Ho_Chi_Minh'
		}).start()

		
	}
}

/**
 * Run cron job with condition
 * 
 * @param {string} jobName 
 */
module.exports = async (jobName) => {
	// if jobName = "*" run all jobs
	if (jobName === "*") {
		for (const job of jobConfig) {
			await runJob(job.path)
		}
	} else {
		// if jobname is special, run that jobname
		const job = jobConfig.find((ele) => ele.name === jobName)
		if (job) {
			await runJob(job.path)
		}
	}
}