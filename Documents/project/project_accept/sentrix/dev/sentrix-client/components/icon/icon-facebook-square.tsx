import React from 'react';

const IconFacebookSquare = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="12" fill="#1976D2" />
      <g clip-path="url(#clip0_1072_7337)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.3757 14.8855H18.1654V12.7453C18.1654 12.4615 18.2782 12.1893 18.4788 11.9887C18.6795 11.788 18.9517 11.6752 19.2355 11.6752H20.3056V9H18.1654C17.314 9 16.4975 9.33823 15.8954 9.94027C15.2934 10.5423 14.9551 11.3589 14.9551 12.2103V14.8855H12.8149V17.5608H14.9551V26.1215H18.1654V17.5608H20.3056L21.3757 14.8855Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1072_7337">
          <rect width="17.1215" height="17.1215" fill="white" transform="translate(9 9)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconFacebookSquare;
