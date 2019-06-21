const moment = require('moment');
const messagePacks = requireDir('resources/languages/messages/');
const datePacks = requireDir('resources/languages/dates/');
const { varToText, replaceVars } = requireWrp('modules/common');
const { defaultLocale: defLocale } = requireWrp('config');

const defMessagePack = messagePacks[defLocale];
const defDatePack = datePacks[defLocale];

function getLocale(param) {
	if (!param) return defLocale;
	let locale = null;
	if (Array.isArray(param)) {
		for (const key of param) {
			if (messagePacks[key]) {
				locale = key;
				break;
			}
		}
	}
	else {
		locale = messagePacks[param] ? param : defLocale;
	}
	return locale || defLocale;
}

function Translator(param) {
	// set locale
	this.locale = getLocale(param);

	// language pack
	this.messagePack = messagePacks[this.locale] || defMessagePack;

	// translate
	this.$t = (key, args) => {
		let text = this.messagePack[key] || defMessagePack[key] || varToText(key);
		if (args) {
			text = replaceVars(text, args, { s: '{', e: '}' });
		}
		return text;
	};

	this.datePack = datePacks[this.locale] || defDatePack;

	// formatting
	this.$d = (date = new Date(), option = 'short') => moment(date).format(this.datePack.date[option]);
}

module.exports = Translator;
