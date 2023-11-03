"use strict";
const router = require("express").Router();
const Loader = require("@pho-cms/loader");

const HomeController = Loader.use("app/http/controllers", "home.controller") // eslint-disable-line

router.get("/", HomeController.index);

module.exports = router