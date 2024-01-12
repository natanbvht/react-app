import React, { Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";

import SwitcherButton from "./SwitcherButton/SwitcherButton";
import { Language, useLanguage, languages } from "../../context/Language/Language";

const LanguagePopup = React.lazy(() => import(/* webpackChunkName: 'LanguagePopup' */ "./LanguagePopup/LanguagePopup"));

function LanguageSwitcher() {
	const { language, changeLanguage } = useLanguage();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const selecteLanguage = (language: Language) => {
		changeLanguage(language);
		setAnchorEl(null);
	};

	return (
		<>
			<SwitcherButton
				open={open}
				language={language}
				onClick={handleClick}
			/>
			{open && (
				<Suspense
					fallback={
						<Skeleton
							width={384}
							height={307}
							className="LanguagePopup"
						/>
					}
				>
					<LanguagePopup
						open={open}
						anchorEl={anchorEl}
						language={language}
						languages={languages}
						onClose={handleClose}
						selecteLanguage={selecteLanguage}
					/>
				</Suspense>
			)}
		</>
	);
}

export default LanguageSwitcher;
