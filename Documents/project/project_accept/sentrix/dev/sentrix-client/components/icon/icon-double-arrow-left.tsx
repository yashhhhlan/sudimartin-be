import { FC } from 'react';

interface IconDoubleArrowLeftProps {
  className?: string;
}

const IconDoubleArrowLeft: FC<IconDoubleArrowLeftProps> = ({ className }) => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clip-path="url(#clip0_107_2725)">
      <path d="M12.4785 6.79297L6.57574 12.6957L12.4785 18.5985" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19.4238 6.79297L13.5211 12.6957L19.4238 18.5985" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_107_2725">
      <rect width="23.6111" height="23.6111" fill="white" transform="matrix(-1 0 0 1 24.1113 0.890625)"/>
      </clipPath>
      </defs>
    </svg>
  );
};

export default IconDoubleArrowLeft;
