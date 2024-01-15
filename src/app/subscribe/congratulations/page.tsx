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

	const objSpacing = 2;
	const finalUrl = `${currentLanguage?.path}/subscribe/recommendations`;

	return (
		<Dialog
			open
			fullWidth
			maxWidth="xs"
			onClose={() => navigate(finalUrl)}
			aria-labelledby="dialog-congratulations"
			sx={{ maxWidth: 440, margin: "0 auto" }}
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
					You've subscribed! Visit our website to explore the best jobs in the Web3 and A.I. space.
				</Typography>
				<Button
					fullWidth
					to={finalUrl}
					component={Link}
					variant="contained"
					sx={{ zIndex: 9999 }}
					className="GetStartedButton"
				>
					Get Started Here
				</Button>
				<Typography
					component="p"
					variant="body2"
					fontWeight={400}
					textAlign="center"
					className="CongratulationNotice"
				>
					*Please check your email to confirm your subscription.
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
