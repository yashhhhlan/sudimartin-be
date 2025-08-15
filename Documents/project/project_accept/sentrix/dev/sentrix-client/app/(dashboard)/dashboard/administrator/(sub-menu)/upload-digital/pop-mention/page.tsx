import { Metadata } from 'next';

import PopMentionLists from '@/components/administrator/(upload digital)/pop-mention/pop-mention-lists';

export const metadata: Metadata = {
  title: 'Pop Mention',
};

const Page = () => {
  return <PopMentionLists />;
};

export default Page;
