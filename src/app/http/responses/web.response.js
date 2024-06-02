"use strict";
/**
 *  ResponseMiddleware 
 * 
 * @link http://expressjs.com/en/guide/using-middleware.html
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {*} next
 */

module.exports = (req, res, next) => {

	/**
	 * 
	 * @param {*} data 
	 * @returns 
	 */
	res.view = async (view, data = {}) => {
		return await res.render('layouts/main', {
			body: `../${view}`,
			data
		});
	};

	next()
}
