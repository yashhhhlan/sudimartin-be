import { Metadata } from 'next';

import ComponentsDashboard from '@/components/dashboard/components-dashboard';

export const metadata: Metadata = {
    title: 'Demo Request',
};

const Page = () => {
    return <ComponentsDashboard label="Demo Request" />;
};

export default Page;
