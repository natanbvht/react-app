import React, { memo } from "react";
import "./LanguagePopup.css";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Language } from "../../../context/Language/Language";

interface LanguagePopupProps {
	open?: boolean;
	language?: Language;
	languages: Language[];
	anchorEl?: null | HTMLElement;
	onClose: () => void;
	selecteLanguage: (language: Language) => void;
}

function LanguagePopup({ open, anchorEl, language, languages, selecteLanguage, onClose }: LanguagePopupProps) {
	const theme = useTheme();

	return (
		<Menu
			elevation={0}
			onClose={onClose}
			anchorEl={anchorEl}
			open={open ?? false}
			id="language-switcher"
			aria-labelledby="language-switcher-button"
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left"
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center"
			}}
			slotProps={{
				paper: {
					style: {
						marginTop: "12px",
						borderRadius: "1rem",
						border: `1px solid ${theme.palette.grey[200]}`
					}
				}
			}}
		>
			<Grid
				container
				spacing={1}
				direction="row"
				padding="1.5rem"
				borderRadius="1rem"
				className="LanguagePopup"
			>
				{languages.map((lang) => (
					<Grid
						item
						xs={6}
						key={lang.id}
					>
						<MenuItem
							key={lang.id}
							onClick={() => selecteLanguage(lang)}
							aria-label={`Select Language ${lang.shortCode}`}
							className={lang.id === language?.id ? "LanguageItemHighlight" : "LanguageItem"}
							sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
						>
							<Typography
								key={lang.id}
								fontSize={14}
								fontWeight={600}
								className="LanguageName"
							>
								{lang?.native ? lang?.native : lang?.label}
							</Typography>
							<Typography
								fontSize={12}
								className="CountryName"
							>
								<img
									width="22"
									height="12"
									sizes="20px"
									loading="lazy"
									className="FlagImage"
									alt={lang?.shortCode}
									src={`https://flagcdn.com/w20/${lang?.value.split("-")[1]?.toLowerCase()}.png`}
									srcSet={`https://flagcdn.com/w40/${lang?.value.split("-")[1]?.toLowerCase()}.png 2x`}
								/>
								<span>{lang?.country}</span>
							</Typography>
						</MenuItem>
					</Grid>
				))}
			</Grid>
		</Menu>
	);
}

LanguagePopup.defaultProps = {
	open: false,
	anchorEl: null
};

export default memo(LanguagePopup);
