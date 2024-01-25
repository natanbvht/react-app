/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Global } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { styled, useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Keys } from "../../config";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return (
		<Slide
			ref={ref}
			{...props}
			direction="down"
		/>
	);
});

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
	height: "100%",
	backgroundColor: theme.palette.mode === "light" ? grey[100] : theme.palette.background.default
}));

const StyledBox = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800]
}));

const Puller = styled("div")(({ theme }) => ({
	width: 30,
	height: 6,
	backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
	borderRadius: 3,
	position: "absolute",
	top: 8,
	left: "calc(50% - 15px)"
}));

function RequestInfo() {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(true);
	const { t } = useTranslation(["request-info", "subscribe"]);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
		navigate(-1);
	};

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	const container = window !== undefined ? () => window.document.body : undefined;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries((formData as any).entries());
		const { email, name } = formJson;
		const userData = (sessionStorage.getItem(Keys.subscribe) as any) || {
			email: "",
			name: ""
		};
		userData.email = email;
		userData.name = name;
		sessionStorage.setItem(Keys.subscribe, JSON.stringify(userData));
		handleClose();
	};

	if (!isMobile) {
		return (
			<Dialog
				open={open}
				maxWidth="xs"
				onClose={handleClose}
				TransitionComponent={Transition}
				PaperProps={{ component: "form", onSubmit: handleSubmit }}
			>
				<DialogContent>
					<IconButton
						aria-label={t("close")}
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
					<DialogContentText sx={{ mt: 4 }}>{t("toContinuePlease")}</DialogContentText>
					<TextField
						required
						autoFocus
						fullWidth
						id="name"
						name="name"
						type="text"
						sx={{ mt: 1 }}
						variant="standard"
						label={t("subscribe:name")}
					/>
					<TextField
						required
						fullWidth
						id="email"
						name="email"
						type="email"
						sx={{ mt: 2 }}
						variant="standard"
						label={t("subscribe:email")}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						className="ttn"
					>
						{t("cancel")}
					</Button>
					<Button
						type="submit"
						className="ttn"
						variant="contained"
					>
						{t("continue")}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	return (
		<Root>
			<CssBaseline />
			<Global
				styles={{
					".MuiDrawer-root > .MuiPaper-root": {
						overflow: "visible"
					}
				}}
			/>
			<SwipeableDrawer
				container={container}
				anchor="bottom"
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={false}
				ModalProps={{
					keepMounted: true
				}}
			>
				<StyledBox
					sx={{
						position: "absolute",
						top: -drawerBleeding,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						visibility: "visible",
						right: 0,
						left: 0
					}}
				>
					<Puller />
					<Typography sx={{ p: 2, color: "text.secondary" }}>{t("missingInformation")}</Typography>
				</StyledBox>
				<StyledBox
					sx={{
						px: 2,
						pb: 2,
						height: "100%",
						overflow: "auto"
					}}
				>
					<DialogContentText>{t("toContinuePlease")}</DialogContentText>
					<form
						name="request-info"
						onSubmit={handleSubmit}
					>
						<TextField
							required
							autoFocus
							fullWidth
							id="name"
							name="name"
							type="text"
							sx={{ mt: 1 }}
							variant="standard"
							label={t("subscribe:name")}
						/>
						<TextField
							required
							fullWidth
							id="email"
							name="email"
							type="email"
							sx={{ mt: 2 }}
							variant="standard"
							label={t("subscribe:email")}
						/>
						<Button
							fullWidth
							type="submit"
							sx={{ mt: 2 }}
							className="ttn"
							variant="contained"
						>
							{t("continue")}
						</Button>
					</form>
				</StyledBox>
			</SwipeableDrawer>
		</Root>
	);
}

export default RequestInfo;
