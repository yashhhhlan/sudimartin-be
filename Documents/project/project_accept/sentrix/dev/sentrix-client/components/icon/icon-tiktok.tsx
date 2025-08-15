import React from 'react';

const IconTikTok = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#010101" />

      <g clipPath="url(#clip0_tiktok)">
        <path
          d="M12 5H10V10.28C9.69 10.11 9.35 10 9 10C7.35 10 6 11.35 6 13C6 14.65 7.35 16 9 16C10.65 16 12 14.65 12 13V8.25C12.65 8.6 13.36 8.8 14.1 8.8V7.2C13.24 7.2 12.43 6.9 12 6.46V5Z"
          fill="white"
        />
      </g>

      <defs>
        <clipPath id="clip0_tiktok">
          <rect width="10.701" height="10.701" fill="white" transform="translate(4.375 5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconTikTok;
