import { Metadata } from 'next';

import AddUser from '@/components/administrator/user-account/add-user';

export const metadata: Metadata = {
    title: 'Add User Account',
};

const Page = () => {
    return <AddUser />;
};

export default Page;
