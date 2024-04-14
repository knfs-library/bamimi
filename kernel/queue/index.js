
const queueConf = require("./../../configs/queue")

const connection = {
	host: queueConf.storage.host,
	port: queueConf.storage.port,
	username: queueConf.storage.username ?? undefined,
	password: queueConf.storage.password ?? undefined
}


export default connection;