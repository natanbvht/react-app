import React from "react";
import "./Toolbar.scss";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { getCurrentLanguage } from "../../i18n";
import MetaintroIcon from "../../components/Icons/Metaintro";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

interface HideOnScrollProps {
	window?: () => Window;
	children: React.ReactElement;
}

function HideOnScroll({ children, window }: HideOnScrollProps) {
	const trigger = useScrollTrigger({
		target: window ? window() : undefined
	});

	return (
		<Slide
			in={!trigger}
			appear={false}
			direction="down"
		>
			{children}
		</Slide>
	);
}

function AppToolbar() {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		const language = getCurrentLanguage();
		const path = language.path ?? "/";
		navigate(path);
	};

	return (
		<>
			<CssBaseline />
			<HideOnScroll>
				<AppBar
					position="fixed"
					id="metaintro-toolbar"
					className="StyledAppBar"
					aria-label="Metaintro Toolbar"
				>
					<Container
						maxWidth="lg"
						className="no-padding-lr"
					>
						<Toolbar className="StyledToolbar">
							<Button
								role="link"
								variant="text"
								component="button"
								aria-label="Metaintro"
								onClick={handleButtonClick}
							>
								<MetaintroIcon
									height={32}
									width={120}
								/>
							</Button>
							<LanguageSwitcher />
						</Toolbar>
					</Container>
				</AppBar>
			</HideOnScroll>
		</>
	);
}

export default AppToolbar;
