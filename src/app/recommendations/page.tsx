import React from "react";
import { useTranslation } from "react-i18next";
import { Seo } from "../../utils/config";
import OnPageSeo from "../../components/OnPageSeo/OnPageSeo";

function RecommendationsPage() {
	const { t } = useTranslation(["recommendations", "common"]);
	return (
		<>
			<OnPageSeo
				keywords={t("seo.keywords")}
				description={t("seo.description")}
				title={Seo.titlePretfix + Seo.delimeter + t("seo.title")}
			/>
			<div>
				<p>Recommendations</p>
			</div>
		</>
	);
}

export default RecommendationsPage;
