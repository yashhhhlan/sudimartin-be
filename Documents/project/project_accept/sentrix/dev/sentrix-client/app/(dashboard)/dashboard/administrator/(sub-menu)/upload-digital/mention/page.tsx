import { Metadata } from 'next';

import MentionLists from '@/components/administrator/(upload digital)/mention/mention-lists';

export const metadata: Metadata = {
  title: 'Mention',
};

const Page = () => {
  return <MentionLists />;
};

export default Page;
