const Translator = requireWrp('modules/translator');
const Validator = requireWrp('modules/validator-custom');

module.exports = (req, res, next) => {
	// set translate function
	const locale = `${req.headers['accept-language']}`;
	res.$t = new Translator(locale).$t;
	res.$v = new Validator(locale, req, res).$v;

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
