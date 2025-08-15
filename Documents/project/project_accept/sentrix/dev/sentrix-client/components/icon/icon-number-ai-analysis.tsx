interface IconNumberAIAnalysisProps {
  number: string | number;
  color: string;
}

const IconNumberAIAnalysis = ({ number, color }: IconNumberAIAnalysisProps) => {
  const displayNum = number.toString().padStart(2, '0');

  return (
    <svg width="42" height="30" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.5"
        d="M11.8547 25.0001C18.905 25.0001 22.8264 19.7362 29.3734 13.1453C22.8764 6.40136 19.0254 1.28906 11.8547 1.28906C5.30766 1.28906 0 6.59829 0 13.1453C0 19.6924 5.30766 25.0001 11.8547 25.0001Z"
        fill="black"
        fillOpacity="0.2"
      />
      <path
        d="M12.6519 22.9796C19.485 22.9796 23.2845 17.8782 29.6315 11.489C23.3313 4.95444 19.6007 0 12.6519 0C6.30493 0 1.16138 5.14512 1.16138 11.4906C1.16138 17.836 6.30493 22.9811 12.6519 22.9811V22.9796Z"
        fill="#C3FFFF"
      />
      <path
        d="M27.9792 11.4816C27.4525 10.9299 26.9446 10.3923 26.4507 9.86871C21.54 4.66732 18.2954 1.23047 12.7486 1.23047C7.20179 1.23047 2.48804 5.83326 2.48804 11.491C2.48804 17.1488 7.09083 21.75 12.7486 21.75C18.0609 21.75 21.4243 18.2631 26.0818 13.4368C26.6929 12.8023 27.3212 12.1521 27.9792 11.4816Z"
        fill={color}
      />
      <path
        d="M12.9721 19.2698C17.2685 19.2698 20.7523 15.786 20.7523 11.4896C20.7523 7.19312 17.2685 3.71094 12.9721 3.71094C8.67563 3.71094 5.19189 7.19312 5.19189 11.4896C5.19189 15.786 8.67563 19.2698 12.9721 19.2698Z"
        fill="#F5F5F5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1413_9032"
          x1="15.2336"
          y1="1.23047"
          x2="15.2336"
          y2="21.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00C8B9" />
          <stop offset="0.23" stopColor="#00D6C6" />
          <stop offset="0.43" stopColor="#00DDCC" />
          <stop offset="0.68" stopColor="#00D9C8" />
          <stop offset="0.92" stopColor="#00CDBD" />
          <stop offset="1" stopColor="#00C8B9" />
        </linearGradient>
      </defs>
      <text
        x="44%"
        y="50%"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontWeight="bold"
        fontFamily="inherit"
        fontSize="11"
        fill="#0E1726"
      >
        {displayNum}
      </text>
    </svg>
  );
};

export default IconNumberAIAnalysis;
