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
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OnPageSeo from "../../components/OnPageSeo/OnPageSeo";
import { Recommendation, getRecommendations } from "../../services/apiV1" /* webpackChunkName: "apiV1" */;
import { Keys, Seo, Pages, Links } from "../../services/config";

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

	// Accessibility: Add keyboard support for toggling the switch with the spacebar/enter key
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
										checked={selectedRecommendations && selectedRecommendations.includes(sub)}
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
	const [selectedRecommendations, setSelectedRecommendations] = React.useState<string[]>([]);
	const [recommendations, setRecommendations] = React.useState<Recommendation[]>(
		() => JSON.parse(sessionStorage.getItem(Keys.recommendations) || "[]") as Recommendation[]
	);

	const handleSwitchChange = (recommendationId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;

		if (isChecked && !selectedRecommendations?.includes(recommendationId)) {
			setSelectedRecommendations((prevSelectedRecommendations) => {
				if (prevSelectedRecommendations) {
					return [...prevSelectedRecommendations, recommendationId];
				}
				return [recommendationId];
			});
		}

		if (!isChecked && selectedRecommendations?.includes(recommendationId)) {
			setSelectedRecommendations((prevSelectedRecommendations) =>
				prevSelectedRecommendations?.filter(
					(prevSelectedRecommendation) => prevSelectedRecommendation !== recommendationId
				)
			);
		}
	};

	const handleToggleAll = () => {
		if (selectedRecommendations?.length === recommendations?.length) {
			setSelectedRecommendations([]);
			//   posthog.capture(TrackingEvents.ClickedDeselectAllAffiliates);
		} else {
			const allRecommendationIds = recommendations?.map((recommendation) => recommendation.sub);
			//   posthog.capture(TrackingEvents.ClickedSelectAllAffiliates);
			setSelectedRecommendations(allRecommendationIds);
		}
	};

	const handleContinue = () => {
		//   posthog.capture(TrackingEvents.ClickedContinue);
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
					}
				} else {
					setSelectedRecommendations(cachedRecommendations.map((res: Recommendation) => res.sub));
				}
				// Analytics: Track viewed recommendations (Impressions)
				// recommendations?.forEach((rec: Recommendation) => {
				// 	posthog?.capture(TrackingEvents.ViewedAffiliate, {
				// 		uuid: rec?._id,
				// 		sub: rec?.sub,
				// 		name: rec?.name
				// 	});
				// });
			} catch (err: unknown) {
				// Analytics: Track error and redirect to upgrade page
				// posthog.capture(TrackingEvents.AffiliateError, {
				// 	errorCode: errCode,
				// 	message: errMessage
				// });
				navigate(Pages.upgrade);
			}
		};
		fetchRecommendations();
	}, []);

	if (recommendations && recommendations.length > 0) {
		return (
			<React.Suspense fallback={<div />}>
				<OnPageSeo
					keywords={t("seo.keywords")}
					description={t("seo.description")}
					title={Seo.titlePretfix + Seo.delimeter + t("seo.title")}
				/>
				<Container
					sx={{ paddingTop: theme.spacing(1), paddingBottom: theme.spacing(1), minHeight: "calc(100vh - 64px)" }}
				>
					<Grid
						container
						direction="row"
						spacing={theme.spacing(1)}
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
								sx={{ fontWeight: "bold" }}
								fontSize={isMobile ? "1.125rem" : "1.5rem"}
							>
								{t("youMightAlsoLike")}
							</Typography>
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
								{selectedRecommendations && selectedRecommendations.length === recommendations.length
									? t("common:buttons.selectNone")
									: t("common:buttons.selectAll")}
							</Button>
						</Grid>
						{recommendations.map((recommendation: Recommendation) => (
							<RecommendationItem
								{...recommendation}
								handleSwitchChange={handleSwitchChange}
								key={`recommendation-${recommendation._id}`}
								selectedRecommendations={selectedRecommendations}
							/>
						))}
						<Grid
							item
							flex={1}
						>
							<Button
								fullWidth
								tabIndex={0}
								role="button"
								type="button"
								color="primary"
								variant="contained"
								onClick={handleContinue}
								aria-label={t("common:buttons.continue")}
								sx={{ marginTop: theme.spacing(1), textTransform: "none" }}
							>
								{t("common:buttons.continue")}
							</Button>
							<Button
								fullWidth
								role="link"
								tabIndex={0}
								type="button"
								color="primary"
								component={Link}
								to={Pages.upgrade}
								variant="outlined"
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
								sx={{ marginTop: theme.spacing(1), textTransform: "none" }}
							>
								{t("common:buttons.maybeLater")}
							</Button>
						</Grid>
					</Grid>
				</Container>
			</React.Suspense>
		);
	}
	return null;
}

export default React.memo(RecommendationsPage);
