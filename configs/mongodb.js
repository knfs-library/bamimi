require("dotenv").config();

module.exports = {
	environment: process.env.NODE_ENV || "development",
	development: {
		username: process.env.DB_USER || "root",
		password: process.env.DB_PASSWORD || "xxx",
		database: process.env.DB_DATABASE || "xxx",
		host: process.env.DB_HOST || "127.0.0.1",
		port: process.env.DB_PORT || "27017",
	},
};
