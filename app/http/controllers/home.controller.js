"use strict";

module.exports = {
	index: async function (req, res, next) {
		return await res.render('home')
	}
}