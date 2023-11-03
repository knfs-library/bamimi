"use strict";
const Loader = require("@pho-cms/loader")
const partials = require("express-partials")

module.exports = function handle(app) {
	app.set('view engine', 'ejs');
	app.set('views', Loader.namespace('interfaces/web'))
	app.use(partials())
}
