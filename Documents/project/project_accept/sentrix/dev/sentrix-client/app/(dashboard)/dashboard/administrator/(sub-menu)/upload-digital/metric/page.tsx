import { Metadata } from 'next';

import MetricLists from '@/components/administrator/(upload digital)/metric/metric-lists';

export const metadata: Metadata = {
  title: 'Metric',
};

const Page = () => {
  return <MetricLists />;
};

export default Page;
