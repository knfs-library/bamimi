const JOB_NAME = process.env.JOB_NAME ?? "*";
require('./bootstrap/cron.job')(JOB_NAME)