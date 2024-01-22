import React from "react";
import { useTranslation } from "react-i18next";
import { Seo, Keys } from "../../services/config";
import OnPageSeo from "../../components/OnPageSeo/OnPageSeo";
import { getRecommendations, Recommendation } from "../../services/apiV1" /* webpackChunkName: "apiV1" */;

function RecommendationsPage() {
	const { t } = useTranslation(["recommendations", "common"]);
	const [recommendations, setRecommendations] = React.useState<Recommendation[]>(
		() => JSON.parse(sessionStorage.getItem(Keys.recommendations) || "[]") as Recommendation[]
	);

	React.useEffect(() => {
		const fetchRecommendations = async () => {
			// TODO: implement caching freshness check
			const cachedRecommendations = sessionStorage.getItem(Keys.recommendations) as Recommendation[] | null;
			if (!cachedRecommendations) {
				try {
					const recommendations = await getRecommendations();
					if (recommendations && Array.isArray(recommendations)) {
						setRecommendations(recommendations);
					}
				} catch (err: unknown) {
					throw new Error(err as string);
				}
			}
		};
		fetchRecommendations();
	}, []);

	return (
		<>
			<OnPageSeo
				keywords={t("seo.keywords")}
				description={t("seo.description")}
				title={Seo.titlePretfix + Seo.delimeter + t("seo.title")}
			/>
			<div>
				{recommendations &&
					recommendations.map((recommendation) => {
						return <p>{recommendation.name}</p>;
					})}
			</div>
		</>
	);
}

export default React.memo(RecommendationsPage);
