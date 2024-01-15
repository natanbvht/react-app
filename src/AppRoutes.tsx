/* eslint-disable no-console */
import React, { useEffect, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Page } from "./types";
import Footer from "./containers/Footer/Footer";
import Toolbar from "./containers/Toolbar/Toolbar";
import { useLanguage, languages } from "./context/Language/Language";
import CSP from "./containers/CSP";
import Subscribe from /* webpackPreload: true */ "./app/subscribe/page";
import Element404 from "./app/404/page";

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
	const navigate = useNavigate();
	const { language, changeLanguage } = useLanguage();

	// 1 - Listen to language change and update the browser url
	useEffect(() => {
		const currentPath = location.pathname;
		const searchParams = location.search;
		const hashFragment = location.hash;
		const pathSegments = currentPath.split("/").filter((p) => p);
		const browserLanguageCode = languages.some((lang) => lang.path === `/${pathSegments[0]}`);

		// Case 1: Language changed detected in the language, update the browser url
		if (!browserLanguageCode && language.path && language.path !== pathSegments[0]) {
			const newPath = `${language.path}/${pathSegments.join("/")}${searchParams}${hashFragment}`;
			const currentPath = `${location.pathname}${searchParams}${hashFragment}`;
			if (currentPath !== newPath) {
				navigate(newPath);
				return;
			}
		}
		// Case 2: Language changed detected in the browser, update the browser url
		if (browserLanguageCode && language.path && language.path !== pathSegments[0]) {
			const newPath = `${language.path}/${pathSegments.slice(1).join("/") || ""}${searchParams}${hashFragment}`;
			const currentPath = `${location.pathname}${searchParams}${hashFragment}`;
			if (currentPath !== newPath) {
				navigate(newPath);
				return;
			}
		}
		// Case 3: Remove the language code from the url if default language is selected
		if (browserLanguageCode && !language.path) {
			const newPath = `${pathSegments.slice(1).join("/")}${searchParams}/${hashFragment}`;
			const currentPath = `${location.pathname}${searchParams}${hashFragment}`;
			if (currentPath !== newPath) {
				if (newPath.includes("#") && !newPath.includes("/#")) {
					const [path, hash] = newPath.split("#");
					navigate(path, { replace: true });
					navigate(`/#${hash}`);
				} else {
					navigate(newPath, { replace: true });
				}
			}
		}
	}, [language]);

	// 2 - Listen to browser url change and update the language (Reverse)
	useEffect(() => {
		const pathSegments = location.pathname.split("/").filter((p) => p);
		if (pathSegments.length > 0) {
			const languagePrefix = pathSegments[0];
			const matchingLanguage = languages.find((lang) => lang.path === `/${languagePrefix}`);
			if (matchingLanguage && language !== matchingLanguage) {
				changeLanguage(matchingLanguage);
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
			<Suspense fallback={<div>Loading...</div>}>
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
			</Suspense>
			<Footer />
		</>
	);
}

export default AppRoutes;
