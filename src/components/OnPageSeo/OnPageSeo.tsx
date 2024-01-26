import { memo } from "react";
import { Helmet } from "react-helmet";

interface SeoProps {
	title: string;
	keywords: string;
	description: string;
	preloadImages?: string[];
}

function OnPageSeo({ title, description, keywords, preloadImages }: SeoProps) {
	return (
		<Helmet>
			<title>{title}</title>
			<meta
				name="description"
				content={description}
			/>
			<meta
				name="keywords"
				content={keywords}
			/>
			{preloadImages?.map((image) => (
				<link
					key={image}
					rel="preload"
					href={image}
					as="image"
				/>
			))}
		</Helmet>
	);
}

export default memo(OnPageSeo);
