import { Metadata } from 'next';

import WebVisitsLists from '@/components/administrator/(upload digital)/web-visits/web-visits-lists';

export const metadata: Metadata = {
  title: 'Web Visits',
};

const Page = () => {
  return <WebVisitsLists />;
};

export default Page;
