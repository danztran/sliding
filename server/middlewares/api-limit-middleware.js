const rateLimit = require('express-rate-limit');

const routes = {
	signup: rateLimit({
		windowMs: minutes(15),
		max: 5,
		message: messages('Too many accounts created from this IP, please try again after some minutes'),
	}),
	quickSignup: rateLimit({
		windowMs: minutes(15),
		max: 5,
		message: messages('Too many accounts created from this IP, please try again after some minutes'),
	}),
	login: rateLimit({
		windowMs: minutes(10),
		max: 10,
		message: messages('Too many fails login, please try again after some minutes'),
	}),
	createEvent: rateLimit({
		windowMs: minutes(15),
		max: 15,
		message: messages('Too many events created, please try again after 15 minutes'),
	}),
	analyticEvent: rateLimit({
		windowMs: minutes(1),
		max: 10,
		message: messages('Too many analytic requests, please try again after some minutes'),
	}),
};

function minutes(minute) {
	return minute * 60 * 1000;
}

function messages(msg) {
	return {
		messages: msg,
	};
}

module.exports = routes;
