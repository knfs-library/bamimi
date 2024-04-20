const socket = require("@knfs-tech/bamimi-socket.io")

const demo = (io, socket) => {
	console.log("____________abc_______________")

	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});
}

socket.on('/abc', function (socket, next) {
	console.log("__________________Middleware 1 socket_______________________-")
	next()
}, function (socket, next) {
	console.log("__________________Middleware 2 socket_______________________-")
	next()
}, function (socket, next) {
	console.log("__________________Middleware 3 socket_______________________-")
	next()
}, demo)