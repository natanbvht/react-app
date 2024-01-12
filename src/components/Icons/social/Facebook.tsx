interface FacebookIconProps {
  width?: string | number;
  height?: string | number;
  color?: string; // Primary color
}

const FacebookIcon: React.FC<FacebookIconProps> = ({
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
        d="M1720 4174 c-264 -43 -473 -153 -596 -314 -61 -81 -122 -207 -152
    -318 l-27 -97 -3 -835 c-3 -849 -1 -907 34 -1040 28 -103 82 -222 132 -289 83
    -113 219 -217 352 -268 154 -61 251 -73 564 -73 258 0 270 1 308 22 21 12 49
    38 60 57 21 34 22 44 20 320 -1 157 -5 382 -8 500 -9 278 1 264 -186 271
    l-133 5 -6 30 c-4 17 -7 98 -8 181 -1 189 -5 184 136 184 109 0 158 12 174 41
    6 12 9 125 9 302 -2 307 2 333 57 433 39 70 129 157 201 193 105 53 160 61
    434 61 225 0 248 -2 257 -17 5 -10 11 -111 12 -225 3 -174 1 -210 -11 -222
    -12 -12 -60 -17 -225 -22 -115 -4 -218 -11 -227 -16 -16 -8 -18 -29 -18 -217
    0 -129 4 -220 11 -241 19 -53 48 -59 249 -53 196 7 220 2 220 -45 -1 -15 -13
    -96 -29 -181 -21 -116 -32 -157 -46 -167 -14 -10 -60 -14 -176 -14 -152 0
    -159 -1 -186 -24 l-28 -24 0 -509 0 -508 24 -38 c13 -21 41 -47 64 -58 38 -20
    53 -21 246 -17 247 5 341 24 496 98 252 120 399 332 455 654 14 81 14 1641 0
    1722 -34 198 -98 350 -193 465 -103 124 -268 223 -452 270 l-90 23 -845 2
    c-465 1 -856 0 -870 -2z"
      />
    </g>
  </svg>
);

export default FacebookIcon;
