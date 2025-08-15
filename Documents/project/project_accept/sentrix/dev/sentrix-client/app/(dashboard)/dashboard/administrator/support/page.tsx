import { Metadata } from 'next';

import ComponentsDashboard from '@/components/dashboard/components-dashboard';

export const metadata: Metadata = {
  title: 'Support',
};

const Page = () => {
  return <ComponentsDashboard label="Support" />;
};

export default Page;
