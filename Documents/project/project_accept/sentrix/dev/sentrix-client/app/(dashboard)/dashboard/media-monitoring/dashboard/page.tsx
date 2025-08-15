import { Metadata } from 'next';

import Dashboard from '@/components/administrator/media-monitoring/dashboard';
import { getCurrentUser } from '@/server/actions/users/get-current-user';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const Page = async () => {
  const { data: currentUser } = await getCurrentUser();

  return <Dashboard currentUser={currentUser} />;
};

export default Page;
