import { Metadata } from 'next';

import Influencer from '@/components/administrator/media-monitoring/influencer';

export const metadata: Metadata = {
  title: 'Influencer',
};

const Page = () => {
  return <Influencer />;
};

export default Page;
