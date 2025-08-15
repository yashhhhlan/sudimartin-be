import SearchVolumeDonutChart from './search-volume-donut-chart';
import SearchVolumeLineChart from './search-volume-line-chart';

const SearchVolume = () => {
  return (
    <div className="flex gap-8 h-full">
      <SearchVolumeDonutChart />
      <SearchVolumeLineChart />
    </div>
  );
};

export default SearchVolume;
