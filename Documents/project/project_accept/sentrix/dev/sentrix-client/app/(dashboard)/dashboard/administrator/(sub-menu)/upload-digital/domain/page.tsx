import { Metadata } from 'next';

import DomainLists from '@/components/administrator/(upload digital)/domain/domain-lists';

export const metadata: Metadata = {
  title: 'Domain',
};

const Page = () => {
  return <DomainLists />;
};

export default Page;
