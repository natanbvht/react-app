import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MarkdownLoader from "../../components/MarkdownLoader/MarkdownLoader";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return (
		<Slide
			ref={ref}
			{...props}
			direction="up"
		/>
	);
});

interface LegalPoliciesProps extends DialogProps {
	src: string;
	title: string;
}

function LegalPolicies(props: LegalPoliciesProps) {
	const { src, title, scroll = "paper", open = true, ...modalProps } = props;
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation(["common"]);
	const [dialogOpen, setDialogOpen] = React.useState(open);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleClose = () => {
		setDialogOpen(false);
		navigate(-1);
	};

	return (
		<Dialog
			{...modalProps}
			scroll={scroll}
			open={dialogOpen}
			onClose={handleClose}
			aria-label="Legal Policies"
			maxWidth={isMobile ? "xl" : "md"}
			aria-describedby="legal-policies"
			TransitionComponent={modalProps.fullScreen ? Transition : undefined}
		>
			<DialogTitle
				sx={{ m: 0, p: 2 }}
				id="customized-dialog-title"
			>
				{t(`${title}`)}
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500]
				}}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent dividers>
				<MarkdownLoader src={src} />
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					color="primary"
					variant="contained"
					sx={{
						textTransform: "none"
					}}
				>
					{t("buttons.close")}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default LegalPolicies;
