'use strict';
require("dotenv").config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

module.exports = {
    name: process.env.APP_NAME || "EXPRESS SPY",
    debug: false,
    server: {
        host: process.env.APP_HOST || "localhost",
        port: process.env.APP_PORT || process.env.PORT || 3000,
        ssl: process.env.APP_SSL || false,
        options: {
            key: '',
            cert: '',
        }
    },
    useTableInformation: false,
    timeZone: process.env.TIME_ZONE || 'America/Los_Angeles'
};
