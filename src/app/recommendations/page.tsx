import React from "react";
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
// import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Seo, Keys } from "../../services/config";
import OnPageSeo from "../../components/OnPageSeo/OnPageSeo";
import { getRecommendations, Recommendation } from "../../services/apiV1" /* webpackChunkName: "apiV1" */;

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

	// Add keyboard support for toggling the switch for accessibility
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
						padding: isMobile ? "12px" : 3, // Smaller custom padding
						"&:last-child": {
							paddingBottom: isMobile ? "12px" : 3 // Remove bottom padding for the last child
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

	React.useEffect(() => {
		const fetchRecommendations = async () => {
			// TODO: implement caching freshness check
			const cachedRecommendations = sessionStorage.getItem(Keys.recommendations) as Recommendation[] | null;
			if (!cachedRecommendations) {
				try {
					const recommendations = await getRecommendations();
					if (recommendations && Array.isArray(recommendations)) {
						setRecommendations(recommendations);
					}
				} catch (err: unknown) {
					throw new Error(err as string);
				}
			}
		};
		fetchRecommendations();
	}, []);

	const objSpace = isMobile ? 0 : theme.spacing(3);

	return (
		<React.Suspense fallback={<div style={{ minHeight: "100vh", width: "100vw" }} />}>
			<OnPageSeo
				keywords={t("seo.keywords")}
				description={t("seo.description")}
				title={Seo.titlePretfix + Seo.delimeter + t("seo.title")}
			/>
			<Container sx={{ paddingTop: objSpace, paddingBottom: objSpace }}>
				<Grid
					container
					direction="row"
					spacing={objSpace || theme.spacing(2)}
				>
					<Grid
						item
						xs={12}
						lg={12}
						sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
					>
						<Typography
							variant="h4"
							component="h4"
							sx={{ fontWeight: "bold" }}
							fontSize={isMobile ? "1.125rem" : "1.5rem"}
						>
							You might also like
						</Typography>
						<Button
							type="button"
							variant="text"
							onClick={handleToggleAll}
							sx={{
								padding: 0,
								cursor: "pointer",
								textAlign: "right",
								textTransform: "none",
								textDecoration: "underline",
								color: theme.palette.grey[800]
							}}
						>
							{selectedRecommendations && selectedRecommendations.length === recommendations?.length
								? "Deselect All"
								: "Select All"}
						</Button>
					</Grid>
					{recommendations &&
						recommendations?.map((recommendation: Recommendation) => (
							<RecommendationItem
								{...recommendation}
								handleSwitchChange={handleSwitchChange}
								key={`recommendation-${recommendation._id}`}
								selectedRecommendations={selectedRecommendations}
							/>
						))}
				</Grid>
			</Container>
		</React.Suspense>
	);
}

export default React.memo(RecommendationsPage);
