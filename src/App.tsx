import React from "react";
import { BrowserRouter } from /* webpackChunkName: "ReactRouterDom", webpackPrefetch: true */ "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Routes from "./AppRoutes";
import i18n, { changeLanguage } from "./i18n";

function App() {
	React.useEffect(() => {
		if (!i18n.isInitialized) {
			changeLanguage(navigator.language);
		}
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
