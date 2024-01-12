import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface SocialAuthButtonNFCRProps extends ButtonProps {
	text: string;
	authIcon?: JSX.Element;
}

function SocialAuthButtonNFCR({
	sx,
	text,
	size,
	className,
	authIcon,
	variant,
	onMouseEnter,
	onMouseLeave
}: SocialAuthButtonNFCRProps) {
	return (
		<Button
			sx={sx}
			fullWidth
			size={size}
			variant={variant}
			startIcon={authIcon}
			className={className}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{text}
		</Button>
	);
}

export default SocialAuthButtonNFCR;
