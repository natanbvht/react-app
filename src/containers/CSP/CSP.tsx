import { Helmet } from "react-helmet";
import { getEnv, Environments } from "../../utils/config";

const METAINTRO_DOMAINS = [
	"https://metaintro.com",
	"https://metaintro.net",
	"https://www.metaintro.com",
	"https://www.metaintro.net",
	"https://dev.metaintro.net",
	"https://uat.metaintro.net",
	"https://auth.metaintro.net",
	"https://sparkloop.s3.amazonaws.com",
	"https://dash.sparkloop.app"
];

const cspConfig = {
	"worker-src": ["'self'"],
	"object-src": ["'none'"],
	"base-uri": ["'self'", ...METAINTRO_DOMAINS],
	"default-src": ["'self'", ...METAINTRO_DOMAINS],
	"script-src": [
		"'self'",
		"'unsafe-eval'",
		"'report-sample'",
		"'unsafe-inline'",
		...METAINTRO_DOMAINS,
		"https://*.google.com",
		"https://*.stripe.com",
		"https://*.facebook.net",
		"https://app.posthog.com",
		"https://js.intercomcdn.com",
		"https://widget.intercom.io",
		"https://platform.twitter.com",
		"https://appleid.cdn-apple.com",
		"https://www.googleadservices.com",
		"https://www.googletagmanager.com",
		"https://googleads.g.doubleclick.net"
	],
	"style-src": [
		"'self'",
		"'report-sample'",
		"'unsafe-inline'",
		...METAINTRO_DOMAINS,
		"https://use.fontawesome.com",
		"http://fonts.googleapis.com",
		"https://fonts.googleapis.com"
	],
	"connect-src": [
		"'self'",
		...METAINTRO_DOMAINS,
		"https://*.stripe.com",
		"https://*.google.com",
		"https://js.stripe.com",
		"https://*.facebook.net",
		"https://*.facebook.com",
		"https://app.posthog.com",
		"https://api.metronai.com",
		"https://*.doubleclick.net",
		"https://www.googleapis.com",
		"https://api-iam.intercom.io",
		"https://stats.g.doubleclick.net",
		"wss://nexus-websocket-a.intercom.io",
		"https://identitytoolkit.googleapis.com"
	],
	"font-src": [
		"'self'",
		"data:",
		...METAINTRO_DOMAINS,
		"https://www.gstatic.com",
		"https://*.googleapis.com",
		"https://fonts.intercomcdn.com"
	],
	"frame-src": [
		"'self'",
		...METAINTRO_DOMAINS,
		"https://*.google.com",
		"https://*.stripe.com",
		"https://td.doubleclick.net",
		"https://platform.twitter.com",
		"https://metaintro-94e0b.firebaseapp.com"
	],
	"img-src": [
		"'self'",
		"https://flagcdn.com",
		"https://*.stripe.com",
		"https://*.google.com",
		"https://*.facebook.com",
		"https://*.intercomcdn.com",
		"https://assets.metaintro.com",
		"https://*.intercomassets.com",
		"https://syndication.twitter.com",
		"https://www.googleadservices.com",
		"https://www.googletagmanager.com",
		"data:",
		...METAINTRO_DOMAINS,
		"https://*.facebook.com",
		"https://www.gstatic.com",
		"https://*.googleapis.com",
		"https://www.google-analytics.com"
	]
};

function CSP() {
	const env = getEnv();

	const generateCSP = () => {
		return Object.entries(cspConfig)
			.map(([directive, sources]) => `${directive} ${sources.join(" ")}`)
			.join("; ");
	};

	if (env !== Environments.LOCALHOST) {
		return (
			<Helmet>
				<meta
					httpEquiv="Content-Security-Policy"
					content={generateCSP()}
				/>
			</Helmet>
		);
	}

	return null;
}

export default CSP;
