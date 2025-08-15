import ActiveAccountRanking from './active-account-ranking';
import TopKeywordsRanking from './top-keywords-ranking';

const RankingDashboard = () => {
  return (
    <div className="flex gap-4">
      <ActiveAccountRanking />
      <TopKeywordsRanking />
    </div>
  );
};

export default RankingDashboard;
