import Image from 'next/image';

import TrendSentimenGrowth from './trend-sentiment-growth';

import useBreakpoint from '@/hooks/use-breakpoint';
import { getIconSize } from '@/utils/responsive-sizes';

const TrendDataSentimentCard = ({ data }: { data: any }) => {
  const breakpoint = useBreakpoint();
  const iconSize = getIconSize(breakpoint);

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <Image width={iconSize.width} height={iconSize.height} src={data.icon} alt={data.title} />
        <p className="2xl:text-lg lg:text-sm">{data.title}</p>
        <p className="2xl:text-lg lg:text-sm font-semibold">{data.percentage}%</p>
        <p className="2xl:text-base lg:text-xs">{data.value}</p>
        <p className="2xl:text-lg lg:text-sm">
          <TrendSentimenGrowth growth={data.growth} />
        </p>
      </div>
    </div>
  );
};

export default TrendDataSentimentCard;
