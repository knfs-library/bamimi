module.exports = [
	{
		path: '/abc',
		func: function ({ io, socket }) { 
			socket.on('chat message', (msg) => {
				io.emit('chat message', msg);
			});
		}
	}
];