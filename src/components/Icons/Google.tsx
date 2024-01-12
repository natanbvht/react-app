interface GoogleIconProps {
	width?: string | number;
	height?: string | number;
	color1?: string; // Primary color
	color2?: string; // Secondary color
	color3?: string; // Secondary color
	color4?: string; // Secondary color
}

function GoogleIcon({
	width = 24,
	height = 24,
	color1 = "#ffc107",
	color2 = "#ff3d00",
	color3 = "#4caf50",
	color4 = "#1976d2"
}: GoogleIconProps) {
	return (
		<svg
			enableBackground="new 0 0 48 48"
			height={height}
			viewBox="0 0 48 48"
			width={width}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="m43.611 20.083h-1.611v-.083h-18v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-11.045 0-20 8.955-20 20s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
				fill={color1}
			/>
			<path
				d="m6.306 14.691 6.571 4.819c1.778-4.402 6.084-7.51 11.123-7.51 3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-7.682 0-14.344 4.337-17.694 10.691z"
				fill={color2}
			/>
			<path
				d="m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238c-2.008 1.521-4.504 2.43-7.219 2.43-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025c3.31 6.477 10.032 10.921 17.805 10.921z"
				fill={color3}
			/>
			<path
				d="m43.611 20.083h-1.611v-.083h-18v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238c-.438.398 6.591-4.807 6.591-14.807 0-1.341-.138-2.65-.389-3.917z"
				fill={color4}
			/>
		</svg>
	);
}

export default GoogleIcon;
