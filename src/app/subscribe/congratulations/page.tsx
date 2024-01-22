import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import AchivementIcon from "../../../components/Icons/Achivement";
import { languages } from "../../../i18n";
import { Pages } from "../../../services/config";
import "./page.scss";

function Congratulations() {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation(["subscribe", "common"]);
	const currentLanguage = languages.find((lang) => lang.id === i18n.language);

	const objSpacing = 2;
	const recommendationsPagePath = `${currentLanguage?.path}${Pages.recommendations}`;

	return (
		<Dialog
			open
			fullWidth
			maxWidth="xs"
			aria-labelledby="dialog-congratulations"
			sx={{ maxWidth: 440, margin: "0 auto" }}
			onClose={() => navigate(recommendationsPagePath)}
		>
			<DialogContent>
				<Box
					marginTop={objSpacing}
					className="CongratulationImageWrapper"
				>
					<AchivementIcon />
				</Box>
				<Typography
					gutterBottom
					variant="h4"
					component="h4"
					align="center"
					fontWeight={700}
					letterSpacing={0}
					marginTop={objSpacing / 2}
				>
					{t("messages.congratulations")}
				</Typography>
				<Typography
					gutterBottom
					component="p"
					align="center"
					variant="body1"
					fontWeight={400}
					letterSpacing={0}
					className="CongratulationMessage"
				>
					{t("messages.youveSubscribed")}
				</Typography>
				<Button
					fullWidth
					component={Link}
					variant="contained"
					sx={{ zIndex: 9999 }}
					to={recommendationsPagePath}
					className="GetStartedButton"
				>
					{t("cta.getStartedHere")}
				</Button>
				<Typography
					component="p"
					variant="body2"
					fontWeight={400}
					textAlign="center"
					className="CongratulationNotice"
				>
					*{t("messages.pleaseCheckYourEmail")}
				</Typography>
			</DialogContent>
			<div className="Fireworks">
				<div className="before" />
				<div className="after" />
			</div>
		</Dialog>
	);
}

export default Congratulations;
