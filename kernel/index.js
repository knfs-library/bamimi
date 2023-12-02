"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");


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
		require("../app/http/interceptors/responses/api.response.interceptor")
	],
	web: [
		/**
		 * method override
		 */
		methodOverride('X-HTTP-Method'),
		methodOverride('X-HTTP-Method-Override'),
		methodOverride('X-Method-Override'),
		methodOverride(function (req, res) {
			if (req.body && typeof req.body === 'object' && '_method' in req.body) {
				var method = req.body._method
				delete req.body._method
				return method
			}
		})
	]
}