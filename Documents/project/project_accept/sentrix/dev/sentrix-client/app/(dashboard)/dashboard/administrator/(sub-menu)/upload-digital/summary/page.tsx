import { Metadata } from 'next';

import SummaryLists from '@/components/administrator/(upload digital)/summary/summary-lists';

export const metadata: Metadata = {
  title: 'Summary',
};

const Page = () => {
  return <SummaryLists />;
};

export default Page;
