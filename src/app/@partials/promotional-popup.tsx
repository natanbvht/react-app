import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
// import { usePostHog } from "posthog-js/react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
// import { metaintroUpgrade } from "../../utils/apiV1";
// import { TrackingEvents } from "../../utils/tracking";
import DialogContent from "@mui/material/DialogContent";
import { Pages, HashLinks } from "../../config";
import { getCurrentLanguage } from "../../i18n";
import { trackEvent, Events } from "../../services/analytics";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2)
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1)
	},
	"& .MuiDialog-paper": {
		backgroundColor: "#394AB9",
		color: "#fff"
	}
}));

export default function CustomizedDialogs() {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();
	const currentLanguage = getCurrentLanguage();
	const [open, setOpen] = React.useState(false);
	const [shouldNavigate, setShouldNavigate] = React.useState(false);

	const togglePopup = () => setOpen(!open);

	const handleUpgrade = () => {
		togglePopup();
		setShouldNavigate(true);
	};

	React.useEffect(() => {
		if (location.pathname.replace(currentLanguage.path, "") !== Pages.upgrade) {
			togglePopup();
		} else if (location.hash === HashLinks.promoPopup) {
			navigate(Pages.upgrade, { replace: true });
		}
	}, [location.pathname, currentLanguage.path]);

	React.useEffect(() => {
		if (!open && shouldNavigate) {
			navigate(Pages.upgrade);
			setShouldNavigate(false);
		}
	}, [open, shouldNavigate, navigate]);

	React.useEffect(() => {
		trackEvent(Events.ViewedPromoPopup);
	}, []);

	return (
		<BootstrapDialog
			fullWidth
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="customized-dialog-title"
			PaperProps={{
				sx: {
					borderRadius: "8px",
					overflowY: "unset",
					background: "linear-gradient(135deg, #394AB9 30%, #7F53AC 80%)",
					position: "relative"
				}
			}}
		>
			<DialogContent
				dividers
				sx={{
					display: "flex", // Added for Flexbox
					flexDirection: "column", // Stack children vertically
					alignItems: "center", // Center children horizontally
					justifyContent: "center", // Center children vertically
					position: "relative",
					zIndex: 1,
					border: "2px solid white",
					borderRadius: "8px",
					margin: "20px",
					padding: "20px",
					height: "calc(100% - 40px)", // Adjust height based on margin and padding
					"&::before": {
						content: '"🚀"',
						position: "absolute",
						fontSize: "4rem",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						opacity: 0.2,
						zIndex: -1,
						animation: "float 6s ease-in-out infinite",
						"@keyframes float": {
							"0%, 100%": {
								transform: "translate(-50%, -50%) translateY(0)"
							},
							"50%": { transform: "translate(-50%, -50%) translateY(-20px)" }
						}
					}
				}}
			>
				<Typography
					variant="h4"
					gutterBottom
					sx={{
						fontWeight: "bold",
						color: "white",
						textAlign: "center",
						fontSize: "1.025rem"
					}}
				>
					{t("messages.upgradeYourExperience")}
				</Typography>
				<Typography
					gutterBottom
					sx={{
						color: "white",
						textAlign: "center",
						fontSize: "12px",
						fontWeight: 600
					}}
				>
					{t("messages.boostYourCareer")}
				</Typography>

				{/* Upgrade Button */}
				<Button
					variant="contained"
					onClick={handleUpgrade}
					sx={{
						textTransform: "none",
						bgcolor: "secondary.main",
						color: "white",
						borderRadius: "8px",
						px: 4,
						mt: 1,
						boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
						transition: "transform 0.2s, box-shadow 0.2s",
						"&:hover": {
							transform: "translateY(-2px)",
							boxShadow: "0px 12px 20px rgba(0,0,0,0.3)",
							bgcolor: "secondary.dark"
						}
					}}
				>
					{t("buttons.upgradeNow")}
				</Button>

				{/* Maybe Later Text */}
				<Typography
					sx={{
						mt: 1,
						color: "rgba(255, 255, 255, 0.7)",
						textAlign: "center",
						cursor: "pointer",
						fontSize: "0.75rem",
						"&:hover": {
							textDecoration: "underline"
						}
					}}
					onClick={togglePopup}
				>
					{t("buttons.maybeLater")}
				</Typography>
			</DialogContent>
		</BootstrapDialog>
	);
}
