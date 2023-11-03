"use strict";
const Loader = require("@pho-cms/loader")
const ifa = Loader.use("interfaces/apis", "index")

/**
 * 
 * @param {Number} status 
 * @param {Object} data 
 */
exports.handle = async (status, data = null) => {
	
	let message = { ...ifa.message }

	const founder = ifa.content.find((msg) => msg.status == status)

	message.meta.content = founder.metaData
	message.meta.code = founder.status
	message[founder.typeMessage] = data

	return await message
}