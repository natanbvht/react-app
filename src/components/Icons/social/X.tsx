interface XIconProps {
  width?: string | number;
  height?: string | number;
  color?: string; // Primary color
}

const XIcon: React.FC<XIconProps> = ({
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
        d="M857 4142 c15 -21 312 -418 658 -881 347 -463 631 -848 633 -855 2
  -7 -294 -334 -658 -726 -363 -393 -660 -720 -660 -727 0 -10 31 -13 143 -13
  l142 0 210 227 c769 831 967 1043 975 1038 4 -3 221 -289 480 -635 l472 -630
  526 0 c499 0 524 1 510 18 -8 9 -210 278 -448 597 -239 319 -552 739 -698 933
  l-264 354 19 21 c18 20 199 217 518 562 72 77 242 262 379 410 137 149 265
  287 285 308 l35 37 -154 0 -155 0 -534 -576 -533 -576 -430 576 -431 576 -524
  0 -525 0 29 -38z m1168 -540 c160 -213 634 -847 1055 -1410 421 -562 767
  -1027 768 -1032 2 -6 -85 -10 -235 -10 l-238 1 -195 262 c-190 256 -1288 1724
  -1708 2285 -117 155 -212 285 -212 287 0 3 107 5 238 5 l237 0 290 -388z"
      />
    </g>
  </svg>
);

export default XIcon;
