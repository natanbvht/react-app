/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Keys } from "../../config";

export interface SubscribePageFormData {
	name: string;
	email: string;
	isReadyToSubmit?: boolean;
	viewedCookiePolicy?: boolean;
	viewedTermsOfService?: boolean;
	viewedContactInfoPolicy?: boolean;
}

interface SubscribePageFormErrors {
	[key: string]: string;
}

interface SubscribePageSettings {
	openCookiePolicy: boolean;
	openTermsOfService: boolean;
	openMoreSocialLogins?: boolean;
	openContactInfoPolicy: boolean;
	submittedSubscribeForm?: boolean;
}

export interface SubscribePageContextType {
	emailSuggestions: string[];
	formData: SubscribePageFormData;
	formErrors: SubscribePageFormErrors;
	pageSettings: SubscribePageSettings;
	updateFormData: (newFormData: SubscribePageFormData) => void;
	updateErrors: (newFormErrors: SubscribePageFormErrors) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	toggleOpenMoreSocialLogins: () => void;
}

export interface SubscribePageProviderProps {
	children: ReactNode;
}

export const SubscribePageContext = createContext<SubscribePageContextType | undefined>(undefined);

export const useSubscribePage = (): SubscribePageContextType => {
	const context = useContext(SubscribePageContext);
	if (!context) {
		throw new Error("useSubscribePage must be used within a SubscribePageProvider");
	}
	return context;
};

/**
 * validate function checks if name and email are valid.
 * @name valid if it is not empty
 * @email valid if it true for the following:
 * it includes @
 * it includes .
 * it contains only latin characters and numbers
 * it is longer than 3 characters
 * @returns FormErrors
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateEmail(email: string, t: any): SubscribePageFormErrors {
	let errorMessage: string = "";
	const errors: SubscribePageFormErrors = { email: "" };
	const latinRegex = /^[a-zA-Z0-9@.]*$/;

	if (email.length < 3) errorMessage += t("errors.emailMustBeAtLeast");
	if (!email.includes("@")) errorMessage += t("errors.emailMustIncludeAt");
	if (!email.includes(".")) errorMessage += t("errors.emailMustIncludePeriod");
	if (!latinRegex.test(email)) errorMessage += t("errors.emailMustBeLatin");

	errors.email = errorMessage;

	return errors;
}

function SubscribePageProvider({ children }: SubscribePageProviderProps) {
	const { t } = useTranslation(["subscribe", "common"]);
	const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
	const [formErrors, setFormErrors] = useState<SubscribePageFormErrors>({});

	const initialPageSettings: SubscribePageSettings = {
		openCookiePolicy: false,
		openTermsOfService: false,
		openMoreSocialLogins: false,
		openContactInfoPolicy: false,
		submittedSubscribeForm: false
	};

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const initialFormData: SubscribePageFormData = JSON.parse(sessionStorage.getItem(Keys.subscribe) as string) || {
		name: "",
		email: "",
		isReadyToSubmit: false,
		viewedCookiePolicy: false,
		viewedTermsOfService: false,
		viewedContactInfoPolicy: false
	};

	const [formData, setFormData] = useState<SubscribePageFormData>(initialFormData);
	const [pageSettings, setPageSettings] = useState<SubscribePageSettings>(initialPageSettings);

	const updateErrors = useCallback(
		(newFormErrors: SubscribePageFormErrors | ((errors: SubscribePageFormErrors) => SubscribePageFormErrors)) => {
			setFormErrors((prevFormErrors) => {
				if (typeof newFormErrors === "function") {
					return newFormErrors(prevFormErrors);
				}
				return {
					...prevFormErrors,
					...newFormErrors
				};
			});
		},
		[]
	);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

			if (name === "email") {
				if (value && value.indexOf("@") === -1) {
					setEmailSuggestions(["@gmail.com", "@yahoo.com", "@hotmail.com", "@aol.com"].map((suffix) => value + suffix));
				}
				updateErrors((errors: SubscribePageFormErrors) => ({ ...errors, ...validateEmail(value, t) }));
			}

			if (name === "name") {
				updateErrors((errors: SubscribePageFormErrors) => {
					if (value && value.length < 2) {
						return { ...errors, name: t("errors.nameMustBeAtLeast") };
					}
					// eslint-disable-next-line unused-imports/no-unused-vars
					const { name, ...restErrors } = errors;
					return restErrors;
				});
			}
		},
		[setFormData, updateErrors]
	);

	const updateFormData = useCallback((newFormData: SubscribePageFormData) => {
		if (newFormData.name.length < 2) {
			updateErrors({ name: t("errors.nameMustBeAtLeast") });
		}
		updateErrors(validateEmail(newFormData.email, t));
		setFormData(newFormData);
	}, []);

	const toggleOpenMoreSocialLogins = useCallback(() => {
		setPageSettings((prevPageSettings) => ({
			...prevPageSettings,
			openMoreSocialLogins: Boolean(!prevPageSettings.openMoreSocialLogins)
		}));
	}, []);

	useEffect(() => {
		sessionStorage.setItem(Keys.subscribe, JSON.stringify(formData));
	}, [formData]);

	const value = useMemo(
		() => ({
			formData,
			formErrors,
			pageSettings,
			emailSuggestions,
			updateErrors,
			handleChange,
			updateFormData,
			toggleOpenMoreSocialLogins
		}),
		[formData, formErrors, pageSettings]
	);

	return <SubscribePageContext.Provider value={value}>{children}</SubscribePageContext.Provider>;
}

export default SubscribePageProvider;
