import { Metadata } from 'next';
import Topic from '@/components/administrator/media-monitoring/topic';

export const metadata: Metadata = {
  title: 'Topik',
};

const Page = () => {
  return <Topic />
}

export default Page;
