import React from "react";
import { BrowserRouter } from /* webpackChunkName: "ReactRouterDom", webpackPrefetch: true */ "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Routes from "./AppRoutes";
import { Keys } from "./config";
import { UTM, IpLocation } from "./types.d";
import i18n, { changeLanguage } from "./i18n";

function App() {
	React.useEffect(() => {
		if (!i18n.isInitialized) changeLanguage(navigator.language);
	}, []);

	// Init non-blocking requests
	React.useEffect(() => {
		const timeoutGetIpLocation = setTimeout(async () => {
			try {
				// 1. Save UTM params
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
				// 2. Save country code
				const { getIpLocation } = await import("./services/apiV1" /* webpackChunkName: "apiV1" */);
				const response = (await getIpLocation()) as IpLocation;
				if (response?.countryCode !== "") sessionStorage.setItem(Keys.cc, response.countryCode ?? "");
			} catch (err: unknown) {
				sessionStorage.setItem(Keys.cc, "");
			}
		}, 8000); // delay 8s, to avoid blocking the main thread
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
