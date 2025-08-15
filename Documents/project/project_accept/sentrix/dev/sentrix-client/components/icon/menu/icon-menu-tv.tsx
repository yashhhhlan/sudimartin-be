import { FC } from 'react';

interface IconMenuTVProps {
  className?: string;
}

const IconMenuTV: FC<IconMenuTVProps> = ({ className }) => {
  return (
    <svg
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.01537 12.3847L4.44466 10.5657H9.95389L11.4352 12.4382C11.6638 12.8876 11.2706 12.9999 11.0453 12.9999H3.32722C2.66195 12.9999 2.84213 12.5898 3.01537 12.3847Z"
        fill="#888EA8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2C0 0.895433 0.895431 0 2 0H12C13.1046 0 14 0.895431 14 2V8.66932C14 9.77389 13.1046 10.6693 12 10.6693H2C0.89543 10.6693 0 9.77389 0 8.66932V2ZM1 1H13V8H1V1ZM7.09562 9.78881C7.35306 9.78881 7.56175 9.58011 7.56175 9.32267C7.56175 9.06523 7.35306 8.85654 7.09562 8.85654C6.83818 8.85654 6.62948 9.06523 6.62948 9.32267C6.62948 9.58011 6.83818 9.78881 7.09562 9.78881Z"
        fill="#888EA8"
      />
    </svg>
  );
};

export default IconMenuTV;
