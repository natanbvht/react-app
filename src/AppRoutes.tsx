import Box from "@mui/material/Box";
import React from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation } from "react-router-dom";
import Element404 from "./app/404/page";
import Page404 from "./app/404/routes";
import PageDownload from "./app/download/routes";
import PageRecommendations from "./app/recommendations/routes";
import Subscribe from "./app/subscribe/page";
import PageSubscribe from "./app/subscribe/routes";
import PageUpgrade from "./app/upgrade/routes";
import PageLoader from "./components/PageLoader/PageLoader";
import { HashLinks } from "./config";
import CSP from "./containers/CSP";
import Footer from "./containers/Footer/Footer";
import Toolbar from "./containers/Toolbar/Toolbar";
import { changeLanguage, getCurrentLanguage, languages } from "./i18n";
import { trackPageView } from "./services/analytics";
import { Page } from "./types";

const RequestInfo = React.lazy(() => import(/* webpackChunkName: 'p-ri' */ "./app/@partials/request-info"));
const LegalPolicies = React.lazy(() => import(/* webpackChunkName: 'p-lp' */ "./app/@partials/legal-policies"));

export const pages: Page[] = [
	{ path: "/", element: Subscribe },
	{ path: "*", element: Element404 },
	...Page404,
	...PageUpgrade,
	...PageDownload,
	...PageSubscribe,
	...PageRecommendations
];

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

	React.useEffect(() => {
		trackPageView(`${location.pathname}${location.search}${location.hash}`, document.title);
	}, [location]);

	return (
		<>
			<CSP />
			<Helmet>
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
			{/* Toolbar Height is 64px */}
			<Toolbar />
			<React.Suspense fallback={<PageLoader />}>
				<Box
					pt={8} /* 8x8 -> 64px toolbar height + 16px top and buttom */
					className="RoutesContentWrapper"
				>
					<Routes>
						{pages.map(({ element: Element, provider: Provider, path, footer }, pageIndex) => {
							const showFooter = footer !== false;
							if (path !== "*") {
								return languages.map(({ path: langPath }, langIndex) => (
									<Route
										key={`${pageIndex}-${langIndex}`}
										path={`${langPath}${path}`}
										element={
											Provider ? (
												<Provider>
													<Element />
													{showFooter && <Footer />}
												</Provider>
											) : (
												<>
													<Element />
													{showFooter && <Footer />}
												</>
											)
										}
									/>
								));
							}
							return (
								<Route
									path="*"
									key={pageIndex}
									element={
										<React.Suspense fallback={<div>Loading...</div>}>
											<Element />
											{showFooter && <Footer />}
										</React.Suspense>
									}
								/>
							);
						})}
					</Routes>
				</Box>
			</React.Suspense>
			{/* Hash Routes Popup */}
			{/* Todo: find a better way to dynamically render hash based components
				without using react router dom, doesn't need to be a spefic component
			*/}
			<React.Suspense fallback={<PageLoader />}>
				{location.hash === HashLinks.reqInfo && <RequestInfo />}
				{location.hash === HashLinks.termsOfService && (
					<LegalPolicies
						open
						fullScreen
						title="termsOfService"
						src={`/md/${language?.value}/${HashLinks.termsOfService.replace("#", "")}.md`}
					/>
				)}
				{location.hash === HashLinks.privacyPolicy && (
					<LegalPolicies
						open
						fullScreen
						title="privacyPolicy"
						src={`/md/${language?.value}/${HashLinks.privacyPolicy.replace("#", "")}.md`}
					/>
				)}
				{location.hash === HashLinks.cookiePolicy && (
					<LegalPolicies
						open
						title="cookiePolicy"
						src={`/md/${language?.value}/${HashLinks.cookiePolicy.replace("#", "")}.md`}
					/>
				)}
			</React.Suspense>
		</>
	);
}

export default AppRoutes;
