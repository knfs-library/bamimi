"use strict";
const express = require("express");
const app = express();
const configs = require("./../configs")
const responseTime = require("response-time");
const errorhandler = require('errorhandler');
const path = require("path")
const jobOnMain = require("./../kernel/cronjobs/onMain");
const logger = require("./../libs/log")
const morgan = require("morgan")
/** 
 * **********************************
 * Set log
 * **********************************
 */
app.use(morgan('combined', { stream: logger.stream }))
/***
 * **********************************
 * Set static file
 * **********************************
 */
app.use('/public', express.static(path.join(__dirname, './../public')))

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
 * ***********************************
 * Setup static file
  ***********************************
 */
app.use('/public', express.static(path.join(__dirname, './../public')))

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

/**
 * **********************************
 * Job run on main process
 */
jobOnMain();

app.listen(configs.app.server.port, function () {
	console.log("listening on port " + configs.app.server.port)
})

