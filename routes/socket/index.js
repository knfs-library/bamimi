module.exports = [
	{
		path: '/abc',
		func: function ({ io, socket }) { 
			io.emit("connect to abc")
		}
	}
];