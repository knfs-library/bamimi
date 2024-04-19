'use strict';
require("dotenv").config();

module.exports = {
	jwt: {
		secretKey: process.env.JWT_SECRET_KEY,
		algorithm: "HS256",
		
		/*
		|----------------------------------------------------------------
		|
		| Expire in 10 hours from now
		|
		|----------------------------------------------------------------
		 */
		expiresIn: 60 * 60 * 10 * 24,
		sessionRefreshToken: {
			secretKey: process.env.SECRET_REFRESH_TOKEN_KEY,
			secretSessionKey: process.env.SECRET_SESSION_REFRESH_TOKEN_KEY,
			// 10 seconds
			scope: 5,
			expiresIn: '3m'
		},
		prefixBlackList: 'BBL_'
	},
	cors: {
		whileList: [
		]
	}
}