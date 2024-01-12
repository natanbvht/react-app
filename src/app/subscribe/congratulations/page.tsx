import "./page.scss";
import React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import DialogContent from "@mui/material/DialogContent";
import { languages } from "../../../context/Language/Language";
import AchivementIcon from "../../../components/Icons/Achivement";

function Congratulations() {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation(["subscribe", "common"]);
	const currentLanguage = languages.find((lang) => lang.id === i18n.language);

	const finalUrl = `${currentLanguage?.path}/subscribe/recommendations`;

	return (
		<>
			<Dialog
				open
				fullWidth
				maxWidth="xs"
				onClose={() => navigate(finalUrl)}
				aria-labelledby="dialog-congratulations"
			>
				<DialogContent>
					<Box
						className="CongratulationImageWrapper"
						mb={2}
					>
						<AchivementIcon />
					</Box>
					<Typography
						variant="h4"
						component="h4"
						fontWeight={700}
						align="center"
						letterSpacing={0}
						gutterBottom
					>
						{t("messages.congratulations")}
					</Typography>
					<Typography
						align="center"
						component="p"
						variant="body1"
						fontWeight={400}
						letterSpacing={0}
						className="CongratulationMessage"
					>
						You've subscribed! Please check your email to confirm your subscription.
					</Typography>
					<Button
						fullWidth
						to={finalUrl}
						component={Link}
						variant="contained"
						className="GetStartedButton"
					>
						Get Started Here
					</Button>
				</DialogContent>
			</Dialog>
			<div className="Fireworks">
				<div className="before" />
				<div className="after" />
			</div>
		</>
	);
}

export default Congratulations;
