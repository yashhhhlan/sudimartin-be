import { Metadata } from 'next';

import ComponentsDashboard from '@/components/dashboard/components-dashboard';

export const metadata: Metadata = {
  title: 'PDF',
};

const PDF = () => {
  return <ComponentsDashboard label="PDF" />;
};

export default PDF;
