/* eslint-disable no-console */
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import OnPageSeo from "../../components/OnPageSeo/OnPageSeo";
import PageLoader from "../../components/PageLoader/PageLoader";
import { HashLinks, Keys, Links, Pages, Seo } from "../../config";
import { SubscribePageFormData } from "../../context/SubscribePage/SubscribePage";
import {
	SubscribeRecommendationsData,
	getRecommendations,
	subscribeRecommendations
} from /* webpackChunkName: "apiV1" */ "../../services/apiV1";
import { Recommendation } from "../../types.d";
import "./page.scss";
import { trackEvent, Events } from "../../services/analytics";

const LoadingButton = React.lazy(() => import(/* webpackChunkName: "muilb" */ "@mui/lab/LoadingButton"));

interface RecommendationItemProps extends Recommendation {
	selectedRecommendations?: string[];
	handleSwitchChange: (recommendationId: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RecommendationItem({
	_id,
	sub,
	name,
	logo,
	sponsored,
	description,
	selectedRecommendations,
	handleSwitchChange
}: RecommendationItemProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	/**
	 * @Accessibility
	 * @description support toggle switch with spacebar/enter key
	 * @link https://www.w3.org/TR/wai-aria-practices-1.1/#switch
	 */
	const handleKeyDown = (e: React.KeyboardEvent, recommendationId: string) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSwitchChange(recommendationId)({
				target: { checked: !selectedRecommendations?.includes(recommendationId) }
			} as unknown as React.ChangeEvent<HTMLInputElement>);
		}
	};

	return (
		<Grid
			item
			xs={12}
			lg={12}
			key={`item-${_id}-${sub}`}
		>
			<Card
				key={`card-${_id}-${sub}`}
				variant="outlined"
				sx={{
					marginRight: isMobile ? 0 : "inherit",
					marginBottom: isMobile ? 0 : "inherit"
				}}
			>
				<CardHeader
					sx={{
						p: isMobile ? "12px" : 3,
						paddingBottom: "0",
						textAlign: "left"
					}}
					avatar={
						<Avatar
							src={logo}
							alt={name}
						/>
					}
					title={
						<Typography
							variant="h6"
							component="div"
							sx={{ fontWeight: "bold" }}
						>
							{name}
						</Typography>
					}
					subheader={
						<Typography
							variant="body2"
							sx={{
								fontWeight: "500",
								color: "#a5adb7",
								fontSize: "0.75rem"
							}}
						>
							{sponsored ? "Sponsored" : ""}
						</Typography>
					}
					action={
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										tabIndex={0}
										sx={{ ml: 1 }}
										aria-label="Enable Recommendation"
										onChange={handleSwitchChange(sub)}
										onKeyDown={(e) => handleKeyDown(e, sub)}
										checked={selectedRecommendations?.includes(sub)}
									/>
								}
								label=""
							/>
						</FormGroup>
					}
				/>
				<CardContent
					sx={{
						textAlign: "left",
						padding: isMobile ? "12px" : 3,
						"&:last-child": {
							paddingBottom: isMobile ? "12px" : 3
						}
					}}
				>
					{isMobile && description.length > 132 ? (
						<Tooltip title={description}>
							<Typography
								variant="body2"
								color="text.secondary"
							>
								{`${description.substring(0, 132)}...`}
							</Typography>
						</Tooltip>
					) : (
						<Typography
							variant="body2"
							color="text.secondary"
						>
							{description}
						</Typography>
					)}
				</CardContent>
			</Card>
		</Grid>
	);
}

