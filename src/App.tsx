import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter } from /* webpackChunkName: "ReactRouterDom", webpackPrefetch: true */ "react-router-dom";
import Routes from "./AppRoutes";
import { GA, Keys, Secrets } from "./config";
import i18n, { changeLanguage } from "./i18n";
import theme from "./theme";
import { IpLocation, UTM } from "./types.d";

function App() {
	// Init i18n and save UTM params
	React.useEffect(() => {
		if (!i18n.isInitialized) changeLanguage(navigator.language);
		const urlParams = new URLSearchParams(window.location.search);
		const utm = {
			source: urlParams.get("utm_source") || "",
			medium: urlParams.get("utm_medium") || "",
			campaign: urlParams.get("utm_campaign") || "",
			content: urlParams.get("utm_content") || "",
			term: urlParams.get("utm_term") || "",
			search: window.location.search
		} as UTM;
		if (Object.values(utm).some((value) => value !== "")) {
			sessionStorage.setItem(Keys.utm, JSON.stringify(utm));
		}
	}, []);

	// Init non-blocking requests
	React.useEffect(() => {
		const timeoutGetIpLocation = setTimeout(async () => {
			try {
				// 1. Save Country Code
				const { getIpLocation } = await import("./utils/apiV1" /* webpackChunkName: "apiV1" */);
				const response = (await getIpLocation()) as IpLocation;
				if (response?.countryCode !== "") sessionStorage.setItem(Keys.cc, JSON.stringify(response || {}));
				// 2. Google Tag Manager
				const gtagScript = document.createElement("script");
				gtagScript.async = true;
				gtagScript.defer = true;
				gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA.trackingId}`;
				document.head.appendChild(gtagScript);
				const gtagConfigScript = document.createElement("script");
				gtagConfigScript.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments);}; gtag("js", new Date()); gtag("config", "${GA.trackingId}", ${JSON.stringify({ debug_mode: GA.debug })}); gtag("config", "${GA.containerTag}"); gtag("config", "${GA.adsConversionTracking}");`;
				document.head.appendChild(gtagConfigScript);
				// 3. Posthog Web Analytics
				const posthogScript = document.createElement("script");
				posthogScript.async = true;
				posthogScript.defer = true;
				posthogScript.innerHTML = `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]); posthog.init("${Secrets.posthog}", {api_host: "https://app.posthog.com"});`;
				document.head.appendChild(posthogScript);
			} catch (err: unknown) {
				sessionStorage.setItem(Keys.cc, JSON.stringify({}));
			}
		}, 3000); // delay 3s, to avoid degrade LCP
		return () => clearTimeout(timeoutGetIpLocation);
	}, []);

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Routes />
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
