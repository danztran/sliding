module.exports = (err, req, res, next) => {
	console.error(err);
	if (res.statusCode === 200) {
		res.status(500);
	}
	if (res.statusCode === 500) {
		res.messages = { server: res.$t('somethingWrong') };
	}
	return res.sendwm();
};
