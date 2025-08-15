import React from 'react';

const IconXSquare = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="12" fill="#41464A" />
      <path
        d="M18.0506 17.0376L21.7508 12.4258H20.679L17.5149 16.3698L14.3504 12.4258H10.8174L15.7482 18.5715L12.0477 23.1836H13.1195L16.2839 19.2393L19.4487 23.1836H22.9817L18.0506 17.0376ZM12.5597 13.2618H13.9491L21.2391 22.3475H19.8497L12.5597 13.2618Z"
        fill="#F0F0F1"
      />
    </svg>
  );
};

export default IconXSquare;
