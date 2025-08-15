import { Metadata } from 'next';

import HashtagDLLists from '@/components/administrator/(upload digital)/hashtag-dl/hashtag-dl-lists';

export const metadata: Metadata = {
  title: 'Hashtag DL',
};

const Page = () => {
  return <HashtagDLLists />;
};

export default Page;
