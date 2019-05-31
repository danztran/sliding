const packs = requireDir('resources/languages/messages/');
const { varToText, replaceVars } = requireWrp('modules/common');

const defLocale = process.env.DEFAULT_LOCALE;
const defPack = packs[defLocale];

function Translator(locale) {
	// set locale
	this.locale = locale || defLocale;

	// language pack
	this.pack = packs[this.locale] || defPack;

	// translate
	this.$t = (key, args) => {
		let text = this.pack[key] || defPack[key] || varToText(key);
		if (args) {
			text = replaceVars(text, args, { s: '{', e: '}' });
		}
		return text;
	};
}

module.exports = Translator;
