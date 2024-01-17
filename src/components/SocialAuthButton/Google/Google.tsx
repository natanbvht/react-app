import React from "react";
import { SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import GoogleIcon from "../../Icons/Google";
import SocialAuthButton from "../SocialAuthButton";
import { AuthProvider, SocialAuthCb } from "../index.d";

const GoogleBrand = {
	color: "#444",
	fontWeight: 500,
	borderColor: "#888",
	whiteSpace: "nowrap",
	backgroundColor: "white",
	fontFamily: "'Roboto', sans-serif",
	":hover": { backgroundColor: "#eee" }
} as SxProps;

function GoogleLoginButton({ successCb, errorCb }: SocialAuthCb) {
	const { t } = useTranslation(["common"]);
	return (
		<SocialAuthButton
			sx={GoogleBrand}
			errorCb={errorCb}
			successCb={successCb}
			authIcon={<GoogleIcon />}
			className="GoogleLoginButton"
			authProvider={AuthProvider.Google}
			scopes={["openid", "email", "profile"]}
			text={`${t("common:buttons.continueWithGoogle")}`}
		/>
	);
}

export default GoogleLoginButton;
