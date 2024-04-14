"use strict";
const {content: ifaContent, message: ifaMsg} = require("./../../../interfaces/apis")

/**
 * 
 * @param {Number} status 
 * @param {Object} data 
 */
exports.handle = async (status, data = null) => {
	
	let message = { ...ifaMsg }

	const founder = ifaContent.find((msg) => msg.status == status)

	message.meta.content = founder.metaData
	message.meta.code = founder.status
	message[founder.typeMessage] = data

	return await message
}