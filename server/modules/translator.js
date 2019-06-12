const moment = require('moment');
const messagePacks = requireDir('resources/languages/messages/');
const datePacks = requireDir('resources/languages/dates/');
const { varToText, replaceVars } = requireWrp('modules/common');

const defLocale = process.env.DEFAULT_LOCALE;
const defMessagePack = messagePacks[defLocale];
const defDatePack = datePacks[defLocale];

function Translator(locale) {
	// set locale
	this.locale = messagePacks[locale] ? locale : defLocale;

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
