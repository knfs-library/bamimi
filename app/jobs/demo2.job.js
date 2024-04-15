/**
 * Build job task ...
 */
module.exports = {
    name: "demo2",
    setCronJob: true,
    backoff: { delay: 60 * 1000, type: "fixed" },
    cronTime: "* * * * * *",
    ttl: 5 * 60 * 1000,
    attempts: 2,
    priority: "low",
    handle: async function () {
        console.log("Demo2 job running...");
    }
}