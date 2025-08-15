const IconCheckedBox = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="18" height="18" rx="3" fill="#888EA8" stroke="#888EA8" stroke-width="2" />
      <g clipPath="url(#clip0_0_1)">
        <path
          d="M5.91699 9.9987L8.83366 12.9154L14.667 7.08203"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_1">
          <rect width="14" height="14" fill="white" transform="translate(3 3)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconCheckedBox;
