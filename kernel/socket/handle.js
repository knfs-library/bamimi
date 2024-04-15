const { Server } = require('socket.io');

/**
 * 
 * @param {import('express')()} app 
 * @param {Object} config 
 */
function handle(server, config) {
	const io = new Server(server, {
		path: '/socket.io',
		secure: true,
		cors: config.cors,
		transports: config.transports,
		allowEIO3: true
	})
	const channels = require("./../../routes/socket/index");
	for (const channel of channels) {
		io.of(channel.path).use(async (socket, next) => {
			if (channel.middleware) {
				for (middleware of channel.middleware) {
					await middleware(socket.request, {}, next)
				}
			}

			return next();
		})
			.on('connection', (socket) => {
				console.log("ip: " + socket.request.connection.remoteAddress);
				console.log("user-agent: " + socket.request.headers['user-agent']);
				console.log('user connected');
				
				channel.func({ io: io, socket: socket });
				
				socket.on('disconnect', () => {
					console.log("ip: " + socket.request.connection.remoteAddress);
					console.log("user-agent: " + socket.request.headers['user-agent']);
					console.log('user disconnected');
				});

			})
	}

	return io
}

module.exports = handle;