require("dotenv").config();

module.exports = {
	logFile: process.env.LOG_FILE || false,
	channels: {
		roll_bar: {
			accessToken: process.env.ASSESS_TOKEN
		}
	}
};