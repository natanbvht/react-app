interface YahooIconProps {
	width?: string | number;
	height?: string | number;
	color?: string; // Primary color
}

function YahooIcon({ width = 24, height = 24, color = "#000" }: YahooIconProps) {
	return (
		<svg
			viewBox="0 0 512 512"
			height={height}
			width={width}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="m223.69 141.06-56.69 143.17-56-143.17h-96.07l105.83 249.13-38.57 89.81h94.17l140.91-338.94zm105.4 135.79a58.22 58.22 0 1 0 58.22 58.22 58.22 58.22 0 0 0 -58.22-58.22zm65.56-244.85-93 223.47h104.79l92.63-223.47z"
				fill={color}
			/>
		</svg>
	);
}

export default YahooIcon;
