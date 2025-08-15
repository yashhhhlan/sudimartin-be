import { Metadata } from 'next';

import ComponentsDashboard from '@/components/dashboard/components-dashboard';

export const metadata: Metadata = {
  title: 'User Report',
};

const Page = () => {
  return <ComponentsDashboard label="User Report" />;
};

export default Page;
