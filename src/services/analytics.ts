import { Keys, GA } from "../config";
import { User } from "../types";

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

const DEBUG = true;

interface Data {
	[key: string]: any;
}

interface Gtag {
	(command: "set", config: Data): void;
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
	if (!posthog && DEBUG) console.debug("Track event was called before Posthog was loaded.");
	if (gtag) gtag("event", event, data);
	if (!gtag && DEBUG) console.debug("Track event was called before Google Analytics was loaded.");
}

export function trackEventOnce(event: Events, data?: Data) {
	// str arr
	const trackedEvents = JSON.parse(sessionStorage.getItem(Keys.events) || "[]") as string[];
	if (trackedEvents?.includes(event)) return;
	const gtag = window?.gtag;
	const posthog = window?.posthog;
	if (posthog) posthog.capture(event, data);
	if (!posthog && DEBUG) console.debug("Track event was called before Posthog was loaded.");
	if (gtag) gtag("event", event, data);
	if (!gtag && DEBUG) console.debug("Track event was called before Google Analytics was loaded.");
	sessionStorage.setItem(Keys.events, JSON.stringify([...trackedEvents, event]));
}

export async function hashUserEmail(email: string): Promise<string> {
	const crypto = window?.crypto;
	const encoder = new TextEncoder();
	const data = encoder.encode(email);

	try {
		const hashBuffer = await crypto.subtle.digest("SHA-256", data);
		const hashHex = Array.from(new Uint8Array(hashBuffer))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("")
			.substring(0, 16); // Truncate to 16 characters
		return hashHex;
	} catch (error) {
		console.error("Hashing failed:", error);
		throw new Error("Hashing failed");
	}
}

export function trackPageView(pagePath: string, pageTitle: string) {
	const gtag = window?.gtag;
	const posthog = window?.posthog;
	if (gtag) gtag("config", GA.trackingId, { page_path: pagePath });
	if (!gtag && DEBUG) console.debug("No analytics services found.");
	if (DEBUG) console.debug("Page view:", pagePath);
	if (posthog) posthog.capture("$pageview", { page_path: pagePath, page_title: pageTitle });
	if (!posthog && DEBUG) console.debug("No analytics services found.");
	if (DEBUG) console.debug("Page view:", pagePath);
}

export function identifyUser(user: User) {
	const gtag = window?.gtag;
	const posthog = window?.posthog;
	const { id, email, ...data } = user;

	const processIdentification = (userId: string) => {
		if (posthog) posthog.identify(userId, data);
		if (!posthog && DEBUG) console.debug("No analytics services found.");
		if (DEBUG) console.debug("Identify user:", userId, data);

		if (gtag) gtag("set", { user_id: userId });
		if (!gtag && DEBUG) console.debug("No analytics services found.");
		if (DEBUG) console.debug("Identify user:", userId, data);
	};

	if (id) {
		processIdentification(id);
	} else if (email) {
		hashUserEmail(email)
			.then((hashedEmail) => {
				const updatedUser = { ...user, id: hashedEmail };
				sessionStorage.setItem(Keys.subscribe, JSON.stringify(updatedUser));
				processIdentification(hashedEmail);
			})
			.catch((error) => {
				console.debug("Error hashing email:", error);
			});
	}
}

export default trackEvent;
