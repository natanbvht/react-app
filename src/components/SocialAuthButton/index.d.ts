export enum AuthFlow {
	Popup = "popup",
	Redirect = "redirect"
}

export enum AuthProvider {
	Apple = "apple.com",
	Yahoo = "yahoo.com",
	Google = "google.com",
	GitHub = "github.com",
	Twitter = "twitter.com",
	Facebook = "facebook.com",
	Microsoft = "microsoft.com"
}

export interface SocialAuthCb {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errorCb: (error: any) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	successCb: (authResponse: any) => void;
}

interface SocialAuthButtonProps extends SocialAuthButtonFCRProps {
	sx?: SxProps;
	height?: string;
}

export interface SocialAuthButtonFCRProps extends ButtonProps, SocialAuthCb {
	sx?: SxProps;
	text: string;
	scopes?: string[];
	className?: string;
	authIcon?: JSX.Element;
	authProvider: AuthProvider;
	onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}
