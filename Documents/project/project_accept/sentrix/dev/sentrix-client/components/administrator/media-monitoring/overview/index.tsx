'use client';

import MediaTrendLineChart from './media-trend-line-chart';
import ProjectInfo from './project-info';
import RankingDashboard from './ranking-dashboard';
import SearchVolume from './search-volume';
import HeaderInfo from './header-info';
import FilterButton from '@/components/filter-button';
import FilterSidebar from '@/components/filter-sidebar';

import { CurrentUser } from '@/types/components';

interface OverviewProps {
  currentUser: CurrentUser;
}

const Overview = ({ currentUser }: OverviewProps) => {
  return (
    <>
      <div className="space-y-6">
        <HeaderInfo />
        <ProjectInfo />
        <MediaTrendLineChart />
        <SearchVolume />
        <RankingDashboard />
      </div>

      <FilterButton />
      <FilterSidebar currentUser={currentUser} />
    </>
  );
};

export default Overview;
