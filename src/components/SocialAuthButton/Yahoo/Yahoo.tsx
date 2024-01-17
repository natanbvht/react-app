import "./Yahoo.scss";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import YahooIcon from "../../Icons/Yahoo";
import SocialAuthButton from "../SocialAuthButton";
import { AuthProvider, SocialAuthCb } from "../index.d";

function YahooLoginButton({ successCb, errorCb }: SocialAuthCb) {
	const { t } = useTranslation(["common"]);
	const [iconColor, setIconColor] = useState("#fff");

	const handleMouseEnter = () => {
		setIconColor("#7E1FFF");
	};

	const handleMouseLeave = () => {
		setIconColor("#fff");
	};

	return (
		<SocialAuthButton
			errorCb={errorCb}
			successCb={successCb}
			className="YahooLoginButton"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			authProvider={AuthProvider.Yahoo}
			scopes={["openid", "email", "profile"]}
			authIcon={<YahooIcon color={iconColor} />}
			text={`${t("common:buttons.continueWithYahoo")}`}
		/>
	);
}

export default YahooLoginButton;
