import React from "react";
import Button from "@mui/material/Button";
import { languages, Language } from "../../i18n";
import { pages } from "../../AppRoutes";
import { Page } from "../../types.d";

export interface UTM {
	source?: string;
	medium?: string;
	content?: string;
	campaign?: string;
}

export interface AppViewSEO {
	utm?: UTM;
	url?: string;
	image?: string;
	title?: string;
	robots?: string;
	canonical?: string;
	keywords?: string[];
	description?: string;
	titlePrefix?: string;
	titleDelimiter?: string;
}

export enum LoaderTypes {
	Global = "global",
	Page = "page"
}

export enum Scroll {
	Body = "body",
	Content = "content"
}

export interface AppViewConfig {
	scroll?: Scroll;
	header?: string;
	footer?: boolean;
	toolbar?: boolean;
	liveChat?: boolean;
	loader?: LoaderTypes;
	showHeader?: boolean;
	shortHeader?: string;
}

export interface SitemapEntry {
	path: string;
	seo?: AppViewSEO;
	language?: Language;
	isLangPath: boolean;
	config?: AppViewConfig;
}

function generateSitemap(): SitemapEntry[] {
	const sitemap: SitemapEntry[] = [];
	languages.forEach((lang: Language) => {
		pages.forEach((page: Page) => {
			const isLangPath = Boolean(lang.path);
			const path = `${lang.path}${page.path}`;
			const sitemapItem: SitemapEntry = { path, isLangPath };

			if (isLangPath) {
				sitemapItem.language = lang;
			}

			sitemap.push(sitemapItem);
		});
	});
	return sitemap;
}

function Download() {
	const urlParams = new URLSearchParams(window.location.search);

	const downloadJSONSitemap = () => {
		const jsonContent = JSON.stringify(generateSitemap(), null, 2);
		const blob = new Blob([jsonContent], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "sitemap.json";
		document.body.appendChild(a);
		a.click();
		URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};

	React.useEffect(() => {
		if (urlParams.get("file") === "sitemap.json") {
			downloadJSONSitemap();
		}
	}, []);

	return (
		<Button
			variant="text"
			onClick={downloadJSONSitemap}
		>
			Sitemap JSON
		</Button>
	);
}

export default Download;
