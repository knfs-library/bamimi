"use strict";
const express = require("express");
const app = express();
const configs = require("./../configs")
const responseTime = require("response-time");
const errorhandler = require('errorhandler')

/**
 * **********************************
 * Set up common middleware
 * **********************************
 */
const kernelMiddleware = require("./../kernel/index").middleware.common
app.use(kernelMiddleware)

/**
 * **********************************
 * Set up router
 * **********************************
 */
app.use(require("./../kernel/router"))

/**
 * **********************************
 * Set up template
 * **********************************
 */
require("./../kernel/interface/web")(app)
/**
 * **********************************
 * Set response time
 * ********************************
 */

app.use(responseTime())

/**
 * **********************************
 * Error handle
 * **********************************
 */

if (process.env.NODE_ENV === 'development') {
	// only use in development
	app.use(errorhandler())
}

app.listen(configs.app.server.port, function () {
	console.log("listening on port " + configs.app.server.port)
})

