import React, { memo, useState } from "react";
import Box from "@mui/material/Box";
import SocialAuthButtonNFCR from "./SocialAuthButtonNFCR";
import SocialAuthButtonFCR, {
	AuthFlow,
	AuthProvider,
	SocialAuthCb,
	SocialAuthButtonFCRProps
} from "./SocialAuthButtonFCR";

// FCR = Functional Component Replacement
// NFCR = Non-Functional Component Replacement

interface SocialAuthButtonProps extends SocialAuthButtonFCRProps {
	height?: string;
}

function SocialAuthButton({
	height,
	authProvider,
	authIcon,
	text,
	sx,
	className,
	errorCb,
	successCb,
	onMouseEnter,
	onMouseLeave
}: SocialAuthButtonProps) {
	const [hotReplacement, setHotReplacement] = useState<boolean>(false);

	const handleMouseEnter = () => {
		setHotReplacement(true);
	};

	return (
		<Box
			onFocus={!hotReplacement ? handleMouseEnter : undefined}
			onMouseEnter={!hotReplacement ? handleMouseEnter : undefined}
			onTouchStart={!hotReplacement ? handleMouseEnter : undefined}
			sx={{
				width: "-webkit-fill-available"
			}}
		>
			{hotReplacement ? (
				<SocialAuthButtonFCR
					text={text}
					size="medium"
					errorCb={errorCb}
					authIcon={authIcon}
					variant="contained"
					successCb={successCb}
					className={className}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					authProvider={authProvider}
					sx={{ ...sx, minHeight: height, textTransform: "none" }}
				/>
			) : (
				<SocialAuthButtonNFCR
					text={text}
					size="medium"
					variant="contained"
					authIcon={authIcon}
					className={className}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					sx={{ ...sx, minHeight: height, textTransform: "none" }}
				/>
			)}
		</Box>
	);
}

SocialAuthButton.defaultProps = {
	height: "40px"
};

export { AuthFlow, AuthProvider, type SocialAuthCb };
export default memo(SocialAuthButton);
