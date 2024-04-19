const mongoose = require('mongoose');
const config = require("./../../configs/mongodb")

mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}/${config.user}:${config.password}`)
	.then(() => console.log('Connected!'));
