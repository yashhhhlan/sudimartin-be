import TrendDataDonutChart from './trend-data-donut-chart';
import TrendDataLineChart from './trend-data-line-chart';

const TrendData = () => {
  return (
    <div className="flex gap-4">
      <TrendDataDonutChart />
      <TrendDataLineChart />
    </div>
  );
};

export default TrendData;
