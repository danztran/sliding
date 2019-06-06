import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import cookies from './vue-cookies-custom';
const { VUE_APP_CK_LANG, VUE_APP_DEFAULT_LOCALE, NODE_ENV } = process.env;
const locale = cookies.get(VUE_APP_CK_LANG) || window.navigator.language || 'en';
const defLocale = VUE_APP_DEFAULT_LOCALE || 'en';

Vue.use(VueI18n);

export const i18n = new VueI18n({
	fallbackLocale: defLocale,
	silentTranslationWarn: NODE_ENV === 'production',
	missing: () => ''
});

const loadedLanguages = [];

function setI18nLanguage(lang) {
	i18n.locale = lang;
	axios.defaults.headers.common['Accept-Language'] = lang;
	document.querySelector('html').setAttribute('lang', lang);
	return lang;
}

export function loadLanguageAsync(lang) {
	if (i18n.locale !== lang) {
		cookies.set(VUE_APP_CK_LANG, lang);
		if (!loadedLanguages.includes(lang)) {
			return import(/* webpackChunkName: "lang" */ `@/languages/${lang}`).then((pack) => {
				i18n.setDateTimeFormat(lang, pack.dateTimeFormat);
				i18n.setLocaleMessage(lang, pack.messages);
				loadedLanguages.push(lang);
				return setI18nLanguage(lang);
			});
		}
		return Promise.resolve(setI18nLanguage(lang));
	}
	return Promise.resolve(lang);
}

loadLanguageAsync(locale);
