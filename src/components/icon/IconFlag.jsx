const IconFlag = ({ country }) => {
  const size = 25;
  const icons = {
    US: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={(size * 16) / 21}
        fill="none"
        viewBox="0 0 21 16"
      >
        <g clipPath="url(#i-flag-us_svg__a)">
          <rect width="21" height="15" y="0.5" fill="#fff" rx="3"></rect>
          <path fill="#1A47B8" d="M0 .5h9v7H0z"></path>
          <path
            fill="#F93939"
            d="M9 .5v1h12v-1zm0 2v1h12v-1zm0 2v1h12v-1zm0 2v1h12v-1zm-9 2v1h21v-1zm0 2v1h21v-1zm0 2v1h21v-1zm0 2v1h21v-1z"
          ></path>
          <path
            fill="#fff"
            d="M1 1.5v1h1v-1zm2 0v1h1v-1zm2 0v1h1v-1zm2 0v1h1v-1zm-1 1v1h1v-1zm-2 0v1h1v-1zm-2 0v1h1v-1zm-1 1v1h1v-1zm2 0v1h1v-1zm2 0v1h1v-1zm2 0v1h1v-1zm-6 2v1h1v-1zm2 0v1h1v-1zm2 0v1h1v-1zm2 0v1h1v-1zm-1-1v1h1v-1zm-2 0v1h1v-1zm-2 0v1h1v-1z"
          ></path>
        </g>
        <defs>
          <clipPath id="i-flag-us_svg__a">
            <rect width="21" height="15" y="0.5" fill="#fff" rx="3"></rect>
          </clipPath>
        </defs>
      </svg>
    ),
    UK: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={(size * 16) / 21}
        fill="none"
        viewBox="0 0 21 16"
      >
        <g clipPath="url(#i-flag-uk_svg__a)">
          <rect width="21" height="15" y="0.5" fill="#1A47B8" rx="3"></rect>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M2.234.5H0V3l18.754 12.5H21V13z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#F93939"
            d="M.745.5 21 14.035V15.5h-.728L0 1.95V.5z"
          ></path>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M19 .5h2V3S8.01 11.328 2 15.5H0V13z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#F93939"
            d="M21 .5h-.678L0 14.047V15.5h.745L21 1.962z"
          ></path>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M7.637.5h5.743v4.627H21v5.743h-7.62v4.63H7.637v-4.63H0V5.127h7.637z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#F93939"
            fillRule="evenodd"
            d="M8.842.5h3.316v5.77H21v3.46h-8.842v5.77H8.842V9.73H0V6.27h8.842z"
            clipRule="evenodd"
          ></path>
        </g>
        <defs>
          <clipPath id="i-flag-uk_svg__a">
            <rect width="21" height="15" y="0.5" fill="#fff" rx="3"></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  };

  return <>{icons[country] || null}</>;
};

export default IconFlag;