function RecommendationsPage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation(["recommendations", "common"]);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const [recommendations, setRecommendations] = React.useState<Recommendation[]>(
		() => JSON.parse(sessionStorage.getItem(Keys.recommendations) || "[]") as Recommendation[]
	);
	const [selectedRecommendations, setSelectedRecommendations] = React.useState<string[]>(() => {
		const cachedRecs = sessionStorage.getItem(Keys.recommendations);
		if (!cachedRecs || cachedRecs.length === 0) return [];
		const selectedRecs = JSON.parse(cachedRecs) as Recommendation[];
		return selectedRecs.map((rec: Recommendation) => rec.sub);
	});

	const handleSwitchChange = (recommendationId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		if (isChecked && !selectedRecommendations?.includes(recommendationId)) {
			setSelectedRecommendations((prevRecs) => {
				if (prevRecs) {
					return [...prevRecs, recommendationId];
				}
				return [recommendationId];
			});
		}
		if (!isChecked && selectedRecommendations?.includes(recommendationId)) {
			setSelectedRecommendations((prevRecs) => prevRecs?.filter((prevRec) => prevRec !== recommendationId));
		}
	};

	const handleToggleAll = () => {
		if (selectedRecommendations?.length === recommendations.length) {
			setSelectedRecommendations([]);
			//   posthog.capture(TrackingEvents.ClickedDeselectAllAffiliates);
		} else {
			const allRecommendationIds = recommendations.map((recommendation) => recommendation.sub);
			//   posthog.capture(TrackingEvents.ClickedSelectAllAffiliates);
			setSelectedRecommendations(allRecommendationIds);
		}
	};

	const handleContinue = async () => {
		try {
			const subscribeSession = JSON.parse(
				sessionStorage.getItem(Keys.subscribe) || "{}"
			) as SubscribePageFormData | null;

			if (!subscribeSession?.email) {
				navigate(HashLinks.reqInfo);
				return;
			}

			setIsSubmitting(true);
			if (selectedRecommendations.length > 0 && subscribeSession?.email) {
				const body: SubscribeRecommendationsData[] = [
					{
						email: subscribeSession.email,
						sub: selectedRecommendations.join(",")
					}
				];
				await subscribeRecommendations(body);
				setIsSubmitting(false);
				window.location.href = Links.metaintro;
			} else {
				console.debug("No recommendations selected or email not found in session");
				console.debug("selectedRecommendations", selectedRecommendations);
				console.debug("subscribeSession", subscribeSession);
				// report error to analytics
				//   posthog.capture(TrackingEvents.AffiliateError, {
				//     errorCode: errCode,
				//     message: errMessage
				//   });
				window.location.href = Links.metaintro;
			}
			//   posthog.capture(TrackingEvents.ClickedContinue);
		} catch (err: unknown) {
			console.error(err);
			//   posthog.capture(TrackingEvents.AffiliateError, {
			//     errorCode: errCode,
			//     message: errMessage
			//   });
			// regardless of error, redirect to metaintro
			window.location.href = Links.metaintro;
		}
	};

	React.useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				// TODO: implement caching freshness check
				const cachedRecommendations = sessionStorage.getItem(Keys.recommendations) as Recommendation[] | null;
				if (!Array.isArray(cachedRecommendations) || cachedRecommendations.length === 0) {
					const recommendations = await getRecommendations();
					if (Array.isArray(recommendations) && recommendations.length > 0) {
						setRecommendations(recommendations);
						setSelectedRecommendations(recommendations.map((res: Recommendation) => res.sub));
						import(/* webpackChunkName: "posthog" */ "../../services/analytics").then(({ trackEvent, Events }) => {
							recommendations.forEach((rec: Recommendation) => {
								trackEvent(Events.ViewedAffiliate, { uuid: rec?._id, sub: rec?.sub, name: rec?.name });
							});
						});
					}
				} else {
					setSelectedRecommendations(cachedRecommendations.map((res: Recommendation) => res.sub));
					// Analytics: Track viewed recommendations (Impressions) for each recommendation
					import(/* webpackChunkName: "posthog" */ "../../services/analytics").then(({ trackEvent, Events }) => {
						cachedRecommendations.forEach((rec: Recommendation) => {
							trackEvent(Events.ViewedAffiliate, { uuid: rec?._id, sub: rec?.sub, name: rec?.name });
						});
					});
				}
			} catch (err: unknown) {
				import(/* webpackChunkName: "posthog" */ "../../services/analytics").then(({ trackEvent, Events }) => {
					trackEvent(Events.AffiliateError, { err });
				});
				navigate(Pages.upgrade);
			}
		};
		fetchRecommendations();
	}, []);

	if (recommendations.length > 0) {
		return (
			<React.Suspense fallback={<PageLoader />}>
				<OnPageSeo
					keywords={t("seo.keywords")}
					description={t("seo.description")}
					title={Seo.titlePrefix + Seo.delimiter + t("seo.title")}
				/>
				{isSubmitting && <PageLoader />}
				<Container
					id="recommendations"
					sx={{ paddingTop: theme.spacing(2), paddingBottom: theme.spacing(2) }}
				>
					<Grid
						container
						direction="row"
						spacing={theme.spacing(2)}
					>
						<Grid
							item
							xs={12}
							lg={12}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								position: "sticky",
								top: 0,
								backgroundColor: "inherit"
							}}
						>
							<Typography
								variant="h4"
								component="h4"
								fontSize="1.125rem"
								sx={{ fontWeight: "bold", lineHeight: "1.5rem" }}
							>
								{t("youMightAlsoLike")}
							</Typography>
							<React.Suspense fallback={<div />}>
								<Button
									type="button"
									variant="text"
									onClick={handleToggleAll}
									sx={{
										cursor: "pointer",
										textAlign: "right",
										textTransform: "none",
										textDecoration: "underline",
										color: theme.palette.grey[800]
									}}
								>
									{selectedRecommendations.length === recommendations.length
										? t("common:buttons.selectNone")
										: t("common:buttons.selectAll")}
								</Button>
							</React.Suspense>
						</Grid>
						{recommendations.map((recommendation: Recommendation) => (
							<RecommendationItem
								{...recommendation}
								handleSwitchChange={handleSwitchChange}
								key={`recommendation-${recommendation._id}`}
								selectedRecommendations={selectedRecommendations}
							/>
						))}
						{!isMobile && (
							<Grid
								item
								flex={1}
							>
								<LoadingButton
									fullWidth
									tabIndex={0}
									role="button"
									type="button"
									color="primary"
									variant="contained"
									loading={isSubmitting}
									onClick={handleContinue}
									aria-label={
										selectedRecommendations.length > 0
											? t("common:buttons.continue")
											: t("common:buttons.selectRecommendations")
									}
									sx={{ marginTop: theme.spacing(1), textTransform: "none" }}
								>
									{selectedRecommendations.length > 0
										? t("common:buttons.continue")
										: t("common:buttons.selectRecommendations")}
								</LoadingButton>
								<Button
									fullWidth
									role="link"
									tabIndex={0}
									type="button"
									color="primary"
									component={Link}
									to={Pages.upgrade}
									variant="outlined"
									onClick={() => trackEvent(Events.ClickedMetaintroPro)}
									sx={{ marginTop: theme.spacing(1), textTransform: "none" }}
								>
									{t("common:buttons.metaintroPro")}
								</Button>
								<Button
									fullWidth
									tabIndex={0}
									type="button"
									color="primary"
									variant="text"
									component={Link}
									to={Links.metaintro}
									onClick={() => trackEvent(Events.ClickedMaybeLater)}
									sx={{ marginTop: theme.spacing(1), textTransform: "none" }}
								>
									{t("common:buttons.maybeLater")}
								</Button>
							</Grid>
						)}
					</Grid>
				</Container>
				{isMobile && (
					<AppBar
						color="inherit"
						position="fixed"
						sx={{ top: "auto", bottom: 0, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
					>
						<Container
							sx={{
								paddingTop: theme.spacing(2),
								paddingBottom: theme.spacing(2)
							}}
						>
							<LoadingButton
								fullWidth
								tabIndex={0}
								role="button"
								type="button"
								color="primary"
								variant="contained"
								loading={isSubmitting}
								onClick={handleContinue}
								sx={{ textTransform: "none" }}
								aria-label={
									selectedRecommendations.length > 0
										? t("common:buttons.continue")
										: t("common:buttons.selectRecommendations")
								}
							>
								{selectedRecommendations.length > 0
									? t("common:buttons.continue")
									: t("common:buttons.selectRecommendations")}
							</LoadingButton>
							<Button
								fullWidth
								role="link"
								tabIndex={0}
								type="button"
								color="primary"
								component={Link}
								to={Pages.upgrade}
								variant="outlined"
								onClick={() => trackEvent(Events.ClickedMetaintroPro)}
								sx={{ marginTop: theme.spacing(2), textTransform: "none" }}
							>
								{t("common:buttons.metaintroPro")}
							</Button>
							<Button
								fullWidth
								tabIndex={0}
								type="button"
								color="primary"
								variant="text"
								component={Link}
								to={Links.metaintro}
								onClick={() => trackEvent(Events.ClickedMaybeLater)}
								sx={{ marginTop: theme.spacing(2), textTransform: "none" }}
							>
								{t("common:buttons.maybeLater")}
							</Button>
						</Container>
					</AppBar>
				)}
			</React.Suspense>
		);
	}
	return <PageLoader />;
}

export default React.memo(RecommendationsPage);
