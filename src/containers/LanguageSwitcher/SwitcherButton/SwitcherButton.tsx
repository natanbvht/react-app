import Button from "@mui/material/Button";
import React, { memo } from "react";
import ChevronDownIcon from "../../../components/Icons/ChevronDown";
import LanguageIcon from "../../../components/Icons/Language";
import { Language } from "../../../i18n";
import "./SwitcherButton.css";

interface SwitcherButtonProps {
	open?: boolean;
	language?: Language;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

function SwitcherButton({ open, language, onClick }: SwitcherButtonProps) {
	return (
		<Button
			variant="text"
			onClick={onClick}
			aria-haspopup="true"
			className="SwitcherButton"
			id="language-switcher-button"
			aria-label={language?.native}
			aria-expanded={open ? "true" : undefined}
			aria-controls={open ? "language-switcher" : undefined}
			endIcon={
				<ChevronDownIcon
					width={12}
					height={12}
					className={open ? "rotate-180" : ""}
				/>
			}
		>
			{" "}
			<LanguageIcon
				width={24}
				height={24}
			/>{" "}
			{language?.native}
		</Button>
	);
}

SwitcherButton.defaultProps = {
	open: false,
	onClick: () => {}
};

export default memo(SwitcherButton);
