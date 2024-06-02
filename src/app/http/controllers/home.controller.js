"use strict";
module.exports = {
	index: async function (req, res, next) {
		return await res.view('pages/home')
	}
}