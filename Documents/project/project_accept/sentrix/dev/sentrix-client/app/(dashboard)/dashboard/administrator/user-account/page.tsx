import { Metadata } from 'next';

import UserAccountLists from '@/components/administrator/user-account/user-account-lists';

export const metadata: Metadata = {
  title: 'User Account',
};

const Page = () => {
  return <UserAccountLists />;
};

export default Page;
