import { BrowserRouter } from /* webpackChunkName: "ReactRouterDom", webpackPrefetch: true */ "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Routes from "./AppRoutes";
import LanguageProvider from "./context/Language/Language";

function App() {
	return (
		<BrowserRouter>
			<LanguageProvider>
				<ThemeProvider theme={theme}>
					<Routes />
				</ThemeProvider>
			</LanguageProvider>
		</BrowserRouter>
	);
}

export default App;
