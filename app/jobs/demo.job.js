/**
 * Build job task ...
 */
module.exports = {
    name: "demo-job",
    setCronJob: false,
    backoff: { delay: 60 * 1000, type: "fixed" },
    cronTime: "00 50 01 * * 0-6",
    ttl: 5 * 60 * 1000,
    attempts: 2,
    priority: "low",
    handle: async function (job, done) {
        console.log("Demo job running...");
        done();
    }
}