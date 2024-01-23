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

export interface Language {
	id: string;
	path: string;
	value: string;
	label: string;
	native: string;
	country: string;
	shortCode: string;
}

export const languages = [
	{
		id: LocaleEnum.EN,
		label: "English",
		value: LocaleEnum.EN,
		shortCode: "EN",
		country: "United States",
		path: "",
		native: "English"
	},
	{
		id: LocaleEnum.FR,
		label: "French",
		native: "Français",
		value: LocaleEnum.FR,
		shortCode: "FR",
		country: "France",
		path: "/fr"
	},
	{
		id: LocaleEnum.ES,
		label: "Spanish",
		native: "Español",
		value: LocaleEnum.ES,
		shortCode: "ES",
		country: "Mexico",
		path: "/es"
	},
	{
		id: LocaleEnum.BR,
		label: "Portuguese",
		native: "Português",
		value: LocaleEnum.BR,
		shortCode: "PT",
		country: "Brazil",
		path: "/pt"
	},
	{
		id: LocaleEnum.DE,
		label: "German",
		native: "Deutsch",
		value: LocaleEnum.DE,
		shortCode: "DE",
		country: "Germany",
		path: "/de"
	},
	{
		id: LocaleEnum.IT,
		label: "Italian",
		native: "Italiano",
		value: LocaleEnum.IT,
		shortCode: "IT",
		country: "Italy",
		path: "/it"
	},
	{
		id: LocaleEnum.SV,
		label: "Swedish",
		native: "Svenska",
		value: LocaleEnum.SV,
		shortCode: "SV",
		country: "Sweden",
		path: "/sv"
	},
	{
		id: LocaleEnum.NL,
		label: "Dutch",
		native: "Nederlands",
		value: LocaleEnum.NL,
		shortCode: "NL",
		country: "Netherlands",
		path: "/nl"
	}
] as Language[];

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

// eslint-disable-next-line import/no-mutable-exports
let previewsLanguage: Language | undefined;

export function getLanguage(language: string): Language | undefined {
	return languages.find((lang) => lang.value === language);
}

export function getLanguageByPath(path: string): Language | undefined {
	return languages.find((lang) => lang.path === path);
}

export function getLanguageByShortCode(shortCode: string): Language | undefined {
	return languages.find((lang) => lang.shortCode === shortCode);
}

export function getCurrentLanguage(): Language {
	const currentLanguage = languages.find((lang) => lang.id === i18n.language);
	const defaultLanguage = languages.find((lang) => lang.id === i18n.options.fallbackLng);
	return currentLanguage || defaultLanguage || languages[0];
}

export function getPreviewsLanguage(): Language | undefined {
	return previewsLanguage;
}

export function changeLanguage(language: string) {
	previewsLanguage = getLanguage(language);
	i18n.changeLanguage(language);
}

export { previewsLanguage };
export default i18n;
