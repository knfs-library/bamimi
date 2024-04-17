require("dotenv").config();

module.exports = {
	logRequest: process.env.LOG_REQUEST || false,
	logFile: {
		access: process.env.LOG_FILE || false,
	},
	channels: {
		roll_bar: {
			accessToken: process.env.ASSESS_TOKEN
		}
	}
};