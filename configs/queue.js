"use strict";
require("dotenv").config();

module.exports = {
	storage: {
		host: process.env.REDIS_CACHE_HOST || "127.0.0.1",
		port: process.env.REDIS_CACHE_PORT || 6379,
		auth: `${process.env.REDIS_CACHE_USER}:${process.env.REDIS_CACHE_PASSWORD}` || "xxx:xxx",// [username][:password]
		db: process.env.REDIS_CACHE_DB || "0",
	},
	attempt: 1,
	backoff: true,
	ttl: 1000,
	basePath: "./../",
	queues: {
		
	}
}