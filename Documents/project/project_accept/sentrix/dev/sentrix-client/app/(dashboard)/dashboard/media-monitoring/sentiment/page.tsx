import { Metadata } from 'next';
import Sentiment from "@/components/administrator/media-monitoring/sentiment"

export const metadata: Metadata = {
  title: 'Sentimen',
};

const Page = () => {
  return <Sentiment />
}

export default Page;
