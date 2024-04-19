require("dotenv").config();
const app = require("./app.js");
const log = require("./log.js");
const socket = require("./socket.js");

module.exports = {
    app,
    log,
    socket
};
