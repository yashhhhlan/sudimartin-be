interface IconExcelProps {
  className?: string;
  onClick?: () => void;
}

const IconExcel = ({ className = 'cursor-pointer', onClick }: IconExcelProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_852_6140)">
        <rect width="50" height="50" rx="25" fill="#1E7145" />
        <path
          d="M26.6957 15.3913H38V34.6087H26.6957M26.6957 12L12 14.8261V35.1739L26.6957 38V12Z"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 21.2308L21.4706 29.8462M17 29.8462L21.4706 21.2308M27.0588 18H30.4118V19.0769H27.0588V18ZM32.6471 18H36V19.0769H32.6471V18ZM27.0588 21.2308H30.4118V22.3077H27.0588V21.2308ZM32.6471 21.2308H36V22.3077H32.6471V21.2308ZM27.0588 24.4615H30.4118V25.5385H27.0588V24.4615ZM32.6471 24.4615H36V25.5385H32.6471V24.4615ZM27.0588 27.6923H30.4118V28.7692H27.0588V27.6923ZM32.6471 27.6923H36V28.7692H32.6471V27.6923ZM27.0588 30.9231H30.4118V32H27.0588V30.9231ZM32.6471 30.9231H36V32H32.6471V30.9231Z"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_852_6140">
          <rect width="50" height="50" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconExcel;
