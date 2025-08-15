import React from 'react';

const IconYouTube = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#FF0000" />

      <g clipPath="url(#clip0_youtube)">
        <rect x="6.15" y="7" width="7.7" height="6.7" rx="1" fill="white" />

        <path d="M9.25 8.9L11.9 10.35L9.25 11.8V8.9Z" fill="#FF0000" />
      </g>

      <defs>
        <clipPath id="clip0_youtube">
          <rect width="10.701" height="10.701" fill="white" transform="translate(4.375 5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconYouTube;
