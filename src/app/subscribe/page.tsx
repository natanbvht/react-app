/* eslint-disable no-console */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthError, UserCredential } from "firebase/auth";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import AutocompleteTextField from "../../components/AutocompleteTextField/AutocompleteTextField";
import ChevronDownIcon from "../../components/Icons/ChevronDown";
import OnPageSeo from "../../components/OnPageSeo/OnPageSeo";
import { Client, HashLinks, Keys, Pages, Seo } from "../../config";
import SubscribePageProvider, { useSubscribePage } from "../../context/SubscribePage/SubscribePage";
import { languages } from "../../i18n";
import { PagePartials, SocialAuthButtons } from "./lazy";
import "./page.scss";
import trackEvent, { Events } from "../../services/analytics";

interface AppleAuthResponse {
	_tokenResponse?: {
		firstName?: string;
		lastName?: string;
		email?: string;
	};
}

function SubscribePage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const { t, i18n } = useTranslation(["subscribe", "common"]);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [expanded, setExpanded] = React.useState<boolean>(false);
	const currentLanguage = languages.find((lang) => lang.id === i18n.language);
	const { formData, formErrors, emailSuggestions, handleChange, updateFormData } = useSubscribePage();

	const objectSpacing = 2;
	const completedPagePath = `${currentLanguage?.path}${Pages.subscribeCompleted}`;

	const handleToggleExpand = () => {
		setExpanded(!expanded);
	};

	const authSuccessCb = (response: UserCredential) => {
		let name: string = "";
		let email: string = "";

		name = String(response.user.providerData[0]?.displayName);
		email = String(response.user.providerData[0]?.email);
		if (response.providerId === "apple.com") {
			const appleResponse = response as AppleAuthResponse;
			const appleFirstName = String(appleResponse?._tokenResponse?.firstName);
			const appleLastName = String(appleResponse?._tokenResponse?.lastName);
			if (appleFirstName && appleFirstName !== "undefined") name = `${appleFirstName}`;
			if (appleLastName && appleFirstName !== "undefined") name += ` ${appleLastName}`;
			email = String(appleResponse?._tokenResponse?.email);
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

	const handleClickSubmit = React.useCallback(
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
	 * Since Social Auth Callback and updateFormData are async, we need to check if the form is ready
	 * to be  submitted  and there are  not form errors, then we can navigate to  the completed page.
	 */
	React.useEffect(() => {
		const handleSubscribe = async () => {
			if (formData.isReadyToSubmit && location.pathname !== completedPagePath) {
				const { subscribe, getRecommendations } = await import("../../services/apiV1" /* webpackChunkName: "apiV1" */);
				try {
					if (formData.isReadyToSubmit && location.pathname !== completedPagePath) {
						await subscribe({ email: formData.email, fullName: formData.name });
						navigate(completedPagePath);
					}
				} catch (error) {
					console.error("API call failed", error);
					// TODO: Log error
					navigate(completedPagePath);
				}

				/** Next Steps:
				 * 1. Get Recommendations (prefetch)
				 * 2. Load Stripe Pricing Table (pre-load/pre-connect)
				 */
				const stripeTag = document.createElement("link");
				stripeTag.rel = "preconnect";
				stripeTag.href = "https://js.stripe.comm";
				stripeTag.crossOrigin = "anonymous";
				document.head.appendChild(stripeTag);
				const metaTag = document.createElement("link");
				metaTag.rel = "preload";
				metaTag.href = "https://js.stripe.com/v3/pricing-table.js";
				metaTag.as = "script";
				document.head.appendChild(metaTag);
				const stripeMerchantTag = document.createElement("link");
				stripeTag.rel = "preconnect";
				stripeTag.href = "https://merchant-ui-api.stripe.com";
				stripeTag.crossOrigin = "anonymous";
				document.head.appendChild(stripeMerchantTag);
				getRecommendations()
					.then((res) => {
						if (Array.isArray(res) && res.length > 0) {
							sessionStorage.setItem(Keys.recommendations, JSON.stringify(res));
						} else {
							console.error("Failed to get recommendations", res);
						}
					})
					.catch((error) => {
						console.error("Failed to get recommendations", error);
					});
			}
		};
		handleSubscribe();
	}, [formData, completedPagePath, navigate]);

	return (
		<React.Suspense fallback={<div style={{ minHeight: "100vh", width: "100vw" }} />}>
			<OnPageSeo
				keywords={t("seo.keywords")}
				description={t("seo.description")}
				title={Seo.titlePretfix + Seo.delimeter + t("seo.title")}
			/>
			<Grid
				container
				flexDirection={isMobile ? "unset" : "row-reverse"}
			>
				{/* Mobile LQIPImage Partial */}
				{isMobile && (
					<PagePartials.LQIPImage
						preLoaded
						width={600}
						className="SubscribeCover"
						alt="Metaintro-Future-of-Work"
						height={Number(theme.spacing(36).replace("px", ""))}
						src="/assets/images/covers/Metaintro-Future-of-Work.webp"
						lqipSrc="/assets/images/covers/Metaintro-Future-of-Work-lqip.webp"
					/>
				)}
				{/* Desktop SideScreen Partial */}
				{!isMobile && (
					<Grid
						item
						xs={!isMobile ? 6 : 12}
						sx={{ overflow: "hidden", backgroundColor: theme.palette.primary.main, minHeight: "calc(100vh)" }}
					>
						<PagePartials.DesktopSideScreen />
					</Grid>
				)}

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
							minHeight: !isMobile ? "calc(100vh)" : "auto",
							marginRight: isMobile ? objectSpacing : "5.2rem"
						}}
					>
						<Typography
							variant="h1"
							component="h1"
							mb={objectSpacing}
							className="SubscribeTitle"
							align={isMobile ? "center" : "left"}
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
							{t("join500K")}
						</Typography>

						<form
							id="subscribe-form"
							name="subscribe-form"
							target={completedPagePath}
							aria-label="Subscribe Form"
						>
							<AutocompleteTextField
								freeSolo
								options={[]}
								id="name-autocomplete"
								value={formData?.name ?? ""}
								onChange={(_: React.SyntheticEvent, newValue: string | string[] | null) => {
									const value = Array.isArray(newValue) ? newValue.join(", ") : newValue;
									updateFormData({ ...formData, name: value ?? "" });
								}}
								textFieldProps={{
									name: "name",
									size: "small",
									label: t("name"),
									onChange: handleChange,
									error: !!formErrors?.name,
									helperText: formErrors?.name ?? "",
									sx: { marginBottom: objectSpacing },
									autoFocus: location.pathname !== completedPagePath, // do not autofocus on completed
									InputLabelProps: { sx: { fontSize: "0.93rem", lineHeight: "-15.75px" } }
								}}
							/>
							<AutocompleteTextField
								freeSolo
								id="email-autocomplete"
								options={emailSuggestions}
								value={formData?.email ?? ""}
								onChange={(_: React.SyntheticEvent, newValue: string | string[] | null) => {
									const value = Array.isArray(newValue) ? newValue.join(", ") : newValue;
									updateFormData({ ...formData, email: value ?? "" });
								}}
								textFieldProps={{
									name: "email",
									size: "small",
									label: t("email"),
									onChange: handleChange,
									error: !!formErrors?.email,
									helperText: formErrors?.email ?? "",
									sx: { marginBottom: objectSpacing },
									InputLabelProps: { sx: { fontSize: "0.93rem", lineHeight: "-15.75px" } }
								}}
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
								fontWeight: 400,
								fontSize: "12px",
								mb: objectSpacing,
								lineHeight: "1.75",
								letterSpacing: "0.02857em",
								color: theme.palette.grey[800]
							}}
						>
							{t("orContinueWith")}
						</Divider>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
								marginBottom: objectSpacing,
								justifyContent: "space-between"
							}}
						>
							<React.Suspense fallback={<div style={{ height: "40px", width: "100%" }} />}>
								{Client.isSafari ? (
									<SocialAuthButtons.Apple
										successCb={authSuccessCb}
										errorCb={authErrorCb}
									/>
								) : (
									<>
										<SocialAuthButtons.Google
											successCb={authSuccessCb}
											errorCb={authErrorCb}
										/>
										<Divider sx={{ mb: objectSpacing }} />
										<SocialAuthButtons.Facebook
											successCb={authSuccessCb}
											errorCb={authErrorCb}
										/>
									</>
								)}
								<Collapse
									unmountOnExit
									in={expanded}
									timeout="auto"
									sx={{
										width: "100%",
										height: expanded ? "auto" : "100%",
										transition: theme.transitions.create("height", {
											duration: theme.transitions.duration.standard
										})
									}}
								>
									<Box>
										{expanded && (
											<React.Suspense fallback={<div style={{ height: "40px", width: "100%" }} />}>
												<Divider sx={{ mb: objectSpacing }} />
												<SocialAuthButtons.Github
													successCb={authSuccessCb}
													errorCb={authErrorCb}
												/>

												<Divider sx={{ mb: objectSpacing }} />
												<SocialAuthButtons.Yahoo
													successCb={authSuccessCb}
													errorCb={authErrorCb}
												/>
											</React.Suspense>
										)}
										{expanded && Client.isSafari && (
											<React.Suspense fallback={<div style={{ height: "40px", width: "100%" }} />}>
												<Divider sx={{ mb: objectSpacing }} />
												<SocialAuthButtons.Google
													successCb={authSuccessCb}
													errorCb={authErrorCb}
												/>
												<Divider sx={{ mb: objectSpacing }} />
												<SocialAuthButtons.Facebook
													successCb={authSuccessCb}
													errorCb={authErrorCb}
												/>
											</React.Suspense>
										)}
									</Box>
								</Collapse>
							</React.Suspense>
						</Box>
						<Box className="w-100 text-right">
							<Button
								size="small"
								variant="text"
								onClick={handleToggleExpand}
								sx={{
									fontWeight: 500,
									fontSize: "12px",
									textTransform: "none",
									marginBottom: objectSpacing,
									color: theme.palette.grey[600]
								}}
								endIcon={
									<ChevronDownIcon
										width={12}
										height={12}
										className={expanded ? "rotate-180" : ""}
									/>
								}
							>
								{expanded ? `${t("common:buttons.lessSocialLogins")}` : `${t("common:buttons.moreSocialLogins")}`}
							</Button>
						</Box>
						<Typography
							className="LegalNotice"
							color={theme.palette.grey[800]}
						>
							{t("bySigninUp")} <a href={HashLinks.privacyPolicy}>{t("privacyPolicy")}</a>
							{", "}
							{t("and")} <a href={HashLinks.termsOfService}>{t("termsOfService")}</a>.
						</Typography>
					</Container>
				</Grid>
			</Grid>
		</React.Suspense>
	);
}

export function SubscribeCongratulationPage() {
	React.useEffect(() => {
		trackEvent(Events.SubscribedToMetaintroConversion, {
			category: "Subscribe",
			action: "Subscribe",
			label: "Subscribe"
		});
	}, []);

	return (
		<SubscribePageProvider>
			<SubscribePage />
			<React.Suspense fallback={<div style={{ height: "100vh", width: "100vw" }} />}>
				<PagePartials.Congratulations />
			</React.Suspense>
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
