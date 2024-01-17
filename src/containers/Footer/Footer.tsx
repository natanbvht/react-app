import "./Footer.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LinksColumn from "./LinksColumn/LinksColumn";
import MetaintroIcon from "../../components/Icons/Metaintro";
import { FooterLinks } from "./types.d";
import { Links } from "../../utils/config";

const links: FooterLinks = {
	community: {
		title: "footer.community",
		links: [
			{ name: "footer.events", url: "#events-subscribe" },
			{ name: "footer.wallOfLove", url: Links.wallOfLove },
			{ name: "footer.truestAndSafety", url: Links.truestAndSafety }
		]
	},
	explore: {
		title: "footer.explore",
		links: [
			{ name: "footer.resources", url: Links.resources },
			{ name: "footer.newsletter", url: Links.newsletter },
			{ name: "footer.workWithUs", url: Links.advertise }
		]
	},
	jobs: {
		title: "footer.jobs",
		links: [
			{ name: "footer.aiJobs", url: "#job-board" },
			{ name: "footer.web3Jobs", url: "#salary-calculator" },
			{ name: "footer.remoteJobs", url: "#developer-survey" }
		]
	},
	company: {
		title: "footer.company",
		links: [
			{ name: "footer.about", url: Links.about },
			{ name: "footer.support", url: Links.support },
			{ name: "footer.termsOfService", url: Links.terms }
		]
	}
};

function Footer() {
	const { t } = useTranslation();

	return (
		<footer>
			<Container
				maxWidth="lg"
				className="Footer"
			>
				<Grid
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
					>
						<MetaintroIcon
							height={32}
							width={150}
							className="FooterLogo"
						/>
						<Typography
							fontWeight={600}
							className="FooterTagline"
						>
							{t("footer.professionalResumeWallet")}
						</Typography>
						<Typography
							fontWeight={400}
							className="FooterDescription"
						>
							{t("footer.join500k")}
						</Typography>
					</Grid>
					{Object.keys(links).map((key) => (
						<LinksColumn
							key={key}
							title={links[key].title}
							links={links[key].links}
						/>
					))}
				</Grid>
			</Container>
			<Box className="BottomFooter">
				<Container maxWidth="lg">
					<Grid
						container
						rowSpacing={1}
						direction="row"
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					>
						<Grid
							item
							xs={4}
							sm={4}
							md={4}
						>
							<Typography
								p={0}
								variant="body2"
								sx={{ opacity: 0.8 }}
								color="text.secondary"
								className="FooterAllRights"
							>
								© {new Date().getFullYear()} {t("footer.arr")}
							</Typography>
						</Grid>
						<Grid
							item
							xs={6}
							sm={6}
							md={8}
							justifyContent="flex-end"
							display="flex"
						>
							<List sx={{ display: "flex", flexDirection: "row", padding: 0 }}>
								<ListItem sx={{ padding: 0 }}>
									<Link
										to="#terms"
										className="QuickLink"
									>
										Cookie
									</Link>
								</ListItem>
								<ListItem sx={{ padding: 0 }}>
									<Link
										to="#terms"
										className="QuickLink"
									>
										Terms
									</Link>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</footer>
	);
}

export default Footer;
