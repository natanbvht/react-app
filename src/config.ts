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

export const GA = {
	webStream: "G-VM6WPRTXRH",
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

export enum TrackingEvents {
	// Newsletter
	StartedNewsletterOnboarding = "Started Newsletter Onboarding", // ✔️
	CompletedNewsletterContactInfo = "Completed Newsletter Contact Info", // ✔️
	CompletedNewsletterReviewYourInfo = "Completed Newsletter Review Your Info", // ✔️
	SubscribedToMetaintroConversion = "Subscribe Conversion", // ✔️
	SubscriptionError = "Subscription Error", // ✔️
	// Conent View
	ViewedWelcomePage = "Viewed Welcome Page", // ✔️
	ViewedContactInfoPage = "Viewed Contact Info Page", // ✔️
	ViewedReviewYourInfoPage = "Viewed Review Your Info Page", // ✔️
	ViewedYouAreSignedUpPage = "Viewed You Are Signed Up Page", // ✔️
	ViewedMetaintroProPopup = "Viewed Metaintro Pro Popup", // ✔️
	ViewedMetaintroCheckoutPopup = "Viewed Metaintro Checkout Popup", // ✔️
	// Pro
	StartedProOnboarding = "Started Pro Onboarding", // ✔️
	ProConversion = "Pro Conversion", // ✔️
	BookFreeConsultation = "Book Free Consultation", // ✔️
	// Affiliate
	StartedAffiliateOnboarding = "Started Affiliate Onboarding", // ✔️
	AffiliateConversion = "Affiliate Conversion", // ✔️
	ExtensionInstallConversion = "Extension Install Conversion", // ✔️
	AffiliateError = "Affiliate Error", // ✔️
	ViewedAffiliate = "Viewed Affiliate", // ✔️
	// Facebook Auth
	StartedLoginWithFacebook = "Started Login With Facebook", // ✔️
	CompletedLoginWithFacebook = "Completed Login With Facebook", // ✔️
	LoginWithFacebookError = "Login With Facebook Error", // ✔️
	// Google Auth
	StartedLoginWithGoogle = "Started Login With Google", // ✔️
	CompletedLoginWithGoogle = "Completed Login With Google", // ✔️
	LoginWithGoogleError = "Login With Google Error", // ✔️
	// Apple Auth
	StartedLoginWithApple = "Started Login With Apple", // ✔️
	CompletedLoginWithApple = "Completed Login With Apple", // ✔️
	LoginWithAppleError = "Login With Apple Error", // ✔️
	// GitHub Auth
	StartedLoginWithGitHub = "Started Login With GitHub", // ✔️
	CompletedLoginWithGitHub = "Completed Login With GitHub", // ✔️
	LoginWithGitHubError = "Login With GitHub Error", // ✔️
	// General
	ClickedEditContactInfo = "Clicked Edit Contact Info", // ✔️
	ClickedMaybeLater = "Clicked Maybe Later", // ✔️
	ClickedKeepMyCurrentFreePlan = "Clicked Keep My Current Free Plan", // ✔️
	ClickedViewContactInfoDisclaimer = "Clicked View Contact Info Disclaimer", // ✔️
	ClickedViewPrivacyPolicy = "Clicked View Privacy Policy", // ✔️
	ClickedViewCookiePolicy = "Clicked View Cookie Policy", // ✔️
	ClickedGetStartedHere = "Clicked Get Started Here", // ✔️
	ClickedContinue = "Clicked Continue", // ✔️
	ClickedSelectRecommendations = "Clicked Select Recommendations", // ✔️
	ClickedMetaintroPro = "Clicked Metaintro Pro", // ✔️
	ClickedSelectAllAffiliates = "Clicked Select All Affiliates", // ✔️
	ClickedDeselectAllAffiliates = "Clicked Deselect All Affiliates", // ✔️
	TypedEmail = "Typed Email", // ✔️
	TypedFullName = "Typed Full Name" // ✔️
}
