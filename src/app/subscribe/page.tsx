/* eslint-disable no-console */
import "./page.scss";
import React, { useEffect, useCallback, Suspense } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import { UserCredential } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useLocation } from "react-router-dom";
import { Seo, Client, Pages } from "../../utils/config";
import { languages } from "../../context/Language/Language";
import OnPageSeo from "../../components/OnPageSeo/OnPageSeo";
import LQIPImage from "../../components/LQIPImage/LQIPImage";
import SubscribePageProvider, { useSubscribePage } from "../../context/SubscribePage/SubscribePage";

const Congratulations = React.lazy(() => import(/* webpackChunkName: 'Congratulations' */ "./congratulations/page"));
const AppleLoginButton = React.lazy(
	() => import(/* webpackChunkName: 'AppleSocialAuthButton' */ "../../components/SocialAuthButton/Apple/Apple")
);
const GoogleLoginButton = React.lazy(
	() => import(/* webpackChunkName: 'GoogleSocialAuthButton' */ "../../components/SocialAuthButton/Google/Google")
);
const FacebookLoginButton = React.lazy(
	() => import(/* webpackChunkName: 'FacebookSocialAuthButton' */ "../../components/SocialAuthButton/Facebook/Facebook")
);
const GithubLoginButton = React.lazy(
	() => import(/* webpackChunkName: 'GithubSocialAuthButton' */ "../../components/SocialAuthButton/GitHub/GitHub")
);
const YahooLoginButton = React.lazy(
	() => import(/* webpackChunkName: 'YahooSocialAuthButton' */ "../../components/SocialAuthButton/Yahoo/Yahoo")
);

