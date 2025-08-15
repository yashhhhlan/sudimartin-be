import { Metadata } from 'next';

import Overview from '@/components/administrator/media-monitoring/overview';

import { getCurrentUser } from '@/server/actions/users/get-current-user';

export const metadata: Metadata = {
  title: 'Overview',
};

const Page = async () => {
  const { data: currentUser } = await getCurrentUser();

  return <Overview currentUser={currentUser} />;
};

export default Page;
