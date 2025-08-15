import { Metadata } from 'next';

import Analysis from '@/containers/analysis';

export const metadata: Metadata = {
  title: 'Analysis',
};

const Page = () => {
  return <Analysis />;
};

export default Page;
