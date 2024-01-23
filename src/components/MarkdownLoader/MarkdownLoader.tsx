import React from "react";
import ReactMarkdown from /* webpackChunkName: "rmd" */ "react-markdown";

interface MarkdownLoaderProps {
	src: string;
}

function MarkdownLoader({ src }: MarkdownLoaderProps) {
	const [error, setError] = React.useState<string>("");
	const [markdown, setMarkdown] = React.useState<string>("");
	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		fetch(src)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Error fetching markdown: ${response.statusText}`);
				}
				return response.text();
			})
			.then((text) => {
				setMarkdown(text);
				setLoading(false);
			})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.catch((error: any) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				setError(error?.message ?? "Error fetching markdown");
				setLoading(false);
			});
	}, [src]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return (
			<div>
				<p>Error loading content. Please try again later.</p>
				<button
					type="button"
					onClick={() => window.location.reload()}
				>
					Retry
				</button>
			</div>
		);
	}

	return <ReactMarkdown>{markdown}</ReactMarkdown>;
}

export default MarkdownLoader;
