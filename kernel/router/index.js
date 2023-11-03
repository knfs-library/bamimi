const router = require('express').Router()
const Loader = require("@pho-cms/loader")


router.use('/',
	require("../index").middleware.web,
	Loader.use("routes/web", "index"))
router.use('/api',
	require("../index").middleware.api,
	Loader.use("routes/apis", "index"))

module.exports = router
