import { lazy } from "react";
import Box from "@mui/material/Box";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
// import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
// import { usePostHog } from "posthog-js/react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Stripe, getSessionId } from "../../config";
import StripePricingTable from "../../components/StripePricingTable/StripePricingTable";

// import useMediaQuery from "@mui/material/useMediaQuery";
// import { usePageView } from "../../../context/PageView";
// import { TrackingEvents } from "../../../utils/tracking";
// import { getSessionID, SEO } from "../../../utils/config";
// import {
//   metaintroBlogUrl,
//   metaintroFreeConsultationUrl,
// } from "../../../utils/apiV1";

const Testimonials = lazy(() => import("./partials/testimonials"));

interface TrustedBy {
	name: string;
	logo: string;
	// eslint-disable-next-line react/no-unused-prop-types
	link: string;
}

const typoStyleHeader = {
	fontWeight: 600,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	mt: 1
};

const trustedPartners: TrustedBy[] = [
	{
		name: "Aave",
		logo: "/assets/images/partners/aave.svg",
		link: "https://metaintro.ai"
	},
	{
		name: "Brownstone",
		logo: "/assets/images/partners/brownstone.svg",
		link: "https://aijobslist.com"
	},
	{
		name: "Druid",
		logo: "/assets/images/partners/druid.svg",
		link: "https://aijobslist.com"
	},
	{
		name: "Near",
		logo: "/assets/images/partners/near.svg",
		link: "https://aijobslist.com"
	},
	{
		name: "Untapped",
		logo: "/assets/images/partners/untapped.svg",
		link: "https://aijobslist.com"
	},
	{
		name: "Alchemy",
		logo: "/assets/images/partners/alchemy.svg",
		link: "https://aijobslist.com"
	}
];

const avatars = [
	"/assets/images/avatar-users/mark.jpg",
	"/assets/images/avatar-users/may.jpg",
	"/assets/images/avatar-users/tom.jpg",
	"/assets/images/avatar-users/mia.jpg",
	"/assets/images/avatar-users/sam.jpg",
	"/assets/images/avatar-users/zoe.jpg"
];

function Partner({ logo, name }: TrustedBy) {
	return (
		<Grid
			item
			xs={2}
			sm={2}
			lg={2}
			justifyItems="center"
			alignContent="center"
			alignItems="center"
			alignSelf="center"
		>
			<Avatar
				sx={{
					filter: "grayscale(100%)",
					width: "100%",
					maxWidth: "144px",
					height: "auto",
					margin: "0 auto",
					borderRadius: 0,
					display: "flex",
					alignItems: "center"
				}}
				alt={name}
				src={logo}
				aria-label={name}
			/>
		</Grid>
	);
}

