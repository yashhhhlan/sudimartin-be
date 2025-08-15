import { Metadata } from 'next';

import EditUser from '@/components/administrator/user-account/edit-user';

export const metadata: Metadata = {
    title: 'Edit User Account',
};

const Page = () => {
    return <EditUser />;
};

export default Page;
