import { Metadata } from 'next';

import DigitalEmotionLists from '@/components/administrator/(upload digital)/digital-emotion/digital-emotion-lists';

export const metadata: Metadata = {
  title: 'Digital Emotion',
};

const Page = () => {
  return <DigitalEmotionLists />;
};

export default Page;
