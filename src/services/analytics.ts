import { GA } from "../config";

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
export enum Events {
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

const DEGUBUG = false;

interface Data {
	[key: string]: any;
}

interface Gtag {
	(command: "config", targetId: string, config?: Data): void;
	(command: "event", eventName: string, eventParams?: Data): void;
}

interface Posthog {
	identify: (id: string, data: any) => void;
	capture: (event: string, data: any) => void;
}

declare global {
	interface Window {
		posthog: Posthog; // https://posthog.com/docs/libraries/js
		gtag: Gtag; // https://developers.google.com/tag-platform/gtagjs/reference
	}
}

/**
 * @param event {String} event name e.g. "Started Newsletter Onboarding"
 * @param data {Object} event data e.g. { email: "", name: "" }
 * @returns void
 * @description Tracks an event to Google Analytics and Posthog
 * @example
 * trackEvent(TrackingEvents.StartedNewsletterOnboarding, { email: "", name: "" });
 */
function trackEvent(event: Events, data?: Data) {
	const gtag = window?.gtag;
	const posthog = window?.posthog;
	if (posthog) posthog.capture(event, data);
	if (!posthog && DEGUBUG) console.debug("Track event was called before Posthog was loaded.");
	if (gtag) gtag("event", event.replaceAll(" ", ""), data);
	if (!gtag && DEGUBUG) console.debug("Track event was called before Google Analytics was loaded.");
}

export function trackPageView(pagePath: string, pageTitle: string) {
	const gtag = window?.gtag;
	const posthog = window?.posthog;
	if (gtag) gtag("config", GA.trackingId, { page_path: pagePath });
	if (!gtag && DEGUBUG) console.debug("No analytics services found.");
	if (DEGUBUG) console.log("Page view:", pagePath);
	if (posthog) posthog.capture("$pageview", { page_path: pagePath, page_title: pageTitle });
	if (!posthog && DEGUBUG) console.debug("No analytics services found.");
	if (DEGUBUG) console.log("Page view:", pagePath);
}

export default trackEvent;
