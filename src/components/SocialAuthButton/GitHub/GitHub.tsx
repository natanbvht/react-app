import React from "react";
import { useTranslation } from "react-i18next";
import GitHubIcon from "@mui/icons-material/GitHub";
import SocialAuthButton, { AuthProvider, SocialAuthCb } from "../SocialAuthButton";

const GitHubBrand = {
	color: "#fff",
	backgroundColor: "#000",
	":hover": { backgroundColor: "#fff", color: "#000" }
};

function GitHubLoginButton({ successCb, errorCb }: SocialAuthCb) {
	const { t } = useTranslation(["common"]);
	return (
		<SocialAuthButton
			errorCb={errorCb}
			successCb={successCb}
			sx={GitHubBrand}
			authIcon={<GitHubIcon />}
			scopes={["email", "read:user"]}
			authProvider={AuthProvider.GitHub}
			text={`${t("common:buttons.continueWithGitHub")}`}
		/>
	);
}

export default GitHubLoginButton;
