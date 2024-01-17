import React from "react";
import { useTranslation } from "react-i18next";
import AppleIcon from "@mui/icons-material/Apple";
import SocialAuthButton from "../SocialAuthButton";
import { AuthProvider, SocialAuthCb } from "../index.d";

const AppleBrand = {
	color: "white",
	backgroundColor: "black",
	":hover": { backgroundColor: "#000", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)" }
};

function AppleLoginButton({ successCb, errorCb }: SocialAuthCb) {
	const { t } = useTranslation(["common"]);
	return (
		<SocialAuthButton
			errorCb={errorCb}
			successCb={successCb}
			sx={AppleBrand}
			scopes={["name", "email"]}
			authProvider={AuthProvider.Apple}
			authIcon={<AppleIcon fontSize="large" />}
			text={`${t("common:buttons.continueWithApple")}`}
		/>
	);
}

export default AppleLoginButton;
