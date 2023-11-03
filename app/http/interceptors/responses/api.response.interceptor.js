"use strict";
const Loader = require("@pho-cms/loader")
const { handle } = Loader.use("kernel/interface/apis", "index")
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
    res.sendMessage = async (data = null) => {
        const message = await handle(res.statusCode, data)
        return await res.json(message);
    };

    next()
}
