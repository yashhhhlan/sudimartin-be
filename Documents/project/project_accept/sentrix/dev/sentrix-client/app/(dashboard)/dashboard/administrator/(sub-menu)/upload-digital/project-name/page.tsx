import { Metadata } from 'next';

import ProjectNameLists from '@/components/administrator/(upload digital)/project-name/project-name-lists';

export const metadata: Metadata = {
  title: 'Project Name',
};

const Page = () => {
  return <ProjectNameLists />;
};

export default Page;
