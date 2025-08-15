import TrendDataSentimentCard from './trend-data-sentiment-card';

const sentimentData = [
  {
    icon: '/assets/positive-sentiment.gif',
    title: 'Positif',
    percentage: 22.78,
    value: '14.5K',
    growth: 224.08,
  },
  {
    icon: '/assets/neutral-sentiment.gif',
    title: 'Netral',
    percentage: 71.04,
    value: '45.1K',
    growth: -25.02,
  },
  {
    icon: '/assets/negative-sentiment.gif',
    title: 'Negatif',
    percentage: 6.18,
    value: '3.9K',
    growth: 110.74,
  },
];

const TrendDataSentiment = () => {
  return (
    <div className="flex 2xl:gap-6 lg:gap-2 items-center">
      {sentimentData.map((item) => (
        <TrendDataSentimentCard key={item.title} data={item} />
      ))}
    </div>
  );
};

export default TrendDataSentiment;
