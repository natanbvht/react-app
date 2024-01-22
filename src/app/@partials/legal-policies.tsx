import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MarkdownLoader from "../../components/MarkdownLoader/MarkdownLoader";

interface LegalPoliciesProps {
	src: string;
	title: string;
}

function LegalPolicies({ src, title }: LegalPoliciesProps) {
	const theme = useTheme();
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(true);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	return (
		<Dialog
			fullWidth
			open={open}
			scroll="paper"
			onClose={handleClose}
			aria-label="Legal Policies"
			maxWidth={isMobile ? "xl" : "md"}
			aria-describedby="legal-policies"
		>
			<DialogTitle
				sx={{ m: 0, p: 2 }}
				id="customized-dialog-title"
			>
				{title}
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
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default LegalPolicies;
