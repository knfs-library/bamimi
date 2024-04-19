"use strict";
const jobConfig = require("../../configs/cronJob")
const runJob = require('./runJob');

module.exports = async () => {
	for (const job of jobConfig) {
		if (job.onMain) {
			await runJob(job.path)
		}
	}
}