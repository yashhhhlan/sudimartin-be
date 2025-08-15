import { TrendingDown, TrendingUp } from 'lucide-react';

const TrendSentimenGrowth = ({ growth }: { growth: number }) => {
  return (
    <div>
      {growth > 0 ? (
        <span className="text-green-500 flex items-center gap-1">
          {growth}
          <TrendingUp size={16} />
        </span>
      ) : (
        <span className="text-red-500 flex items-center gap-1">
          {growth}
          <TrendingDown size={16} />
        </span>
      )}
    </div>
  );
};

export default TrendSentimenGrowth;
