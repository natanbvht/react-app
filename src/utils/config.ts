export const METAINTRO = "https://www.metaintro.com";

export enum Environments {
	LOCALHOST = "localhost",
	TEST = "test",
	DEVELOPMENT = "development",
	UAT = "uat",
	PRODUCTION = "production"
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
export const isLocalhost = window.location.hostname === Environments.LOCALHOST;
export const isDev = window?.location?.hostname?.includes("dev");
export const isUat = window?.location?.hostname?.includes("uat");
export const isProd = !isLocalhost && !isDev && !isUat;

export function getEnv(): Environments {
	if (isLocalhost) return Environments.LOCALHOST;
	if (isDev) return Environments.DEVELOPMENT;
	if (isUat) return Environments.UAT;
	return Environments.PRODUCTION;
}

const userAgentString = navigator.userAgent;
export const Client = {
	isChrome: userAgentString.includes("Chrome"),
	isFirefox: userAgentString.includes("Firefox"),
	isSafari: !userAgentString.includes("Chrome") && userAgentString.includes("Safari")
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

export const Links = {
	resources: `${METAINTRO}/`,
	events: "#events-subscribe",
	about: `${METAINTRO}/about`,
	terms: `${METAINTRO}/terms`,
	authCallBack: "/subscribe/cb",
	support: `${METAINTRO}/support`,
	advertise: `${METAINTRO}/advertise`,
	newsletter: `${METAINTRO}/newsletter`,
	wallOfLove: `${METAINTRO}/wall-of-love`,
	truestAndSafety: `${METAINTRO}/trust-and-safety`
};

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
