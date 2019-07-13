const Validatorjs = require('validatorjs');
const { defaultLocale: defLocale } = requireWrp('config');
const fieldPacks = requireDir('resources/languages/fields/');
const validatePacks = requireDir('resources/languages/validates/');

for (const locale of Object.keys(validatePacks)) {
	let messages = Validatorjs.getMessages(locale);
	messages = { ...messages, ...validatePacks[locale] };
	Validatorjs.setMessages(locale, messages);
}

function Validator(locale = defLocale, req = {}, res = {}) {
	Validatorjs.useLang(locale);
	this._locale = locale;
	this._req = req;
	this._res = res;
	this._data = req.body || req.query || req.params || {};
	this.$v = {
		// validate and response if fails
		rif: (_rules, _data) => {
			const rules = _rules;
			const data = _data || this._data;
			const validation = new Validatorjs(data, rules);
			validation.setAttributeNames(fieldPacks[locale] || fieldPacks[defLocale]);
			validation.fails(() => {
				if (this._res) {
					this._res.status(422).send({
						messages: { ...validation.errors.errors },
					});
				}
			});
			return validation.passes();
		},
		valid: (_rules, _data) => {
			const rules = _rules;
			const data = _data || this._data;
			const validation = new Validatorjs(data, rules);
			return validation.passes();
		},
	};
}

module.exports = Validator;
