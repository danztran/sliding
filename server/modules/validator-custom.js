const Validatorjs = require('validatorjs');
const { varToText } = requireWrp('modules/common');
const packs = requireDir('resources/languages/fields/');

const defLocale = process.env.DEFAULT_LOCALE;

// set fall back field name
Validatorjs.setAttributeFormatter(field => varToText(field));

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
			validation.setAttributeNames(packs[locale] || packs[defLocale]);
			validation.fails(() => {
				if (this._res) {
					this._res.status(422).send({
						messages: { ...validation.errors.errors }
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
		}
	};
}

module.exports = Validator;
