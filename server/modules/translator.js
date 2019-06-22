const moment = require('moment');
const messagePacks = requireDir('resources/languages/messages/');
const datePacks = requireDir('resources/languages/dates/');
const { varToText, replaceVars } = requireWrp('modules/common');
const { defaultLocale: defLocale } = requireWrp('config');

const defMessagePack = messagePacks[defLocale];
const defDatePack = datePacks[defLocale];

function Translator(param) {
	// set locale
	this.locale = getLocale(param);

	// translate
	this.$t = (key, args) => translate(key, args, this.locale);

	// formatting
	this.$d = (date, option) => toLocaleDate(date, option, this.locale);
}

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

function translate(key, args, locale = defLocale) {
	const messagePack = messagePacks[locale] || defMessagePack;
	let text = messagePack[key] || defMessagePack[key] || varToText(key);
	if (args) {
		text = replaceVars(text, args, { s: '{', e: '}' });
	}
	return text;
}

function toLocaleDate(date = new Date(), option = 'short', locale = defLocale) {
	const datePack = datePacks[locale] || defDatePack;
	return moment(date).format(datePack.date[option]);
}

module.exports = Translator;
