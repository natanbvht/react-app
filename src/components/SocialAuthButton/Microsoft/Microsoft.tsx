import React from "react";
import { useTranslation } from "react-i18next";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import SocialAuthButton, { AuthProvider, SocialAuthCb } from "../SocialAuthButton";

const MicrosoftBrand = {
	color: "white",
	backgroundColor: "black",
	":hover": { backgroundColor: "#000", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)" }
};

function MicrosoftLoginButton({ successCb, errorCb }: SocialAuthCb) {
	const { t } = useTranslation(["common"]);
	return (
		<SocialAuthButton
			errorCb={errorCb}
			successCb={successCb}
			sx={MicrosoftBrand}
			scopes={["name", "email"]}
			authProvider={AuthProvider.Microsoft}
			authIcon={<MicrosoftIcon fontSize="large" />}
			text={`${t("common:buttons.continueWithMicrosoft")}`}
		/>
	);
}

export default MicrosoftLoginButton;
