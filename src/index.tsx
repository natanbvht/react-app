import React from /* webpackChunkName: "React", webpackPrefetch: true */ "react";
import ReactDOM from /* webpackChunkName: "ReactDom", webpackPrefetch: true */ "react-dom/client";
import App from "./App";
import "./i18n";
import reportWebVitals from "./utils/webVitals";
import /* webpackPrefetch: true */ "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
