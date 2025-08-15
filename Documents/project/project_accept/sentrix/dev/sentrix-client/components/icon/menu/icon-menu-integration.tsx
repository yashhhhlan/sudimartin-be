import { FC } from 'react';

interface IconMenuIntegrationProps {
  className?: string;
}

const IconMenuIntegration: FC<IconMenuIntegrationProps> = ({ className }) => {
  return (
    <svg
      width="15"
      height="13"
      viewBox="0 0 15 13"
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
        d="M0 2C0 0.895433 0.895431 0 2 0H13C14.1046 0 15 0.895431 15 2V8.66932C15 9.77389 14.1046 10.6693 13 10.6693H2C0.89543 10.6693 0 9.77389 0 8.66932V2ZM1 1H14V8H1V1ZM7.09562 9.78881C7.35306 9.78881 7.56175 9.58011 7.56175 9.32267C7.56175 9.06523 7.35306 8.85654 7.09562 8.85654C6.83818 8.85654 6.62948 9.06523 6.62948 9.32267C6.62948 9.58011 6.83818 9.78881 7.09562 9.78881Z"
        fill="#888EA8"
      />
      <rect x="2" y="2" width="3" height="1" fill="#888EA8" />
      <rect x="2" y="4" width="3" height="1" fill="#888EA8" />
      <rect x="2" y="6" width="3" height="1" fill="#888EA8" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.75 2.11445C8.73572 2.43302 8 3.38059 8 4.5C8 5.88071 9.11929 7 10.5 7C11.7584 7 12.7997 6.07019 12.9743 4.8601L11.049 5.24514L11.0248 5.25H11C10.5185 5.25 10.1935 5.04378 9.99712 4.77108C9.80995 4.51112 9.75 4.20667 9.75 4V2.11445ZM10.25 2.01234C10.3322 2.00418 10.4156 2 10.5 2C11.829 2 12.9158 3.037 12.9953 4.34598L10.9764 4.74976C10.6728 4.74365 10.5039 4.61929 10.4029 4.47892C10.2901 4.32222 10.25 4.12666 10.25 4V2.01234Z"
        fill="#888EA8"
      />
    </svg>
  );
};

export default IconMenuIntegration;
