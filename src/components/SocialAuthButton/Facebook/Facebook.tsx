import React from "react";
import { useTranslation } from "react-i18next";
import FacebookIcon from "@mui/icons-material/Facebook";
import SocialAuthButton from "../SocialAuthButton";
import { AuthProvider, SocialAuthCb } from "../index.d";

const FacebookBrand = {
	color: "white",
	backgroundColor: "#3b5998",
	":hover": { backgroundColor: "#1565C0" }
};

function FacebookLoginButton({ successCb, errorCb }: SocialAuthCb) {
	const { t } = useTranslation(["common"]);
	return (
		<SocialAuthButton
			errorCb={errorCb}
			successCb={successCb}
			sx={FacebookBrand}
			authIcon={<FacebookIcon />}
			scopes={["email", "public_profile"]}
			authProvider={AuthProvider.Facebook}
			text={`${t("buttons.continueWithFacebook")}`}
		/>
	);
}

export default FacebookLoginButton;
