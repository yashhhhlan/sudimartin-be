import { Metadata } from 'next';

import PopAccountDLLists from '@/components/administrator/(upload digital)/pop-account-dl/pop-account-dl-lists';

export const metadata: Metadata = {
  title: 'Pop Account DL',
};

const Page = () => {
  return <PopAccountDLLists />;
};

export default Page;
