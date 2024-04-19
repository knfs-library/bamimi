
module.exports = async function (req, res, next) {
	res.status(404);
	if (req.accepts('html')) {
		return await res.render('errors', { status: res.statusCode, message: "Not found" });
	}

	if (req.accepts('json')) {
		return await res.sendMessage();
	}
	next();
}