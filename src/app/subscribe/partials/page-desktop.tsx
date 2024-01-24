import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { Box, Avatar, AvatarGroup, Typography } from "@mui/material";

function DesktopSideScreen() {
	const { t } = useTranslation(["subscribe", "common"]);
	const theme = useTheme();
	return (
		<Box
			className="relative hidden h-full items-center justify-center overflow-hidden"
			sx={{
				backgroundColor: "primary.main",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "0 6.4rem"
			}}
		>
			<svg
				className="pointer-events-none absolute inset-0"
				viewBox="0 0 960 540"
				width="100%"
				height="100%"
				preserveAspectRatio="xMidYMax slice"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Box
					fill="none"
					component="g"
					strokeWidth="100"
					stroke="currentColor"
					className="opacity-20"
					sx={{ color: theme.palette.primary.light }}
				>
					<circle
						r="234"
						cx="196"
						cy="23"
					/>
					<circle
						r="234"
						cx="790"
						cy="491"
					/>
				</Box>
			</svg>
			<Box
				component="svg"
				className="opacity-20"
				viewBox="0 0 220 192"
				width="220px"
				height="192px"
				fill="none"
				sx={{ color: "primary.light", position: "absolute", right: "-64px", top: "-64px" }}
			>
				<defs>
					<pattern
						id="837c3e70-6c3a-44e6-8854-cc48c737b659"
						x="0"
						y="0"
						width="20"
						height="20"
						patternUnits="userSpaceOnUse"
					>
						<rect
							x="0"
							y="0"
							width="4"
							height="4"
							fill="currentColor"
						/>
					</pattern>
				</defs>
				<rect
					width="220"
					height="192"
					fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
				/>
			</Box>

			<div className="relative z-10 w-full max-w-2xl">
				<Typography
					variant="h2"
					component="h2"
					lineHeight={1}
					fontWeight={700}
					color={theme.palette.primary.contrastText}
				>
					{t("welcomeTo")}
					<br />
					{t("ourNewsletter")}
				</Typography>
				<Typography
					color={theme.palette.primary.contrastText}
					sx={{
						marginTop: "2rem"
					}}
				>
					{t("metaintroHelpedThousands")}
				</Typography>
				<Box
					sx={{
						display: "flex",
						marginTop: "2rem",
						alignItems: "center"
					}}
				>
					<AvatarGroup
						sx={{
							"& .MuiAvatar-root": {
								borderColor: "primary.main"
							}
						}}
					>
						<Avatar
							src="/assets/images/avatar-users/female-18.jpg"
							alt={`${t("imageOfFemale")} 1`}
						/>
						<Avatar
							src="/assets/images/avatar-users/female-11.jpg"
							alt={`${t("imageOfFemale")} 2`}
						/>
						<Avatar
							src="/assets/images/avatar-users/male-09.jpg"
							alt={`${t("imageOfMale")} 1`}
						/>
						<Avatar
							src="/assets/images/avatar-users/male-16.jpg"
							alt={`${t("imageOfMale")} 2`}
						/>
					</AvatarGroup>

					<Box
						sx={{
							fontWeight: 500,
							marginLeft: "1rem",
							letterSpacing: "-0.025em",
							color: theme.palette.primary.contrastText
						}}
					>
						{t("trustedBy500k")}
					</Box>
				</Box>
			</div>
		</Box>
	);
}

export default DesktopSideScreen;
