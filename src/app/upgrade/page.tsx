import React from "react";
import { useTranslation } from "react-i18next";
import { Seo } from "../../services/config";
import OnPageSeo from "../../components/OnPageSeo/OnPageSeo";

function UpgradePage() {
	const { t } = useTranslation(["upgrade", "common"]);
	return (
		<>
			<OnPageSeo
				keywords={t("seo.keywords")}
				description={t("seo.description")}
				title={Seo.titlePretfix + Seo.delimeter + t("seo.title")}
			/>
			<div>
				<p>Upgrade</p>
			</div>
		</>
	);
}

export default UpgradePage;
