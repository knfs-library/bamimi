"use strict";
require("@knfs-tech/bamimi-autoload")
const express = require("express");
const app = express();
const configs = require("./../configs")
const responseTime = require("response-time");
const errorhandler = require('errorhandler');
const path = require("path")
const { createServer } = require('node:http');
const socket = require("@knfs-tech/bamimi-socket.io")
const server = createServer(app);
socket.io(server, configs.socket)

const jobOnMain = require("./../kernel/cronjobs/onMain");
/** 
 * **********************************
 * Set log
 * **********************************
 */
require("./../kernel/logs")(app)
/***
 * **********************************
 * Set static file
 * **********************************
 */
app.use('/public', express.static(path.join(__dirname, './../public'), { maxAge: configs.app.staticCacheTime }))

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

server.listen(configs.app.server.port, function () {
	console.log("listening on port " + configs.app.server.port)
})


