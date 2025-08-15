import { FC } from 'react';

interface IconDoubleArrowRightProps {
  className?: string;
}

const IconDoubleArrowRight: FC<IconDoubleArrowRightProps> = ({ className }) => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clip-path="url(#clip0_107_2732)">
      <path d="M12.5215 6.79297L18.4243 12.6957L12.5215 18.5985" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.57617 6.79297L11.4789 12.6957L5.57617 18.5985" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_107_2732">
      <rect width="23.6111" height="23.6111" fill="white" transform="translate(0.888672 0.890625)"/>
      </clipPath>
      </defs>
    </svg>
  );
};

export default IconDoubleArrowRight;
