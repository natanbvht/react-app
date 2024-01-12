interface YouTubeIconProps {
  width?: string | number;
  height?: string | number;
  color?: string;
}

const YouTubeIcon: React.FC<YouTubeIconProps> = ({
  width = 24,
  height = 24,
  color = "#000000",
}) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width={`${width}.00pt`}
    height={`${height}.00pt`}
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill={color}
      stroke="none"
    >
      <path
        d="M2050 4173 c-230 -3 -710 -22 -860 -34 -343 -27 -484 -57 -593 -128
 -153 -100 -232 -231 -266 -441 -51 -314 -70 -526 -78 -880 -9 -434 26 -891 93
 -1219 28 -138 110 -261 228 -345 108 -77 202 -104 461 -130 677 -69 2383 -69
 3060 0 256 26 334 47 447 121 124 81 213 212 243 358 71 345 111 1002 86 1405
 -22 349 -65 702 -101 820 -49 161 -177 300 -336 362 -215 85 -1149 128 -2384
 111z m567 -1216 c279 -161 547 -315 595 -343 48 -27 88 -52 88 -55 0 -4 -87
 -56 -192 -117 -106 -60 -265 -151 -353 -202 -428 -247 -644 -370 -649 -370 -3
 0 -6 311 -6 690 0 380 2 690 4 690 3 0 233 -132 513 -293z"
      />
    </g>
  </svg>
);

export default YouTubeIcon;
