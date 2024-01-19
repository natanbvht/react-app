/* eslint-disable no-console */
import React, { Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate, useLocation } from "react-router-dom";
import SwitcherButton from "./SwitcherButton/SwitcherButton";
import { languages, getCurrentLanguage, changeLanguage, getPreviewsLanguage, Language } from "../../i18n";

const LanguagePopup = React.lazy(() => import(/* webpackChunkName: 'LanguagePopup' */ "./LanguagePopup/LanguagePopup"));

function LanguageSwitcher() {
	const location = useLocation();
	const navigate = useNavigate();
	const currentPath = location.pathname;
	const searchParams = location.search;
	const hashFragment = location.hash;
	const pathSegments = currentPath.split("/").filter((p) => p);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const language = getCurrentLanguage();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const selecteLanguage = (language: Language) => {
		const lastLanguage = getPreviewsLanguage();
		let newPath = `${language.path}/${pathSegments.join("/")}${searchParams}${hashFragment}`;
		const currentPath = `${location.pathname}${searchParams}${hashFragment}`;

		changeLanguage(language.value);
		setAnchorEl(null);

		// Check if lastLanguage?.path exists and remove it from newPath
		if (lastLanguage?.path) {
			newPath = newPath.replace(lastLanguage.path, "");
		}

		console.debug("lastLanguage", lastLanguage?.path);
		console.debug("currentPath", currentPath);
		console.debug("newPath", newPath);

		if (currentPath !== newPath) {
			navigate(newPath);
		}
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
