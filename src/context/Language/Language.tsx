import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { i18n } from "i18next";
import i18nLocal from "../../i18n";

export interface Language {
	id: string;
	path: string;
	value: string;
	label: string;
	native: string;
	country: string;
	shortCode: string;
}

export interface LanguageContextType {
	i18n: i18n;
	language: Language;
	changeLanguage: (lang: Language) => void;
}

export interface LanguageProviderProps {
	children: ReactNode;
}

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

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
};

export default function LanguageProvider({ children }: LanguageProviderProps) {
	const [language, setLanguage] = useState(languages[0]);

	useEffect(() => {
		const lang = localStorage.getItem("lang");
		if (lang) {
			setLanguage((JSON.parse(lang) as Language) || languages[0]);
		}
	}, []);

	const changeLanguage = (lang: Language) => {
		setLanguage(lang);
		i18nLocal.changeLanguage(lang.value);
		localStorage.setItem("lang", JSON.stringify(lang));
	};

	const value = useMemo(
		() => ({
			language,
			i18n: i18nLocal,
			changeLanguage
		}),
		[language]
	);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
