import React from "react";
import "./Toolbar.scss";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import MetaintroIcon from "../../components/Icons/Metaintro";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { getCurrentLanguage } from "../../i18n";

function AppToolbar() {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		const language = getCurrentLanguage();
		const path = language.path ?? "/";
		navigate(path);
	};

	return (
		<AppBar
			position="sticky"
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
	);
}

export default AppToolbar;
