interface PercentageBarProps {
  value: number;
  maxValue: number;
  className?: string;
}

const PercentageBar = ({ value, maxValue = 100, className = '' }: PercentageBarProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex items-center">
        <div className="w-full flex-initial px-3">
          <div className="2xl:h-5 lg:h-4 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
            <div
              className="relative h-full w-full rounded-full before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
              style={{
                width: `${percentage}%`,
                background: `linear-gradient(to right, #2196F3, #6DC7FF)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageBar;
