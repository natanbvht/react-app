import i18n from /* webpackChunkName: "I18next", webpackPrefetch: true */ "i18next";
import HttpBackend from /* webpackChunkName: "I18nextHttp", webpackPrefetch: true */ "i18next-http-backend";
import { initReactI18next /* webpackChunkName: "I18ReactNext", webpackPrefetch: true */ } from "react-i18next";
import LanguageDetector from /* webpackChunkName: "I18nextBrowser", webpackPrefetch: true */ "i18next-browser-languagedetector";

export enum LocaleEnum {
	EN = "en-US",
	FR = "fr-FR",
	ES = "es-MX",
	BR = "pt-BR",
	DE = "de-DE",
	IT = "it-IT",
	SV = "sv-SE",
	NL = "nl-NL"
}

i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: false,
		ns: ["common"],
		defaultNS: "common",
		nonExplicitSupportedLngs: false,
		supportedLngs: [
			LocaleEnum.EN,
			LocaleEnum.FR,
			LocaleEnum.ES,
			LocaleEnum.BR,
			LocaleEnum.DE,
			LocaleEnum.IT,
			LocaleEnum.SV,
			LocaleEnum.NL
		],
		fallbackLng: LocaleEnum.EN,
		detection: {
			lookupLocalStorage: "i18nextLng",
			caches: ["localStorage", "cookie"],
			order: ["path", "querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag", "subdomain"]
		},
		backend: {
			loadPath: "/locales/{{lng}}/{{ns}}.json"
		},
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
