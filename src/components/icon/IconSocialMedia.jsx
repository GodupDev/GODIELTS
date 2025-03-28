const IconSocialMedia = ({ socialMedia, size = 50 }) => {
  const icons = {
    Gmail: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {" "}
          <path
            d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z"
            fill="white"
          ></path>{" "}
          <path
            d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z"
            fill="#EA4335"
          ></path>{" "}
          <path
            d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z"
            fill="#FBBC05"
          ></path>{" "}
          <path
            d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z"
            fill="#34A853"
          ></path>{" "}
          <path
            d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z"
            fill="#C5221F"
          ></path>{" "}
          <path
            d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z"
            fill="#C5221F"
          ></path>{" "}
          <path
            d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z"
            fill="#C5221F"
          ></path>{" "}
          <path
            d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z"
            fill="#4285F4"
          ></path>{" "}
        </g>
      </svg>
    ),
    Facebook: (
      <>
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            {" "}
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="url(#paint0_linear_87_7208)"
            ></circle>{" "}
            <path
              d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z"
              fill="white"
            ></path>{" "}
            <defs>
              {" "}
              <linearGradient
                id="paint0_linear_87_7208"
                x1="16"
                y1="2"
                x2="16"
                y2="29.917"
                gradientUnits="userSpaceOnUse"
              >
                {" "}
                <stop stopColor="#18ACFE"></stop>{" "}
                <stop offset="1" stopColor="#0163E0"></stop>{" "}
              </linearGradient>{" "}
            </defs>{" "}
          </g>
        </svg>
      </>
    ),
    Linkedin: (
      <>
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_iconCarrier">
            {" "}
            <circle cx="24" cy="24" r="20" fill="#0077B5"></circle>{" "}
            <path
              d="M18.7747 14.2839C18.7747 15.529 17.8267 16.5366 16.3442 16.5366C14.9194 16.5366 13.9713 15.529 14.0007 14.2839C13.9713 12.9783 14.9193 12 16.3726 12C17.8267 12 18.7463 12.9783 18.7747 14.2839ZM14.1199 32.8191V18.3162H18.6271V32.8181H14.1199V32.8191Z"
              fill="white"
            ></path>{" "}
            <path
              d="M22.2393 22.9446C22.2393 21.1357 22.1797 19.5935 22.1201 18.3182H26.0351L26.2432 20.305H26.3322C26.9254 19.3854 28.4079 17.9927 30.8101 17.9927C33.7752 17.9927 35.9995 19.9502 35.9995 24.219V32.821H31.4922V24.7838C31.4922 22.9144 30.8404 21.6399 29.2093 21.6399C27.9633 21.6399 27.2224 22.4999 26.9263 23.3297C26.8071 23.6268 26.7484 24.0412 26.7484 24.4574V32.821H22.2411V22.9446H22.2393Z"
              fill="white"
            ></path>{" "}
          </g>
        </svg>
      </>
    ),
  };
  return icons[socialMedia];
};

export default IconSocialMedia;
