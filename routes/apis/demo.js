"use strict";
const router = require('express').Router();

var users = [
	{ id: 1, name: "User1", email: "user1@gmail.com", age: 31 },
	{ id: 2, name: "User2", email: "user2@gmail.com", age: 20 },
	{ id: 3, name: "User1", email: "user1.2@gmail.com", age: 25 }
];

router.get('/', function (req, res) {
	res.status(200).sendMessage({
		users: users
	});
})

router.get('/create', function (req, res) {
	res.status(403).sendMessage({users});
})


module.exports = router