function Upgrade() {
	// const posthog = usePostHog();
	// const { extLink, formData } = usePageView();
	const { t } = useTranslation(["upgrade", "common"]);
	const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
	return (
		<>
			<Helmet>
				{/* <title>{SEO.titlePretfix + SEO.delimeter + t("seo.title")}</title> */}
				<meta
					name="description"
					content={t("seo.description")}
				/>
				<meta
					name="keywords"
					content={t("seo.keywords")}
				/>
				<meta
					property="og:title"
					content={t("seo.title")}
				/>
				<meta
					property="og:description"
					content={t("seo.description")}
				/>
				<meta
					property="og:url"
					content={window.location.href}
				/>
			</Helmet>
			<Box
				sx={{
					display: "flex",
					background: "#fff",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center"
				}}
			>
				<Container
					maxWidth="lg"
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<Box
						sx={{
							width: "100%",
							textAlign: "center",
							padding: 1,
							mt: 2,
							mb: 2
						}}
					>
						<Typography
							variant={isMobile ? "h3" : "h2"}
							sx={typoStyleHeader}
						>
							{t("upgradeToPremium")}
						</Typography>

						<Stack
							direction="column"
							alignItems="center"
							spacing={2}
						>
							<AvatarGroup max={isMobile ? 3 : 6}>
								{avatars.map((avatar, index) => (
									<Avatar
										key={index}
										alt={avatar}
										src={avatar}
									/>
								))}
							</AvatarGroup>
							<Typography variant="h5">{isMobile ? t("trustedBy500kShort") : t("trustedBy500k")}</Typography>
							<Typography
								variant="body1"
								maxWidth={400}
							>
								{t("accelerateYourCareer")}
							</Typography>
						</Stack>
					</Box>
					<Container
						sx={{
							textAlign: "center",
							p: isMobile ? "0 0 2.6rem 0" : "0 0 4.5rem 0"
						}}
					>
						{/* <StripePricingTable email={formData?.email} /> */}
						<StripePricingTable
							email="sd@gmai.com"
							referenceId={getSessionId()}
							publishableKey={Stripe.publishableKey}
							pricingTableId={Stripe.pricingTableId}
						/>
						<Button
							fullWidth
							// component={Link}
							// to={extLink(metaintroBlogUrl)}
							variant={isMobile ? "contained" : "outlined"}
							// onClick={() => posthog.capture(TrackingEvents.ClickedMaybeLater)}
							sx={{
								textTransform: "none",
								height: "44px",
								maxWidth: isMobile ? "278px" : "100%"
							}}
						>
							{`${t("common:buttons.maybeLater")}`}
						</Button>
					</Container>
				</Container>
				<Helmet>
					<script
						async
						src="https://js.stripe.com/v3/pricing-table.js"
					/>
				</Helmet>
			</Box>

			<Testimonials />

			<Box
				sx={{
					backgroundColor: "#f1f5f9",
					p: isMobile ? "2.6rem 0" : "4.5rem 0"
				}}
			>
				<Container maxWidth="lg">
					<Typography
						variant="h3"
						align="left"
						sx={{
							fontWeight: 800
						}}
					>
						{t("frequentlyAskedQuestions")}
					</Typography>
					<Typography
						variant="body1"
						align="left"
						color="text.secondary"
						sx={{
							fontWeight: 400,
							mt: 1
						}}
					>
						{t("hereAreTheMostFrequentlyAskedQuestions")}
					</Typography>

					<Box sx={{ mt: 6 }}>
						<Grid
							container
							spacing={4}
						>
							<Grid
								item
								xs={12}
								sm={6}
								md={6}
							>
								<Typography
									variant="h6"
									sx={{ fontWeight: 800 }}
								>
									{t("metaintroRecruitmentTeamQuery")}
								</Typography>
								<Typography
									variant="caption"
									color="text.secondary"
								>
									{t("metaintroRecruitmentTeamResponse")}
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								md={6}
							>
								<Typography
									variant="h6"
									sx={{ fontWeight: 800 }}
								>
									{t("metaintroJobOpportunitiesQuery")}
								</Typography>
								<Typography
									variant="caption"
									color="text.secondary"
								>
									{t("metaintroJobOpportunitiesResponse")}
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								md={6}
							>
								<Typography
									variant="h6"
									sx={{ fontWeight: 800 }}
								>
									{t("eliteNetworkingAccessBenefitQuery")}
								</Typography>
								<Typography
									variant="caption"
									color="text.secondary"
								>
									{t("eliteNetworkingAccessBenefitResponse")}
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								md={6}
							>
								<Typography
									variant="h6"
									sx={{ fontWeight: 800 }}
								>
									{t("metaintroSubscriptionCancellationQuery")}
								</Typography>
								<Typography
									variant="caption"
									color="text.secondary"
								>
									{t("metaintroSubscriptionCancellationResponse")}
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>

			<Box
				sx={{
					color: "#fff",
					padding: "4.5rem 0",
					textAlign: "center",
					backgroundColor: "#1e293b"
				}}
			>
				<Container maxWidth="lg">
					<Typography
						variant="h3"
						align="center"
						sx={{
							fontWeight: 800
						}}
					>
						{t("notSureWhereToStart")}
					</Typography>
					<Typography
						variant="h3"
						align="center"
						sx={{
							mt: 1,
							color: "#6b7280",
							fontWeight: 800
						}}
					>
						{t("scheduleConsultation")}
					</Typography>
					<Button
						id="book-now"
						// component={Link}
						variant="outlined"
						aria-label={t("common:buttons.bookNow")}
						// onClick={() => posthog.capture(TrackingEvents.BookFreeConsultation)}
						// to={`${extLink(metaintroFreeConsultationUrl)}&email=${formData?.email}&name=${formData?.name}`}
						sx={{
							mt: 2,
							height: "48px",
							fontSize: "1rem",
							color: "#fff",
							borderColor: "#fff",
							textTransform: "none",
							minWidth: "220px",
							borderRadius: "22px",
							":hover": {
								color: "#394ab9",
								backgroundColor: "#fff"
							}
						}}
					>
						{t("common:buttons.bookNow")}
					</Button>
				</Container>
			</Box>

			<Box
				sx={{
					backgroundColor: "#fff"
					// p: isMobile ? "2.6rem 0" : "4.5rem 0"
				}}
			>
				<Container maxWidth="lg">
					<Grid
						container
						alignItems="center"
						justifyContent="center"
						sx={{ mt: 2 }}
					>
						{trustedPartners.map((partner, index) => (
							<Partner
								key={index}
								{...partner}
							/>
						))}
					</Grid>
				</Container>
			</Box>
		</>
	);
}

export default Upgrade;
