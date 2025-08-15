import { Metadata } from 'next';

import ComponentsDashboard from '@/components/dashboard/components-dashboard';

export const metadata: Metadata = {
    title: 'Notification',
};

const Page = () => {
    return <ComponentsDashboard label="Notification" />;
};

export default Page;
