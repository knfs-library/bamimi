const mongoose = require('mongoose');
const Loader = require("@pho-cms/loader")
const config = Loader.use("configs", "mongodb")

mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}/${config.user}:${config.password}`)
	.then(() => console.log('Connected!'));
