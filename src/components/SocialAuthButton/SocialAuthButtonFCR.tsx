import React from "react";
import { SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import Button, { ButtonProps } from "@mui/material/Button";
import { FirebaseConfig } from "../../utils/config";
import { languages } from "../../context/Language/Language";

export enum AuthFlow {
	Popup = "popup",
	Redirect = "redirect"
}

export enum AuthProvider {
	Apple = "apple.com",
	Yahoo = "yahoo.com",
	Google = "google.com",
	GitHub = "github.com",
	Twitter = "twitter.com",
	Facebook = "facebook.com",
	Microsoft = "microsoft.com"
}

export interface SocialAuthCb {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errorCb: (error: any) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	successCb: (authResponse: any) => void;
}

export interface SocialAuthButtonFCRProps extends ButtonProps, SocialAuthCb {
	sx?: SxProps;
	text: string;
	scopes?: string[];
	className?: string;
	authIcon?: JSX.Element;
	authProvider: AuthProvider;
	onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

function SocialAuthButtonFCR({
	sx,
	text,
	size,
	scopes,
	variant,
	authIcon,
	className,
	authProvider,
	errorCb,
	successCb,
	onMouseEnter,
	onMouseLeave
}: SocialAuthButtonFCRProps) {
	const { i18n } = useTranslation(["subscribe", "common"]);

	async function continueWithProvider(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		try {
			const { initializeApp } = await import("firebase/app" /* webpackChunkName: "firebase-app" */);
			const { getAuth, signInWithPopup, OAuthProvider, GoogleAuthProvider } = await import(
				"firebase/auth"
			); /* webpackChunkName: "firebase-auth" */
			const firebaseApp = initializeApp(FirebaseConfig);
			const firebaseAuth = getAuth(firebaseApp);
			const currentLanguage = languages.find((lang) => lang.id === i18n.language);
			const currentLocaleShortCode = currentLanguage?.shortCode.toLocaleLowerCase() ?? "en";

			if (authProvider === AuthProvider.Google) {
				const googleProvider = new GoogleAuthProvider();
				scopes?.forEach((scope) => googleProvider.addScope(scope));
				googleProvider.setCustomParameters({
					locale: currentLocaleShortCode
				});
				const authResponse = await signInWithPopup(firebaseAuth, googleProvider);
				return successCb(authResponse);
			}

			const oauthProvider = new OAuthProvider(authProvider);
			scopes?.forEach((scope) => oauthProvider.addScope(scope));
			oauthProvider.setCustomParameters({ locale: currentLocaleShortCode });
			const authResponse = await signInWithPopup(firebaseAuth, oauthProvider);
			return successCb(authResponse);
		} catch (error) {
			return errorCb(error);
		}
	}

	return (
		<Button
			sx={sx}
			fullWidth
			size={size}
			variant={variant}
			startIcon={authIcon}
			className={className}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={continueWithProvider}
		>
			{text}
		</Button>
	);
}

export default SocialAuthButtonFCR;
