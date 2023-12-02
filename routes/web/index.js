"use strict";
const router = require("express").Router();

const HomeController = require("./../../app/http/controllers/home.controller")

router.get("/", HomeController.index);

module.exports = router