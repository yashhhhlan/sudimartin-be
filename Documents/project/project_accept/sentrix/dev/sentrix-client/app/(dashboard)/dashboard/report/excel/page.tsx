import { Metadata } from 'next';

import ComponentsDashboard from '@/components/dashboard/components-dashboard';

export const metadata: Metadata = {
  title: 'Excel',
};

const Excel = () => {
  return <ComponentsDashboard label="Excel" />;
};

export default Excel;
