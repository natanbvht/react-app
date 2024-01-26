/* eslint-disable no-console */
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Language, changeLanguage, getCurrentLanguage, getPreviewsLanguage, languages } from "../../i18n";
import SwitcherButton from "./SwitcherButton/SwitcherButton";

const LanguagePopup = React.lazy(() => import(/* webpackChunkName: 'LanguagePopup' */ "./LanguagePopup/LanguagePopup"));

function LanguageSwitcher() {
	const location = useLocation();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);
	const hashFragment = location.hash;
	const searchParams = location.search;
	const currentPath = location.pathname;
	const pathSegments = currentPath.split("/").filter((p) => p);

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

		if (lastLanguage?.path) {
			newPath = newPath.replace(lastLanguage.path, "");
		}

		if (currentPath !== newPath) {
			navigate(newPath);
			setAnchorEl(null);
		}
	};

	return (
		<>
			<SwitcherButton
				open={open}
				onClick={handleClick}
				language={languages.find((l) => l.path === `/${pathSegments[0]}`) || getCurrentLanguage()}
			/>
			{open && (
				<React.Suspense
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
						language={languages.find((l) => l.value === getCurrentLanguage().value)}
						languages={languages}
						onClose={handleClose}
						selecteLanguage={selecteLanguage}
					/>
				</React.Suspense>
			)}
		</>
	);
}

export default LanguageSwitcher;