function SubscribePage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const { t, i18n } = useTranslation(["subscribe", "common"]);
	const currentLanguage = languages.find((lang) => lang.id === i18n.language);
	const {
		formData,
		formErrors,
		pageSettings,
		emailSuggestions,
		handleChange,
		updateFormData,
		toggleOpenMoreSocialLogins
	} = useSubscribePage();

	const objectSpacing = 2;
	const inputSize = "small";
	const completedPagePath = `${currentLanguage?.path}${Pages.subscribeCompleted}`;

	const authSuccessCb = (response: UserCredential) => {
		let name: string = "";
		let email: string = "";

		name = String(response.user.providerData[0]?.displayName);
		email = String(response.user.providerData[0]?.email);
		if (response.providerId === "apple.com") {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
			const appleResponse = response as any;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const appleFirstName = String(appleResponse?._tokenResponse?.firstName);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const appleLastName = String(appleResponse?._tokenResponse?.lastName);
			if (appleFirstName && appleFirstName !== "undefined") name = `${appleFirstName}`;
			if (appleLastName && appleFirstName !== "undefined") name += ` ${appleLastName}`;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			email = String(appleResponse._tokenResponse.email);
		}

		updateFormData({ ...formData, name, email, isSubmitted: true });
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	const authErrorCb = (error: any) => {
		console.log("handleError", error);
	};

	const submit = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();
			updateFormData({ ...formData });
			if (formData.name && !formErrors.name && formData.email && !formErrors.email) {
				updateFormData({ ...formData, isSubmitted: true });
			}
		},
		[formData, formErrors]
	);

	/**
	 * Since Social Auth Callback and updateFormData are  async, we need to check if the form
	 * is submitted and there are not form errors, then we can navigate to the completed page.
	 */
	useEffect(() => {
		if (formData.isSubmitted && location.pathname !== completedPagePath) {
			console.debug("navigate to completed page");
			navigate(completedPagePath);
		}
	}, [formData]);

	// useEffect(() => {
	// 	const subscribe = async () => {
	// 		if (formData.isSubmitted && location.pathname !== completedPagePath) {
	// 			console.debug("Performing API call");

	// 			try {
	// 				// Replace this with your actual API call
	// 				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	// 				await yourApiCallFunction();
	// 				console.debug("API call successful");

	// 				// Check again if the conditions to navigate are still met
	// 				if (formData.isSubmitted && location.pathname !== completedPagePath) {
	// 					console.debug("navigate to completed page");
	// 					navigate(completedPagePath);
	// 				}
	// 			} catch (error) {
	// 				console.error("API call failed", error);
	// 			}
	// 		}
	// 	};

	// 	subscribe();
	// }, [formData, completedPagePath, navigate]);

	return (
		<>
			<OnPageSeo
				keywords={t("seo.keywords")}
				description={t("seo.description")}
				title={Seo.titlePretfix + Seo.delimeter + t("seo.title")}
			/>
			<LQIPImage
				preLoaded
				width={600}
				className="SubscribeCover"
				alt="Metaintro-Future-of-Work"
				height={Number(theme.spacing(36).replace("px", ""))}
				src="/assets/images/covers/Metaintro-Future-of-Work.webp"
				lqipSrc="/assets/images/covers/Metaintro-Future-of-Work-lqip.webp"
			/>
			<Container
				maxWidth="sm"
				className="ContentWrapper"
				sx={{
					paddingTop: objectSpacing,
					paddingBottom: objectSpacing
				}}
			>
				<Typography
					variant="h1"
					align="center"
					component="h1"
					mb={objectSpacing}
					className="SubscribeTitle"
				>
					{t("workInWeb3AIToday")}
				</Typography>
				<Typography
					variant="h2"
					align="center"
					component="h2"
					mb={objectSpacing}
					className="SubscribeSubTitle"
				>
					{t("join400K")}
				</Typography>
				<form
					id="subscribe-form"
					name="subscribe-form"
					target={completedPagePath}
					aria-label="Subscribe Form"
				>
					<Autocomplete
						freeSolo
						options={[]}
						id="name-autocomplete"
						value={formData?.name ?? ""}
						onChange={(_, newValue) => {
							updateFormData({ ...formData, name: newValue ?? "" });
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								required
								fullWidth
								name="name"
								size={inputSize}
								autoComplete="on"
								variant="outlined"
								label={t("name")}
								onChange={handleChange}
								error={!!formErrors?.name}
								helperText={formErrors?.name ?? ""}
								sx={{ marginBottom: objectSpacing }}
								autoFocus={location.pathname !== completedPagePath} // do not autofocus on completed
								InputLabelProps={{ sx: { fontSize: "0.93rem", lineHeight: "-15.75px" } }}
							/>
						)}
					/>

					<Autocomplete
						freeSolo
						id="email-autocomplete"
						options={emailSuggestions}
						value={formData?.email ?? ""}
						onChange={(_, newValue) => {
							updateFormData({ ...formData, email: newValue ?? "" });
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								required
								fullWidth
								name="email"
								size={inputSize}
								autoComplete="on"
								variant="outlined"
								label={t("email")}
								onChange={handleChange}
								error={!!formErrors?.email}
								helperText={formErrors?.email ?? ""}
								sx={{ marginBottom: objectSpacing }}
								InputLabelProps={{ sx: { fontSize: "0.93rem", lineHeight: "-15.75px" } }}
							/>
						)}
					/>

					<Button
						fullWidth
						type="submit"
						size="medium"
						variant="contained"
						onClick={submit}
						className="SubscribeButton"
						sx={{ marginBottom: objectSpacing }}
						aria-label={t("common:buttons.signUp")}
					>
						{t("common:buttons.signUp")}
					</Button>
				</form>
				<Divider
					sx={{
						fontSize: "12px",
						fontWeight: 400,
						lineHeight: "1.75",
						letterSpacing: "0.02857em",
						mb: objectSpacing,
						color: theme.palette.grey[600]
					}}
				>
					{t("orContinueWith")}
				</Divider>
				{/* Base Social Logins */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
						marginBottom: objectSpacing,
						justifyContent: "space-between"
					}}
				>
					<Suspense fallback={<div style={{ height: "40px", width: "100%" }} />}>
						{Client.isSafari ? (
							<AppleLoginButton
								successCb={authSuccessCb}
								errorCb={authErrorCb}
							/>
						) : (
							<>
								<GoogleLoginButton
									successCb={authSuccessCb}
									errorCb={authErrorCb}
								/>
								<Divider sx={{ mb: objectSpacing }} />
								<FacebookLoginButton
									successCb={authSuccessCb}
									errorCb={authErrorCb}
								/>
							</>
						)}
						<Collapse
							in={pageSettings.openMoreSocialLogins}
							orientation="vertical"
							sx={{
								width: "100%",
								display: "block"
							}}
						>
							{Client.isSafari && (
								<>
									<Divider sx={{ mb: objectSpacing }} />
									<GoogleLoginButton
										successCb={authSuccessCb}
										errorCb={authErrorCb}
									/>
									<Divider sx={{ mb: objectSpacing }} />
									<FacebookLoginButton
										successCb={authSuccessCb}
										errorCb={authErrorCb}
									/>
								</>
							)}
							{pageSettings.openMoreSocialLogins && (
								<Suspense fallback={<div style={{ height: "40px", width: "100%" }} />}>
									<Divider sx={{ mb: objectSpacing }} />
									<GithubLoginButton
										successCb={authSuccessCb}
										errorCb={authErrorCb}
									/>
									<Divider sx={{ mb: objectSpacing }} />
									<YahooLoginButton
										successCb={authSuccessCb}
										errorCb={authErrorCb}
									/>
								</Suspense>
							)}
						</Collapse>
					</Suspense>
				</Box>
				<Box
					sx={{
						width: "100%",
						textAlign: "right"
					}}
				>
					<Button
						size="small"
						variant="text"
						onClick={toggleOpenMoreSocialLogins}
						sx={{
							padding: 0,
							fontWeight: 500,
							fontSize: "12px",
							textTransform: "none",
							marginBottom: objectSpacing,
							color: theme.palette.grey[600]
						}}
					>
						{pageSettings.openMoreSocialLogins
							? `${t("common:buttons.lessSocialLogins")}`
							: `${t("common:buttons.moreSocialLogins")}`}
					</Button>
				</Box>
				<Typography className="LegalNotice">
					By signin up, you agree to our{" "}
					<a
						href="#terms-and-conditions"
						className=""
					>
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						href="privacy-policy"
						className=""
					>
						Privacy Policy
					</a>
					.
				</Typography>
			</Container>
		</>
	);
}

export function SubscribeCongratulationPage() {
	return (
		<SubscribePageProvider>
			<SubscribePage />
			<Congratulations />
		</SubscribePageProvider>
	);
}

export default function SubscribePageWrapper() {
	return (
		<SubscribePageProvider>
			<SubscribePage />
		</SubscribePageProvider>
	);
}
