import ActiveAccountStats from './active-account-stats';
import SiteActiveStats from './site-active-stats';

const RankingDashboard = () => {
  return (
    <div className="flex gap-4 w-1/2 h-full">
      <div className="flex-1 min-w-0">
        <ActiveAccountStats />
      </div>
      <div className="flex-1 min-w-0">
        <SiteActiveStats />
      </div>
    </div>
  );
};

export default RankingDashboard;
