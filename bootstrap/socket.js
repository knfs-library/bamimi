"use strict";
const express = require("express");
const { createServer } = require('node:http');
const config = require("./../configs/socket");
const app = express();
const server = createServer(app);
require("./../kernel/socket/handle")(server, config)

server.listen(config.server.port, () => {
	console.log(`server running at http://localhost:${config.server.port}`);
})

