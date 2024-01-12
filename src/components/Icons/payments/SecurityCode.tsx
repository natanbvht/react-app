interface SecurityCodeIconProps {
  width?: string | number;
  height?: string | number;
  color1?: string; // Primary color
  color2?: string; // Secondary color
}

const SecurityCodeIcon: React.FC<SecurityCodeIconProps> = ({
  width = 24,
  height = 24,
  color1 = "#393939",
  color2 = "#000",
}) => (
  <svg
    height={height}
    viewBox="0 0 750 471"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <path
        d="m52.8846154 28.2035928c-13.2760757 0-24.0384616 10.5226489-24.0384616 23.502994v367.5868262c0 12.980345 10.7623859 23.502994 24.0384616 23.502994h644.2307696c13.276075 0 24.038461-10.522649 24.038461-23.502994v-367.5868262c0-12.9803451-10.762386-23.502994-24.038461-23.502994zm0-28.2035928h644.2307696c29.207366 0 52.884615 23.1498275 52.884615 51.7065868v367.5868262c0 28.55676-23.677249 51.706587-52.884615 51.706587h-644.2307696c-29.2073666 0-52.8846154-23.149827-52.8846154-51.706587v-367.5868262c0-28.5567593 23.6772488-51.7065868 52.8846154-51.7065868z"
        fill={color1}
      />
      <g fill={color2}>
        <g fill-opacity=".196078" transform="matrix(-1 0 0 1 684 294)">
          <path d="m21.120614 15.6571429h-4.0021929l-.383772 10.64h-10.9100877l10.0877193-23.66857147-3.7828947-1.62857143-11.129386 25.6228571v3.2571429h15.6798246v9.12h4.4407894v-9.12h4.879386v-3.5828571h-4.879386z" />
          <path d="m44.055557 1c-3.8888894 0-7.611112 1.3164557-10.8333346 4.38818565l2.5000003 2.79746836c2.5555558-2.35864979 4.8333338-3.51054852 8.111112-3.51054852 4.0555531 0 7.2777757 2.24894514 7.2777757 6.41772151 0 4.5527426-3.6111115 6.6371308-7.2777757 6.6371308h-2.277778l-.5555557 3.6202532h3.2222226c4.4999977 0 7.9444425 1.7552742 7.9444425 7.185654 0 4.7172996-3.166667 7.7341772-8.5555536 7.7341772-3.1111115 0-6.3333341-1.2616034-8.500001-3.7848101l-3.1111115 2.5232067c2.8888892 3.5105485 7.4444453 4.9915612 11.7222236 4.9915612 7.8888869 0 13.2777764-4.9367089 13.2777764-11.464135 0-5.8691983-4.2222227-8.9409283-8.7222232-9.2700422 4.055556-.7679325 7.5000008-4.2236287 7.5000008-8.7763713 0-5.15611817-4.555556-9.4894515-11.7222206-9.4894515z" />
          <path d="m77.6397229 1c-5.1547344 0-8.5912241 1.79142857-11.6397229 5.37428571l3.2147806 2.38857143c2.4387991-2.76857143 4.4896074-3.96285714 8.2586605-3.96285714 4.2678984 0 6.817552 2.60571429 6.817552 6.7857143 0 6.1342857-3.1039261 10.2057143-17.5150116 23.7228571v3.6914286h22.669746l.5542725-3.8542857h-17.9584296c12.5819862-11.2371429 17.0715936-16.8285714 17.0715936-23.6685714 0-5.97142861-4.2678984-10.4771429-11.4734411-10.4771429z" />
          <path d="m112.144893 1-11.144893 6.95930233 1.966746 3.25872097 8.631829-5.24709307v29.27325577h-9.287411v3.755814h21.688836v-3.755814h-7.866983v-34.244186z" />
          <path d="m185.120614 15.6571429h-4.002193l-.383772 10.64h-10.910088l10.08772-23.66857147-3.782895-1.62857143-11.129386 25.6228571v3.2571429h15.679825v9.12h4.440789v-9.12h4.879386v-3.5828571h-4.879386z" />
          <path d="m209.055556 1c-3.888889 0-7.611112 1.3164557-10.833334 4.38818565l2.5 2.79746836c2.555556-2.35864979 4.833334-3.51054852 8.111111-3.51054852 4.055556 0 7.277778 2.24894514 7.277778 6.41772151 0 4.5527426-3.611111 6.6371308-7.277778 6.6371308h-2.277777l-.555556 3.6202532h3.222222c4.5 0 7.944445 1.7552742 7.944445 7.185654 0 4.7172996-3.166667 7.7341772-8.555556 7.7341772-3.111111 0-6.333333-1.2616034-8.5-3.7848101l-3.111111 2.5232067c2.888889 3.5105485 7.444444 4.9915612 11.722222 4.9915612 7.888889 0 13.277778-4.9367089 13.277778-11.464135 0-5.8691983-4.222222-8.9409283-8.722222-9.2700422 4.055555-.7679325 7.5-4.2236287 7.5-8.7763713 0-5.15611817-4.555556-9.4894515-11.722222-9.4894515z" />
          <path d="m241.639723 1c-5.154735 0-8.591224 1.79142857-11.639723 5.37428571l3.214781 2.38857143c2.438799-2.76857143 4.489607-3.96285714 8.25866-3.96285714 4.267898 0 6.817552 2.60571429 6.817552 6.7857143 0 6.1342857-3.103926 10.2057143-17.515011 23.7228571v3.6914286h22.669745l.554273-3.8542857h-17.95843c12.581987-11.2371429 17.071594-16.8285714 17.071594-23.6685714 0-5.97142861-4.267898-10.4771429-11.473441-10.4771429z" />
          <path d="m276.144893 1-11.144893 6.95930233 1.966746 3.25872097 8.631829-5.24709307v29.27325577h-9.287411v3.755814h21.688836v-3.755814h-7.866983v-34.244186z" />
          <path d="m350.120614 15.6571429h-4.002193l-.383772 10.64h-10.910088l10.08772-23.66857147-3.782895-1.62857143-11.129386 25.6228571v3.2571429h15.679825v9.12h4.440789v-9.12h4.879386v-3.5828571h-4.879386z" />
          <path d="m373.055556 1c-3.888889 0-7.611112 1.3164557-10.833334 4.38818565l2.5 2.79746836c2.555556-2.35864979 4.833334-3.51054852 8.111111-3.51054852 4.055556 0 7.277778 2.24894514 7.277778 6.41772151 0 4.5527426-3.611111 6.6371308-7.277778 6.6371308h-2.277777l-.555556 3.6202532h3.222222c4.5 0 7.944445 1.7552742 7.944445 7.185654 0 4.7172996-3.166667 7.7341772-8.555556 7.7341772-3.111111 0-6.333333-1.2616034-8.5-3.7848101l-3.111111 2.5232067c2.888889 3.5105485 7.444444 4.9915612 11.722222 4.9915612 7.888889 0 13.277778-4.9367089 13.277778-11.464135 0-5.8691983-4.222222-8.9409283-8.722222-9.2700422 4.055555-.7679325 7.5-4.2236287 7.5-8.7763713 0-5.15611817-4.555556-9.4894515-11.722222-9.4894515z" />
          <path d="m405.639723 1c-5.154735 0-8.591224 1.79142857-11.639723 5.37428571l3.214781 2.38857143c2.438799-2.76857143 4.489607-3.96285714 8.25866-3.96285714 4.267898 0 6.817552 2.60571429 6.817552 6.7857143 0 6.1342857-3.103926 10.2057143-17.515011 23.7228571v3.6914286h22.669745l.554273-3.8542857h-17.95843c12.581987-11.2371429 17.071594-16.8285714 17.071594-23.6685714 0-5.97142861-4.267898-10.4771429-11.473441-10.4771429z" />
          <path d="m441.144893 1-11.144893 6.95930233 1.966746 3.25872097 8.631829-5.24709307v29.27325577h-9.287411v3.755814h21.688836v-3.755814h-7.866983v-34.244186z" />
          <path d="m514.120614 15.6571429h-4.002193l-.383772 10.64h-10.910088l10.08772-23.66857147-3.782895-1.62857143-11.129386 25.6228571v3.2571429h15.679825v9.12h4.440789v-9.12h4.879386v-3.5828571h-4.879386z" />
          <path d="m538.055556 1c-3.888889 0-7.611112 1.3164557-10.833334 4.38818565l2.5 2.79746836c2.555556-2.35864979 4.833334-3.51054852 8.111111-3.51054852 4.055556 0 7.277778 2.24894514 7.277778 6.41772151 0 4.5527426-3.611111 6.6371308-7.277778 6.6371308h-2.277777l-.555556 3.6202532h3.222222c4.5 0 7.944445 1.7552742 7.944445 7.185654 0 4.7172996-3.166667 7.7341772-8.555556 7.7341772-3.111111 0-6.333333-1.2616034-8.5-3.7848101l-3.111111 2.5232067c2.888889 3.5105485 7.444444 4.9915612 11.722222 4.9915612 7.888889 0 13.277778-4.9367089 13.277778-11.464135 0-5.8691983-4.222222-8.9409283-8.722222-9.2700422 4.055555-.7679325 7.5-4.2236287 7.5-8.7763713 0-5.15611817-4.555556-9.4894515-11.722222-9.4894515z" />
          <path d="m570.639723 1c-5.154735 0-8.591224 1.79142857-11.639723 5.37428571l3.214781 2.38857143c2.438799-2.76857143 4.489607-3.96285714 8.25866-3.96285714 4.267898 0 6.817552 2.60571429 6.817552 6.7857143 0 6.1342857-3.103926 10.2057143-17.515011 23.7228571v3.6914286h22.669745l.554273-3.8542857h-17.95843c12.581987-11.2371429 17.071594-16.8285714 17.071594-23.6685714 0-5.97142861-4.267898-10.4771429-11.473441-10.4771429z" />
          <path d="m605.144893 1-11.144893 6.95930233 1.966746 3.25872097 8.631829-5.24709307v29.27325577h-9.287411v3.755814h21.688836v-3.755814h-7.866983v-34.244186z" />
        </g>
        <g fill-opacity=".196078" transform="matrix(-1 0 0 1 688 390)">
          <path d="m.828125 9.195312v-2.695312c2.53906247-.247396 4.3098958-.65755233 5.3125-1.230469 1.002604-.58593733 1.751302-1.959635 2.246094-4.121093h2.773437v27.851562h-3.75v-19.804688z" />
          <path d="m23.09375 9.195312v-2.695312c2.5390627-.247396 4.309896-.65755233 5.3125-1.230469 1.002604-.58593733 1.751302-1.959635 2.246094-4.121093h2.773437v27.851562h-3.75v-19.804688z" />
          <path d="m53.875 29c.130208-2.408854.6249997-4.5052083 1.484375-6.289063.872396-1.783854 2.5651043-3.4049477 5.078125-4.863281l3.75-2.167969c1.6796873-.976562 2.8580727-1.8098953 3.535156-2.5 1.0677087-1.0807287 1.601563-2.3177077 1.601563-3.710937 0-1.627604-.4882813-2.91666633-1.464844-3.867187-.9765627-.963542-2.278646-1.445313-3.90625-1.445313-2.408854 0-4.0755207.91145833-5 2.734375-.494792.97656267-.7682297 2.33072933-.820313 4.0625h-3.574218c.03906-2.434896.4882787-4.420573 1.347656-5.957031 1.5234373-2.70833333 4.2122393-4.0625 8.066406-4.0625 3.2031253 0 5.540365.86588533 7.011719 2.597656 1.4843747 1.73177067 2.226562 3.658854 2.226562 5.78125 0 2.2395833-.7877603 4.1536457-2.363281 5.742187-.911458.9244793-2.5455727 2.044271-4.902344 3.359375l-2.675781 1.484375c-1.2760413.7031253-2.2786453 1.3736983-3.007812 2.011719-1.3020833 1.1328127-2.122396 2.389323-2.460938 3.769531h15.273438v3.320313z" />
          <path d="m85.28125 29.761719c-3.307292 0-5.7096357-.904948-7.207031-2.714844-1.4843753-1.8229167-2.226563-4.0364583-2.226563-6.640625h3.671875c.15625 1.809896.4947917 3.125 1.015625 3.945312.9114587 1.4713547 2.558594 2.207032 4.941406 2.207032 1.8489587 0 3.3333337-.4947917 4.453125-1.484375 1.119792-.9895833 1.679688-2.265625 1.679688-3.828125 0-1.9270833-.592448-3.2747397-1.777344-4.042969-1.1718747-.7682293-2.8059893-1.152344-4.902344-1.152344-.2343747 0-.47526.00651-.722656.01953-.2343747 0-.47526.00651-.722656.01953v-3.105469c.3645833.03906.670573.0651033.917969.07813.2473953.01302.5143223.01953.800781.01953 1.315104 0 2.395833-.2083333 3.242187-.625 1.4843753-.7291667 2.226563-2.03125 2.226563-3.90625 0-1.39322933-.4947917-2.467448-1.484375-3.222656s-2.141927-1.132812-3.457031-1.132812c-2.34375 0-3.964844.78124967-4.863282 2.343749-.4947913.85937533-.774739 2.08333367-.839843 3.671875h-3.476563c0-2.08333333.4166667-3.85416633 1.25-5.312499 1.432292-2.60416667 3.9518233-3.90625 7.558594-3.90625 2.8515627 0 5.058594.63802067 6.621094 1.914062 1.5625 1.26302067 2.34375 3.098958 2.34375 5.507812 0 1.71875-.4622397 3.1119793-1.386719 4.179688-.5729167.6640627-1.3151043 1.184896-2.226563 1.5625 1.4713547.403646 2.617188 1.184896 3.4375 2.34375.8333333 1.1458333 1.25 2.5520833 1.25 4.21875 0 2.6692707-.878906 4.8437497-2.636718 6.523437-1.7578127 1.679688-4.2513023 2.519532-7.480469 2.519532z" />
          <path d="m113.19141 21.871094c.234373 2.005208 1.165363 3.3919267 2.79297 4.160156.833333.3906247 1.796873.585937 2.89062.585937 2.083333 0 3.626303-.6640623 4.62891-1.992187 1.0026-1.3281253 1.5039-2.7994797 1.5039-4.414063 0-1.9531247-.598957-3.4635413-1.79687-4.53125-1.1849-1.067708-2.610683-1.601562-4.27735-1.601562-1.210933 0-2.2526.234375-3.125.703125-.859373.46875-1.59505 1.1197917-2.20703 1.953125l-3.04687-.175781 2.1289-15.058594h14.53125v3.398438h-11.89453l-1.1914 7.773437c.65104-.494792 1.26953-.8658857 1.85547-1.113281 1.041667-.429688 2.246093-.644532 3.61328-.644532 2.5651 0 4.739577.826823 6.52343 2.480469s2.67578 3.7500003 2.67578 6.289063c0 2.6432287-.82031 4.9739577-2.46093 6.992187-1.627607 2.0182293-4.231773 3.027344-7.8125 3.027344-2.278647 0-4.296877-.638021-6.05469-1.914063-1.744793-1.289062-2.721357-3.261718-2.92969-5.917968z" />
          <path d="m141.39453 12.75c1.54948 0 2.760417-.4296877 3.63281-1.289063.8724-.8723953 1.3086-1.90755133 1.3086-3.105468 0-1.04166667-.416667-1.998698-1.25-2.871094s-2.102867-1.308594-3.8086-1.308594c-1.692707 0-2.916663.436198-3.67187 1.308594s-1.13281 1.89453133-1.13281 3.066406c0 1.315104.48828 2.34375 1.46484 3.085938.97656.7421873 2.128903 1.113281 3.45703 1.113281zm.21484 13.847656c1.627607 0 2.975263-.436198 4.04297-1.308594 1.080733-.8854167 1.6211-2.2005207 1.6211-3.945312 0-1.809896-.553387-3.183594-1.66016-4.121094s-2.526043-1.40625-4.25781-1.40625c-1.679687 0-3.053387.481771-4.1211 1.445313-1.054687.9505207-1.58203 2.272135-1.58203 3.964843 0 1.4583333.481773 2.7213543 1.44532 3.789063.97656 1.0546873 2.480463 1.582031 4.51171 1.582031zm-5-12.5c-.97656-.4166667-1.738277-.904948-2.28515-1.464844-1.028647-1.0416667-1.54297-2.3958333-1.54297-4.0625 0-2.08333267.755207-3.873697 2.26562-5.371093 1.51042-1.497396 3.65235-2.246094 6.42579-2.246094 2.682287 0 4.78515.70963533 6.30859 2.128906 1.52344 1.40625 2.28516 3.05338533 2.28516 4.941406 0 1.744792-.44271 3.1575527-1.32813 4.238282-.494793.6119787-1.263023 1.210937-2.30469 1.796875 1.158853.533854 2.070313 1.145833 2.73438 1.835937 1.23698 1.3020833 1.85547 2.9947917 1.85547 5.078125 0 2.4609373-.826823 4.550781-2.48047 6.269531-1.653647 1.7057293-3.990887 2.558594-7.01172 2.558594-2.721353 0-5.02604-.735677-6.91406-2.207031-1.875-1.4843753-2.8125-3.632813-2.8125-6.445313 0-1.6536453.403643-3.0794263 1.21093-4.277343.807293-1.210938 2.00521-2.1354173 3.59375-2.773438z" />
        </g>
        <g fill-opacity=".196078" transform="matrix(-1 0 0 1 500 391)">
          <path d="m.828125 9.195312v-2.695312c2.53906247-.247396 4.3098958-.65755233 5.3125-1.230469 1.002604-.58593733 1.751302-1.959635 2.246094-4.121093h2.773437v27.851562h-3.75v-19.804688z" />
          <path d="m29.65625 29.761719c-3.307292 0-5.7096357-.904948-7.207031-2.714844-1.4843753-1.8229167-2.226563-4.0364583-2.226563-6.640625h3.671875c.15625 1.809896.4947917 3.125 1.015625 3.945312.9114587 1.4713547 2.558594 2.207032 4.941406 2.207032 1.8489587 0 3.3333337-.4947917 4.453125-1.484375 1.119792-.9895833 1.679688-2.265625 1.679688-3.828125 0-1.9270833-.592448-3.2747397-1.777344-4.042969-1.1718747-.7682293-2.8059893-1.152344-4.902344-1.152344-.2343747 0-.47526.00651-.722656.01953-.2343747 0-.47526.00651-.722656.01953v-3.105469c.3645833.03906.670573.0651033.917969.07813.2473953.01302.5143223.01953.800781.01953 1.315104 0 2.395833-.2083333 3.242187-.625 1.4843753-.7291667 2.226563-2.03125 2.226563-3.90625 0-1.39322933-.4947917-2.467448-1.484375-3.222656s-2.141927-1.132812-3.457031-1.132812c-2.34375 0-3.964844.78124967-4.863282 2.343749-.4947913.85937467-.774739 2.08333267-.839843 3.671874h-3.476563c0-2.08333333.4166667-3.85416633 1.25-5.312499 1.432292-2.60416667 3.9518233-3.90625 7.558594-3.90625 2.8515627 0 5.058594.63802067 6.621094 1.914062 1.5625 1.26302067 2.34375 3.098958 2.34375 5.507812 0 1.71875-.4622397 3.1119793-1.386719 4.179688-.5729167.6640627-1.3151043 1.184896-2.226563 1.5625 1.4713547.403646 2.617188 1.184896 3.4375 2.34375.8333333 1.1458333 1.25 2.5520833 1.25 4.21875 0 2.6692707-.878906 4.8437497-2.636718 6.523437-1.7578127 1.679688-4.2513023 2.519532-7.480469 2.519532z" />
          <path d="m42.78125 29c.130208-2.408854.6249997-4.5052083 1.484375-6.289063.872396-1.783854 2.5651043-3.4049477 5.078125-4.863281l3.75-2.167969c1.6796873-.976562 2.8580727-1.8098953 3.535156-2.5 1.0677087-1.0807287 1.601563-2.3177077 1.601563-3.710937 0-1.627604-.4882813-2.91666633-1.464844-3.867187-.9765627-.963542-2.278646-1.445313-3.90625-1.445313-2.408854 0-4.0755207.91145833-5 2.734375-.494792.97656267-.7682297 2.33072933-.820313 4.0625h-3.574218c.03906-2.434896.4882787-4.420573 1.347656-5.957031 1.5234373-2.70833333 4.2122393-4.0625 8.066406-4.0625 3.2031253 0 5.540365.86588533 7.011719 2.597656 1.4843747 1.73177067 2.226562 3.658854 2.226562 5.78125 0 2.2395833-.7877603 4.1536457-2.363281 5.742187-.911458.9244793-2.5455727 2.044271-4.902344 3.359375l-2.675781 1.484375c-1.2760413.7031253-2.2786453 1.3736983-3.007812 2.011719-1.3020833 1.1328127-2.122396 2.389323-2.460938 3.769531h15.273438v3.320313z" />
          <path d="m67.625 9.195312v-2.695312c2.5390627-.247396 4.309896-.65755233 5.3125-1.230469 1.002604-.58593733 1.751302-1.959635 2.246094-4.121093h2.773437v27.851562h-3.75v-19.804688z" />
          <path d="m107.54688 29.761719c-3.307293 0-5.70964-.904948-7.20704-2.714844-1.4843733-1.8229167-2.22656-4.0364583-2.22656-6.640625h3.67188c.156247 1.809896.494787 3.125 1.01562 3.945312.91146 1.4713547 2.558597 2.207032 4.94141 2.207032 1.84896 0 3.333333-.4947917 4.45312-1.484375 1.119793-.9895833 1.67969-2.265625 1.67969-3.828125 0-1.9270833-.592447-3.2747397-1.77734-4.042969-1.17188-.7682293-2.805997-1.152344-4.90235-1.152344-.234373 0-.475257.00651-.72265.01953-.23438 0-.475267.00651-.72266.01953v-3.105469c.364587.03906.670577.0651033.91797.07813.247393.01302.51432.01953.80078.01953 1.315107 0 2.395837-.2083333 3.24219-.625 1.484373-.7291667 2.22656-2.03125 2.22656-3.90625 0-1.39322933-.49479-2.467448-1.48437-3.222656-.989587-.755208-2.141933-1.132812-3.45704-1.132812-2.343747 0-3.96484.78124967-4.86328 2.343749-.494787.85937533-.774733 2.08333367-.83984 3.671875h-3.47656c0-2.08333333.4166667-3.85416633 1.25-5.312499 1.432287-2.60416667 3.951817-3.90625 7.55859-3.90625 2.85156 0 5.05859.63802067 6.62109 1.914062 1.5625 1.26302067 2.34375 3.098958 2.34375 5.507812 0 1.71875-.462237 3.1119793-1.38671 4.179688-.57292.6640627-1.31511 1.184896-2.22657 1.5625 1.471353.403646 2.617187 1.184896 3.4375 2.34375.833333 1.1458333 1.25 2.5520833 1.25 4.21875 0 2.6692707-.878907 4.8437497-2.63672 6.523437-1.757807 1.679688-4.251293 2.519532-7.48046 2.519532z" />
          <path d="m132.64453 19.097656v-12.675781l-8.96484 12.675781zm.05859 9.902344v-6.835938h-12.26562v-3.4375l12.8125-17.773437h2.96875v18.144531h4.12109v3.066406h-4.12109v6.835938z" />
          <path d="m146.62891 21.871094c.234373 2.005208 1.16536 3.3919267 2.79296 4.160156.833333.3906247 1.796877.585937 2.89063.585937 2.083333 0 3.626303-.6640623 4.62891-1.992187 1.0026-1.3281253 1.5039-2.7994797 1.5039-4.414063 0-1.9531247-.598957-3.4635413-1.79687-4.53125-1.1849-1.067708-2.610683-1.601562-4.27735-1.601562-1.210933 0-2.2526.234375-3.125.703125-.859373.46875-1.59505 1.1197917-2.20703 1.953125l-3.04687-.175781 2.1289-15.058594h14.53125v3.398438h-11.89453l-1.1914 7.773437c.65104-.494792 1.269527-.8658857 1.85546-1.113281 1.041667-.429688 2.246097-.644532 3.61329-.644532 2.5651 0 4.739577.826823 6.52343 2.480469s2.67578 3.7500003 2.67578 6.289063c0 2.6432287-.82031 4.9739577-2.46093 6.992187-1.627607 2.0182293-4.231773 3.027344-7.8125 3.027344-2.278647 0-4.296877-.638021-6.05469-1.914063-1.744793-1.289062-2.721357-3.261718-2.92969-5.917968z" />
          <path d="m168.89453 21.871094c.234373 2.005208 1.165363 3.3919267 2.79297 4.160156.833333.3906247 1.796873.585937 2.89062.585937 2.083333 0 3.626303-.6640623 4.62891-1.992187 1.002607-1.3281253 1.50391-2.7994797 1.50391-4.414063 0-1.9531247-.59896-3.4635413-1.79688-4.53125-1.184893-1.067708-2.610673-1.601562-4.27734-1.601562-1.21094 0-2.252607.234375-3.125.703125-.859373.46875-1.59505 1.1197917-2.20703 1.953125l-3.04688-.175781 2.12891-15.058594h14.53125v3.398438h-11.89453l-1.19141 7.773437c.65104-.494792 1.26953-.8658857 1.85547-1.113281 1.041667-.429688 2.246093-.644532 3.61328-.644532 2.565107 0 4.739587.826823 6.52344 2.480469s2.67578 3.7500003 2.67578 6.289063c0 2.6432287-.820313 4.9739577-2.46094 6.992187-1.6276 2.0182293-4.231767 3.027344-7.8125 3.027344-2.278647 0-4.296877-.638021-6.05469-1.914063-1.744787-1.289062-2.721347-3.261718-2.92968-5.917968z" />
        </g>
      </g>
      <path
        d="m15 69h722v98h-722z"
        fill={color1}
        stroke={color1}
        transform="matrix(1 0 0 -1 0 236)"
      />
      <path d="m27 192h562v80h-562z" fill={color2} fill-opacity=".196078" />
      <g fill={color2} stroke={color1} transform="translate(492 214)">
        <path d="m11 .6-10.2 6.3 1.8 2.95 7.9-4.75v26.5h-8.5v3.4h19.85v-3.4h-7.2v-31z" />
        <path d="m39.43047 0c-4.65 0-7.75 1.65-10.5 4.95l2.9 2.2c2.2-2.55 4.05-3.65 7.45-3.65 3.85 0 6.15 2.4 6.15 6.25 0 5.65-2.8 9.4-15.8 21.85v3.4h20.45l.5-3.55h-16.2c11.35-10.35 15.4-15.5 15.4-21.8 0-5.5-3.85-9.65-10.35-9.65z" />
        <path d="m69.41094 0c-3.5 0-6.85 1.2-9.75 4l2.25 2.55c2.3-2.15 4.35-3.2 7.3-3.2 3.65 0 6.55 2.05 6.55 5.85 0 4.15-3.25 6.05-6.55 6.05h-2.05l-.5 3.3h2.9c4.05 0 7.15 1.6 7.15 6.55 0 4.3-2.85 7.05-7.7 7.05-2.8 0-5.7-1.15-7.65-3.45l-2.8 2.3c2.6 3.2 6.7 4.55 10.55 4.55 7.1 0 11.95-4.5 11.95-10.45 0-5.35-3.8-8.15-7.85-8.45 3.65-.7 6.75-3.85 6.75-8 0-4.7-4.1-8.65-10.55-8.65z" />
      </g>
    </g>
  </svg>
);

export default SecurityCodeIcon;
