import { useEffect, useMemo, useRef, useState } from "react";

interface LQIPImageProps {
	src: string;
	alt: string;
	width?: number;
	sizes?: string;
	lqipSrc: string;
	height?: number;
	className?: string;
	preLoaded?: boolean;
	loading?: "lazy" | "eager";
}

function LQIPImage({ src, lqipSrc, alt, className, height, width, loading, sizes, preLoaded }: LQIPImageProps) {
	const imageRef = useRef<HTMLImageElement>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [imageSrc, setImageSrc] = useState<string>(lqipSrc);

	useEffect(() => {
		const imgElement = imageRef.current;
		if (!imgElement) {
			return;
		}

		const loadHighResImage = () => {
			if (preLoaded) {
				setImageSrc(src);
				setIsLoaded(true);
			} else {
				const highResImage = new Image();
				highResImage.src = src;
				highResImage.onload = () => {
					setImageSrc(src);
					setIsLoaded(true);
				};
			}
		};

		if (imgElement.complete || preLoaded) {
			loadHighResImage();
		} else {
			imgElement.onload = () => {
				if (imgElement.src === lqipSrc) {
					loadHighResImage();
				}
			};
		}
	}, [src, lqipSrc, preLoaded]);

	const aspectRatio = height && width ? (height / width) * 100 : 0;

	return (
		<div style={{ position: "relative", width: "100%", paddingTop: `${aspectRatio}%`, overflow: "hidden" }}>
			<picture>
				<img
					id={alt}
					alt={alt}
					sizes={sizes}
					ref={imageRef}
					src={imageSrc}
					loading={loading}
					className={className}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						display: "block",
						overflow: "hidden",
						objectFit: "cover",
						transition: "filter 0.05s linear",
						filter: isLoaded ? "none" : "blur(200px)"
					}}
				/>
			</picture>
		</div>
	);
}

function MemorizedLQIPImage(props: LQIPImageProps) {
	return useMemo(() => <LQIPImage {...props} />, [props.src, props.lqipSrc]);
}

export default MemorizedLQIPImage;
