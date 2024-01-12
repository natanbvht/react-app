interface AchivementIconProps {
	width?: string | number;
	height?: string | number;
}

const MetaintroBlue = "#00CEEF";

const Pink = {
	// 9945FF
	dark: "#9945FF",
	light: "#F771FF"
};

const Yellow = {
	dark: "#eaa43a",
	medium: "#ffc42e",
	light: "#fce379"
};

function AchivementIcon({ width = 114, height = 128 }: AchivementIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fillRule="evenodd"
			clipRule="evenodd"
			imageRendering="optimizeQuality"
			shapeRendering="geometricPrecision"
			textRendering="geometricPrecision"
			viewBox="0 0 17385 19555"
			id="achivement"
		>
			<defs>
				<linearGradient
					id="gradient"
					x1="0%"
					y1="0%"
					x2="100%"
					y2="100%"
				>
					<stop
						offset="0%"
						style={{ stopColor: MetaintroBlue }}
					/>
					<stop
						offset="100%"
						style={{ stopColor: Pink.light }}
					/>
				</linearGradient>
			</defs>
			<path
				fill="url(#gradient)" // Apply the gradient here
				d="M9553 237l6972 4025c547,316 860,859 860,1491l0 8049c0,632 -313,1175 -860,1491l-6972 4025c-547,316 -1174,316 -1721,0l-6971 -4025c-548,-316 -861,-859 -861,-1491l0 -8049c0,-632 313,-1175 861,-1491l6971 -4025c547,-316 1174,-316 1721,0z"
			/>
			<path
				fill="url(#gradient)"
				d="M9553 237l6972 4025c547,316 860,859 860,1491l0 8049c0,632 -313,1175 -860,1491l-6972 4025c-547,316 -1174,316 -1721,0l-6971 -4025c-548,-316 -861,-859 -861,-1491l0 -8049c0,-632 313,-1175 861,-1491l6971 -4025c547,-316 1174,-316 1721,0z"
			/>
			<polygon
				fill={Pink.dark}
				points="10940 10409 8053 12381 12952 19555 13537 17312 15839 17584"
			/>
			<polygon
				fill={Pink.dark}
				points="6445 10409 9332 12381 4433 19555 3848 17312 1546 17584"
			/>
			<path
				fill={Pink.light}
				d="M10940 10409l-2887 1972 2856 4182c535,41 1051,-216 1342,-695l732 -1206c133,-220 301,-385 516,-505l-2559 -3748z"
			/>
			<path
				fill={Pink.light}
				d="M6445 10409l2887 1972 -2842 4162c-544,65 -1078,-181 -1384,-662l-874 -1369c-95,-149 -205,-271 -335,-371l2548 -3732z"
			/>
			<path
				fill={Yellow.medium}
				d="M9450 1891l1088 834c215,164 446,246 717,252l1190 26c570,12 1043,400 1166,956l298 1338c58,265 183,475 387,654l895 785c428,376 541,976 278,1482l-632 1216c-125,241 -165,482 -123,750l181 1176c86,564 -214,1096 -740,1315l-1266 525c-250,104 -436,263 -576,495l-618 1018c-296,487 -868,702 -1412,531l-1307 -411c-258,-81 -503,-79 -760,8l-1127 383c-540,183 -1116,-20 -1423,-500l-737 -1156c-146,-228 -335,-383 -587,-481l-1110 -432c-531,-207 -843,-733 -769,-1298l179 -1359c35,-268 -10,-509 -141,-746l-572 -1044c-274,-500 -175,-1103 245,-1488l1010 -927c200,-183 320,-396 373,-662l232 -1167c111,-559 575,-958 1145,-983l1369 -60c270,-12 499,-99 711,-268l928 -745c445,-357 1056,-364 1508,-17z"
			/>
			<path
				fill={Yellow.dark}
				d="M8690 3620c2651,0 4800,2149 4800,4800 0,2651 -2149,4800 -4800,4800 -2651,0 -4801,-2149 -4801,-4800 0,-2651 2150,-4800 4801,-4800z"
			/>
			<polygon
				fill={Yellow.medium}
				points="8693 4416 9937 6857 12643 7286 10706 9224 11134 11930 8693 10687 6251 11930 6679 9224 4742 7286 7448 6857"
			/>
			<polygon
				fill={Yellow.light}
				points="8693 4416 8689 8470 7448 6857"
			/>
			<polygon
				fill={Yellow.light}
				points="12643 7286 8689 8470 9937 6857"
			/>
			<polygon
				fill={Yellow.light}
				points="11134 11930 8689 8470 10706 9224"
			/>
			<polygon
				fill={Yellow.light}
				points="6251 11930 8689 8470 8693 10687"
			/>
			<polygon
				fill={Yellow.light}
				points="4742 7286 8689 8470 6679 9224"
			/>
		</svg>
	);
}

export default AchivementIcon;
