const Translator = requireWrp('modules/translator');
const Validator = requireWrp('modules/validator-custom');

module.exports = (req, res, next) => {
	// set translate function
	const locale = req.headers['accept-language'];
	const translator = new Translator(locale);
	const validator = new Validator(locale, req, res);

	res.$t = translator.$t;
	res.$d = translator.$d;
	res.$v = validator.$v;

	// set message state
	res.messages = {};

	// function response with message
	res.sendwm = (result = {}) => {
		const body = { ...result };
		body.messages = res.messages;
		return res.send(body);
	};

	// pass middleware
	next();
};
