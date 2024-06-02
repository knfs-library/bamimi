"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors")
const authConfig = require("./../configs/auth")


exports.middleware = {
	common: [
		/**
		 * body parser
		 */
		bodyParser(),
		bodyParser.urlencoded({ extended: true }),
		cookieParser()
	],
	api: [
		require("../app/http/responses/api.response"),
		cors(authConfig.cors)
	],
	web: [
		/**
		 * method override
		 */
		require("../app/http/responses/web.response"),
		methodOverride('X-HTTP-Method'),
		methodOverride('X-HTTP-Method-Override'),
		methodOverride('X-Method-Override'),
		methodOverride(function (req, res) {
			if (req.body && typeof req.body === 'object' && '_method' in req.body) {
				var method = req.body._method
				delete req.body._method
				return method
			}
		}),
	]
}