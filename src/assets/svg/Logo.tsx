
interface Props {
    size: number;
    color: string;
    }

const Logo = ({size , color} : Props) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 225.000000 225.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,225.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path d="M1398 1743 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z" />
        <path
          d="M925 1720 c-242 -37 -400 -86 -585 -181 -176 -91 -281 -185 -317  -282 -6 -18 -12 -65 -12 -106 -1 -67 2 -79 30 -122 55 -86 187 -163 364 -214  107 -31 222 -52 231 -42 4 3 -9 24 -29 46 -67 74 -79 110 -75 225 3 91 6 109 36 168  47 96 160 212 290 299 155 104 352 194 477 219  89 17 -289 8 -410 -10z"
        />
        <path
          d="M882 1412 c-5 -9 -53 -151 -106 -314 -53 -163 -99 -304 -102  -313 -5 -13 11 -15 129 -15 l135 0 42 125 42 125 69 0 c38 0 69 -3 69 -7 0 -5 -15 -60  -33 -123 l-33 -115 130 -3 c71 -1 132 1 136 5 9 11 212 634 208 638 -2 2 -61 5 -133 6 l-130  3 -38 -121 c-36 -116 -39 -121 -68 -127 -49 -9 -119 -7 -119 4 0 6 18 62 40 126  22 64 40 117 40 118 0 0 -61 2 -135 3 -119 3 -135 1 -143 -15z"
        />
        <path
          d="M1600 1414 c0 -3 13 -23 28 -43 105 -135 112 -233 31 -400 -95 -194 -329 -360 -664 -472 l-130 -43 55 -9 c122 -19 326 3 605 66  249 57 476 169 601 297 69 70 97 129 102 212 4 58 1 73 -24 119 -45 83 -149 154 -314 216 -107 41  -290 76 -290 57z"
        />
      </g>
    </svg>
  );
};

export default Logo;
