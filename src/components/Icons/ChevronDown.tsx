interface ChevronDownIconProps {
	className?: string;
	width?: string | number;
	height?: string | number;
}

function ChevronDownIcon({ width = 24, height = 24, className }: ChevronDownIconProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 1560 1560"
			xmlns="http://www.w3.org/2000/svg"
			enableBackground="new 0 0 1560 1560"
			className={`ChevronDownIcon ${className}`}
		>
			<g>
				<g>
					<path d="m776.8 1185.1c-8.2 0-16.4-3.1-22.6-9.4l-740.8-741.7c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l740.8 741.8c12.5 12.5 12.5 32.8 0 45.3-6.3 6.2-14.5 9.3-22.7 9.3z" />
				</g>
				<g>
					<path d="m776.8 1185.1c-8.2 0-16.4-3.1-22.6-9.4-12.5-12.5-12.5-32.8 0-45.3l747.2-746.2c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-747.2 746.2c-6.3 6.3-14.5 9.4-22.7 9.4z" />
				</g>
			</g>
		</svg>
	);
}

export default ChevronDownIcon;
