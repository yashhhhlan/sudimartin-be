import { Metadata } from 'next';

import ComponentsDashboard from '@/components/dashboard/components-dashboard';

export const metadata: Metadata = {
  title: 'AI Analisis',
};

const AIAnalysis = () => {
  return <ComponentsDashboard label="AI Analisis" />;
};

export default AIAnalysis;
