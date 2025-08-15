'use client';

import HeaderInfo from './header-info';
import TrendData from './trend-data';
import RankingDashboard from './ranking-dashboard';
import ContextDiscussion from './context-discussion';
import FilterButton from '@/components/filter-button';
import FilterSidebar from '@/components/filter-sidebar';

import { CurrentUser } from '@/types/components';

interface DashboardProps {
  currentUser: CurrentUser;
}

const Dashboard = ({ currentUser }: DashboardProps) => {
  return (
    <>
      <div className="space-y-6">
        <HeaderInfo />
        <TrendData />
        <div className="flex gap-4 w-full h-full">
          <RankingDashboard />
          <ContextDiscussion />
        </div>
      </div>

      <FilterButton />
      <FilterSidebar currentUser={currentUser} />
    </>
  );
};

export default Dashboard;
