import { Metadata } from 'next';

import TopicLists from '@/components/administrator/(upload digital)/topic/topic-lists';

export const metadata: Metadata = {
  title: 'Topic',
};

const Page = () => {
  return <TopicLists />;
};

export default Page;
