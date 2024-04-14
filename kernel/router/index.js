const router = require('express').Router()

router.use('/',
	require("../index").middleware.web,
	require("../../routes/web"))
router.use('/api',
	require("../index").middleware.api,
	require("../../routes/apis"))

module.exports = router
