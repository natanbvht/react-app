/* eslint-disable no-console */
import React from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation } from "react-router-dom";
import { Page } from "./types";
import Footer from "./containers/Footer/Footer";
import Toolbar from "./containers/Toolbar/Toolbar";
import CSP from "./containers/CSP";
import Subscribe from /* webpackPreload: true */ "./app/subscribe/page";
import Element404 from "./app/404/page";
import { languages, changeLanguage, getCurrentLanguage } from "./i18n";
import Page404 from "./app/404/routes";
import PageRecommendations from "./app/recommendations/routes";
import PageSubscribe from "./app/subscribe/routes";
import PageUpgrade from "./app/upgrade/routes";

export const pages: Page[] = [
	{ path: "/", component: Subscribe },
	...Page404,
	...PageSubscribe,
	...PageRecommendations,
	...PageUpgrade
];

// check if already has a language code in the url then replace it and add the default language code
// also exclude the current one from the list
function buildRefAlternateUrl(pathname: string, language: { path: string; value: string }) {
	const pathSegments = pathname.split("/").filter((p) => p);
	const browserLanguageCode = languages.some((lang) => lang.path === `/${pathSegments[0]}`);
	if (browserLanguageCode) {
		return `${window.location.origin}${language.path}/${pathSegments.slice(1).join("/")}`;
	}
	return `${window.location.origin}${language.path}${pathname}`;
}

function AppRoutes() {
	const location = useLocation();
	const language = getCurrentLanguage();

	// Listen to browser url change and update the language
	React.useEffect(() => {
		const language = getCurrentLanguage();
		const pathSegments = location.pathname.split("/").filter((p) => p);
		if (pathSegments.length > 0) {
			const languagePrefix = pathSegments[0];
			const matchingLanguage = languages.find((lang) => lang.path === `/${languagePrefix}`);
			if (matchingLanguage && language !== matchingLanguage) {
				changeLanguage(matchingLanguage.value);
			}
		}
	}, [location.pathname]);

	const currentRoute = pages.find((page) => `${language.path}${page.path}` === location.pathname);

	return (
		<>
			<CSP />
			<Helmet>
				<title>{currentRoute?.title}</title>
				<html lang={language.shortCode.toLocaleLowerCase()} />
				{languages?.map((l) => (
					<link
						key={l.shortCode}
						rel="alternate"
						hrefLang={l.shortCode.toLocaleLowerCase()}
						href={buildRefAlternateUrl(location.pathname, l)}
					/>
				))}
			</Helmet>
			<Toolbar />
			<React.Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route
						path="/"
						element={<Subscribe />}
					/>
					{pages.map((page, pageIndex) =>
						languages.map(({ path: langPath }, langIndex) => (
							<Route
								key={`${pageIndex}-${langIndex}`}
								path={`${langPath}${page.path}`}
								element={
									page.provider ? (
										<page.provider>
											<page.component />
										</page.provider>
									) : (
										<page.component />
									)
								}
							/>
						))
					)}
					<Route
						path="*"
						element={<Element404 />}
					/>
				</Routes>
			</React.Suspense>
			<Footer />
		</>
	);
}

export default AppRoutes;
