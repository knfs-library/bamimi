"use strict";
const express = require("express");
const app = express();
const Loader = require("@pho-cms/loader")
const configs = Loader.use("configs", "index");
const responseTime = require("response-time");
const errorhandler = require('errorhandler')

/**
 * **********************************
 * Set up common middleware
 * **********************************
 */
const kernelMiddleware = Loader.use("kernel", "index").middleware.common
app.use(kernelMiddleware)

/**
 * **********************************
 * Set up router
 * **********************************
 */
app.use(Loader.use("kernel/router", "index"))

/**
 * **********************************
 * Set up template
 * **********************************
 */
Loader.use("kernel/interface/web", "index")(app)

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

