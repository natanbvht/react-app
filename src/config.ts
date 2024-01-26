import { nanoid } from /* webpackChunkName: "nanoid" */ "nanoid";

export enum Environments {
	UAT = "uat",
	TEST = "test",
	LOCALHOST = "localhost",
	PRODUCTION = "production",
	DEVELOPMENT = "development"
}

export const MOCK_API_FLAG = false;
export const MOCK_API_DEBUG = false;
export const METAINTRO = "https://www.metaintro.com";
export const IS_LOCALHOST = window?.location?.hostname === (Environments.LOCALHOST as string);
export const IS_DEV = window?.location?.hostname?.includes("dev");
export const IS_UAT = window?.location?.hostname?.includes("uat");
export const IS_PROD = !IS_LOCALHOST && !IS_DEV && !IS_UAT;

// TODO: Set from ENV
export const Secrets = {
	posthog: "phc_MLRXdlQVQUOlK61toaRaEJMLBcBbed02ZThpwhyS6ek"
};
// TODO: Set from ENV
export const Security = {
	secret: "secret",
	sha256: "SHA-256",
	algorithm: "aes-256-cbc"
};

export const GA = {
	debug: true,
	trackingId: "G-VM6WPRTXRH",
	containerTag: "GTM-PVPXJMV4",
	adsConversionTracking: "AW-11394737567"
};

export const Client = {
	isChrome: navigator.userAgent.includes("Chrome"),
	isFirefox: navigator.userAgent.includes("Firefox"),
	isSafari: Boolean(!navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Safari"))
};

export const Stripe = {
	pricingTableId: "prctbl_1O59tnIP7J9Ye5hOCHs2DaAt",
	publishableKey:
		"pk_live_51KWlfMIP7J9Ye5hOKGmB9sHrwCDknXVaqByFpyXb8o7n3bhpXbhWe2MnMfifAqTeBOyTwOBu4CHZeQN9IJXDvXBD00zaUTqKO7"
};

export const Seo = {
	delimeter: " | ",
	titlePretfix: "Metaintro"
};

export const FirebaseConfig = {
	projectId: "metaintro-94e0b",
	messagingSenderId: "793714072191",
	storageBucket: "metaintro-94e0b.appspot.com",
	authDomain: "auth.metaintro.net", // auth.metaintro.net
	apiKey: "AIzaSyCliVumNrzBeTe92eUko43VvqCzyizltsc",
	appId: "1:793714072191:web:a5ab126231ba95d5497d4a"
};

export const Pages = {
	upgrade: "/upgrade",
	subscribe: "/subscribe",
	subscribeCompleted: "/subscribe/completed",
	recommendations: "/recommendations"
};

export const HashLinks = {
	reqInfo: "#req-info",
	cookiePolicy: "#cookie-policy",
	privacyPolicy: "#privacy-policy",
	termsOfService: "#terms-of-service"
};

export const Keys = {
	cc: "cc",
	utm: "utm",
	events: "events",
	subscribe: "subscribe",
	sessionId: "sessionId",
	recommendations: "recommendations"
};

export const Links = {
	metaintro: `${METAINTRO}/`,
	resources: `${METAINTRO}/`,
	about: `${METAINTRO}/about`,
	terms: `${METAINTRO}/terms`,
	events: `${METAINTRO}/events`,
	authCallBack: "/subscribe/cb",
	support: `${METAINTRO}/support`,
	advertise: `${METAINTRO}/advertise`,
	newsletter: `${METAINTRO}/newsletter`,
	wallOfLove: `${METAINTRO}/wall-of-love`,
	truestAndSafety: `${METAINTRO}/trust-and-safety`,
	freeConsolation: "https://calendly.com/metaintro/metaintro-pro-consultation"
};

export const SocialMedia = {
	facebook: "https://www.facebook.com/officialmetaintro",
	instagram: "https://www.instagram.com/metaintro",
	youtube: "https://www.youtube.com/@metaintro",
	discord: "https://discord.gg/metaintro",
	twitter: "https://www.twitter.com/metaintro"
};

export function getEnv(): Environments {
	if (IS_LOCALHOST) return Environments.LOCALHOST;
	if (IS_DEV) return Environments.DEVELOPMENT;
	if (IS_UAT) return Environments.UAT;
	return Environments.PRODUCTION;
}

export const getCC = (): string | null => {
	return (JSON.parse(sessionStorage.getItem(Keys.cc) || "{}") as { countryCode?: string }).countryCode || "";
};

export function getSessionId(): string {
	let sessionId = sessionStorage.getItem(Keys.sessionId);
	if (!sessionId) {
		sessionId = nanoid(6);
		sessionStorage.setItem(Keys.sessionId, sessionId);
	}
	return sessionId;
}
