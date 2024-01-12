interface FranceFlagIconProps {
  width?: string | number;
  height?: string | number;
  color1?: string; // Primary color
  color2?: string; // Secondary color
  color3?: string; // Tertiary color
  color4: string; // Quaternary color
}

const FranceFlagIcon: React.FC<FranceFlagIconProps> = ({
  width = 24,
  height = 24,
  color1 = "#fff",
  color2 = "#f50100",
  color3 = "#2e42a5",
  color4 = "#f7fcff",
}) => (
  <svg
    fill="none"
    height={height}
    viewBox="0 0 32 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <mask id="a" height="24" maskUnits="userSpaceOnUse" width="32" x="0" y="0">
      <path d="m0 0h32v24h-32z" fill={color1} />
    </mask>
    <g clipRule="evenodd" fillRule="evenodd" mask="url(#a)">
      <path d="m22 0h10v24h-10z" fill={color2} />
      <path d="m0 0h12v24h-12z" fill={color3} />
      <path d="m10 0h12v24h-12z" fill={color4} />
    </g>
  </svg>
);

export default FranceFlagIcon;
