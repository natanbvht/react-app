/* eslint-disable no-console */
import "./page.scss";
import React, { useEffect, useCallback, Suspense } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import Autocomplete from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UserCredential, AuthError } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
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
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

		updateFormData({ ...formData, name, email, isReadyToSubmit: true });
	};

	const authErrorCb = (error: AuthError) => {
		const isBlockedError = error.code === "auth/popup-blocked";
		if (isBlockedError) {
			// TODO: Show a popup blocked message with GIF
			// eslint-disable-next-line no-alert
			alert("Please allow popups for this website and try again.");
		}
	};

	const handleClickSubmit = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();
			updateFormData({ ...formData });
			if (formData.name && !formErrors.name && formData.email && !formErrors.email) {
				updateFormData({ ...formData, isReadyToSubmit: true });
			}
		},
		[formData, formErrors]
	);

	/**
	 * Since Social Auth Callback and updateFormData are  async, we need to check if the form
	 * is submitted and there are not form errors, then we can navigate to the completed page.
	 */
	useEffect(() => {
		const handleSubscribe = async () => {
			if (formData.isReadyToSubmit && location.pathname !== completedPagePath) {
				const { subscribe } = await import("../../utils/api" /* webpackChunkName: "apiV1" */);
				try {
					if (formData.isReadyToSubmit && location.pathname !== completedPagePath) {
						await subscribe({ email: formData.email, fullName: formData.name });
						navigate(completedPagePath);
					}
				} catch (error) {
					console.error("API call failed", error);
					// TODO: Log error to Sentry
					navigate(completedPagePath);
				}
			}
		};

		handleSubscribe();
	}, [formData, completedPagePath, navigate]);

	return (
		<>
			<OnPageSeo
				keywords={t("seo.keywords")}
				description={t("seo.description")}
				title={Seo.titlePretfix + Seo.delimeter + t("seo.title")}
			/>
			{isMobile && (
				<LQIPImage
					preLoaded
					width={600}
					className="SubscribeCover"
					alt="Metaintro-Future-of-Work"
					height={Number(theme.spacing(36).replace("px", ""))}
					src="/assets/images/covers/Metaintro-Future-of-Work.webp"
					lqipSrc="/assets/images/covers/Metaintro-Future-of-Work-lqip.webp"
				/>
			)}

			<Grid container>
				<Grid
					item
					xs={!isMobile ? 6 : 12}
				>
					<Container
						maxWidth="xs"
						className="ContentWrapper"
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							paddingTop: objectSpacing,
							paddingBottom: objectSpacing,
							marginRight: isMobile ? objectSpacing : "5.2rem",
							minHeight: !isMobile ? "calc(100vh)" : "auto"
						}}
					>
						<Typography
							variant="h1"
							align={isMobile ? "center" : "left"}
							component="h1"
							mb={objectSpacing}
							className="SubscribeTitle"
						>
							{t("workInWeb3AIToday")}
						</Typography>
						<Typography
							variant="h2"
							component="h2"
							mb={objectSpacing}
							className="SubscribeSubTitle"
							align={isMobile ? "center" : "left"}
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
								onClick={handleClickSubmit}
								sx={{ marginBottom: objectSpacing }}
								aria-label={t("common:buttons.signUp")}
								className={isMobile ? "SubscribeButtonPink" : "SubscribeButton"}
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
				</Grid>
				{!isMobile && (
					<Grid
						item
						xs={!isMobile ? 6 : 12}
						sx={{ overflow: "hidden", backgroundColor: theme.palette.primary.main, minHeight: "calc(100vh)" }}
					>
						<Box
							className="relative hidden h-full items-center justify-center overflow-hidden"
							sx={{
								backgroundColor: "primary.main",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								padding: "0 6.4rem"
							}}
						>
							<svg
								className="pointer-events-none absolute inset-0"
								viewBox="0 0 960 540"
								width="100%"
								height="100%"
								preserveAspectRatio="xMidYMax slice"
								xmlns="http://www.w3.org/2000/svg"
							>
								<Box
									fill="none"
									component="g"
									strokeWidth="100"
									stroke="currentColor"
									className="opacity-20"
									sx={{ color: theme.palette.primary.light }}
								>
									<circle
										r="234"
										cx="196"
										cy="23"
									/>
									<circle
										r="234"
										cx="790"
										cy="491"
									/>
								</Box>
							</svg>
							<Box
								component="svg"
								className="opacity-20"
								viewBox="0 0 220 192"
								width="220px"
								height="192px"
								fill="none"
								sx={{ color: "primary.light", position: "absolute", right: "-64px", top: "-64px" }}
							>
								<defs>
									<pattern
										id="837c3e70-6c3a-44e6-8854-cc48c737b659"
										x="0"
										y="0"
										width="20"
										height="20"
										patternUnits="userSpaceOnUse"
									>
										<rect
											x="0"
											y="0"
											width="4"
											height="4"
											fill="currentColor"
										/>
									</pattern>
								</defs>
								<rect
									width="220"
									height="192"
									fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
								/>
							</Box>

							<div className="relative z-10 w-full max-w-2xl">
								<Typography
									variant="h2"
									component="h2"
									fontWeight={700}
									color={theme.palette.primary.contrastText}
								>
									Welcome to
									<br />
									our community
								</Typography>
								<Typography
									color={theme.palette.primary.contrastText}
									sx={{
										marginTop: "2rem"
									}}
								>
									Metaintro helps developers to build organized and well coded dashboards full of beautiful and rich
									modules. Join us and start building your application today.
								</Typography>
								<Box
									sx={{
										display: "flex",
										marginTop: "2rem",
										alignItems: "center"
									}}
								>
									<AvatarGroup
										sx={{
											"& .MuiAvatar-root": {
												borderColor: "primary.main"
											}
										}}
									>
										<Avatar src="/assets/images/avatar-users/female-18.jpg" />
										<Avatar src="/assets/images/avatar-users/female-11.jpg" />
										<Avatar src="/assets/images/avatar-users/male-09.jpg" />
										<Avatar src="/assets/images/avatar-users/male-16.jpg" />
									</AvatarGroup>

									<Box
										sx={{
											opacity: 0.8,
											fontWeight: 500,
											marginLeft: "1rem",
											letterSpacing: "-0.025em",
											color: theme.palette.primary.contrastText
										}}
									>
										More than 500k people joined us, it's your turn
									</Box>
								</Box>
							</div>
						</Box>
					</Grid>
				)}
			</Grid>
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
